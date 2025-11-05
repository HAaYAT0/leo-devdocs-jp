---
title: 実行のレスポンス
sidebar_label: 実行のレスポンス
---

<a name="ExecutionResponse"></a>

## 概要

<p>Aleo 関数実行のレスポンスを表す WebAssembly オブジェクトです。オフチェーンで Aleo 関数を実行した際に返され、関数実行の出力や実行詳細、プログラム鍵、証明鍵／検証鍵などへアクセスするためのメソッドを備えています。</p>



## メソッド

<a name="ExecutionResponse+getOutputs"></a>

### getOutputs

<p>実行した関数の出力を取得します。</p>

```javascript
getOutputs() ► Array
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Array</code> | 関数の出力を表す文字列の配列 |

---

<a name="ExecutionResponse+getExecution"></a>

### getExecution

<p>Execution オブジェクトが存在すればそれを返し、存在しない場合は null を返します。</p>

```javascript
getExecution() ► Execution
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Execution</code> | 実行オブジェクト（存在しない場合は null） |

---

<a name="ExecutionResponse+getKeys"></a>

### getKeys

<p>プログラム鍵が存在する場合に取得します。</p>

```javascript
getKeys() ► KeyPair
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>KeyPair</code> |

---

<a name="ExecutionResponse+getProvingKey"></a>

### getProvingKey

<p>Execution レスポンス内にキャッシュされている場合、proving_key を返します。このメソッドを初めて呼び出すと proving_key はレスポンスオブジェクトから取り除かれ、2 回目以降は null を返します。</p>

```javascript
getProvingKey() ► ProvingKey
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>ProvingKey</code> | 証明鍵 |

---

<a name="ExecutionResponse+getVerifyingKey"></a>

### getVerifyingKey

<p>プログラムに紐づく verifying_key を返します。</p>

```javascript
getVerifyingKey() ► VerifyingKey
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>VerifyingKey</code> | 検証鍵 |

---

<a name="ExecutionResponse+getFunctionId"></a>

### getFunctionId

<p>関数 ID を返します。</p>

```javascript
getFunctionId() ► string
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> |

---

<a name="ExecutionResponse+getProgram"></a>

### getProgram

<p>Program オブジェクトを返します。</p>

```javascript
getProgram() ► Program
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Program</code> |

---
