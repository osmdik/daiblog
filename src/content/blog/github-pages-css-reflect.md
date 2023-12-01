---
title: "【GitHub】GitHub PagesでCSSが反映されないときはパスを変えるべし"
description: "この記事では、GitHubにアップロードしてページをGitHub Pagesに公開したページにCSSが反映されていないという時の対処法を紹介します。結論、パスを変えることで解消されますが、詳しくは記事をご覧ください。"
pubDate: 2021-10-28
tags: ["CSS", "GitHub"]
---

この記事では、GitHub にアップロードしてページを GitHub Pages に公開したページに CSS が反映されないという時の対処法を紹介します。

先日、Webサイトを作り保有しているレンタルサーバーにアップロードしたところ、作ったものをそのままアップロードしてうまく表示されました。

しかし GitHub にアップロードして公開したものは、CSS が反映されず、うまく表示されなかったので、対処法を備忘録として残します。

## **GitHub Pages で CSS が反映されないときはパスを変えるべし**

結論、HTML で読み込んでいた CSS のパスを変えることでうまく表示されました。

もともと、以下の一般的な方法で CSS を読み込んでいました。

```html
<link rel="stylesheet" href="css/style.css" />
```

この状態でもレンタルサーバーアップロード時は問題なく表示されます。

GitHub にアップロードし公開するためには、以下のようにパスを変更する必要があります。

```html
<link rel="stylesheet" href="https://daiki-oshima.github.io/2021-dopf/css/style.css" />
```

今回は、僕の GitHub アカウントのユーザー名「daiki-oshima」に作成したリポジトリ「2021-dopf」以下に CSS フォルダを配置しているので上記にようになります。

つまり、link の href 属性のパスを`https://GitHubアカウントのユーザー名.github.io/リポジトリ名/CSSファイル`とすれば正常に読み込まれるようになります。

## フォントの読み込みもパスを変更

CSS ファイルの読み込みと同様に、ローカルで読み込んでいたフォントも GitHub にアップロードし公開してもうまく反映されませんでした。

ローカルでの構築時の内容が以下です。

```scss
@font-face {
font-family: 'JosefinSans';
src: url("fonts/josefin-sans-v17-latin-300.woff");
}
```

SCSS で＠font-face を用いて読み込みに記述していたパスを前述と同様の変更を加えると正常に読み込まれます。

```scss
@font-face {
font-family: 'JosefinSans';
src: url("https://daiki-oshima.github.io/2021-dopf/fonts/josefin-sans-v17-latin-300.woff");
}
```

サーバーへアップロードして公開した場合は問題なく読み込まれ反映され、GitHub へアップロードし公開した場合は、パスの変更が必要というのは面白い発見でした。

今後も自分で作成したサイトやらサービスを公開していく予定なので、GitHub 使用時の注意点や、効率的で効果的な活用方法など学んでいこうと思います。

以上、『【GitHub】GitHub Pages で CSS が反映されないときはパスを変えるべし』でした。
