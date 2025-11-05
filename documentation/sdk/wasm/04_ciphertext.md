---
title: 暗号文
sidebar_label: 暗号文
---

<a name="Ciphertext"></a>

## 概要

<p>SnarkVM の Ciphertext オブジェクトです。Ciphertext は対称鍵で暗号化された平文を表します。適切な復号素材（ビューキー、トランジションキー、ノンスなど）があれば、暗号文から平文を復元するための復号メソッドを提供します。</p>



## メソッド

<a name="Ciphertext+decrypt"></a>

### decrypt

<p>指定したビューキーを使って暗号文を復号します。</p>

```javascript
decrypt(viewKey, nonce) ► Plaintext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| viewKey | <code>ViewKey</code> | 暗号化に使用したアカウントのビューキー |
| nonce | <code>Group</code> | 暗号化に使用したノンス |
| *return* | <code>Plaintext</code> | 復号された平文 |

---

<a name="Ciphertext+decryptWithTransitionInfo"></a>

### decryptWithTransitionInfo

<p>トランジション署名者のビューキー、トランジション公開鍵、および (program, function, index) の組を使って暗号文を復号します。</p>

```javascript
decryptWithTransitionInfo(view_key, transition_public_key, program, function_name, index) ► Plaintext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| view_key | <code>ViewKey</code> | トランジション署名者のビューキー |
| transition_public_key | <code>Group</code> | 暗号化に使用したトランジション公開鍵 |
| program | <code>string</code> | 暗号文に関連付けられたプログラム ID |
| function_name | <code>string</code> | 暗号化された入出力に対応する関数名 |
| index | <code>u16</code> | 暗号化された入力または出力パラメーターのインデックス |
| *return* | <code>Plaintext</code> | 復号された平文 |

---

<a name="Ciphertext+decryptWithTransitionViewKey"></a>

### decryptWithTransitionViewKey

<p>トランジションビューキーと (program, function, index) の組を使って暗号文を復号します。</p>

```javascript
decryptWithTransitionViewKey(transition_view_key, program, function_name, index) ► Plaintext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| transition_view_key | <code>Field</code> | 暗号化に使用したトランジションビューキー |
| program | <code>string</code> | 暗号文に関連付けられたプログラム ID |
| function_name | <code>string</code> | 暗号化された入出力に対応する関数名 |
| index | <code>u16</code> | 暗号化された入力または出力パラメーターのインデックス |
| *return* | <code>Plaintext</code> | 復号された平文 |

---

<a name="Ciphertext+decryptSymmetric"></a>

### decryptSymmetric

<p>指定したトランジションビューキーを使用して暗号文を対称復号し、平文を得ます。</p>

```javascript
decryptSymmetric(transition_view_key) ► Plaintext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| transition_view_key | <code>Field</code> | 暗号化に使用したトランジションビューキー |
| *return* | <code>Plaintext</code> | 復号された平文 |

---

<a name="Ciphertext.fromBytesLe"></a>

### fromBytesLe

<p>リトルエンディアンのバイト配列から Ciphertext を復元します。</p>

```javascript
fromBytesLe(bytes) ► Ciphertext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | Ciphertext を表すバイト配列 |
| *return* | <code>Ciphertext</code> | 復元された Ciphertext オブジェクト |

---

<a name="Ciphertext+toBytesLe"></a>

### toBytesLe

<p>Ciphertext のリトルエンディアンのバイト配列表現を取得します。</p>

```javascript
toBytesLe() ► Uint8Array
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Uint8Array</code> |

---

<a name="Ciphertext.fromBitsLe"></a>

### fromBitsLe

<p>リトルエンディアンの真偽値配列から Ciphertext オブジェクトを生成します。</p>

```javascript
fromBitsLe(bits) ► Ciphertext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bits | <code>Array</code> | 暗号文のビット列を表すリトルエンディアンの真偽値配列 |
| *return* | <code>Ciphertext</code> | 生成された Ciphertext オブジェクト |

---

<a name="Ciphertext+toBitsLe"></a>

### toBitsLe

<p>Ciphertext のビット列をリトルエンディアンの真偽値配列として取得します。</p>

```javascript
toBitsLe() ► Array.<any>
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Ciphertext.fromFields"></a>

### fromFields

<p>フィールド値の配列から Ciphertext オブジェクトを生成します。</p>

```javascript
fromFields(fields) ► Ciphertext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| fields | <code>Array</code> | フィールド値の配列 |
| *return* | <code>Ciphertext</code> | 生成された Ciphertext オブジェクト |

---

<a name="Ciphertext+toFields"></a>

### toFields

<p>Ciphertext をフィールド値の配列として取得します。</p>

```javascript
toFields() ► Array.<any>
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array.&lt;any&gt;</code> |

---

<a name="Ciphertext.fromString"></a>

### fromString

<p>Ciphertext の文字列表現から Ciphertext オブジェクトを復元します。</p>

```javascript
fromString(ciphertext) ► Ciphertext
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| ciphertext | <code>string</code> | Ciphertext の文字列表現 |
| *return* | <code>Ciphertext</code> | 復元された Ciphertext オブジェクト |

---

<a name="Ciphertext+toBytes"></a>

### toBytes

<p>Ciphertext オブジェクトをバイト配列にシリアライズします。</p>

```javascript
toBytes() ► Uint8Array
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Uint8Array</code> | シリアライズされた Ciphertext |

---

<a name="Ciphertext+toString"></a>

### toString

<p>Ciphertext を JavaScript の文字列にシリアライズします。</p>

```javascript
toString() ► string
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> | シリアライズされた Ciphertext |

---
