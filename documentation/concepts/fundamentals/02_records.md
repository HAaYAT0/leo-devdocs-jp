---
id: records
title: レコード
sidebar_label: レコード
---


**レコード**は、ユーザー資産やアプリケーションステートをエンコードするための基本的なデータ構造です。

アカウントレコードには、レコードの所有者、保持している値、アプリケーションステートを特定する情報が含まれます。Aleo では、レコードは[トランジション](04_transitions.md)関数によって消費され、新たに生成されます。[トランザクション](03_transactions.md)には複数のトランジションが含まれ、それぞれが個別のレコードを消費および生成します。また、レコード内のエントリの `visibility` が `private` に設定されている場合、そのエントリは所有者のアドレス秘密鍵で暗号化されます。

## レコードの構成要素

Aleo レコードは次の形式でシリアライズされます。

| パラメーター |          型          |                                                      説明                                                       |
|:---------:|:----------------------:|:----------------------------------------------------------------------------------------------------------------------:|
|  `owner`  |        address         |                               プログラムレコードの所有者に対応するアドレス公開鍵                                |
|  `data`   | Map\<Identifier, Entry\> | 任意のアプリケーション依存情報を含むデータペイロード。各エントリは `public` または `private` を指定できます。 |
|  `nonce`  |         group          |                                     プログラムレコードのシリアルナンセ                                     |
|  `version`|         u8             |                                     プログラムレコードのバージョン                                                  |

レコードの例:
```bash
{
  owner: aleo13ssze66adjjkt795z9u5wpq8h6kn0y2657726h4h3e3wfnez4vqsm3008q.private,
  amount: 100u64.private,
  _nonce: 5861592911433819692697358191094794940442348980903696700646555355124091569429group.public,
  version: 1u8.public
}
```

### 所有者
`aleo13ssze66adjjkt795z9u5wpq8h6kn0y2657726h4h3e3wfnez4vqsm3008q`

レコードの所有者はアカウントアドレスであり、レコードを消費する権限を持つ主体を示します。


### データ
`100u64.private`

レコードは任意のアプリケーション情報をエンコードできます。`amount` キーはレコードが保持するデータペイロードです。
`visibility` が `private` に設定されたエントリは暗号化され、台帳上に保存されます。
これにより、ユーザーはパブリックネットワーク上でレコードデータや値を安全かつ秘匿的にやり取りできます。
対応するアカウントビューキーを持つ送信者と受信者のみが、プライベートエントリを復号できます。

### ノンス
`5861592911433819692697358191094794940442348980903696700646555355124091569429group`

シリアルナンセは各レコードの一意な識別子を生成するために使用され、所有者のアドレス秘密鍵 ask とレコードのシリアルナンバーに対して PRF（疑似乱数関数）を評価することで算出されます。

### バージョン  
`1u8.public`  

`version` フィールドはプログラムレコードのバージョンを指定し、レコードコミットメントの導出方法や利用可能なプライバシー機能を決定します。

#### レコード v0
- BHP ハッシュを用いてレコードコミットメントを導出  
- 送信者暗号文を含まない  
- アカウントのビューキーでのみ復号可能
- コンセンサス V8 以前は許可されるが、それ以降は不許可

#### レコード v1
- ノンス付き BHP コミットメントを用いてレコードコミットメントを導出。ノンスはレコードビューキーから生成される
- ハイディング特性を備え、プライバシーが強化される
- 暗号化された送信者暗号文を含み、ユーザーはどのアドレスからレコードが送られたかを確認できる
- アカウントビューキーを共有せず、レコードビューキーのみで復号可能
- コンセンサス V8 以降で必須

Aleo のレコードに関する実演動画は[こちら](https://youtu.be/JIgrKv_Q6Jo?feature=shared)（バージョン 0）をご覧ください。レコードの詳細は[トランジション](./04_transitions.md#record)にも記載されています。 

## コンセプトを掘り下げる
レコードの使い方を理解するには、Aleo の設計原則を把握する必要があります。
Autonomous Ledger Execution Offchain（Aleo）は、汎用的なプログラマビリティとデフォルトのプライバシーを組み合わせたレイヤー 1 ブロックチェーンです。
Aleo の中核となるアイデアは ZEXE（Zero-Knowledge EXEcution）であり、2018 年の[研究論文](https://eprint.iacr.org/2018/962.pdf)で初めて提案されました。この論文では、Zcash の UTXO モデルを拡張し、特定の資産やトークンの値だけでなく任意のデータ（ユーザー資産やアプリケーションステート）を保存・暗号化できるレコードモデルが導入されました。

### プライバシー
ブロックチェーンにおけるプライバシーは一般に 4 種類に分類されます。

Aleo はそのうち 3 つを満たしています。
- [x] 秘匿入力（メッセージ）
- [x] 秘匿出力（状態遷移）
- [x] 秘匿ユーザー
- [ ] 秘匿関数

当初、Aleo は関数の秘匿性も目指していました（ZEXE 論文で詳述）が、その場合は性能低下と証明時間の延長を招くため採用を見送りました。


### ブロックチェーンにおけるステートストレージの比較
ブロックチェーンで用いられるステートモデルには、UTXO（未使用トランザクション出力）モデルと、Ethereum が導入したアカウントモデルの 2 種類があります。

Aleo は UTXO モデルを発展させたレコードモデルを採用しています。

<p align="center" width="100%">
<img src={require("./images/account_vs_utxo.png").default} alt="Account vs UTXO"></img>
</p>

<p align="center" width="100%">
出典: <a href="https://www.galaxy.com/insights/research/mev-how-flashboys-became-flashbots/">galaxy.com</a>
</p>
<br></br>

### アカウントモデル
Ethereum で採用されているアカウントモデルでは、特定のアドレスを参照することでアプリケーションステートを取得できます。

そのため、アドレスさえ知っていれば誰でもそのアカウントの活動を閲覧できてしまいます。

<p align="center" width="100%">
<img src={require("./images/ethereum_storage.png").default} alt="Ethereum Storage Diagram"></img>
</p>

<p align="center" width="100%">
出典: <a href="https://ethereum.org/en/develope.rs/docs/accounts/"> ethereum.org</a>
</p>
<br></br>


<p align="center" width="100%">
<img src={require("./images/ethereum_world_state.png").default} alt="Ethereum World State Diagram"></img>
</p>

<p align="center" width="100%">
出典: <a href="https://www.lucassaldanha.com/ethereum-yellow-paper-walkthrough-2/">Article by Lucas Saldanha</a>
</p>

<br></br>



### レコードモデル
レコードモデルでは、アプリケーションステートおよびその所有者が暗号化された状態でブロックチェーンに保存されます。

<p align="center" width="300">
<img src={require("./images/record.png").default} alt="Aleo Records Diagram"></img>
</p>

<p align="center" width="100%">
出典: <a href="https://eprint.iacr.org/2018/962.pdf"> Zexe: Enabling Decentralized Private Computation</a>
</p>

<br></br>


<p align="center" width="100%">
<img src={require("./images/aleo_ledger.png").default} alt="Aleo World State Diagram"></img>
</p>


<p align="center" width="100%">
出典: <a href="https://eprint.iacr.org/2018/962.pdf"> Zexe: Enabling Decentralized Private Computation</a>
</p>
<br></br>



### ステートの更新
レコードモデルでは、アプリケーションは古いステートを含むレコードを消費し、更新後のステートを含む新しいレコードを生成することで状態を更新します。使用済みのレコードは「spent」とマークされ、再利用できません。

<p align="center" width="500">
<img src={require("./images/utxo.png").default} alt="UTXO diagram"></img>
</p>

<p align="center" width="100%">
出典: <a href="https://adapulse.io/the-extensive-guide-on-eutxo-utxo-and-the-accounts-based-model/"> adapulse.io</a>
</p>
<br></br>

レコードの消費と生成は通常トランジション関数で行われます。Aleo のトランザクションには最大 32 個のトランジションを含めることができ、そのうち 1 つはトランザクション手数料に使用されます。


<p align="center" width="100%">
<img src={require("./images/transaction_in_aleo.png").default}  alt="Transaction in Aleo"></img>
</p>

### なぜレコードモデルが有用なのか

アカウントベースモデルでは、アプリケーションのデータはそのアプリケーションのアカウントに紐づいた永続的な場所に保管され、更新はそのデータを直接書き換える形で行われます。このモデルで一般的なトークン送金トランザクションを実装する場合、ユーザー残高は「アカウントアドレス → 残高」のテーブルに保存されます。ユーザー A がユーザー B に送金すると、テーブル内の A の残高が減少し、B の残高が同額だけ増加します。
トランザクションを秘匿化（送金額や A/B の正体を隠す）しようとすると、実際の残高の代わりに残高コミットメントを保存する手法が考えられます。トランザクションは実残高ではなくコミットメントを更新しますが、この方法では送金額こそ隠せてもユーザーの正体までは隠せません。ユーザーの身元まで隠すには、取引のたびにテーブル内のすべてのコミットメントを更新する必要があり、ユーザー数が増えるほど非効率になります。
アカウントモデルは開発者にとって直感的ですが、グローバルステートを参照するためにアカウントアドレスを利用するため、入力と出力を秘匿化できてもアカウントアドレス自体は暗号化できず、ユーザーのプライバシーを損ないます。また、プライベートなアカウントモデルでは同時実行性の問題もあり、ある時点でプログラムステートを更新できるのは 1 ユーザーに限られます。
Aleo のレコードモデルでは、アカウントアドレスではなくプログラム ID を使って各プログラムを一意に識別します。これによりプライバシーが向上し、プログラムに内部ステートを持たせることができます。このアプローチは効率的であり、同時実行性の問題も解決します。






