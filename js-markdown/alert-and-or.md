alert-and-or"

- <a href="alert-and-or.html"
  alert-and-or"
  /alert-and-or"
  alert-and-oralert-and-or"

<!-- -->

alert-and-or"
/alert-and-or"
/alert-and-or"
ask/alert-and-or"k%2Falert-and-or"%2Falert-and-or" </a>

<a href="../logical-operators.html" Logical operators</span></a>

<a href="../logical-operators.html"

## The result of OR AND OR

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What will the result be?

    alert( null || 2 && 3 || 4 );

solution

The answer: `3`.

<a href="alert-and-or.html#"
<a href="alert-and-or.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( null || 2 && 3 || 4 );

The precedence of AND `&&` is higher than `||`, so it executes first.

The result of `2 && 3 = 3`, so the expression becomes:

    null || 3 || 4

Now the result is the first truthy value: `3`.
