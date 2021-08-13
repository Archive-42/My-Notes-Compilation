item-value"

- <a href="item-value.html"
  /item-value"
  /item-value"
  item-valueitem-value"

<!-- -->

item-value"
item-value"
/item-value"
item-value"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fitem-value"%2Fitem-value" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array.html" Arrays</span></a>

<a href="../array.html"

## Is array copied?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

What is this code going to show?

    let fruits = ["Apples", "Pear", "Orange"];

    // push a new value into the "copy"
    let shoppingCart = fruits;
    shoppingCart.push("Banana");

    // what's in fruits?
    alert( fruits.length ); // ?

solution

The result is `4`:

<a href="item-value.html#"
<a href="item-value.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let fruits = ["Apples", "Pear", "Orange"];

    let shoppingCart = fruits;

    shoppingCart.push("Banana");

    alert( fruits.length ); // 4

That’s because arrays are objects. So both `shoppingCart` and `fruits` are the references to the same array.
