strange-instanceof"

- <a href="strange-instanceof.html"
  /strange-instanceof"
  /strange-instanceof"
  strange-instanceof"
  task/strange-instanceof"

<!-- -->

strange-instanceof"
strange-instanceof"
/strange-instanceof"
strange-instanceof"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fstrange-instanceof"%2Fstrange-instanceof" </a>

<a href="../classes.html" Classes</span></a>

<a href="../instanceof.html" Class checking: "instanceof"</span></a>

<a href="../instanceof.html"

## Strange instanceof

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.

<a href="strange-instanceof.html#"
<a href="strange-instanceof.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function A() {}
    function B() {}

    A.prototype = B.prototype = {};

    let a = new A();

    alert( a instanceof B ); // true

solution

Yeah, looks strange indeed.

But `instanceof` does not care about the function, but rather about its `prototype`, that it matches against the prototype chain.

And here `a.__proto__ == B.prototype`, so `instanceof` returns `true`.

So, by the logic of `instanceof`, the `prototype` actually defines the type, not the constructor function.
