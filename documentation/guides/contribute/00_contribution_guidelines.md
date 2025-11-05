---
id: contribution_guidelines
title: ようこそ
sidebar_label: 貢献ガイドライン
---
## 貢献ガイドライン
この開発者ドキュメントへようこそ。Aleo はオープンソースと分散化の理念を掲げており、コミュニティからの貢献を幅広く歓迎しています。新しいトピックやコンテンツの提案、例の追加など、あらゆる形での貢献がドキュメントの明確さと有用性を高める助けになります。

## はじめに
Aleo は完全なオープンソースで、分散型かつプライバシーを重視した Layer 1 ブロックチェーンです。開発者はプライバシー機能を備えたアプリケーションを作成でき、ゼロ知識証明によってセンシティブなデータを秘匿したまま検証を可能にします。高いスケーラビリティと制限の少ない実行環境を備えているため、大規模なアプリケーションを支援しつつ、従来のブロックチェーンにありがちな制約を解消できます。プライバシー、スケーラビリティ、柔軟性を兼ね備えた Aleo は、次世代のプライバシー指向な分散型アプリケーションに最適なプラットフォームです。

詳細は [Concepts](../../concepts/fundamentals/00_accounts.md) セクションで Aleo のアーキテクチャと機能を参照してください。

## エコシステムをさらに良くするには
### ARC を提案する
開発標準やプロトコル改善のアイデアがありますか？ 以下の手順に従って Aleo Request for Comments (ARC) を提案してください。

新しい ARC を作成する場合:
1. 提案内容を記載した [GitHub ディスカッション](https://github.com/AleoHQ/ARCs/discussions/categories/arcs) を作成し、テンプレート [ARC-0000](https://github.com/ProvableHQ/ARCs/tree/master/arc-0000) と未使用の ARC 番号を利用します。
2. 提案内容を新しいサブディレクトリとして追加し、[Pull Request](https://github.com/AleoHQ/ARCs/pulls) を送信します。

既存 ARC を更新する場合:
1. 変更を含む Pull Request を送信します。
2. 変更が大きい場合は、新しい ARC の作成を依頼されることがあります。

#### ARC の進行状況

ARC は「Draft（草案）」から始まり、次のステージを辿ります。

提案が公開されると:
1. コミュニティが提案を議論・レビューします。メンテナーが進捗を監視し、準備が整ったらステータスを「Active」に変更します。
    * 投票数やプロトタイプの有無によって優先順位が付けられます。
    * コミュニティコールで議論する場合があり、提案者は参加して意見を述べられます。
    * ここまでは、提案者が提案を取り下げたり、長期間活動がない場合はメンテナーが取り下げたりできます。
2. ガバナーまたは Aleo Network Foundation (ANF) のチームメンバーが Aleo ガバナンス (https://vote.aleo.org/) に正式な提案を作成し、投票を開始します。
3. コミュニティが提案の採否を投票で決定します。
4. 提案が承認されるとステータスは「Accepted」に更新され、関連する Pull Request が ARCs リポジトリにマージされます。否決された場合はステータスが「Draft」に戻ります。
5. 関係者が実装を完了させます。必要に応じて、新しい Pull Request を通じて ARC を更新できます（投票は不要です）。
6. 実装が完了したら、提案の性質に応じてステータスが「Final」または「Living」に変更され、関連するディスカッションがクローズされます。

より新しい提案に置き換えられた場合は「Deprecated」に変更されることがあります。

#### ステータス

ステータスの詳細は [ARC-0001](https://github.com/ProvableHQ/ARCs/tree/master/arc-0001) を参照してください。

### Aleo へ貢献する
Aleo を構成するすべてのコンポーネントはオープンソースであり、[このドキュメント](./01_documentation_contribute.md) を含めあらゆる形の貢献を歓迎しています。各コンポーネントには個別のガイドラインが用意されているので、以下を参照してください。  
- [DevDocs](./01_documentation_contribute.md) - 本ドキュメント  
- [Leo](https://github.com/ProvableHQ/leo-docs-source) - Aleo 向けプログラムを記述する Rust 製 DSL  
- [Provable SDK](https://github.com/ProvableHQ/sdk/tree/mainnet/sdk) - ゼロ知識アプリを構築するための JavaScript/TypeScript ツール  
- [Create-leo-app](https://github.com/ProvableHQ/sdk/tree/mainnet/create-leo-app) - Aleo プロジェクトのひな形生成ツール  
- [Aleo Instruction](../aleo/00_aleo_overview.md) - Leo 言語がコンパイルされる中間表現  
- [SnarkOS](./02_snarkos_contribute.md) - Aleo のブロックチェーンノード（オペレーティングシステム）  
- [SnarkVM](./03_snarkvm_contribute.md) - 検証可能な計算を実行する仮想マシン  
