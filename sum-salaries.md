sum-salaries"

- <a href="sum-salaries.html"
  /sum-salaries"
  /sum-salaries"
  sum-salaries"
  task/sum-salaries"

<!-- -->

sum-salaries"
sum-salaries"
/sum-salaries"
sum-salaries"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsum-salaries"%2Fsum-salaries" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../keys-values-entries.html" Object.keys, values, entries</span></a>

<a href="../keys-values-entries.html"

## Sum the properties

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There is a `salaries` object with arbitrary number of salaries.

Write the function `sumSalaries(salaries)` that returns the sum of all salaries using `Object.values` and the `for..of` loop.

If `salaries` is empty, then the result must be `0`.

For instance:

    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    alert( sumSalaries(salaries) ); // 650

[Open a sandbox with tests.](https://plnkr.co/edit/3GeBocsoIurq4kJU?p=preview)

solution

<a href="sum-salaries.html#"
<a href="sum-salaries.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sumSalaries(salaries) {

      let sum = 0;
      for (let salary of Object.values(salaries)) {
        sum += salary;
      }

      return sum; // 650
    }

    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    alert( sumSalaries(salaries) ); // 650

Or, optionally, we could also get the sum using `Object.values` and `reduce`:

    // reduce loops over array of salaries,
    // adding them up
    // and returns the result
    function sumSalaries(salaries) {
      return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/70glWlRJ22XYpdA7?p=preview)
