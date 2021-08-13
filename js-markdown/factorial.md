factorial"

- <a href="factorial.html"
  /factorial"
  /factorial"
  factorialfactorial"

<!-- -->

factorial"
factorial"
/factorial"
factorial"

k%2Ffactorial"%2Ffactorial" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../recursion.html" Recursion and stack</span></a>

<a href="../recursion.html"

## Calculate factorial

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

The [factorial](https://en.wikipedia.org/wiki/Factorial) of a natural number is a number multiplied by `"number minus one"`, then by `"number minus two"`, and so on till `1`. The factorial of `n` is denoted as `n!`

We can write a definition of factorial like this:

    n! = n * (n - 1) * (n - 2) * ...*1

Values of factorials for different `n`:

    1! = 1
    2! = 2 * 1 = 2
    3! = 3 * 2 * 1 = 6
    4! = 4 * 3 * 2 * 1 = 24
    5! = 5 * 4 * 3 * 2 * 1 = 120

The task is to write a function `factorial(n)` that calculates `n!` using recursive calls.

    alert( factorial(5) ); // 120

P.S. Hint: `n!` can be written as `n * (n-1)!` For instance: `3! = 3*2! = 3*2*1! = 6`

solution

By definition, a factorial `n!` can be written as `n * (n-1)!`.

In other words, the result of `factorial(n)` can be calculated as `n` multiplied by the result of `factorial(n-1)`. And the call for `n-1` can recursively descend lower, and lower, till `1`.

<a href="factorial.html#"
<a href="factorial.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function factorial(n) {
      return (n != 1) ? n * factorial(n - 1) : 1;
    }

    alert( factorial(5) ); // 120

The basis of recursion is the value `1`. We can also make `0` the basis here, doesn’t matter much, but gives one more recursive step:

<a href="factorial.html#"
<a href="factorial.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function factorial(n) {
      return n ? n * factorial(n - 1) : 1;
    }

    alert( factorial(5) ); // 120
