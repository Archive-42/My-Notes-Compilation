EN

- <a href="https://ar.javascript.info/regexp-backreferences"
- <a href="regexp-backreferences.html"
- <a href="https://es.javascript.info/regexp-backreferences"
- <a href="https://fr.javascript.info/regexp-backreferences"
- regexp-backreferences"
  regexp-backreferences"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=regexp-backreferences"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-backreferences"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

19th May 2020

# Backreferences in pattern: \\N and \\k&lt;name&gt;

We can use the contents of capturing groups `(...)` not only in the result or in the replacement string, but also in the pattern itself.

## <a href="regexp-backreferences.html#backreference-by-number-n" id="backreference-by-number-n" class="main__anchor">Backreference by number: \N</a>

A group can be referenced in the pattern using `\N`, where `N` is the group number.

To make clear why that’s helpful, let’s consider a task.

We need to find quoted strings: either single-quoted `'...'` or a double-quoted `"..."` – both variants should match.

How to find them?

We can put both kinds of quotes in the square brackets: `['"](.*?)['"]`, but it would find strings with mixed quotes, like `"...'` and `'..."`. That would lead to incorrect matches when one quote appears inside other ones, like in the string `"She's the one!"`:

<a href="regexp-backreferences.html#"
<a href="regexp-backreferences.html#"

    let str = `He said: "She's the one!".`;

    let regexp = /['"](.*?)['"]/g;

    // The result is not what we'd like to have
    alert( str.match(regexp) ); // "She'

As we can see, the pattern found an opening quote `"`, then the text is consumed till the other quote `'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and backreference it: `(['"])(.*?)\1`.

Here’s the correct code:

<a href="regexp-backreferences.html#"
<a href="regexp-backreferences.html#"

    let str = `He said: "She's the one!".`;

    let regexp = /(['"])(.*?)\1/g;

    alert( str.match(regexp) ); // "She's the one!"

Now it works! The regular expression engine finds the first quote `(['"])` and memorizes its content. That’s the first capturing group.

Further in the pattern `\1` means “find the same text as in the first group”, exactly the same quote in our case.

Similar to that, `\2` would mean the contents of the second group, `\3` – the 3rd group, and so on.

<span class="important__type">Please note:</span>

If we use `?:` in the group, then we can’t reference it. Groups that are excluded from capturing `(?:...)` are not memorized by the engine.

<span class="important__type">Don’t mess up: in the pattern `\1`, in the replacement: `$1`</span>

In the replacement string we use a dollar sign: `$1`, while in the pattern – a backslash `\1`.

## <a href="regexp-backreferences.html#backreference-by-name-k" id="backreference-by-name-k" class="main__anchor">Backreference by name: <code>\k&lt;name&gt;</code></a>

If a regexp has many parentheses, it’s convenient to give them names.

To reference a named group we can use `\k<name>`.

In the example below the group with quotes is named `?<quote>`, so the backreference is `\k<quote>`:

<a href="regexp-backreferences.html#"
<a href="regexp-backreferences.html#"

    let str = `He said: "She's the one!".`;

    let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

    alert( str.match(regexp) ); // "She's the one!"

<a href="regexp-groups.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-alternation.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-backreferences.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-backreferences.html#backreference-by-number-n" class="sidebar__link">Backreference by number: \N</a>
- <a href="regexp-backreferences.html#backreference-by-name-k" class="sidebar__link">Backreference by name: <code>\k&lt;name&gt;</code></a>

- <a href="regexp-backreferences.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/12-regexp-backreferences" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
