---
id: quick_start
title: クイックスタート
sidebar_label: クイックスタート
---

Aleo クイックスタートへようこそ。このガイドでは、Aleo でアプリケーションを構築するための基本的な流れを紹介します。  
[Leo Playground](https://play.leo-lang.org) を使って独自の Aleo プログラムをデプロイし、ブラウザ上で直接操作する手順を体験してください。

## 学べること
1. **Aleo アカウント:** Aleo アカウントの作成方法と、秘匿データと公開データの扱い方を学びます。
2. **Aleo プログラム:** 自分のプログラムをデプロイし、Aleo ネットワークと対話する方法を習得します。
3. **秘匿状態と公開状態:** プライバシーを保ちながらアプリを構築するために、秘匿データと公開データをどのように管理するかを学びます。

## 1. 新しい Aleo アカウントを作成する

Aleo で開発を始めるには、まず Aleo アカウントを作成します。Aleo アカウントはネットワークと対話するための識別子で、プログラムの実行、秘匿/公開データの作成、新しいプログラムのデプロイに使用します。Leo Playground から生成する方法と、エコシステムのウォレットを利用する方法があります。

### 1.1 Leo Playground ウィジェットを使用する

Account ウィジェットをクリックして新しい Aleo アカウントを生成します。

<img src={require('./images/new_account.png').default} width="400"/>

:::note
**Address**、**View Key**、**Private Key** は安全な場所に保管してください。後のステップで必要になります。
:::

### 1.2 エコシステムのウォレットを使用する

以下のウォレットをインストールすると、アカウント作成を求められます。指示に従って Aleo アカウントを準備してください。

* [Puzzle Wallet](https://puzzle.online/wallet)
* [Fox Wallet](https://foxwallet.com/)
* [Soter Wallet](https://sotertech.io/)

## 2. ウォレットにテストネットクレジットを補充する

### 2.1 エコシステムのファーセットからクレジットを受け取る

ウォレットを補充するには、公式ファーセット https://faucet.aleo.org/ からクレジットを申請します。

ファーセットから受け取るクレジットは公開クレジットであり、Aleo ネットワーク上で誰でも閲覧できます。

### 2.2 テストネットクレジットの受領を確認する

ファーセットからの送金が完了したら、クエリウィジェットで `Get Account Balance` を選び、ウォレットアドレスを貼り付けて `Get` をクリックすると残高を確認できます。テストネットクレジットが反映されるまで数分かかる場合がありますが心配はいりません。

<img src={require('./images/account_balance.png').default} width="400"/>

クレジットが届くと、`Get` を押した後に以下のような出力が表示されます。

<img src={require('./images/provable_explorer.png').default} width="400"/>

ファーセットから渡されたトランザクション ID を、エコシステムのブロックエクスプローラーで検索することもできます。

<!-- markdown-link-check-disable -->
- [Provable Explorer](https://testnet.explorer.provable.com/)
- [Aleoscan](https://testnet.aleoscan.io/)
<!-- markdown-link-check-enable -->

:::tip
ウォレットにクレジットが届くのを待つ間に、次のステップへ進んで構いません。
:::

## 3. 最初の Aleo プログラムをデプロイする

### 3.1 トークンプログラム

このセクションでは、Leo Playground からサンプルの `Token` プログラムを Aleo テストネットにデプロイします。  
セクションの最後には、自分のプライバシー保護プログラムを Aleo にデプロイする手順が理解できるようになります。

:::info
`Token` プログラムは、公開残高と秘匿残高の両方を扱えるトークンを通じて、公開機能と秘匿機能を組み合わせたプログラムを構築する方法を示すシンプルな例です。暗号化されたデータ構造である Record を使って秘匿データを表現し、公開オンチェーンデータストアであるマッピングを用いて公開データを表現する方法を学べます。
:::

### 3.2 プログラム名をカスタマイズする

まず Leo Playground の Examples ドロップダウンから `Token` プログラムを選択します。

<img src={require('./images/select_token.png').default} width="800"/>

次に、`src/main.leo` の 1 行目にあるプログラム名をユニークな識別子に変更し、`program.json` の `program` フィールドも同じ名前に更新します。

<img src={require('./images/program_name_.png').default} width="800"/>

<img src={require('./images/program_json_.png').default} width="800"/>

:::tip
アプリケーション名は 10 文字以上にしましょう。それより短い名前をデプロイすると手数料が高くなります。
:::

これでテストネットに最初の Aleo プログラムをデプロイする準備が整いました。続行する前に、ウォレットに十分なテストネットクレジットがあることを確認してください。

### 3.3 テストネットへデプロイする

Deploy ウィジェットをクリックしてデプロイ画面を開きます。`Program ID` 欄にプログラム名を入力し、Private Key を入力します。`Estimate Fee` を押すとデプロイコストの見積もりを確認できます。準備ができたら `Deploy` をクリックしてください。

<img src={require('./images/deploy.png').default} width="400"/>

`Deploy` を押すと、Leo Playground が `Deployment Transaction`（デプロイトランザクション）を生成し、Aleo ネットワークに送信します。このプロセスには数秒〜数分かかる場合があります。完了するとトランザクション ID が表示されるので、控えておきましょう。

:::tip
Leo Playground の Query ウィジェットにトランザクション ID を貼り付けると、デプロイトランザクションの進捗をリアルタイムで確認できます。
:::

## 4. 公開関数と秘匿関数を実行する

デプロイしたトークンプログラムの関数を実行してみましょう。

:::tip
十分なクレジットがなくてデプロイできなかった場合は、[`token_quickstart.aleo`](https://play.leo-lang.org/?gistId=b6730338a24169308348d5e38243665d&revision=3339199a4ac60976dc5ce6c0c35c5eefb0488ee0) を利用するとトークンプログラムのメソッドをテストできます。
:::

### 4.1 実行トランザクションを構築する

プログラムの関数を呼び出すと、そのロジックはローカルで実行され、ゼロ知識証明が生成されます。この証明は、入力や出力を秘匿したまま処理が正しく行われたことを示すものです。関数の実行後、実行結果の概要と証明を含む Execution Transaction が Aleo ネットワークに送信されます。ネットワークバリデータが証明を検証し、適切な手数料が支払われていると確認できれば、トランザクションは受理されます。

### 4.2 秘匿トークンをミントする

ここでは `mint_private` 関数を使って秘匿トークンをミントします。この関数は新しい Aleo `Record` を作成します。Record は暗号化されたデータ構造で、所有者のみが View Key を使って復号できます。そのため、トークンの内容は所有者以外には明らかになりません。

Leo Playground の Execute ウィジェットを開き、Program ID タブにプログラム名を入力します。デプロイしたプログラムがない場合は、`token_quickstart.aleo` を利用しても構いません。

:::tip
虫眼鏡アイコンを押すと、Program ID がデプロイ済みのプログラムか確認できます。
:::

<img src={require('./images/execute.png').default} width="400"/>

次に Private Key を入力し、Function ドロップダウンから `mint_private` を選択します。Inputs タブにはアカウントアドレスと `u64` 整数を入力します。

```
["ALEO_ADDRESS_HERE", "50u64"]
```

`Estimate Fee` をクリックしたあと `Execute` を押してください。デプロイトランザクションと同様に、トランザクション ID をコピーしてブロックエクスプローラーで確認すると、次のような表示が得られます。

<img src={require('./images/mint_private.png').default} width="1000"/>

:::info
このトランザクションの出力は Record です。Record を復号するには、トランザクションの暗号文をコピーし、Leo Playground の Records ウィジェットで Record の暗号文と対応する View Key を入力して `Decrypt` をクリックします。復号結果は次のようになります。
```
{
  owner: aleo1kypwp5m7qtk9mwazgcpg0tq8aal23mnrvwfvug65qgcg9xvsrqgspyjm6n.private,
  amount: 50u64.private,
  _nonce: 3175255370513411091535466147458245312227668453916963245036391157478647265587group.public
}
```
Record の詳細については [こちら](../../concepts/fundamentals/02_records.md) を参照してください。
:::

### 4.3 公開トークンをミントする

Token プログラムでは、公開残高はプログラムのマッピングに保存されます。マッピングは Aleo ネットワーク上の公開キーバリューストアで、長期的な公開状態をオンチェーンに保持します。

ここでは `mint_public` 関数を使って公開トークンをミントします。実行すると、指定した Aleo `address` に対応する `account` マッピングの残高が更新されます。

Execute ウィジェットに戻り、先ほどと同じ手順で `mint_public` を実行します。ブロックエクスプローラーでは次のようなトランザクション概要が表示されます。

<img src={require('./images/mint_public.png').default} width="1000"/>

`mint_private` と異なり、`mint_public` 関数は Record ではなく `Future` を含む実行トランザクションを生成します。`Future` はマッピングを読み書きするオンチェーン命令の集合です。`mint_public` の実行が有効だと検証されると、バリデータは `mint_public` の `Future` に含まれる命令を実行し、`account` マッピングを更新します。

マッピングの値はクエリウィジェットの `Get Mapping Value By Key` で確認できます。Program ID、マッピング名、マッピングキーを順に入力してください。Token プログラムではマッピングキーとして公開トークンを保有する Aleo アドレスを指定します。

<img src={require('./images/quickstart_mapping.png').default} width="400"/>

:::info
お疲れさまでした！ これで Leo プログラムのデプロイと、テストネットでのトランザクション実行を完了しました 🎉
:::

ローカル開発を始める場合は、必要なツールをセットアップするために [インストールガイド](./02_installation.md) を参照してください。
