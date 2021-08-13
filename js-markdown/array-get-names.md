array-get-names"

- <a href="array-get-names.html"
  array-get-names"
  /array-get-names"
  array-get-namesarray-get-names"

<!-- -->

array-get-names"
/array-get-names"
/array-get-names"
ask/array-get-names"k%2Farray-get-names"%2Farray-get-names" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Map to names

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

You have an array of `user` objects, each one has `user.name`. Write the code that converts it into an array of names.

For instance:

    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 28 };

    let users = [ john, pete, mary ];

    let names = /* ... your code */

    alert( names ); // John, Pete, Mary

solution

<a href="array-get-names.html#"
<a href="array-get-names.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 28 };

    let users = [ john, pete, mary ];

    let names = users.map(item => item.name);

    alert( names ); // John, Pete, Mary
