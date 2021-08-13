random-min-max"

- <a href="random-min-max.html"
  /random-min-max"
  /random-min-max"
  random-min-maxrandom-min-max"

<!-- -->

- <a href="https://ko.javascript.info/"
  random-min-max"
  /random-min-max"
  random-min-max"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frandom-min-max"%2Frandom-min-max" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../number.html" Numbers</span></a>

<a href="../number.html"

## A random number from min to max

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

The built-in function `Math.random()` creates a random value from `0` to `1` (not including `1`).

Write the function `random(min, max)` to generate a random floating-point number from `min` to `max` (not including `max`).

Examples of its work:

    alert( random(1, 5) ); // 1.2345623452
    alert( random(1, 5) ); // 3.7894332423
    alert( random(1, 5) ); // 4.3435234525

solution

We need to “map” all values from the interval 0…1 into values from `min` to `max`.

That can be done in two stages:

1.  If we multiply a random number from 0…1 by `max-min`, then the interval of possible values increases `0..1` to `0..max-min`.
2.  Now if we add `min`, the possible interval becomes from `min` to `max`.

The function:

<a href="random-min-max.html#"
<a href="random-min-max.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function random(min, max) {
      return min + Math.random() * (max - min);
    }

    alert( random(1, 5) );
    alert( random(1, 5) );
    alert( random(1, 5) );
