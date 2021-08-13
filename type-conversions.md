EN

- <a href="https://ar.javascript.info/type-conversions"
- <a href="type-conversions.html"
- <a href="https://es.javascript.info/type-conversions"
- <a href="https://fr.javascript.info/type-conversions"
- <a href="https://it.javascript.info/type-conversions"
  type-conversions"

<!-- -->

- <a href="https://ko.javascript.info/type-conversions"
- <a href=type-conversions"
- <a href="https://tr.javascript.info/type-conversions"
  ype-conversions"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftype-conversions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftype-conversions" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

5th May 2020

# Type Conversions

Most of the time, operators and functions automatically convert the values given to them to the right type.

For example, `alert` automatically converts any value to a string to show it. Mathematical operations convert values to numbers.

There are also cases when we need to explicitly convert a value to the expected type.

<span class="important__type">Not talking about objects yet</span>

In this chapter, we won’t cover objects. For now we’ll just be talking about primitives.

Later, after we learn about objects, in the chapter [Object to primitive conversion](object-toprimitive.html) we’ll see how objects fit in.

## <a href="type-conversions.html#string-conversion" id="string-conversion" class="main__anchor">String Conversion</a>

String conversion happens when we need the string form of a value.

For example, `alert(value)` does it to show the value.

We can also call the `String(value)` function to convert a value to a string:

<a href="type-conversions.html#"
<a href="type-conversions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let value = true;
    alert(typeof value); // boolean

    value = String(value); // now value is a string "true"
    alert(typeof value); // string

String conversion is mostly obvious. A `false` becomes `"false"`, `null` becomes `"null"`, etc.

## <a href="type-conversions.html#numeric-conversion" id="numeric-conversion" class="main__anchor">Numeric Conversion</a>

Numeric conversion happens in mathematical functions and expressions automatically.

For example, when division `/` is applied to non-numbers:

<a href="type-conversions.html#"
<a href="type-conversions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "6" / "2" ); // 3, strings are converted to numbers

We can use the `Number(value)` function to explicitly convert a `value` to a number:

<a href="type-conversions.html#"
<a href="type-conversions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "123";
    alert(typeof str); // string

    let num = Number(str); // becomes a number 123

    alert(typeof num); // number

Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered.

If the string is not a valid number, the result of such a conversion is `NaN`. For instance:

<a href="type-conversions.html#"
<a href="type-conversions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let age = Number("an arbitrary string instead of a number");

    alert(age); // NaN, conversion failed

Numeric conversion rules:

<table><thead><tr class="header"><th>Value</th><th>Becomes…</th></tr></thead><tbody><tr class="odd"><td><code>undefined</code></td><td><code>NaN</code></td></tr><tr class="even"><td><code>null</code></td><td><code>0</code></td></tr><tr class="odd"><td><code>true and false</code></td><td><code>1</code> and <code>0</code></td></tr><tr class="even"><td><code>string</code></td><td>Whitespaces from the start and end are removed. If the remaining string is empty, the result is <code>0</code>. Otherwise, the number is “read” from the string. An error gives <code>NaN</code>.</td></tr></tbody></table>

Examples:

<a href="type-conversions.html#"
<a href="type-conversions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( Number("   123   ") ); // 123
    alert( Number("123z") );      // NaN (error reading a number at "z")
    alert( Number(true) );        // 1
    alert( Number(false) );       // 0

Please note that `null` and `undefined` behave differently here: `null` becomes zero while `undefined` becomes `NaN`.

Most mathematical operators also perform such conversion, we’ll see that in the next chapter.

## <a href="type-conversions.html#boolean-conversion" id="boolean-conversion" class="main__anchor">Boolean Conversion</a>

Boolean conversion is the simplest one.

It happens in logical operations (later we’ll meet condition tests and other similar things) but can also be performed explicitly with a call to `Boolean(value)`.

The conversion rule:

- Values that are intuitively “empty”, like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.

For instance:

<a href="type-conversions.html#"
<a href="type-conversions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( Boolean(1) ); // true
    alert( Boolean(0) ); // false

    alert( Boolean("hello") ); // true
    alert( Boolean("") ); // false

<span class="important__type">Please note: the string with zero `"0"` is `true`</span>

Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript, a non-empty string is always `true`.

<a href="type-conversions.html#"
<a href="type-conversions.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( Boolean("0") ); // true
    alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)

## <a href="type-conversions.html#summary" id="summary" class="main__anchor">Summary</a>

The three most widely used type conversions are to string, to number, and to boolean.

**`String Conversion`** – Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`Numeric Conversion`** – Occurs in math operations. Can be performed with `Number(value)`.

The conversion follows the rules:

<table><thead><tr class="header"><th>Value</th><th>Becomes…</th></tr></thead><tbody><tr class="odd"><td><code>undefined</code></td><td><code>NaN</code></td></tr><tr class="even"><td><code>null</code></td><td><code>0</code></td></tr><tr class="odd"><td><code>true / false</code></td><td><code>1 / 0</code></td></tr><tr class="even"><td><code>string</code></td><td>The string is read “as is”, whitespaces from both sides are ignored. An empty string becomes <code>0</code>. An error gives <code>NaN</code>.</td></tr></tbody></table>

**`Boolean Conversion`** – Occurs in logical operations. Can be performed with `Boolean(value)`.

Follows the rules:

<table><thead><tr class="header"><th>Value</th><th>Becomes…</th></tr></thead><tbody><tr class="odd"><td><code>0</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>, <code>""</code></td><td><code>false</code></td></tr><tr class="even"><td>any other value</td><td><code>true</code></td></tr></tbody></table>

Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

- `undefined` is `NaN` as a number, not `0`.
- `"0"` and space-only strings like `" "` are true as a boolean.

Objects aren’t covered here. We’ll return to them later in the chapter [Object to primitive conversion](object-toprimitive.html) that is devoted exclusively to objects after we learn more basic things about JavaScript.

<a href="alert-prompt-confirm.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="operators.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftype-conversions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftype-conversions" </a>

<a href="tutorial/map.html" class="map">

## <a href="type-conversions.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="type-conversions.html#string-conversion" class="sidebar__link">String Conversion</a>
- <a href="type-conversions.html#numeric-conversion" class="sidebar__link">Numeric Conversion</a>
- <a href="type-conversions.html#boolean-conversion" class="sidebar__link">Boolean Conversion</a>
- <a href="type-conversions.html#summary" class="sidebar__link">Summary</a>

- <a href="type-conversions.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftype-conversions" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftype-conversions" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/07-type-conversions" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
