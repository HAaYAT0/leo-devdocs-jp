---
title: PrivateKey
sidebar_label: PrivateKey
---

<a name="PrivateKey"></a>

## 概要

<p>PrivateKey クラスは Aleo アカウントの秘密鍵を扱います。秘密鍵の生成・インポート・利用を通じて、署名や暗号化、アカウント導出などの暗号処理を提供します。</p>

## コンストラクター

<a name="PrivateKey.new"></a>

### PrivateKey

<p>暗号学的に安全な乱数生成器を使って新しい秘密鍵を生成します。</p>

```javascript
PrivateKey()
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>PrivateKey</code> |

---

## メソッド

<a name="PrivateKey.from_seed_unchecked"></a>

### from_seed_unchecked

<p>検証を行わないバイト列から秘密鍵を生成します。</p>

```javascript
from_seed_unchecked(seed) ► PrivateKey
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| seed | <code>Uint8Array</code> | 32 バイトの未検証 Uint8Array。秘密鍵導出のシードとして扱います |
| *return* | <code>PrivateKey</code> | シードから導出された秘密鍵 |

---

<a name="PrivateKey.from_string"></a>

### from_string

<p>秘密鍵の文字列表現から秘密鍵を復元します。</p>

```javascript
from_string(seed) ► PrivateKey
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| seed | <code>string</code> | 秘密鍵の文字列表現 |
| *return* | <code>PrivateKey</code> | 秘密鍵オブジェクト |

---

<a name="PrivateKey+to_string"></a>

### to_string

<p>秘密鍵の文字列表現を取得します。この関数は秘密鍵を平文で露出させるため、慎重に使用してください。</p>

```javascript
to_string() ► string
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| *return* | <code>string</code> | 秘密鍵の文字列表現 |

---

<a name="PrivateKey+to_view_key"></a>

### to_view_key

<p>秘密鍵に対応するビューキーを取得します。</p>

```javascript
to_view_key() ► ViewKey
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>ViewKey</code> |

---

<a name="PrivateKey+to_address"></a>

### to_address

<p>秘密鍵に対応するアドレスを取得します。</p>

```javascript
to_address() ► Address
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Address</code> |

---

<a name="PrivateKey+sign"></a>

### sign

<p>秘密鍵を使ってメッセージに署名します。</p>

```javascript
sign(Byte) ► Signature
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| Byte | <code>Uint8Array</code> | アドレスで署名したメッセージを表す配列 |
| *return* | <code>Signature</code> | メッセージへ署名した結果の署名 |

---

<a name="PrivateKey.newEncrypted"></a>

### newEncrypted

<p>シークレットを使って新しい秘密鍵の暗号文を生成します。シークレットは秘匿情報であり、後で秘密鍵を復号する際に必要になるため安全に保管してください。</p>

```javascript
newEncrypted(secret) ► PrivateKeyCiphertext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| secret | <code>string</code> | 秘密鍵の暗号化に使用するシークレット |
| *return* | <code>PrivateKeyCiphertext</code> | 秘密鍵の暗号文 |

---

<a name="PrivateKey+toCiphertext"></a>

### toCiphertext

<p>既存の秘密鍵をシークレットで暗号化します。シークレットは後で復号に必要になるため安全に保管してください。</p>

```javascript
toCiphertext(secret) ► PrivateKeyCiphertext
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| secret | <code>string</code> | 秘密鍵の暗号化に使用するシークレット |
| *return* | <code>PrivateKeyCiphertext</code> | 秘密鍵の暗号文 |

---

<a name="PrivateKey.fromPrivateKeyCiphertext"></a>

### fromPrivateKeyCiphertext

<p>秘密鍵の暗号文と暗号化に使用したシークレットから秘密鍵を復元します。</p>

```javascript
fromPrivateKeyCiphertext(ciphertext, secret) ► PrivateKey
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| ciphertext | <code>PrivateKeyCiphertext</code> | 秘密鍵の暗号文 |
| secret | <code>string</code> | 暗号化に使用したシークレット |
| *return* | <code>PrivateKey</code> | 復元された秘密鍵 |

---
