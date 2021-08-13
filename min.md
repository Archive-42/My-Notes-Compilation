min"

- <a href="min.html"
  /min"
  /min"
  minmin"

<!-- -->

min"
min"
/min"
min"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmin"%2Fmin" </a>

<a href="../function-basics.html" Functions</span></a>

<a href="../function-basics.html"

## Function min(a, b)

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 1</span>

Write a function `min(a,b)` which returns the least of two numbers `a` and `b`.

For instance:

    min(2, 5) == 2
    min(3, -1) == -1
    min(1, 1) == 1

solution

A solution using `if`:

    function min(a, b) {
      if (a < b) {
        return a;
      } else {
        return b;
      }
    }

A solution with a question mark operator `'?'`:

    function min(a, b) {
      return a < b ? a : b;
    }

P.S. In the case of an equality `a == b` it does not matter what to return.
