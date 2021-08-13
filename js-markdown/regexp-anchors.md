EN

- <a href="https://ar.javascript.info/"
- <a href="regexp-anchors.html"
- <a href="https://es.javascript.info/regexp-anchors"
- <a href="https://fr.javascript.info/regexp-anchors"
- regexp-anchors"
  regexp-anchors"

<!-- -->

- <a href="https://ko.javascript.info/regexp-anchors"
- <a href=regexp-anchors"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-anchors"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-anchors" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-anchors" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

4th September 2019

# Anchors: string start ^ and end $

The caret `^` and dollar `$` characters have special meaning in a regexp. They are called “anchors”.

The caret `^` matches at the beginning of the text, and the dollar `$` – at the end.

For instance, let’s test if the text starts with `Mary`:

<a href="regexp-anchors.html#"
<a href="regexp-anchors.html#"

    let str1 = "Mary had a little lamb";
    alert( /^Mary/.test(str1) ); // true

The pattern `^Mary` means: “string start and then Mary”.

Similar to this, we can test if the string ends with `snow` using `snow$`:

<a href="regexp-anchors.html#"
<a href="regexp-anchors.html#"

    let str1 = "it's fleece was white as snow";
    alert( /snow$/.test(str1) ); // true

In these particular cases we could use string methods `startsWith/endsWith` instead. Regular expressions should be used for more complex tests.

## <a href="regexp-anchors.html#testing-for-a-full-match" id="testing-for-a-full-match" class="main__anchor">Testing for a full match</a>

Both anchors together `^...$` are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Let’s check whether or not a string is a time in `12:34` format. That is: two digits, then a colon, and then another two digits.

In regular expressions language that’s `\d\d:\d\d`:

<a href="regexp-anchors.html#"
<a href="regexp-anchors.html#"

    let goodInput = "12:34";
    let badInput = "12:345";

    let regexp = /^\d\d:\d\d$/;
    alert( regexp.test(goodInput) ); // true
    alert( regexp.test(badInput) ); // false

Here the match for `\d\d:\d\d` must start exactly after the beginning of the text `^`, and the end `$` must immediately follow.

The whole string must be exactly in this format. If there’s any deviation or an extra character, the result is `false`.

Anchors behave differently if flag `m` is present. We’ll see that in the next article.

<span class="important__type">Anchors have “zero width”</span>

Anchors `^` and `$` are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).

## <a href="regexp-anchors.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="regexp-anchors.html#regexp" id="regexp" class="main__anchor">Regexp ^$</a>

<a href="task/start-end.html" class="task__open-link"></a>

Which string matches the pattern `^$`?

solution

An empty string is the only match: it starts and immediately finishes.

The task once again demonstrates that anchors are not characters, but tests.

The string is empty `""`. The engine first matches the `^` (input start), yes it’s there, and then immediately the end `$`, it’s here too. So there’s a match.

<a href="regexp-unicode.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-multiline-mode.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-anchors" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-anchors" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-anchors.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-anchors.html#testing-for-a-full-match" class="sidebar__link">Testing for a full match</a>

- <a href="regexp-anchors.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="regexp-anchors.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-anchors" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-anchors" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/04-regexp-anchors" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
