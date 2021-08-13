EN

- <a href="https://ar.javascript.info/global-object"
- <a href="global-object.html"
- <a href="https://es.javascript.info/global-object"
- <a href="https://fr.javascript.info/global-object"
- global-object"
  global-object"

<!-- -->

- <a href="https://ko.javascript.info/global-object"
- <a href=global-object"
- <a href="https://tr.javascript.info/global-object"
- <a href="https://zh.javascript.info/global-object"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fglobal-object" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fglobal-object" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" Advanced working with functions</span></a></span>

1st February 2021

# Global object

The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It’s supported in all major browsers.

We’ll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it’s better to use `globalThis` instead.

All properties of the global object can be accessed directly:

<a href="global-object.html#"
<a href="global-object.html#"

    alert("Hello");
    // is the same as
    window.alert("Hello");

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:

<a href="global-object.html#"
<a href="global-object.html#"

    var gVar = 5;

    alert(window.gVar); // 5 (became a property of the global object)

The same effect have function declarations (statements with `function` keyword in the main code flow, not function expressions).

Please don’t rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](modules.html) where such a thing doesn’t happen.

If we used `let` instead, such thing wouldn’t happen:

<a href="global-object.html#"
<a href="global-object.html#"

    let gLet = 5;

    alert(window.gLet); // undefined (doesn't become a property of the global object)

If a value is so important that you’d like to make it available globally, write it directly as a property:

<a href="global-object.html#"
<a href="global-object.html#"

    // make current user information global, to let all scripts access it
    window.currentUser = {
      name: "John"
    };

    // somewhere else in code
    alert(currentUser.name);  // John

    // or, if we have a local variable with the name "currentUser"
    // get it from window explicitly (safe!)
    alert(window.currentUser.name); // John

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets “input” variables and produces certain “outcome” is clearer, less prone to errors and easier to test than if it uses outer or global variables.

## <a href="global-object.html#using-for-polyfills" id="using-for-polyfills" class="main__anchor">Using for polyfills</a>

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn’t in really old browsers):

<a href="global-object.html#"
<a href="global-object.html#"

    if (!window.Promise) {
      alert("Your browser is really old!");
    }

If there’s none (say, we’re in an old browser), we can create “polyfills”: add functions that are not supported by the environment, but exist in the modern standard.

<a href="global-object.html#"
<a href="global-object.html#"

    if (!window.Promise) {
      window.Promise = ... // custom implementation of the modern language feature
    }

## <a href="global-object.html#summary" id="summary" class="main__anchor">Summary</a>

- The global object holds variables that should be available everywhere.

  That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` – the window height in the browser.

- The global object has a universal name `globalThis`.

  …But more often is referred by “old-school” environment-specific names, such as `window` (browser) and `global` (Node.js).

- We should store values in the global object only if they’re truly global for our project. And keep their number at minimum.

- In-browser, unless we’re using [modules](modules.html), global functions and variables declared with `var` become a property of the global object.

- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.

<a href="var.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="function-object.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fglobal-object" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fglobal-object" </a>

<a href="tutorial/map.html" class="map">

## <a href="global-object.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- <a href="global-object.html#using-for-polyfills" class="sidebar__link">Using for polyfills</a>
- <a href="global-object.html#summary" class="sidebar__link">Summary</a>

- <a href="global-object.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fglobal-object" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fglobal-object" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/05-global-object" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
