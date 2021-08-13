EN

- <a href="https://ar.javascript.info/"
- <a href="find-decimal-numbers.html"
  /find-decimal-numbers"

find-decimal-numbersfind-decimal-numbers"

<!-- -->

find-decimal-numbers"
find-decimal-numbers"
/find-decimal-numbers"
find-decimal-numbers"

k%2Ffind-decimal-numbers"%2Ffind-decimal-numbers" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-groups.html" Capturing groups</span></a>

<a href="../regexp-groups.html"

## Find all numbers

Write a regexp that looks for all decimal numbers including integer ones, with the floating point and negative ones.

An example of use:

    let regexp = /your regexp/g;

    let str = "-1.5 0 2 -123.4.";

    alert( str.match(regexp) ); // -1.5, 0, 2, -123.4

solution

A positive number with an optional decimal part is: `\d+(\.\d+)?`.

Let’s add the optional `-` in the beginning:

<a href="find-decimal-numbers.html#"
<a href="find-decimal-numbers.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /-?\d+(\.\d+)?/g;

    let str = "-1.5 0 2 -123.4.";

    alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
