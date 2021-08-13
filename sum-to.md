sum-to"

- <a href="sum-to.html"
  /sum-to"
  /sum-to"
  sum-to"
  task/sum-to"

<!-- -->

sum-to"
sum-to"
/sum-to"
sum-to"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsum-to"%2Fsum-to" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../recursion.html" Recursion and stack</span></a>

<a href="../recursion.html"

## Sum all numbers till the given one

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `sumTo(n)` that calculates the sum of numbers `1 + 2 + ... + n`.

For instance:

    sumTo(1) = 1
    sumTo(2) = 2 + 1 = 3
    sumTo(3) = 3 + 2 + 1 = 6
    sumTo(4) = 4 + 3 + 2 + 1 = 10
    ...
    sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

Make 3 solution variants:

1.  Using a for loop.
2.  Using a recursion, cause `sumTo(n) = n + sumTo(n-1)` for `n > 1`.
3.  Using the [arithmetic progression](https://en.wikipedia.org/wiki/Arithmetic_progression) formula.

An example of the result:

    function sumTo(n) { /*... your code ... */ }

    alert( sumTo(100) ); // 5050

P.S. Which solution variant is the fastest? The slowest? Why?

P.P.S. Can we use recursion to count `sumTo(100000)`?

solution

The solution using a loop:

<a href="sum-to.html#"
<a href="sum-to.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sumTo(n) {
      let sum = 0;
      for (let i = 1; i <= n; i++) {
        sum += i;
      }
      return sum;
    }

    alert( sumTo(100) );

The solution using recursion:

<a href="sum-to.html#"
<a href="sum-to.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sumTo(n) {
      if (n == 1) return 1;
      return n + sumTo(n - 1);
    }

    alert( sumTo(100) );

The solution using the formula: `sumTo(n) = n*(n+1)/2`:

<a href="sum-to.html#"
<a href="sum-to.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sumTo(n) {
      return n * (n + 1) / 2;
    }

    alert( sumTo(100) );

P.S. Naturally, the formula is the fastest solution. It uses only 3 operations for any number `n`. The math helps!

The loop variant is the second in terms of speed. In both the recursive and the loop variant we sum the same numbers. But the recursion involves nested calls and execution stack management. That also takes resources, so it’s slower.

P.P.S. Some engines support the “tail call” optimization: if a recursive call is the very last one in the function (like in `sumTo` above), then the outer function will not need to resume the execution, so the engine doesn’t need to remember its execution context. That removes the burden on memory, so counting `sumTo(100000)` becomes possible. But if the JavaScript engine does not support tail call optimization (most of them don’t), there will be an error: maximum stack size exceeded, because there’s usually a limitation on the total stack size.
