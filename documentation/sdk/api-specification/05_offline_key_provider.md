---
id: offline_key_provider
title: オフラインキー プロバイダー
sidebar_label: オフラインキー プロバイダー
---

## 概要

ハードウェアウォレットのようなデバイスで、オフライン環境でトランザクションを構築するためのキー プロバイダーです。インターネット越しに鍵素材へアクセスすることはできず、ユーザーが事前にローカルストレージから Aleo の関数用証明鍵・検証鍵を読み込むことを前提としています。

**種類**: グローバルクラス

* OfflineKeyProvider
    * _instance_
        * [.bondPublicKeys()](#bondpublickeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.bondValidatorKeys()](#bondvalidatorkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.cacheKeys(keyId, keys)](#cachekeys)
        * [.claimUnbondPublicKeys()](#claimunbondpublickeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.functionKeys(params)](#functionkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.verifyCreditsKeys()](#verifycreditskeys) ⇒ <code>boolean</code>
        * [.feePrivateKeys()](#feeprivatekeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.feePublicKeys()](#feepublickeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.joinKeys()](#joinkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.splitKeys()](#splitkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.transferKeys(visibility)](#transferkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.unBondPublicKeys()](#unbondpublickeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.insertBondPublicKeys(provingKey)](#insertbondpublickeys)
        * [.insertClaimUnbondPublicKeys(provingKey)](#insertclaimunbondpublickeys)
        * [.insertFeePrivateKeys(provingKey)](#insertfeeprivatekeys)
        * [.insertFeePublicKeys(provingKey)](#insertfeepublickeys)
        * [.insertJoinKeys(provingKey)](#insertjoinkeys)
        * [.insertSetValidatorStateKeys(provingKey)](#insertsetvalidatorstatekeys)
        * [.insertSplitKeys(provingKey)](#insertsplitkeys)
        * [.insertTransferPrivateKeys(provingKey)](#inserttransferprivatekeys)
        * [.insertTransferPrivateToPublicKeys(provingKey)](#inserttransferprivatetopublickeys)
        * [.insertTransferPublicKeys(provingKey)](#inserttransferpublickeys)
        * [.insertTransferPublicToPrivateKeys(provingKey)](#inserttransferpublictoprivatekeys)


## Example

```javascript
// オフライン用の ProgramManager を作成します
const programManager = new ProgramManager();

// プログラム実行用に一時的なアカウントを作成します
const account = new Account();
programManager.setAccount(account);

// オフライン環境にある鍵バイト列から証明鍵を作成します
console.log("Creating proving keys from local key files");
const program = "program hello_hello.aleo; function hello: input r0 as u32.public; input r1 as u32.private; add r0 r1 into r2; output r2 as u32.private;";
const myFunctionProver = await getLocalKey("/path/to/my/function/hello_hello.prover");
const myFunctionVerifier = await getLocalKey("/path/to/my/function/hello_hello.verifier");
const feePublicProvingKeyBytes = await getLocalKey("/path/to/credits.aleo/feePublic.prover");

myFunctionProvingKey = ProvingKey.fromBytes(myFunctionProver);
myFunctionVerifyingKey = VerifyingKey.fromBytes(myFunctionVerifier);
const feePublicProvingKey = ProvingKey.fromBytes(feePublicKeyBytes);

// オフラインキー プロバイダーを作成します
console.log("Creating offline key provider");
const offlineKeyProvider = new OfflineKeyProvider();

// 鍵をキャッシュします
// カスタム hello 関数の証明鍵と検証鍵をキャッシュします
OfflineKeyProvider.cacheKeys("hello_hello.aleo/hello", myFunctionProvingKey, myFunctionVerifyingKey);

// fee_public 関数の証明鍵をキャッシュします（検証鍵は自動的にキャッシュされます）
OfflineKeyProvider.insertFeePublicKey(feePublicProvingKey);

// 最新のステートルートを使用してインクルージョン証明を生成するためのオフラインクエリを作成します
const offlineQuery = new OfflineQuery("latestStateRoot");

// ProgramManager にキー プロバイダーを設定します
programManager.setKeyProvider(offlineKeyProvider);

// オフライン検索パラメーターを作成します
const offlineSearchParams = new OfflineSearchParams("hello_hello.aleo/hello");

// オフラインでトランザクションを作成します
const offlineExecuteTx = <Transaction>await this.buildExecutionTransaction("hello_hello.aleo", "hello", 1, false, ["5u32", "5u32"], undefined, offlineSearchParams, undefined, undefined, undefined, undefined, offlineQuery, program);

// インターネット接続があるマシンで後からトランザクションをブロードキャストします
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const txId = await networkClient.broadcastTransaction(offlineExecuteTx);
```

## Methods

### bondPublicKeys

credits.aleo プログラムから bond_public 関数の鍵を取得します。事前に鍵をキャッシュしておく必要があります。

```javascript
bondPublicKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *bond_public 関数の証明鍵と検証鍵*

---

### bondValidatorKeys

credits.aleo プログラムから bond_validator 関数の鍵を取得します。事前に鍵をキャッシュしておく必要があります。

```javascript
bondValidatorKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *bond_public 関数の証明鍵と検証鍵*

---

### cacheKeys

鍵のセットをキャッシュします。同じ keyId が既に存在する場合は上書きされます。上書きを避けたい場合は、containsKeys メソッドで事前に存在を確認してください。

```javascript
cacheKeys(keyId, keys)
```

パラメーター | 型 | 説明
--- | --- | ---
__keyId__ | `string` | *キャッシュを識別するキー*
__keys__ | `FunctionKeyPair` | *キャッシュする鍵*

---

### claimUnbondPublicKeys

credits.aleo プログラムから unbond_public 関数の鍵を取得します。事前に鍵をキャッシュしておく必要があります。

```javascript
claimUnbondPublicKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *unbond_public 関数の証明鍵と検証鍵*

---

### functionKeys

オフラインキー プロバイダーのキャッシュから任意の関数鍵を取得します。

```javascript
functionKeys(params)
```

パラメーター | 型 | 説明
--- | --- | ---
__params__ | `KeySearchParams` | *キー プロバイダー用の任意検索パラメーター*
__*return*__ | `Promise.<FunctionKeyPair>` | *指定プログラムの証明鍵と検証鍵*

#### Examples

```javascript
/// まずローカルのオフラインリソースから鍵をキャッシュします
const offlineKeyProvider = new OfflineKeyProvider();
const myFunctionVerifyingKey = VerifyingKey.fromString("verifier...");
const myFunctionProvingKeyBytes = await readBinaryFile('./resources/myfunction.prover');
const myFunctionProvingKey = ProvingKey.fromBytes(myFunctionProvingKeyBytes);

/// 後で呼び出しやすいように覚えやすいロケータで鍵をキャッシュします
offlineKeyProvider.cacheKeys("myprogram.aleo/myfunction", [myFunctionProvingKey, myFunctionVerifyingKey]);

/// 必要になったらキャッシュから鍵を取り出します

/// まず鍵をキャッシュした際と同じロケータで検索パラメーターを作成します
const keyParams = new OfflineSearchParams("myprogram.aleo/myfunction");

/// その後、鍵を取得します
const [myFunctionProver, myFunctionVerifier] = await offlineKeyProvider.functionKeys(keyParams);
```

---

### verifyCreditsKeys

指定した credits 関数の鍵が期待される鍵と一致するかを検証します。

```javascript
verifyCreditsKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `boolean` | *鍵が期待したものと一致するかどうか*

---

### feePrivateKeys

credits.aleo プログラムから fee_private 関数の鍵を取得します。事前に鍵をキャッシュしておく必要があります。

```javascript
feePrivateKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *fee_private 関数の証明鍵と検証鍵*

---

### feePublicKeys

credits.aleo プログラムから fee_public 関数の鍵を取得します。事前に鍵をキャッシュしておく必要があります。

```javascript
feePublicKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *fee_public 関数の証明鍵と検証鍵*

---

### joinKeys

credits.aleo プログラムから join 関数の鍵を取得します。事前に鍵をキャッシュしておく必要があります。

```javascript
joinKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *join 関数の証明鍵と検証鍵*

---

### splitKeys

credits.aleo プログラムから split 関数の鍵を取得します。事前に鍵をキャッシュしておく必要があります。

```javascript
splitKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *split 関数の証明鍵と検証鍵*

---

### transferKeys

credits.aleo プログラムから transfer 関数の各バリアントに対応する鍵を取得します。

```javascript
transferKeys(visibility)
```

パラメーター | 型 | 説明
--- | --- | ---
__visibility__ | `string` | *transfer 関数の可視性（private、public、privateToPublic、publicToPrivate）*
__*return*__ | `Promise.<FunctionKeyPair>` | *指定した transfer 関数の証明鍵と検証鍵*

#### Examples

```javascript
// 新しい OfflineKeyProvider を作成します
const offlineKeyProvider = new OfflineKeyProvider();

// 公式のロケータを利用して、将来の利用のために鍵をキャッシュします
const transferPublicProvingKeyBytes = await readBinaryFile('./resources/transfer_public.prover.a74565e');
const transferPublicProvingKey = ProvingKey.fromBytes(transferPublicProvingKeyBytes);

// OfflineKeyProvider の補助メソッドを使って transfer_public の鍵をキャッシュします
// （検証鍵は自動的にキャッシュされます）
offlineKeyProvider.insertTransferPublicKeys(transferPublicProvingKey);

/// 必要になったらキャッシュから鍵を取得します
const [transferPublicProvingKey, transferPublicVerifyingKey] = await keyProvider.transferKeys("public");
```

---

### unBondPublicKeys

credits.aleo プログラムから unbond_public 関数の鍵を取得します。

```javascript
unBondPublicKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *unbond_public 関数の証明鍵と検証鍵*

---

### insertBondPublicKeys

bond_public 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が bond_public 用のチェックサムと一致するか自動で確認します。

```javascript
insertBondPublicKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertClaimUnbondPublicKeys

claim_unbond_public 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が claim_unbond_public 用のチェックサムと一致するか自動で確認します。

```javascript
insertClaimUnbondPublicKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertFeePrivateKeys

fee_private 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が fee_private 用のチェックサムと一致するか自動で確認します。

```javascript
insertFeePrivateKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertFeePublicKeys

fee_public 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が fee_public 用のチェックサムと一致するか自動で確認します。

```javascript
insertFeePublicKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertJoinKeys

join 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が join 用のチェックサムと一致するか自動で確認します。

```javascript
insertJoinKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertSetValidatorStateKeys

set_validator_state 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が set_validator_state 用のチェックサムと一致するか自動で確認します。

```javascript
insertSetValidatorStateKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertSplitKeys

split 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が split 用のチェックサムと一致するか自動で確認します。

```javascript
insertSplitKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertTransferPrivateKeys

transfer_private 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が transfer_private 用のチェックサムと一致するか自動で確認します。

```javascript
insertTransferPrivateKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertTransferPrivateToPublicKeys

transfer_private_to_public 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が transfer_private_to_public 用のチェックサムと一致するか自動で確認します。

```javascript
insertTransferPrivateToPublicKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertTransferPublicKeys

transfer_public 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が transfer_public 用のチェックサムと一致するか自動で確認します。

```javascript
insertTransferPublicKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **

---

### insertTransferPublicToPrivateKeys

transfer_public_to_private 関数の証明鍵と検証鍵をキャッシュに挿入します。証明鍵のみ指定すれば、検証鍵は SDK が自動的に挿入します。
キャッシュへ保存する前に、鍵が transfer_public_to_private 用のチェックサムと一致するか自動で確認します。

```javascript
insertTransferPublicToPrivateKeys(provingKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__provingKey__ | `undefined` | **
