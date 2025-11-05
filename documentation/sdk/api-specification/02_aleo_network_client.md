---
title: Aleo ネットワーククライアント
sidebar_label: Aleo ネットワーククライアント
---

<a name="AleoNetworkClient"></a>

## 概要
Aleo ノードが公開しているエンドポイントへの REST 呼び出しをまとめたクライアントライブラリです。ここで提供されるメソッドを使うと、Aleo ブロックチェーンの公開情報を取得し、ネットワークへトランザクションを送信できます。

**種類**: グローバルクラス  

* AleoNetworkClient
    * [new AleoNetworkClient(host)](#new_AleoNetworkClient_new)
    * [.setHost(host)](#AleoNetworkClient+setHost)
    * [.setAccount(account)](#AleoNetworkClient+setAccount)
    * [.getAccount()](#AleoNetworkClient+getAccount)
    * [.fetchData(url)](#AleoNetworkClient+fetchData)
    * [.fetchRaw(url)](#AleoNetworkClient+fetchRaw)
    * [.findRecords(startHeight, endHeight, unspent, programs, amounts, maxMicrocredits, nonces, privateKey)](#AleoNetworkClient+findRecords)
    * [.findUnspentRecords(startHeight, endHeight, programs, amounts, maxMicrocredits, nonces, privateKey)](#AleoNetworkClient+findUnspentRecords)
    * [.getBlock(height)](#AleoNetworkClient+getBlock)
    * [.getBlockRange(start, end)](#AleoNetworkClient+getBlockRange)
    * [.getProgram(programId)](#getprogram)
    * [.getProgramObject(inputProgram)](#getprogramobject)
    * [.getProgramImports(inputProgram)](#getprogramimports)
    * [.getProgramImportNames(inputProgram)](#getprogramimportnames)
    * [.getDeploymentTransactionIDForProgram(program)](#getdeploymenttransactionidforprogram)
    * [.getDeploymentTransactionForProgram(program)](#getdeploymenttransactionforprogram)
    * [.getDeploymentTransactionObjectForProgram(program)](#getdeploymenttransactionobjectforprogram)
    * [.getProgramMappingNames(programId)](#getprogrammappingnames)
    * [.getProgramMappingValue(programId, mappingName, key)](#getprogrammappingvalue)
    * [.getProgramMappingPlaintext(programId, mappingName, key)](#getprogrammappingplaintext)
    * [.getLatestBlock()](#getlatestblock)
    * [.getLatestHeight()](#getlatestheight)
    * [.getLatestCommittee()](#getlatestcommittee)
    * [.getStateRoot()](#getstateroot)
    * [.getTransaction(id)](#gettransaction)
    * [.getTransactionObject(transactionId)](#gettransactionobject)
    * [.getTransactions(height)](#gettransactions)
    * [.getTransactionsInMempool()](#gettransactionsinmempool)
    * [.getTransitionId(inputOrOutputID)](#gettransitionid)
    * [.submitTransaction(transaction)](#submittransaction)
    * [.submitSolution(solution)](#submitsolution)

## コンストラクター

<a name="new_AleoNetworkClient_new"></a>

### AleoNetworkClient {#new_AleoNetworkClient_new}

```javascript
new AleoNetworkClient(host)
```

| パラメーター | 型 |
| --- | --- |
| host | <code>string</code> | 

**Example**  
```js
// ローカルノードに接続します
let local_connection = new AleoNetworkClient("http://localhost:3030");

// 公開ビーコンノードに接続します
let public_connection = new AleoNetworkClient("https://api.explorer.provable.com/v1");
```

<a name="AleoNetworkClient+setHost"></a>

## メソッド

### setHost {#AleoNetworkClient+setHost}

<p>networkClient のホストを設定します。</p>

```javascript
networkClient.setHost(host)
```

| パラメーター | 型 |
| --- | --- |
| host | <code>string</code> | 

**Example**  
```js
// 公開ビーコンノードへ新しく接続します
let public_connection = AleoNetworkClient.setHost("https://api.explorer.provable.com/v1");
```

---

<a name="AleoNetworkClient+setAccount"></a>

---

### setAccount {#AleoNetworkClient+setAccount}

<p>networkClient の呼び出しに使用するアカウントを設定します。</p>

```javascript
networkClient.setAccount(account)
```

| パラメーター | 型 |
| --- | --- |
| account | <code>Account</code> | 

**Example**  
```js
let account = new Account();
networkClient.setAccount(account);
```

---

<a name="AleoNetworkClient+getAccount"></a>

---

### getAccount {#AleoNetworkClient+getAccount}

<p>networkClient で使用している Aleo アカウントを返します。</p>

```javascript
networkClient.getAccount() ⇒ Account
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Account</code> | 

**Example**  
```js
let account = networkClient.getAccount();
```

---

<a name="AleoNetworkClient+fetchData"></a>

---

### fetchData {#AleoNetworkClient+fetchData}

<p>Aleo ネットワークからデータを取得し、JSON オブジェクトとして返します。</p>

```javascript
networkClient.fetchData(url) ⇒ Promise.<Type>
```

| パラメーター | 型 |
| --- | --- |
| url | <code>undefined</code> | 
| *return* | <code>Promise.&lt;Type&gt;</code> | 

<a name="AleoNetworkClient+fetchRaw"></a>

---

### fetchRaw {#AleoNetworkClient+fetchRaw}

<p>Aleo ネットワークからデータを取得し、未解析の文字列として返します。ネットワークから返されたデータを WASM オブジェクトへ再構築したい場合に使用します。</p>

```javascript
networkClient.fetchRaw(url) ⇒ Promise.<string>
```

| パラメーター | 型 |
| --- | --- |
| url | <code>undefined</code> | 
| *return* | <code>Promise.&lt;string&gt;</code> | 

<a name="AleoNetworkClient+findRecords"></a>

---

### findRecords {#AleoNetworkClient+findRecords}

<p>Aleo ブロックチェーン上でレコードの検索を試みます。</p>

```javascript
networkClient.findRecords(startHeight, endHeight, unspent, programs, amounts, maxMicrocredits, nonces, privateKey) ⇒ Promise.<Array.<RecordPlaintext>>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| startHeight | <code>number</code> | 未使用レコードの検索を開始する高さです |
| endHeight | <code>number</code> | 未使用レコードの検索を終了する高さです |
| unspent | <code>boolean</code> | 未使用レコードのみを検索するかどうかを指定します |
| programs | <code>Array.&lt;string&gt;</code> | 未使用レコードを検索する対象プログラムです |
| amounts | <code>Array.&lt;number&gt;</code> | 探したい金額（マイクロクレジット単位）です（例: [100, 200, 3000]） |
| maxMicrocredits | <code>number</code> | 合計マイクロクレジットの上限です |
| nonces | <code>Array.&lt;string&gt;</code> | すでに見つかったレコードのノンスです。検索対象から除外します |
| privateKey | <code>string</code> | 未使用レコードを検索する際に使う任意の秘密鍵です |
| *return* | <code>Promise.&lt;Array.&lt;RecordPlaintext&gt;&gt;</code> | 

**Example**  
```js
// 特定の金額を検索します
const startHeight = 500000;
const amounts = [600000, 1000000];
const records = await networkClient.findRecords(startHeight, undefined, true, ["credits.aleo"], amounts);

// 合計マイクロクレジットの上限を指定して特定の金額を検索します
const maxMicrocredits = 100000;
const records = await networkClient.findRecords(startHeight, undefined, true, ["credits.aleo"], undefined, maxMicrocredits);
```

<a name="AleoNetworkClient+findUnspentRecords"></a>

---

### findUnspentRecords {#AleoNetworkClient+findUnspentRecords}

<p>Aleo ブロックチェーン上で未使用レコードの検索を試みます。</p>

```javascript
networkClient.findUnspentRecords(startHeight, endHeight, programs, amounts, maxMicrocredits, nonces, privateKey) ⇒ Promise.<Array.<RecordPlaintext>>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| startHeight | <code>number</code> | 未使用レコードの検索を開始する高さです |
| endHeight | <code>number</code> | 未使用レコードの検索を終了する高さです |
| programs | <code>Array.&lt;string&gt;</code> | 未使用レコードを検索する対象プログラムです |
| amounts | <code>Array.&lt;number&gt;</code> | 探したい金額（マイクロクレジット単位）です（例: [100, 200, 3000]） |
| maxMicrocredits | <code>number</code> | 合計マイクロクレジットの上限です |
| nonces | <code>Array.&lt;string&gt;</code> | すでに見つかったレコードのノンスです。検索対象から除外します |
| privateKey | <code>string</code> | 未使用レコードを検索する際に使う任意の秘密鍵です |
| *return* | <code>Promise.&lt;Array.&lt;RecordPlaintext&gt;&gt;</code> | 

**Example**  
```js
// 特定の金額を検索します
const startHeight = 500000;
const endHeight = 550000;
const amounts = [600000, 1000000];
const records = await networkClient.findUnspentRecords(startHeight, endHeight, ["credits.aleo"], amounts);

// 合計マイクロクレジットの上限を指定して特定の金額を検索します
const maxMicrocredits = 100000;
const records = await networkClient.findUnspentRecords(startHeight, undefined, ["credits.aleo"], undefined, maxMicrocredits);
```

<a name="AleoNetworkClient+getBlock"></a>

---

### getBlock {#AleoNetworkClient+getBlock}

<p>指定したブロック高にあるブロックの内容を返します。</p>

```javascript
networkClient.getBlock(height) ⇒ Promise.<BlockJSON>
```

| パラメーター | 型 |
| --- | --- |
| height | <code>number</code> | 
| *return* | <code>Promise.&lt;BlockJSON&gt;</code> | 

**Example**  
```js
let block = await networkClient.getBlock(1234);
```

<a name="AleoNetworkClient+getBlockRange"></a>

---

### getBlockRange {#AleoNetworkClient+getBlockRange}

<p>指定したブロック高の範囲にあるブロックを返します。</p>

```javascript
networkClient.getBlockRange(start, end) ⇒ Promise.<Array.<BlockJSON>>
```

| パラメーター | 型 |
| --- | --- |
| start | <code>number</code> | 
| end | <code>number</code> | 
| *return* | <code>Promise.&lt;Array.&lt;BlockJSON&gt;&gt;</code> | 

**Example**  
```js
let blockRange = await networkClient.getBlockRange(2050, 2100);
```

<a name="AleoNetworkClient+getProgram"></a>

---

### getProgram

<p>プログラム ID を指定してプログラムのソースコードを返します。</p>

```javascript
networkClient.getProgram(programId) ⇒ Promise.<string>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| programId | <code>string</code> | Aleo ネットワークにデプロイ済みのプログラム ID です |
| *return* | <code>Promise.&lt;string&gt;</code> | 

**Example**  
```js
let program = await networkClient.getProgram("hello_hello.aleo");
const expectedSource = "program hello_hello.aleo;\n\nfunction hello:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n"
assert.equal(program, expectedSource);
```

<a name="AleoNetworkClient+getProgramObject"></a>

---

### getProgramObject

<p>プログラム ID またはプログラムのソースコードからプログラムオブジェクトを返します。</p>

```javascript
networkClient.getProgramObject(inputProgram) ⇒ Promise.<Program>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| inputProgram | <code>string</code> | Aleo ネットワークにデプロイ済みのプログラム ID またはソースコードです |
| *return* | <code>Promise.&lt;Program&gt;</code> | 

**Example**  
```js
let program = await networkClient.getProgramObject("hello_hello.aleo");
const programSource = "program hello_hello.aleo;\n\nfunction hello:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    add r0 r1 into r2;\n    output r2 as u32.private;\n"

// Get program object from program ID or program source code
const programObjectFromID = await networkClient.getProgramObject(programID);
const programObjectFromSource = await networkClient.getProgramObject(programSource);

// Both program objects should be equal
assert.equal(programObjectFromID.to_string(), programObjectFromSource.to_string());
```

<a name="AleoNetworkClient+getProgramImports"></a>

---

### getProgramImports

<p>プログラムのソースコードと、そのプログラムがインポートしているすべてのプログラムのソースコードを含むオブジェクトを返します。</p>

```javascript
networkClient.getProgramImports(inputProgram) ⇒ Promise.<ProgramImports>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| inputProgram | <code>Program</code> | Aleo ネットワークにデプロイ済みのプログラム ID またはソースコードです |
| *return* | <code>Promise.&lt;ProgramImports&gt;</code> | 

**Example**  
```js
let program = await networkClient.getProgramImports("double_test.aleo");
const double_test_source = "import multiply_test.aleo;\n\nprogram double_test.aleo;\n\nfunction double_it:\n    input r0 as u32.private;\n    call multiply_test.aleo/multiply 2u32 r0 into r1;\n    output r1 as u32.private;\n"
const double_test = Program.fromString(double_test_source);
const expectedImports = {
    "multiply_test.aleo": "program multiply_test.aleo;\n\nfunction multiply:\n    input r0 as u32.public;\n    input r1 as u32.private;\n    mul r0 r1 into r2;\n    output r2 as u32.private;\n"
}

// Imports can be fetched using the program ID, source code, or program object
let programImports = await networkClient.getProgramImports("double_test.aleo");
assert.deepStrictEqual(programImports, expectedImports);

// Using the program source code
programImports = await networkClient.getProgramImports(double_test_source);
assert.deepStrictEqual(programImports, expectedImports);

// Using the program object
programImports = await networkClient.getProgramImports(double_test);
assert.deepStrictEqual(programImports, expectedImports);
```

<a name="AleoNetworkClient+getProgramImportNames"></a>

---

### getProgramImportNames

<p>プログラムがインポートしているプログラム名の一覧を取得します。</p>

```javascript
networkClient.getProgramImportNames(inputProgram) ⇒ Array.<string>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| inputProgram | <code>Program</code> | インポートを取得したいプログラム ID またはソースコードです |
| *return* | <code>Array.&lt;string&gt;</code> | 

**Example**  
```js
let mappings = networkClient.getProgramImportNames("double_test.aleo");
const expectedImportsNames = ["multiply_test.aleo"];
assert.deepStrictEqual(programImportsNames, expectedImportsNames);
```

<a name="AleoNetworkClient+getDeploymentTransactionIDForProgram"></a>

---

### getDeploymentTransactionIDForProgram

<p>指定したプログラムに紐づくデプロイトランザクション ID を返します。</p>

```javascript
networkClient.getDeploymentTransactionIDForProgram(program) ⇒ TransactionJSON
```

| パラメーター | 型 |
| --- | --- |
| program | <code>Program</code> | 
| *return* | <code>TransactionJSON</code> | 

**Example**  
```js
let program = networkClient.getDeploymentTransactionIDForProgram("foo.aleo");
```

<a name="AleoNetworkClient+getDeploymentTransactionForProgram"></a>

---

### getDeploymentTransactionForProgram

<p>指定したプログラムに紐づくデプロイトランザクションを返します。</p>

```javascript
networkClient.getDeploymentTransactionForProgram(program) ⇒ TransactionJSON
```

| パラメーター | 型 |
| --- | --- |
| program | <code>Program</code> | 
| *return* | <code>TransactionJSON</code> | 

**Example**  
```js
let program = networkClient.getDeploymentTransactionForProgram("foo.aleo");
```

<a name="AleoNetworkClient+getDeploymentTransactionObjectForProgram"></a>

---

### getDeploymentTransactionObjectForProgram

<p>指定したプログラムに紐づくデプロイトランザクションを WASM オブジェクトとして返します。</p>

```javascript
networkClient.getDeploymentTransactionObjectForProgram(program) ⇒ TransactionJSON
```

| パラメーター | 型 |
| --- | --- |
| program | <code>Program</code> | 
| *return* | <code>TransactionJSON</code> | 

<a name="AleoNetworkClient+getProgramMappingNames"></a>

---

### getProgramMappingNames

<p>プログラムが持つマッピング名を返します。</p>

```javascript
networkClient.getProgramMappingNames(programId) ⇒ Promise.<Array.<string>>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| programId | <code>string</code> | マッピングを取得したいプログラム ID です（例: "credits.aleo"） |
| *return* | <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> | 

**Example**  
```js
let mappings = await networkClient.getProgramMappingNames("credits.aleo");
const expectedMappings = [
  "committee",
  "delegated",
  "metadata",
  "bonded",
  "unbonding",
  "account",
  "withdraw"
];
assert.deepStrictEqual(mappings, expectedMappings);
```

<a name="AleoNetworkClient+getProgramMappingValue"></a>

---

### getProgramMappingValue

<p>プログラムのマッピングに対して特定のキーの値を返します。</p>

```javascript
networkClient.getProgramMappingValue(programId, mappingName, key) ⇒ Promise.<string>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| programId | <code>string</code> | マッピング値を取得したいプログラム ID です（例: "credits.aleo"） |
| mappingName | <code>string</code> | 値を取得したいマッピング名です（例: "account"） |
| key | <code>string</code> | 値を取得したいマッピングのキーです（例: "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px"） |
| *return* | <code>Promise.&lt;string&gt;</code> | 

**Example**  
```js
// アカウントの公開残高を取得します
let mappingValue = await networkClient.getProgramMappingValue("credits.aleo", "account", "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px");
const expectedValue = "0u64";
assert.equal(mappingValue, expectedValue);
```

<a name="AleoNetworkClient+getProgramMappingPlaintext"></a>

---

### getProgramMappingPlaintext

<p>マッピングの値を WASM の Plaintext オブジェクトとして返します。この形式で返すことで、JS の型へ変換したり、構造体や配列であれば内部メンバーを検査したりできます。</p>

```javascript
networkClient.getProgramMappingPlaintext(programId, mappingName, key) ⇒ Promise.<string>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| programId | <code>string</code> | マッピング値を取得したいプログラム ID です（例: "credits.aleo"） |
| mappingName | <code>string</code> | 値を取得したいマッピング名です（例: "account"） |
| key | <code>string</code> | 値を取得したいマッピングのキーです（例: "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px"） |
| *return* | <code>Promise.&lt;string&gt;</code> | 

**Example**  
```js
// bond 状態をアカウントとして取得します
const unbondedState = await networkClient.getProgramMappingPlaintext("credits.aleo", "bonded", "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px");

// オブジェクトの 2 つのメンバーを個別に取得します
const validator = unbondedState.getMember("validator");
const microcredits = unbondedState.getMember("microcredits");

// 期待する値が正しいことを確認します
assert.equal(validator, "aleo1u6940v5m0fzud859xx2c9tj2gjg6m5qrd28n636e6fdd2akvfcgqs34mfd");
assert.equal(microcredits, BigInt("9007199254740991"));

// unbonded 状態を JS オブジェクトとして取得します
const unbondedStateObject = unbondedState.toObject();

const expectedState = {
    validator: "aleo1u6940v5m0fzud859xx2c9tj2gjg6m5qrd28n636e6fdd2akvfcgqs34mfd",
    microcredits: BigInt("9007199254740991")
};
assert.equal(unbondedState, expectedState);
```

<a name="AleoNetworkClient+getLatestBlock"></a>

---

### getLatestBlock

<p>最新のブロックの内容を返します。</p>

```javascript
networkClient.getLatestBlock() ⇒ Promise.<BlockJSON>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Promise.&lt;BlockJSON&gt;</code> | 

**Example**  
```js
let latestHeight = await networkClient.getLatestBlock();
```

<a name="AleoNetworkClient+getLatestHeight"></a>

---

### getLatestHeight

<p>最新のブロック高を返します。</p>

```javascript
networkClient.getLatestHeight() ⇒ Promise.<number>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Promise.&lt;number&gt;</code> | 

**Example**  
```js
let latestHeight = await networkClient.getLatestHeight();
```

<a name="AleoNetworkClient+getLatestCommittee"></a>

---

### getLatestCommittee

<p>最新の委員会情報を返します。</p>

```javascript
networkClient.getLatestCommittee() ⇒ Promise.<object>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Promise.&lt;object&gt;</code> | 

**Example**  
```js
let latestCommittee = await networkClient.getLatestCommittee();
```

<a name="AleoNetworkClient+getStateRoot"></a>

---

### getStateRoot

<p>Aleo ブロックチェーンの最新のステート（マークル）ルートを返します。</p>

```javascript
networkClient.getStateRoot() ⇒ Promise.<string>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Promise.&lt;string&gt;</code> | 

**Example**  
```js
let stateRoot = await networkClient.getStateRoot();
```

<a name="AleoNetworkClient+getTransaction"></a>

---

### getTransaction

<p>一意の識別子でトランザクションを取得します。</p>

```javascript
networkClient.getTransaction(id) ⇒ Promise.<TransactionJSON>
```

| パラメーター | 型 |
| --- | --- |
| id | <code>string</code> | 
| *return* | <code>Promise.&lt;TransactionJSON&gt;</code> | 

**Example**  
```js
let transaction = await networkClient.getTransaction("at1handz9xjrqeynjrr0xay4pcsgtnczdksz3e584vfsgaz0dh0lyxq43a4wj");
```

<a name="AleoNetworkClient+getTransactionObject"></a>

---

### getTransactionObject

<p>トランザクションを WASM オブジェクトとして返します。この型で取得すると、入力・出力・レコードを検索して表示できます。</p>

```javascript
networkClient.getTransactionObject(transactionId) ⇒ Promise.<Transaction>
```

| パラメーター | 型 |
| --- | --- |
| transactionId | <code>string</code> | 
| *return* | <code>Promise.&lt;Transaction&gt;</code> | 

**Example**  
```js
const transactionObject = await networkClient.getTransactionObject("at1handz9xjrqeynjrr0xay4pcsgtnczdksz3e584vfsgaz0dh0lyxq43a4wj");
// トランザクション入力を JS 配列として取得します
const transactionOutputs = transactionObject.inputs(true);

// トランザクション出力を JS オブジェクトとして取得します
const transactionInputs = transactionObject.outputs(true);

// トランザクション内のトランジションで生成されたレコードを JS オブジェクトとして取得します
const records = transactionObject.records();

// トランザクションタイプを取得します
const transactionType = transactionObject.transactionType();
assert.equal(transactionType, "Execute");

// 全入力・出力・トランザクションメタデータの JS 形式を取得します
const transactionSummary = transactionObject.summary();
```

<a name="AleoNetworkClient+getTransactions"></a>

---

### getTransactions

<p>指定したブロック高に含まれるトランザクションを返します。</p>

```javascript
networkClient.getTransactions(height) ⇒ Promise.<Array.<ConfirmedTransactionJSON>>
```

| パラメーター | 型 |
| --- | --- |
| height | <code>number</code> | 
| *return* | <code>Promise.&lt;Array.&lt;ConfirmedTransactionJSON&gt;&gt;</code> | 

**Example**  
```js
let transactions = await networkClient.getTransactions(654);
```

<a name="AleoNetworkClient+getTransactionsInMempool"></a>

---

### getTransactionsInMempool

<p>メモリプール内のトランザクションを返します。このメソッドを利用するにはバリデータの REST API へのアクセスが必要です。</p>

```javascript
networkClient.getTransactionsInMempool() ⇒ Promise.<Array.<TransactionJSON>>
```

| パラメーター | 型 |
| --- | --- |
| *return* | <code>Promise.&lt;Array.&lt;TransactionJSON&gt;&gt;</code> | 

**Example**  
```js
let transactions = await networkClient.getTransactionsInMempool();
```

<a name="AleoNetworkClient+getTransitionId"></a>

---

### getTransitionId

<p>入力または出力の ID に対応するトランジションのトランジション ID を返します。</p>

```javascript
networkClient.getTransitionId(inputOrOutputID) ⇒ Promise.<string>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| inputOrOutputID | <code>string</code> | 入力または出力の ID です |
| *return* | <code>Promise.&lt;string&gt;</code> | 

**Example**  
```js
let transition = await networkClient.getTransitionId("2429232855236830926144356377868449890830704336664550203176918782554219952323field");
```

<a name="AleoNetworkClient+submitTransaction"></a>

---

### submitTransaction

<p>実行またはデプロイトランザクションを Aleo ネットワークに送信します。</p>

```javascript
networkClient.submitTransaction(transaction) ⇒ string
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| transaction | <code>Transaction</code> | ネットワークに送信するトランザクションです |
| *return* | <code>string</code> | 

<a name="AleoNetworkClient+submitSolution"></a>

---

### submitSolution

<p>ソリューションを Aleo ネットワークに送信します。</p>

```javascript
networkClient.submitSolution(solution) ⇒ Promise.<string>
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| solution | <code>string</code> | ネットワークに送信したいソリューションの文字列表現です |
| *return* | <code>Promise.&lt;string&gt;</code> |
