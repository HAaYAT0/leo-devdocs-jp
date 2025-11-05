---
id: transaction_fees
title: トランザクション手数料
sidebar_label: トランザクション手数料
---

# トランザクション手数料

**トランザクション手数料**とは、Aleo ネットワークでトランザクションを処理するために必要な手数料です。以下では、**Deploy** トランザクションと **Execute** トランザクションの価格付けについて説明します。執筆時点では、パズルソリューションに対する手数料は無料です。

## Aleo クレジットの単位表

|単位|トランザクションサイズ|価値|例|
|:-:|:-:|:-:|:-:|
|`microcredit`|バイト|1|最小単位|
|`millicredit`|キロバイト (KB)|1000 microcredit|多くのトランザクションでは 3～10 millicredit が目安|
|`credit`|メガバイト (MB)|1000 millicredit|最大の単位|

## トランザクション手数料の種類
### デプロイベース手数料
Aleo ネットワークへプログラムをデプロイする際に支払う手数料です。内訳は以下のとおりです。

- プログラムの生バイトサイズに応じたサイズコスト
- ネームスペースコスト。プログラム名が短いほど高くなり、10 文字以上ならコストは発生しません
- プログラムを処理する際の合成コスト。複雑な演算が多いほど、ネットワークがゼロ知識証明用の回路へ変換するのに時間がかかります

### 実行ベース手数料
Aleo ネットワークでプログラム関数を実行する際に支払う手数料です。

- プログラムの生バイト量に応じたサイズコスト（5 KB を超えると二次関数的に増加）
- finalize スコープ内の処理量に応じた finalize コスト
- 実行コストはありません。対応するゼロ知識証明の検証が軽量なためです

### 優先手数料
優先手数料は任意の追加手数料で、メモリプール内でトランザクション優先度を上げるための入札に使われます。[ARC-0005](https://github.com/ProvableHQ/ARCs/discussions/92) が承認されたことで優先手数料が導入され、トランザクションの順序付けに関する手数料市場が形成されました。

ネットワークは優先手数料が 0 でないトランザクションを対象に優先キューを管理します。この優先キューは、BFT コンセンサス層にトランザクションを送信する際に通常キューより先に処理されます。

:::note[notes on current design]
1. メモリプール内にあるトランザクションの優先手数料は後から更新できません。 
2. 飢餓状態を防ぐ仕組みはありません。優先キューが十分に埋まっている場合、通常キューのトランザクションは BFT に送信されません。 
3. バッチ構築はメモリプールに対してアトミックではありません。 
:::

<!-- markdown-link-check-disable -->
### 手数料の見積もり
手数料計算のロジックは [cost.rs](https://github.com/ProvableHQ/snarkVM/blob/mainnet/synthesizer/process/src/cost.rs#L26) で定義されています。Web サイトで簡易的に見積もりたい場合は [provable.tools](https://www.provable.tools/develop) のサポートを利用するか、`leo cli` を使ってトランザクション手数料を見積もることもできます。以下は一例です。
<!-- markdown-link-check-enable -->

まず `leo example` でサンプルプログラムを生成します。
```bash
leo example lottery
cd lottery
```

続いて `leo deploy` を使ってトランザクションのデプロイ手数料を見積もります。
```bash
leo deploy --network testnet --endpoint "https://api.explorer.provable.com/v1" --path .
```

または `leo run` で実行手数料を見積もれます。
```bash
leo execute play --program lottery_test.aleo --endpoint https://api.explorer.provable.com/v1 --dry-run --broadcast
```

`.env` の秘密鍵に残高を用意する必要はなく、出力は次のようになります。
```bash
Base execution cost for 'lottery_test' is 0.041048 credits.

+---------------------+----------------+
| lottery_test        | Cost (credits) |
+---------------------+----------------+
| Transaction Storage | 0.001338       |
+---------------------+----------------+
| On-chain Execution  | 0.039710       |
+---------------------+----------------+
| Priority Fee        | 0.000000       |
+---------------------+----------------+
| Total               | 0.041048       |
+---------------------+----------------+

Your current public balance is 7.401737 credits.

✅ Successful dry run execution for 'lottery_test.aleo'
```
