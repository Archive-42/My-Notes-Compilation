sum-interface"

- <a href="sum-interface.html"
  /sum-interface"
  /sum-interface"
  sum-interface"
  task/sum-interface"

<!-- -->

sum-interface"
sum-interface"
/sum-interface"
sum-interface"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsum-interface"%2Fsum-interface" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../number.html" Numbers</span></a>

<a href="../number.html"

## Sum numbers from the visitor

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a script that prompts the visitor to enter two numbers and then shows their sum.

[Run the demo](sum-interface.html#)

P.S. There is a gotcha with types.

solution

<a href="sum-interface.html#"
<a href="sum-interface.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = +prompt("The first number?", "");
    let b = +prompt("The second number?", "");

    alert( a + b );

Note the unary plus `+` before `prompt`. It immediately converts the value to a number.

Otherwise, `a` and `b` would be string their sum would be their concatenation, that is: `"1" + "2" = "12"`.
