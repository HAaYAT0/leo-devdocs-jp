---
title: アドレス
sidebar_label: アドレス
---

<a name="Address"></a>

## 概要

<p>Address クラスは Aleo アカウントの公開アドレスを表します。秘密鍵・ビューキー・コンピュートキーなどのさまざまな情報源からアドレスを生成したり、バイト列・ビット列・フィールド・グループといった複数の形式を相互に変換したり、署名を検証したりするメソッドを提供します。</p>



## メソッド

<a name="Address.from_private_key"></a>

### from_private_key

<p>秘密鍵から Aleo アドレスを導出します。</p>

```javascript
from_private_key(private_key) ► Address
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| private_key | <code>PrivateKey</code> | アドレスを導出する元の秘密鍵 |
| *return* | <code>Address</code> | 秘密鍵に対応するアドレス |

---

<a name="Address.from_view_key"></a>

### from_view_key

<p>ビューキーから Aleo アドレスを導出します。</p>

```javascript
from_view_key(view_key) ► Address
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| view_key | <code>ViewKey</code> | アドレスを導出する元のビューキー |
| *return* | <code>Address</code> | ビューキーに対応するアドレス |

---

<a name="Address.from_compute_key"></a>

### from_compute_key

<p>コンピュートキーから Aleo アドレスを導出します。</p>

```javascript
from_compute_key(compute_key) ► Address
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| compute_key | <code>ComputeKey</code> | アドレスを導出する元のコンピュートキー |
| *return* | <code>Address</code> | コンピュートキーに対応するアドレス |

---

<a name="Address.fromBytesLe"></a>

### fromBytesLe

<p>リトルエンディアンのバイト列からアドレスを生成します。</p>

```javascript
fromBytesLe(bytes) ► Address
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | アドレスを表すリトルエンディアンのバイト配列 |
| *return* | <code>Address</code> | 生成されたアドレスオブジェクト |

---

<a name="Address+toBytesLe"></a>

### toBytesLe

<p>アドレスをリトルエンディアンのバイト配列に変換します。</p>

```javascript
toBytesLe() ► Uint8Array
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Uint8Array</code> |

---

<a name="Address.fromBitsLe"></a>

### fromBitsLe

<p>リトルエンディアンのビット列（真偽値配列）からアドレスを生成します。</p>

```javascript
fromBitsLe(bits) ► Address
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bits | <code>Array</code> | アドレスのビット列を表すリトルエンディアンの真偽値配列 |
| *return* | <code>Address</code> | 生成されたアドレスオブジェクト |

---

<a name="Address+toBitsLe"></a>

### toBitsLe

<p>アドレスをリトルエンディアンのビット配列に変換します。</p>

```javascript
toBitsLe() ► Array.<any>
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Address.fromFields"></a>

### fromFields

<p>フィールド配列からアドレスオブジェクトを生成します。</p>

```javascript
fromFields(fields) ► Plaintext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| fields | <code>Array</code> | フィールド値の配列 |
| *return* | <code>Plaintext</code> | 生成されたアドレスオブジェクト |

---

<a name="Address+toFields"></a>

### toFields

<p>アドレスをフィールド値の配列に変換します。</p>

```javascript
toFields() ► Array.<any>
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Address.fromGroup"></a>

### fromGroup

<p>グループ要素からアドレスオブジェクトを生成します。</p>

```javascript
fromGroup(group) ► Address
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| group | <code>Group</code> | 入力となるグループ要素 |
| *return* | <code>Address</code> | 生成されたアドレスオブジェクト |

---

<a name="Address+toGroup"></a>

### toGroup

<p>アドレスオブジェクトをグループ要素に変換します。</p>

```javascript
toGroup() ► Group
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Group</code> |

---

<a name="Address.from_string"></a>

### from_string

<p>文字列表現から Aleo アドレスオブジェクトを生成します。</p>

```javascript
from_string(address) ► Address
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| address | <code>string</code> | アドレスの文字列表現 |
| *return* | <code>Address</code> | 生成されたアドレスオブジェクト |

---

<a name="Address+to_string"></a>

### to_string

<p>Aleo アドレスオブジェクトを文字列表現に変換します。</p>

```javascript
to_string(Address) ► string
```



| パラメーター | 型 |
| --- | --- |
| Address | <code>Address</code> |
| *return* | <code>string</code> | アドレスの文字列表現 |

---

<a name="Address+toPlaintext"></a>

### toPlaintext

<p>アドレスの平文表現を取得します。</p>

```javascript
toPlaintext() ► Plaintext
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Plaintext</code> |

---

<a name="Address+verify"></a>

### verify

<p>このアドレスによって署名されたメッセージの署名を検証します。</p>

```javascript
verify(Byte) ► boolean
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| Byte | <code>Uint8Array</code> | アドレスが署名したメッセージを表すバイト配列 |
| *return* | <code>boolean</code> | 署名が有効かどうかを示す真偽値 |

---
