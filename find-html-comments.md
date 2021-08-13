EN

- <a href="https://ar.javascript.info/"
- <a href="find-html-comments.html"
  /find-html-comments"
  /find-html-comments"
  find-html-commentsfind-html-comments"

<!-- -->

- <a href="https://ko.javascript.info/"
  find-html-comments"
- <a href="https://tr.javascript.info/"
  find-html-comments"

k%2Ffind-html-comments"%2Ffind-html-comments" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-greedy-and-lazy.html" Greedy and lazy quantifiers</span></a>

<a href="../regexp-greedy-and-lazy.html"

## Find HTML comments

Find all HTML comments in the text:

    let regexp = /your regexp/g;

    let str = `... <!-- My -- comment
     test --> ..  <!----> ..
    `;

    alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'

solution

We need to find the beginning of the comment `<!--`, then everything till the end of `-->`.

An acceptable variant is `<!--.*?-->` – the lazy quantifier makes the dot stop right before `-->`. We also need to add flag `s` for the dot to include newlines.

Otherwise multiline comments won’t be found:

<a href="find-html-comments.html#"
<a href="find-html-comments.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /<!--.*?-->/gs;

    let str = `... <!-- My -- comment
     test --> ..  <!----> ..
    `;

    alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
