EN

- <a href="https://ar.javascript.info/regexp-lookahead-lookbehind" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="regexp-lookahead-lookbehind.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/regexp-lookahead-lookbehind" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- <a href="https://fr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span>Français</span></a>
- regexp-lookahead-lookbehind" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/regexp-lookahead-lookbehind" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- /" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="regexp-lookahead-lookbehind%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/regexp-lookahead-lookbehind" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

Search

Search

<span class="share-icons__title">Share</span>2Fregexp-lookahead-lookbehind" rel="nofollow" &gt;2Fregexp-lookahead-lookbehind" rel="nofollow" &gt;

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" class="breadcrumbs__link"><span>Regular expressions</span></a></span>

2nd March 2021

# Lookahead and lookbehind

Sometimes we need to find only those matches for a pattern that are followed or preceded by another pattern.

There’s a special syntax for that, called “lookahead” and “lookbehind”, together referred to as “lookaround”.

For the start, let’s find the price from the string like `1 turkey costs 30€`. That is: a number, followed by `€` sign.

## <a href="regexp-lookahead-lookbehind.html#lookahead" id="lookahead" class="main__anchor">Lookahead</a>

The syntax is: `X(?=Y)`, it means "look for `X`, but match only if followed by `Y`". There may be any pattern instead of `X` and `Y`.

For an integer number followed by `€`, the regexp will be `\d+(?=€)`:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "1 turkey costs 30€";

    alert( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €

Please note: the lookahead is merely a test, the contents of the parentheses `(?=...)` is not included in the result `30`.

When we look for `X(?=Y)`, the regular expression engine finds `X` and then checks if there’s `Y` immediately after it. If it’s not so, then the potential match is skipped, and the search continues.

More complex tests are possible, e.g. `X(?=Y)(?=Z)` means:

1.  Find `X`.
2.  Check if `Y` is immediately after `X` (skip if isn’t).
3.  Check if `Z` is also immediately after `X` (skip if isn’t).
4.  If both tests passed, then the `X` is a match, otherwise continue searching.

In other words, such pattern means that we’re looking for `X` followed by `Y` and `Z` at the same time.

That’s only possible if patterns `Y` and `Z` aren’t mutually exclusive.

For example, `\d+(?=\s)(?=.*30)` looks for `\d+` that is followed by a space `(?=\s)`, and there’s `30` somewhere after it `(?=.*30)`:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "1 turkey costs 30€";

    alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1

In our string that exactly matches the number `1`.

## <a href="regexp-lookahead-lookbehind.html#negative-lookahead" id="negative-lookahead" class="main__anchor">Negative lookahead</a>

Let’s say that we want a quantity instead, not a price from the same string. That’s a number `\d+`, NOT followed by `€`.

For that, a negative lookahead can be applied.

The syntax is: `X(?!Y)`, it means "search `X`, but only if not followed by `Y`".

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "2 turkeys cost 60€";

    alert( str.match(/\d+\b(?!€)/g) ); // 2 (the price is not matched)

## <a href="regexp-lookahead-lookbehind.html#lookbehind" id="lookbehind" class="main__anchor">Lookbehind</a>

Lookahead allows to add a condition for “what follows”.

Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there’s something before it.

The syntax is:

- Positive lookbehind: `(?<=Y)X`, matches `X`, but only if there’s `Y` before it.
- Negative lookbehind: `(?<!Y)X`, matches `X`, but only if there’s no `Y` before it.

For example, let’s change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we’ll use `(?<=\$)\d+` – an amount preceded by `$`:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "1 turkey costs $30";

    // the dollar sign is escaped \$
    alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)

And, if we need the quantity – a number, not preceded by `$`, then we can use a negative lookbehind `(?<!\$)\d+`:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "2 turkeys cost $60";

    alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (the price is not matched)

## <a href="regexp-lookahead-lookbehind.html#capturing-groups" id="capturing-groups" class="main__anchor">Capturing groups</a>

Generally, the contents inside lookaround parentheses does not become a part of the result.

E.g. in the pattern `\d+(?=€)`, the `€` sign doesn’t get captured as a part of the match. That’s natural: we look for a number `\d+`, while `(?=€)` is just a test that it should be followed by `€`.

But in some situations we might want to capture the lookaround expression as well, or a part of it. That’s possible. Just wrap that part into additional parentheses.

In the example below the currency sign `(€|kr)` is captured, along with the amount:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "1 turkey costs 30€";
    let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

    alert( str.match(regexp) ); // 30, €

And here’s the same for lookbehind:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "1 turkey costs $30";
    let regexp = /(?<=(\$|£))\d+/;

    alert( str.match(regexp) ); // 30, $

## <a href="regexp-lookahead-lookbehind.html#summary" id="summary" class="main__anchor">Summary</a>

Lookahead and lookbehind (commonly referred to as “lookaround”) are useful when we’d like to match something depending on the context before/after it.

For simple regexps we can do the similar thing manually. That is: match everything, in any context, and then filter by context in the loop.

Remember, `str.match` (without flag `g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.

But generally lookaround is more convenient.

Lookaround types:

<table><thead><tr class="header"><th>Pattern</th><th>type</th><th>matches</th></tr></thead><tbody><tr class="odd"><td><code>X(?=Y)</code></td><td>Positive lookahead</td><td><code class="pattern">X</code> if followed by <code class="pattern">Y</code></td></tr><tr class="even"><td><code>X(?!Y)</code></td><td>Negative lookahead</td><td><code class="pattern">X</code> if not followed by <code class="pattern">Y</code></td></tr><tr class="odd"><td><code>(?&lt;=Y)X</code></td><td>Positive lookbehind</td><td><code class="pattern">X</code> if after <code class="pattern">Y</code></td></tr><tr class="even"><td><code>(?&lt;!Y)X</code></td><td>Negative lookbehind</td><td><code class="pattern">X</code> if not after <code class="pattern">Y</code></td></tr></tbody></table>

## <a href="regexp-lookahead-lookbehind.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="regexp-lookahead-lookbehind.html#find-non-negative-integers" id="find-non-negative-integers" class="main__anchor">Find non-negative integers</a>

<a href="task/find-non-negative-integers.html" class="task__open-link"></a>

There’s a string of integer numbers.

Create a regexp that looks for only non-negative ones (zero is allowed).

An example of use:

    let regexp = /your regexp/g;

    let str = "0 12 -5 123 -18";

    alert( str.match(regexp) ); // 0, 12, 123

solution

The regexp for an integer number is `\d+`.

We can exclude negatives by prepending it with the negative lookbehind: `(?<!-)\d+`.

Although, if we try it now, we may notice one more “extra” result:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(?<!-)\d+/g;

    let str = "0 12 -5 123 -18";

    console.log( str.match(regexp) ); // 0, 12, 123, 8

As you can see, it matches `8`, from `-18`. To exclude it, we need to ensure that the regexp starts matching a number not from the middle of another (non-matching) number.

We can do it by specifying another negative lookbehind: `(?<!-)(?<!\d)\d+`. Now `(?<!\d)` ensures that a match does not start after another digit, just what we need.

We can also join them into a single lookbehind here:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(?<![-\d])\d+/g;

    let str = "0 12 -5 123 -18";

    alert( str.match(regexp) ); // 0, 12, 123

### <a href="regexp-lookahead-lookbehind.html#insert-after-head" id="insert-after-head" class="main__anchor">Insert After Head</a>

<a href="task/insert-after-head.html" class="task__open-link"></a>

We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.

For instance:

    let regexp = /your regular expression/;

    let str = `
    <html>
      <body style="height: 200px">
      ...
      </body>
    </html>
    `;

    str = str.replace(regexp, `<h1>Hello</h1>`);

After that the value of `str` should be:

    <html>
      <body style="height: 200px"><h1>Hello</h1>
      ...
      </body>
    </html>

solution

In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `<body.*?>` for that.

In this task we don’t need to modify the `<body>` tag. We only need to add the text after it.

Here’s how we can do it:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<body style="...">...';
    str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

    alert(str); // ...<body style="..."><h1>Hello</h1>...

In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.

An alternative is to use lookbehind:

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="regexp-lookahead-lookbehind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<body style="...">...';
    str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

    alert(str); // ...<body style="..."><h1>Hello</h1>...

As you can see, there’s only lookbehind part in this regexp.

It works like this:

- At every position in the text.
- Check if it’s preceeded by `<body.*?>`.
- If it’s so then we have the match.

The tag `<body.*?>` won’t be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `<body.*?>`.

So it replaces the “empty line”, preceeded by `<body.*?>`, with `<h1>Hello</h1>`. That’s the insertion after `<body>`.

P.S. Regexp flags, such as `s` and `i` can also be useful: `/<body.*?>/si`. The `s` flag makes the dot `.` match a newline character, and `i` flag makes `<body>` also match `<BODY>` case-insensitively.

<a href="regexp-alternation.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-catastrophic-backtracking.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-lookahead-lookbehind" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-lookahead-lookbehind" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="regexp-lookahead-lookbehind.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- regexp-lookahead-lookbehind.html\#lookahead" &gt;Lookahead
- regexp-lookahead-lookbehind.html\#negative-lookahead" &gt;Negative lookahead
- regexp-lookahead-lookbehind.html\#lookbehind" &gt;Lookbehind
- regexp-lookahead-lookbehind.html\#capturing-groups" &gt;Capturing groups
- regexp-lookahead-lookbehind.html

<!-- -->

- regexp-lookahead-lookbehind.html\#tasks" &gt;Tasks (2)
- regexp-lookahead-lookbehind.html\#comments" &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Fregexp-lookahead-lookbehind" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-lookahead-lookbehind" class="share share_fb sidebar**share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/14-regexp-lookahead-lookbehind" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
