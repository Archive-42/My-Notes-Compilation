EN

- <a href="https://ar.javascript.info/"
- <a href="regexp-multiline-mode.html"
- <a href="https://es.javascript.info/regexp-multiline-mode"

- regexp-multiline-mode"
  regexp-multiline-mode"

<!-- -->

- <a href="https://ko.javascript.info/regexp-multiline-mode"
- <a href=regexp-multiline-mode"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-multiline-mode"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-multiline-mode" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-multiline-mode" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

11th April 2021

# Multiline mode of anchors ^ $, flag "m"

The multiline mode is enabled by the flag `m`.

It only affects the behavior of `^` and `$`.

In the multiline mode they match not only at the beginning and the end of the string, but also at start/end of line.

## <a href="regexp-multiline-mode.html#searching-at-line-start" id="searching-at-line-start" class="main__anchor">Searching at line start ^</a>

In the example below the text has multiple lines. The pattern `/^\d/gm` takes a digit from the beginning of each line:

<a href="regexp-multiline-mode.html#"
<a href="regexp-multiline-mode.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = `1st place: Winnie
    2nd place: Piglet
    3rd place: Eeyore`;

    alert( str.match(/^\d/gm) ); // 1, 2, 3

Without the flag `m` only the first digit is matched:

<a href="regexp-multiline-mode.html#"
<a href="regexp-multiline-mode.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = `1st place: Winnie
    2nd place: Piglet
    3rd place: Eeyore`;

    alert( str.match(/^\d/g) ); // 1

That’s because by default a caret `^` only matches at the beginning of the text, and in the multiline mode – at the start of any line.

<span class="important__type">Please note:</span>

“Start of a line” formally means “immediately after a line break”: the test `^` in multiline mode matches at all positions preceded by a newline character `\n`.

And at the text start.

## <a href="regexp-multiline-mode.html#searching-at-line-end" id="searching-at-line-end" class="main__anchor">Searching at line end $</a>

The dollar sign `$` behaves similarly.

The regular expression `\d$` finds the last digit in every line

<a href="regexp-multiline-mode.html#"
<a href="regexp-multiline-mode.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = `Winnie: 1
    Piglet: 2
    Eeyore: 3`;

    alert( str.match(/\d$/gm) ); // 1,2,3

Without the flag `m`, the dollar `$` would only match the end of the whole text, so only the very last digit would be found.

<span class="important__type">Please note:</span>

“End of a line” formally means “immediately before a line break”: the test `$` in multiline mode matches at all positions succeeded by a newline character `\n`.

And at the text end.

## <a href="regexp-multiline-mode.html#searching-for-n-instead-of" id="searching-for-n-instead-of" class="main__anchor">Searching for \n instead of ^ $</a>

To find a newline, we can use not only anchors `^` and `$`, but also the newline character `\n`.

What’s the difference? Let’s see an example.

Here we search for `\d\n` instead of `\d$`:

<a href="regexp-multiline-mode.html#"
<a href="regexp-multiline-mode.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = `Winnie: 1
    Piglet: 2
    Eeyore: 3`;

    alert( str.match(/\d\n/gm) ); // 1\n,2\n

As we can see, there are 2 matches instead of 3.

That’s because there’s no newline after `3` (there’s text end though, so it matches `$`).

Another difference: now every match includes a newline character `\n`. Unlike the anchors `^` `$`, that only test the condition (start/end of a line), `\n` is a character, so it becomes a part of the result.

So, a `\n` in the pattern is used when we need newline characters in the result, while anchors are used to find something at the beginning/end of a line.

<a href="regexp-anchors.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-boundary.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-multiline-mode" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-multiline-mode" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-multiline-mode.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-multiline-mode.html#searching-at-line-start" class="sidebar__link">Searching at line start ^</a>
- <a href="regexp-multiline-mode.html#searching-at-line-end" class="sidebar__link">Searching at line end $</a>
- <a href="regexp-multiline-mode.html#searching-for-n-instead-of" class="sidebar__link">Searching for \n instead of ^ $</a>

- <a href="regexp-multiline-mode.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-multiline-mode" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-multiline-mode" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/05-regexp-multiline-mode" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
