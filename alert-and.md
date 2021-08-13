alert-and"

- <a href="alert-and.html"
  alert-and"
  /alert-and"
  alert-andalert-and"

<!-- -->

alert-and"
/alert-and"
/alert-and"
ask/alert-and"k%2Falert-and"%2Falert-and" </a>

<a href="../logical-operators.html" Logical operators</span></a>

<a href="../logical-operators.html"

## What is the result of AND'ed alerts?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

What will this code show?

    alert( alert(1) && alert(2) );

solution

The answer: `1`, and then `undefined`.

<a href="alert-and.html#"
<a href="alert-and.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( alert(1) && alert(2) );

The call to `alert` returns `undefined` (it just shows a message, so there’s no meaningful return).

Because of that, `&&` evaluates the left operand (outputs `1`), and immediately stops, because `undefined` is a falsy value. And `&&` looks for a falsy value and returns it, so it’s done.
