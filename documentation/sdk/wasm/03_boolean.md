---
title: ブール値
sidebar_label: ブール値
---

<a name="Boolean"></a>

## 概要

<p>Boolean クラスは Aleo で論理演算を行うためのブール値を表します。ブール値の生成、さまざまな形式への変換、AND／OR／XOR／NAND／NOR／NOT といった論理演算を実行するためのメソッドを提供します。</p>



## コンストラクター

### Boolean

<p>ネイティブの JS ブール値から Boolean を生成します。</p>

```javascript
Boolean(value)
```

| パラメーター | 型 |
| --- | --- |
| value | <code>boolean</code> |

## メソッド

<a name="Boolean.fromString"></a>

### fromString

<p>文字列表現（"true" / "false"）から Boolean オブジェクトを生成します。</p>

```javascript
fromString(boolean) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| boolean | <code>string</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+toString"></a>

### toString

<p>Boolean 要素の文字列表現を返します。</p>

```javascript
toString() ► string
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> |

---

<a name="Boolean.fromBytesLe"></a>

### fromBytesLe

<p>リトルエンディアンの Uint8Array から Boolean 要素を生成します。</p>

```javascript
fromBytesLe(bytes) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| bytes | <code>Uint8Array</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+toBytesLe"></a>

### toBytesLe

<p>Boolean 要素をリトルエンディアンの Uint8Array としてエンコードします。</p>

```javascript
toBytesLe() ► Uint8Array
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Uint8Array</code> |

---

<a name="Boolean.fromBitsLe"></a>

### fromBitsLe

<p>真偽値配列による表現から Boolean 要素を再構築します。</p>

```javascript
fromBitsLe(bits) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| bits | <code>Array.&lt;any&gt;</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+toBitsLe"></a>

### toBitsLe

<p>Boolean 要素をリトルエンディアンの真偽値配列として取得します。</p>

```javascript
toBitsLe() ► Array.<any>
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Boolean+toPlaintext"></a>

### toPlaintext

<p>Boolean 要素から Plaintext を生成します。</p>

```javascript
toPlaintext() ► Plaintext
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Plaintext</code> |

---

<a name="Boolean+clone"></a>

### clone

<p>Boolean 要素を複製します。</p>

```javascript
clone() ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Boolean</code> |

---

<a name="Boolean.random"></a>

### random

<p>ランダムな Boolean 要素を生成します。</p>

```javascript
random() ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+not"></a>

### not

<p>論理 NOT を実行します。</p>

```javascript
not() ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+and"></a>

### and

<p>論理 AND を実行します。</p>

```javascript
and(other) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| other | <code>Boolean</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+or"></a>

### or

<p>論理 OR を実行します。</p>

```javascript
or(other) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| other | <code>Boolean</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+xor"></a>

### xor

<p>論理 XOR を実行します。</p>

```javascript
xor(other) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| other | <code>Boolean</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+nand"></a>

### nand

<p>論理 NAND を実行します。</p>

```javascript
nand(other) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| other | <code>Boolean</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+nor"></a>

### nor

<p>論理 NOR を実行します。</p>

```javascript
nor(other) ► Boolean
```



| パラメーター | 型 |
| --- | --- |
| other | <code>Boolean</code> |
| *return* | <code>Boolean</code> |

---

<a name="Boolean+equals"></a>

### equals

<p>2 つの Boolean 要素が等しいかどうかを判定します。</p>

```javascript
equals(other) ► boolean
```



| パラメーター | 型 |
| --- | --- |
| other | <code>Boolean</code> |
| *return* | <code>boolean</code> |

---
