

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Filter unique array members

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Let `arr` be an array.

Create a function `unique(arr)` that should return an array with unique items of `arr`.

For instance:

    function unique(arr) {
      /* your code */
    }

    let strings = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    alert( unique(strings) ); // Hare, Krishna, :-O

[Open a sandbox with tests.](https://plnkr.co/edit/ENa34pnPw6gzgVPX?p=preview)

solution

Let’s walk the array items:

- For each item we’ll check if the resulting array already has that item.
- If it is so, then ignore, otherwise add to results.

<a href="array-unique.html#"
<a href="array-unique.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function unique(arr) {
      let result = [];

      for (let str of arr) {
        if (!result.includes(str)) {
          result.push(str);
        }
      }

      return result;
    }

    let strings = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    alert( unique(strings) ); // Hare, Krishna, :-O

The code works, but there’s a potential performance problem in it.

The method `result.includes(str)` internally walks the array `result` and compares each element against `str` to find the match.

So if there are `100` elements in `result` and no one matches `str`, then it will walk the whole `result` and do exactly `100` comparisons. And if `result` is large, like `10000`, then there would be `10000` comparisons.

That’s not a problem by itself, because JavaScript engines are very fast, so walk `10000` array is a matter of microseconds.

But we do such test for each element of `arr`, in the `for` loop.

So if `arr.length` is `10000` we’ll have something like `10000*10000` = 100 millions of comparisons. That’s a lot.

So the solution is only good for small arrays.

Further in the chapter [Map and Set](../map-set.html) we’ll see how to optimize it.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/9Kk95Qf0VFsqZokZ?p=preview)
