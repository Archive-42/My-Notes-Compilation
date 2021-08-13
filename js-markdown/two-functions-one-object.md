two-functions-one-object"

- <a href="two-functions-one-object.html"
  /two-functions-one-object"
  /two-functions-one-object"
  two-functions-one-object"
  task/two-functions-one-object"

<!-- -->

two-functions-one-object"
two-functions-one-object"
/two-functions-one-object"
two-functions-one-object"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ftwo-functions-one-object"%2Ftwo-functions-one-object" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../constructor-new.html" Constructor, operator "new"</span></a>

<a href="../constructor-new.html"

## Two functions – one object

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Is it possible to create functions `A` and `B` so that `new A() == new B()`?

    function A() { ... }
    function B() { ... }

    let a = new A;
    let b = new B;

    alert( a == b ); // true

If it is, then provide an example of their code.

solution

Yes, it’s possible.

If a function returns an object then `new` returns it instead of `this`.

So they can, for instance, return the same externally defined object `obj`:

<a href="two-functions-one-object.html#"
<a href="two-functions-one-object.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let obj = {};

    function A() { return obj; }
    function B() { return obj; }

    alert( new A() == new B() ); // true
