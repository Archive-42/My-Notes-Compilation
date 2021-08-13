rewrite-function-question-or"

- <a href="rewrite-function-question-or.html"
  /rewrite-function-question-or"
  /rewrite-function-question-or"
  rewrite-function-question-orrewrite-function-question-or"

<!-- -->

rewrite-function-question-or"
rewrite-function-question-or"
/rewrite-function-question-or"
rewrite-function-question-or"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frewrite-function-question-or"%2Frewrite-function-question-or" </a>

<a href="../function-basics.html" Functions</span></a>

<a href="../function-basics.html"

## Rewrite the function using '?' or '||'

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

The following function returns `true` if the parameter `age` is greater than `18`.

Otherwise it asks for a confirmation and returns its result.

    function checkAge(age) {
      if (age > 18) {
        return true;
      } else {
        return confirm('Did parents allow you?');
      }
    }

Rewrite it, to perform the same, but without `if`, in a single line.

Make two variants of `checkAge`:

1.  Using a question mark operator `?`
2.  Using OR `||`

solution

Using a question mark operator `'?'`:

    function checkAge(age) {
      return (age > 18) ? true : confirm('Did parents allow you?');
    }

Using OR `||` (the shortest variant):

    function checkAge(age) {
      return (age > 18) || confirm('Did parents allow you?');
    }

Note that the parentheses around `age > 18` are not required here. They exist for better readability.
