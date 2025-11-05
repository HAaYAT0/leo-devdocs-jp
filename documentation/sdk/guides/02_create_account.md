---
id: create_account
title: Aleo アカウントの作成
sidebar_label: アカウントの作成
---
## アカウントキー
ゼロ知識 Web アプリケーションを扱う最初のステップは、ユーザーの暗号学的なアイデンティティを作成することです。Aleo では、このプロセスは秘密鍵を生成することから始まり、その秘密鍵から Aleo プログラムとやり取りするためのさまざまな鍵を派生させます。

主な鍵は次のとおりです。
### 秘密鍵
個々のユーザーのアイデンティティを表す鍵です。ゼロ知識プログラムの実行を承認する際に使用します。
### ビューキー
秘密鍵から派生し、ユーザーに属するすべてのレコードやトランザクションデータを識別するために使用します。
### コンピュートキー
ユーザーに代わってアプリケーションを信頼不要で実行し、トランザクションを生成するために使用します。
### アドレス
公式の Aleo クレジットや、他のゼロ知識 Aleo プログラムで定義された独自データを受け取るために、ユーザーを信頼不要で識別する公開アドレスです。

:::warning
いずれの鍵も機微な情報なので、安全に保管してください！
:::

## アカウントを作成する
`Account` オブジェクトを使えば、これらの鍵をまとめて生成できます。

```typescript
import { Account } from '@provablehq/sdk';

const account = new Account();

// 個々の鍵は以下のメソッドで取得できます
const privateKey = account.privateKey();
const viewKey = account.viewKey();
const computeKey = account.computeKey();
const address = account.address();
```


すでにアカウントをお持ちの場合は、秘密鍵を使って `Account` オブジェクトを初期化できます。

```typescript
import { Account } from '@provablehq/sdk';

const account = new Account({
    privateKey: 'APrivateKey1...',
});
```

SDK には、秘密鍵を任意のパスワードで暗号化する機能と、暗号化された秘密鍵とパスワードから `Account` オブジェクトを初期化するショートカットも用意されています。

```typescript
import { Account, PrivateKey } from '@provablehq/sdk';

// 新しく暗号化した秘密鍵を利用する場合
const password = 'password';
const ciphertext = PrivateKey.newEncrypted(password);
const account = Account.fromCiphertext(ciphertext, password);

// 既存の秘密鍵を暗号化した場合
const privateKey = PrivateKey.from_string('APrivateKey1...');
const existingPassword = 'existingPassword';
const existingCiphertext = privateKey.toCiphertext(existingPassword);
const existingAccount = Account.fromCiphertext(existingCiphertext, existingPassword);
```


