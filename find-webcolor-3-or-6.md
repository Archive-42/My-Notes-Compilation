EN

langs\_\_title">عربي</span></a>

- <a href="find-webcolor-3-or-6.html"
  /find-webcolor-3-or-6"

find-webcolor-3-or-6find-webcolor-3-or-6"

<!-- -->

- <a href="https://ko.javascript.info/"
  find-webcolor-3-or-6"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffind-webcolor-3-or-6"%2Ffind-webcolor-3-or-6" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-groups.html" Capturing groups</span></a>

<a href="../regexp-groups.html"

## Find color in the format \#abc or \#abcdef

Write a RegExp that matches colors in the format `#abc` or `#abcdef`. That is: `#` followed by 3 or 6 hexadecimal digits.

Usage example:

    let regexp = /your regexp/g;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef

P.S. This should be exactly 3 or 6 hex digits. Values with 4 digits, such as `#abcd`, should not match.

solution

A regexp to search 3-digit color `#abc`: `/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don’t need more or less. The color has either 3 or 6 digits.

Let’s use the quantifier `{1,2}` for that: we’ll have `/#([a-f0-9]{3}){1,2}/i`.

Here the pattern `[a-f0-9]{3}` is enclosed in parentheses to apply the quantifier `{1,2}`.

In action:

<a href="find-webcolor-3-or-6.html#"
<a href="find-webcolor-3-or-6.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#([a-f0-9]{3}){1,2}/gi;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef #abc

There’s a minor problem here: the pattern found `#abc` in `#abcd`. To prevent that we can add `\b` to the end:

<a href="find-webcolor-3-or-6.html#"
<a href="find-webcolor-3-or-6.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef
