---
title: "Chrome拡張機能『MozBar』が正常に動作してくれないときの対処法【Cookieを許可せよ】"
description: ""
pubDate: 2022-01-19
tags: ["Other"]
---

先日久しぶりに『MozBar』を有効化してドメインパワーを調べようとしたところ、以下のメッセージがでてしまい、正常に動作しませんでした。

```
Improve your MozBar experience. Please unblock 3rd Party Cookies, or allow \[\*.\]moz.com in your Cookie settings. Learn more
```

この記事では、このような『MozBar』が正常に動作しないときの対処法について紹介します。

## そもそも『MozBar』とは？

『MozBar』とは以下の指標を測ることができる Chrome 拡張機能です。

-   ページの権威性（PA：Page Authority）
-   ドメインパワー（DA：Domain Authority）

それぞれ、０～ 100 の中で評価されます。

記事の質や被リンクなどがスコアに影響し、SEO 対策の１つの指標として活用されています。

ブログ運営をしている方は、導入しておいて損はない拡張機能ですので、ぜひ導入してみてください。

[Chrome 拡張機能『MozBar』はこちら](https://chrome.google.com/webstore/detail/mozbar/eakacpaijcpapndcfffdgphdiccmpknp/related)

## 対処法はサードパーティの Cookie を許可

![](/images/blog-mozbar-001-1024x605.jpg)

それでは早速、『MozBar』が上記画像のように正常に動作しないときの対処法を解説していきましょう。

結論、Chrome の設定からサードパーティーの Cookies を許可すれば正常に動作するようになります。

```
Improve your MozBar experience. Please unblock 3rd Party Cookies, or allow \[\*.\]moz.com in your Cookie settings. Learn more
```

こちらのメッセージでも、サードパーティーの Cookie のブロックを解除するか、 \[\*.\]moz.com の Cookie を許可してくださいと言われている通りです。

ただ、すべてのサードパーティーの Cookie をブロック解除してしまうのは、プライバシーやセキュリティの観点からよろしくないので、\[\*.\]moz.com のみの Cookie を許可する方法で対処しましょう。

### Chrome 設定から、サードパーティーの Cookie を許可

まず、Cookie の設定を開きます。

Chrome の設定 → セキュリティとプライバシー →Cookie とその他のサイトデータ

以下が Cookie とその他のサイトデータを開いた際の画面です。

![](/images/blog-mozbar-002-1024x605.jpg)

ここから、常に Cookie を使用できるサイトの項目の「追加」をクリックします。

クリックすると、「サイトの追加」というウィンドウが表示されるので、サイト入力欄に `[*.]moz.com` を入力し「このサイトでサードパーティーの Cookie を許可する」にチェックを入れます。

入力しチェックを入れた画面が以下です。

![](/images/blog-mozbar-003-1024x605.jpg)

入力とチェックを入れた後、追加ボタンをクリックすると以下のようにサイトが追加されます。

![](/images/blog-mozbar-004-1024x605.jpg)

### ブラウザの再起動・MozBar への再ログインを忘れずに

追加されているのが確認できたら、

-   ブラウザの再起動
-   MozBar への再ログイン

をしてください。

この操作を忘れてしまうと、正常に動作しないので忘れてしましょう。

それぞれ完了すると、以下のように正常に動作するようになりました。

![](/images/blog-mozbar-005-1024x605.jpg)

以上が『MozBar』が正常に動作してくれないときの対処法となります。

## 終わりに

『MozBar』は SEO 対策や競合調査でとても便利な拡張機能です。

僕自身、ゴリゴリのブロガーではありませんが、執筆した記事や運営サイトの現状を把握するために導入しているので、ブログを書く方はぜひ導入してみてください。
