---
title: モーダル - 複数
date: "2021-02-02"
emoji: 🥔
category: recipe
description: メニューやボタン等をタップをしたときに、ほかのコンテンツにかぶさるような形で表示されるモーダルは、ページのコンテンツ量をおさえることができるので、とてもつかい勝手がよい機能です。
---

メニューやボタン等をタップをしたときに、ほかのコンテンツにかぶさるような形で表示されるモーダルは、ページのコンテンツ量をおさえることができるので、とてもつかい勝手がよい機能です。

## コードとプレビュー

[[frame]]
| <iframe src="https://codesandbox.io/embed/modal-q0oxq?fontsize=14&hidenavigation=1&theme=dark"></iframe>

## かいせつ

### まずはHTMLから

```html:title=index.html
<div class="container">

    <ul class="menu">
        <li class="menu__item" data-menu="1">A</li>
        <li class="menu__item" data-menu="2">B</li>
        <li class="menu__item" data-menu="3">C</li>
    </ul>

    <!-- モーダル背景 -->
    <div class="modal-cover js-close"></div>

    <!-- モーダル内 -->
    <div class="modal">

        <div class="tab-contents" data-contents="1">
          Aです。
        </div>
        <div class="tab-contents" data-contents="2">
          Bです。
        </div>
        <div class="tab-contents" data-contents="3">
          Cです。
        </div>

        <button class="js-close">とじる</button>
    </div>
    <!-- modal -->

</div>
<!-- container -->
```

👆 モーダルを開くメニューとモーダルのコンテンツをつくっています。モーダル内には、メニューの分だけのコンテンツがあります。また、モーダルを開いたときに背景を敷きたいので、背景用に空のタグをおいています（今回はわかりやすいように独立させています）。

今回は、「メニュー」と「モーダルコンテンツ」に任意のデータ属性と値をつけておき、一致した属性値をもつ要素を表示させるなどして、モーダルをつくっていきたいと思います。

### つぎにCSS

```css:title=styles.css
/*メニュー*/
.menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: 1px solid;
}
.menu__item {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  width: 100%;
  height: 50px;
  border-right: 1px solid;
  cursor: pointer;
}
.menu__item:last-child {
  border-right: none;
}

/*モーダル内*/
.modal {
  width: 90%;
  height: 300px;
  padding: 30px;
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 10;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}
.modal.show {
  visibility: visible;
  opacity: 1;
  transition: all 0.3s;
}
.tab-contents {
  display: none;
  margin: 0 0 10px;
}

/*モーダルの背景*/
.modal-cover {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
}
```

👆 メニューとモーダル内のコンテンツをお好みでつくったら、基本的に気をつけることは下記の2つです。

```css:title=styles.css
/*モーダル内*/
.modal {
  visibility: hidden;
  opacity: 0;
}
.modal.show {
  visibility: visible;
  opacity: 1;
}

.tab-contents {
  display: none;
}
```

👆 ①モーダル部分を ```visibility: hidden;``` と ```opacity: 0;``` で透過して非表示にしておき、クリックしたときに追加するクラス __show__ に、表示させるプロパティをあてておきます。

```css:title=styles.css
/*モーダルの背景*/
.modal-cover {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
}
```

👆 ②クリックしたときに追加するモーダルの背景をつくり、背景色や透明度を確認できたら、 ```display: none;``` で非表示にしておきます。

### さいごにJavaScript

```javascript:title=index.js
//モーダル
const modal = document.querySelector(".modal");
const menuItem = document.querySelectorAll(".menu__item");
for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener("click", function () {
    modal.classList.add("show");
    const getDataMenu = this.getAttribute("data-menu");
    document.querySelector(
      '[data-contents="' + getDataMenu + '"]'
    ).style.display = "block";
    document.querySelector(".modal-cover").style.display = "block";
    document.body.style.overflow = "hidden";
  });
}

//とじる
const modalClose = document.querySelectorAll(".js-close");
const modalTabCont = document.querySelectorAll(".tab-contents");
for (let i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener("click", function () {
    modal.classList.remove("show");
    for (let i = 0; i < modalTabCont.length; i++) {
      modalTabCont[i].style.display = "none";
    }
    document.querySelector(".modal-cover").style.display = "none";
    document.body.style.overflow = "scroll";
  });
}
```

ゆっくり順番にみていきます。

〜 __STEP1__ モーダル〜

```javascript:title=index.js
//モーダル
const modal = document.querySelector(".modal");
const menuItem = document.querySelectorAll(".menu__item");

for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener("click", function () {
    modal.classList.add("show");
    const getDataMenu = this.getAttribute("data-menu");
    document.querySelector(
      '[data-contents="' + getDataMenu + '"]'
    ).style.display = "block";
    document.querySelector(".modal-cover").style.display = "block";
    document.body.style.overflow = "hidden";
  });
}
```

```javascript:title=index.js
const modal = document.querySelector(".modal");
const menuItem = document.querySelectorAll(".menu__item");
```

👆 モーダルの要素とクリックするメニュー部分を取得しています。

[[note | NOTE]]
| JavaScriptを書いていく中で、なんども使用する要素等は変数や定数として箱の中に入れておくと便利です。

[[tech | 要素の取得]]
| 一つの要素を取得したいときは ***querySelector*** 、複数の要素を取得したいときは ***querySelectorAll*** をつかいます。

[要素の取得についてはこちら](/getting-elements)

```javascript:title=index.js
for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener("click", function () {
    //ここに処理を書いていきます
  });
}
```

👆 メニューの分だけ処理を繰り返したいので、 for文をつかいます。

[for文についてはこちら](/for)

[イベント処理についてはこちら](/event)

```javascript:title=index.js
modal.classList.add("show");
```

👆 メニューをクリックしたときにクラス __show__ を追加してモーダルを表示させます。

```javascript:title=index.js
const getDataMenu = this.getAttribute("data-menu");
document.querySelector('[data-contents="' + getDataMenu + '"]').style.display = "block";
```

👆 クリックしたメニューのデータ属性の値を取得し、属性の値が一致したモーダル内のコンテンツを表示させています。

[[tech | 属性値の取得]]
| ***getAttribute*** メソッドをつかうと、属性の値を取得することができます。

[[note | NOTE]]
| ***querySelector*** メソッドでは、 ```querySelector('[data="〇〇"]')``` というふうに、属性をまるっと選択して取得することができます。

👆 今回は、〇〇の部分に定数を入れたいので、
```querySelector('[data-contents=" getDataMenu "]')``` としたいとこですが、文字列と定数等の間は __+__ マークでつなぐ規則があるので、```'+ getDataMenu +'``` を __" "__ の中に入れて、```querySelector('[data-contents="' + getDataMenu + '"]')``` となります。

```javascript:title=index.js
document.querySelector(".modal-cover").style.display = "block";
document.body.style.overflow = "hidden";
```

👆 モーダルの背景（空のdivタグ）を表示させて、モーダルを表示しているときは、ページ内がスクロールされないように ```body``` に ```overflow: hidden;``` を追加します。

これで __STEP1__ は終了です👏

〜 __STEP2__ とじる〜

```javascript:title=index.js
//とじる
const modalClose = document.querySelectorAll(".js-close");
const modalTabCont = document.querySelectorAll(".tab-contents");
for (let i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener("click", function () {
    modal.classList.remove("show");
    for (let i = 0; i < modalTabCont.length; i++) {
      modalTabCont[i].style.display = "none";
    }
    document.querySelector(".modal-cover").style.display = "none";
    document.body.style.overflow = "scroll";
  });
}
```

```javascript:title=index.js
const modalClose = document.querySelectorAll(".js-close");
const modalTabCont = document.querySelectorAll(".tab-contents");
```

👆 とじるボタンとモーダル内のコンテンツを取得しています。
今回は、背景をクリックしてもとじるようにしたいので、```.js-close``` はボタンと背景の計ふたつあります。そのため、***querySelector*** ではなく ***querySelectorAll*** をつかいます。

```javascript:title=index.js
for (let i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener("click", function () {
      //ここに処理を書いていきます
  });
}
```

👆 とじるボタンの分だけ処理を繰り返したいので、for文をつかいます。

```javascript:title=index.js
modal.classList.remove("show");
```

👆 とじるボタンをクリックしたときにクラス __show__ を削除してモーダルを非表示にします。

```javascript:title=index.js
for (let i = 0; i < modalTabCont.length; i++) {
    modalTabCont[i].style.display = "none";
}
```

👆 とじるボタンをクリックしたときに、いったんコンテンツをリセットしておきたい（リセットしないと再びモーダルを開いたときに前回のコンテンツがのこってしまう）ので、 ```display: none;```  で非表示にします。

```javascript:title=index.js
document.querySelector(".modal-cover").style.display = "none";
document.body.style.overflow = "scroll";
```

👆 モーダルの背景（空のdivタグ）を非表示にして、モーダルがないときには、ページ内がスクロールできるように ```body``` に ```overflow: scroll;``` を追加します。

以上です、おつかれさまでした👏👏👏

今回はデータ属性を利用してモーダルをつくりましたが、他にもいくつか方法がありますので、いろいろやり方を試してみるのもいいかもしれませんね。