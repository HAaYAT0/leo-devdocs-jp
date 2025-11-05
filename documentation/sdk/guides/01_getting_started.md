---
id: getting_started
title: はじめに
sidebar_label: はじめに
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## インストール

<Tabs defaultValue="npm"
values={[
  { label: 'NPM', value: 'npm' },
  { label: 'Yarn', value: 'yarn' },
  { label: 'Build From Source', value: 'source' },
]}>
<TabItem value="npm">
```
npm install @provablehq/sdk
```
</TabItem>
<TabItem value="yarn">
```
yarn add @provablehq/sdk
```
</TabItem>
<TabItem value="source">
1. [SDK リポジトリ](https://github.com/ProvableHQ/sdk) をクローンします
2. `sdk/` ディレクトリに移動し、次のコマンドを実行します:
```
yarn build:all
```
</TabItem>
</Tabs>



## 設定

### ES Modules との互換性を確認する
プロジェクトの `package.json` に、次の行が `scripts` の前に追加されていることを確認します。

```json
  "type": "module",
```

### トップレベル await
トップレベル await は、async 関数の外側でも await キーワードを使用できる機能です。Provable SDK を正しく動作させるために必要です。

webpack を使用する場合は、`webpack.config.js` で以下のオプションを設定します。
```typescript
experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true,
},
```

### フレームワーク固有の設定
npm パッケージ [create-leo-app](https://www.npmjs.com/package/create-leo-app) には、React、Next.js、Node などの人気フレームワークでゼロ知識アプリを構築するためのテンプレートが用意されています。これらのテンプレートの設定を参考にすると、プロジェクトの設定方法のヒントが得られます。

:::note
フレームワークとして `Node.js` を使用する場合、Provable SDK を動かすには最低でも `Node.js` バージョン 20 が必要で、可能であれば 22 以上を推奨します。
:::



## ネットワークの選択
Provable SDK には Mainnet と Testnet の両方とやり取りするためのモジュールが含まれています。Mainnet と Testnet は互換性が **ない** ため、必ず使用するネットワークを明示的に選択してください。Mainnet 向けに作成したトランザクションは Testnet では無効であり、その逆も同様です。

ネットワークを選択するには、次のインポート構文を使用します。

#### Mainnet
```typescript
import { ... } from '@provablehq/sdk/mainnet.js';
```
#### Testnet
```typescript
import { ... } from '@provablehq/sdk/testnet.js';
```

ネットワークを明示的に指定しない場合、SDK は Testnet を既定として使用します。

## WebAssembly の初期化
SDK をインポートすると、デフォルトでは単一スレッドの WebAssembly が有効になります。ただし、処理性能が大幅に向上し、重い計算がメインスレッドをブロックする可能性を排除できるため、マルチスレッド版を有効にすることを推奨します。

アプリケーションの冒頭で `initThreadPool()` 関数を呼び出すと、マルチスレッド WebAssembly が有効になります。これにより複数の WebWorker スレッドが起動し、それぞれが WebAssembly のインスタンスとメモリへアクセスできるようになります。

**この関数は 1 度だけ呼び出せばよく、他の SDK 関数よりも前に呼び出してください。**

```typescript
import { initThreadPool } from '@provablehq/sdk/mainnet.js';

// マルチスレッドを有効化
await initThreadPool();

// 以降にアプリケーションのロジックを記述
```




<!--

## Zero Knowledge Web App Examples

### Create Leo App
A set of fully functional examples of zero knowledge web apps can be found in
[create-leo-app](https://github.com/ProvableHQ/sdk/tree/testnet3/create-leo-app ). Create-leo-app provides several web-app
templates in common web frameworks such as React that can be used as a starting point for building zero knowledge web apps.

Developers can get started immediately with create-react-app by running:
`npm create leo-app@latest`

### Provable Tools

Additionally, the SDK powers [provable.tools](https://provable.tools) - a React app that provides a graphical interface for most
of the functionality provided by the SDK and can be used as a reference for usage of the SDK. Source code for provable.tools
can be found [in the SDK repo here](https://github.com/provablehq/sdk/tree/testnet3/website) -->