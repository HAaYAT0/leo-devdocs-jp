---
id: scalar
title: スカラー
sidebar_label: スカラー
---

## クラス `Scalar`

Scalar フィールド要素を表します。

## メソッド

### fromString
スカラー要素の文字列表現から Scalar オブジェクトを生成します。

```javascript
fromString(group) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| group | `string` | スカラー要素の文字列表現 |
| *return* | Scalar | 生成された Scalar オブジェクト |

---

### toString
スカラー要素の文字列表現を返します。

```javascript
toString() ► string
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `string` | スカラー要素の文字列表現 |

---

### fromBytesLe
リトルエンディアンの Uint8Array からスカラー要素を生成します。

```javascript
fromBytesLe(bytes) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | `Uint8Array` | スカラー要素を表すバイト配列 |
| *return* | Scalar | 生成された Scalar オブジェクト |

---

### toBytesLe
スカラー要素をリトルエンディアンの Uint8Array としてエンコードします。

```javascript
toBytesLe() ► Uint8Array
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `Uint8Array` | スカラー要素のバイト配列 |

---

### fromBitsLe
真偽値配列による表現からスカラー要素を再構築します。

```javascript
fromBitsLe(bits) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bits | `Array.<any>` | スカラー要素を表す真偽値配列 |
| *return* | Scalar | 生成された Scalar オブジェクト |

---

### toBitsLe
スカラー要素のビット列をリトルエンディアンの真偽値配列として取得します。

```javascript
toBitsLe() ► Array.<any>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | `Array.<any>` | ビット列の真偽値配列 |

---

### toPlaintext
スカラー要素から Plaintext を生成します。

```javascript
toPlaintext() ► Plaintext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Plaintext | 変換された Plaintext |

---

### clone
スカラー要素を複製します。

```javascript
clone() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | 複製されたスカラー要素 |

---

### random
ランダムなスカラー要素を生成します。

```javascript
random() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | 生成されたスカラー要素 |

---

### add
2 つのスカラー要素を加算します。

```javascript
add(other) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | Scalar | 加算するスカラー要素 |
| *return* | Scalar | 加算結果 |

---

### subtract
2 つのスカラー要素を減算します。

```javascript
subtract(other) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | Scalar | 減算するスカラー要素 |
| *return* | Scalar | 減算結果 |

---

### multiply
2 つのスカラー要素を乗算します。

```javascript
multiply(other) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | Scalar | 乗算するスカラー要素 |
| *return* | Scalar | 乗算結果 |

---

### divide
2 つのスカラー要素を除算します。

```javascript
divide(other) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | Scalar | 除算の除数となるスカラー要素 |
| *return* | Scalar | 除算結果 |

---

### double
スカラー要素を 2 倍にします。

```javascript
double() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | 2 倍になったスカラー要素 |

---

### pow
スカラー要素の累乗を計算します。

```javascript
pow(other) ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | Scalar | 指数となるスカラー要素 |
| *return* | Scalar | 累乗結果 |

---

### inverse
スカラー要素の逆元を計算します。

```javascript
inverse() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | 逆元 |

---

### one
スカラーフィールドの乗法単位元を取得します。

```javascript
one() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | 乗法単位元 |

---

### zero
スカラーフィールドの加法単位元を取得します。

```javascript
zero() ► Scalar
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | Scalar | 加法単位元 |

---

### equals
2 つのスカラー要素が等しいか判定します。

```javascript
equals(other) ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | Scalar | 比較対象のスカラー要素 |
| *return* | `boolean` | 等しい場合は true |

---
