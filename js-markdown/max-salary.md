EN

langs\_\_title">عربي</span></a>

- <a href="max-salary.html"
  /max-salary"
  /max-salary"
  max-salarymax-salary"

<!-- -->

max-salary"
max-salary"
/max-salary"
max-salary"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmax-salary"%2Fmax-salary" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../destructuring-assignment.html" Destructuring assignment</span></a>

<a href="../destructuring-assignment.html"

## The maximal salary

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There is a `salaries` object:

    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

Create the function `topSalary(salaries)` that returns the name of the top-paid person.

- If `salaries` is empty, it should return `null`.
- If there are multiple top-paid persons, return any of them.

P.S. Use `Object.entries` and destructuring to iterate over key/value pairs.

[Open a sandbox with tests.](https://plnkr.co/edit/E2ihC75K0EGKA6sR?p=preview)

solution

    function topSalary(salaries) {

      let maxSalary = 0;
      let maxName = null;

      for(const [name, salary] of Object.entries(salaries)) {
        if (maxSalary < salary) {
          maxSalary = salary;
          maxName = name;
        }
      }

      return maxName;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/zsLbuDmTWUKt5is0?p=preview)
