EN

langs\_\_title">عربي</span></a>

- <a href="output-numbers-100ms.html"
  /output-numbers-100ms"
  /output-numbers-100ms"
  output-numbers-100msoutput-numbers-100ms"

<!-- -->

output-numbers-100ms"
output-numbers-100ms"
/output-numbers-100ms"
output-numbers-100ms"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Foutput-numbers-100ms"%2Foutput-numbers-100ms" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../settimeout-setinterval.html" Scheduling: setTimeout and setInterval</span></a>

<a href="../settimeout-setinterval.html"

## Output every second

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `printNumbers(from, to)` that outputs a number every second, starting from `from` and ending with `to`.

Make two variants of the solution.

1.  Using `setInterval`.
2.  Using nested `setTimeout`.

solution

Using `setInterval`:

<a href="output-numbers-100ms.html#"
<a href="output-numbers-100ms.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function printNumbers(from, to) {
      let current = from;

      let timerId = setInterval(function() {
        alert(current);
        if (current == to) {
          clearInterval(timerId);
        }
        current++;
      }, 1000);
    }

    // usage:
    printNumbers(5, 10);

Using nested `setTimeout`:

<a href="output-numbers-100ms.html#"
<a href="output-numbers-100ms.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function printNumbers(from, to) {
      let current = from;

      setTimeout(function go() {
        alert(current);
        if (current < to) {
          setTimeout(go, 1000);
        }
        current++;
      }, 1000);
    }

    // usage:
    printNumbers(5, 10);

Note that in both solutions, there is an initial delay before the first output. The function is called after `1000ms` the first time.

If we also want the function to run immediately, then we can add an additional call on a separate line, like this:

<a href="output-numbers-100ms.html#"
<a href="output-numbers-100ms.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function printNumbers(from, to) {
      let current = from;

      function go() {
        alert(current);
        if (current == to) {
          clearInterval(timerId);
        }
        current++;
      }

      go();
      let timerId = setInterval(go, 1000);
    }

    printNumbers(5, 10);
