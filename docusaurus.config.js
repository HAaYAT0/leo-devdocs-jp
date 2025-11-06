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

  themes: ['docusaurus-theme-openapi-docs'],

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
          sidebarId: 'conceptsSidebar',
          docId: 'concepts/concepts_overview',
          label: 'コンセプト',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          docId: 'guides/introduction/getting_started',
          label: 'ガイド',
          position: 'left',
        },
        {
          href: 'https://leo-docs-jp.vercel.app/',
          label: 'Leo言語',
          position: 'left',
        },
        {
          href: 'https://play.leo-lang.org/',
          label: 'Leo Playground',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sdkSidebar',
          docId: 'sdk/sdk_overview_hub',
          label: 'SDK',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apisSidebar',
          docId: 'apis/api_overview',
          label: 'APIエンドポイント',
          position: 'left',
        },
        {
          href: 'https://developer.aleo.org',
          label: 'Aleo.org',
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
          title: 'コミュニティ',
          items: [
            {
              label: 'Aleo Discord',
              href: 'https://discord.com/invite/aleo',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@aleofoundation',
            },
            {
              label: 'Aleo日本語コミュニティ',
              href: 'https://x.com/Aleo_Japan',
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
              label: '開発ドキュメント(英語)',
              href: 'https://developer.aleo.org/',
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
