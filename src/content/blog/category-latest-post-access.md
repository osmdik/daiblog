---
title: "【WordPress】特定カテゴリーの最新記事へアクセスするリンクを作成する方法"
description: "この記事ではWordPressで特定カテゴリーの最新記事へアクセスするリンクを作成する方法について解説しています。標準では、カテゴリーの最新記事に直接アクセスする機能はないのfunction.phpを編集する必要があります。"
pubDate: 2021-03-12
tags: ["PHP", "WordPress"]
---

WordPress で特定のカテゴリーの最新記事へアクセスできるリンクを作成する方法を解説します。

作成したリンクはボタンリンクや画像リンクで使われることが多くあります。

クライアントによって、特定のカテゴリーの最新記事へアクセスさせたいが最新の投稿ブロックで実装できない仕様を求められる場合もあるので、備忘ログに残しました。

## PHP で latest を有効化

以下のコードを、function.php に貼り付けます。

function.php を編集する際は念のためバックアップを取っておきましょう。

```
function custom_category_redirect($request)
{
　　　if (isset($_GET['latest']) && isset($request->query_vars['category_name'])) {

        $latest = new WP_Query(array(
            'category_name' => $request->query_vars['category_name'],
            'posts_per_page' => 1,
        ));
        if ($latest->have_posts()) {
            wp_redirect(get_permalink($latest->post->ID));
            exit;
        }
    }
}
add_action('parse_request', 'custom_category_redirect');
```

latest でかつ特定のカテゴリーに属している場合、そのカテゴリーの中の最も新しい記事のパーマリンクにリダイレクトされるといった内容です。

細かなところは理解していなくとも、だいたいこんなことをやってるなくらいわかっていれば OK です。

なので、詳細は解説しません。

## 「?latest」をカテゴリー毎の URL の末尾につける

PHP に記述したことで、特定カテゴリーの最新記事へアクセスするリンクを作成する準備は完了しました。

最新記事へのリンクは、以下のアドレスとなります。

https://hoge.com/category/some-category/?latest

実際、当サイトの Code カテゴリー中の PHP カテゴリーの最新記事を表示させるとすると、

[https://daiblog923.com/code/php/?latest](https://daiblog923.com/code/php/?latest)

となります。

ただ、当サイトの function.php に有効化のコードを追加していないので、実際に見ることはできません。
