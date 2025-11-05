---
id: blocks
title: ブロック
sidebar_label: ブロック
---

**ブロック**は、Aleo の[トランザクション](03_transactions.md)を時系列に整理するための基本的なデータ構造です。

## ブロックの構成要素

Aleo のブロックは以下の形式でシリアライズされます。


|    パラメーター     |  型  |                                        説明                                        |
|:----------------:|:------:|:-----------------------------------------------------------------------------------------:|
|   `block_hash`   | string |                                   ブロックのハッシュ                                   |
| `previous_hash`  | string |                              直前のブロックのハッシュ                               |
|     `header`     | object |                                  ブロックヘッダー                                  |
|  `transactions`  | array  |                               ブロック内のトランザクション                               |
| `ratificactions` | array  |                    報酬証明のためのラティフィケーション                     |
|    `coinbase`    | string | 各プローバーの解を集約して構成されるコインベースパズルの解 |
|   `signature`    | string |                                ブロックの署名                                |

#### トランザクション

[**トランザクション**](./03_transactions.md) には、該当ブロックに含まれるすべてのトランザクションが列挙されます。

#### ブロックヘッダー

**ブロックヘッダー**は、当該ブロックの状態と、その時点における台帳の状態を要約した情報を含みます。詳細は[ブロックヘッダーの構成要素](#components-of-a-block-header)を参照してください。

## ブロックヘッダーの構成要素

Aleo のブロックヘッダーは次の形式でシリアライズされます。

|          パラメーター           |  型  |                                   説明                                   |
|:----------------------------:|:------:|:-------------------------------------------------------------------------------:|
|    `previous_state_root`     | string | 直前のブロックまでの台帳を表すマークルルート |
|     `transactions_root`      | string |           ブロック内トランザクションを表すマークルルート           |
|       `finalize_root`        | string | 現在のブロックを含むオンチェーン finalize を表すマークルルート |
|     `ratifications_root`     | string |          ブロック内のラティフィケーションを表すマークルルート           |
| `coinbase_accumulator_point` | string |                  コインベースパズルのアキュムレータポイント                  |
|          `metadata`          | object |                           ブロックのメタデータ                            |

#### メタデータ

|           パラメーター            | 型 |                       説明                        |
|:------------------------------:|:----:|:--------------------------------------------------------:|
|           `network`            | u16  |               ブロックのネットワーク ID                |
|            `round`             | u64  |       このブロックを生成したラウンド（8 バイト）       |
|            `height`            | u32  |            ブロックの高さ（4 バイト）            |
| `total_supply_in_microcredits` | u64  |        マイクロクレジットの総供給量（8 バイト）        |
|      `cumulative_weight`       | u128 |     このブロックの累積ウェイト（16 バイト）      |
|   `cumulative_proof_weight`    | u128 |  このブロックの累積証明ターゲット（16 バイト）   |
|       `coinbase_target`        | u64  |       ブロックのコインベースターゲット（8 バイト）       |
|         `proof_target`         | u64  |        ブロックの証明ターゲット（8 バイト）         |
|     `last_coinbase_target`     | u64  |   直近のコインベースのターゲット（8 バイト）    |
|   `last_coinbase_timestamp`    | u64  | 直近のコインベースの Unix タイムスタンプ（UTC, 8 バイト） |
|          `timestamp`           | i64  |    このブロックの Unix タイムスタンプ（UTC, 8 バイト）     |


[//]: # (## Advanced Topics)

[//]: # ()
[//]: # (### Verifying Blocks)

[//]: # ()
[//]: # (The steps to verify a block are as follows:)

[//]: # ()
[//]: # (1. Validate the block header )

[//]: # (    - Check that the `merkle_root_hash` is derived correctly)

[//]: # (    - Check that the `pedersen_merkle_root_hash` is derived correctly)

[//]: # (    - Check that the block timestamp is not more than 2 hours into the future)

[//]: # (    - Check that the block's difficulty target matches the expected difficulty target)

[//]: # (    - Check that the difficulty hash is less than or equal to the difficulty target)

[//]: # (    - Verify the PoSW proof)

[//]: # (2. Verify that there is only 1 coinbase transaction included in the block)

[//]: # (3. Verify that the sum of all transaction value balances are equal to the expected block reward)

[//]: # (4. Verify each transaction included in the block)

[//]: # ( )
