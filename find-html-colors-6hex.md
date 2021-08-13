EN

- <a href="https://ar.javascript.info/"
- <a href="find-html-colors-6hex.html"
  /find-html-colors-6hex"
  /find-html-colors-6hex"
  find-html-colors-6hexfind-html-colors-6hex"

<!-- -->

- <a href="https://ko.javascript.info/"
  find-html-colors-6hex"
- <a href="https://tr.javascript.info/"
  find-html-colors-6hex"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffind-html-colors-6hex"%2Ffind-html-colors-6hex" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-quantifiers.html" Quantifiers +, \*, ? and {n}</span></a>

<a href="../regexp-quantifiers.html"

## Regexp for HTML colors

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

<a href="find-html-colors-6hex.html#"
<a href="find-html-colors-6hex.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#[a-f0-9]{6}/gi;

    let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

    alert( str.match(regexp) );  // #121212,#AA00ef

The problem is that it finds the color in longer sequences:

<a href="find-html-colors-6hex.html#"
<a href="find-html-colors-6hex.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456

To fix that, we can add `\b` to the end:

<a href="find-html-colors-6hex.html#"
<a href="find-html-colors-6hex.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // color
    alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

    // not a color
    alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
