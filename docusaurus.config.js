// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Leo 開発者ドキュメント',
  tagline: 'Aleo向けLeo開発者のためのリファレンス',
  favicon: 'img/tab.png',

  url: 'https://example.com',
  baseUrl: '/',

  organizationName: 'HAaYAT0',
  projectName: 'leo-devdocs-jp',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'documentation',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/HAaYAT0/leo-devdocs-jp/edit/master/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        pages: {
          path: 'src/pages',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
      disableSwitch: true,
    },
    navbar: {
      title: 'Leo 開発者ドキュメント',
      logo: {
        alt: 'Leo ロゴ',
        src: 'img/icon.png',
        srcDark: 'img/icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'ドキュメント',
        },
        {
          href: 'https://developer.aleo.org',
          label: 'Aleo Developer',
          position: 'right',
        },
        {
          href: 'https://github.com/HAaYAT0/leo-devdocs-jp',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'ガイド',
          items: [
            {
              label: 'API',
              to: '/docs/apis',
            },
            {
              label: '概念',
              to: '/docs/concepts',
            },
            {
              label: 'SDK',
              to: '/docs/sdk',
            },
          ],
        },
        {
          title: 'コミュニティ',
          items: [
            {
              label: 'Aleo Discord',
              href: 'https://discord.com/invite/aleo',
            },
            {
              label: 'Aleo Explorer',
              href: 'https://explorer.provable.com',
            },
            {
              label: 'Provable SDK',
              href: 'https://provable.tools/',
            },
          ],
        },
        {
          title: 'リポジトリ',
          items: [
            {
              label: 'Leo Compiler',
              href: 'https://github.com/ProvableHQ/leo',
            },
            {
              label: 'Dev Docs 原文',
              href: 'https://github.com/ProvableHQ/leo-devdocs',
            },
            {
              label: 'このリポジトリ',
              href: 'https://github.com/HAaYAT0/leo-devdocs-jp',
            },
          ],
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['rust', 'toml', 'bash'],
    },
  },
};

module.exports = config;
