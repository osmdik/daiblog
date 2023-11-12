---
title: "【コピペOK】Contact Form 7でよく使うデザインカスタマイズ"
description: "この記事ではContact form7を使ったお問い合わせフォームをカスタマイズするデザインテンプレを紹介します。コピペで簡単に実装できます。"
pubDate: 2021-03-25
tags: ["contactForm7", "WordPress"]
---

WordPress でサイトを制作する際、お問い合わせフォームの実装をすることがほとんどです。

この記事では、お問い合わせフォーム生成プラグイン『Contact Form 7』で僕がよく使うデザインカスタマイズを紹介します。

コピペして使ってください。

一部内容が異なりますが、完成版です。

[完成版はこちら](/contact/)

## HTML

下記が HTML です。

当サイトでも使っているもので、内容は 9 割同じです。

```
<table class="inquiry">
<tr>
<th>
<span class="haveto">必須</span><span>お名前</span>
</th>
<td>
[text* your-name class:textsp placeholder"鈴木 花子"]
</td>
</tr>
<tr>
<th>
<span class="haveto">必須</span><span>メールアドレス</span>
</th>
<td>[email* your-email class:mailsp placeholder"xxxxx@gmail.com"]</td>
</tr>
<tr>
<th>
<span class="any">任意</span><span>電話番号</span>
</th>
<td>
[tel your-tel class:tel placeholder"090-0000-0000"]
</td>
</tr>
<tr>
<th>
<span class="haveto">必須</span><span>お問い合わせ内容</span>
</th>
<td>
[textarea* your-message class:content placeholder "具体的なお問い合わせ内容をご記入ください"]
</td>
</tr>
</table>
<p>[acceptance accept-this-1 class:input2] スパムメール防止のため、こちらのボックスにチェックを入れてから送信してください。[/acceptance]</p>

<center>[submit id:formbtn "上記の内容で送信する"]</center>
```

必須項目には、下記を項目名の前に入れます。

```
<span class="haveto">必須</span>
```

任意項目には、下記を項目名の前に入れます。

```
<span class="any">任意</span>
```

この HTML を次の項目の CSS でデザインを追加していきます。

## CSS

下記が CSS となります。

当サイトで使っているものと同じ CSS です。

お好みで色や大きさを変えてみてください。

```
/************************************
** お問い合わせフォームの入力
************************************/
input[type="text"],
input[type="password"],
input[type="datetime"],
input[type="date"],
input[type="month"],
input[type="time"],
input[type="week"],
input[type="number"],
input[type="email"],
input[type="url"],
input[type="search"],
input[type="tel"],
input[type="color"],
select,
textarea,
.field {
  display: block;
  width: 100%;
  height: 45px;
  margin-bottom: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 3px;
  background-color: #eff1f5;
  box-shadow: none;
  color: #5c6b80;
  font-size: 1em;
  vertical-align: middle;
  line-height: 45px;
  transition: background-color 0.24s ease-in-out;
}
textarea {
  max-width: 100%;
  min-height: 120px;
  line-height: 1.5em;
  padding: 0.5em;
  overflow: auto;
}
@media(max-width:500px) {
    .inquiry td,
    .inquiry th {
        display: block !important;
        width: 100% !important;
        border-top: none !important;
        -webkit-box-sizing: border-box !important;
        -moz-box-sizing: border-box !important;
        box-sizing: border-box !important
    }
    .inquiry tr:first-child th {
        border-top: 1px solid #d7d7d7 !important
    }
    .inquiry .any,
    .inquiry .haveto {
        font-size: 10px
    }
}
.inquiry th {
    text-align: left;
    font-size: 14px;
    color: #444;
    padding-right: 5px;
    width: 30%;
    background: #f7f7f7;
    border: solid 1px #d7d7d7
}
.inquiry td {
    font-size: 13px;
    border: solid 1px #d7d7d7
}
.entry-content .inquiry tr,
.entry-content table {
    border: solid 1px #d7d7d7
}
.haveto {
    font-size: 7px;
    padding: 5px;
    background: #ff9393;
    color: #fff;
    border-radius: 2px;
    margin-right: 5px;
    position: relative;
    bottom: 1px
}
.any {
    font-size: 7px;
    padding: 5px;
    background: #93c9ff;
    color: #fff;
    border-radius: 2px;
    margin-right: 5px;
    position: relative;
    bottom: 1px
}
.verticallist .wpcf7-list-item {
    display: block
}
#formbtn {
    display: block;
    padding: 15px;
    width: 350px;
    background: #000;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    border-radius: 2px;
    margin: 25px auto 0;
    border: 2px solid #000;
	transition: 0.7s
}
#formbtn:hover {
    background: #fff;
		color: #000;
		border: 2px solid #000
}
th {
    font-weight: 700;
    text-transform: uppercase;
    padding: 13px
}
td {
    border-top: 1px solid #ededed;
    padding: 12px
}
input,
select,
textarea {
    border: 1px solid #dfdfdf;
    letter-spacing: 1px;
    margin: 0;
    max-width: 100%;
    resize: none
}
```

## メール設定

作成したお問い合わせフォームから送信されてくるメールの表示です。

メッセージ本文には下記をそのまま使えます。

お問い合わせされた方： \[your-name\] <\[your-email\]>

名前：\[your-name\]
メールアドレス：\[your-email\]
電話番号：\[your-tel\]

お問い合わせ内容： \[contact-menu\]
お問い合わせ内容詳細
\[your-message\]

作成したフォームは、ショートコードやブロックエディターのブロックの追加でページに埋め込みましょう。

シンプルバージョンも作成したのでよかったらどうぞ ↓
