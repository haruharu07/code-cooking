---
title: モーダル&タブ切り替え
date: "2021-02-03"
emoji: 🧅
category: recipe
description: ウェブサイトでよく実装される「モーダル」と「タブ切り替え」を組み合わせた機能です。サイトの規模が大きくてコンテンツはたくさんあるけれどページ内はスッキリさせたい！といった際には、この機能をつかってメニューを構成するのもいいかもしれません。
---

ウェブサイトでよく実装される「モーダル」と「タブ切り替え」を組み合わせた機能です。サイトの規模が大きくてコンテンツはたくさんあるけれどページ内はスッキリさせたい！といった際には、この機能をつかってメニューを構成するのもいいかもしれません。

## コードとプレビュー

[[frame]]
| <iframe src="https://codesandbox.io/embed/modal-tab-switching-5q87q?fontsize=14&hidenavigation=1&theme=dark"></iframe>

## かいせつ

### まずはHTMLから

```html:title=index.html
<div class="container">

    <ul class="menu">
        <li class="menu__item" data-tab-menu="1">A</li>
        <li class="menu__item" data-tab-menu="2">B</li>
        <li class="menu__item" data-tab-menu="3">C</li>
    </ul>

    <!-- モーダル背景 -->
    <div class="modal-cover js-close"></div>

    <!-- モーダル内 -->
    <div class="modal">
    
        <ul class="tab-menu">
            <li class="tab-menu__item" data-tab="1">A</li>
            <li class="tab-menu__item" data-tab="2">B</li>
            <li class="tab-menu__item" data-tab="3">C</li>
        </ul>

        <div class="tab-contents" data-tab-contents="1">
            Aです。
        </div>
        <div class="tab-contents" data-tab-contents="2">
            Bです。
        </div>
        <div class="tab-contents" data-tab-contents="3">
            Cです。
        </div>

        <button class="js-close">とじる</button>

    </div>
    <!-- modal -->

</div>
<!-- container -->
```

👆 モーダルを開くメニューとモーダルのコンテンツをつくっています。モーダル内には、メニューの分だけのタブとコンテンツがあります。また、モーダルを開いたときに背景を敷きたいので、背景用に空のタグをおいています（今回はわかりやすいように独立させています）。

今回は、「メニュー」と「タブ」と「タブコンテンツ」に任意のデータ属性と値をつけておき、一致した属性値をもつ要素を表示させるなどして、モーダル&タブ切り替えをつくっていきたいと思います。

### つぎにCSS

```css:title=styles.css
/*メニュー・タブ*/
.menu,
.tab-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: 1px solid;
}
.menu__item,
.tab-menu__item {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  width: 100%;
  height: 40px;
  border-right: 1px solid;
  cursor: pointer;
}
.menu__item:last-child,
.tab-menu__item:last-child {
  border-right: none;
}

/*モーダル内*/
.modal {
  width: 90%;
  height: 300px;
  padding: 30px;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}
.modal.show {
  visibility: visible;
  opacity: 1;
  transition: all 0.3s;
}

.tab-menu__item.active {
  background-color: aqua;
}
.tab-contents {
  display: none;
  margin: 10px 0;
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

👆 メニューとモーダル内のタブ・コンテンツをお好みでつくったら、基本的に気をつけることは下記の2つです。

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

.tab-menu__item.active {
  background-color: aqua;
}
.tab-contents {
  display: none;
}
```

👆 ①モーダル部分を ```visibility: hidden;``` と ```opacity: 0;``` で透過して非表示にしておき、クリックしたときに追加するクラス __show__ に、表示させるプロパティをあてておきます。
また、モーダル内のタブがアクティブになっているとわかるように、選択されたときに追加するクラス __active__ をつくっておき、タブで切り替えるコンテンツは ```display: none;``` で非表示にしておきます。

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
    const getDataMenu = this.getAttribute("data-tab-menu");
    document
      .querySelector('[data-tab="' + getDataMenu + '"]')
      .classList.add("active");
    document.querySelector(
      '[data-tab-contents="' + getDataMenu + '"]'
    ).style.display = "block";
    document.querySelector(".modal-cover").style.display = "block";
    document.body.style.overflow = "hidden";
  });
}

//とじる
const modalClose = document.querySelectorAll(".js-close");
const tabMenuItem = document.querySelectorAll(".tab-menu__item");
const modalTabCont = document.querySelectorAll(".tab-contents");
for (let i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener("click", function () {
    modal.classList.remove("show");
    for (let i = 0; i < tabMenuItem.length; i++) {
      tabMenuItem[i].classList.remove("active");
    }
    for (let i = 0; i < modalTabCont.length; i++) {
      modalTabCont[i].style.display = "none";
    }
    document.querySelector(".modal-cover").style.display = "none";
    document.body.style.overflow = "scroll";
  });
}

//タブ切り替え
for (let i = 0; i < tabMenuItem.length; i++) {
  tabMenuItem[i].addEventListener("click", function () {
    for (let i = 0; i < tabMenuItem.length; i++) {
      tabMenuItem[i].classList.remove("active");
    }
    this.classList.add("active");
    for (let i = 0; i < modalTabCont.length; i++) {
        modalTabCont[i].style.display = "none";
    }
    const getDataTab = this.getAttribute("data-tab");
    document.querySelector(
      '[data-tab-contents="' + getDataTab + '"]'
    ).style.display = "block";
  });
}
```

ごちゃごちゃしてますが、ゆっくり順番にみていきます。

〜 __STEP1__ モーダル〜

```javascript:title=index.js
//モーダル
const modal = document.querySelector(".modal");
const menuItem = document.querySelectorAll(".menu__item");

for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener("click", function () {
    modal.classList.add("show");
    const getDataMenu = this.getAttribute("data-tab-menu");
    document
      .querySelector('[data-tab="' + getDataMenu + '"]')
      .classList.add("active");
    document.querySelector(
      '[data-tab-contents="' + getDataMenu + '"]'
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
const getDataMenu = this.getAttribute("data-tab-menu");
document.querySelector('[data-tab="' + getDataMenu + '"]').classList.add("active");
```

👆 クリックしたメニューのデータ属性の値を取得し、属性の値が一致したモーダル内のタブにクラス __active__ を追加します。

[[tech | 属性値の取得]]
| ***getAttribute*** メソッドをつかうと、属性の値を取得することができます。

[[note | NOTE]]
| ***querySelector*** メソッドでは、 ```querySelector('[data="〇〇"]')``` というふうに、属性をまるっと選択して取得することができます。

👆 今回は、〇〇の部分に定数を入れたいので、
```querySelector('[data-tab=" getDataMenu "]')``` としたいとこですが、文字列と定数等の間は __+__ マークでつなぐ規則があるので、```'+ getDataMenu +'``` を __" "__ の中に入れて、```querySelector('[data-tab="' + getDataMenu + '"]')``` となります。

```javascript:title=index.js
document.querySelector('[data-tab-contents="' + getDataMenu + '"]').style.display = "block";
```

👆 同じ要領で、モーダル内のタブコンテンツを表示させます。

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
const tabMenuItem = document.querySelectorAll(".tab-menu__item");
const modalTabCont = document.querySelectorAll(".tab-contents");

for (let i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener("click", function () {
    modal.classList.remove("show");
    for (let i = 0; i < tabMenuItem.length; i++) {
      tabMenuItem[i].classList.remove("active");
    }
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
const tabMenuItem = document.querySelectorAll(".tab-menu__item");
const modalTabCont = document.querySelectorAll(".tab-contents");
```

👆 とじるボタンとモーダル内のタブ・コンテンツを取得しています。
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
for (let i = 0; i < tabMenuItem.length; i++) {
    tabMenuItem[i].classList.remove("active");
}
for (let i = 0; i < modalTabCont.length; i++) {
    modalTabCont[i].style.display = "none";
}
```

👆 とじるボタンをクリックしたときに、いったんタブのアクティブ状態とタブコンテンツをリセットしておきたい（リセットしないと再びモーダルを開いたときにアクティブ状態がのこってしまう）ので、クラス __active__ をはずし、さらにタブコンテンツも非表示にします。

```javascript:title=index.js
document.querySelector(".modal-cover").style.display = "none";
document.body.style.overflow = "scroll";
```

👆 モーダルの背景（空のdivタグ）を非表示にして、モーダルがないときには、ページ内がスクロールできるように ```body``` に ```overflow: scroll;``` を追加します。

これで __STEP2__ は終了です👏👏

〜 __STEP3__ タブ切り替え〜

```javascript:title=index.js
//タブ切り替え
for (let i = 0; i < tabMenuItem.length; i++) {
  tabMenuItem[i].addEventListener("click", function () {
    for (let i = 0; i < tabMenuItem.length; i++) {
      tabMenuItem[i].classList.remove("active");
    }
    this.classList.add("active");
    for (let i = 0; i < modalTabCont.length; i++) {
        modalTabCont[i].style.display = "none";
    }
    const getDataTab = this.getAttribute("data-tab");
    document.querySelector(
      '[data-tab-contents="' + getDataTab + '"]'
    ).style.display = "block";
  });
}
```

```javascript:title=index.js
for (let i = 0; i < tabMenuItem.length; i++) {
  tabMenuItem[i].addEventListener("click", function () {
      //ここに処理を書いていきます
  });
}
```

👆 タブのメニューの分だけ処理を繰り返したいので、for文をつかいます。

```javascript:title=index.js
for (let i = 0; i < tabMenuItem.length; i++) {
    tabMenuItem[i].classList.remove("active");
}
this.classList.add("active");
```

👆 いったんタブのアクティブ状態を解除したあとに、クラス __active__ を追加します。

```javascript:title=index.js
for (let i = 0; i < modalTabCont.length; i++) {
    modalTabCont[i].style.display = "none";
}
const getDataTab = this.getAttribute("data-tab");
document.querySelector('[data-tab-contents="' + getDataTab + '"]').style.display = "block";
```

👆 いったんタブコンテンツを非表示にしたあとに、タブから取得した属性の値と一致したタブコンテンツを表示します。

以上です、おつかれさまでした👏👏👏

記述自体のボリュームがあり説明も長くなってしまいましたが、モーダル&タブ切り替えを自力でつくることができれば、JavaScriptの理解度は増しているのかなと思います。

ただ、どうしても長いので実戦ではコピペして使いまわしたいとこですね。笑