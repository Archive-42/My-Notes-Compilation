reduce-object"

- <a href="reduce-object.html"
  /reduce-object"

reduce-objectreduce-object"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href="
- <a href="https://tr.javascript.info/"
  reduce-object"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Freduce-object"%2Freduce-object" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Create keyed object from array

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Let’s say we received an array of users in the form `{id:..., name:..., age:... }`.

Create a function `groupById(arr)` that creates an object from it, with `id` as the key, and array items as values.

For example:

    let users = [
      {id: 'john', name: "John Smith", age: 20},
      {id: 'ann', name: "Ann Smith", age: 24},
      {id: 'pete', name: "Pete Peterson", age: 31},
    ];

    let usersById = groupById(users);

    /*
    // after the call we should have:

    usersById = {
      john: {id: 'john', name: "John Smith", age: 20},
      ann: {id: 'ann', name: "Ann Smith", age: 24},
      pete: {id: 'pete', name: "Pete Peterson", age: 31},
    }
    */

Such function is really handy when working with server data.

In this task we assume that `id` is unique. There may be no two array items with the same `id`.

Please use array `.reduce` method in the solution.

[Open a sandbox with tests.](https://plnkr.co/edit/liRZR4Lgi4WBxGHg?p=preview)

solution

    function groupById(array) {
      return array.reduce((obj, value) => {
        obj[value.id] = value;
        return obj;
      }, {})
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/onndmypwBY7MOyGS?p=preview)
