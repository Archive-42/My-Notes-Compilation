EN

langs\_\_title">عربي</span></a>

- <a href="iterable-keys.html"
  /iterable-keys"
  /iterable-keys"
  iterable-keysiterable-keys"

<!-- -->

iterable-keys"
iterable-keys"

- <a href="https://tr.javascript.info/"
  iterable-keys"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fiterable-keys"%2Fiterable-keys" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../map-set.html" Map and Set</span></a>

<a href="../map-set.html"

## Iterable keys

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We’d like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.

But that doesn’t work:

<a href="iterable-keys.html#"
<a href="iterable-keys.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let map = new Map();

    map.set("name", "John");

    let keys = map.keys();

    // Error: keys.push is not a function
    keys.push("more");

Why? How can we fix the code to make `keys.push` work?

solution

That’s because `map.keys()` returns an iterable, but not an array.

We can convert it into an array using `Array.from`:

<a href="iterable-keys.html#"
<a href="iterable-keys.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let map = new Map();

    map.set("name", "John");

    let keys = Array.from(map.keys());

    keys.push("more");

    alert(keys); // name, more
