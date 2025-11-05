---
id: special_operands
title: Aleo 特殊オペランド
sidebar_label: 特殊オペランド
---

Aleo instructions でサポートされている特殊オペランドを以下にまとめます。

## 特殊オペランド一覧 {#table-of-special-operands}
| Name                         | 説明                                                     |
|------------------------------|:---------------------------------------------------------|
| [block.height](#blockheight) | finalize スコープ内のブロック高を返します               |
| [self.signer](#selfsigner)   | トランジションを発行したユーザーアドレスを返します       |
| [self.caller](#selfcaller)   | プログラムを直接呼び出した呼び出し元アドレスを返します   |
| [network.id](#networkid)     | プログラムが実行されているネットワーク ID を返します     |
| [edition](#edition)          | プログラムのバージョン番号 (`u16`) を返します            |
| [checksum](#checksum)        | プログラム文字列の SHA3-256 ハッシュを返します           |
| [program_owner](#programowner) | デプロイ取引を送信したアカウントのアドレスを返します  |

## 仕様

以下では Aleo Virtual Machine (AVM) における各特殊オペランドの仕様を説明します。

### `network.id`

[トップに戻る](#table-of-special-operands)

#### 説明

プログラムが実行されているネットワーク ID を返します。ネットワークごとの挙動を切り替える際に便利です。  
`network.id` コマンドは finalize ブロック内でのみ呼び出せます。

現在サポートされているネットワーク ID は次のとおりです。
- 0: メインネット
- 1: テストネット
- 2: カナリアネット

#### 利用例

```aleo
assert.eq network.id 0u64;  // Mainnet を想定
```

### `block.height`

[トップに戻る](#table-of-special-operands)

#### 説明

finalize スコープ内のブロック高を返します。  
`block.height` コマンドは finalize ブロック内でのみ呼び出せます。

#### 利用例

```aleo
assert.eq block.height 100u64;
```

### `self.signer`

[トップに戻る](#table-of-special-operands)

#### 説明

トランジションを発行したユーザーアドレスを返します。

#### 利用例

```aleo
assert.eq self.signer aleo1...;
```

### `self.caller`

[トップに戻る](#table-of-special-operands)

#### 説明

プログラムを直接呼び出した呼び出し元アドレスを返します。

#### 利用例

```aleo
assert.eq self.caller aleo1...;
```

### `edition`

[トップに戻る](#table-of-special-operands)

#### 説明

プログラムのバージョン番号を符号なし 16 ビット整数 (`u16`) として返します。初回のデプロイでは `edition` を必ず `0u16` に設定し、以降の正当なアップグレードでは 1 ずつ増やす必要があります。

このオペランドは `finalize` スコープでのみ利用でき、プログラムのアップグレード管理に用いられます。

#### 利用例

```aleo
assert.eq edition 0u16;  // 初回デプロイであることを確認
```

:::note
別のプログラムのメタデータを参照する場合は、`Program::edition(credits.aleo)` や `Program::edition(foo.aleo)` のようにプログラム名を修飾して使用できます。この構文を利用するには、Leo ファイルで対象プログラムをインポートしておく必要があります。
:::

### `checksum`

[トップに戻る](#table-of-special-operands)

#### 説明

プログラム文字列の SHA3-256 ハッシュを表す 32 バイト配列（`[u8; 32u32]`）を返します。これはプログラムコードのユニークなフィンガープリントです。

アップグレード可能なプログラムをデプロイする際は `checksum` が必須で、デプロイされたコードが想定どおりであることを検証するために使用します。

このオペランドは `finalize` スコープでのみ利用できます。

#### 利用例

```aleo
assert.eq checksum <EXPECTED_CHECKSUM>;  // プログラムコードが想定どおりか確認
```

:::note
別のプログラムのメタデータを参照する場合は、`Program::checksum(credits.aleo)` や `Program::checksum(foo.aleo)` のようにプログラム名を修飾して使用できます。この構文を利用するには、Leo ファイルで対象プログラムをインポートしておく必要があります。
:::

### `program_owner` {#programowner}

[トップに戻る](#table-of-special-operands)

#### 説明

デプロイ取引を送信したアカウントの `address` を返します。

アップグレード可能なプログラムをデプロイする際は `program_owner` が必須で、プログラムのアップグレードに対するアクセス制御を実装する際に役立ちます。

このオペランドは `finalize` スコープでのみ利用できます。

#### 利用例

```aleo
assert.eq program_owner <ADMIN_ADDRESS>;  // 特定の管理者にアップグレードを制限
```

:::note
別のプログラムのメタデータを参照する場合は、`Program::program_owner(credits.aleo)` や `Program::program_owner(foo.aleo)` のようにプログラム名を修飾して使用できます。この構文を利用するには、Leo ファイルで対象プログラムをインポートしておく必要があります。
:::

:::warning
アップグレード機能が導入される前にデプロイされたプログラムには `program_owner` が存在しません。その場合にアクセスしようとすると実行時エラーが発生します。
:::
