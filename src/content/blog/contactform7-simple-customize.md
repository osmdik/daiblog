---
title: "【コピペOK】ContactForm7のシンプルなデザインカスタマイズ"
description: "この記事ではContact form7を使ったお問い合わせフォームをカスタマイズするシンプルなデザインテンプレを紹介します。コピペで簡単に実装できます。"
pubDate: 2021-04-07
tags: ["WordPress", "ContactForm7"]
---

以前、下記記事で ContactForm7 のよく使うデザインカスタマイズを紹介しました。

この記事では、さらにシンプルで見やすい ContactForm7 のデザインカスタマイズを紹介します。

こちらが完成版です。

[完成版はこちら](/simple-contact/)

## HTML

下記が HTML です。

```
<span class="must">必須</span> お名前
[text* your-name]

<span class="must">必須</span> メールアドレス
[email* your-email]

<span class="free">任意</span> お問い合わせ種別
[select contact-menu include_blank "記事について" "Webサイト制作について" "中の人について" "その他"]

<span class="free">任意</span> お問い合わせ内容
[textarea your-message]

<p>[acceptance accept-this-1 class:input2] スパムメール防止のため、こちらのボックスにチェックを入れてから送信してください。[/acceptance]</p>

[submit "送信"]
```

今回のカスタマイズでは、必須項目には、下記を項目名の前に入れます。

```
<span class="must">必須</span>
```

任意項目には、下記を項目名の前に入れます。

```
<span class="free">任意</span>
```

この HTML を次の項目の CSS でデザインを追加していきます。

## CSS

下記が CSS となります。

```
/************************************
** シンプルお問い合わせフォームの入力
************************************/
/* 必須マーク */
.must{
	color: #fff;
	margin-right: 10px;
	padding: 6px 10px;
	background: #F92931;
	border-radius: 20px;
}

/* 任意マーク */
.free {
	color: #fff;
	margin-right: 10px;
	padding: 6px 10px;
	background: #424242;
	border-radius: 20px;
}

/* 項目名を太字にする */
form p {
	font-weight: 600;
	margin-bottom: 2em;
}

/* 入力項目を見やすくする */
input.wpcf7-form-control.wpcf7-text,
textarea.wpcf7-form-control.wpcf7-textarea,.wpcf7-select {
	width: 100%;
	padding: 8px 15px;
	margin-right: 10px;
	margin-top: 10px;
	border: 1px solid #d0d5d8;
	border-radius: 3px;
}
textarea.wpcf7-form-control.wpcf7-textarea {
	height: 200px;
}

/* 必須項目の入力欄の色を変える */
input.wpcf7-form-control.wpcf7-text.wpcf7-valipubDates-as-required {
	background: rgba(255, 255, 142, 0.46);
}

/* 送信ボタンのデザイン */
input.wpcf7-submit {
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
input.wpcf7-submit:hover {
    background: #fff;
		color: #000;
		border: 2px solid #000
}

/* エラーメッセージを見やすくする */
span.wpcf7-not-valid-tip,
.wpcf7-response-output.wpcf7-validation-errors {
	color: red;
	font-weight: 600;
}
```

入力欄を見やすくする下記の CSS ですが、この CSS では今使っている

-   名前やメールアドレスなどのテキスト入力欄
-   セレクトボックス
-   複数行入力のテキストエリア

のみにしか適応していません。

```
/* 入力項目を見やすくする */
input.wpcf7-form-control.wpcf7-text,
textarea.wpcf7-form-control.wpcf7-textarea,.wpcf7-select {
	width: 100%;
	padding: 8px 15px;
	margin-right: 10px;
	margin-top: 10px;
	border: 1px solid #d0d5d8;
	border-radius: 3px;
}
```

必要に応じて、ラジオボタンやチェックボックスの wpcf7-○○ をセレクタを追加してください。

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
