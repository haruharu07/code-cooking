---
title: くり返し（ループ）
date: "2021-02-04"
emoji: 🧂
category: basic
description: JavaScriptでは、処理をくり返すという場面がよくあります。そのときに必要なのが、forを使った構文です。forにはたくさんの文や宣言がありますが、ここでは実務でよく使う基本的な記述のみをみていきます。
---

JavaScriptでは、処理をくり返すという場面がよくあります。そのときに必要なのが、__for__ を使った構文です。__for__ にはたくさんの文や宣言がありますが、ここでは実務でよく使う基本的な記述のみをみていきます。

[[do | 今回やること]]
| ```menu__item``` というクラス名がついた要素をすべて取得して、それぞれの要素をクリックしたら ```active``` というクラス名をつける。

---

## 実際にみていきます

### こんなHTMLがあるものとします

```html:title=index.html
<nav>
    <ul class="menu">
        <li class="menu__item">アイテム</li>
        <li class="menu__item">アイテム</li>
        <li class="menu__item">アイテム</li>
    </ul>
</nav>
```

### まずはセレクターで要素の取得

```javascript:title=index.js
const item = document.querySelectorAll(".menu__item");
```

👆 取得した要素を定数 ```item``` のなかに入れています。

[[note | NOTE]]
| このときに ```console.log(item);``` と記述して、デベロッパーツールのConsole画面をみてみると、3つの要素が取得されているのがわかるかと思います。

### くり返しの処理を書いていく

今回は、それぞれの要素をクリックしたら ```active``` というクラス名を入れたいので、「クリックしたら ```active``` を追加」という処理を3回くり返します。

```javascript:title=index.js
for (let i = 0; i < item.length; i++) {
    //ここに処理を書いていく
}
```

👆 こちらがくり返しの文です。

[[tech | 中身を個別にみてみると...]]
| ① ```let i = 0;``` 👈 初期値を0に設定
| ② ```item.length``` 👈 要素の個数を JavaScriptのプロパティ ***length*** を使って取得
| ③ ```i < item.length;``` 👈 変数 ***i*** の数字が取得した要素の個数を超えないように設定
| ④ ```i++``` 👈 1個づつ増やしていく

[[note | NOTE]]
| 配列の要素には、__インデックス番号（0から始まる）__ というものが割り当てられていて、くり返しの処理はそれを利用します。上記の場合だと、 0 → 1 → 2 と進み、 __2__ を超えないところでストップするような記述にしてあるので、結果的に同じ動作を __3__ 回くり返す設定になります。

```javascript:title=index.js
for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function () {
    this.classList.add("active");
  });
}
```

👆 ```item（.menu__item）``` をクリックしたら ```active``` を追加

[[note | NOTE]]
| __[ ]__ をつけて配列の中身にアクセス！

[[note | NOTE]]
| ```i``` は __0__ → __1__ → __2__ というふうに、インデックス番号が流れているイメージをもっておくと分かりやすいかもしれません。

以上です、おつかれさまでした👏👏👏

ちなみに、今回の __for文__ は「タブ切り替え」機能をつくる際に使ったりします。取得する要素がひとつだけでくり返す必要がない場合は、***querySelector*** で要素を取得して、***for()*** の記述を外せばよいという感じですね🙌