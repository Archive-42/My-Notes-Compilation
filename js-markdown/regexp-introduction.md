EN

- <a href="https://ar.javascript.info/regexp-introduction"
- <a href="regexp-introduction.html"
- <a href="https://es.javascript.info/regexp-introduction"
- <a href="https://fr.javascript.info/regexp-introduction"
- regexp-introduction"
  regexp-introduction"

<!-- -->

- /regexp-introduction"
- <a href=regexp-introduction"
- <a href="https://tr.javascript.info/regexp-introduction"
- <a href="https://zh.javascript.info/regexp-introduction"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-introduction" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-introduction" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

7th December 2020

# Patterns and flags

Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object, as well as being integrated in methods of strings.

## <a href="regexp-introduction.html#regular-expressions" id="regular-expressions" class="main__anchor">Regular Expressions</a>

A regular expression (also “regexp”, or just “reg”) consists of a _pattern_ and optional _flags_.

There are two syntaxes that can be used to create a regular expression object.

The “long” syntax:

    regexp = new RegExp("pattern", "flags");

And the “short” one, using slashes `"/"`:

    regexp = /pattern/; // no flags
    regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)

Slashes `/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time – and that’s the most common situation. While `new RegExp` is more often used when we need to create a regexp “on the fly” from a dynamically generated string. For instance:

    let tag = prompt("What tag do you want to find?", "h2");

    let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above

## <a href="regexp-introduction.html#flags" id="flags" class="main__anchor">Flags</a>

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:

`i`  
With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`g`  
With this flag the search looks for all matches, without it – only the first match is returned.

`m`  
Multiline mode (covered in the chapter [Multiline mode of anchors ^ $, flag "m"](regexp-multiline-mode.html)).

`s`  
Enables “dotall” mode, that allows a dot `.` to match newline character `\n` (covered in the chapter [Character classes](regexp-character-classes.html)).

`u`  
Enables full Unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter [Unicode: flag "u" and class \\p{...}](regexp-unicode.html).

`y`  
“Sticky” mode: searching at the exact position in the text (covered in the chapter [Sticky flag "y", searching at position](regexp-sticky.html))

<span class="important__type">Colors</span>

From here on the color scheme is:

- regexp – `red`
- string (where we search) – `blue`
- result – `green`

## <a href="regexp-introduction.html#searching-str-match" id="searching-str-match" class="main__anchor">Searching: str.match</a>

As mentioned previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:

1.  If the regular expression has flag `g`, it returns an array of all matches:

    <a href="regexp-introduction.html#"
    <a href="regexp-introduction.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let str = "We will, we will rock you";

        alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)

    Please note that both `We` and `we` are found, because flag `i` makes the regular expression case-insensitive.

2.  If there’s no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:

    <a href="regexp-introduction.html#"
    <a href="regexp-introduction.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let str = "We will, we will rock you";

        let result = str.match(/we/i); // without flag g

        alert( result[0] );     // We (1st match)
        alert( result.length ); // 1

        // Details:
        alert( result.index );  // 0 (position of the match)
        alert( result.input );  // We will, we will rock you (source string)

    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We’ll cover that in the chapter [Capturing groups](regexp-groups.html).

3.  And, finally, if there are no matches, `null` is returned (doesn’t matter if there’s flag `g` or not).

    This a very important nuance. If there are no matches, we don’t receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:

    <a href="regexp-introduction.html#"
    <a href="regexp-introduction.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let matches = "JavaScript".match(/HTML/); // = null

        if (!matches.length) { // Error: Cannot read property 'length' of null
          alert("Error in the line above");
        }

    If we’d like the result to always be an array, we can write it this way:

    <a href="regexp-introduction.html#"
    <a href="regexp-introduction.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let matches = "JavaScript".match(/HTML/) || [];

        if (!matches.length) {
          alert("No matches"); // now it works
        }

## <a href="regexp-introduction.html#replacing-str-replace" id="replacing-str-replace" class="main__anchor">Replacing: str.replace</a>

The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there’s flag `g`, otherwise, only the first one).

For instance:

<a href="regexp-introduction.html#"
<a href="regexp-introduction.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // no flag g
    alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

    // with flag g
    alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

<table><thead><tr class="header"><th>Symbols</th><th>Action in the replacement string</th></tr></thead><tbody><tr class="odd"><td><code>$&amp;</code></td><td>inserts the whole match</td></tr><tr class="even"><td><code>$`</code></td><td>inserts a part of the string before the match</td></tr><tr class="odd"><td><code>$'</code></td><td>inserts a part of the string after the match</td></tr><tr class="even"><td><code>$n</code></td><td>if <code>n</code> is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <a href="regexp-groups.html">Capturing groups</a></td></tr><tr class="odd"><td><code>$&lt;name&gt;</code></td><td>inserts the contents of the parentheses with the given <code>name</code>, more about it in the chapter <a href="regexp-groups.html">Capturing groups</a></td></tr><tr class="even"><td><code>$$</code></td><td>inserts character <code>$</code></td></tr></tbody></table>

An example with `$&`:

<a href="regexp-introduction.html#"
<a href="regexp-introduction.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript

## <a href="regexp-introduction.html#testing-regexp-test" id="testing-regexp-test" class="main__anchor">Testing: regexp.test</a>

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

<a href="regexp-introduction.html#"
<a href="regexp-introduction.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "I love JavaScript";
    let regexp = /LOVE/i;

    alert( regexp.test(str) ); // true

Later in this chapter we’ll study more regular expressions, walk through more examples, and also meet other methods.

Full information about the methods is given in the article [Methods of RegExp and String](regexp-methods.html).

## <a href="regexp-introduction.html#summary" id="summary" class="main__anchor">Summary</a>

- A regular expression consists of a pattern and optional flags: `g`, `i`, `m`, `u`, `s`, `y`.
- Without flags and special symbols (that we’ll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there’s `g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there’s `g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there’s at least one match, otherwise, it returns `false`.

<a href="regular-expressions.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-character-classes.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-introduction" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-introduction" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-introduction.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-introduction.html#regular-expressions" class="sidebar__link">Regular Expressions</a>
- <a href="regexp-introduction.html#flags" class="sidebar__link">Flags</a>
- <a href="regexp-introduction.html#searching-str-match" class="sidebar__link">Searching: str.match</a>
- <a href="regexp-introduction.html#replacing-str-replace" class="sidebar__link">Replacing: str.replace</a>
- <a href="regexp-introduction.html#testing-regexp-test" class="sidebar__link">Testing: regexp.test</a>
- <a href="regexp-introduction.html#summary" class="sidebar__link">Summary</a>

- <a href="regexp-introduction.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-introduction" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-introduction" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/01-regexp-introduction" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
