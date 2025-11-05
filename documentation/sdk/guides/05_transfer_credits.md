---
id: transfer_credits
title: クレジットの送金
sidebar_label: クレジットの送金
---

Aleo ネットワークの公式通貨は Aleo クレジットと呼ばれます。トランザクションの手数料やステーキング報酬、マイニング報酬はすべて Aleo クレジットで支払われます。詳細は [基本概念](../../concepts/fundamentals/08_credits.md) を参照してください。

Ethereum などの一般的なブロックチェーンと異なり、Aleo には特別な `transfer` トランザクションタイプはありません。その代わりに、[`credits.aleo`](https://explorer.provable.com/program/credits.aleo) というネイティブプログラムが Aleo クレジットの送金・利用・所有権を管理します。Aleo ネットワーク上のすべての価値移転は `Execute` トランザクションを通じて `credits.aleo` プログラム内の関数を呼び出すことで行われます。そのため、[プログラムの実行](./04_execute_programs.md) ガイドで紹介した方法と同じ手順でクレジットを送金できます。

ただし、クレジット送金はネットワークで最も利用頻度が高く基本的な処理であるため、Provable SDK では `ProgramManager` クラス経由でクレジット送金に特化した関数を提供しています。クレジット送金トランザクションを構築する主なメソッドは `transfer()` と `buildTransferTransaction()` の 2 つです。`transfer()` を呼び出すとトランザクションを構築して Aleo ネットワークへ送信し、`buildTransferTransaction()` はトランザクションを構築して JavaScript の呼び出し元へ返すだけです。

それでは具体例で確認しましょう。

:::note
Aleo クレジットの最小単位はマイクロクレジットです。すべての関数は既定でマイクロクレジット単位の値を受け取り、返します。1 クレジットは 1,000,000 マイクロクレジットです。
:::


## Aleo クレジットを送金する

### セットアップ

[プログラムのデプロイ](./03_deploy_programs.md) ガイドと同様に、まだであれば基本的なオブジェクトを初期化します。

```typescript
import { Account, AleoNetworkClient, initThreadPool, NetworkRecordProvider, ProgramManager, AleoKeyProvider } from '@provablehq/sdk';

// スレッドプールが未初期化の場合はここで初期化します（別の場所で初期化済みなら省略可能）。
await initThreadPool();

const account = new Account({ privateKey: 'APrivateKey1...'});
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

const recordProvider = new NetworkRecordProvider(account, networkClient);

const programManager = new ProgramManager(networkClient, keyProvider, recordProvider);
programManager.setAccount(account);
```

### `NetworkRecordProvider`
注意深い人なら、ここで新しく `NetworkRecordProvider` をインポートして初期化していることに気付くはずです。このコードは `ProgramManager` が必要とするレコードを管理するために追加しています。おさらいすると、レコードは Aleo ネットワークで秘匿状態を表す単位です。レコードはプログラムの関数によって生成され、ユーザーがプログラムのさまざまな関数を実行すると変更・更新されます。詳細は基本概念の [レコード](../../concepts/fundamentals/02_records.md) セクションを参照してください。

プログラムを実行するとき、多くの場合はユーザーに属するレコードを検索する必要があります。SDK では `RecordProvider` というインターフェースを提供しており、開発者が独自のレコード保存・取得メカニズムを実装できるようになっています。`RecordProvider` インターフェースのデフォルト実装が `NetworkRecordProvider` クラスで、Aleo ネットワーク上から特定ユーザーに固有のレコードを検索します。`ProgramManager` クラスは `RecordProvider` 実装を引数として受け取ることが可能です。`RecordProvider` インターフェースの詳細や、SDK を使ったレコード検索の一般的な方法については、[状態管理](./06_managing_state.md) ガイドを参照してください。

### トランザクションの構築

すべての初期化が完了したら、トランザクションを構築して送信し、結果を待ちます。
```typescript
// 完全に秘匿な送金を行います
const tx = await programManager.buildTransferTransaction(
    amount : 1, 
    recipient: RECIPIENT_ADDRESS, 
    transferType: "transfer_private", 
    fee: 0.2
);
// トランザクションをネットワークに送信します。
const tx_id = await programManager.networkClient.submitTransaction(tx);

/// 他のユーザーに公開送金を行います
const tx_2 = await programManager.buildTransferTransaction(1, RECIPIENT_ADDRESS, "transfer_public", 0.2);
const tx_id_3 = await programManager.networkClient.submitTransaction(tx_2);

// 秘匿レコードを入力に使って公開送金を行います
const tx_3 = await programManager.buildTransferTransaction(1, RECIPIENT_ADDRESS, "transfer_private_to_public", 0.2);
const tx_id_3 = await programManager.networkClient.submitTransaction(tx_3);

/// 公開残高から秘匿レコードを作成します
const tx_4 = await programManager.buildTransferTransaction(1, RECIPIENT_ADDRESS, "transfer_public_to_private", 0.2);
const tx_id_4 = await programManager.networkClient.submitTransaction(tx_4);

/// トランザクション署名者（元の開始者）のアドレスから公開送金を行います
const tx_5 = await programManager.buildTransferTransaction(1, RECIPIENT_ADDRESS, "transfer_public_as_signer", 0.2);
const tx_id_5 = await programManager.networkClient.submitTransaction(tx_5);


// 通常、トランザクションがネットワークで確定するまでに 1〜3 ブロック（3〜9 秒）かかります。
// その頃合いになったら、次の関数でトランザクションの詳細を取得します。
const transaction1 = await programManager.networkClient.getTransaction(tx_id);
const transaction2 = await programManager.networkClient.getTransaction(tx_id_2);
const transaction3 = await programManager.networkClient.getTransaction(tx_id_3);
const transaction4 = await programManager.networkClient.getTransaction(tx_id_4);
const transaction5 = await programManager.networkClient.getTransaction(tx_id_5);
```

別の方法として、`transfer()` メソッドを呼び出してトランザクションの構築とブロードキャストを 1 回でまとめて実行することもできます。

```typescript
const RECIPIENT_ADDRESS = "aleo1...";

const tx_id = await programManager.transfer(
    amount : 1, 
    recipient: RECIPIENT_ADDRESS, 
    transferType: "transfer_private", 
    fee: 0.2
);
const tx_id_2 = await programManager.transfer(1, RECIPIENT_ADDRESS, "transfer_public", 0.2);
const tx_id_3 = await programManager.transfer(1, RECIPIENT_ADDRESS, "transfer_private_to_public", 0.2);
const tx_id_4 = await programManager.transfer(1, RECIPIENT_ADDRESS, "transfer_public_to_private", 0.2);
const tx_id_5 = await programManager.transfer(1, RECIPIENT_ADDRESS, "transfer_public_as_signer", 0.2);

const transaction1 = await programManager.networkClient.getTransaction(tx_id);
const transaction2 = await programManager.networkClient.getTransaction(tx_id_2);
const transaction3 = await programManager.networkClient.getTransaction(tx_id_3);
const transaction4 = await programManager.networkClient.getTransaction(tx_id_4);
const transaction5 = await programManager.networkClient.getTransaction(tx_id_5);
```

## 残高の確認 
### 公開残高
任意のアドレスの公開残高は、`NetworkClient` の `getMappingValue()` 関数で確認できます。

```typescript
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const USER_ADDRESS = "aleo1...";
const public_balance = networkClient.getMappingValue("credits.aleo", USER_ADDRESS);
```


### 秘匿残高
アドレスの秘匿残高は、そのアドレスが保有する未使用クレジットレコードの合計です。レコードの探し方については、[次のガイド](./06_managing_state.md) を参照してください。

