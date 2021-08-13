ucfirst"

- <a href="ucfirst.html"
  /ucfirst"
  /ucfirst"
  ucfirst"
  task/ucfirst"

<!-- -->

ucfirst"
ucfirst"
/ucfirst"
ucfirst"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fucfirst"%2Fucfirst" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../string.html" Strings</span></a>

<a href="../string.html"

## Uppercase the first character

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `ucFirst(str)` that returns the string `str` with the uppercased first character, for instance:

    ucFirst("john") == "John";

[Open a sandbox with tests.](https://plnkr.co/edit/T9YVunJx5H2UaD1d?p=preview)

solution

We can’t “replace” the first character, because strings in JavaScript are immutable.

But we can make a new string based on the existing one, with the uppercased first character:

    let newStr = str[0].toUpperCase() + str.slice(1);

There’s a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn’t have the `toUpperCase()` method, we’ll get an error.

There are two variants here:

1.  Use `str.charAt(0)`, as it always returns a string (maybe empty).
2.  Add a test for an empty string.

Here’s the 2nd variant:

<a href="ucfirst.html#"
<a href="ucfirst.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function ucFirst(str) {
      if (!str) return str;

      return str[0].toUpperCase() + str.slice(1);
    }

    alert( ucFirst("john") ); // John

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/6d1AG4rJGgLKmI3E?p=preview)
