---
title: イベント処理
date: "2021-02-03"
emoji: 🥂
category: basic
description: JavaScriptではよくイベント処理の記述をつかいます。たとえば、メニューアイコンをクリックしたら、メニューのリストを表示させたり、ある一定以上ページをスクロールしたら、要素を表示させたりなど。さまざまな機能を実装するうえで必要になってくる記述なので、ぜひ覚えておきたいです。
---

JavaScriptではよくイベント処理の記述をつかいます。たとえば、メニューアイコンをクリックしたら、メニューのリストを表示させたり、ある一定以上ページをスクロールしたら、要素を表示させたりなど。さまざまな機能を実装するうえで必要になってくる記述なので、ぜひ覚えておきたいです。

[[do | 今回やること]]
| ```button``` というクラス名がついた要素を取得して、取得した要素をクリックしたら ```active``` というクラス名をつける。

---

## 実際にみていきます

### こんなHTMLがあるものとします

```html:title=index.html
<button class="button">ボタン</button>
```

### まずはセレクターで要素の取得

```javascript:title=index.js
const btn = document.querySelector(".button");
```

👆 取得した要素を定数 ```btn``` のなかに入れています。

[[note | NOTE]]
| このときに ```console.log(btn);``` と記述して、デベロッパーツールのConsole画面をみてみると、要素が取得されているのがわかるかと思います。

### イベント処理を書いていく

今回は、要素をクリックしたら ```active``` というクラス名を入れます。

```javascript:title=index.js
btn.addEventListener("click", function () {
    this.classList.add("active");
  });
```

[[tech | イベント処理]]
| ```addEventListener()``` メソッドを使用することで、イベント処理を実行することができます。

```javascript:title=index.js
対象の要素.addEventListener("イベントの種類, 関数");
```

[[note | NOTE]]
| JavaScript ではさまざまなイベントが用意されています。たとえば、カーソルが要素の上にのったときの ```mouseover``` やスクロールした際の ```scroll``` などです。

関数は __処理を実行する記述__ というイメージでよいかと思います。今回でいうと「 ```active``` というクラス名をつける」がそれにあたります。

[[note | NOTE]]
| 関数は ```function() {///ここ///}``` に書いていきます。
| または ```() => {///ここ///}``` でもOK!

### こんな書き方も

```javascript:title=index.js
btn.addEventListener("click", activate);

function activate() {
  this.classList.add("active");
}
```

👆 あらかじめ __activate__ という関数をつくっておいて、引数を指定するところに、つくっておいた関数名をいれています。

以上です、おつかれさまでした👏👏👏