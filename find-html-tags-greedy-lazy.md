EN

- <a href="https://ar.javascript.info/"
- <a href="find-html-tags-greedy-lazy.html"
  /find-html-tags-greedy-lazy"
  /find-html-tags-greedy-lazy"
  find-html-tags-greedy-lazyfind-html-tags-greedy-lazy"

<!-- -->

find-html-tags-greedy-lazy"
find-html-tags-greedy-lazy"
/find-html-tags-greedy-lazy"
find-html-tags-greedy-lazy"

k%2Ffind-html-tags-greedy-lazy"%2Ffind-html-tags-greedy-lazy" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-greedy-and-lazy.html" Greedy and lazy quantifiers</span></a>

<a href="../regexp-greedy-and-lazy.html"

## Find HTML tags

Create a regular expression to find all (opening and closing) HTML tags with their attributes.

An example of use:

<a href="find-html-tags-greedy-lazy.html#"
<a href="find-html-tags-greedy-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /your regexp/g;

    let str = '<> <a href="/"> <input type="radio" checked> <b>';

    alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'

Here we assume that tag attributes may not contain `<` and `>` (inside quotes too), that simplifies things a bit.

solution

The solution is `<[^<>]+>`.

<a href="find-html-tags-greedy-lazy.html#"
<a href="find-html-tags-greedy-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /<[^<>]+>/g;

    let str = '<> <a href="/"> <input type="radio" checked> <b>';

    alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
