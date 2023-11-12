---
title: "JaveScriptファイルの記述や読み込みはどこでするべきか【async・defer】"
description: "この記事では、JaveScriptファイルの記述や読み込みはどこでするべきかということについてまとめています。head内に書くべきかbody内末尾に書くべきか迷いを解消する助けになれば幸いです。"
pubDate: 2021-04-04
tags: ["JavaScript", "async", "defer"]
---

この記事では、JaveScript の記述や読み込みはどこでするべきかということについてまとめました。

僕自身、head 内に書くべきか body 内末尾に書くべきかわからなかったため、今後記述するときの迷いを解消するため備忘録に残します。

## JavaScript の記述位置は body の終了タグの直前

JavaScript の記述位置は、下記のように body の終了タグの直前に書くのが一般的です。

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>タイトル</title>
</head>
<body>
  <!-- ここにHTML要素を記述します。 -->
  <script src="sample.js"></script>
  <script>
    <!-- ここにJavaScriptのプログラムを記述します。 -->
  </script>
</body>
</html>
```

理由は、HTML 要素をすべて読み込んだ後に、JavaScript を実行できるからです。

下記のように、head 内で JavaScript を読み込んだ場合、

-   body タグ内の処理と表示の前に JavaScript の処理・実行され body タグ内の表示に時間がかかる。
-   JavaScript で body タグ内の要素を処理する場合に、body タグ内の要素が処理されていないため、JavaScript で body タグ内の要素を処理できず、エラーとなる。

という問題が発生するからです。

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>タイトル</title>
  <script src="sample.js"></script>
  <script>
    <!-- ここにJavaScriptのプログラムを記述します。 -->
  </script>
</head>
<body>
  <!-- ここにHTML要素を記述します。 -->
</body>
</html>
```

## body タグ内の処理前に実行したい JavaScript がある場合は head に記述

-   JavaScript で body タグ内の要素を処理しない
-   body タグ内の処理前に実行したい JavaScript がある

という場合には、hea タグ内に JavaScript を記述しなければなりません。

つまり、JavaScript での処理内容に応じて、記述位置を変えたほうが良いことになります。

## 記述位置を 1 ヵ所にまとめたい場合には『async』属性や『defer』属性を追加

ここまで解説してきて、body の終了タグの直前と head 内でかき分けるのは非効率でわかりにくいということがあるはずです。

そんなときのために、『async』属性と『defer』属性があります。

通常、body の終了タグの直前に JavaScript を記述した場合、body タグ内の HTML の読み込み、JavaScript の読み込みと実行は下記のような順番で行われます。

1. （script 開始タグまでの）HTML の読み込み
2. HTML の読み込みを中断し script タグ内の JavaScript を読み込み・実行
3. JavaScript の実行完了後、HTML の読み込み再開

『async』属性や『defer』属性を追加することで、head 内に JavaScript を記述しても、HTML 読み込み後に実行されるので、head 内にまとめて記述しつつ、処理のタイミングは分けることができます。

### async 属性を追加した場合

```
  <script src="sample.js" async></script>
  <script async>
    <!-- ここにJavaScriptのプログラムを記述します。 -->
  </script>
```

上記のように async 属性を追加した場合、JavaScript の読み込みは、HTML の読み込みと並行して行われ、JavaScript の読み込みが完了し次第、HTML の読み込みを中断し、JavaScript を実行します。

つまり、JavaScript の読み込みと処理を非同期に行うことができるということになります。

読み込みと実行は下記のような順番で行われます。

1. （script 開始タグまでの）HTML の読み込み
2. HTML と script タグ内の JavaScript を並行して読み込み
3. JavaScript の読み込み完了後、JavaScript を実行
4. JavaScript の処理完了後、残りの HTML の読み込み再開

JavaScript の読み込み間も HTML の読み込みを中断しないため、デフォルトの状態よりも処理にかかる時間を短縮することができます。

ただ、すべての HTML の読み込み完了前に JavaScript が実行される可能性があるため、JavaScript が実行されることにより HTML の読み込みが中断される事や、読み込まれていない HTML を JavaScript が処理できずエラーを起こしてしまう可能性があります。

また、非同期読み込みであるがゆえに JavaScript の記述順に処理が実行されるわけではないので、複数の JavaScript を読み込む場合には不向きです。

### defer 属性を追加した場合

```
  <script src="sample.js" defer></script>
  <script defer>
    <!-- ここにJavaScriptのプログラムを記述します。 -->
  </script>
```

上記のように defer 属性を追加した場合、JavaScript の読み込みは、HTML の読み込みと並行して行われ、JavaScript の読み込みと HTML の読み込みが完了した後、JavaScript を実行します。

つまり、JavaScript を HTML と並行して読み込み、実行は遅らせることができます。

読み込みと実行は下記のような順番で行われます。

1. （script 開始タグまでの）HTML の読み込み
2. HTML と script タグ内の JavaScript を並行して読み込み
3. JavaScript と HTML の読み込み完了後、JavaScript を実行

async と違い、HTML 読み込み後に JavaScript が実行されるため、head 内に記述しても JavaScript 実行時に HTML が読み込まれていない状況がなくエラーを防ぐことができます。

## 終わりに

STEP

STEP

JavaScript の記述位置は基本的に、body の終了タグの直前が良いです。

ただ、場合によって head 内に記述する必要があり、記述位置を head 内の 1 ヵ所にまとめたいという方は、async や defer を使うことで実行タイミングを変えエラーを防ぐことができます。

僕自身めんどくさがりでできるだけエラーを起こしたくないので、head 内にまとめるとしても defer を使っていく予定です。

async と defer を JavaScript によって変えて使うのも面白そうなので、いつか試して処理速度を計測してみます。
