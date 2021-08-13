count-properties"

- <a href="count-properties.html"
  /count-properties"
  /count-properties"
  count-propertiescount-properties"

<!-- -->

count-properties"
count-properties"
/count-properties"
count-properties"

k%2Fcount-properties"%2Fcount-properties" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../keys-values-entries.html" Object.keys, values, entries</span></a>

<a href="../keys-values-entries.html"

## Count properties

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `count(obj)` that returns the number of properties in the object:

    let user = {
      name: 'John',
      age: 30
    };

    alert( count(user) ); // 2

Try to make the code as short as possible.

P.S. Ignore symbolic properties, count only “regular” ones.

[Open a sandbox with tests.](https://plnkr.co/edit/vPFL4Dyi1Wmml0lm?p=preview)

solution

    function count(obj) {
      return Object.keys(obj).length;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/YDO6lp8tdktgRApU?p=preview)
