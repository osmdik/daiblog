---
title: "autoprefixerが「Error [ERR_MODULE_NOT_FOUND]: Cannot find package」で動かないときの対処法"
description: "この記事では、postcssを用いたautoprefixerの実行時にError [ERR_MODULE_NOT_FOUND]: Cannot find packageというエラーが表示され正常に動作しないときの対処法を紹介します。"
pubDate: 2022-03-18
tags: ["autoprefixer"]
---

最近、npm-script を用いてコーディング環境を作ろうと思い、必要なモジュールやパッケージをインストールし`npm run build`などで実行できるよう奮闘中です。

その中で、autoprefixer を用いて`npx postcss style.css --use autoprefixer -o style.css`でベンダープレフィックスを付与しようとしたところ以下のエラー文が表示され、付与できませんでした。

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package
```

今回は、autoprefixer の実行時に`Error [ERR_MODULE_NOT_FOUND]: Cannot find package`が表示され正常に動作しないときの対処法を紹介します。

## エラーが表示される原因

この、`Error [ERR_MODULE_NOT_FOUND]: Cannot find package`が表示され正常に動作しない原因は、postcss パッケージがインストールされていないからです。

よくある解説記事では、autoprefixer は以下のコマンドでインストールできると紹介されています。

```
npm i postcss-cli autoprefixer -D
```

npm install するだけで、依存関係にあるパッケージも一緒にインストールされるものもありますが、postcss はインストールされないようです。

実は、インストールのコマンドを実行したときに以下の警告文が表示されています。

```
npm WARN postcss-cli@9.1.0 requires a peer of postcss@^8.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN autoprefixer@10.4.4 requires a peer of postcss@^8.1.0 but none is installed. You must install peer dependencies yourself.
npm WARN postcss-reporter@7.0.5 requires a peer of postcss@^8.1.0 but none is installed. You must install peer dependencies yourself.
```

インストールしたときは、package.json ファイルにパッケージ名とバージョンが記載されていたので正常にインストールされていたと思ってましたが、よく読んでみると、1 つ目の WARN には、「postcss-cli@9.1.0には、postcss@^8.0.0 が必要だけど、インストールされてないよ。自分でインストールしてね。」と書かれています。

2つ目と3つ目の WARN でも、autoprefixer@10.4.4、postcss-reporter@7.0.5には、postcss@^8.0.0 が～と同じように書かれています。

つまり、postcss をインストールすれば解決するということです。

## エラーの対処法

このエラーは以下のコマンドで解決します。

```
npm i postcss -D
```

postcss 本体をインストールするだけですね。

インストール後、`npx postcss style.css --use autoprefixer -o style.css`でベンダープレフィックスを付与するコマンドを実行すると、正常に動作することが確認できました。

## 終わりに

今回は、autoprefixer の実行時に`Error [ERR_MODULE_NOT_FOUND]: Cannot find package`が表示されたときの対処法を紹介しました。

`npm i postcss-cli autoprefixer -D`の実行では、postcss 本体はご自身でインストールする必要があります。

```
npm i postcss -D
```

autoprefixer の導入はコーディングの効率化において必須だと思うので、環境構築時に注意してくださいね。
