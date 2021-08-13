if-else-required"

- <a href="if-else-required.html"
  /if-else-required"
  /if-else-required"
  if-else-requiredif-else-required"

<!-- -->

if-else-required"
if-else-required"
/if-else-required"
if-else-required"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fif-else-required"%2Fif-else-required" </a>

<a href="../function-basics.html" Functions</span></a>

<a href="../function-basics.html"

## Is "else" required?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

The following function returns `true` if the parameter `age` is greater than `18`.

Otherwise it asks for a confirmation and returns its result:

    function checkAge(age) {
      if (age > 18) {
        return true;
      } else {
        // ...
        return confirm('Did parents allow you?');
      }
    }

Will the function work differently if `else` is removed?

    function checkAge(age) {
      if (age > 18) {
        return true;
      }
      // ...
      return confirm('Did parents allow you?');
    }

Is there any difference in the behavior of these two variants?

solution

No difference.
