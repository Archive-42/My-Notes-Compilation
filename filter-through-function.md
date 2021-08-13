filter-through-function"

- <a href="filter-through-function.html"
  /filter-through-function"
  /filter-through-function"
  filter-through-functionfilter-through-function"

<!-- -->

filter-through-function"
filter-through-function"
/filter-through-function"
filter-through-function"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffilter-through-function"%2Ffilter-through-function" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Filter through function

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have a built-in method `arr.filter(f)` for arrays. It filters all elements through the function `f`. If it returns `true`, then that element is returned in the resulting array.

Make a set of “ready to use” filters:

- `inBetween(a, b)` – between `a` and `b` or equal to them (inclusively).
- `inArray([...])` – in the given array.

The usage must be like this:

- `arr.filter(inBetween(3,6))` – selects only values between 3 and 6.
- `arr.filter(inArray([1,2,3]))` – selects only elements matching with one of the members of `[1,2,3]`.

For instance:

    /* .. your code for inBetween and inArray */
    let arr = [1, 2, 3, 4, 5, 6, 7];

    alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

    alert( arr.filter(inArray([1, 2, 10])) ); // 1,2

[Open a sandbox with tests.](https://plnkr.co/edit/TYqFVjCctR5V4gpt?p=preview)

solution

Filter inBetween

#### Filter inBetween

<a href="filter-through-function.html#"
<a href="filter-through-function.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function inBetween(a, b) {
      return function(x) {
        return x >= a && x <= b;
      };
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

Filter inArray

#### Filter inArray

<a href="filter-through-function.html#"
<a href="filter-through-function.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function inArray(arr) {
      return function(x) {
        return arr.includes(x);
      };
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    alert( arr.filter(inArray([1, 2, 10])) ); // 1,2

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/qDqXk2C7FrIUTdOP?p=preview)
