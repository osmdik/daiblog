---
title: "【PHP環境構築】M1 MacにHomebrewを使ってPHPをインストールする方法"
description: "この記事では、M1 Macに Homebrewを用いてPHPをインストールする方法をインストール中によく起こるエラーの対処法を交えて紹介しています。M1 MacにPHPの環境構築をしたい方はどうぞ。"
pubDate: 2022-01-29
tags: ["Homebrew","PHP"]
---

この記事では、M1 Macに Homebrewを用いてPHPをインストールする方法を紹介します。

CPUがIntel製のMacではPHPが標準搭載されていましたが、M1 Macでは標準搭載されておらず、個人でインストールする必要があります。

普段のWeb制作でもPHPファイルを扱うことがあるため、PHP開発環境がないと困る！

ということで、macOS（またはLinux）用パッケージマネージャー『Homebrew』を用いた、PHPのインストール方法を紹介します。

Homebrewを用いたPHPのインストールは以下の手順です。

1. Homebrewのインストール
2. PHPのインストール

## Homebrewのインストールと簡単な使い方の紹介

![](/images/homebrew-hp-1024x557.jpg)

まずは[Homebrew](https://brew.sh/index_ja)のインストール方法をご紹介します。

Homebrewの公式ホームページ（[https://brew.sh/index\_ja](https://brew.sh/index_ja)）からインストールの手順に従い、ターミナルに下記コードを貼り付けましょう。

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

このコードは2022年1月29日のものですが、公式ホームページでは常に最新版のインストールコードが公開されていますので、そちらを参照してください。

コードを貼り付けてEnterを押すと、パスワードを求められるので端末にログインする際のパスワードを入力します。

パスワード入力後、下記の文言が表示され、処理が一時停止されます。

```
==> The Xcode Command Line Tools will be installed.

Press RETURN to continue or any other key to abort:
```

訳すと、「RETURN（Enter）を押して続行するか、その他のキーを押して中止します」という意味なので、Enterを押して続行しましょう。

処理が完了し、`アカウント名 ~ %`の表示になるまで待ちます。

正常にインストールが完了していれば、処理の末尾の表示に`Installation successful!`が表示されるので確認してください。

バージョン確認のコード`brew -v`を実行し以下のようにバージョンが正しく表示されていればHomebrewのインストールと動作確認の完了です。

```
% brew -v
Homebrew 3.3.12
Homebrew/homebrew-core (git revision 3a35adbd268; last commit 2022-01-28)
Homebrew/homebrew-cask (git revision 2047f21199; last commit 2022-01-28)
```

### バージョンが正しく表示されない場合の対処法

`Installation successful!`が表示されたものの、バージョン確認では以下のように表示されない場合があります。

```
% brew -v
zsh: command not found: brew
```

これはほとんどの場合、インストールはできているものの**パスが通っていない**ことが原因です。

Homebrewインストール時に`Installation successful!`付近に以下のように`Warning: /opt/homebrew/bin is not in your PATH.`が表示されている場合に発生します。

```
Warning: /opt/homebrew/bin is not in your PATH.
  Instructions on how to configure your shell for Homebrew
  can be found in the 'Next steps' section below.
==> Installation successful!
```

要するに「/opt/homebrew/binにパスが通ってないよ〜」ってことなので、パスを通しましょう。

PATH（パス）とは

PATH（パス）とは簡単に言うとファイルやフォルダ（ディレクトリ）がどこにあるのかという位置情報のことです。

パスを通すことで、ある特定のプログラム（今回はHomebrew）をプログラム名（Homebrewの場合は「brew」）だけで実行できるようになります。

### パスを通す方法

パスを通す手順は以下となります。

手順の中のコマンド（vi とか export など）の意味や使い方はググってください。m(\_ \_)m

1. **コマンド`vi ~/.zshrc` を実行**
    vi系のエディタが自動的に立ち上がります。
2. **開いたエディタに`export PATH=/opt/homebrew/bin:$PATH`を入力**
    通すパスの`/opt/homebrew/bin`部分はインストール時にWarningに表示されたパスなので確認が必要です。
3. **コマンド`:wq`を入力**
    このコマンドは「ファイルを保存してからviを終了」するために使用し、内容が保存されvi系のエディタが終了します。

これでパスを通す作業が完了したので、`echo $PATH`で通されているパスを確認しましょう。

僕の場合は以下となります。

```
% echo $PATH
~~~/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

中に`/opt/homebrew/bin`が入っていればOKです。

最後にパスが通りHomebrewが正常に動作するか`brew -v`を実行しバージョンが表示されるのを確認しましょう。

## Homebrewを使ってPHPをインストール

それでは先ほどインストールした Homebrewを使ってPHPをインストールしていきましょう。

下記のコードを実行すればインストールできます。

```
brew install php
```

エラー表示などがなく、以下のような表示で処理が終了すればインストール完了です。

```
The php.ini and php-fpm.ini file can be found in:
    /opt/homebrew/etc/php/8.1/

To restart php after an upgrade:
  brew services restart php
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/php/sbin/php-fpm --nodaemonize
```

インストール完了後、`php -v`を実行し正常にバージョンが表示されるかを確認しましょう。

正常に動作している場合は以下のようになります。

```
% php -v
PHP 8.1.2 (cli) (built: Jan 21 2022 04:34:05) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.2, Copyright (c) Zend Technologies
    with Zend OPcache v8.1.2, Copyright (c), by Zend Technologies
```

### PHPが正常にインストールできないときの対処法

PHPのインストール時に以下のようにエラーが表示され、正常にインストールできない場合の対処法を紹介します。

```
% brew install php
Warning: No available formula with the name "php".
==> Searching for similarly named formulae...
Error: No similarly named formulae found.
==> Searching for a previously deleted formula (in the last month)...
Error: No previously deleted formula found.
==> Searching taps on GitHub...
Error: No formulae found in taps.
```

上記の意味を簡単に表現すると、「PHPのフォーミュラ（パッケージの定義）が見つからないし、tapsの中にもありません。」ということのようです。

これは、Homebrewのコアが開発者によってアップデートされたことによるもので、再度コアを追加し直す必要があります。

対処法は下記の手順です。

1. `rm -rf $(brew --repo homebrew/core)`のコードを実行し、現在のコアを削除
2. `brew tap homebrew/core`のコードを実行
    コード`brew tap`は公式以外のリポジトリをフォーミュラとしてHomebrewに追加す
3. `brew uppubDate` のコードを実行しHomebrew本体をアップデート

これで、HomebrewがアップデートされPHPを正常にインストールすることができるようになります。

再度`php -v`を実行し正常にバージョンが表示されるかを確認しましょう。

ちなみに、僕が正常にインストールできなかったときのHomebrewは以下の状態でした。

```
% brew -v
Homebrew 3.3.6
Homebrew/homebrew-core (no Git repository)
Homebrew/homebrew-cask (git revision b91a487b5b; last commit 2021-12-05)
```

HomebrewのコアがGitのリポジトリを取得できていないことがわかります。

対処法を行った後の表示は以下となり、正常に取得できていることがわかりますね。

```
% brew -v
Homebrew 3.3.12
Homebrew/homebrew-core (git revision 3a35adbd268; last commit 2022-01-28)
Homebrew/homebrew-cask (git revision 2047f21199; last commit 2022-01-28)
```

## 終わりに

今回は、M1 Macに Homebrewを用いてPHPをインストールする方法をインストール中によく起こるエラーの対処法を交えて紹介しました。

PHPの環境構築はエンジニアにとって必要になることが多いので、誰かの役に立てば嬉しいです。

まだまだ未熟なエンジニアの記事なので、ご意見、ご指摘があればよろしくお願いします。
