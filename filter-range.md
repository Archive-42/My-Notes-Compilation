filter-range"

- <a href="filter-range.html"
  /filter-range"
  /filter-range"
  filter-rangefilter-range"

<!-- -->

filter-range"
filter-range"
/filter-range"
filter-range"

k%2Ffilter-range"%2Ffilter-range" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Filter range

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write a function `filterRange(arr, a, b)` that gets an array `arr`, looks for elements with values higher or equal to `a` and lower or equal to `b` and return a result as an array.

The function should not modify the array. It should return the new array.

For instance:

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    alert( filtered ); // 3,1 (matching values)

    alert( arr ); // 5,3,8,1 (not modified)

[Open a sandbox with tests.](https://plnkr.co/edit/N4Mo0b66zI1tqO3H?p=preview)

solution

<a href="filter-range.html#"
<a href="filter-range.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function filterRange(arr, a, b) {
      // added brackets around the expression for better readability
      return arr.filter(item => (a <= item && item <= b));
    }

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    alert( filtered ); // 3,1 (matching values)

    alert( arr ); // 5,3,8,1 (not modified)

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/fRfh74XbXGim2VmI?p=preview)
