create-array"

- <a href="create-array.html"
  /create-array"
  /create-array"
  create-arraycreate-array"

<!-- -->

create-array"
create-array"
/create-array"
create-array"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fcreate-array"%2Fcreate-array" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array.html" Arrays</span></a>

<a href="../array.html"

## Array operations.

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let’s try 5 array operations.

1.  Create an array `styles` with items “Jazz” and “Blues”.
2.  Append “Rock-n-Roll” to the end.
3.  Replace the value in the middle by “Classics”. Your code for finding the middle value should work for any arrays with odd length.
4.  Strip off the first value of the array and show it.
5.  Prepend `Rap` and `Reggae` to the array.

The array in the process:

    Jazz, Blues
    Jazz, Blues, Rock-n-Roll
    Jazz, Classics, Rock-n-Roll
    Classics, Rock-n-Roll
    Rap, Reggae, Classics, Rock-n-Roll

solution

<a href="create-array.html#"
<a href="create-array.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let styles = ["Jazz", "Blues"];
    styles.push("Rock-n-Roll");
    styles[Math.floor((styles.length - 1) / 2)] = "Classics";
    alert( styles.shift() );
    styles.unshift("Rap", "Reggae");
