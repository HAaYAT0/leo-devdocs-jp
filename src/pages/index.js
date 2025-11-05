import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const quickLinks = [
  {
    title: '概念を理解する',
    description: 'Aleo と Leo の基盤設計・ネットワーク仕組みを把握して、プライバシーファーストな dApp の土台を築きます。',
    href: '/docs/concepts',
    badge: 'Concepts',
  },
  {
    title: 'API & CLI リファレンス',
    description: 'REST API、CLI、エンドポイントの動作例を素早く参照。開発や検証で迷ったらここから。',
    href: '/docs/apis',
    badge: 'Reference',
  },
  {
    title: 'Leo チュートリアル',
    description: '言語仕様から実践的なトランジション、レコード操作まで。コードサンプルと共に習得しましょう。',
    href: '/docs/guides/aleo',
    badge: 'Guides',
  },
  {
    title: 'Provable SDK',
    description: 'Provable SDK のセットアップや各種メソッドを解説。ウォレット連携やトランザクション送信もカバーします。',
    href: '/docs/sdk',
    badge: 'SDK',
  },
];

const getStartedSteps = [
  {
    number: '01',
    title: '環境を整える',
    description:
      'CLI と Leo コンパイラをインストールし、アカウントと鍵管理の基本を押さえます。',
    href: '/docs/guides/aleo/01_installation',
  },
  {
    number: '02',
    title: '最初のプログラムをデプロイ',
    description:
      'hello_world から始めて、トランジションと記録のライフサイクルを体験しましょう。',
    href: '/docs/guides/aleo/02_hello',
  },
  {
    number: '03',
    title: 'Aleo Network と対話',
    description:
      'REST API や SDK を使い、実際のトランザクションをブロードキャストして結果を検証します。',
    href: '/docs/apis',
  },
];

const resourceHighlights = [
  {
    title: 'ネットワークアーキテクチャ',
    description: 'Aleo のコンセンサスと P2P ネットワークの構造、各ノードの役割を俯瞰できます。',
    href: '/docs/concepts/network/aleo-network',
  },
  {
    title: 'ゼロ知識証明の基礎',
    description: 'zkSNARK や R1CS、Varuna など Aleo で用いられる暗号技術を丁寧に解説しています。',
    href: '/docs/concepts/advanced/00_intro_to_zksnark',
  },
  {
    title: 'コミュニティリソース',
    description: 'フォーラムや Discord で最新動向をキャッチアップし、質問やフィードバックを共有しましょう。',
    href: 'https://discord.gg/aleo',
  },
];

function QuickLinkCard({title, description, href, badge}) {
  return (
    <Link className={styles.quickLinkCard} to={href}>
      <span className={styles.quickLinkBadge}>{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className={styles.quickLinkCta}>詳しく見る →</span>
    </Link>
  );
}

function StepCard({number, title, description, href}) {
  return (
    <Link className={styles.stepCard} to={href}>
      <span className={styles.stepNumber}>{number}</span>
      <div className={styles.stepBody}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className={styles.stepCta}>ガイドへ進む</span>
    </Link>
  );
}

function HighlightCard({title, description, href}) {
  return (
    <Link className={styles.highlightCard} to={href}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className={styles.highlightCta}>リソースを見る</span>
    </Link>
  );
}

export default function Home() {
  return (
    <Layout
      title="Leo 開発者ドキュメント"
      description="Leo と Aleo エコシステムで開発するための日本語リファレンス">
      <header className={clsx('hero', styles.heroBanner)}>
        <div className={clsx('container', styles.heroContainer)}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Build private applications on Aleo</span>
            <h1 className={styles.heroTitle}>Leo 開発者ドキュメント（日本語版）</h1>
            <p className={styles.heroSubtitle}>
              Aleo の公式 Developer Docs をもとに、ゼロ知識アプリケーション構築に必要な知識と手順を
              日本語で整理しました。プライバシーを守りながら Web3 を進化させましょう。
            </p>
            <div className={styles.heroButtons}>
              <Link className={clsx('button button--lg', styles.heroPrimary)} to="/docs/guides">
                開発を始める
              </Link>
              <Link className={clsx('button button--lg', styles.heroSecondary)} to="/docs/concepts">
                ドキュメントを閲覧
              </Link>
              <Link
                className={clsx('button button--lg', styles.heroGhost)}
                to="https://developer.aleo.org">
                英語版サイトへ
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>主要なドキュメントへ素早くアクセス</h2>
              <p>
                Aleo エコシステムでよく参照されるカテゴリーをカード形式でまとめています。目的に合わせて最短ルートでアクセスしてください。
              </p>
            </div>
            <div className={styles.quickLinksGrid}>
              {quickLinks.map(item => (
                <QuickLinkCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.splitLayout}>
              <div className={styles.splitContent}>
                <h2>Leo でプライベートアプリを構築する流れ</h2>
                <p>
                  Aleo ネットワークに対応したアプリケーション開発の道筋を 3 ステップで紹介します。実際に手を動かしながら学ぶことで、ゼロ知識証明の仕組みやワークフローが自然と身につきます。
                </p>
              </div>
              <div className={styles.stepsGrid}>
                {getStartedSteps.map(step => (
                  <StepCard key={step.number} {...step} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>学習を加速させるハイライト</h2>
              <p>
                最新情報や実践的なリソースをピックアップしました。アップデート情報をキャッチしながら、すぐに使えるテンプレートやコミュニティへアクセスできます。
              </p>
            </div>
            <div className={styles.highlightGrid}>
              {resourceHighlights.map(item => (
                <HighlightCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div>
                <h2>最新の Aleo ネットワーク動向をフォローしましょう</h2>
                <p>
                  コミュニティに参加して質問や知見を共有し、ロードマップやリリースサイクルを追跡しましょう。プライバシー指向の Web3
                  を一緒に前へ進めませんか？
                </p>
              </div>
              <div className={styles.ctaButtons}>
                <Link className={clsx('button button--lg', styles.ctaPrimary)} to="https://discord.gg/aleo">
                  Discord に参加
                </Link>
                <Link className={clsx('button button--lg', styles.ctaSecondary)} to="https://twitter.com/AleoHQ">
                  X (Twitter) でフォロー
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
