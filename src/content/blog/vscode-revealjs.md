---
title: "VSCode×Reveal.jsでプレゼンテーションスライドを作成してみた。"
description: "この記事では、VSCodeでReveal.jsを用いてプレゼンテーションスライドを作る方法、作ってみた感想を紹介します。PowerPointやGoogleスライドの資料作成に飽きてきた方はぜひご覧ください。"
pubDate: 2021-06-01
tags: ["javascript", "VSCode"]
---

こんにちは。

この記事では、VSCode で Reveal.js を用いてプレゼンテーションスライドを作ってみた体験談を紹介します。

具体的には、下記について紹介しています。

-   VSCode で Reveal.js を用いたプレゼンテーションスライドを作る方法
-   作ってみて感じたこと、難易度など

まずは、作成したスライドです。
スライドの内容はテキトーなのでこんなのができるんだな～って感じで流してください。

https://www.slideshare.net/ssuserbc289a/vscodereveal

## Reveal.js とは？

Reveal.js とは、綺麗なプレゼン資料を簡単に作成できる JavaScript ライブラリです。

HTML 形式や Markdown 形式で記述した内容が、PowerPoint や Google スライドで作成するようなプレゼン資料のような表示で出力されます。

エンジニアの方であれば、コードを書く感覚で資料を作成することができるので、スムーズに楽しく資料作成ができるのではないでしょうか。

## VSCode で Reveal.js を用いたプレゼンテーションスライドを作る方法

では、VScode で Reveal.js を用いたプレゼンテーションスライドを作る方法を簡単に紹介します。

主な手順は以下となります。

-   PC に VSCode をインストール
-   拡張機能「vscode-reveal」をインストール
-   Markdown 形式（.md）で資料を作成
-   ブラウザで表示確認
-   HTML や PDF でエクスポート

### PC に VSCode をインストール

PC に[VSCode](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)をインストールします。

インストール方法と、VScode を日本語させる方法は[こちら](https://breezegroup.co.jp/201904/visualstudiocode/)の記事を参考すにするとスムーズかと思います。

拡張機能のインストール方法も紹介されているので、参考にしてみていください。

### 拡張機能「vscode-reveal」をインストール

インストールした VSCode を起動し、Ctrl + Shift + x 　を同時押しすると、画面左に拡張機能をインストールすることができるサイドバーが表示されます。

![](/images/スクリーンショット-2021-06-01-071323-1-1.jpg)

左上の検索パネルに「vscode-reveal」を入力し、拡張機能をインストールします。

### Markdown 形式（.md）で資料を作成

VSCode-reveal のインストールが完了すれば Reveal.js を使用できる環境は作れたので、実際に Markdown 形式で資料を作成していきます。

今回僕は、「vscode-revealjs」というファイル名と拡張子「.md」でファイルを作成しました。

「.md」が Markdown の拡張子です。

作成したファイルに、Markdown でスライド内容を記述していきます。

今回作成した上で紹介したスライドの一部のコードを紹介します。

```
---
theme: simple
transition: fade
slideNumber: false
title: VSCode × reveal.js
---

### VSCode × Reveal.js
VScodeでReveal.jsを使ったプレゼン資料作成

---

### Reveal.jsとは

綺麗なプレゼン資料を簡単に作成できる、

JavaScriptライブラリです。

---

### 非エンジニアでも簡単
```

Ctrl ＋ Shift ＋Ｐをクリックし、「Revealjs: Show presentation by side」を入力することで、分割画面でのプレビューを表示することができます。

プレビューを見ながら資料を作成できる便利な機能です。

### ブラウザで表示確認

Ctrl ＋ Shift ＋Ｐをクリックし、「Revealjs: Open presentation in browser」を入力することで作成したファイルをブラウザで確認することができます。

スライドの挙動や全体の雰囲気を確認しましょう。

### HTML や PDF でエクスポート

配布するときや HTML でカスタマイズを行いときなどに、HTML と PDF でエクスポートすることができます。

Ctrl ＋ Shift ＋Ｐをクリックし、「Revealjs: Export in HTML」を入力することで作成したファイルを HTML としてエクスポートすることができ、「Revealjs: Export in PDF」を入力することで作成したファイルを PDF としてエクスポートすることができます。

エクスポートした HTML、PDF にも動きが引き継がれるので、そのままプレゼンすることも可能です。

## 実際に作ってみて感じたこと

今回実際に作ってみて、PowerPoint や Google スライドにまったく慣れてないけどコードを書くことには慣れているかたで文字ベースで、細かい装飾はいらないという方にはおすすめです。

僕自身 PowerPoint にも Google スライドにも慣れているほうなので、わざわざ Markdown 形式で書く必要もないかなと。

ただ、コード書くのは楽しいので、楽しさ重視で LT とかの簡単なスライド作るならよいと思います！

以上、VScode で Reveal.js を使ってプレゼンスライド作ってみた話でした。
