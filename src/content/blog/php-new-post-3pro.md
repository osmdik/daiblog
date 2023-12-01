---
title: "【PHP】WordPressでプラグインを使わず投稿記事から表示期間と表示件数を指定する方法"
description: "この記事ではWordPressで投稿記事から２記事取得し２ヶ月間表示するというような表示期間と表示件数を指定する方法を記事がないときの表記付きで解説しています。現時点でこの機能要件を満たすプラグインが無かったのでPHPを用いて作成してみました。"
pubDate: 2021-03-06
tags: ["PHP", "WordPress"]
---

とあるクライアントさんから、トップページに表示する新着情報について以下のような要望がありました。

お知らせの中から２記事表示させて！
２ヶ月経ったらそのお知らせ消えるようにして！
何もお知らせが無いときはその旨の文言を表示させて！

PHP に詳しい方がする場合なら、比較的簡単にプログラムできたと思います。

ただ僕の場合、WordPress テンプレートタグを少し見たことしかない PHP 超初心者だったのでかなり時間がかかりました。

なので備忘ログに残しておきます。

## 【結論】３つのプログラムを組み込めばだいたいできる

結論から言うと、次のことをプログラムすれば実装できます。

-   投稿記事の中から表示件数を２件にする
-   今日から２ヶ月前までの記事を取得
-   条件分岐で上の条件に当てはまる記事がないときの記述を追加

そして、完成したのがこちら ⇩

```php
<ul class="recent-posts">
<?php
　$args = array(
　　'posts_per_page' => 2, //2記事表示する
　　'date_query' => array(
　　　array(
　　　　'after' => date("Y-m-d H:i:s",strtotime("-1 month")), //投稿から1か月後
　　　　'before' => date('Y-m-d'),
　　　　'inclusive' => true //境界値を含む
			 ),
			),
		);
	$query = new WP_Query( $args );?>
<?php if($query -> have_posts()) : while($query -> have_posts()) : $query->the_post(); ?>
<li>
　<div class="">
	　<a class="" href="<?php the_permalink() ?>">新着情報</a>
	</div>
	<span class="date"><?php echo get_the_date('Y年n月j日'); ?></span>
　<span class="title">
	　<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a>
	</span>
</li>
<?php endwhile; else: ?>
<div class="">
	<p>最近のお知らせはありません</p>
</div>
<?php endif; ?>
<?php wp_reset_postdata(); ?>
</ul>
```

## 実装手順

僕は、以下の順番で実装しました。

1. ２ヶ月以内のお知らせが無いときの文言
2. 新着記事の中から２件表示
3. 投稿から２ヶ月経った消す

### 手順１．２ヶ月以内のお知らせが無いときの文言

２ヶ月以内のお知らせが無いときの文言の表示は、if 関数を使えば簡単に実装できます。

以下の部分です。

```php
<?php if($query -> have_posts()) : while($query -> have_posts()) : $query->the_post(); ?>
<li>
　<div class="">
	　<a class="" href="<?php the_permalink() ?>">新着情報</a>
	</div>
	<span class="date"><?php echo get_the_date('Y年n月j日'); ?></span>
　<span class="title">
	　<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a>
	</span>
</li>
<?php endwhile; else: ?>
<div class="">
	<p>最近のお知らせはありません</p>
</div>
<?php endif; ?>
```

１行目の、

```php
<?php if($query -> have_posts()) : while($query -> have_posts()) : $query->the_post(); ?>
```

で、`$query`が適用された記事を取得して、その内容をその下の HTML で表示させます。

11行目の

```php
<?php endwhile; else: ?>
```

で、記事が取得されなかった場合にこの下の HTML を表示。

`if (A) else (B)`で、条件を満たすなら A を表示し、条件を満たさないなら B を表示するプログラムを実装できるため、手順1の完成です。

条件分岐の if はかなり使うので使えるようになっておいて損はないし、if や else は高校とか大学で学んだことがある方もいると思うので比較的理解しやすいところだと思います。

### 手順２．新着記事の中から２件表示

`$args = array` 内に記述された条件を`$query` に入れて表示させる投稿を絞ります。

以下のコードで表示させる記事数を決めることができます。

```php
'posts_per_page' => 2,
```

数値を「-１」にすることで、投稿記事を全件表示させることができます。

### 手順３．投稿から２ヶ月経った消す

投稿から２ヶ月経ったら消すためには、手順２の条件に記事が投稿された期間の条件を付けたす必要があります。

以下のコードで実装可能です。

```php
'date_query' => array(
　　　array(
　　　　'before' => date('Y-m-d'),
　　　　'after' => date("Y-m-d H:i:s",strtotime("-2 month")),
　　　　'inclusive' => true //境界値を含む
			 ),
			),
```

`date('Y-m-d')`で今日の日付を取得します。

`strtotime("-2 month")` は、取得した`"Y-m-d H:i:s"`から、2 ヶ月前を指定します。

つまり、`before` と `after` の期間（境界も含む）に投稿された記事となります。

## まとめ：投稿記事から２記事取得し２ヶ月間表示する方法

投稿記事から２記事取得し２ヶ月間表示する方法は以下の手順で実装できます。

1. ２ヶ月以内のお知らせが無いときの文言
2. 新着記事の中から２件表示
3. 投稿から２ヶ月経った消す

複雑そうな機能実装も、機能を分解して整理することで比較的簡単に実装できます。

ググっても出てこない機能を初めて実装できた備忘ログでした。
