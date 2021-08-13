finally-or-code-after"

- <a href="finally-or-code-after.html"
  /finally-or-code-after"
  /finally-or-code-after"
  finally-or-code-afterfinally-or-code-after"

<!-- -->

finally-or-code-after"
finally-or-code-after"
/finally-or-code-after"
finally-or-code-after"

k%2Ffinally-or-code-after"%2Ffinally-or-code-after" </a>

<a href="../error-handling.html" Error handling</span></a>

<a href="../try-catch.html" Error handling, "try...catch"</span></a>

<a href="../try-catch.html"

## Finally or just the code?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Compare the two code fragments.

1.  The first one uses `finally` to execute the code after `try...catch`:

        try {
          work work
        } catch (err) {
          handle errors
        } finally {
          cleanup the working space
        }

2.  The second fragment puts the cleaning right after `try...catch`:

        try {
          work work
        } catch (err) {
          handle errors
        }

        cleanup the working space

We definitely need the cleanup after the work, doesn’t matter if there was an error or not.

Is there an advantage here in using `finally` or both code fragments are equal? If there is such an advantage, then give an example when it matters.

solution

The difference becomes obvious when we look at the code inside a function.

The behavior is different if there’s a “jump out” of `try...catch`.

For instance, when there’s a `return` inside `try...catch`. The `finally` clause works in case of _any_ exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.

<a href="finally-or-code-after.html#"
<a href="finally-or-code-after.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function f() {
      try {
        alert('start');
        return "result";
      } catch (err) {
        /// ...
      } finally {
        alert('cleanup!');
      }
    }

    f(); // cleanup!

…Or when there’s a `throw`, like here:

<a href="finally-or-code-after.html#"
<a href="finally-or-code-after.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function f() {
      try {
        alert('start');
        throw new Error("an error");
      } catch (err) {
        // ...
        if("can't handle the error") {
          throw err;
        }

      } finally {
        alert('cleanup!')
      }
    }

    f(); // cleanup!

It’s `finally` that guarantees the cleanup here. If we just put the code at the end of `f`, it wouldn’t run in these situations.
