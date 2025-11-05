---
id: documentation_contribute
title: DevDocs への貢献
sidebar_label: DevDocs への貢献
---

Aleo DevDocs への貢献ガイドへようこそ。ドキュメントをより充実させ、最新の情報を提供できるよう、皆さんの協力をお待ちしています。小さな修正でも大きな追記でも、開発者向けエコシステムの改善に役立つ大切な貢献です。このガイドでは、効果的にドキュメントへ貢献する方法を紹介します。

## フィードバックの提供

問題点を見つけたけれど修正する時間がない、あるいは改善案だけ共有したい場合は、GitHub Issues を通じてフィードバックを送ってください。

1. welcome リポジトリの [Issues](https://github.com/AleoNet/welcome/issues) ページを開きます。
2. 「New Issue」をクリックします。
3. 利用可能なテンプレートがあれば選択し、なければ空の Issue から始めます。
4. 内容を簡潔に表すタイトルを入力します。
5. 説明欄には次の情報を含めてください。
   - バグや誤り: 想定した結果と実際の結果、再現手順があれば記載します。
   - 改善提案: アイデアの概要と、ドキュメントがどのように良くなるかを説明します。
   - 参考になるスクリーンショットやコードスニペットがあれば添付します。
6. 「documentation」「enhancement」「bug」など適切なラベルを追加します。
7. Issue を送信します。

フィードバックは改善すべき領域を把握する助けとなり、ドキュメントをあらゆる利用者にとって有用なものに保つことにつながります。

## 作業を始める

1. GitHub で [welcome](https://github.com/AleoNet/welcome) リポジトリをフォークします。
2. フォークしたリポジトリをローカルにクローンします。
   ```
   git clone https://github.com/YOUR-USERNAME/welcome.git
   ```
3. プロジェクトディレクトリに移動します。
   ```
   cd welcome
   ```
4. ドキュメントを編集するため、documentation ディレクトリに移動します。
   ```
   cd documentation
   ```

## 変更を加える

1. 作業用の新しいブランチを作成します。
   ```
   git checkout -b your-feature-branch
   ```
2. Markdown 形式のドキュメントを編集します。
3. 変更内容を説明するメッセージを添えてコミットします。
   ```
   git commit -am "Add description of your changes"
   ```

## 変更を提出する

1. フォークしたリポジトリに変更をプッシュします。
   ```
   git push origin your-feature-branch
   ```
2. GitHub の [welcome](https://github.com/AleoNet/welcome) リポジトリで `your-feature-branch` から新しい Pull Request を作成します。
3. 変更内容が伝わるタイトルと説明を記入します。
4. Pull Request を送信してレビューを受けます。

## ガイドライン

- 文章は簡潔でわかりやすく、既存の文体に合わせてください。
- 見出しやコードブロックなど、Markdown の書式を適切に使用してください。
- 新しいページを追加する場合は、サイドバー設定を忘れずに更新してください。
- 必要に応じて図や画像を追加し、概念を視覚的に説明してください。
- すべてのリンクが正しく機能するか確認してください。

## サポートが必要なときは

質問がある場合や助けが必要な場合は、[welcome](https://github.com/AleoNet/welcome) リポジトリに Issue を作成するか、メンテナーに連絡してください。

Aleo ドキュメントへの貢献に感謝します！
