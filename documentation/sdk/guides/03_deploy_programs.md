---
id: deploy_programs
title: プログラムのデプロイ
sidebar_label: プログラムのデプロイ
---

Aleo 上で dApp を構築する開発者は、アプリのロジックを実装するために独自のプログラムをデプロイする必要があります。本セクションでは、Aleo ネットワークへプログラムをデプロイする方法と、開発に使用できる言語の概要を紹介します。

## プログラムの開発
Aleo のプログラムは次のいずれかの言語で記述します。


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs defaultValue="leo"
values={[
  { label: 'Leo', value: 'leo' },
  { label: 'Aleo Instructions', value: 'aleo_instructions' },
]}>
<TabItem value="leo">
[Leo](https://docs.leo-lang.org) はゼロ知識プログラムを開発するための高水準で開発者フレンドリーな言語です。[Leo Playground](https://play.leo-lang.org/) という Web IDE を使えば、プログラムの作成・テスト・デプロイが可能です。Leo プログラムは内部的に Aleo Instructions へコンパイルされます。

```leo
// 2 つの数値を加算するシンプルなプログラム
program helloworld.aleo {
  transition hello(public a: u32, b: u32) -> u32 {
      let c: u32 = a + b;
      return c;
  }
}
```
</TabItem>
<TabItem value="aleo_instructions">
[Aleo Instructions](../../guides/aleo/00_aleo_overview.md) はゼロ知識プログラムの実行フローを細かく制御できる低レベル言語です。最終的に Aleo プログラムがコンパイルされる R1CS 制約システムと文法が近いように設計されています。

```aleo
program helloworld.aleo;

// Leo のコードは次の Aleo Instructions にコンパイルされます
function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
```
</TabItem>
</Tabs>


## プログラムのデプロイ
プログラムはデプロイトランザクションを構築して送信することでデプロイします。これは SDK の `deploy()` メソッドまたは `buildDeploymentTransaction()` メソッドを呼び出すことで行えます。`deploy()` はトランザクションを作成して Aleo ネットワークに送信し、`buildDeploymentTransaction()` はトランザクションを作成して JavaScript に返すだけです。内部的には、これらのメソッドがプログラム内の各関数を実行・証明して検証鍵を導出し、それらをデプロイトランザクションに格納して Aleo ネットワークへ送信します。

プログラム名が重複せず手数料が十分であれば、プログラムは Aleo ネットワークに保存されます。一度デプロイされれば、誰でも実行トランザクションを通じてその関数を実行できます。

プログラムは Aleo Testnet または Mainnet にデプロイできます。Mainnet へ公開する前に、必ず Testnet で十分にテストすることを強く推奨します。

:::note
まだ確認していない場合は、[はじめに](./01_getting_started.md) ガイドをご覧ください。特に、SDK のバージョン（Mainnet と Testnet）および WebAssembly の初期化に関するセクションを参照してください。
:::
プログラムをデプロイする準備ができたら、Aleo Instructions のソースコードを文字列として JS/TS 環境に読み込む必要があります。Leo で記述した場合は事前に Aleo Instructions へコンパイルしてください。ソースコードを JS/TS で扱えるようになったら、`ProgramManager` を使ってデプロイできます。 

それでは具体例を見ていきましょう。  

### インポートと WebAssembly

まず、適切な Provable SDK パッケージから必要なクラスをインポートし、未実行であれば WebAssembly を初期化します。

```typescript
import { Account, AleoNetworkClient, initThreadPool, ProgramManager, AleoKeyProvider } from '@provablehq/sdk';

// スレッドプールが未初期化の場合はここで初期化します（別の場所で初期化済みなら省略可能）。
await initThreadPool();
```

次に、使用する秘密鍵で `Account` オブジェクトを初期化します。
```typescript
const account = new Account({ privateKey: 'APrivateKey1...'});
```

### `AleoNetworkClient`

次に `AleoNetworkClient` を初期化します:
```typescript
// Aleo ネットワークに接続するためのネットワーククライアントを作成します。
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
```
`AleoNetworkClient` は Aleo ノードが公開しているエンドポイントへの REST 呼び出しをまとめたライブラリです。これを使うと、Aleo ブロックチェーンの公開情報を取得したり、トランザクションをネットワークに送信したりできます。


### `AleoKeyProvider`
さらに `AleoKeyProvider` を初期化します。
```typescript
// Aleo プログラムの証明鍵・検証鍵を取得するキープロバイダーを作成します。
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;
```
プログラムの各関数には対応する証明があるため、証明鍵と検証鍵が存在します。これらは関数の構造を一意に識別するための暗号学的なデータで、証明の生成と検証にそれぞれ必要です。SDK には `KeyProvider` インターフェースが用意されており、鍵を取得する方法を柔軟に定義できます。実行時に鍵が存在しない場合は SDK が生成しますが、生成処理は計算コストが高く実行を大幅に遅らせるため、できるだけ保管・再利用できるようにしておくことをおすすめします。 

`KeyProvider` インターフェースのデフォルト実装が `AleoKeyProvider` です。この実装では、鍵が置かれている可能性のある HTTP URL を任意で指定でき、証明鍵と検証鍵をインメモリにキャッシュできます。必要に応じて、CDN やデータベース、ローカルファイルシステムなど好みのストレージに合わせた `KeyProvider` を自作することも可能です。

### `ProgramManager`
`AleoNetworkClient` と `AleoKeyProvider` を使って `ProgramManager` を初期化し、トランザクション署名に使用するアカウントを設定します。

```typescript
// 設定済みのキー／レコードプロバイダーを用いて Aleo ネットワークとやり取りする ProgramManager を初期化します。
const programManager = new ProgramManager(networkClient, keyProvider);

// ProgramManager が使用するアカウントを設定します。
programManager.setAccount(account);
```

### プログラムを読み込む
前述のとおり、Aleo Instructions のプログラムを文字列として JS/TS に読み込む必要があります。
```typescript
// デプロイ対象の Aleo プログラムを定義します
const program = "program hello_hello.aleo;\n\nfunction hello:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n";
```
デプロイ時に支払う手数料も指定します。
```typescript
// プログラムをデプロイする際に支払う手数料を定義します
const fee = 3.8; // 3.8 Aleo credits
```

### トランザクションを構築する
最後にトランザクションを構築して送信し、結果を待ちます。
```typescript
// プログラムのデプロイトランザクションを構築します。
const tx = await programManager.buildDeploymentTransaction(program, fee, false);

// トランザクションをネットワークに送信します。
const transaction_id = await programManager.networkClient.submitTransaction(tx);

// トランザクションが成功したか確認します
const transaction = await programManager.networkClient.getTransaction(transaction_id);
```

代わりに、`deploy()` メソッドでトランザクションの構築と送信を一度に行うこともできます。

```typescript
// プログラムのデプロイトランザクションを構築します。
const transaction_id = await programManager.deploy(program, fee, false);

// トランザクションが成功したか確認します
const transaction = await programManager.networkClient.getTransaction(transaction_id);
```


プログラムをデプロイしたら、[Provable Explorer](https://explorer.provable.com/programs) でデプロイ状況や動作状況を確認できます。

### デプロイ手数料
デプロイには Aleo ネットワークへ手数料を支払う必要があります。この手数料は公開残高から支払うことも、`credits.aleo` レコードを使って秘匿的に支払うこともできます。いずれのプログラムでも、`ProgramManager` クラスの静的メソッド `estimateDeploymentFee()` で必要な手数料を見積もれます。
```typescript
const program = "program hello_hello.aleo;\n\nfunction hello:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n";

const fee = await ProgramManager.estimateDeploymentFee(program);
```
デプロイ手数料は以下の式で算出されます。手数料はプログラム内で使用するオペコードの量と処理の複雑さに比例します。ハッシュ関数のように計算コストが高いオペコードは、算術演算や論理演算などの単純なオペコードに比べて高額になります。

|コスト要素 | コスト（マイクロクレジット） |
| ---- | ---- |
|合成コスト | 25*#Constraints |
|ストレージコスト | 1000*#Bytes |
|ネームスペースコスト | 10^(10 - num_characters) |
|**総コスト** | **Synthesis + Storage + Namespace** |
