---
title: タブ切り替え
date: "2021-02-01"
emoji: 🥕
category: recipe
description: ウェブサイト制作の現場でよく実装する機能のひとつが「タブ切り替え」です。記述自体はそこまで複雑ではないのですが、すこし工夫が必要だったりもします。はじめのうちはコードを書きながら覚えていって、内容を理解したあとはつかいまわしちゃいましょう！
---

ウェブサイト制作の現場でよく実装する機能のひとつが「タブ切り替え」です。記述自体はそこまで複雑ではないのですが、すこし工夫が必要だったりもします。
はじめのうちはコードを書きながら覚えていって、内容を理解したあとはつかいまわしちゃいましょう！

## コードとプレビュー

[[frame]]
| <iframe src="https://codesandbox.io/embed/tab-switching-80n2j?fontsize=14&hidenavigation=1&theme=dark"></iframe>

---

## かいせつ

### まずはHTMLから

```html:title=index.html
<div class="tab-container">

      <!-- タブメニュー -->
      <ul class="tab-menu">
            <li class="tab-menu__item active">
                タブ1
            </li>
            <li class="tab-menu__item">
                タブ2
            </li>
            <li class="tab-menu__item">
                タブ3
            </li>
      </ul>

      <!-- タブコンテンツ -->
      <div class="tab-contents">
            <div class="panel show">
                コンテンツ1
            </div>
            <div class="panel">
                コンテンツ2
            </div>
            <div class="panel">
                コンテンツ3
            </div>
      </div>

</div><!-- tab-container -->
```

👆 3つのメニュー（タブ）と、表示するコンテンツ部分をつくっています。最初に表示しておきたいメニューとコンテンツにはそれぞれ ```active``` と ```show``` のクラス名をつけています。

### つぎにCSS

```css:title=styles.css
/*タブメニュー*/
.tab-menu {
    margin: 0;
    padding: 0;
    display: flex;
    border: 1px solid #2abef7;
}
.tab-menu__item {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.33%;
    height: 50px;
    background-color: #fff;
    color: #2abef7;
}
.tab-menu__item:not(:last-child) {
    border-right: 1px solid #2abef7;
}
.tab-menu__item.active {
    background-color: #2abef7;
    color: #fff;
}
.tab-menu__item:hover {
    cursor: pointer;
}

/*タブコンテンツ*/
.panel {
    display: none;
    padding: 10px;
}
.panel.show {
    display: block;
    animation-name: fade-in;
    animation-duration: 0.3s;
    /* or
    animation: fade-in .3s; */
}

/*アニメーション*/
@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
```

メニューとコンテンツ部分をお好みでつくったら、基本的に気をつけることは下記の2つです。

```css:title=styles.css
.tab-menu__item.active {
    background-color: #2abef7; /*背景を青*/
    color: #fff;
}
```

👆 ①アクティブ状態（選択している部分）になっているメニューの色を変えます。

```css:title=styles.css
/*タブコンテンツ*/
.panel {
    display: none; /*非表示*/
}
.panel.show {
    display: block; /*表示*/
}
```

👆 ②コンテンツ部分はいちどすべてを非表示にしておき、```.show``` に ```display:block``` を入れておきます。

[[note | NOTE]]
| 後のJavaScriptのイベント処理で、この ```active``` と ```show``` のクラスを追加・削除したりすることで「タブ切り替え」を実現できます。

また、タブを切り替える際に、切り替わったことがわかるように、ちょっとしたアニメーションもつけておくといいかもしれません！JavaScriptではjQueryのようにfadeInメソッドがつかえないので、今回はCSSでアニメーションをつくっています。
アニメーション（CSS）については、こちらの<a href="https://qiita.com/7968/items/1d999354e00db53bcbd8" target="_blank">記事</a>が参考になります。

### さいごにJavaScript

```javascript:title=index.js
const tabMenu = document.querySelectorAll(".tab-menu__item");
const tabPanel = document.querySelectorAll(".panel");

for (let i = 0; i < tabMenu.length; i++) {
    tabMenu[i].addEventListener("click", () => {
        const menuParent = tabMenu[i].parentNode;
        const panelParent = tabPanel[i].parentNode;
        const tabMenuAll = menuParent.querySelectorAll(".tab-menu__item");
        const tabPanelAll = panelParent.querySelectorAll(".panel");

        for (let i = 0; i < tabMenuAll.length; i++) {
            tabMenuAll[i].classList.remove("active");
            tabPanelAll[i].classList.remove("show");
        }

        tabMenu[i].classList.add("active");
        tabPanel[i].classList.add("show");
    });
}
```

ゆっくり順番にみていきます。

```javascript:title=index.js
const tabMenu = document.querySelectorAll(".tab-menu__item");
const tabPanel = document.querySelectorAll(".panel");
```

👆 クリックする「メニュー（タブ）」と、表示する「コンテンツ」部分を定数に入れておきます。

[[note | NOTE]]
| JavaScriptを書いていく中で、なんども使用する要素等は変数や定数として箱の中に入れておくと便利です。

[[tech | 要素の取得]]
| 一つの要素を取得したいときは ***querySelector*** 、複数の要素を取得したいときは ***querySelectorAll*** をつかいます。

```javascript:title=index.js
const tabMenu = document.querySelectorAll(".tab-menu__item");
const tabPanel = document.querySelectorAll(".panel");

  〇〇.addEventListener("click", () => {

  });

```

👆 イベントリスナーを登録して、関数を書いていきます。

[[note | NOTE]]
| 関数は ```() => {///ここ///}``` に書いていきます。
| または ```function() {///ここ///}``` でもOK!


```javascript:title=index.js
const tabMenu = document.querySelectorAll(".tab-menu__item");
const tabPanel = document.querySelectorAll(".panel");

for (let i = 0; i < tabMenu.length; i++) {
    tabMenu[i].addEventListener("click", () => {

  });
}
```

👆 メニューの数の分だけ（3回）処理を繰り返したいので、 for文をつかいます。

[[tech | for文]]
| JavaScriptで頻繁に使用する繰り返しの処理です！

[[tech | 中身を個別にみてみると...]]
| ① ```let i = 0;``` 👈 初期値を0に設定
| ② ```tabMenu.length``` 👈 要素の個数を JavaScriptのプロパティ ***length*** を使って取得
| ③ ```i < tabMenu.length;``` 👈 変数 ***i*** の数字が取得した要素の個数を超えないように設定
| ④ ```i++``` 👈 1個づつ増やしていく

[[note | NOTE]]
| __[ ]__ をつけて配列の中身にアクセス！

```javascript:title=index.js
const tabMenu = document.querySelectorAll(".tab-menu__item");
const tabPanel = document.querySelectorAll(".panel");

for (let i = 0; i < tabMenu.length; i++) {
    tabMenu[i].addEventListener("click", () => {

        //直近の親要素を取得
        const menuParent = tabMenu[i].parentNode;
        const panelParent = tabPanel[i].parentNode;

        //上で取得した親要素を指定したうえで、改めて「メニュー（タブ）」と「コンテンツ」を取得
        const tabMenuAll = menuParent.querySelectorAll(".tab-menu__item");
        const tabPanelAll = panelParent.querySelectorAll(".panel");

    });
}
```

[[note | NOTE]]
| 複数のタブ切り替えコンテンツに対応させるために、クリックしたらメニューとコンテンツの親要素を取得したうえで、そこから再度メニューとコンテンツを取得します。

[[tech | 親要素の取得]]
| JavaScriptで直近の親要素を取得する方法は、```closest()``` メソッドがありますが、IEでサポートされていないので（※2021年2月現在）、上記では ```parentNode``` プロパティを使用しています。

```javascript:title=index.js
const tabMenu = document.querySelectorAll(".tab-menu__item");
const tabPanel = document.querySelectorAll(".panel");

for (let i = 0; i < tabMenu.length; i++) {
  tabMenu[i].addEventListener("click", () => {

    const menuParent = tabMenu[i].parentNode;
    const panelParent = tabPanel[i].parentNode;
    const tabMenuAll = menuParent.querySelectorAll(".tab-menu__item");
    const tabPanelAll = panelParent.querySelectorAll(".panel");

    //初回のクリックでいったんアクティブ状態を解除
    for (let i = 0; i < tabMenuAll.length; i++) {
        tabMenuAll[i].classList.remove("active");
        tabPanelAll[i].classList.remove("show");
    }

  });
}
```

👆 クリックしたらメニューとコンテンツについているクラスを削除。

```javascript:title=index.js
const tabMenu = document.querySelectorAll(".tab-menu__item");
const tabPanel = document.querySelectorAll(".panel");

for (let i = 0; i < tabMenu.length; i++) {
    tabMenu[i].addEventListener("click", () => {

        const menuParent = tabMenu[i].parentNode;
        const panelParent = tabPanel[i].parentNode;
        const tabMenuAll = menuParent.querySelectorAll(".tab-menu__item");
        const tabPanelAll = panelParent.querySelectorAll(".panel");

        for (let i = 0; i < tabMenuAll.length; i++) {
            tabMenuAll[i].classList.remove("active");
            tabPanelAll[i].classList.remove("show");
        }

        //クラスを追加
        tabMenu[i].classList.add("active");
        tabPanel[i].classList.add("show");
    });
}
```

👆 クラスを追加して、メニューとコンテンツを表示させればOK！

以上です、おつかれさまでした👏👏👏