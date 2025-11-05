---
id: record_provider
title: レコードプロバイダー
sidebar_label: レコードプロバイダー
---

## 概要

プログラムの実行やデプロイ、ウォレット機能などで利用するレコードを検索するために、Aleo 公式 API を利用するレコードプロバイダー実装です。

**種類**: グローバルクラス  

* [NetworkRecordProvider](#networkrecordprovider)
    * _instance_
        * [.setAccount(account)](#setaccount)
        * [.findCreditsRecords(microcredits, unspent, nonces, searchParameters)](#findcreditsrecords)
        * [.findCreditsRecord(microcredits, unspent, nonces, searchParameters)](#findcreditsrecord)
        * [.findRecord(unspent, nonces, searchParameters)](#findrecord)
        * [.findRecords(unspent, nonces, searchParameters)](#findrecords)

## Constructor

<a name="new_NetworkRecordProvider_new"></a>

### NetworkRecordProvider

```javascript
new NetworkRecordProvider(account, networkClient)
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| account | <code>Account</code> | レコード検索に使用するアカウント |
| networkClient | <code>AleoNetworkClient</code> | API 呼び出しに使用するネットワーククライアント |

**Example**  
```js
// 新しい NetworkRecordProvider を作成します
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const account = new Account();
const recordProvider = new NetworkRecordProvider(account, networkClient);
```

## Methods

### setAccount

レコード検索に使用するアカウントを設定します。

```javascript
setAccount(account)
```

パラメーター | 型 | 説明
--- | --- | ---
__account__ | Account | *レコード検索に使用するアカウント*

**Example**
```javascript
// レコードプロバイダーに新しいアカウントを設定します
const newAccount = new Account();
recordProvider.setAccount(newAccount);
```

---

### findCreditsRecords

指定したマイクロクレジット量のクレジットレコードを、Aleo 公式 API を通じて複数件検索します。

```javascript
findCreditsRecords(microcredits, unspent, nonces, searchParameters)
```

パラメーター | 型 | 説明
--- | --- | ---
__microcredits__ | `Array.<number>` | *検索するマイクロクレジット量*
__unspent__ | `boolean` | *レコードが未使用かどうか*
__nonces__ | `Array.<string>` | *再取得を防ぐために、既に見つかったレコードのノンスを指定します*
__searchParameters__ | `RecordSearchParams` | *追加の検索パラメーター*
__*return*__ | `Promise.<RecordPlaintext>` | *レコードが見つかった場合はレコード、そうでない場合はエラー*

**Example**
```javascript
// 新しい NetworkRecordProvider を作成します
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);

// レコードプロバイダーを使って、指定したマイクロクレジット量のレコードを検索します
const record = await recordProvider.findCreditsRecord(5000, true, []);

// レコードが見つかりまだ使用していない場合、nonces パラメーターにノンスを追加して
// 次回の検索で再取得されないようにします
const records = await recordProvider.findCreditsRecords(5000, true, [record.nonce()]);

// ProgramManager にレコードプロバイダーを設定すると、
// 手数料レコードや送金額のレコードを自動的に検索するため、手動で指定する必要がなくなります
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
programManager.transfer(1, "aleo166q6ww6688cug7qxwe7nhctjpymydwzy2h7rscfmatqmfwnjvggqcad0at", "public", 0.5);
```

---

### findCreditsRecord

指定したマイクロクレジット量のクレジットレコードを、Aleo 公式 API を通じて 1 件検索します。

```javascript
findCreditsRecord(microcredits, unspent, nonces, searchParameters)
```

パラメーター | 型 | 説明
--- | --- | ---
__microcredits__ | `number` | *検索するマイクロクレジット量*
__unspent__ | `boolean` | *レコードが未使用かどうか*
__nonces__ | `Array.<string>` | *再取得を防ぐため、既に見つかったレコードのノンス*
__searchParameters__ | `RecordSearchParams` | *追加の検索パラメーター*
__*return*__ | `Promise.<RecordPlaintext>` | *レコードが見つかった場合はレコード、そうでない場合はエラー*

**Example**
```javascript
// 新しい NetworkRecordProvider を作成します
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);

// レコードプロバイダーを使って、指定したマイクロクレジット量のレコードを検索します
const record = await recordProvider.findCreditsRecord(5000, true, []);

// レコードが見つかりまだ使用していない場合、nonces パラメーターにノンスを追加して
// 次回の検索で再取得されないようにします
const records = await recordProvider.findCreditsRecords(5000, true, [record.nonce()]);

// ProgramManager にレコードプロバイダーを設定すると、
// 手数料レコードや送金額のレコードを自動的に検索するため、手動で指定する必要がなくなります
const programManager = new ProgramManager("https://api.explorer.provable.com/v1", keyProvider, recordProvider);
programManager.transfer(1, "aleo166q6ww6688cug7qxwe7nhctjpymydwzy2h7rscfmatqmfwnjvggqcad0at", "public", 0.5);
```

---

### findRecord

任意のレコードを検索します。警告: この関数はまだ実装されていないため、エラーを投げます。

```javascript
findRecord(unspent, nonces, searchParameters)
```

パラメーター | 型 | 説明
--- | --- | ---
__unspent__ | `boolean` | *レコードが未使用かどうか*
__nonces__ | `Array.<string>` | *再取得を防ぐための既存レコードのノンス*
__searchParameters__ | `RecordSearchParams` | *追加の検索パラメーター*
__*return*__ | `Promise.<RecordPlaintext>` | *レコードが見つかった場合はレコード、そうでない場合はエラー*

**Example**
```javascript
// 新しい NetworkRecordProvider を作成します
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const recordProvider = new NetworkRecordProvider(account, networkClient);

// 任意のレコードを検索します（未実装）
try {
    const record = await recordProvider.findRecord(true, [], null);
} catch (error) {
    console.log("findRecord is not yet implemented");
}
```

---

### findRecords

指定したプログラムから複数のレコードを検索します。

```javascript
findRecords(unspent, nonces, searchParameters)
```

パラメーター | 型 | 説明
--- | --- | ---
__unspent__ | `boolean` | *レコードが未使用かどうか*
__nonces__ | `Array.<string>` | *再取得を避けるための既存レコードのノンス*
__searchParameters__ | `RecordSearchParams` | *追加の検索パラメーター*
__*return*__ | `Promise.<Array.<RecordPlaintext>>` | *レコードが見つかった場合はレコード配列、そうでない場合はエラー*

**Example**
```javascript
// 新しい NetworkRecordProvider を作成します
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const recordProvider = new NetworkRecordProvider(account, networkClient);

// 指定したプログラムから複数のレコードを検索します
const records = await recordProvider.findRecords(true, [], null);
```

---

## Class `BlockHeightSearch`

BlockHeightSearch is a RecordSearchParams implementation that allows for searching for records within a given
block height range.

### Examples

```javascript
// Create a new BlockHeightSearch
const params = new BlockHeightSearch(89995, 99995);

// Create a new NetworkRecordProvider
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);

// The record provider can be used to find records with a given number of microcredits and the block height search
// can be used to find records within a given block height range
const record = await recordProvider.findCreditsRecord(5000, true, [], params);
```
