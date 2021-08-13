EN

- <a href="https://ar.javascript.info/"
- <a href="regexp-quantifiers.html"
- <a href="https://es.javascript.info/regexp-quantifiers"
- <a href="https://fr.javascript.info/regexp-quantifiers"
- regexp-quantifiers"
  regexp-quantifiers"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=regexp-quantifiers"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-quantifiers"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-quantifiers" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-quantifiers" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

29th February 2020

# Quantifiers +, \*, ? and {n}

Let’s say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`.

A number is a sequence of 1 or more digits `\d`. To mark how many we need, we can append a _quantifier_.

## <a href="regexp-quantifiers.html#quantity-n" id="quantity-n" class="main__anchor">Quantity {n}</a>

The simplest quantifier is a number in curly braces: `{n}`.

A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need.

It has a few advanced forms, let’s see examples:

The exact count: `{5}`  
`\d{5}` denotes exactly 5 digits, the same as `\d\d\d\d\d`.

The example below looks for a 5-digit number:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"

We can add `\b` to exclude longer numbers: `\b\d{5}\b`.

The range: `{3,5}`, match 3-5 times  
To find numbers from 3 to 5 digits we can put the limits into curly braces: `\d{3,5}`

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"

We can omit the upper limit.

Then a regexp `\d{3,}` looks for sequences of digits of length `3` or more:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"

Let’s return to the string `+7(903)-123-45-67`.

A number is a sequence of one or more digits in a row. So the regexp is `\d{1,}`:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "+7(903)-123-45-67";

    let numbers = str.match(/\d{1,}/g);

    alert(numbers); // 7,903,123,45,67

## <a href="regexp-quantifiers.html#shorthands" id="shorthands" class="main__anchor">Shorthands</a>

There are shorthands for most used quantifiers:

`+`  
Means “one or more”, the same as `{1,}`.

For instance, `\d+` looks for numbers:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67

`?`  
Means “zero or one”, the same as `{0,1}`. In other words, it makes the symbol optional.

For instance, the pattern `ou?r` looks for `o` followed by zero or one `u`, and then `r`.

So, `colou?r` finds both `color` and `colour`:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour

`*`  
Means “zero or more”, the same as `{0,}`. That is, the character may repeat any times or be absent.

For example, `\d0*` looks for a digit followed by any number of zeroes (may be many or none):

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1

Compare it with `+` (one or more):

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero

## <a href="regexp-quantifiers.html#more-examples" id="more-examples" class="main__anchor">More examples</a>

Quantifiers are used very often. They serve as the main “building block” of complex regular expressions, so let’s see more examples.

**Regexp for decimal fractions (a number with a floating point): `\d+\.\d+`**

In action:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345

**Regexp for an “opening HTML-tag without attributes”, such as `<span>` or `<p>`.**

1.  The simplest one: `/<[a-z]+>/i`

    <a href="regexp-quantifiers.html#"
    <a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>

    The regexp looks for character `'<'` followed by one or more Latin letters, and then `'>'`.

2.  Improved: `/<[a-z][a-z0-9]*>/i`

    According to the standard, HTML tag name may have a digit at any position except the first one, like `<h1>`.

    <a href="regexp-quantifiers.html#"
    <a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>

**Regexp “opening or closing HTML-tag without attributes”: `/<\/?[a-z][a-z0-9]*>/i`**

We added an optional slash `/?` near the beginning of the pattern. Had to escape it with a backslash, otherwise JavaScript would think it is the pattern end.

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>

<span class="important__type">To make a regexp more precise, we often need make it more complex</span>

We can see one common rule in these examples: the more precise is the regular expression – the longer and more complex it is.

For instance, for HTML tags we could use a simpler regexp: `<\w+>`. But as HTML has stricter restrictions for a tag name, `<[a-z][a-z0-9]*>` is more reliable.

Can we use `<\w+>` or we need `<[a-z][a-z0-9]*>`?

In real life both variants are acceptable. Depends on how tolerant we can be to “extra” matches and whether it’s difficult or not to remove them from the result by other means.

## <a href="regexp-quantifiers.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="regexp-quantifiers.html#how-to-find-an-ellipsis" id="how-to-find-an-ellipsis" class="main__anchor">How to find an ellipsis "..." ?</a>

<a href="task/find-text-manydots.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a regexp to find ellipsis: 3 (or more?) dots in a row.

Check it:

    let regexp = /your regexp/g;
    alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....

solution

Solution:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /\.{3,}/g;
    alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....

Please note that the dot is a special character, so we have to escape it and insert as `\.`.

### <a href="regexp-quantifiers.html#regexp-for-html-colors" id="regexp-for-html-colors" class="main__anchor">Regexp for HTML colors</a>

<a href="task/find-html-colors-6hex.html" class="task__open-link"></a>

Create a regexp to search HTML-colors written as `#ABCDEF`: first `#` and then 6 hexadecimal characters.

An example of use:

    let regexp = /...your regexp.../

    let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

    alert( str.match(regexp) )  // #121212,#AA00ef

P.S. In this task we do not need other color formats like `#123` or `rgb(1,2,3)` etc.

solution

We need to look for `#` followed by 6 hexadecimal characters.

A hexadecimal character can be described as `[0-9a-fA-F]`. Or if we use the `i` flag, then just `[0-9a-f]`.

Then we can look for 6 of them using the quantifier `{6}`.

As a result, we have the regexp: `/#[a-f0-9]{6}/gi`.

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#[a-f0-9]{6}/gi;

    let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

    alert( str.match(regexp) );  // #121212,#AA00ef

The problem is that it finds the color in longer sequences:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456

To fix that, we can add `\b` to the end:

<a href="regexp-quantifiers.html#"
<a href="regexp-quantifiers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // color
    alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

    // not a color
    alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null

<a href="regexp-character-sets-and-ranges.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-greedy-and-lazy.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-quantifiers" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-quantifiers" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-quantifiers.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-quantifiers.html#quantity-n" class="sidebar__link">Quantity {n}</a>
- <a href="regexp-quantifiers.html#shorthands" class="sidebar__link">Shorthands</a>
- <a href="regexp-quantifiers.html#more-examples" class="sidebar__link">More examples</a>

- <a href="regexp-quantifiers.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="regexp-quantifiers.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-quantifiers" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-quantifiers" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/09-regexp-quantifiers" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
