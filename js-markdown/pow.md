pow"

- <a href="pow.html"
  /pow"
  /pow"
  powpow"

<!-- -->

pow"
pow"
/pow"
pow"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fpow"%2Fpow" </a>

<a href="../function-basics.html" Functions</span></a>

<a href="../function-basics.html"

## Function pow(x,n)

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write a function `pow(x,n)` that returns `x` in power `n`. Or, in other words, multiplies `x` by itself `n` times and returns the result.

    pow(3, 2) = 3 * 3 = 9
    pow(3, 3) = 3 * 3 * 3 = 27
    pow(1, 100) = 1 * 1 * ...* 1 = 1

Create a web-page that prompts for `x` and `n`, and then shows the result of `pow(x,n)`.

[Run the demo](pow.html#)

P.S. In this task the function should support only natural values of `n`: integers up from `1`.

solution

<a href="pow.html#"
<a href="pow.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function pow(x, n) {
      let result = x;

      for (let i = 1; i < n; i++) {
        result *= x;
      }

      return result;
    }

    let x = prompt("x?", '');
    let n = prompt("n?", '');

    if (n < 1) {
      alert(`Power ${n} is not supported, use a positive integer`);
    } else {
      alert( pow(x, n) );
    }
