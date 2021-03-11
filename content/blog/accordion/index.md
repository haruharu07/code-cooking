---
title: アコーディオン
date: "2021-02-04"
emoji: 🍠
category: recipe
description: 開閉式でコンテンツを表示・非表示できるアコーディオンは、見た目もよく、ユーザーも直感的に操作がしやすいです。「よくある質問」のQ&Aなどでつかわれる印象がありますね。
---

開閉式でコンテンツを表示・非表示できるアコーディオンは、見た目もよく、ユーザーも直感的に操作がしやすいです。「よくある質問」のQ&Aなどでつかわれる印象がありますね。

## コードとプレビュー

[[frame]]
| <iframe src="https://codesandbox.io/embed/accordion-nkt5y?fontsize=14&hidenavigation=1&theme=dark"></iframe>

## かいせつ

### まずはHTMLから

```html:title=index.html
<div class="container">

    <dl class="acc-data">
        <dt class="acc-data__title js-acc-title">
            タイトル
        </dt>
        <dd class="acc-data__text">
            テキスト
        </dd>
    </dl>
    <dl class="acc-data">
        <dt class="acc-data__title js-acc-title">
            タイトル
        </dt>
        <dd class="acc-data__text">
            テキスト
        </dd>
    </dl>

</div>
<!-- container -->
```

👆 dlタグを使用してタイトルとテキスト部分をそれぞれつくっています。

今回は、タイトルをクリックしたときに、テキスト部分のコンテンツを表示させていきます。

### つぎにCSS

```css:title=styles.css
.acc-data {
  width: 300px;
  border-bottom: 1px solid #555;
  margin: 0 auto;
}
.acc-data:first-child {
  border-top: 1px solid #555;
}
.acc-data__title {
  background-color: #fff;
  color: #555;
  padding: 10px 10px 10px;
  position: relative;
}
.acc-data__title:hover {
  opacity: 0.8;
  cursor: pointer;
}

/*開閉アイコン*/
.acc-data__title::before,
.acc-data__title::after {
  display: block;
  content: "";
  width: 12px;
  height: 2px;
  background-color: #555;
  position: absolute;
  top: 50%;
  right: 20px;
  transition: all 0.3s;
}
.acc-data__title::after {
  transform: rotate(90deg);
}

/*アクティブ状態の開閉アイコン*/
.acc-data__title.active::before {
  opacity: 0;
}
.acc-data__title.active::after {
  transform: rotate(0deg);
}

/*開いて表示させるコンテンツ*/
.acc-data__text {
  color: #555;
  height: 0;
  min-height: 0;
  opacity: 0;
  transition: all 0.3s;
  padding: 0 10px;
}
.acc-data__text.open {
  min-height: 60px;
  opacity: 1;
  padding: 0 10px 10px;
}
```

お好みでタイトルとコンテンツをつくったら、基本的に気をつけることは下記の2つです。

```css:title=styles.css
/*アクティブ状態の開閉アイコン*/
.acc-data__title.active::before {
  opacity: 0;
}
.acc-data__title.active::after {
  transform: rotate(0deg);
}
```

👆 ①コンテンツを開いたときは横向きだった線を透過して非表示にし、縦向きだった線を横向きにします。 ```transition``` プロパティで速度を調整！

```css:title=styles.css
/*開いて表示させるコンテンツ*/
.acc-data__text {
  color: #555;
  height: 0;
  min-height: 0;
  opacity: 0;
  transition: all 0.3s;
  padding: 0 10px;
}
.acc-data__text.open {
  min-height: 60px;
  opacity: 1;
  padding: 0 10px 10px;
}
```

👆 ②```height: 0;``` と ```opacity: 0;``` でコンテンツを非表示にしておき、コンテンツを表示するときは ```min-height: 〇〇;``` あるいは ```height: auto;``` を指定します。

### さいごにJavaScript

```javascript:title=index.js
const accTitle = document.querySelectorAll(".js-acc-title");

for (let i = 0; i < accTitle.length; i++) {
  const accText = accTitle[i].nextElementSibling;
  accTitle[i].addEventListener("click", function () {
    accTitle[i].classList.toggle("active");
    accText.classList.toggle("open");
  });
}
```

ゆっくり順番にみていきます。

```javascript:title=index.js
const accTitle = document.querySelectorAll(".js-acc-title");
```

👆 クリックするタイトル部分を取得しています。

[[note | NOTE]]
| JavaScriptを書いていく中で、なんども使用する要素等は変数や定数として箱の中に入れておくと便利です。

[[tech | 要素の取得]]
| 一つの要素を取得したいときは ***querySelector*** 、複数の要素を取得したいときは ***querySelectorAll*** をつかいます。

[要素の取得についてはこちら](/getting-elements)

```javascript:title=index.js
for (let i = 0; i < accTitle.length; i++) {

}
```

👆 タイトルの分だけ処理を繰り返したいので、 for文をつかいます。

[for文についてはこちら](/for)

```javascript:title=index.js
for (let i = 0; i < accTitle.length; i++) {
    const accText = accTitle[i].nextElementSibling;
}
```

[[tech | 兄弟要素の取得]]
| JavaScriptのプロパティ ***nextElementSibling*** をつかうと、隣り合った要素を取得することができます。

今回でいうと、タイトル部分のdtタグに隣接したddタグを取得しています。

```javascript:title=index.js
for (let i = 0; i < accTitle.length; i++) {
  const accText = accTitle[i].nextElementSibling;

  accTitle[i].addEventListener("click", function () {
      //ここに処理を書いていく
  });

}
```

👆 イベントリスナーを登録して、関数を書いていきます。

[イベント処理についてはこちら](/event)

```javascript:title=index.js
for (let i = 0; i < accTitle.length; i++) {
  const accText = accTitle[i].nextElementSibling;

  accTitle[i].addEventListener("click", function () {
      accTitle[i].classList.toggle("active");
      accText.classList.toggle("open");
  });

}
```

👆 ```toggle``` をつかって、タイトル部分に ```active``` 、コンテンツ部分に ```open``` を設置したらOK!

以上です、おつかれさまでした👏👏👏