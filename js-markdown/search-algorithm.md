search-algorithm"

- <a href="search-algorithm.html"
  /search-algorithm"
  /search-algorithm"
  search-algorithmsearch-algorithm"

<!-- -->

search-algorithm"
search-algorithm"
/search-algorithm"
search-algorithm"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsearch-algorithm"%2Fsearch-algorithm" </a>

## Searching algorithm

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The task has two parts.

Given the following objects:

    let head = {
      glasses: 1
    };

    let table = {
      pen: 3
    };

    let bed = {
      sheet: 1,
      pillow: 2
    };

    let pockets = {
      money: 2000
    };

1.  Use `__proto__` to assign prototypes in a way that any property lookup will follow the path: `pockets` → `bed` → `table` → `head`. For instance, `pockets.pen` should be `3` (found in `table`), and `bed.glasses` should be `1` (found in `head`).
2.  Answer the question: is it faster to get `glasses` as `pockets.glasses` or `head.glasses`? Benchmark if needed.

solution

1.  Let’s add `__proto__`:

    <a href="search-algorithm.html#"
    <a href="search-algorithm.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let head = {
          glasses: 1
        };

        let table = {
          pen: 3,
          __proto__: head
        };

        let bed = {
          sheet: 1,
          pillow: 2,
          __proto__: table
        };

        let pockets = {
          money: 2000,
          __proto__: bed
        };

        alert( pockets.pen ); // 3
        alert( bed.glasses ); // 1
        alert( table.money ); // undefined

2.  In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype. They remember where the property was found and reuse it in the next request.

    For instance, for `pockets.glasses` they remember where they found `glasses` (in `head`), and next time will search right there. They are also smart enough to update internal caches if something changes, so that optimization is safe.
