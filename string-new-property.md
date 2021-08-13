string-new-property"

- <a href="string-new-property.html"
  /string-new-property"
  /string-new-property"
  string-new-property"
  task/string-new-property"

<!-- -->

string-new-property"
string-new-property"
/string-new-property"
string-new-property"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fstring-new-property"%2Fstring-new-property" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../primitives-methods.html" Methods of primitives</span></a>

<a href="../primitives-methods.html"

## Can I add a string property?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Consider the following code:

    let str = "Hello";

    str.test = 5;

    alert(str.test);

How do you think, will it work? What will be shown?

solution

Try running it:

<a href="string-new-property.html#"
<a href="string-new-property.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "Hello";

    str.test = 5; // (*)

    alert(str.test);

Depending on whether you have `use strict` or not, the result may be:

1.  `undefined` (no strict mode)
2.  An error (strict mode).

Why? Let’s replay what’s happening at line `(*)`:

1.  When a property of `str` is accessed, a “wrapper object” is created.
2.  In strict mode, writing into it is an error.
3.  Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the “wrapper object” disappears, so in the last line `str` has no trace of the property.

**This example clearly shows that primitives are not objects.**

They can’t store additional data.
