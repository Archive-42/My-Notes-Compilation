truncate"

- <a href="truncate.html"
  /truncate"
  /truncate"
  truncate"
  task/truncate"

<!-- -->

truncate"
truncate"
/truncate"
truncate"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ftruncate"%2Ftruncate" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../string.html" Strings</span></a>

<a href="../string.html"

## Truncate the text

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `truncate(str, maxlength)` that checks the length of the `str` and, if it exceeds `maxlength` – replaces the end of `str` with the ellipsis character `"…"`, to make its length equal to `maxlength`.

The result of the function should be the truncated (if needed) string.

For instance:

    truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

    truncate("Hi everyone!", 20) = "Hi everyone!"

[Open a sandbox with tests.](https://plnkr.co/edit/bGScEEQPA6rNwF1R?p=preview)

solution

The maximal length must be `maxlength`, so we need to cut it a little shorter, to give space for the ellipsis.

Note that there is actually a single Unicode character for an ellipsis. That’s not three dots.

<a href="truncate.html#"
<a href="truncate.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function truncate(str, maxlength) {
      return (str.length > maxlength) ?
        str.slice(0, maxlength - 1) + '…' : str;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/qkJLsMAZO5MsjwF3?p=preview)
