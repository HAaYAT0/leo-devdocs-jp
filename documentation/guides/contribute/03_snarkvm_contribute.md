---
id: snarkvm_contribute
title: SnarkVM への貢献
sidebar_label: SnarkVM への貢献
---
このガイドでは、snarkVM を更新し、その変更を Aleo ネットワークに反映させるまでの手順を説明します。

## ブランチの概要
[**staging ブランチ**](https://github.com/AleoNet/snarkVM)
- mainnet ブランチに昇格させる前に、変更を統合し初期テストを行うステージング環境です。

[**mainnet ブランチ**](https://github.com/AleoNet/snarkVM/tree/mainnet)
- 安定性が確認された変更のみをマージする本番ブランチです。検証済みの変更を staging から直接ミラーし、プロダクションリリースの作成に利用します。

## snarkVM Pull Request (PR) が与える影響
- snarkVM の staging に新しい PR がマージされると、snarkOS の依存関係も更新する必要があります。そのためには snarkOS 向けに別の PR を作成し、snarkOS 貢献ガイドで定められたチェックをすべて通過させます。
- 場合によっては、snarkOS のコンパイルを成功させるために snarkOS 側に「姉妹 PR」が必要になることがあります。PR の README に "sister PR" という記載がないか必ず確認してください。

## snarkVM PR のレビューとマージ手順
**1. snarkVM PR をレビューする**  
PR のステータスやコメントを確認しながら、内容を丁寧にレビューします。  

**2. snarkVM PR の CI を実行する**  
レビューした PR で CI（継続的インテグレーション）を実行し、問題がないか検証します。  

**3. snarkVM ブランチをチェックアウトしてプッシュする**  
対象の snarkVM ブランチをチェックアウトし、リポジトリへプッシュします。  

**4. snarkVM PR をマージする**  
レビューと CI が完了したら、snarkVM の PR をマージします。  

## ジェネシスブロックとパラメータの再生成
- ジェネシスブロックとパラメータの再生成:
  - パラメータの再生成とアップロードが必要か判断するには、`snarkVM/parameters/scripts/` 配下のスクリプトを実行します。
  - スクリプト実行後に `git status` を実行してください。差分がなければ新しいアップロードは不要です。
  - 初めてパラメータ CDN を利用する場合は `.usrs` ファイルもアップロードしてください。これらは固定のファイルで `git diff` には表示されませんが、CDN には必ず存在している必要があります。
  - 必要に応じて snarkup ツールを使い、ジェネシスブロックを再サンプリングします。

## snarkOS を最新の snarkVM コミットに更新する
- snarkOS の PR を作成する:
  - snarkOS の `Cargo.toml` と `Cargo.lock` を更新し、最新の snarkVM コミットハッシュを参照するようにします。
  - 適切に統合するため、snarkOS 貢献ガイドで説明されている手順に従ってください。
