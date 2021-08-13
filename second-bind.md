EN

langs\_\_title">عربي</span></a>

- <a href="second-bind.html"
  /second-bind"

second-bindsecond-bind"

<!-- -->

second-bind"
second-bind"
/second-bind"
second-bind"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsecond-bind"%2Fsecond-bind" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../bind.html" Function binding</span></a>

<a href="../bind.html"

## Second bind

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Can we change `this` by additional binding?

What will be the output?

    function f() {
      alert(this.name);
    }

    f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

    f();

solution

The answer: **John**.

<a href="second-bind.html#"
<a href="second-bind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function f() {
      alert(this.name);
    }

    f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

    f(); // John

The exotic [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) object returned by `f.bind(...)` remembers the context (and arguments if provided) only at creation time.

A function cannot be re-bound.
