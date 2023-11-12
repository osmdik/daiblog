---
title: "【JavaScript】ページ表示時に全画面で動画を再生し、終了後フェードアウトさせる"
description: ""
pubDate: 2022-11-26
tags: ["javascript"]
---

この記事では、JavaScript でページ表示時に全画面で動画を再生し、動画終了時にフェードアウトさせて削除する方法を紹介します。

脱 jQuery したいので、素の JavaScript で実装していこうと思います。

案件で実装したことの備忘録です。

## コード

コードはこちら。

### HTML・CSS

```
<video id="load_movie" muted playsinline>
    <source src="./hogehoge.mp4" type="video/mp4">
    <source src="./hogehoge.webm" type="video/webm">
</video>
```

```
#load_movie {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #FFF;
    z-index: 9999999999;
}
```

HTML は video 要素に表示したい動画ファイルのパスを指定します。

今回は案件の都合上 mp4 と webm を用意しましたが、MP4 のみでも問題ありません。

video タグはブラウザの仕様上、muted 属性を付与しないと自動再生されません。また、iOS では playsinline 属性を付与しないとタッチして全画面表示で再生する必要があります。

今回、video タグに autoplay 属性は付与しませんが、JS で動画再生に使用する play()メソッドは autoplay 属性と同様にブラウザの動画再生ポリシーが適用されるので、muted 属性と playsinline 属性を付与しておきましょう。

CSS は動画を最上階のレイヤーに全画面で表示するための指定になります。

背景色はお好みで指定してください。

### JavaScript

```
const loadMovie = document.getElementById("load_movie");

// ページ読み込み完了時に動画の再生し終了後にフェードアウトさせる
window.addEventListener("load", function () {
    loadMovie.play();
    loadMovie.addEventListener("ended", function () {
        let startTime = new Date() - 0;
        let time = 500;
        setInterval(function () {
            let elapsedTime = new Date() - startTime;
            if (elapsedTime > time) {
                clearInterval();
                elapsedTime = time;
                loadMovie.remove();
            }
            loadMovie.style.opacity = 1 - elapsedTime / time;
        }, 10);
    });
});
```

ここからが本題の JavaScript です。

はじめに video タグに指定した id を取得しておきます。

window の load イベントで play()メソッドで動画を再生し、ended イベントで動画終了時の処理を実行します。

`let startTime = new Date() - 0;`で現在の時間（処理の開始時間）を取得、`let time = 500;`で処理にかかる時間を設定しておきましょう。

`setInterval(function () {}, 10);`では中の処理を 10ms 毎に実行します。

elapsedTime で処理の開始時間からその時の時間までの経過時間を記録しておき、その経過時間が 500ms を超えるまで video タグの opacity を 0 に近づけます。

elapsedTime が 500ms を超えると、clearInterval()メソッドで setInterval の繰り返しを停止し、elapsedTime に time の値の 500ms を入れた後、video タグを削除します。

`setInterval`内の処理で、fadeout を実現している感じです。

## ページ表示時に全画面で動画を再生し、終了後フェードアウトさせるまとめ

以上が、ページ表示時に全画面で動画を再生し、終了後フェードアウトさせる方法です。

参考までに[CodePen へのリンク](https://codepen.io/doshimaf/pen/jOKxBby)も乗せておきます。
