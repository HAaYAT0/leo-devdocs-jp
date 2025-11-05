---
id: function_key_provider
title: 関数キー プロバイダー
sidebar_label: 関数キー プロバイダー
---

## クラス `AleoKeyProviderParams`

AleoKeyProviderParams は AleoKeyProvider 向けの検索パラメーターです。遠隔リソースから HTTP 経由で鍵を取得するための proverUri と verifierUri、メモリに鍵を保存するための一意な cacheKey を指定できます。

#### コンストラクター


#### `AleoKeyProviderParams(params)`

KeySearchParams インターフェースを実装する新しい AleoKeyProviderParams オブジェクトを作成します。ユーザーは任意で proverUri と verifierUri に URL を指定し、遠隔リソースから HTTP で鍵を取得できます。また、将来の利用に備えて鍵をメモリへ保存するための一意な cacheKey も指定できます。proverUri か verifierUri を指定しない場合は、cacheKey を必ず指定してください。

Create a new AleoKeyProviderParams object which implements the KeySearchParams interface. Users can optionally
specify a url for the proverUri &amp; verifierUri to fetch keys via HTTP from a remote resource as well as a unique
cacheKey to store the keys in memory for future use. If no proverUri or verifierUri is specified, a cachekey must
be provided.

パラメーター | 型 | 説明
--- | --- | ---
__params__ | `AleoKeyProviderInitParams` | *Optional search parameters*

---

## クラス `AleoKeyProvider`

AleoKeyProvider クラス。KeyProvider インターフェースを実装します。credits.aleo プログラムの証明鍵と検証鍵を公式 Aleo ソースから HTTP 経由で取得し、ローカルメモリキャッシュに保存・取得できます。

**Kind**: global class

* AleoKeyProvider
    * _instance_
        * [.useCache(useCache)](#usecache)
        * [.clearCache()](#clearcache)
        * [.cacheKeys(keyId, keys)](#cachekeys)
        * [.containsKeys(keyId)](#containskeys) ⇒ <code>boolean</code>
        * [.deleteKeys(keyId)](#deletekeys) ⇒ <code>boolean</code>
        * [.getKeys(keyId)](#getkeys) ⇒ <code>FunctionKeyPair</code>
        * [.functionKeys(params)](#functionkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.fetchRemoteKeys(verifierUrl, proverUrl, cacheKey)](#fetchremotekeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.transferKeys(visibility)](#transferkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.joinKeys()](#joinkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.splitKeys()](#splitkeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.feePrivateKeys()](#feeprivatekeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.feePublicKeys()](#feepublickeys) ⇒ <code>Promise.&lt;FunctionKeyPair&gt;</code>
        * [.getVerifyingKey()](#getverifyingkey) ⇒ <code>Promise.&lt;VerifyingKey&gt;</code>

## メソッド

### useCache

ローカルメモリに鍵を保存するかどうかを設定します。

```javascript
useCache(useCache)
```

パラメーター | 型 | 説明
--- | --- | ---
__useCache__ | `boolean` | *鍵をローカルメモリに保存するかどうか*

---

### clearCache

キャッシュされた鍵をクリアします。

```javascript
clearCache()
```

---

### cacheKeys

鍵のセットをキャッシュします。同じ keyId が既に存在する場合は上書きされます。上書きを避けたい場合は、事前に containsKeys メソッドで存在を確認してください。

```javascript
cacheKeys(keyId, keys)
```

パラメーター | 型 | 説明
--- | --- | ---
__keyId__ | `string` | *キャッシュにアクセスするためのキー*
__keys__ | `FunctionKeyPair` | *キャッシュする鍵*

---

### containsKeys

指定した keyId がキャッシュに存在するか判定します。

```javascript
containsKeys(keyId)
```

パラメーター | 型 | 説明
--- | --- | ---
__keyId__ | `string` | *証明鍵・検証鍵ペアの keyId*
__*return*__ | `boolean` | *キャッシュに存在する場合は true、存在しない場合は false*

---

### deleteKeys

キャッシュから鍵のセットを削除します。

```javascript
deleteKeys(keyId)
```

パラメーター | 型 | 説明
--- | --- | ---
__keyId__ | `string` | *削除したい証明鍵・検証鍵ペアの keyId*
__*return*__ | `boolean` | *存在し削除できた場合は true、存在しなかった場合は false*

---

### getKeys

キャッシュから鍵のセットを取得します。

```javascript
getKeys(keyId)
```

パラメーター | 型 | 説明
--- | --- | ---
__keyId__ | `undefined` | *証明鍵・検証鍵ペアの keyId*
__*return*__ | `FunctionKeyPair` | *指定したプログラムの証明鍵と検証鍵*

---

### functionKeys

プロバイダーから任意の関数鍵を取得します。

```javascript
functionKeys(params)
```

パラメーター | 型 | 説明
--- | --- | ---
__params__ | `KeySearchParams` | *parameters for the key search in form of: \{proverUri: string, verifierUri: string, cacheKey: string\}*
__*return*__ | `Promise.<FunctionKeyPair>` | *指定したプログラムの証明鍵と検証鍵*

#### Examples

```javascript
// KeyProvider インターフェースを実装した新しいオブジェクトを作成します
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);

// ProgramManager にキープロバイダーを設定すると、送金用の鍵を自動取得できます
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
programManager.transfer(1, "aleo166q6ww6688cug7qxwe7nhctjpymydwzy2h7rscfmatqmfwnjvggqcad0at", "public", 0.5);

// キープロバイダーを使って手動で鍵を取得することもできます
const keySearchParams = { "cacheKey": "myProgram:myFunction" };
const [transferPrivateProvingKey, transferPrivateVerifyingKey] = await keyProvider.functionKeys(keySearchParams);
```

---

### fetchRemoteKeys

指定した URL からプログラムの証明鍵と検証鍵を取得します。

```javascript
fetchRemoteKeys(verifierUrl, proverUrl, cacheKey)
```

パラメーター | 型 | 説明
--- | --- | ---
__verifierUrl__ | `string` | *検証鍵の URL*
__proverUrl__ | `string` | *証明鍵の URL*
__cacheKey__ | `string` | *キャッシュに保存する際のキー*
__*return*__ | `Promise.<FunctionKeyPair>` | *指定したプログラムの証明鍵と検証鍵*

#### Examples

```javascript
// 新しい AleoKeyProvider オブジェクトを作成します
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);

// ProgramManager にキープロバイダーを設定すると、送金用の鍵を自動取得できます
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
programManager.transfer(1, "aleo166q6ww6688cug7qxwe7nhctjpymydwzy2h7rscfmatqmfwnjvggqcad0at", "public", 0.5);

// Keys can also be fetched manually
const [transferPrivateProvingKey, transferPrivateVerifyingKey] = await keyProvider.fetchKeys(
    CREDITS_PROGRAM_KEYS.transfer_private.prover,
    CREDITS_PROGRAM_KEYS.transfer_private.verifier,
);
```

---

### transferKeys

Returns the proving and verifying keys for the transfer functions in the credits.aleo program

```javascript
transferKeys(visibility)
```

パラメーター | 型 | 説明
--- | --- | ---
__visibility__ | `string` | *Visibility of the transfer function*
__*return*__ | `Promise.<FunctionKeyPair>` | *Proving and verifying keys for the transfer functions*

#### Examples

```javascript
// Create a new AleoKeyProvider
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);

// ProgramManager にキープロバイダーを設定すると、送金用の鍵を自動取得できます
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
programManager.transfer(1, "aleo166q6ww6688cug7qxwe7nhctjpymydwzy2h7rscfmatqmfwnjvggqcad0at", "public", 0.5);

// Keys can also be fetched manually
const [transferPublicProvingKey, transferPublicVerifyingKey] = await keyProvider.transferKeys("public");
```

---

### joinKeys

Returns the proving and verifying keys for the join function in the credits.aleo program

```javascript
joinKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *Proving and verifying keys for the join function*

---

### splitKeys

Returns the proving and verifying keys for the split function in the credits.aleo program

```javascript
splitKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *Proving and verifying keys for the split function*

---

### feePrivateKeys

Returns the proving and verifying keys for the fee_private function in the credits.aleo program

```javascript
feePrivateKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *Proving and verifying keys for the fee function*

---

### feePublicKeys

Returns the proving and verifying keys for the fee_public function in the credits.aleo program

```javascript
feePublicKeys()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<FunctionKeyPair>` | *Proving and verifying keys for the fee function*

---

### getVerifyingKey

Gets a verifying key. If the verifying key is for a credits.aleo function, get it from the wasm cache otherwise

```javascript
getVerifyingKey()
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | `Promise.<VerifyingKey>` | *Verifying key for the function*

