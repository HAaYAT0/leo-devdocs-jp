---
title: フィールド
sidebar_label: フィールド
---

<a name="Field"></a>

## 概要

<p>Field クラスは Aleo ネットワークにおけるフィールド要素を扱います。文字列・バイト列・BigInt を含むさまざまな形式でフィールド要素を生成・変換・操作するメソッドを提供します。</p>

## メソッド

<a name="Field.fromString"></a>

### fromString

<p>フィールド要素の文字列表現から Field オブジェクトを生成します。</p>

```javascript
fromString(field) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| field | <code>string</code> | フィールド要素の文字列表現 |
| *return* | <code>Field</code> | Field オブジェクト |

---

<a name="Field+toString"></a>

### toString

<p>フィールド要素の文字列表現を返します。</p>

```javascript
toString() ► string
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> |

---

<a name="Field.fromBytesLe"></a>

### fromBytesLe

<p>リトルエンディアンの Uint8Array からフィールド要素を生成します。</p>

```javascript
fromBytesLe(bytes) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | フィールド要素のバイト配列表現 |
| *return* | <code>Field</code> | Field オブジェクト |

---

<a name="Field+toBytesLe"></a>

### toBytesLe

<p>フィールド要素をリトルエンディアンの Uint8Array としてエンコードします。</p>

```javascript
toBytesLe() ► Uint8Array
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Uint8Array</code> |

---

<a name="Field.fromBitsLe"></a>

### fromBitsLe

<p>真偽値配列による表現からフィールド要素を再構築します。</p>

```javascript
fromBitsLe(bits) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bits | <code>Array.&lt;any&gt;</code> | 真偽値配列による表現 |
| *return* | <code>Field</code> | Field オブジェクト |

---

<a name="Field+toBitsLe"></a>

### toBitsLe

<p>フィールド要素をリトルエンディアンの真偽値配列として取得します。</p>

```javascript
toBitsLe() ► Array.<any>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Field+toPlaintext"></a>

### toPlaintext

<p>フィールド要素から Plaintext を生成します。</p>

```javascript
toPlaintext() ► Plaintext
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Plaintext</code> |

---

<a name="Field+clone"></a>

### clone

<p>フィールド要素を複製します。</p>

```javascript
clone() ► Field
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> |

---

<a name="Field.random"></a>

### random

<p>ランダムなフィールド要素を生成します。</p>

```javascript
random() ► Field
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> |

---

<a name="Field+add"></a>

### add

<p>2 つのフィールド要素を加算します。</p>

```javascript
add(other) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Field</code> | 加算するフィールド要素 |
| *return* | <code>Field</code> | 加算結果 |

---

<a name="Field+subtract"></a>

### subtract

<p>2 つのフィールド要素を減算します。</p>

```javascript
subtract(other) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Field</code> | 減算するフィールド要素 |
| *return* | <code>Field</code> | 減算結果 |

---

<a name="Field+multiply"></a>

### multiply

<p>2 つのフィールド要素を乗算します。</p>

```javascript
multiply(other) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Field</code> | 乗算するフィールド要素 |
| *return* | <code>Field</code> | 乗算結果 |

---

<a name="Field+divide"></a>

### divide

<p>2 つのフィールド要素を除算します。</p>

```javascript
divide(other) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Field</code> | 除算の除数となるフィールド要素 |
| *return* | <code>Field</code> | 除算結果 |

---

<a name="Field+pow"></a>

### pow

<p>フィールド要素の累乗を計算します。</p>

```javascript
pow(other) ► Field
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Field</code> | 指数として使用するフィールド要素 |
| *return* | <code>Field</code> | 累乗の結果 |

---

<a name="Field+inverse"></a>

### inverse

<p>フィールド要素の逆元を計算します。</p>

```javascript
inverse() ► Field
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> |

---

<a name="Field.zero"></a>

### zero

<p>フィールドの加法単位元（0）を取得します。</p>

```javascript
zero() ► Field
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> |

---

<a name="Field.one"></a>

### one

<p>フィールドの乗法単位元（1）を取得します。</p>

```javascript
one() ► Field
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> |

---

<a name="Field+double"></a>

### double

<p>フィールド要素を 2 倍します。</p>

```javascript
double() ► Field
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> |

---

<a name="Field+equals"></a>

### equals

<p>2 つのフィールド要素が等しいかどうかを判定します。</p>

```javascript
equals(other) ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Field</code> | 比較対象のフィールド要素 |
| *return* | <code>boolean</code> | フィールド要素が等しい場合は true |

---
