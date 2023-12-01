---
title: "【WordPress】特定カテゴリーの最新記事へアクセスするリンクを作成する方法"
description: "この記事ではWordPressで特定カテゴリーの最新記事へアクセスするリンクを作成する方法について解説しています。標準では、カテゴリーの最新記事に直接アクセスする機能はないのfunctions.phpを編集する必要があります。"
pubDate: 2021-03-12
tags: ["PHP", "WordPress"]
---

WordPress で特定のカテゴリーの最新記事へアクセスできるリンクを作成する方法を解説します。

作成したリンクはボタンリンクや画像リンクで使われることがあると思います。

特定のカテゴリーの最新記事へアクセスさせたいけど最新の投稿ブロックで実装できない仕様を求められる場合もあるので、備忘録として残しました。

## PHP で latest を有効化

以下のコードを、functions.php に貼り付けます。

functions.php を編集する際は念のためバックアップを取っておきましょう。

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

細かなところは理解していなくとも、だいたいこんなことをやってるんだな程度わかっていればよいです。

なので、詳細は割愛します。

## 「?latest」をカテゴリー毎の URL の末尾につける

PHP に記述したことで、特定カテゴリーの最新記事へアクセスするリンクを作成する準備は完了しました。

最新記事へのリンクは、以下のアドレスとなります。

https://hoge.com/category/some-category/?latest

例えば、example.comというサイトの Code カテゴリー中の PHP カテゴリーの最新記事を表示させるとすると、

[https://example.com/code/php/?latest](https://example.com/code/php/?latest)

となります。

以上、WordPress で特定のカテゴリーの最新記事へアクセスできるリンクを作成する方法でした。
