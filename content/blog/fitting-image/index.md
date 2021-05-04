---
title: フィッティングイメージ
date: "2021-05-04"
emoji: 🥙
category: recipe
description: 画像を縦幅と横幅の比率を保ったまま要素いっぱいに広げることができれば、見た目がきれいになります。
---

画像を縦幅と横幅の比率を保ったまま要素いっぱいに広げることができれば、見た目がきれいになります。

[[note | NOTE]]
| CSSには要素の中身を調整する「object-fit」という便利なプロパティがありますが、ブラウザによってはサポートされていません（※2021年5月現在）。

## かいせつ

### まずはHTMLから

```html:title=index.html
<div class="card js-fit-img">
    <img src="./images/〇〇.jpg" alt="画像が入ります" />
</div>
```

👆 フィットさせたい画像（imgタグ）に親要素をつけておきます。

### つぎにCSS

```css:title=styles.css
.card {
    width: 200px;
    height: 200px;
}
```

👆 親要素を任意のサイズに調整します（このサイズで画像がフィットします）。

### さいごにJavaScript

```javascript:title=index.js
const fitImg = document.querySelectorAll(".js-fit-img");

for (let i = 0; i < fitImg.length; i++) {
  const img = fitImg[i].querySelector("img");
  const src = img.getAttribute("src");
  const parent = img.parentNode;
  parent.style.backgroundImage = 'url("' + src + '")';
  parent.style.backgroundRepeat = "no-repeat";
  parent.style.backgroundPosition = "center";
  parent.style.backgroundSize = "cover";
  img.style.display = "none";
}
```

ゆっくり順番にみていきます。

```javascript:title=index.js
const fitImg = document.querySelectorAll(".js-fit-img");
```

👆 imgタグの親要素を取得します。

[[note | NOTE]]
| JavaScriptを書いていく中で、なんども使用する要素等は変数や定数として箱の中に入れておくと便利です。

[[tech | 要素の取得]]
| 一つの要素を取得したいときは ***querySelector*** 、複数の要素を取得したいときは ***querySelectorAll*** をつかいます。

[要素の取得についてはこちら](/getting-elements)

```javascript:title=index.js
for (let i = 0; i < fitImg.length; i++) {

}
```

👆 画像の分だけ処理を繰り返したいので、for文をつかいます。

[for文についてはこちら](/for)

```javascript:title=index.js
for (let i = 0; i < fitImg.length; i++) {
  const img = fitImg[i].querySelector("img");
  const src = img.getAttribute("src");
  const parent = img.parentNode;
}
```

👆 imgタグ、src属性、imgタグの親要素を取得しています。

```javascript:title=index.js
for (let i = 0; i < fitImg.length; i++) {
  const img = fitImg[i].querySelector("img");
  const src = img.getAttribute("src");
  const parent = img.parentNode;

  parent.style.backgroundImage = 'url("' + src + '")';
  parent.style.backgroundRepeat = "no-repeat";
  parent.style.backgroundPosition = "center";
  parent.style.backgroundSize = "cover";
  img.style.display = "none";
}
```

👆 取得した親要素に対してスタイルをあてていきます。使用するプロパティはcssでいうところの```background-image```, ```background-repeat```, ```background-size```です。```background-size```を __cover__ にすると要素が幅いっぱいに表示されます。

最後にimgタグを非表示にしたら終了です。

以上です、おつかれさまでした👏👏👏