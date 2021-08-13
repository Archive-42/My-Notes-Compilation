EN

- <a href="https://ar.javascript.info/"
- <a href="eval-calculator.html"
  /eval-calculator"
  /eval-calculator"
  eval-calculatoreval-calculator"

<!-- -->

eval-calculator"
eval-calculator"
/eval-calculator"
eval-calculator"

k%2Feval-calculator"%2Feval-calculator" </a>

<a href="../js-misc.html" Miscellaneous</span></a>

<a href="../eval.html" Eval: run a code string</span></a>

<a href="../eval.html"

## Eval-calculator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a calculator that prompts for an arithmetic expression and returns its result.

There’s no need to check the expression for correctness in this task. Just evaluate and return the result.

[Run the demo](eval-calculator.html#)

solution

Let’s use `eval` to calculate the maths expression:

<a href="eval-calculator.html#"
<a href="eval-calculator.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let expr = prompt("Type an arithmetic expression?", '2*3+2');

    alert( eval(expr) );

The user can input any text or code though.

To make things safe, and limit it to arithmetics only, we can check the `expr` using a [regular expression](../regular-expressions.html), so that it only may contain digits and operators.
