fix-prompt"

- <a href="fix-prompt.html"
  /fix-prompt"
  /fix-prompt"
  fix-promptfix-prompt"

<!-- -->

fix-prompt"
fix-prompt"

- <a href="https://tr.javascript.info/"
  fix-prompt"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffix-prompt"%2Ffix-prompt" </a>

<a href="../operators.html" Basic operators, maths</span></a>

<a href="../operators.html"

## Fix the addition

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here’s a code that asks the user for two numbers and shows their sum.

It works incorrectly. The output in the example below is `12` (for default prompt values).

Why? Fix it. The result should be `3`.

<a href="fix-prompt.html#"
<a href="fix-prompt.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = prompt("First number?", 1);
    let b = prompt("Second number?", 2);

    alert(a + b); // 12

solution

The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.

<a href="fix-prompt.html#"
<a href="fix-prompt.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = "1"; // prompt("First number?", 1);
    let b = "2"; // prompt("Second number?", 2);

    alert(a + b); // 12

What we should do is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:

<a href="fix-prompt.html#"
<a href="fix-prompt.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = +prompt("First number?", 1);
    let b = +prompt("Second number?", 2);

    alert(a + b); // 3

Or in the `alert`:

<a href="fix-prompt.html#"
<a href="fix-prompt.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = prompt("First number?", 1);
    let b = prompt("Second number?", 2);

    alert(+a + +b); // 3

Using both unary and binary `+` in the latest code. Looks funny, doesn’t it?
