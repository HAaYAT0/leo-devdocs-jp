---
id: signature
title: 署名
sidebar_label: 署名
---

## クラス `Signature`

Aleo アカウントがメッセージに対して行う暗号署名を表します。

## メソッド

### sign
秘密鍵でメッセージに署名します。

```javascript
sign(private_key, message) ► Signature
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| private_key | PrivateKey | メッセージの署名に使用する秘密鍵 |
| message | `Uint8Array` | 署名対象のメッセージ（バイト配列） |
| *return* | Signature | 生成された署名 |

---

### to_address
署名からアドレスを取得します。

```javascript
to_address() ► Address
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Address | アドレスオブジェクト |

---

### challenge
署名のチャレンジ値を取得します。

```javascript
challenge() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | チャレンジ値 |

---

### response
署名のレスポンス値を取得します。

```javascript
response() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | レスポンス値 |

---

### verify
署名が正しいかアドレスを用いて検証します。

```javascript
verify(address, message) ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| address | Address | 検証に使用するアドレス |
| message | `Uint8Array` | 検証対象のメッセージ（バイト配列） |
| *return* | `boolean` | 署名が有効なら true、無効なら false |

---

### fromBytesLe
リトルエンディアンのバイト列から署名を生成します。

```javascript
fromBytesLe(bytes) ► Signature
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | `Uint8Array` | 署名を表すリトルエンディアンのバイト配列 |
| *return* | Signature | 署名オブジェクト |

---

### toBytesLe
署名をリトルエンディアンのバイト配列に変換します。

```javascript
toBytesLe() ► Uint8Array
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `Uint8Array` | 署名のバイト配列 |

---

### fromBitsLe
真偽値配列（リトルエンディアン）から署名を生成します。

```javascript
fromBitsLe(bits) ► Signature
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bits | `Array` | 署名を表す真偽値配列 |
| *return* | Signature | 署名オブジェクト |

---

### toBitsLe
署名をリトルエンディアンの真偽値配列として取得します。

```javascript
toBitsLe() ► Array.<any>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `Array.<any>` | 署名のビット配列 |

---

### toFields
署名をフィールド配列として取得します。

```javascript
toFields() ► Array.<any>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `Array.<any>` | フィールド値の配列 |

---

### from_string
署名の文字列表現から署名オブジェクトを生成します。

```javascript
from_string(signature) ► Signature
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| signature | `string` | 署名の文字列表現 |
| *return* | Signature | 署名オブジェクト |

---

### to_string
署名の文字列表現を取得します。

```javascript
to_string() ► string
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `string` | 署名の文字列表現 |

---

### toPlaintext
署名を Plaintext 表現へ変換します。

```javascript
toPlaintext() ► Plaintext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Plaintext | Plaintext オブジェクト |

---
