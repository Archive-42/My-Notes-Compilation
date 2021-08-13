EN

- <a href="https://ar.javascript.info/strict-mode"
- <a href="strict-mode.html"
- <a href="https://es.javascript.info/strict-mode"
- <a href="https://fr.javascript.info/strict-mode"
- strict-mode"
  strict-mode"

<!-- -->

- <a href="https://ko.javascript.info/strict-mode"
- <a href=strict-mode"
- <a href="https://tr.javascript.info/strict-mode"
- <a href="https://zh.javascript.info/strict-mode"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fstrict-mode" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstrict-mode" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

19th May 2020

# The modern mode, "use strict"

For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn’t change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript’s creators got stuck in the language forever.

This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.

## <a href="strict-mode.html#use-strict" id="use-strict" class="main__anchor">“use strict”</a>

The directive looks like a string: `"use strict"` or `'use strict'`. When it is located at the top of a script, the whole script works the “modern” way.

For example:

    "use strict";

    // this code works the modern way
    ...

Quite soon we’re going to learn functions (a way to group commands), so let’s note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.

<span class="important__type">Ensure that “use strict” is at the top</span>

Please make sure that `"use strict"` is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn’t enabled here:

    alert("some code");
    // "use strict" below is ignored--it must be at the top

    "use strict";

    // strict mode is not activated

Only comments may appear above `"use strict"`.

<span class="important__type">There’s no way to cancel `use strict`</span>

There is no directive like `"no use strict"` that reverts the engine to old behavior.

Once we enter strict mode, there’s no going back.

## <a href="strict-mode.html#browser-console" id="browser-console" class="main__anchor">Browser console</a>

When you use a [developer console](devtools.html) to run code, please note that it doesn’t `use strict` by default.

Sometimes, when `use strict` makes a difference, you’ll get incorrect results.

So, how to actually `use strict` in the console?

First, you can try to press Shift<span class="shortcut__plus">+</span>Enter to input multiple lines, and put `use strict` on top, like this:

    'use strict'; <Shift+Enter for a newline>
    //  ...your code
    <Enter to run>

It works in most browsers, namely Firefox and Chrome.

If it doesn’t, e.g. in an old browser, there’s an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:

    (function() {
      'use strict';

      // ...your code here...
    })()

## <a href="strict-mode.html#should-we-use-strict" id="should-we-use-strict" class="main__anchor">Should we “use strict”?</a>

The question may sound obvious, but it’s not so.

One could recommend to start scripts with `"use strict"`… But you know what’s cool?

Modern JavaScript supports “classes” and “modules” – advanced language structures (we’ll surely get to them), that enable `use strict` automatically. So we don’t need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we’ve got to know about `use strict` in general.

In the next chapters, as we learn language features, we’ll see the differences between the strict and old modes. Luckily, there aren’t many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.

<a href="structure.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="variables.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fstrict-mode" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstrict-mode" </a>

<a href="tutorial/map.html" class="map">

## <a href="strict-mode.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="strict-mode.html#use-strict" class="sidebar__link">“use strict”</a>
- <a href="strict-mode.html#browser-console" class="sidebar__link">Browser console</a>
- <a href="strict-mode.html#should-we-use-strict" class="sidebar__link">Should we “use strict”?</a>

- <a href="strict-mode.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fstrict-mode" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstrict-mode" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/03-strict-mode" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
