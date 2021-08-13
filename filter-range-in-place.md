filter-range-in-place"

- <a href="filter-range-in-place.html"
  /filter-range-in-place"
  /filter-range-in-place"
  filter-range-in-placefilter-range-in-place"

<!-- -->

filter-range-in-place"
filter-range-in-place"
/filter-range-in-place"
filter-range-in-place"

k%2Ffilter-range-in-place"%2Ffilter-range-in-place" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Filter range "in place"

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write a function `filterRangeInPlace(arr, a, b)` that gets an array `arr` and removes from it all values except those that are between `a` and `b`. The test is: `a ≤ arr[i] ≤ b`.

The function should only modify the array. It should not return anything.

For instance:

    let arr = [5, 3, 8, 1];

    filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

    alert( arr ); // [3, 1]

[Open a sandbox with tests.](https://plnkr.co/edit/mSfnPWlrdfb1Tcpu?p=preview)

solution

<a href="filter-range-in-place.html#"
<a href="filter-range-in-place.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function filterRangeInPlace(arr, a, b) {

      for (let i = 0; i < arr.length; i++) {
        let val = arr[i];

        // remove if outside of the interval
        if (val < a || val > b) {
          arr.splice(i, 1);
          i--;
        }
      }

    }

    let arr = [5, 3, 8, 1];

    filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

    alert( arr ); // [3, 1]

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/o8KyEG4ZvVkvnw0E?p=preview)
