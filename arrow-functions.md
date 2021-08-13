EN

- <a href="https://ar.javascript.info/arrow-functions" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="arrow-functions.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/arrow-functions" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- arrow-functions" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/arrow-functions" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- <a href="https://ko.javascript.info/arrow-functions" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="arrow-functions%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/arrow-functions" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/arrow-functions" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<span class="share-icons__title">Share</span>2Farrow-functions" rel="nofollow" &gt;2Farrow-functions عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" class="breadcrumbs__link"><span>Advanced working with functions</span></a></span>

1st February 2021

# Arrow functions revisited

Let’s revisit arrow functions.

Arrow functions are not just a “shorthand” for writing small stuff. They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function that’s executed somewhere else.

For instance:

- `arr.forEach(func)` – `func` is executed by `forEach` for every array item.
- `setTimeout(func)` – `func` is executed by the built-in scheduler.
- …there are more.

It’s in the very spirit of JavaScript to create a function and pass it somewhere.

And in such functions we usually don’t want to leave the current context. That’s where arrow functions come in handy.

## <a href="arrow-functions.html#arrow-functions-have-no-this" id="arrow-functions-have-no-this" class="main__anchor">Arrow functions have no “this”</a>

As we remember from the chapter [Object methods, "this"](object-methods.html), arrow functions do not have `this`. If `this` is accessed, it is taken from the outside.

For instance, we can use it to iterate inside an object method:

<a href="arrow-functions.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let group = {
      title: "Our Group",
      students: ["John", "Pete", "Alice"],

      showList() {
        this.students.forEach(
          student => alert(this.title + ': ' + student)
        );
      }
    };

    group.showList();

Here in `forEach`, the arrow function is used, so `this.title` in it is exactly the same as in the outer method `showList`. That is: `group.title`.

If we used a “regular” function, there would be an error:

<a href="arrow-functions.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let group = {
      title: "Our Group",
      students: ["John", "Pete", "Alice"],

      showList() {
        this.students.forEach(function(student) {
          // Error: Cannot read property 'title' of undefined
          alert(this.title + ': ' + student);
        });
      }
    };

    group.showList();

The error occurs because `forEach` runs functions with `this=undefined` by default, so the attempt to access `undefined.title` is made.

That doesn’t affect arrow functions, because they just don’t have `this`.

<span class="important__type">Arrow functions can’t run with `new`</span>

Not having `this` naturally means another limitation: arrow functions can’t be used as constructors. They can’t be called with `new`.

<span class="important__type">Arrow functions VS bind</span>

There’s a subtle difference between an arrow function `=>` and a regular function called with `.bind(this)`:

- `.bind(this)` creates a “bound version” of the function.
- The arrow `=>` doesn’t create any binding. The function simply doesn’t have `this`. The lookup of `this` is made exactly the same way as a regular variable search: in the outer lexical environment.

## <a href="arrow-functions.html#arrows-have-no-arguments" id="arrows-have-no-arguments" class="main__anchor">Arrows have no “arguments”</a>

Arrow functions also have no `arguments` variable.

That’s great for decorators, when we need to forward a call with the current `this` and `arguments`.

For instance, `defer(f, ms)` gets a function and returns a wrapper around it that delays the call by `ms` milliseconds:

<a href="arrow-functions.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function defer(f, ms) {
      return function() {
        setTimeout(() => f.apply(this, arguments), ms);
      };
    }

    function sayHi(who) {
      alert('Hello, ' + who);
    }

    let sayHiDeferred = defer(sayHi, 2000);
    sayHiDeferred("John"); // Hello, John after 2 seconds

The same without an arrow function would look like:

    function defer(f, ms) {
      return function(...args) {
        let ctx = this;
        setTimeout(function() {
          return f.apply(ctx, args);
        }, ms);
      };
    }

Here we had to create additional variables `args` and `ctx` so that the function inside `setTimeout` could take them.

## <a href="arrow-functions.html#summary" id="summary" class="main__anchor">Summary</a>

Arrow functions:

- Do not have `this`
- Do not have `arguments`
- Can’t be called with `new`
- They also don’t have `super`, but we didn’t study it yet. We will on the chapter [Class inheritance](class-inheritance.html)

That’s because they are meant for short pieces of code that do not have their own “context”, but rather work in the current one. And they really shine in that use case.

<a href="bind.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="object-properties.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Farrow-functions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farrow-functions" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

[Comments](arrow-functions.html%20name=)

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

arrow-functions.html\#arrow-functions-have-no-this" &gt;Arrow functions have no “this”

arrow-functions.html\#arrows-have-no-arguments" &gt;Arrows have no “arguments”

arrow-functions.html

arrow-functions.html &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Farrow-functions" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farrow-functions" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/12-arrow-functions" class="sidebar__link">Edit on GitHub</a>
