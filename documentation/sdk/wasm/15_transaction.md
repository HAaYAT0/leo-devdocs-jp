---
id: transaction
title: トランザクション
sidebar_label: トランザクション
---

## クラス `Transaction`

Aleo トランザクションの WebAssembly 表現です。

このオブジェクトは、チェーン上で関数をデプロイまたは実行するときに生成され、Aleo ネットワークへ送信して関数をデプロイ／実行する際に使用します。

## メソッド

### fromString
文字列表現からトランザクションを生成します。

```javascript
fromString(transaction) ► Transaction
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| transaction | `string` | トランザクションの文字列表現 |
| *return* | Transaction | 生成された Transaction オブジェクト |

---

### fromBytesLe
リトルエンディアンの Uint8Array からトランザクションを生成します。

```javascript
fromBytesLe(Uint8Array) ► Transaction
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| Uint8Array | `Uint8Array` | トランザクションをエンコードしたリトルエンディアンのバイト配列 |
| *return* | Transaction | 生成された Transaction オブジェクト |

---

### toString
トランザクションを文字列として取得します。Aleo ネットワークへ送信する場合は、この関数で得られた文字列を `POST` データとして使用します。

```javascript
toString() ► string
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `string` | トランザクションの文字列表現 |

---

### toBytesLe
トランザクションをリトルエンディアンの Uint8Array として取得します。

```javascript
toBytesLe() ► Uint8Array
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `Uint8Array` | トランザクションのバイト配列 |

---

### constainsSerialNumber
トランザクションに指定したシリアルナンバーが含まれている場合に true を返します。

```javascript
constainsSerialNumber(True) ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| True | `boolean` | ここでは指定したシリアルナンバーが含まれているかどうかを示す値 |
| *return* | `boolean` | 指定したシリアルナンバーが含まれていれば true |

---

### constainsCommitment
トランザクションに指定したコミットメントが含まれている場合に true を返します。

```javascript
constainsCommitment(True) ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| True | `boolean` | ここでは指定したコミットメントが含まれているかどうかを示す値 |
| *return* | `boolean` | 指定したコミットメントが含まれていれば true |

---

### findRecord
コミットメントを指定してトランザクション内のレコードを検索します。

```javascript
findRecord(commitment) ► RecordCiphertext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| commitment | Field | レコードを識別するコミットメント |
| *return* | RecordCiphertext | 該当するレコードの暗号文 |

---

### baseFeeAmount
トランザクションのベース手数料を返します。

```javascript
baseFeeAmount() ► BigInt
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `BigInt` | ベース手数料 |

---

### feeAmount
トランザクションの合計手数料を返します。

```javascript
feeAmount() ► BigInt
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `BigInt` | 合計手数料 |

---

### priorityFeeAmount
トランザクションの優先手数料を返します。

```javascript
priorityFeeAmount() ► BigInt
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `BigInt` | 優先手数料 |

---

### isDeploy
トランザクションがデプロイトランザクションであれば true を返します。

```javascript
isDeploy() ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `boolean` | デプロイトランザクションなら true |

---

### isExecute
トランザクションが実行トランザクションであれば true を返します。

```javascript
isExecute() ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `boolean` | 実行トランザクションなら true |

---
