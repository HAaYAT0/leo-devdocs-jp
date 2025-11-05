---
title: グループ
sidebar_label: グループ
---

<a name="Group"></a>

## 概要

<p>Group クラスは Aleo ネットワークにおける楕円曲線グループ要素を扱います。グループ要素の生成・変換・操作を行うメソッドを提供し、各種算術演算や形式変換に対応します。</p>

## メソッド

<a name="Group.fromString"></a>

### fromString

<p>グループ要素の文字列表現から Group オブジェクトを生成します。</p>

```javascript
fromString(group) ► Group
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| group | <code>string</code> | グループ要素の文字列表現 |
| *return* | <code>Group</code> | Group オブジェクト |

---

<a name="Group+toString"></a>

### toString

<p>グループ要素の文字列表現を返します。</p>

```javascript
toString() ► string
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> |

---

<a name="Group.fromBytesLe"></a>

### fromBytesLe

<p>リトルエンディアンの Uint8Array からグループ要素を生成します。</p>

```javascript
fromBytesLe(bytes) ► Group
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | グループ要素のバイト配列表現 |
| *return* | <code>Group</code> | Group オブジェクト |

---

<a name="Group+toBytesLe"></a>

### toBytesLe

<p>グループ要素をリトルエンディアンの Uint8Array としてエンコードします。</p>

```javascript
toBytesLe() ► Uint8Array
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Uint8Array</code> |

---

<a name="Group.fromBitsLe"></a>

### fromBitsLe

<p>真偽値配列による表現からグループ要素を再構築します。</p>

```javascript
fromBitsLe(bits) ► Group
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bits | <code>Array.&lt;any&gt;</code> | 真偽値配列による表現 |
| *return* | <code>Group</code> | Group オブジェクト |

---

<a name="Group+toBitsLe"></a>

### toBitsLe

<p>グループ要素をリトルエンディアンの真偽値配列として取得します。</p>

```javascript
toBitsLe() ► Array.<any>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Group+toFields"></a>

### toFields

<p>グループ要素をフィールド値の配列として取得します。</p>

```javascript
toFields() ► Array.<any>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Group+toXCoordinate"></a>

### toXCoordinate

<p>グループ要素の x 座標を取得します。</p>

```javascript
toXCoordinate() ► Field
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> |

---

<a name="Group+toPlaintext"></a>

### toPlaintext

<p>グループ要素から Plaintext を生成します。</p>

```javascript
toPlaintext() ► Plaintext
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Plaintext</code> |

---

<a name="Group+clone"></a>

### clone

<p>グループ要素を複製します。</p>

```javascript
clone() ► Group
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Group</code> |

---

<a name="Group.random"></a>

### random

<p>ランダムなグループ要素を生成します。</p>

```javascript
random() ► Group
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Group</code> |

---

<a name="Group+add"></a>

### add

<p>2 つのグループ要素を加算します。</p>

```javascript
add(other) ► Group
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Group</code> | 加算するグループ要素 |
| *return* | <code>Group</code> | 加算結果 |

---

<a name="Group+subtract"></a>

### subtract

<p>2 つのグループ要素を減算します（要素の逆元を加算するのと等価）。</p>

```javascript
subtract(other) ► Group
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Group</code> | 減算するグループ要素 |
| *return* | <code>Group</code> | 減算結果 |

---

<a name="Group+scalarMultiply"></a>

### scalarMultiply

<p>グループ要素にスカラー要素を掛けます。</p>

```javascript
scalarMultiply(scalar) ► Group
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| scalar | <code>Scalar</code> | 乗算に使用するスカラー要素 |
| *return* | <code>Group</code> | スカラー乗算の結果 |

---

<a name="Group+double"></a>

### double

<p>グループ要素を 2 倍します。</p>

```javascript
double() ► Group
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Group</code> |

---

<a name="Group+inverse"></a>

### inverse

<p>グループ要素の逆元を取得します。対称軸に関する反転、すなわち (x, y) → (x, -y) を意味します。</p>

```javascript
inverse() ► Group
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Group</code> |

---

<a name="Group+equals"></a>

### equals

<p>2 つのグループ要素が等しいかどうかを判定します。</p>

```javascript
equals(other) ► boolean
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Group</code> | 比較対象のグループ要素 |
| *return* | <code>boolean</code> | グループ要素が等しい場合は true |

---

<a name="Group.zero"></a>

### zero

<p>グループ演算における単位元（無限遠点）を取得します。</p>

```javascript
zero() ► Group
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Group</code> |

---

<a name="Group.generator"></a>

### generator

<p>グループの生成元を取得します。</p>

```javascript
generator() ► Group
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Group</code> |

---
