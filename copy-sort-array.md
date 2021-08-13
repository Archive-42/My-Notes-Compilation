copy-sort-array"

- <a href="copy-sort-array.html"
  /copy-sort-array"
  /copy-sort-array"
  copy-sort-arraycopy-sort-array"

<!-- -->

copy-sort-array"
copy-sort-array"
/copy-sort-array"
copy-sort-array"

k%2Fcopy-sort-array"%2Fcopy-sort-array" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Copy and sort array

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have an array of strings `arr`. We’d like to have a sorted copy of it, but keep `arr` unmodified.

Create a function `copySorted(arr)` that returns such a copy.

    let arr = ["HTML", "JavaScript", "CSS"];

    let sorted = copySorted(arr);

    alert( sorted ); // CSS, HTML, JavaScript
    alert( arr ); // HTML, JavaScript, CSS (no changes)

solution

We can use `slice()` to make a copy and run the sort on it:

<a href="copy-sort-array.html#"
<a href="copy-sort-array.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function copySorted(arr) {
      return arr.slice().sort();
    }

    let arr = ["HTML", "JavaScript", "CSS"];

    let sorted = copySorted(arr);

    alert( sorted );
    alert( arr );
