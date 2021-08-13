string-quotes"

- <a href="string-quotes.html"
  /string-quotes"
  /string-quotes"
  string-quotes"
  task/string-quotes"

<!-- -->

string-quotes"
string-quotes"

- <a href="https://tr.javascript.info/"
  string-quotes"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fstring-quotes"%2Fstring-quotes" </a>

<a href="../types.html" Data types</span></a>

<a href="../types.html"

## String quotes

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What is the output of the script?

    let name = "Ilya";

    alert( `hello ${1}` ); // ?

    alert( `hello ${"name"}` ); // ?

    alert( `hello ${name}` ); // ?

solution

Backticks embed the expression inside `${...}` into the string.

<a href="string-quotes.html#"
<a href="string-quotes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let name = "Ilya";

    // the expression is a number 1
    alert( `hello ${1}` ); // hello 1

    // the expression is a string "name"
    alert( `hello ${"name"}` ); // hello name

    // the expression is a variable, embed it
    alert( `hello ${name}` ); // hello Ilya
