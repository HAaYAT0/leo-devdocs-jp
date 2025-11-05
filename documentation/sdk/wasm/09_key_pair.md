---
title: 鍵のペア
sidebar_label: 鍵のペア
---

<a name="KeyPair"></a>

## 概要

<p>KeyPair オブジェクトは Aleo プログラムの関数に対応する証明鍵と検証鍵を保持します。関数の実行を証明・検証するために必要な暗号鍵へアクセスできます。</p>



## コンストラクター

### KeyPair

<p>証明鍵と検証鍵から新しいキー ペアを作成します。</p>

```javascript
KeyPair(proving_key, verifying_key)
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| proving_key | <code>ProvingKey</code> | Aleo プログラム内の関数に対応する証明鍵 |
| verifying_key | <code>VerifyingKey</code> | Aleo プログラム内の関数に対応する検証鍵 |
| *return* | <code>KeyPair</code> | 証明鍵と検証鍵を保持するキー ペア |

## メソッド

<a name="KeyPair+provingKey"></a>

### provingKey

<p>証明鍵を取得します。このメソッドを呼び出すとキー ペアから証明鍵が取り除かれます。</p>

```javascript
provingKey() ► ProvingKey
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>ProvingKey</code> |

---

<a name="KeyPair+verifyingKey"></a>

### verifyingKey

<p>検証鍵を取得します。このメソッドを呼び出すとキー ペアから検証鍵が取り除かれます。</p>

```javascript
verifyingKey() ► VerifyingKey
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>VerifyingKey</code> |

---
