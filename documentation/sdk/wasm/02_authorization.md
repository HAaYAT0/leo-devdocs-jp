---
title: 承認
sidebar_label: 承認
---

<a name="Authorization"></a>

## 概要

<p>Authorization オブジェクトはトランザクションの承認情報を保持します。このクラスは、Aleo トランザクションでプログラム実行を承認するために使用される Authorization オブジェクトを生成・操作・照会するためのメソッドを提供します。</p>



## メソッド

<a name="Authorization.new"></a>

### new

<p>リクエストオブジェクトから新しい Authorization を作成します。</p>

```javascript
new(request) ► Authorization
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| request | <code>ExecutionRequest</code> | Authorization の元となる ExecutionRequest |
| *return* | <code>Authorization</code> |

---

<a name="Authorization+replicate"></a>

### replicate

<p>Authorization の内容を複製し、新しい独立したインスタンスを返します。</p>

```javascript
replicate() ► Authorization
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Authorization</code> |

---

<a name="Authorization+toString"></a>

### toString

<p>Authorization の文字列表現を返します。</p>

```javascript
toString() ► string
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> |

---

<a name="Authorization.fromString"></a>

### fromString

<p>文字列表現から Authorization オブジェクトを再構築します。</p>

```javascript
fromString(authorization) ► Authorization
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| authorization | <code>String</code> | Authorization の文字列表現 |
| *return* | <code>Authorization</code> |

---

<a name="Authorization+toBytesLe"></a>

### toBytesLe

<p>Authorization のリトルエンディアンのバイト表現を返します。</p>

```javascript
toBytesLe() ► Uint8Array
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Uint8Array</code> |

---

<a name="Authorization.fromBytesLe"></a>

### fromBytesLe

<p>Authorization のリトルエンディアンのバイト表現から Authorization オブジェクトを生成します。</p>

```javascript
fromBytesLe(bytes) ► Authorization
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | Authorization を表すリトルエンディアンのバイト列 |
| *return* | <code>Authorization</code> |

---

<a name="Authorization+equals"></a>

### equals

<p>2 つの Authorization オブジェクトが同一かどうかを判定します。</p>

```javascript
equals(other) ► boolean
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| other | <code>Authorization</code> | 比較対象の Authorization オブジェクト |
| *return* | <code>boolean</code> |

---

<a name="Authorization+len"></a>

### len

<p>Authorization に含まれるリクエストの数を返します。</p>

```javascript
len() ► number
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>number</code> |

---

<a name="Authorization+isEmpty"></a>

### isEmpty

<p>Authorization が空であれば true を返します。</p>

```javascript
isEmpty() ► boolean
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>boolean</code> |

---

<a name="Authorization+isFeePrivate"></a>

### isFeePrivate

<p>Authorization が credits.aleo/fee_private を対象としている場合に true を返します。</p>

```javascript
isFeePrivate() ► boolean
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>boolean</code> |

---

<a name="Authorization+isFeePublic"></a>

### isFeePublic

<p>Authorization が credits.aleo/fee_public を対象としている場合に true を返します。</p>

```javascript
isFeePublic() ► boolean
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>boolean</code> |

---

<a name="Authorization+isSplit"></a>

### isSplit

<p>Authorization が credits.aleo/split を対象としている場合に true を返します。</p>

```javascript
isSplit() ► boolean
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>boolean</code> |

---

<a name="Authorization+insertTransition"></a>

### insertTransition

<p>Authorization にトランジションを追加します。</p>

```javascript
insertTransition(transition) ► void
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| transition | <code>Transition</code> | Authorization に追加するトランジション |
| *return* | <code>void</code> |

---

<a name="Authorization+transitions"></a>

### transitions

<p>Authorization 内のトランジション一覧を取得します。</p>

```javascript
transitions() ► Array.<Transition>
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;Transition&gt;</code> | トランジションオブジェクトの配列 |

---

<a name="Authorization+toExecutionId"></a>

### toExecutionId

<p>Authorization の実行 ID を返します。</p>

```javascript
toExecutionId() ► Field
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Field</code> | Authorization の実行 ID。文字列表現が必要な場合は戻り値に対して toString() を呼び出してください |

---
