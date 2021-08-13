is-empty"

- <a href="is-empty.html"
  /is-empty"
  /is-empty"
  is-emptyis-empty"

<!-- -->

is-empty"
is-empty"
/is-empty"
is-empty"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fis-empty"%2Fis-empty" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../object.html" Objects</span></a>

<a href="../object.html"

## Check for emptiness

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the function `isEmpty(obj)` which returns `true` if the object has no properties, `false` otherwise.

Should work like that:

    let schedule = {};

    alert( isEmpty(schedule) ); // true

    schedule["8:30"] = "get up";

    alert( isEmpty(schedule) ); // false

[Open a sandbox with tests.](https://plnkr.co/edit/OABZFsveJ4UTBLtz?p=preview)

solution

Just loop over the object and `return false` immediately if there’s at least one property.

    function isEmpty(obj) {
      for (let key in obj) {
        // if the loop has started, there is a property
        return false;
      }
      return true;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/zHDueHHp9F5yT8ry?p=preview)
