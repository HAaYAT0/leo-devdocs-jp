---
title: アカウント
sidebar_label: アカウント
---

<a name="Account"></a>

## 概要 {#Account}
<p>キー管理クラスです。新しい Aleo アカウントの作成、既存の秘密鍵またはシードからのアカウントのインポート、メッセージの署名と検証機能を提供します。</p>
<p>Aleo アカウントはランダムに生成されたシード（数値）から生成され、そこからアカウントの秘密鍵、ビューキー、公開アドレスが導出されます。秘密鍵は Aleo アカウントの根幹にあり、Aleo プログラムの実行や任意の価値移転を実行できるため非常に機微な情報です。必ず保護してください。ビューキーはブロックチェーン上でのユーザーのアクティビティを復号するために使用します。アドレスは他の Aleo ユーザーが Aleo クレジットやその他のレコードを送信できる公開アドレスです。このクラスは、基盤となる鍵素材の安全性が保証できる環境でのみ使用してください。</p>

**種類**: グローバルクラス  

* Account
    * _instance_
        * [.encryptAccount(ciphertext)](#Account+encryptAccount) ⇒ <code>PrivateKeyCiphertext</code>
        * [.decryptRecord(ciphertext)](#Account+decryptRecord) ⇒ <code>Record</code>
        * [.decryptRecords(ciphertexts)](#Account+decryptRecords) ⇒ <code>Array.&lt;Record&gt;</code>
        * [.ownsRecordCiphertext(ciphertext)](#Account+ownsRecordCiphertext) ⇒ <code>boolean</code>
        * [.sign(message)](#Account+sign) ⇒ <code>Signature</code>
        * [.verify(message, signature)](#Account+verify) ⇒ <code>boolean</code>
    * _static_
        * [.fromCiphertext(ciphertext, password)](#Account.fromCiphertext) ⇒ <code>PrivateKey</code> \| <code>Error</code>

## 例
```javascript
// 新しいアカウントを作成します
const myRandomAccount = new Account();

// ランダムに生成したシードからアカウントを作成します
const seed = new Uint8Array([94, 91, 52, 251, 240, 230, 226, 35, 117, 253, 224, 210, 175, 13, 205, 120, 155, 214, 7, 169, 66, 62, 206, 50, 188, 40, 29, 122, 40, 250, 54, 18]);
const mySeededAccount = new Account({seed: seed});

// 既存の秘密鍵からアカウントを作成します
const myExistingAccount = new Account({privateKey: 'myExistingPrivateKey'})

// メッセージに署名します
const hello_world = Uint8Array.from([104, 101, 108, 108, 111 119, 111, 114, 108, 100])
const signature = myRandomAccount.sign(hello_world)

// 署名を検証します
myRandomAccount.verify(hello_world, signature)
```

## コンストラクター

<a name="new_Account_new"></a>

### Account

```javascript
new Account(params)
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| params | <code>AccountParam</code> | アカウント作成時の任意パラメーターです |

#### Interface

```typescript
interface AccountParam {
  privateKey?: string;
  seed?: Uint8Array;
}
```

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| privateKey | <code>string</code> | アカウントを作成するために利用する任意の秘密鍵文字列です |
| seed | <code>Uint8Array</code> | アカウントを作成するために利用する任意のシード配列です |

**Example**  
```js
// ランダムなシードで新しいアカウントを作成します
const myRandomAccount = new Account();

// ランダムに生成したシードからアカウントを作成します
const seed = new Uint8Array([94, 91, 52, 251, 240, 230, 226, 35, 117, 253, 224, 210, 175, 13, 205, 120, 155, 214, 7, 169, 66, 62, 206, 50, 188, 40, 29, 122, 40, 250, 54, 18]);
const mySeededAccount = new Account({seed: seed});

// 既存の秘密鍵からアカウントを作成します
const myExistingAccount = new Account({privateKey: 'APrivateKey1zkp...'});
```

## メソッド

<a name="Account+encryptAccount"></a>

### encryptAccount {#Account+encryptAccount}

<p>アカウントの秘密鍵をパスワードで暗号化します。</p>

```javascript
account.encryptAccount(ciphertext) ⇒ PrivateKeyCiphertext
```

**種類**: [<code>Account</code>](#Account) のインスタンスメソッド  

| パラメーター | 型 |
| --- | --- |
| ciphertext | <code>string</code> |
| *return* | <code>PrivateKeyCiphertext</code> | 

**Example**  
```js
let account = new Account();
let ciphertext = account.encryptAccount("password");
```

---

<a name="Account+decryptRecord"></a>

### decryptRecord {#Account+decryptRecord}

<p>暗号化されたレコードを復号して平文に戻します。</p>

```javascript
account.decryptRecord(ciphertext) ⇒ Record
```

**種類**: [<code>Account</code>](#Account) のインスタンスメソッド  

| パラメーター | 型 |
| --- | --- |
| ciphertext | <code>string</code> |
| *return* | <code>Record</code> | 

**Example**  
```js
let account = new Account();
let record = account.decryptRecord("record1ciphertext");
```

---

<a name="Account+decryptRecords"></a>

### decryptRecords {#Account+decryptRecords}

<p>暗号化されたレコードの配列を復号して平文に戻します。</p>

```javascript
account.decryptRecords(ciphertexts) ⇒ Array.<Record>
```

**種類**: [<code>Account</code>](#Account) のインスタンスメソッド  

| パラメーター | 型 |
| --- | --- |
| ciphertexts | <code>Array.&lt;string&gt;</code> |
| *return* | <code>Array.&lt;Record&gt;</code> | 

**Example**  
```js
let account = new Account();
let record = account.decryptRecords(["record1ciphertext", "record2ciphertext"]);
```

---

<a name="Account+ownsRecordCiphertext"></a>

### ownsRecordCiphertext {#Account+ownsRecordCiphertext}

<p>暗号化されたレコードがアカウントに属しているかどうかを判定します。</p>

```javascript
account.ownsRecordCiphertext(ciphertext) ⇒ boolean
```

**種類**: [<code>Account</code>](#Account) のインスタンスメソッド  

| パラメーター | 型 |
| --- | --- |
| ciphertext | <code>RecordCipherText</code> \| <code>string</code> |
| *return* | <code>boolean</code> | 

**Example**  
```js
// Aleo ネットワークへの接続とアカウントを作成します
let connection = new NodeConnection("vm.aleo.org/api");
let account = Account.fromCiphertext("ciphertext", "password");

// ネットワークからレコードを取得します
let record = connection.getBlock(1234);
let recordCipherText = record.transactions[0].execution.transitions[0].id;

// レコードがアカウントに属しているか確認します
if account.ownsRecord(recordCipherText) {
    // 次のような操作が可能になります:
    // レコードを復号して使用済みかどうかを確認します
    // ローカルデータベースにレコードを保存します
    // など
}
```

---

<a name="Account+sign"></a>

### sign {#Account+sign}

<p>アカウントの秘密鍵でメッセージに署名します。署名を返します。</p>

```javascript
account.sign(message) ⇒ Signature
```

**種類**: [<code>Account</code>](#Account) のインスタンスメソッド  

| パラメーター | 型 |
| --- | --- |
| message | <code>Uint8Array</code> |
| *return* | <code>Signature</code> | 

**Example**  
```js
let account = new Account();
let message = Uint8Array.from([104, 101, 108, 108, 111 119, 111, 114, 108, 100])
account.sign(message);
```

---

<a name="Account+verify"></a>

### verify {#Account+verify}

<p>メッセージに付与された署名を検証します。</p>

```javascript
account.verify(message, signature) ⇒ boolean
```

**種類**: [<code>Account</code>](#Account) のインスタンスメソッド  

| パラメーター | 型 |
| --- | --- |
| message | <code>Uint8Array</code> |
| signature | <code>Signature</code> |
| *return* | <code>boolean</code> | 

**Example**  
```js
let account = new Account();
let message = Uint8Array.from([104, 101, 108, 108, 111 119, 111, 114, 108, 100])
let signature = account.sign(message);
account.verify(message, signature);
```

---

<a name="Account.fromCiphertext"></a>

### fromCiphertext {#Account.fromCiphertext}

<p>秘密鍵の暗号化文字列からアカウントを生成しようとします。</p>

```javascript
Account.fromCiphertext(ciphertext, password) ⇒ PrivateKey | Error
```

**種類**: [<code>Account</code>](#Account) の静的メソッド  

| パラメーター | 型 |
| --- | --- |
| ciphertext | <code>PrivateKeyCiphertext</code> \| <code>string</code> |
| password | <code>string</code> |
| *return* | <code>PrivateKey</code> \| <code>Error</code> | 

**Example**  
```js
let ciphertext = PrivateKey.newEncrypted("password");
let account = Account.fromCiphertext(ciphertext, "password");
```
