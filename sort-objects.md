sort-objects"

- <a href="sort-objects.html"
  /sort-objects"
  /sort-objects"
  sort-objectssort-objects"

<!-- -->

sort-objects"
sort-objects"
/sort-objects"
sort-objects"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsort-objects"%2Fsort-objects" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Sort users by age

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the function `sortByAge(users)` that gets an array of objects with the `age` property and sorts them by `age`.

For instance:

    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 28 };

    let arr = [ pete, john, mary ];

    sortByAge(arr);

    // now: [john, mary, pete]
    alert(arr[0].name); // John
    alert(arr[1].name); // Mary
    alert(arr[2].name); // Pete

solution

<a href="sort-objects.html#"
<a href="sort-objects.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sortByAge(arr) {
      arr.sort((a, b) => a.age - b.age);
    }

    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 28 };

    let arr = [ pete, john, mary ];

    sortByAge(arr);

    // now sorted is: [john, mary, pete]
    alert(arr[0].name); // John
    alert(arr[1].name); // Mary
    alert(arr[2].name); // Pete
