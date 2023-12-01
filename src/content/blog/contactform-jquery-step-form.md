---
title: "【WordPress】ContactForm7とjQueryでステップ式フォームを作ってみた。"
description: "この記事では、ContactForm7（コンタクトフォーム7）で作るお問い合わせフォームとjQueryを組み合わせて１画面内で完結するステップ式フォームの作り方を解説しています。"
pubDate: 2021-08-01
tags: ["WordPress","ContactForm7","jQuery"]
---

この記事では、ContactForm7とjQueryを組み合わせて１画面内で完結するステップ式フォームの作り方を解説します。

## ステップ式フォーム用のHTML

![ステップ式フォーム用のHTMLの画像](/images/contactform-step11-1024x686.jpg)

HTMLは導入したContactForm7で新規追加したフォームのフォーム欄に記述しましょう。

```html
<div class="form-horizontal c-form-step">
  <div class="c-form-step__step-items">
    <div class="c-form-step__step-items__item-box current">STEP1</div>
    <div class="c-form-step__step-items__item-box">STEP2</div>
    <div class="c-form-step__step-items__item-box">完了</div>
  </div>
  <div class="c-form-step__wrapper-box current">
    <table>
      <tr>
        <td>お問い合わせ種別</td>
        <td>[select* contact-menu include_blank "記事について" "Webサイト制作について" "中の人について" "その他"]</td>
      </tr>
      <tr>
        <td>お問い合わせ内容</td>
        <td>[textarea your-message rows:5 class:content placeholder "具体的なお問い合わせ内容をご記入ください"]</td>
      </tr>
    </table>
    <div class="btn_block">
      <button type="button" class="btn__link btn__link-primary" onClick="nextStep()" disabled>次に進む</button>
    </div>
  </div>
  <div class="c-form-step__wrapper-box">
    <table>
      <tr>
        <td>お名前</td>
        <td>[text* your-name]</td>
      </tr>
      <tr>
        <td>生年月日(必須)</td>
        <td>[select* birth-year default:61 "1920" "1921" "1922" "1923" "1924" "1925" "1926" "1927" "1928" "1929" "1930" "1931" "1932" "1933" "1934" "1935" "1936" "1937" "1938" "1939" "1940" "1941" "1942" "1943" "1944" "1945" "1946" "1947" "1948" "1949" "1950" "1951" "1952" "1953" "1954" "1955" "1956" "1957" "1958" "1959" "1960" "1961" "1962" "1963" "1964" "1965" "1966" "1967" "1968" "1969" "1970" "1971" "1972" "1973" "1974" "1975" "1976" "1977" "1978" "1979" "1980" "1981" "1982" "1983" "1984" "1985" "1986" "1987" "1988" "1989" "1990" "1991" "1992" "1993" "1994" "1995" "1996" "1997" "1998" "1999" "2000" "2001"] / [select* birth-month include_blank "1" "2" "3" "4" "5" "6" "7" "8" "9" "10" "11" "12"] / [select* birth-day include_blank "1" "2" "3" "4" "5" "6" "7" "8" "9" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19" "20" "21" "22" "23" "24" "25" "26" "27" "28" "29" "30" "31"]</td>
      </tr>
    </table>
    <div class="btn_block">
      <button type="button" class="btn__link btn__link-primary px4-xs py2-xs" onClick="prevStep()">前に戻る</button>
      <button type="button" class="btn__link btn__link-primary px4-xs py2-xs" onClick="nextStep()" disabled>次に進む</button>
    </div>
  </div><!-- /.c-form-step__wrapper-box -->
  <div class="c-form-step__wrapper-box">
    <table>
      <tr>
        <td>電話番号</td>
        <td>[tel* your-tel]</td>
      </tr>
      <tr>
        <td>メールアドレス</td>
        <td>[email* your-email]</td>
      </tr>
    </table>
    <p style="text-align: center;">[acceptance acceptance-983]　<a href="/privacy-policy/" target="_blank" rel="noreferrer noopener">プライバシーポリシー</a>に同意する。 [/acceptance]</p>
    <div class="btn_block">
      <button type="button" class="btn__link btn__link-primary px4-xs py2-xs" onClick="prevStep()">前に戻る</button>
      [submit class:btn__link class:btn__link-primary  "無料相談を申し込む"]
    </div>
  </div><!-- /.c-form-step__wrapper-box -->
</div><!-- /.form-horizontal c-form-step -->
```

STEP1、SETP２などのステップのナビゲーションは以下のコードで表示されます。

```html
<div class="c-form-step__step-items">
  <div class="c-form-step__step-items__item-box current">STEP1</div>
  <div class="c-form-step__step-items__item-box">STEP2</div>
  <div class="c-form-step__step-items__item-box">完了</div>
</div>
```

また、ステップ式フォームの内容は以下のコードで囲まれた箇所が１つのステップとなります。

```html
<div class="c-form-step__wrapper-box">
</div>
```

各コードの数でステップの数を変えることができるので必要に応じて加減させてください。

## ステップ式フォームのデザインカスタマイズ用CSS

CSSはカスタマイズの追加CSSやテーマファイル内のstyle.cssに記述してください。

```css
/*-----------------------
ステップ式フォーム
------------------------*/

/* ボタンが非アクティブ（disabled）の時 */
.btn__link.disabled, .btn__link:disabled {
    opacity: .2;
}

/* ナビゲーションアイテム */
.c-form-step__step-items {
  display: flex;
  padding: 10px 0;
	justify-content: space-between;
}

.c-form-step__step-items::after {
  content: none !important;
}

/* ステップフォームの内容 */
label {
    display: flex;
    margin-bottom: .5rem;
    align-items: center;
}

.c-form-step__step-items__item-box{
    position: relative;
    width: 100%;
    height: 40px;
    text-align: center;
    padding: 5px;
    border: 1px solid #90caf8;
    color: #90caf8;
	line-height: 30px;
}
.c-form-step__step-items__item-box:nth-of-type(1):after,
.c-form-step__step-items__item-box:nth-of-type(2):after{
	content: "";
    position: absolute;
    top: 50%;
    left: calc(100% + 1px);
    transform: translateY(-50%);
    border: 20px solid transparent;
    border-left: 15px solid #90caf8;
	z-index: 998;
}
.c-form-step__step-items__item-box:nth-of-type(1):before,
.c-form-step__step-items__item-box:nth-of-type(2):before{
	content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    border: 19px solid transparent;
    border-left: 15px solid #fff3f3;
	z-index: 999;
}

.c-form-step__step-items__item-box.current {
    transition: 0.8s;
    background-color: #90caf8;
    color: #fff;
    border: 1px solid #90caf8;
}
.c-form-step__step-items__item-box:nth-of-type(1).current:before,
.c-form-step__step-items__item-box:nth-of-type(2).current:before{
	content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    border: 20px solid transparent;
    border-left: 15px solid #90caf8;
	z-index: 999;
}

.c-form-step__wrapper-box {
  display: none;
}

.c-form-step__wrapper-box.current {
  display: block;
}

.birth-year .form-control,
.birth-month .form-control,
.birth-day .form-control{
    display: inline-block;
    width: 15%;
}

/* ボタン */
.c-form-step .btn__link-previous {
  border: 1px solid #212529;
  border-radius: 30px;
  box-shadow: #4e5862 0px 1px 0px;
  font-size: 1.4rem;
  padding: 2px 12px 2px 20px;
}

.c-form-step .btn__link-previous::before {
  left: 10px;
  right: auto;
  border-top: 0;
  border-right: 0;
  border-left: 1px solid;
  border-bottom: 1px solid;
}
.btn_block {
    display: flex;
    justify-content: space-around;
}
.c-form-step .btn_block .btn__link-primary {
    padding: 10px 50px;
    border-radius: 5px;
    overflow: hidden;
    line-height: 1;
    margin: 1rem auto 0 !important;
    transition: .15s;
}
.c-form-step .btn__link-primary:hover {
    background-color: #fff;
    color: #4bc9c7;
    border: 1px solid #4bc9c7;
}

.wpcf7 form.sent .wpcf7-response-output {
    border-color: #f44336;
    font-size: 1.1rem;
}

/* モバイル対応 */
@media not all and (min-width: 600px){
	.birth-year .form-control, .birth-month .form-control, .birth-day .form-control {
    width: 25%;
}
	.birth-year .form-control{
    width: 35%;
	}
	.c-form-step .btn__link-primary {
    padding: 8px 30px;
    font-size: 1rem;
}
.wpcf7 .ajax-loader {
    position: absolute;
}
}
```

コメントアウト部分と、デベロッパーツールを用いて検証することで、どこのCSSがどう指定されているのかを確認できます。

必要に応じてカスタマイズしてみてください。

## ステップ式フォームを実現するためのjQuery

さて、ここからが今回のステップ式フォームを作る方法の要です。

とはいっても、これまでのHTMLとCSSと一緒にコピーして使うと問題なく動作するので安心してください。

以下がjQueryのコードです。

```js
function nextStep(){
  const stepWrappers = $('.c-form-step__wrapper-box'); //stepのフォーム要素
  const stepItem = $('.c-form-step__step-items__item-box'); //stepの数字要素

  // current classがどこにあるか調べる
  stepWrappers.each(function(i, stepWrapper){
      var stepWrapper_class = $(stepWrapper).attr('class');

      // currentを見つけたら、その要素のcurrentを削除し、次の要素にcurrentをつける
      if (stepWrapper_class.indexOf('current') !== -1) {
           $(stepWrappers[i]).removeClass('current');
           $(stepWrappers[i]).css('display','');
           $(stepItem[i]).removeClass('current');
           $(stepWrappers[i+1]).fadeIn('800');
           $(stepWrappers[i+1]).addClass('current');
           $(stepItem[i+1]).addClass('current');
          return false;
      }
  });
}
// 前の要素に戻る
function prevStep(){
  const stepWrappers = $('.c-form-step__wrapper-box'); //stepのフォーム要素
  const stepItem = $('.c-form-step__step-items__item-box'); //stepの数字要素

  // current classがどこにあるか調べる
  stepWrappers.each(function(i, stepWrapper){
      var stepWrapper_class = $(stepWrapper).attr('class');

      // currentを見つけたら、その要素のcurrentを削除し、次の要素にcurrentをつける
      if (stepWrapper_class.indexOf('current') !== -1) {
           $(stepWrappers[i]).removeClass('current');
           $(stepWrappers[i]).css('display','');
           $(stepItem[i]).removeClass('current');
           $(stepWrappers[i-1]).fadeIn('800');
           $(stepWrappers[i-1]).addClass('current');
           $(stepItem[i-1]).addClass('current');
          return false;
      }
  });
}

// フォームの入力要素が変更されたときに次へボタンを押せるようにする
function checkStepFormValue (){
  const stepCurrentInputs = $('.c-form-step__wrapper-box.current input, .c-form-step__wrapper-box.current select');
  let stepCurrentInputsValueCount = 0;
  stepCurrentInputs.each(function(i, input){
      if (input.type === 'radio' || input.type === 'checkbox') {
          if (input.checked === true) {
              $('.c-form-step__wrapper-box.current button,.c-form-step__wrapper-box.current input[type="button"]').prop('disabled',false);
              return false;
          }
      } else {
          if (input.value !== 0 && input.value !== '') {
              stepCurrentInputsValueCount++;
              if (stepCurrentInputsValueCount === stepCurrentInputs.length) {
                  $('.c-form-step__wrapper-box.current button,.c-form-step__wrapper-box.current input[type="button"]').prop('disabled',false);
                  return false;
              }
          }
      }
  });
}

// 次に進むボタンをdisabledにする
function stepFormButtonDisabled (){
  const stepButtons = $('.c-form-step__wraper-box__btn-next');
  stepButtons.each(function(i, button) {
      $(button).prop('disabled',true);
  });
};

stepFormButtonDisabled();

$('.c-form-step__wrapper-box input,.c-form-step__wrapper-box textarea, .c-form-step__wrapper-box select').on('click change',function(){
  checkStepFormValue();
});
```

`function nextStep()`と`function prevStep()`でそれぞれが付加された「次へ進む」と「前へ戻る」ボタンがクリックされたときの挙動が設定されています。

また、`function checkStepFormValue ()`と`function stepFormButtonDisabled ()`によってdisabledを付けたり消したりすることで、「次へ進む」ボタンの有効、無効を切り替えています。

### カスタムjsに記述すると動かない問題発生

はじめ、各投稿ごとに設定できるカスタムjsにjQueryのコードを記述していたのですが、jQueryが読み込まれていないというようなエラーが発生し、正常に動作しませんでした。

テーマ付属のjQueryの読み込みに関する設定をいじっても解消さないため、以下の対策を講じました。

1. jQueryを別のjsファイル（cf7step.js）に記述し、テーマファイル内にアップロード
2. 以下のコードをfooter.phpのbody終了タグの直前に記述

```php
<?php if ( is_single( 'contactform-jquery-step-form' ) ): ?>
  <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
  <script src="https://daiblog923.com/wp-content/themes/swell_child/cf7step.js"></script>
<?php endif; ?>
```

上記コードの内容としては、読み込みたい指定のページにのみjQuery、自作jsファイルの順で読み込ませるというものです。

この２ステップの対策を講じることで解消できたのでとりあえずは動作するステップ式フォームの完成です。

今後、なぜ動かなかったのかを検証していこうと思います。

## 終わりに

今回紹介したjQueryでのステップ式フォームの作り方以外に、ContactForm7の拡張プラグイン「[Contact Form 7 Multi-Step Forms](https://ja.WordPress.org/plugins/contact-form-7-multi-step-module/)」を使った固定ページで分けたステップ式フォームやJavaScriptライブラリ「[Swiper.js](https://swiperjs.com/)」と ContactForm7 を組み合わせたステップ式フォームなどもあります。

それぞれ使用感やできることが異なるのでクライアントの要望に応じて使い分けるのがおすすめです。

ちなみにこの記事のコードは今回のステップ式フォームの作り方は以下の記事を参考にしました。

[https://shortycolossus.honker.biz/WordPress/code-recipe-273.html](https://shortycolossus.honker.biz/WordPress/code-recipe-273.html)
