alert-or"

- <a href="alert-or.html"
  alert-or"
  /alert-or"
  alert-oralert-or"

<!-- -->

alert-or"
/alert-or"
/alert-or"
ask/alert-or"k%2Falert-or"%2Falert-or" </a>

<a href="../logical-operators.html" Logical operators</span></a>

<a href="../logical-operators.html"

## What's the result of OR'ed alerts?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

What will the code below output?

    alert( alert(1) || 2 || alert(3) );

solution

The answer: first `1`, then `2`.

<a href="alert-or.html#"
<a href="alert-or.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( alert(1) || 2 || alert(3) );

The call to `alert` does not return a value. Or, in other words, it returns `undefined`.

1.  The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2.  The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3.  The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.

There will be no `3`, because the evaluation does not reach `alert(3)`.
