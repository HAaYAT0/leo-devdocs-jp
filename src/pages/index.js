import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

import AleoProtocolImg from '@site/static/img/aleo-protocol.png';
import ZeroKnowledgeImg from '@site/static/img/zero_knowledge-applications.png';
import LeoLanguageImg from '@site/static/img/leo-programming-language.png';
import FullStackImg from '@site/static/img/full-stuck-developer-resources.png';
import AleoBftImg from '@site/static/img/aleobft-consensus.png';
import ContributeImg from '@site/static/img/contribute-to-aleo.png';

const FEATURE_BLOCKS = [
  {
    title: 'Aleo Protocol',
    description: 'Aleoの詳細',
    image: AleoProtocolImg,
    alt: 'Aleo protocol overview illustration',
    links: [
      {label: 'Aleoとは？', to: '/docs/concepts/network/core_architecture'},
      {label: 'Aleo Virtual Machine', to: '/docs/concepts/advanced/overview'},
      {label: '公開 vs 秘匿状態', to: '/docs/concepts/fundamentals/public_private'},
      {label: 'Aleoでのスマートコントラクト', to: '/docs/concepts/fundamentals/programs'},
    ],
  },
  {
    title: 'ゼロ知識を用いたアプリケーション',
    description: 'Aleo上でのプライバシーを保護するアプリケーションの構築',
    image: ZeroKnowledgeImg,
    alt: 'Zero knowledge application diagram',
    links: [
      {label: '開発を始める', to: '/docs/guides/introduction/getting_started'},
      {label: 'クイックスタート', to: '/docs/guides/introduction/quick_start'},
      {label: 'Leoアプリを作成する', to: '/docs/sdk/create-leo-app/tutorial'},
      {label: 'Provable SDK、JS/TS library', to: '/docs/sdk/overview'},
    ],
  },
  {
    title: 'Leo言語',
    description: 'Aleoの開発言語であるLeoの詳細',
    image: LeoLanguageImg,
    alt: 'Leo language logo',
    links: [
      {label: 'Leo言語のドキュメント', href: 'https://leo-docs-jp.vercel.app/'},
      {label: 'Leoプログラムの構成', href: 'https://leo-docs-jp.vercel.app/docs/language/layout'},
      {label: 'Leoコマンドライン', href: 'https://leo-docs-jp.vercel.app/docs/cli_overview'},
      {label: 'Leo Playground', href: 'https://play.leo-lang.org/'},
    ],
  },
  {
    title: 'フルスタック開発のためのリソース',
    description: 'ツールやガイド',
    image: FullStackImg,
    alt: 'Full stack developer resources illustration',
    links: [
      {label: 'Provable SDK', to: '/docs/sdk/overview'},
      {label: 'API エンドポイント', to: '/docs/apis-old/public_api'},
      {label: 'プログラムのアップデート機能', to: '/docs/guides/program_upgradability'},
      {label: 'Awesome Aleo', href: 'https://github.com/howardwu/awesome-aleo'},
    ],
  },
  {
    title: 'AleoBFT コンセンサス',
    description: 'Aleoのピザンチン・フォールト・トレランス(BFT)コンセンサスメカニズムの詳細',
    image: AleoBftImg,
    alt: 'AleoBFT consensus visualization',
    links: [
      {label: 'AleoBFTの概要', to: '/docs/concepts/network/consensus'},
      {label: 'バリデーター', to: '/docs/concepts/network/validators'},
      {label: 'ステーキング', to: '/docs/concepts/network/staking'},
      {label: '証明者 (provers)', to: '/docs/concepts/network/provers'},
    ],
  },
  {
    title: 'Aleoに貢献するには？',
    description: 'Aleoのコミュニティに参加しプライバシーが保護された未来を一緒に作りましょう',
    image: ContributeImg,
    alt: 'Contribute to Aleo community illustration',
    links: [
      {label: 'ガイドライン', to: '/docs/guides/contribute/contribution_guidelines'},
      {label: 'ドキュメント作成および改善', to: '/docs/guides/contribute/documentation_contribute'},
      {label: 'SnarkOSへの貢献', to: '/docs/guides/contribute/snarkos_contribute'},
      {label: 'SnarkVMへの貢献', to: '/docs/guides/contribute/snarkvm_contribute'},
    ],
  },
];

function ResourceCard({title, description, image, alt, links}) {
  return (
    <div className={styles.resourceCard}>
      <div className={styles.resourceImageFrame}>
        <img src={image} alt={alt} className={styles.resourceImage} />
      </div>
      <div className={styles.resourceBody}>
        <h3 className={styles.resourceTitle}>{title}</h3>
        <p className={styles.resourceDescription}>{description}</p>
        <ul className={styles.resourceLinks}>
          {links.map(link => {
            if (link.href) {
              return (
                <li key={link.label}>
                  <a
                    className={styles.resourceLink}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              );
            }

            return (
              <li key={link.label}>
                <Link className={styles.resourceLink} to={link.to}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Leo 開発者ドキュメント"
      description="Aleo と Leo での開発を支援する日本語ドキュメント">
      <header className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Aleoの開発ドキュメント</h1>
            <Link className={`button button--lg ${styles.heroButton}`} to="/docs/guides">
              開発を始める
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.cardsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>トピック別ガイド</h2>
              <p>目的に合わせて必要なリファレンスへ最短でアクセスできます。</p>
            </div>
            <div className={styles.cardsGrid}>
              {FEATURE_BLOCKS.map(block => (
                <ResourceCard key={block.title} {...block} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
