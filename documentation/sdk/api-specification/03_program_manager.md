---
id: program_manager
title: プログラムマネージャー
sidebar_label: プログラムマネージャー
---

## 概要

ProgramManager クラスは、Aleo ネットワーク上でプログラムを実行・デプロイし、価値移転を作成するために使用します。

**種類**: グローバルクラス

* ProgramManager
  * [new ProgramManager(host, keyProvider, recordProvider)](#programmanager)
  * [.setAccount(account)](#setaccount)
  * [.setKeyProvider(keyProvider)](#setkeyprovider)
  * [.setHost(host)](#sethost)
  * [.setRecordProvider(recordProvider)](#setrecordprovider)
  * [.setHeader(headerName, value)](#setheader)
  * [.removeHeader(headerName)](#removeheader)
  * [.checkFee()](#checkfee)
  * [.checkFee(address, feeAmount)](#checkfee)
  * [.verifyProgram(program)](#verifyprogram)
  * [.createProgramFromSource(program)](#createprogramfromsource)
  * [.creditsProgram()](#creditsprogram)
  * [.synthesizeKeys(program, function_id, inputs, privateKey)](#synthesizekeys)
  * [.verifyExecution(executionResponse, blockHeight, imports, importedVerifyingKeys)](#verifyexecution)
  * [.run(program, function_name, inputs, proveExecution, imports, keySearchParams, provingKey, verifyingKey, privateKey, offlineQuery)](#run)
  * [.buildDeploymentTransaction](#builddeploymenttransaction)
  * [.deploy](#deploy)
  * [.buildExecutionTransaction](#buildexecutiontransaction)
  * [.execute](#execute)
  * [.buildAuthorization](#buildauthorization)
  * [.buildAuthorizationUnchecked](#buildauthorizationunchecked)
  * [.buildFeeAuthorization](#buildfeeauthorization)
  * [.provingRequest](#provingrequest)
  * [.join](#join)
  * [.split](#split)
  * [.buildTransferTransaction](#buildtransfertransaction)
  * [.buildTransferPublicTransaction](#buildtransferpublictransaction)
  * [.buildTransferPublicAsSignerTransaction](#buildtransferpublicassignertransaction)
  * [.transfer](#transfer)
  * [.buildBondPublicTransaction](#buildbondpublictransaction)
  * [.bondPublic](#bondpublic)
  * [.buildBondValidatorTransaction](#buildbondvalidatortransaction)
  * [.bondValidator](#bondvalidator)
  * [.buildUnbondPublicTransaction](#buildunbondpublictransaction)
  * [.unbondPublic](#unbondpublic)
  * [.buildClaimUnbondPublicTransaction](#buildclaimunbondpublictransaction)
  * [.claimUnbondPublic](#claimunbondpublic)
  * [.buildSetValidatorStateTransaction](#buildsetvalidatorstatetransaction)
  * [.setValidatorState](#setvalidatorstate)

## コンストラクター

### ProgramManager

ProgramManager の新しいインスタンスを生成します。

```javascript
ProgramManager(host, keyProvider, recordProvider)
```

パラメーター | 型 | 説明
--- | --- | ---
host | `string` | *公式 Aleo API を提供するホスト URI です*
keyProvider | `FunctionKeyProvider` | *FunctionKeyProvider インターフェースを実装する鍵プロバイダーです*
recordProvider | `RecordProvider` | *RecordProvider インターフェースを実装するレコードプロバイダーです*

## メソッド

### checkFee

トランザクションに必要な手数料を支払うのに十分かどうかを確認します。

```javascript
programManager.checkFee()
```

---

### setAccount



Aleo ネットワークにトランザクションを送信するときに使用するアカウントを設定します。

```javascript
programManager.setAccount(account)
```

パラメーター | 型 | 説明
--- | --- | ---
__account__ | Account | *トランザクション送信に使用するアカウントです*

---

### setKeyProvider



プログラムに対して証明鍵と検証鍵を提供するキー プロバイダーを設定します。

```javascript
setKeyProvider(keyProvider)
```

パラメーター | 型 | 説明
--- | --- | ---
__keyProvider__ | `FunctionKeyProvider` | **

---

### setHost



Aleo ネットワークにトランザクションを送信する際に使用するホストピアを設定します。

```javascript
setHost(host)
```

パラメーター | 型 | 説明
--- | --- | ---
__host__ | `string` | *トランザクション送信用に使用するピアの URL です*

---

### setRecordProvider



トランザクションに用いるレコードを提供するレコードプロバイダーを設定します。

```javascript
setRecordProvider(recordProvider)
```

パラメーター | 型 | 説明
--- | --- | ---
__recordProvider__ | `RecordProvider` | **

---

### setHeader



AleoNetworkClient のヘッダーマップにヘッダーを設定します。

```javascript
setHeader(headerName, value)
```

パラメーター | 型 | 説明
--- | --- | ---
__headerName__ | `string` | *設定するヘッダー名です*
__value__ | `string` | *設定するヘッダー値です*

#### Examples

```javascript
import { ProgramManager } from "@provablehq/sdk/mainnet.js";

// ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1");

// `Accept-Language` ヘッダーの値を `en-US` に設定します
programManager.setHeader('Accept-Language', 'en-US');
```

---

### removeHeader



AleoNetworkClient のヘッダーマップからヘッダーを削除します。

```javascript
removeHeader(headerName)
```

パラメーター | 型 | 説明
--- | --- | ---
__headerName__ | `string` | *削除するヘッダー名です*

#### Examples

```javascript
import { ProgramManager } from "@provablehq/sdk/mainnet.js";

// ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1");

// 既定の `X-Aleo-SDK-Version` ヘッダーを削除します
programManager.removeHeader('X-Aleo-SDK-Version');
```

---

### buildDeploymentTransaction



Aleo ネットワークに送信するデプロイトランザクションを構築します。

```javascript
buildDeploymentTransaction(program, priorityFee, privateFee, recordSearchParams, feeRecord, privateKey) ► string
```

パラメーター | 型 | 説明
--- | --- | ---
__program__ | `string` | *プログラムのソースコードです*
__priorityFee__ | `number` | *このトランザクションで支払う任意の優先手数料です*
__privateFee__ | `boolean` | *手数料の支払いに秘匿レコードを使用します。false の場合はアカウントの公開クレジット残高を使用します*
__recordSearchParams__ | `RecordSearchParams` | *デプロイ手数料に利用するレコードを検索するための任意パラメーターです*
__feeRecord__ | `string` | *トランザクションで使用する任意の手数料レコードです*
__privateKey__ | `PrivateKey` | *トランザクションで使用する任意の秘密鍵です*
__*return*__ | `string` | *デプロイされたプログラムのトランザクション ID またはネットワークからの失敗メッセージです*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// デプロイ時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const program = "program hello_hello.aleo;\n\nfunction hello:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n";
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
programManager.setAccount(Account);

// クレジットで支払う手数料を定義します
const priorityFee = 0.0;

// デプロイトランザクションを作成します
const tx = await programManager.buildDeploymentTransaction(program, fee, false);
await programManager.networkClient.submitTransaction(tx);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 20000);
```

---

### deploy



Aleo プログラムを Aleo ネットワークへデプロイします。

```javascript
deploy(program, priorityFee, privateFee, recordSearchParams, feeRecord, privateKey) ► string
```

パラメーター | 型 | 説明
--- | --- | ---
__program__ | `string` | *プログラムのソースコードです*
__priorityFee__ | `number` | *このトランザクションで支払う任意の手数料です*
__privateFee__ | `boolean` | *手数料の支払いに秘匿レコードを使用します。false の場合はアカウントの公開クレジット残高を使用します*
__recordSearchParams__ | `RecordSearchParams` | *デプロイ手数料に利用するレコードを検索するための任意パラメーターです*
__feeRecord__ | `string` | *トランザクションで使用する任意の手数料レコードです*
__privateKey__ | `PrivateKey` | *トランザクションで使用する任意の秘密鍵です*
__*return*__ | `string` | *デプロイされたプログラムのトランザクション ID またはネットワークからの失敗メッセージです*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// デプロイ時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const program = "program hello_hello.aleo;\n\nfunction hello:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n";
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);

// クレジットで支払う手数料を定義します
const priorityFee = 0.0;

// プログラムをデプロイします
const tx_id = await programManager.deploy(program, fee, false);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 20000);
```

---

### buildExecutionTransaction



Aleo ネットワークに送信する実行トランザクションを構築します。

```javascript
buildExecutionTransaction(options) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__options__ | `ExecuteOptions` | *実行トランザクション用のオプションです*
__*return*__ | `Promise.<Transaction>` | *トランザクションまたはエラーに解決する Promise です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);

// トランザクションを構築して実行します
const tx = await programManager.buildExecutionTransaction({
  programName: "hello_hello.aleo",
  functionName: "hello_hello",
  priorityFee: 0.0,
  privateFee: false,
  inputs: ["5u32", "5u32"],
  keySearchParams: { "cacheKey": "hello_hello:hello" }
});

// トランザクションをネットワークに送信します
await programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### buildAuthorization



特定の関数に対する SnarkVM Authorization を構築します。

```javascript
buildAuthorization(options) ► Promise.<Authorization>
```

パラメーター | 型 | 説明
--- | --- | ---
__options__ | `AuthorizationOptions` | *Authorization を構築するためのオプションです*
__*return*__ | `Promise.<Authorization>` | *Authorization に解決する、またはエラーを送出する Promise です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// キー プロバイダーとレコードプロバイダーを使って ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);

// `Authorization` を構築します
const authorization = await programManager.buildAuthorization({
  programName: "credits.aleo",
  functionName: "transfer_public",
  inputs: [
    "aleo1vwls2ete8dk8uu2kmkmzumd7q38fvshrht8hlc0a5362uq8ftgyqnm3w08",
    "10000000u64",
  ],
});
```

---

### buildAuthorizationUnchecked



回路を事前に構築せず、特定の関数に対する SnarkVM Authorization を生成します。高速に Authorization を作成したい場合で、呼び出し元が入力の正しさを確信しているときに使用してください。

```javascript
buildAuthorizationUnchecked(options) ► Promise.<Authorization>
```

パラメーター | 型 | 説明
--- | --- | ---
__options__ | `AuthorizationOptions` | *Authorization を構築するためのオプションです*
__*return*__ | `Promise.<Authorization>` | *Authorization に解決する、またはエラーを送出する Promise です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// キー プロバイダーとレコードプロバイダーを使って ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);

// 検証を省略した `Authorization` を構築します
const authorization = await programManager.buildAuthorizationUnchecked({
  programName: "credits.aleo",
  functionName: "transfer_public",
  inputs: [
    "aleo1vwls2ete8dk8uu2kmkmzumd7q38fvshrht8hlc0a5362uq8ftgyqnm3w08",
    "10000000u64",
  ],
});
```

---

### provingRequest



実行用にプロバーへ送る ProvingRequest を構築します。

```javascript
provingRequest(options) ► Promise.<ProvingRequest>
```

パラメーター | 型 | 説明
--- | --- | ---
__options__ | `ProvingRequestOptions` | *ProvingRequest を構築するためのオプションです*
__*return*__ | `Promise.<ProvingRequest>` | *トランザクションまたはエラーに解決する Promise です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// キー プロバイダーとレコードプロバイダーを使って ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);

// ProvingRequest を構築します
const provingRequest = await programManager.provingRequest({
  programName: "credits.aleo",
  functionName: "transfer_public",
  baseFee: 100000,
  priorityFee: 0,
  privateFee: false,
  inputs: [
    "aleo1vwls2ete8dk8uu2kmkmzumd7q38fvshrht8hlc0a5362uq8ftgyqnm3w08",
    "10000000u64",
  ],
  broadcast: false,
});
```

---

### buildFeeAuthorization



credits.aleo/fee_private または credits.aleo/fee_public のための SnarkVM fee Authorization を構築します。レコードが提供されている場合は fee_private を実行し、そうでなければ fee_public を実行します。

```javascript
buildFeeAuthorization(options) ► Promise.<Authorization>
```

パラメーター | 型 | 説明
--- | --- | ---
__options__ | `FeeAuthorizationOptions` | *Authorization を構築するためのオプションです*
__*return*__ | `Promise.<Authorization>` | *Authorization に解決する、またはエラーを送出する Promise です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// キー プロバイダーとレコードプロバイダーを使って ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);

// credits.aleo/fee_public 用の `Authorization` を構築します
const feePublicAuthorization = await programManager.authorizeFee({
  deploymentOrExecutionId: "2423957656946557501636078245035919227529640894159332581642187482178647335171field",
  baseFeeCredits: 0.1,
});

// credits.aleo/fee_private 用の `Authorization` を構築します
const record = "{ owner: aleo1j7qxyunfldj2lp8hsvy7mw5k8zaqgjfyr72x2gh3x4ewgae8v5gscf5jh3.private, microcredits: 1500000000000000u64.private, _nonce: 3077450429259593211617823051143573281856129402760267155982965992208217472983group.public }";
const feePrivateAuthorization = await programManager.authorizeFee({
  deploymentOrExecutionId: "2423957656946557501636078245035919227529640894159332581642187482178647335171field",
  baseFeeCredits: 0.1,
  feeRecord: record,
});
```

---

### execute



Aleo ネットワークに送信する実行トランザクションを構築します。

```javascript
execute(options) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__options__ | `ExecuteOptions` | *実行トランザクション用のオプションです*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// Aleo 公式のレコード・キー・ネットワークプロバイダーを使って NetworkClient、KeyProvider、RecordProvider を作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);

// トランザクションを構築して実行します
const tx_id = await programManager.execute({
  programName: "hello_hello.aleo",
  functionName: "hello_hello",
  priorityFee: 0.0,
  privateFee: false,
  inputs: ["5u32", "5u32"],
  keySearchParams: { "cacheKey": "hello_hello:hello" }
});

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### run



Aleo プログラムをオフラインモードで実行します。

```javascript
run(program, function_name, inputs, proveExecution, imports, keySearchParams, provingKey, verifyingKey, privateKey, offlineQuery) ► Promise.<ExecutionResponse>
```

パラメーター | 型 | 説明
--- | --- | ---
__program__ | `string` | *実行対象の関数を含むプログラムのソースコードです*
__function_name__ | `string` | *実行する関数名です*
__inputs__ | `Array.<string>` | *関数に渡す入力です*
__proveExecution__ | `number` | *関数の実行を証明し、証明を含む実行トランスクリプトを返すかどうかです*
__imports__ | `Array.<string>` | *プログラムの任意のインポートです*
__keySearchParams__ | `KeySearchParams` | *関数に対応する証明鍵・検証鍵を検索するための任意パラメーターです*
__provingKey__ | `ProvingKey` | *トランザクションで使用する任意の証明鍵です*
__verifyingKey__ | `VerifyingKey` | *トランザクションで使用する任意の検証鍵です*
__privateKey__ | `PrivateKey` | *トランザクションで使用する任意の秘密鍵です*
__offlineQuery__ | `OfflineQuery` | *オフライン環境でトランザクションを作成する場合の任意のオフラインクエリです*
__*return*__ | `Promise.<ExecutionResponse>` | *プログラムを証明した場合は出力と証明を含む実行レスポンスです*

#### Examples

```javascript
/// 実行を構築するための SDK メインネット版をインポートします
import { Account, ProgramManager } from "@provablehq/sdk/mainnet.js";

/// 「helloworld」プログラムのソースコードを作成します
const program = "program helloworld.aleo;\n\nfunction hello:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n";
const programManager = new ProgramManager(undefined, undefined, undefined);

/// プログラムの実行用に一時アカウントを作成します
const account = new Account();
programManager.setAccount(account);

/// レスポンスを取得し、プログラムが正しく実行されたことを確認します
const executionResponse = await programManager.run(program, "hello", ["5u32", "5u32"]);
const result = executionResponse.getOutputs();
assert(result === ["10u32"]);
```

---

### join



2 つのクレジットレコードを 1 つのクレジットレコードに結合します。

```javascript
join(recordOne, recordTwo, priorityFee, privateFee, recordSearchParams, feeRecord, privateKey, offlineQuery) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__recordOne__ | `RecordPlaintext` | *結合する 1 つ目のクレジットレコードです*
__recordTwo__ | `RecordPlaintext` | *結合する 2 つ目のクレジットレコードです*
__priorityFee__ | `number` | *このトランザクションで支払う任意の優先手数料です*
__privateFee__ | `boolean` | *手数料の支払いに秘匿レコードを使用します。false の場合はアカウントの公開クレジット残高を使用します*
__recordSearchParams__ | `RecordSearchParams` | *結合トランザクションの手数料に使用するレコードを検索するための任意パラメーターです*
__feeRecord__ | `RecordPlaintext` | *結合トランザクションで使用する手数料レコードです*
__privateKey__ | `PrivateKey` | *結合トランザクションで使用する秘密鍵です*
__offlineQuery__ | `OfflineQuery` | *オフライン環境でトランザクションを作成する場合の任意のオフラインクエリです*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
const record_1 = "{  owner: aleo184vuwr5u7u0ha5f5k44067dd2uaqewxx6pe5ltha5pv99wvhfqxqv339h4.private,  microcredits: 45000000u64.private,  _nonce: 4106205762862305308495708971985748592380064201230396559307556388725936304984group.public}"
const record_2 = "{  owner: aleo184vuwr5u7u0ha5f5k44067dd2uaqewxx6pe5ltha5pv99wvhfqxqv339h4.private,  microcredits: 45000000u64.private,  _nonce: 1540945439182663264862696551825005342995406165131907382295858612069623286213group.public}"
const tx_id = await programManager.join(record_1, record_2, 0.05, false);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### split



クレジットを 2 つの新しいクレジットレコードに分割します。

```javascript
split(splitAmount, amountRecord, privateKey, offlineQuery) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__splitAmount__ | `number` | *元のクレジットレコードから分割するマイクロクレジット数です*
__amountRecord__ | `RecordPlaintext` | *分割トランザクションで使用する金額レコードです*
__privateKey__ | `PrivateKey` | *分割トランザクションで使用する任意の秘密鍵です*
__offlineQuery__ | `OfflineQuery` | *オフライン環境でトランザクションを作成する場合の任意のオフラインクエリです*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
const record = "{  owner: aleo184vuwr5u7u0ha5f5k44067dd2uaqewxx6pe5ltha5pv99wvhfqxqv339h4.private,  microcredits: 45000000u64.private,  _nonce: 4106205762862305308495708971985748592380064201230396559307556388725936304984group.public}"
const tx_id = await programManager.split(25000000, record);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### synthesizeKeys



プログラムの証明鍵と検証鍵を事前に生成します。

```javascript
synthesizeKeys(program, function_id, inputs, privateKey) ► Promise.<FunctionKeyPair>
```

パラメーター | 型 | 説明
--- | --- | ---
__program__ | `string` | *鍵を生成する対象のプログラムソースコードです*
__function_id__ | `string` | *鍵を生成する対象の関数 ID です*
__inputs__ | `Array.<string>` | *関数に対するサンプル入力です*
__privateKey__ | `PrivateKey` | *鍵生成に使用する任意の秘密鍵です*
__*return*__ | `Promise.<FunctionKeyPair>` | **

---

### buildTransferTransaction



クレジットを他のアカウントへ送るトランザクションを構築し、後で Aleo ネットワークに送信できるようにします。

```javascript
buildTransferTransaction(amount, recipient, transferType, priorityFee, privateFee, recordSearchParams, amountRecord, feeRecord, privateKey, offlineQuery) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__amount__ | `number` | *送金するクレジット量です*
__recipient__ | `string` | *送金先アドレスです*
__transferType__ | `string` | *実行する送金タイプです。&#x27;private&#x27;, &#x27;privateToPublic&#x27;, &#x27;public&#x27;, &#x27;publicToPrivate&#x27; から選択します*
__priorityFee__ | `number` | *このトランザクションで支払う任意の優先手数料です*
__privateFee__ | `boolean` | *手数料の支払いに秘匿レコードを使用します。false の場合はアカウントの公開クレジット残高を使用します*
__recordSearchParams__ | `RecordSearchParams` | *送金トランザクションで使用する金額および手数料レコードを検索するための任意パラメーターです*
__amountRecord__ | `RecordPlaintext` | *送金に使用する任意の金額レコードです*
__feeRecord__ | `RecordPlaintext` | *送金に使用する任意の手数料レコードです*
__privateKey__ | `PrivateKey` | *送金トランザクションに使用する任意の秘密鍵です*
__offlineQuery__ | `OfflineQuery` | *オフライン環境でトランザクションを作成する場合の任意のオフラインクエリです*
__*return*__ | `Promise.<Transaction>` | *トランザクションオブジェクトです*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
const tx = await programManager.buildTransferTransaction(1, "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", "public", 0.2, false);
await programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### buildTransferPublicTransaction



クレジットを他のアカウントへ送る transfer_public トランザクションを構築し、後で Aleo ネットワークに送信できるようにします。

```javascript
buildTransferPublicTransaction(amount, recipient, priorityFee, privateKey, offlineQuery) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__amount__ | `number` | *送金するクレジット量です*
__recipient__ | `string` | *送金先アドレスです*
__priorityFee__ | `number` | *この送金で支払う任意の優先手数料です*
__privateKey__ | `PrivateKey` | *送金トランザクションに使用する任意の秘密鍵です*
__offlineQuery__ | `OfflineQuery` | *オフライン環境でトランザクションを作成する場合の任意のオフラインクエリです*
__*return*__ | `Promise.<Transaction>` | *トランザクションオブジェクトです*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
const tx = await programManager.buildTransferPublicTransaction(1, "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", 0.2);
await programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### buildTransferPublicAsSignerTransaction



クレジットを他のアカウントへ送る transfer_public_as_signer トランザクションを構築し、後で Aleo ネットワークに送信できるようにします。

```javascript
buildTransferPublicAsSignerTransaction(amount, recipient, priorityFee, privateKey, offlineQuery) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__amount__ | `number` | *送金するクレジット量です*
__recipient__ | `string` | *送金先アドレスです*
__priorityFee__ | `number` | *この送金で支払う任意の優先手数料です*
__privateKey__ | `PrivateKey` | *送金トランザクションに使用する任意の秘密鍵です*
__offlineQuery__ | `OfflineQuery` | *オフライン環境でトランザクションを作成する場合の任意のオフラインクエリです*
__*return*__ | `Promise.<Transaction>` | *トランザクションオブジェクトです*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
const tx = await programManager.buildTransferPublicAsSignerTransaction(1, "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", 0.2);
await programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### transfer



クレジットを他のアカウントへ送金します。

```javascript
transfer(amount, recipient, transferType, priorityFee, privateFee, recordSearchParams, amountRecord, feeRecord, privateKey, offlineQuery) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__amount__ | `number` | *送金するクレジット量です*
__recipient__ | `string` | *送金先アドレスです*
__transferType__ | `string` | *実行する送金タイプです。&#x27;private&#x27;, &#x27;privateToPublic&#x27;, &#x27;public&#x27;, &#x27;publicToPrivate&#x27; から選択します*
__priorityFee__ | `number` | *この送金で支払う任意の優先手数料です*
__privateFee__ | `boolean` | *手数料の支払いに秘匿レコードを使用します。false の場合はアカウントの公開クレジット残高を使用します*
__recordSearchParams__ | `RecordSearchParams` | *送金トランザクションで使用する金額および手数料レコードを検索するための任意パラメーターです*
__amountRecord__ | `RecordPlaintext` | *送金に使用する任意の金額レコードです*
__feeRecord__ | `RecordPlaintext` | *送金に使用する任意の手数料レコードです*
__privateKey__ | `PrivateKey` | *送金トランザクションに使用する任意の秘密鍵です*
__offlineQuery__ | `OfflineQuery` | *オフライン環境でトランザクションを作成する場合の任意のオフラインクエリです*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
/// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager, NetworkRecordProvider } from "@provablehq/sdk/mainnet.js";

// NetworkClient、KeyProvider、RecordProvider を新しく作成します
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);
keyProvider.useCache = true;

// 実行時に鍵を自動取得できるよう、キー プロバイダー付きで ProgramManager を初期化します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
const tx_id = await programManager.transfer(1, "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", "public", 0.2, false);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### buildBondPublicTransaction



バリデータにクレジットをボンドし、後で Aleo ネットワークに送信するトランザクションを構築します。

```javascript
buildBondPublicTransaction(validator_address, withdrawal_address, amount, options) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__validator_address__ | `string` | *ボンド先のバリデータアドレスです。このアドレスがステーカー（この関数の実行者）と同じ場合は、バリデータとしてクレジットをボンドしようとします。現在、バリデータとしてボンドするには最低 10,000,000 クレジットが必要です（変更される場合があります）。指定したアドレスが既存のバリデータで、かつ実行者のアドレスと異なる場合は、そのバリデータのステーキング委員会にデリゲータとしてボンドします。デリゲータとしてボンドするには最低 10 クレジットが必要です。*
__withdrawal_address__ | `string` | *unbond_public を呼び出したときにボンドしたクレジットを引き出すアドレスです*
__amount__ | `number` | *ボンドするクレジット量です*
__options__ | `Partial.<ExecuteOptions>` | *既定の実行オプションを上書きします*
__*return*__ | `Promise.<Transaction>` | *トランザクションオブジェクトです*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);
programManager.setAccount(new Account("YourPrivateKey"));

// 後で送信するためのボンドトランザクションを作成します
const tx = await programManager.buildBondPublicTransaction("aleo1jx8s4dvjepculny4wfrzwyhs3tlyv65r58ns3g6q2gm2esh7ps8sqy9s5j", "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", "aleo1feya8sjy9k2zflvl2dx39pdsq5tju28elnp2ektnn588uu9ghv8s84msv9", 2000000);

// トランザクションは後でネットワーククライアント経由で送信できます
await programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### bondPublic



クレジットをバリデータにボンドします。

```javascript
bondPublic(validator_address, withdrawal_address, amount, options) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__validator_address__ | `string` | *ボンド先のバリデータアドレスです。このアドレスが署名者（この関数の実行者）と同じ場合は、バリデータとしてクレジットをボンドしようとします。現在、バリデータとしてボンドするには最低 1,000,000 クレジットが必要です（変更される場合があります）。指定したアドレスが既存のバリデータで、かつ実行者のアドレスと異なる場合は、そのバリデータのステーキング委員会にデリゲータとしてボンドします。デリゲータとしてボンドするには最低 10 クレジットが必要です。*
__withdrawal_address__ | `string` | *unbond_public を呼び出したときにボンドしたクレジットを引き出すアドレスです*
__amount__ | `number` | *ボンドするクレジット量です*
__options__ | `Options` | *実行に使用するオプションです*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);

// ボンドトランザクションを作成します
tx_id = await programManager.bondPublic("aleo1jx8s4dvjepculny4wfrzwyhs3tlyv65r58ns3g6q2gm2esh7ps8sqy9s5j", "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", "aleo1feya8sjy9k2zflvl2dx39pdsq5tju28elnp2ektnn588uu9ghv8s84msv9", 2000000);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### buildBondValidatorTransaction



Aleo ネットワークに後で送信するための bond_validator トランザクションを構築します。

```javascript
buildBondValidatorTransaction(validator_address, withdrawal_address, amount, commission, options) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__validator_address__ | `string` | *ボンド先のバリデータアドレスです。このアドレスがステーカー（この関数の実行者）と同じ場合は、バリデータとしてクレジットをボンドしようとします。指定したアドレスが既存のバリデータで、実行者のアドレスと異なる場合は、そのバリデータのステーキング委員会にデリゲータとしてボンドします。*
__withdrawal_address__ | `string` | *unbond_public を呼び出したときにボンドしたクレジットを引き出すアドレスです*
__amount__ | `number` | *ボンドするクレジット量です。デリゲータとしてボンドするには最低 10,000 クレジットが必要です*
__commission__ | `number` | *バリデータのコミッション率です（0 から 100 の間でなければならず、範囲外の場合はエラーになります）*
__options__ | `Partial.<ExecuteOptions>` | *既定の実行オプションを上書きします*
__*return*__ | `Promise.<Transaction>` | *トランザクションオブジェクトです*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);
programManager.setAccount(new Account("YourPrivateKey"));

// 後で利用するためのボンドバリデータトランザクションを作成します
const tx = await programManager.buildBondValidatorTransaction("aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", "aleo1feya8sjy9k2zflvl2dx39pdsq5tju28elnp2ektnn588uu9ghv8s84msv9", 2000000);

// トランザクションは後でネットワーククライアントを使って送信できます
const tx_id = await programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### bondValidator



バリデータをボンドするトランザクションを構築します。

```javascript
bondValidator(validator_address, withdrawal_address, amount, commission, options) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__validator_address__ | `string` | *ボンド先のバリデータアドレスです。このアドレスがステーカー（この関数の実行者）と同じ場合は、バリデータとしてクレジットをボンドしようとします。現在、バリデータとしてボンドするには最低 10,000,000 クレジットが必要です（変更される場合があります）。指定したアドレスが既存のバリデータで、実行者のアドレスと異なる場合は、そのバリデータのステーキング委員会にデリゲータとしてボンドします。デリゲータとしてボンドするには最低 10 クレジットが必要です。*
__withdrawal_address__ | `string` | *unbond_public を呼び出したときにボンドしたクレジットを引き出すアドレスです*
__amount__ | `number` | *ボンドするクレジット量です*
__commission__ | `number` | *バリデータのコミッション率です（0 から 100 の間でなければならず、範囲外の場合はエラーになります）*
__options__ | `Partial.<ExecuteOptions>` | *既定の実行オプションを上書きします*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);
programManager.setAccount(new Account("YourPrivateKey"));

// ボンドトランザクションを作成します
const tx_id = await programManager.bondValidator("aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px", "aleo1feya8sjy9k2zflvl2dx39pdsq5tju28elnp2ektnn588uu9ghv8s84msv9", 2000000);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### buildUnbondPublicTransaction



Aleo ネットワーク上のバリデータからクレジットをアンボンドするための unbond_public 実行トランザクションを構築します。

```javascript
buildUnbondPublicTransaction(staker_address, amount, options) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__staker_address__ | `string` | *クレジットをアンボンドするステーカーのアドレスです*
__amount__ | `number` | *アンボンドするクレジット量です（1,000,000 倍された値）*
__options__ | `Partial.<ExecuteOptions>` | *既定の実行オプションを上書きします*
__*return*__ | `Promise.<Transaction>` | *トランザクションまたはエラーメッセージに解決する Promise です*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// アンボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);
const tx = await programManager.buildUnbondPublicTransaction("aleo1jx8s4dvjepculny4wfrzwyhs3tlyv65r58ns3g6q2gm2esh7ps8sqy9s5j", 2000000);

// トランザクションは後でネットワーククライアントを使って送信できます
programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### unbondPublic



ステークされたクレジットを指定量アンボンドします。この関数の実行者のアドレスが既存のバリデータである場合、バリデータがステークしているクレジットから指定量を差し引きます。アンボンド後にステークプールが 1,000,000 クレジット未満になった場合、バリデータはバリデータセットから除外されます。実行者のアドレスがバリデータではなく、デリゲータとしてクレジットをボンドしている場合は、デリゲータがステークしているクレジットから指定量を差し引きます。アンボンド後にボンドされているクレジットが 10 未満になった場合、デリゲータはバリデータのステーキングプールから除外されます。

```javascript
unbondPublic(staker_address, amount, options) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__staker_address__ | `string` | *クレジットをアンボンドするステーカーのアドレスです*
__amount__ | `number` | *アンボンドするクレジット量です*
__options__ | `ExecuteOptions` | *実行に使用するオプションです*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);
programManager.setAccount(new Account("YourPrivateKey"));

// unbond_public トランザクションを作成してネットワークに送信します
const tx_id = await programManager.unbondPublic("aleo1jx8s4dvjepculny4wfrzwyhs3tlyv65r58ns3g6q2gm2esh7ps8sqy9s5j", 10);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### buildClaimUnbondPublicTransaction



Aleo ネットワークでアンボンド済みの公開クレジットを請求するトランザクションを構築します。

```javascript
buildClaimUnbondPublicTransaction(staker_address, options) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__staker_address__ | `string` | *クレジットを請求するステーカーのアドレスです*
__options__ | `Partial.<ExecuteOptions>` | *既定の実行オプションを上書きします*
__*return*__ | `Promise.<Transaction>` | *トランザクションまたはエラーメッセージに解決する Promise です*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// アンボンド済みクレジットの請求に使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);

// 後で利用するための claim_unbond_public トランザクションを作成します
const tx = await programManager.buildClaimUnbondPublicTransaction("aleo1jx8s4dvjepculny4wfrzwyhs3tlyv65r58ns3g6q2gm2esh7ps8sqy9s5j");

// トランザクションは後でネットワーククライアントを使って送信できます
programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### claimUnbondPublic



アンボンド済みのクレジットを請求します。この関数を実行するアカウントがクレジットをアンボンドしている場合、そのクレジットを請求し、アカウントの公開残高に加えます。

```javascript
claimUnbondPublic(staker_address, options) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__staker_address__ | `string` | *クレジットを請求するステーカーのアドレスです*
__options__ | `ExecuteOptions` | **
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);
programManager.setAccount(new Account("YourPrivateKey"));

// claim_unbond_public トランザクションを作成します
const tx_id = await programManager.claimUnbondPublic("aleo1jx8s4dvjepculny4wfrzwyhs3tlyv65r58ns3g6q2gm2esh7ps8sqy9s5j");

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### buildSetValidatorStateTransaction



後で利用するための set_validator_state トランザクションを構築します。

この関数を使うと、バリデータは自身の状態を新しいステーカーに対して開放または閉鎖のどちらかに設定できます。
バリデータが新しいステーカーに対して開放されている場合、すべてのステーカー（バリデータ自身を含む）がそのバリデータに対してボンドまたはアンボンドできます。
バリデータが新しいステーカーに対して閉鎖されている場合でも、既存のステーカーはボンドまたはアンボンドできますが、新しいステーカーはボンドできません。

この関数は主に次の 2 つの目的で使用されます。
1. バリデータがステーカー受け入れを停止し、全ステーカーをアンボンドすることで委員会から離脱できるようにする。
2. 追加のステーカーがボンドできないようにして、バリデータが自身のステーク比率を維持できるようにする。

```javascript
buildSetValidatorStateTransaction(validator_state, options) ► Promise.<Transaction>
```

パラメーター | 型 | 説明
--- | --- | ---
__validator_state__ | `boolean` | **
__options__ | `Partial.<ExecuteOptions>` | *既定の実行オプションを上書きします*
__*return*__ | `Promise.<Transaction>` | *トランザクションオブジェクトです*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);

// set_validator_state トランザクションを作成します
const tx = await programManager.buildSetValidatorStateTransaction(true);

// トランザクションは後でネットワーククライアントを使って送信できます
programManager.networkClient.submitTransaction(tx.toString());

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx.id());
 assert(transaction.id() === tx.id());
}, 10000);
```

---

### setValidatorState



Aleo ネットワークに set_validator_state トランザクションを送信します。

この関数を使うと、バリデータは自身の状態を新しいステーカーに対して開放または閉鎖のどちらかに設定できます。
バリデータが新しいステーカーに対して開放されている場合、すべてのステーカー（バリデータ自身を含む）がそのバリデータに対してボンドまたはアンボンドできます。
バリデータが新しいステーカーに対して閉鎖されている場合でも、既存のステーカーはボンドまたはアンボンドできますが、新しいステーカーはボンドできません。

この関数は次の目的で役立ちます。
1. バリデータがステーカー受け入れを停止し、全ステーカーをアンボンドすることで委員会から離脱できるようにする。
2. 追加のステーカーを受け入れずに自身のステーク比率を維持できるようにする。
```javascript
setValidatorState(validator_state, options) ► Promise.<string>
```

パラメーター | 型 | 説明
--- | --- | ---
__validator_state__ | `boolean` | **
__options__ | `Partial.<ExecuteOptions>` | *既定の実行オプションを上書きします*
__*return*__ | `Promise.<string>` | *トランザクション ID です*

#### Examples

```javascript
// SDK のメインネット版をインポートします
import { AleoKeyProvider, ProgramManager } from "@provablehq/sdk/mainnet.js";

// 鍵管理を担当する KeyProvider を作成します
const keyProvider = new AleoKeyProvider();
keyProvider.useCache = true;

// ボンドに使用する鍵で新しい ProgramManager を作成します
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, undefined);

// set_validator_state トランザクションを作成します
const tx_id = await programManager.setValidatorState(true);

// トランザクションが成功したか確認します
setTimeout(async () => {
 const transaction = await programManager.networkClient.getTransaction(tx_id);
 assert(transaction.id() === tx_id);
}, 10000);
```

---

### verifyExecution



オフライン実行の証明を検証します。オフチェーンで証明と検証を行いたい場合に役立ちます。

```javascript
verifyExecution(executionResponse, blockHeight, imports, importedVerifyingKeys) ► boolean
```

パラメーター | 型 | 説明
--- | --- | ---
__executionResponse__ | `executionResponse` | *programManager.run メソッドでのオフライン関数実行からのレスポンスです*
__blockHeight__ | `blockHeight` | *その実行が生成されたときの台帳の高さです*
__imports__ | `ImportedPrograms` | *実行で使用されたインポートプログラムです。 \{ programName: programSourceCode, ... \} の形式で指定します*
__importedVerifyingKeys__ | `ImportedVerifyingKeys` | *実行で使用された検証鍵です。 \{ programName: [[functionName, verifyingKey], ...], ... \} の形式で指定します*
__*return*__ | `boolean` | *証明が有効な場合は true、それ以外は false を返します*

#### Examples

```javascript
/// 実行を構築するための SDK メインネット版をインポートします
import { Account, ProgramManager } from "@provablehq/sdk/mainnet.js";

/// 2 つのプログラムのソースコードを作成します
const program = "import add_it_up.aleo; \n\n program mul_add.aleo;\n\nfunction mul_and_add:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    mul r0 r1 into r2;\n call add_it_up.aleo/add_it r1 r2 into r3;  output r3 as u32.private;\n";
const program_import = "program add_it_up.aleo;\n\nfunction add_it:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n";
const programManager = new ProgramManager(undefined, undefined, undefined);

/// プログラムの実行用に一時アカウントを作成します
const account = Account.fromCipherText(process.env.ciphertext, process.env.password);
programManager.setAccount(account);

/// レスポンスを取得し、プログラムが正しく実行されたことを確認します
const executionResponse = await programManager.run(program, "mul_and_add", ["5u32", "5u32"], true);

/// インポートと検証鍵を組み立てます
const imports = { "add_it_up.aleo": program_import };
const importedVerifyingKeys = { "add_it_up.aleo": [["add_it", "verifyingKey1..."]] };

/// 実行を検証します
const blockHeight = 9000000;
const isValid = programManager.verifyExecution(executionResponse, blockHeight, imports, importedVerifyingKeys);
assert(isValid);
```

---

### createProgramFromSource



プログラムのソースコードからプログラムオブジェクトを作成します。

```javascript
createProgramFromSource(program) ► Program
```

パラメーター | 型 | 説明
--- | --- | ---
__program__ | `string` | *プログラムのソースコードです*
__*return*__ | Program | *プログラムオブジェクトです*

---

### creditsProgram



credits プログラムのオブジェクトを取得します。

```javascript
creditsProgram() ► Program
```

パラメーター | 型 | 説明
--- | --- | ---
__*return*__ | Program | *credits プログラムのオブジェクトです*

---

### verifyProgram



プログラムが有効かどうかを検証します。

```javascript
verifyProgram(program)
```

パラメーター | 型 | 説明
--- | --- | ---
__program__ | `string` | *プログラムのソースコードです*
