find-non-negative-integers"

- <a href="find-non-negative-integers.html"
  /find-non-negative-integers"

find-non-negative-integersfind-non-negative-integers"

<!-- -->

find-non-negative-integers"
find-non-negative-integers"
/find-non-negative-integers"
find-non-negative-integers"

k%2Ffind-non-negative-integers"%2Ffind-non-negative-integers" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-lookahead-lookbehind.html" Lookahead and lookbehind</span></a>

<a href="../regexp-lookahead-lookbehind.html"

## Find non-negative integers

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

<a href="find-non-negative-integers.html#"
<a href="find-non-negative-integers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(?<!-)\d+/g;

    let str = "0 12 -5 123 -18";

    console.log( str.match(regexp) ); // 0, 12, 123, 8

As you can see, it matches `8`, from `-18`. To exclude it, we need to ensure that the regexp starts matching a number not from the middle of another (non-matching) number.

We can do it by specifying another negative lookbehind: `(?<!-)(?<!\d)\d+`. Now `(?<!\d)` ensures that a match does not start after another digit, just what we need.

We can also join them into a single lookbehind here:

<a href="find-non-negative-integers.html#"
<a href="find-non-negative-integers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(?<![-\d])\d+/g;

    let str = "0 12 -5 123 -18";

    alert( str.match(regexp) ); // 0, 12, 123
