---
title: "【Webpack入門】JavaScriptのモジュールバンドラ『Webpack』の導入方法と使い方"
description: "この記事では、モジュールバンドラ『Webpack』について簡単な紹介と導入方法について解説しています。Webサイトを構成する複数のファイルをまとめることのできるツールなのでフロントエンドエンジニア必見です。"
pubDate: 2021-09-21
tags: ["javascript"]
---

Webpack は以下のフロントエンドロードマップの必須項目となっていたのでとりあえず触れてみました。

フロントエンドロードマップ　 → 　[https://roadmap.sh/frontend](https://roadmap.sh/frontend)

この記事では、Webpack の入門編ということで

-   Webpack とはモジュールバンドラとはどういうものなのか
-   Webpack の導入手順
-   開発効率化のための簡単なカスタマイズ

について紹介します。

僕自身、初めて Webpack を触ってみたので、その備忘録といったところです。

## モジュールバンドラ『Webpack』とは

Webpack とは Web サイトを構成する複数のファイルをまとめることのできるツールです。

主に Javascript のモジュールをまとめることに使用されますが、css ファイルや画像ファイルもまとめることができます。

複数のファイルをまとめることで、リクエスト数を減らすことができ、サーバーとクライアント間での転送速度を高速化できるようになります。

要するにサイトの表示速度が上がるということです。

また Webpack には、ファイルのバンドラだけでなく、js の圧縮やローカルサーバーの起動などフロントエンド開発に便利な機能もあり、Gulp のような複数のツールを組み合わせる必要がありません。

フロントエンドエンジニアにとりあえず必要な技術が揃い、包括的な開発環境を作ることのできるツールです。

## Webpack の導入手順

実際に Webpack を導入する手順を解説していきます。

今回の導入手順は以下のを前提としています。

-   Node.js をインストールしており、npm install 等のコマンドを使える。
-   筆者の開発環境：Windows10、VScode

また、ターミナルは VSCode 内の PowerShell を使用しました。

### 作業するフォルダのディレクトリへ移動

`cd`コマンドを用いて、作業フォルダのあるディレクトリへ移動します。

User フォルダの name フォルダの webpack-sample を作業フォルダとした場合、以下のようになります。

```
C:\Users\name\webpack-sample
```

### webpack 本体「webpack-cli」のインストール

まず、以下のコマンドを実行することで、デフォルト設定でプロジェクトの詳細情報を表示し、設定情報が記載された package.json ファイルを作成します。

```
npm init -y
```

次に、Webpack を実行するための webpack 本体「webpack-cli」をインストールします。

インストールには、以下のコマンドを使用します。

```
npm install -D webpack webpack-cli
```

正常にインストールすることができたら、Webpack を使用することのできる環境は整いました。

## 実際に Webpack で js ファイルをバンドルしてみる。

Webpack 本体をインストールすることができたところで、実際に ES Modules の JavaScript 処理を Webpack でバンドルしてみます。

Webpack インストールしたフォルダ直下に src フォルダを作成しバンドル用の index.js と sub.js という 2 つの js ファイルを作成します。

```js
// index.js
// import 文を使って sub.js ファイルを読み込む。
import { hello } from "./sub";

// sub.jsに定義されたJavaScriptを実行する。
hello();
```

```js
// sub.js
// export文を使ってhello関数を定義する。
export function hello() {
  alert("Hello World!");
}
```

ファイルを作成し、以下のコマンドをビルドします。

```
npx webpack
```

ビルドすると、index.js ファイルと sub.js ファイルがバンドルされ、dist フォルダが作成され main.js にバンドルされたコードが出力されます。

![](/images/webpackimg-1024x420.jpg)

出力した main.js ファイルを作成した html ファイルで読み込むことでバンドルされたコードが実行されます。

## 開発効率化の簡単カスタマイズ

前項までの手順で、Webpack を使用することはできるようになりました。

しかしそのままだと、シンプルながらも Webpack 特有のビルドコマンドを打つ必要があることやコードの変更のたびにビルドしてブラウザをリロードする必要があるなど、効率よい開発とは言い難い環境です。

ここからは、このような非効率な環境を効率化するための基本的で簡単なカスタマイズを紹介します。

主なカスタマイズ内容は以下です。

-   webpack-dev-server モジュールのインストール
-   package.json の編集
-   Webpack の編集

### webpack-dev-server モジュールのインストール

webpack-dev-server モジュールをインストールすることで、コードの変更の検知から Webpack ビルドコマンドの実行、ブラウザのリロードまでを自動化することができます。

以下のコマンドを実行し、インストールしましょう。

```
npm i -D webpack webpack-cli webpack-dev-server
```

コマンド `npx webpack serve` を入力することで、起動することができます。

### package.json の編集

package.json ファイルの scripts を以下のようにカスタマイズ することで、 `npm scripts` で実行できるようになります。

```json
{
  "scripts": {
    "build": "webpack",
    "start": "webpack serve"
  },
  "devDependencies": {
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0",
    "webpack-dev-server": "^4.2.1"
  },
  "private": true
}
```

この編集で、

-   `npx webpack`　 → 　`npm run build`
-   `npx webpack serve`　 → `npm start`

というように npm scripts のコマンドで実行できるように設定しました。

### webpack.config.js の編集

作業フォルダのディレクトリ直下に、webpack.config.js ファイルを作成することで、webpack の動作の設定を行うことができます。

今回のプロジェクトでの webpack.config.js の設定は以下のように設定しています。

```js
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    static: {
      directory: "dist",
    },
    open: true
  },
  devtool: 'source-map'
};
```

`devServer`の設定項目`directory`にルートフォルダを指定、`open: true`の設定にし `npx webpack serve` もしくは `npm start`のコマンドを入力することで起動することができます。

2021 年 8 月に webpack-dev-server の v4 がリリースされており、リリース以前に執筆された v3 バージョンの記事では `devServer`の設定 が、

```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
  }
```

となっています。

しかし、v3 と v4 では使用が変わっており、`static`を使用した設定となるので注意して下さい。

詳細は、以下ので確認することができます。

[https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)

## 終わりに

今回、ics.media さんの以下の記事を参考にさせていただきました。

[https://ics.media/entry/12140/#module-bundler-comparison](https://ics.media/entry/12140/#module-bundler-comparison)

2021 年 8 月に webpack-dev-server の v4 がリリースされていたため v4 仕様には対応していませんが、Webpack の入り口を理解するには十分わかりやすかったです。

以上、『【Webpack 入門】JavaScript のモジュールバンドラ『Webpack』に触れてみた。』でした。
