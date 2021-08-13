EN

langs\_\_title">عربي</span></a>

- <a href="find-text-manydots.html"
  /find-text-manydots"
  /find-text-manydots"
  find-text-manydotsfind-text-manydots"

<!-- -->

- /"
  find-text-manydots"
- <a href="https://tr.javascript.info/"
  find-text-manydots"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffind-text-manydots"%2Ffind-text-manydots" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-quantifiers.html" Quantifiers +, \*, ? and {n}</span></a>

<a href="../regexp-quantifiers.html"

## How to find an ellipsis "..." ?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a regexp to find ellipsis: 3 (or more?) dots in a row.

Check it:

    let regexp = /your regexp/g;
    alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....

solution

Solution:

<a href="find-text-manydots.html#"
<a href="find-text-manydots.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /\.{3,}/g;
    alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....

Please note that the dot is a special character, so we have to escape it and insert as `\.`.
