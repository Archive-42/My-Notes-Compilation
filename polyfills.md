EN

- <a href="https://ar.javascript.info/polyfills"
- <a href="polyfills.html"
- <a href="https://es.javascript.info/polyfills"
- <a href="https://fr.javascript.info/polyfills"
- polyfills"
  polyfills"

<!-- -->

- /polyfills"
- <a href=polyfills"
- <a href="https://tr.javascript.info/polyfills"
- <a href="https://zh.javascript.info/polyfills"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fpolyfills" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpolyfills" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="code-quality.html" Code quality</span></a></span>

18th June 2021

# Polyfills and transpilers

The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Teams behind JavaScript engines have their own ideas about what to implement first. They may decide to implement proposals that are in draft and postpone things that are already in the spec, because they are less interesting or just harder to do.

So it’s quite common for an engine to implement only the part of the standard.

A good page to see the current state of support for language features is <https://kangax.github.io/compat-table/es6/> (it’s big, we have a lot to study yet).

As programmers, we’d like to use most recent features. The more good stuff – the better!

On the other hand, how to make our modern code work on older engines that don’t understand recent features yet?

There are two tools for that:

1.  Transpilers.
2.  Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## <a href="polyfills.html#transpilers" id="transpilers" class="main__anchor">Transpilers</a>

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse (“read and understand”) modern code and rewrite it using older syntax constructs, so that it’ll also work in outdated engines.

E.g. JavaScript before year 2020 didn’t have the “nullish coalescing operator” `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

    // before running the transpiler
    height = height ?? 100;

    // after running the transpiler
    height = (height !== undefined && height !== null) ? height : 100;

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it’s very easy to integrate into development process.

## <a href="polyfills.html#polyfills" id="polyfills" class="main__anchor">Polyfills</a>

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that “cuts off” the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there’s no `Math.trunc`, so such code will fail.

As we’re talking about new functions, not syntax changes, there’s no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called “polyfill”. It “fills in” the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

    if (!Math.trunc) { // if no such function
      // implement it
      Math.trunc = function(number) {
        // Math.ceil and Math.floor exist even in ancient JavaScript engines
        // they are covered later in the tutorial
        return number < 0 ? Math.ceil(number) : Math.floor(number);
      };
    }

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones.

Two interesting libraries of polyfills are:

- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user’s browser.

## <a href="polyfills.html#summary" id="summary" class="main__anchor">Summary</a>

In this chapter we’d like to motivate you to study modern and even “bleeding-edge” language features, even if they aren’t yet well-supported by JavaScript engines.

Just don’t forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they’ll ensure that the code works.

For example, later when you’re familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:

- <https://kangax.github.io/compat-table/es6/> – for pure JavaScript.
- <https://caniuse.com/> – for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

<a href="testing-mocha.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="object-basics.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fpolyfills" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpolyfills" </a>

<a href="tutorial/map.html" class="map">

## <a href="polyfills.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="code-quality.html" class="sidebar__link">Code quality</a>

#### Lesson navigation

- <a href="polyfills.html#transpilers" class="sidebar__link">Transpilers</a>
- <a href="polyfills.html#polyfills" class="sidebar__link">Polyfills</a>
- <a href="polyfills.html#summary" class="sidebar__link">Summary</a>

- <a href="polyfills.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fpolyfills" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpolyfills" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/03-code-quality/06-polyfills" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
