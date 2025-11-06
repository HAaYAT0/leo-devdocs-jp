---
id: getting_started
title: はじめに
sidebar_label: はじめに
---

import FeatureCard from '@site/src/components/FeatureCard/FeatureCard';

### Aleo で開発を始める

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1.5rem',
  width: '100%',
  margin: '2rem 0'
}}>

<FeatureCard
  title="🚀 クイックスタート"
  description="Leo プログラムを作成し、Aleo へデプロイしましょう。"
  link="/docs/guides/introduction/quick_start"
/>

<FeatureCard
  title="🦁 ローカル環境の構築"
  description="ローカル開発環境をセットアップします。"
  link="/docs/guides/introduction/installation"
/>

</div>

### プライベート Web アプリを作成する

ブラウザだけでプライベート Web アプリを開発・デプロイできるハンズオンチュートリアルを体験しましょう。

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1.5rem',
  width: '100%',
  margin: '2rem 0'
}}>

<FeatureCard
  title="プライベート Web アプリを作ろう"
  description="プライベートなフルスタックアプリを構築します。"
  link="https://github.com/ProvableHQ/zk-auction-example?tab=readme-ov-file#private-auctions-with-aleo"
/>

<FeatureCard
  title="Web でプライバシーを体験"
  description="プライバシー保護機能を備えた Web アプリを実際に試せます。"
  link="https://stackblitz.com/github/ProvableHQ/zk-auction-example"
/>

</div>

<div style={{
  width: '100%',
  margin: '2rem 0'
}}>
  <details style={{
    background: '#1a1f2e',
    borderRadius: '8px',
    border: '1px solid #2d3748',
    overflow: 'hidden'
  }}>
    <summary style={{
      padding: '1.25rem',
      color: '#e2e8f0',
      fontSize: '1.125rem',
      fontWeight: '600',
      listStyle: 'none',
      cursor: 'pointer',
    }}>
      プライベートアプリのデモ
    </summary>

    <div style={{ padding: '1.25rem', background: '#151922' }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src="https://player.vimeo.com/video/1080014879?h=b4e53cd085&badge=0&autopause=0&player_id=0&app_id=58479"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="ゼロ知識オークション"
        />
      </div>
    </div>
  </details>
</div>


## Aleo を学ぶ

Aleo でプライバシーを守る開発に必要な主要概念を学びましょう。

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1.5rem',
  width: '100%',
  margin: '2rem 0'
}}>

<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
  <FeatureCard
    title="アカウント"
    description="Aleo のアカウントとその仕組みを学びます。"
    link="/docs/concepts/fundamentals/accounts"
  />
  <FeatureCard
    title="送金"
    description="Aleo におけるプライベート送金の動作を理解します。"
    link="/docs/concepts/fundamentals/credits"
  />
  <FeatureCard
    title="手数料"
    description="取引手数料の仕組みと計算方法を学びます。"
    link="/docs/concepts/fundamentals/transaction_fees"
  />
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
  <FeatureCard
    title="プログラム"
    description="Aleo プログラムの作成とデプロイ方法を探究しましょう。"
    link="/docs/concepts/fundamentals/programs"
  />
  <FeatureCard
    title="トランザクション"
    description="Aleo トランザクションの構造とライフサイクルを理解します。"
    link="/docs/concepts/fundamentals/transactions"
  />
  <FeatureCard
    title="プログラム状態"
    description="Aleo でのプログラム状態の管理方法を学びます。"
    link="/docs/concepts/fundamentals/public_private"
  />
</div>

</div>

## 開発ツール

### Aleo プログラムを記述する

以下のツールを利用すると、Aleo ネットワーク向けのプライベートプログラムを作成できます。

<!-- markdown-link-check-disable -->
| 名称                                         | 説明                                                                                       |
|----------------------------------------------|:-------------------------------------------------------------------------------------------|
| [Aleo Instructions](/docs/guides/aleo/aleo)   | Aleo プロトコルがサポートする低レベルのアセンブリ言語で、Aleo プログラムを記述できます。     |
| [Leo](https://docs.leo-lang.org/leo)          | Aleo 上でプライベートプログラムを記述するための開発者向け言語です。                         |
| [Leo Playground](https://play.leo-lang.org/)  | Leo プログラムを記述・テストできる Web ベースの IDE です。                                 |
<!-- markdown-link-check-enable -->

### プライベートアプリケーションを構築するための SDK

以下の SDK を使うと、Aleo 上でプライベートな Web アプリやフルスタックアプリを構築できます。

| 言語            | SDK                                                                            | ユースケース                                   |
|-----------------|--------------------------------------------------------------------------------|-----------------------------------------------|
| Rust            | [snarkVM](https://github.com/ProvableHQ/snarkVM)                               | Rust 製の Aleo アプリ                          |
| TypeScript/Wasm | [Provable SDK](https://docs.explorer.provable.com/docs/sdk/92sd7hgph3ggt-overview) | Node.js 向け Aleo アプリとブラウザ拡張         |
| TypeScript      | [Puzzle SDK](https://docs.puzzle.online/)                                      | Aleo 向けブラウザ Dapp                         |
