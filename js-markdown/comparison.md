EN

- <a href="https://ar.javascript.info/comparison"
- <a href="comparison.html"
- <a href="https://es.javascript.info/comparison"
- <a href="https://fr.javascript.info/comparison"
- comparison"
  comparison"

<!-- -->

- /comparison"
- <a href=comparison"
- <a href="https://tr.javascript.info/comparison"
- <a href="https://zh.javascript.info/comparison"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcomparison" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcomparison" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

4th October 2020

# Comparisons

We know many comparison operators from maths.

In JavaScript they are written like this:

- Greater/less than: `a > b`, `a < b`.
- Greater/less than or equals: `a >= b`, `a <= b`.
- Equals: `a == b`, please note the double equality sign `==` means the equality test, while a single one `a = b` means an assignment.
- Not equals. In maths the notation is `≠`, but in JavaScript it’s written as `a != b`.

In this article we’ll learn more about different types of comparisons, how JavaScript makes them, including important peculiarities.

At the end you’ll find a good recipe to avoid “JavaScript quirks”-related issues.

## <a href="comparison.html#boolean-is-the-result" id="boolean-is-the-result" class="main__anchor">Boolean is the result</a>

All comparison operators return a boolean value:

- `true` – means “yes”, “correct” or “the truth”.
- `false` – means “no”, “wrong” or “not the truth”.

For example:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( 2 > 1 );  // true (correct)
    alert( 2 == 1 ); // false (wrong)
    alert( 2 != 1 ); // true (correct)

A comparison result can be assigned to a variable, just like any value:

<a href="comparison.html#"
<a href="comparison.html#"

    let result = 5 > 4; // assign the result of the comparison
    alert( result ); // true

## <a href="comparison.html#string-comparison" id="string-comparison" class="main__anchor">String comparison</a>

To see whether a string is greater than another, JavaScript uses the so-called “dictionary” or “lexicographical” order.

In other words, strings are compared letter-by-letter.

For example:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( 'Z' > 'A' ); // true
    alert( 'Glow' > 'Glee' ); // true
    alert( 'Bee' > 'Be' ); // true

The algorithm to compare two strings is simple:

1.  Compare the first character of both strings.
2.  If the first character from the first string is greater (or less) than the other string’s, then the first string is greater (or less) than the second. We’re done.
3.  Otherwise, if both strings’ first characters are the same, compare the second characters the same way.
4.  Repeat until the end of either string.
5.  If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.

In the first example above, the comparison `'Z' > 'A'` gets to a result at the first step.

The second comparison `'Glow'` and `'Glee'` needs more steps as strings are compared character-by-character:

1.  `G` is the same as `G`.
2.  `l` is the same as `l`.
3.  `o` is greater than `e`. Stop here. The first string is greater.

<span class="important__type">Not a real dictionary, but Unicode order</span>

The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it’s not exactly the same.

For instance, case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? The lowercase `"a"`. Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We’ll get back to specific details and consequences of this in the chapter [Strings](string.html).

## <a href="comparison.html#comparison-of-different-types" id="comparison-of-different-types" class="main__anchor">Comparison of different types</a>

When comparing values of different types, JavaScript converts the values to numbers.

For example:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( '2' > 1 ); // true, string '2' becomes a number 2
    alert( '01' == 1 ); // true, string '01' becomes a number 1

For boolean values, `true` becomes `1` and `false` becomes `0`.

For example:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( true == 1 ); // true
    alert( false == 0 ); // true

<span class="important__type">A funny consequence</span>

It is possible that at the same time:

- Two values are equal.
- One of them is `true` as a boolean and the other one is `false` as a boolean.

For example:

<a href="comparison.html#"
<a href="comparison.html#"

    let a = 0;
    alert( Boolean(a) ); // false

    let b = "0";
    alert( Boolean(b) ); // true

    alert(a == b); // true!

From JavaScript’s standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence `"0"` becomes `0`), while the explicit `Boolean` conversion uses another set of rules.

## <a href="comparison.html#strict-equality" id="strict-equality" class="main__anchor">Strict equality</a>

A regular equality check `==` has a problem. It cannot differentiate `0` from `false`:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( 0 == false ); // true

The same thing happens with an empty string:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( '' == false ); // true

This happens because operands of different types are converted to numbers by the equality operator `==`. An empty string, just like `false`, becomes a zero.

What to do if we’d like to differentiate `0` from `false`?

**A strict equality operator `===` checks the equality without type conversion.**

In other words, if `a` and `b` are of different types, then `a === b` immediately returns `false` without an attempt to convert them.

Let’s try it:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( 0 === false ); // false, because the types are different

There is also a “strict non-equality” operator `!==` analogous to `!=`.

The strict equality operator is a bit longer to write, but makes it obvious what’s going on and leaves less room for errors.

## <a href="comparison.html#comparison-with-null-and-undefined" id="comparison-with-null-and-undefined" class="main__anchor">Comparison with null and undefined</a>

There’s a non-intuitive behavior when `null` or `undefined` are compared to other values.

For a strict equality check `===`  
These values are different, because each of them is a different type.

<a href="comparison.html#"
<a href="comparison.html#"

    alert( null === undefined ); // false

For a non-strict check `==`  
There’s a special rule. These two are a “sweet couple”: they equal each other (in the sense of `==`), but not any other value.

<a href="comparison.html#"
<a href="comparison.html#"

    alert( null == undefined ); // true

For maths and other comparisons `< > <= >=`  
`null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let’s see some funny things that happen when we apply these rules. And, what’s more important, how to not fall into a trap with them.

### <a href="comparison.html#strange-result-null-vs-0" id="strange-result-null-vs-0" class="main__anchor">Strange result: null vs 0</a>

Let’s compare `null` with a zero:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( null > 0 );  // (1) false
    alert( null == 0 ); // (2) false
    alert( null >= 0 ); // (3) true

Mathematically, that’s strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That’s why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don’t equal anything else. That’s why (2) `null == 0` is false.

### <a href="comparison.html#an-incomparable-undefined" id="an-incomparable-undefined" class="main__anchor">An incomparable undefined</a>

The value `undefined` shouldn’t be compared to other values:

<a href="comparison.html#"
<a href="comparison.html#"

    alert( undefined > 0 ); // false (1)
    alert( undefined < 0 ); // false (2)
    alert( undefined == 0 ); // false (3)

Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null`, `undefined`, and no other value.

### <a href="comparison.html#avoid-problems" id="avoid-problems" class="main__anchor">Avoid problems</a>

Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there’s a solid way to avoid problems with them:

- Treat any comparison with `undefined/null` except the strict equality `===` with exceptional care.
- Don’t use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you’re really sure of what you’re doing. If a variable can have these values, check for them separately.

## <a href="comparison.html#summary" id="summary" class="main__anchor">Summary</a>

- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the “dictionary” order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.

## <a href="comparison.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="comparison.html#comparisons" id="comparisons" class="main__anchor">Comparisons</a>

<a href="task/comparison-questions.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What will be the result for these expressions?

    5 > 4
    "apple" > "pineapple"
    "2" > "12"
    undefined == null
    undefined === null
    null == "\n0\n"
    null === +"\n0\n"

solution

    5 > 4 → true
    "apple" > "pineapple" → false
    "2" > "12" → true
    undefined == null → true
    undefined === null → false
    null == "\n0\n" → false
    null === +"\n0\n" → false

Some of the reasons:

1.  Obviously, true.
2.  Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3.  Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4.  Values `null` and `undefined` equal each other only.
5.  Strict equality is strict. Different types from both sides lead to false.
6.  Similar to `(4)`, `null` only equals `undefined`.
7.  Strict equality of different types.

<a href="operators.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="ifelse.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcomparison" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcomparison" </a>

<a href="tutorial/map.html" class="map">

## <a href="comparison.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="comparison.html#boolean-is-the-result" class="sidebar__link">Boolean is the result</a>
- <a href="comparison.html#string-comparison" class="sidebar__link">String comparison</a>
- <a href="comparison.html#comparison-of-different-types" class="sidebar__link">Comparison of different types</a>
- <a href="comparison.html#strict-equality" class="sidebar__link">Strict equality</a>
- <a href="comparison.html#comparison-with-null-and-undefined" class="sidebar__link">Comparison with null and undefined</a>
- <a href="comparison.html#summary" class="sidebar__link">Summary</a>

- <a href="comparison.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="comparison.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fcomparison" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcomparison" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/09-comparison" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
