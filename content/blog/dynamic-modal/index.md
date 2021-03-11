---
title: モーダル - 動的対応
date: "2021-02-05"
emoji: 🥦
category: recipe
description: JavaScriptで複数のモーダルを設置するときにはdata属性を使用する方法が便利ですが、モーダルで表示したいコンテンツが動的で入ってくるなど、あらかじめdata属性を割り当てておくのは少々めんどうな場面があったりもします。やり方はいろいろあるかとは思いますが、今回はclass属性で対応できる動的コンテンツのモーダル表示をやっていきます。
---

JavaScriptで複数のモーダルを設置するときにはdata属性を使用する方法が便利ですが、モーダルで表示したいコンテンツが動的で入ってくるなど、あらかじめdata属性を割り当てておくのは少々めんどうな場面があったりもします。
やり方はいろいろあるかとは思いますが、今回はclass属性で対応できる動的コンテンツのモーダル表示をやっていきます。

## コードとプレビュー

[[frame]]
| <iframe src="https://codesandbox.io/embed/dynamic-modal-uz0g8?fontsize=14&hidenavigation=1&theme=dark"></iframe>

---

## かいせつ

### まずはHTMLから

```html:title=index.html
<div class="card-grid">

    <!-- 動的で入っている想定 -->
    <div class="card">
        <div class="card__content">
        <!-- 画像など何かしらのコンテンツが入る -->
        </div>
        <div class="card-modal">
            <p>カード1</p>
            <button class="card-modal__close js-close">
                とじる
            </button>
        </div>
    </div>

</div>
<!-- card-grid -->
```

👆 JavaScriptやphp等をつかって動的で ```card``` というクラス名がついた要素を表示させているものとします。

今回は、この ```.card``` をクリックしたら、その要素内に ```.card-modal``` を表示させていきます。

### つぎにCSS

```css:title=styles.css
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}
.card {
  width: 100%;
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}
.card__content {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  cursor: pointer;
}
.card-modal {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.card-modal.active {
  display: block;
}
.card-modal__close {
  margin-top: 10px;
  cursor: pointer;
}
```

カードレイアウトをお好みでつくったら、基本的に気をつけることは下記のみです。

```css:title=styles.css
.card-modal {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  display: none; /*いったん非表示にしておく*/
}
.card-modal.active {
  display: block; /*クリックされたら表示*/
}
```

👆 モーダル内のコンテンツはいったん非表示にしておき、```.active``` に ```display:block``` を入れておきます。

### さいごにJavaScript

```javascript:title=index.js
const cardItem = document.querySelectorAll(".card");
const cardClose = document.querySelectorAll(".js-close");

for (let i = 0; i < cardItem.length; i++) {
  const cardModal = cardItem[i].children;
  cardItem[i].addEventListener("click", function () {
    cardModal[1].classList.add("active");
  });
  cardClose[i].addEventListener("click", function (e) {
    e.stopPropagation();
    cardModal[1].classList.remove("active");
  });
}
```

ゆっくり順番にみていきます。

```javascript:title=index.js
const cardItem = document.querySelectorAll(".card");
const cardClose = document.querySelectorAll(".js-close");
```

👆 クリックする要素と、閉じるボタンを定数に入れておきます。

[[note | NOTE]]
| JavaScriptを書いていく中で、なんども使用する要素等は変数や定数として箱の中に入れておくと便利です。

[[tech | 要素の取得]]
| 一つの要素を取得したいときは ***querySelector*** 、複数の要素を取得したいときは ***querySelectorAll*** をつかいます。

[要素の取得についてはこちら](/getting-elements)

```javascript:title=index.js
for (let i = 0; i < cardItem.length; i++) {

}
```

👆 動的要素の分だけ処理を繰り返したいので、 for文をつかいます。

[for文についてはこちら](/for)

```javascript:title=index.js
for (let i = 0; i < cardItem.length; i++) {
    const cardModal = cardItem[i].children;
}
```

[[tech | 子要素の取得]]
| JavaScriptのプロパティ ***children*** をつかうと子要素を取得することができます。

試しに下記のように ```console.log()``` で確認するとイメージが湧きやすいかと思います。

```html:title=index.html
<ul>
    <li>テスト</li>
    <li>テスト</li>
    <li>テスト</li>
</ul>

<script>

    //すべてのli要素が取得されます
    const ulChild = document.querySelector("ul").children;
    console.log(ulChild);

</script>
```

コードにもどります。

```javascript:title=index.js
for (let i = 0; i < cardItem.length; i++) {
  const cardModal = cardItem[i].children;

  //モーダル表示
  cardItem[i].addEventListener("click", function () {
    cardModal[1].classList.add("active");
  });

}
```

👆 イベントリスナーを登録して、関数を書いていきます。

[イベント処理についてはこちら](/event)

[[note | NOTE]]
| __children プロパティ__ で取得した要素にはインデックス番号が付与されています。__[ ]__ をつかってインデックス番号にアクセス！

今回、```active``` を追加したい要素( ```.card-modal``` )のインデックス番号は __1__ なので ```cardModal[1]``` としています。

```javascript:title=index.js
for (let i = 0; i < cardItem.length; i++) {
  const cardModal = cardItem[i].children;

　//モーダル表示
  cardItem[i].addEventListener("click", function () {
    cardModal[1].classList.add("active");
  });

 //モーダル非表示
  cardClose[i].addEventListener("click", function (e) {
    e.stopPropagation();
    cardModal[1].classList.remove("active");
  });

}
```

👆 閉じるボタンをクリックで、先ほど追加した ```active``` をはずします。

[[note | NOTE]]
| 親子関係になっている要素の両方でイベント処理を実行すると、__イベントの伝搬__ というものがおこります。```addEventListener()``` のデフォルトでは、子要素 → 親要素 の順に処理が続いていくので、最終的には親のイベント処理が実行されることになります。

[[tech | イベントの伝搬を防ぐ]]
| ```stopPropagation()``` をつかってイベントの伝搬を防ぐことができます。

[[note | NOTE]]
| ```function(e){...}``` の __e__ はイベントオブジェクトのことです。イベント処理の記述の中で、```console.log(e)``` を実行すると中身を確認することができます。

以上です、おつかれさまでした👏👏👏

今回のモーダルでは、__children プロパティ__ をつかってインデックス番号から要素を取得しました。インデックス番号をつかって要素を取得すると、デザインの変更等であとから要素が追加された場合に、これまで取得していた要素のインデックス番号が変わる可能性もあるので、そこは気にかける必要があります。

まだまだベターな方法はありそうですが、data属性をつかわずにモーダルを実装できるのは便利ですね！