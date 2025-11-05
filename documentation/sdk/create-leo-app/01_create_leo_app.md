---
id: tutorial
title: Create Leo App - React + JS + Leo チュートリアル
sidebar_label: React + JS + Leo チュートリアル
---

<a href="https://www.npmjs.com/package/create-leo-app"> <img alt="Create Leo App" src="https://img.shields.io/npm/l/create-leo-app?label=NPM%20-%20Create-Leo-App&labelColor=green&color=blue" /></a>


## 1. インストール

React + JavaScript + Leo テンプレートのセットアップ手順は、[インストールページ](00_app_installation.md)をご覧ください。

## 2. ナビゲーション

インストールしたばかりのプロジェクトに移動します。

```bash
cd aleo-project
npm install
npm run install-leo
npm run dev
```

<!-- markdown-link-check-disable -->
これで必要なモジュールに加えて、プライベートアプリケーション開発用に設計された静的型付き言語である Leo もインストールされます。最後に、React アプリケーションが http://localhost:5173 でローカル起動します。
<!-- markdown-link-check-enable -->
`src/App.jsx` には React アプリケーションの主要なコンポーネントが含まれています。

`helloworld` フォルダーが Leo プログラムで、Leo を編集・利用する場所です。

`src/workers/worker.js` は Leo プログラムのデプロイと実行に使用する WebAssembly (WASM) モジュールを初期化します。

## 3. `helloworld.aleo` を実行する

<!-- markdown-link-check-disable -->
http://localhost:5173 にアクセスし、ブラウザのデベロッパーコンソールを開きます
<!-- markdown-link-check-enable -->


「execute helloworld.aleo」ボタンをクリックします。

処理はローカルで実行され、結果がコンソールに表示されます。

![execution-console](./images/execution-console.png)

![execution-success](./images/execution-success.png)

## 4. プログラムをデプロイする

`helloworld` プログラムをデプロイしてみましょう。デプロイには Aleo クレジットを保有するアカウントが必要です。

### アカウントの生成

```bash
leo account new 
```

表示された秘密鍵、ビューキー、公開アドレスを安全な場所に控えてください。秘密鍵とビューキーは決して他人と共有してはいけない鍵として扱いましょう。

### ファウセット

アカウントを作成したら、公式ファウセットで Aleo クレジットを受け取りましょう。

https://faucet.aleo.org/

### Leo と `helloworld`

このままデプロイしようとすると、`helloworld` は既にデプロイ済みのため失敗します。プログラム名を変えるだけでも対処できますが、ここでは Leo を使って新しいプログラムを作成・ビルドしましょう。

```bash
leo new helloworld_[randomsuffix]
cd helloworld_[randomsuffix]
```

新しい `helloworld` プロジェクトを生成したら、既存の `helloworld` フォルダーは削除して構いません。

React アプリはエラーを表示します。React アプリケーションのルートディレクトリに移動して `App.jsx` を開き、5 行目のフォルダー名 `helloworld` を新しい Leo プロジェクト名に変更してエラーを解消します。

```bash
import helloworld_program from "../helloworld_[randomsuffix]/build/main.aleo?raw";
```

さらに進めましょう。Leo プロジェクトに戻り、新しい Aleo プロジェクトの `.env` に秘密鍵を追加します。サンプルの秘密鍵を先ほど控えたものに置き換えてください。

```bash
NETWORK=testnet
PRIVATE_KEY=APrivateKey1zkp2FCZZ7ucNVx5hoofizpq18mvCZNKTpqKMTt1wTahmxSf
```

設定が完了したら、新しい Leo プロジェクトのルートディレクトリで開発中の Leo プログラムをローカル実行できます。

```bash
leo run  ## Leo を Aleo Instructions にコンパイルし、入力値を使ってプログラムの関数を実行します

leo execute  ## Leo を Aleo Instructions にコンパイルし、入力値でプログラムを実行して回路を合成し、証明鍵と検証鍵を生成します

leo help  ## 各コマンドのヘルプを表示します
```

実行してターミナルに出力される結果を確認してみてください。

```bash
leo run main 1u32 2u32
leo execute main 1u32 2u32
```

それではデプロイに戻りましょう。

プログラムをデプロイするときは、ファウセットで取得した手数料がデプロイ費用として利用されます。`App.jsx` を見るとデプロイ開始時に Web ワーカーが呼び出されています。さらに `src/workers/worker.js` を確認すると、ブラウザで効率的に計算できるよう WASM が初期化され、プログラムマネージャーには Aleo プログラムを作成・デプロイし、対話するためのメソッドが揃っていることが分かります。

「Deploy」ボタンを押しましょう。

![deployment-console](./images/deployment-console.png)

![deployment-success](./images/deployment-success.png)

これで Aleo プログラムのデプロイに成功し、分散型のプライベートアプリケーションを構築できるようになりました！

### Leo アプリケーションを GitHub に公開する

1. プロジェクトのディレクトリに移動し、初期化してコミットします。

```bash
cd aleo-project
git init -b main
git add .
git commit -m "first commit, new aleo app"
```

2. [github.com](https://github.com/new) の右上にある「New repository」から新しいリポジトリを作成します。リポジトリは公開に設定し、README・ライセンス・.gitignore は後から追加して構いません。

3. 新しいリポジトリ ページ上部のリモート URL をコピーし、ターミナルでローカルプロジェクトにリモートを追加します。

![ ](https://docs.github.com/assets/cb-48149/mw-1440/images/help/repository/copy-remote-repository-url-quick-setup.webp)

```bash
git remote add origin <REMOTE_URL>
git remote -v
git push -u origin main
```

## まとめと追加リソース

1. Leo を同梱した React テンプレートを提供しました。

2. [Leo](https://docs.leo-lang.org/getting_started/installation) もインストールしました。Leo はプライベートアプリケーションのために設計された静的型付き言語で、ローカルで Leo プログラムの記述・ビルド・コンパイル・実行ができます。

3. 事前に Aleo Instructions へコンパイル済みの `helloworld` Leo プログラムを用意し、WASM と Web ワーカーを使ってローカル実行しました。これは snarkVM の機能を抽象化したものです。[snarkVM](https://developer.aleo.org/concepts/network/zkcloud/snarkvm) はデータ実行レイヤーで、Leo プログラムをコンパイルしてオフチェーンで実行します。snarkVM の実行フェーズでは、すべての Leo プログラムが最終的に Aleo のコンパイラを通じて Aleo Instructions に変換されます。

4. 同様に、WASM と Web ワーカーによる抽象化レイヤーを使って `helloworld` プログラムをデプロイしましたが、[snarkOS](https://developer.aleo.org/concepts/network/zkcloud/snarkos)（データアベイラビリティレイヤー、すなわちブロックチェーン／分散型台帳）を利用してオンチェーンでデプロイすることもできます。

5. チュートリアルでは [provable.tools](https://provable.tools) を開きました。これは SDK のグラフィカルインターフェースで、snarkOS と snarkVM を抽象化しています。provable.tools 上でもコンパイル、実行、デプロイといった操作を行えます。


6. React テンプレート全体と WASM / Web ワーカーも、snarkOS と snarkVM を抽象化したレイヤーと考えることができます。
