---
title: Plaintext
sidebar_label: Plaintext
---

<a name="Plaintext"></a>

## 概要

<p>SnarkVM の Plaintext オブジェクトです。Plaintext は Aleo のプリミティブ型（boolean、field、group、i8、i16、i32、i64、i128、u8、u16、u32、u64、u128、scalar、signature）や構造体、配列を表現する基本的なモナド型です。</p>

<p>Web / Node.js アプリケーションでは、Aleo の型を JS の値・オブジェクト・配列へ変換してアプリ内での計算に利用する際に役立ちます。</p>

## 使用例

```javascript
// 既存アドレスの bond state を取得します。
const bondState = await fetch(https://api.explorer.provable.com/v1/mainnet/program/credits.aleo/mapping/bond_state/aleo12zlythl7htjdtjjjz3ahdj4vl6wk3zuzm37s80l86qpx8fyx95fqnxcn2f);
// bond state を Plaintext オブジェクトへ変換します。
const bondStatePlaintext = Plaintext.fromString(bond_state);
// Plaintext オブジェクトを JS オブジェクトへ変換します。
const bondStateObject = bond_state_plaintext.toObject();
// 期待するオブジェクトと一致するか確認します。
const expectedObject = { validator: "aleo12zlythl7htjdtjjjz3ahdj4vl6wk3zuzm37s80l86qpx8fyx95fqnxcn2f", microcredits: 100000000u64 };
assert( JSON.stringify(bondStateObject) === JSON.stringify(expectedObject) );
```

## メソッド

<a name="Plaintext+find"></a>

### find

<p>Plaintext が構造体である場合、指定したメンバーを検索します。構造体でない場合やメンバーが存在しない場合は null を返します。</p>

```javascript
find(name) ► Plaintext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| name | <code>string</code> | 検索するメンバーの名前 |
| *return* | <code>Plaintext</code> | 見つかったメンバー |

---

<a name="Plaintext+encrypt"></a>

### encrypt

<p>アドレスとランダマイザーを使って Plaintext を暗号化します。</p>

```javascript
encrypt(address, randomizer) ► Ciphertext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| address | <code>Address</code> | 暗号化対象となるアドレス |
| randomizer | <code>Scalar</code> | 暗号化に使用するランダマイザー |
| *return* | <code>Ciphertext</code> | 暗号化された Ciphertext |

---

<a name="Plaintext+encryptSymmetric"></a>

### encryptSymmetric

<p>トランジションビューキーを使って Plaintext を暗号化します。</p>

```javascript
encryptSymmetric(transition_view_key) ► Ciphertext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| transition_view_key | <code>Field</code> | Plaintext に対応するトランジションのトランジションビューキー |
| *return* | <code>Ciphertext</code> | 暗号化された Ciphertext |

---

<a name="Plaintext.fromString"></a>

### fromString

<p>Plaintext の文字列表現から Plaintext オブジェクトを生成します。</p>

```javascript
fromString(plaintext) ► Plaintext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| plaintext | <code>string</code> | Plaintext の文字列表現 |
| *return* | <code>Plaintext</code> | Plaintext オブジェクト |

---

<a name="Plaintext.fromBytesLe"></a>

### fromBytesLe

<p>リトルエンディアンのバイト列から Plaintext オブジェクトを生成します。</p>

```javascript
fromBytesLe(bytes) ► Plaintext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | Plaintext を表すリトルエンディアンのバイト配列 |
| *return* | <code>Plaintext</code> | Plaintext オブジェクト |

---

<a name="Plaintext+toBytesLe"></a>

### toBytesLe

<p>Plaintext のリトルエンディアンのバイト配列表現を取得します。</p>

```javascript
toBytesLe() ► Uint8Array
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | <code>Uint8Array</code> | Plaintext のリトルエンディアンバイト配列 |

---

<a name="Plaintext.fromBitsLe"></a>

### fromBitsLe

<p>リトルエンディアンの真偽値配列から Plaintext オブジェクトを生成します。</p>

```javascript
fromBitsLe(bits) ► Plaintext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| bits | <code>Array</code> | Plaintext を表すリトルエンディアンの真偽値配列 |
| *return* | <code>Plaintext</code> | Plaintext オブジェクト |

---

<a name="Plaintext+toBitsLe"></a>

### toBitsLe

<p>Plaintext のビット列をリトルエンディアンの真偽値配列として取得します。</p>

```javascript
toBitsLe() ► Array
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | <code>Array</code> | Plaintext のビット列を表すリトルエンディアンの真偽値配列 |

---

<a name="Plaintext.fromFields"></a>

### fromFields

<p>フィールド値の配列から Plaintext オブジェクトを生成します。</p>

```javascript
fromFields(fields) ► Plaintext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| fields | <code>Array</code> | フィールド値の配列 |
| *return* | <code>Plaintext</code> | Plaintext オブジェクト |

---

<a name="Plaintext+toFields"></a>

### toFields

<p>Plaintext のフィールド値配列表現を取得します。</p>

```javascript
toFields() ► Array
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | <code>Array</code> | Plaintext のフィールド値配列 |

---

<a name="Plaintext+toString"></a>

### toString

<p>Plaintext の文字列表現を返します。</p>

```javascript
toString() ► string
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | <code>string</code> | Plaintext の文字列表現 |

---

<a name="Plaintext+plaintextType"></a>

### plaintextType

<p>Plaintext の型名を返します。</p>

```javascript
plaintextType() ► string
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | <code>string</code> | Plaintext の型 |

---

<a name="Plaintext+toObject"></a>

### toObject

<p>Plaintext を JS オブジェクトへ変換します。</p>

```javascript
toObject() ► Object
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | <code>Object</code> | Plaintext の JS オブジェクト表現 |

---
