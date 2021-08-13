EN

- <a href="https://ar.javascript.info/regexp-character-classes"
- <a href="regexp-character-classes.html"
- <a href="https://es.javascript.info/regexp-character-classes"
- <a href="https://fr.javascript.info/regexp-character-classes"
- <a href="https://it.javascript.info/regexp-character-classes"
  regexp-character-classes"

<!-- -->

- <a href="https://ko.javascript.info/regexp-character-classes"
- <a href=regexp-character-classes"
- <a href="https://tr.javascript.info/regexp-character-classes"
- <a href="https://zh.javascript.info/regexp-character-classes"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-character-classes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-character-classes" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

7th December 2020

# Character classes

Consider a practical task – we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

To do so, we can find and remove anything that’s not a number. Character classes can help with that.

A _character class_ is a special notation that matches any symbol from a certain set.

For the start, let’s explore the “digit” class. It’s written as `\d` and corresponds to “any single digit”.

For instance, let’s find the first digit in the phone number:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    let str = "+7(903)-123-45-67";

    let regexp = /\d/;

    alert( str.match(regexp) ); // 7

Without the flag `g`, the regular expression only looks for the first match, that is the first digit `\d`.

Let’s add the `g` flag to find all digits:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    let str = "+7(903)-123-45-67";

    let regexp = /\d/g;

    alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

    // let's make the digits-only phone number of them:
    alert( str.match(regexp).join('') ); // 79031234567

That was a character class for digits. There are other character classes as well.

Most used are:

`\d` (“d” is from “digit”)  
A digit: a character from `0` to `9`.

`\s` (“s” is from “space”)  
A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.

`\w` (“w” is from “word”)  
A “wordly” character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `\w`.

For instance, `\d\s\w` means a “digit” followed by a “space character” followed by a “wordly character”, such as `1 a`.

**A regexp may contain both regular symbols and character classes.**

For instance, `CSS\d` matches a string `CSS` with a digit after it:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    let str = "Is there CSS4?";
    let regexp = /CSS\d/

    alert( str.match(regexp) ); // CSS4

Also we can use many character classes:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'

The match (each regexp character class has the corresponding result character):

## <figure><img src="article/regexp-character-classes/love-html5-classes.svg" width="236" height="38" /></figure><a href="regexp-character-classes.html#inverse-classes" id="inverse-classes" class="main__anchor">Inverse classes</a>

For every character class there exists an “inverse class”, denoted with the same letter, but uppercased.

The “inverse” means that it matches all other characters, for instance:

`\D`  
Non-digit: any character except `\d`, for instance a letter.

`\S`  
Non-space: any character except `\s`, for instance a letter.

`\W`  
Non-wordly character: anything but `\w`, e.g a non-latin letter or a space.

In the beginning of the chapter we saw how to make a number-only phone number from a string like `+7(903)-123-45-67`: find all digits and join them.

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    let str = "+7(903)-123-45-67";

    alert( str.match(/\d/g).join('') ); // 79031234567

An alternative, shorter way is to find non-digits `\D` and remove them from the string:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    let str = "+7(903)-123-45-67";

    alert( str.replace(/\D/g, "") ); // 79031234567

## <a href="regexp-character-classes.html#a-dot-is-any-character" id="a-dot-is-any-character" class="main__anchor">A dot is “any character”</a>

A dot `.` is a special character class that matches “any character except a newline”.

For instance:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "Z".match(/./) ); // Z

Or in the middle of a regexp:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    let regexp = /CS.4/;

    alert( "CSS4".match(regexp) ); // CSS4
    alert( "CS-4".match(regexp) ); // CS-4
    alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)

Please note that a dot means “any character”, but not the “absence of a character”. There must be a character to match it:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot

### <a href="regexp-character-classes.html#dot-as-literally-any-character-with-s-flag" id="dot-as-literally-any-character-with-s-flag" class="main__anchor">Dot as literally any character with “s” flag</a>

By default, a dot doesn’t match the newline character `\n`.

For instance, the regexp `A.B` matches `A`, and then `B` with any character between them, except a newline `\n`:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "A\nB".match(/A.B/) ); // null (no match)

There are many situations when we’d like a dot to mean literally “any character”, newline included.

That’s what flag `s` does. If a regexp has it, then a dot `.` matches literally any character:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "A\nB".match(/A.B/s) ); // A\nB (match!)

<span class="important__type">Not supported in IE</span>

The `s` flag is not supported in IE.

Luckily, there’s an alternative, that works everywhere. We can use a regexp like `[\s\S]` to match “any character” (this pattern will be covered in the article [Sets and ranges \[...\]](regexp-character-sets-and-ranges.html)).

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)

The pattern `[\s\S]` literally says: “a space character OR not a space character”. In other words, “anything”. We could use another pair of complementary classes, such as `[\d\D]`, that doesn’t matter. Or even the `[^]` – as it means match any character except nothing.

Also we can use this trick if we want both kind of “dots” in the same pattern: the actual dot `.` behaving the regular way (“not including a newline”), and also a way to match “any character” with `[\s\S]` or alike.

<span class="important__type">Pay attention to spaces</span>

Usually we pay little attention to spaces. For us strings `1-5` and `1 - 5` are nearly identical.

But if a regexp doesn’t take spaces into account, it may fail to work.

Let’s try to find digits separated by a hyphen:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "1 - 5".match(/\d-\d/) ); // null, no match!

Let’s fix it adding spaces into the regexp `\d - \d`:

<a href="regexp-character-classes.html#"
<a href="regexp-character-classes.html#"

    alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
    // or we can use \s class:
    alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works

**A space is a character. Equal in importance with any other character.**

We can’t add or remove spaces from a regular expression and expect it to work the same.

In other words, in a regular expression all characters matter, spaces too.

## <a href="regexp-character-classes.html#summary" id="summary" class="main__anchor">Summary</a>

There exist following character classes:

- `\d` – digits.
- `\D` – non-digits.
- `\s` – space symbols, tabs, newlines.
- `\S` – all but `\s`.
- `\w` – Latin letters, digits, underscore `'_'`.
- `\W` – all but `\w`.
- `.` – any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.

…But that’s not all!

Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if it’s a letter), is it a punctuation sign, etc.

We can search by these properties as well. That requires flag `u`, covered in the next article.

<a href="regexp-introduction.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-unicode.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-character-classes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-character-classes" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-character-classes.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-character-classes.html#inverse-classes" class="sidebar__link">Inverse classes</a>
- <a href="regexp-character-classes.html#a-dot-is-any-character" class="sidebar__link">A dot is “any character”</a>
- <a href="regexp-character-classes.html#summary" class="sidebar__link">Summary</a>

- <a href="regexp-character-classes.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-character-classes" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-character-classes" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/02-regexp-character-classes" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
