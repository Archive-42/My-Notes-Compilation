EN

- <a href="https://ar.javascript.info/"
- <a href="array-unique-map.html"
  array-unique-map"
  /array-unique-map"
  array-unique-maparray-unique-map"

<!-- -->

array-unique-map"
/array-unique-map"

- <a href="https://tr.javascript.info/"
  ask/array-unique-map"k%2Farray-unique-map"%2Farray-unique-map" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../map-set.html" Map and Set</span></a>

<a href="../map-set.html"

## Filter unique array members

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let `arr` be an array.

Create a function `unique(arr)` that should return an array with unique items of `arr`.

For instance:

    function unique(arr) {
      /* your code */
    }

    let values = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    alert( unique(values) ); // Hare, Krishna, :-O

P.S. Here strings are used, but can be values of any type.

P.P.S. Use `Set` to store unique values.

[Open a sandbox with tests.](https://plnkr.co/edit/bnR28ae4ErRl45XQ?p=preview)

solution

    function unique(arr) {
      return Array.from(new Set(arr));
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/4pQARSNmQTlDKMgI?p=preview)
