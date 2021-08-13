why-this"

- <a href="why-this.html"
  /why-this"
  /why-this"
  why-this"
  task/why-this"

<!-- -->

why-this"

- <a href="
- <a href="https://tr.javascript.info/"
  why-this"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fwhy-this"%2Fwhy-this" </a>

<a href="../js-misc.html" Miscellaneous</span></a>

<a href="../reference-type.html" Reference Type</span></a>

<a href="../reference-type.html"

## Explain the value of "this"

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

In the code below we intend to call `obj.go()` method 4 times in a row.

But calls `(1)` and `(2)` works differently from `(3)` and `(4)`. Why?

<a href="why-this.html#"
<a href="why-this.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let obj, method;

    obj = {
      go: function() { alert(this); }
    };

    obj.go();               // (1) [object Object]

    (obj.go)();             // (2) [object Object]

    (method = obj.go)();    // (3) undefined

    (obj.go || obj.stop)(); // (4) undefined

solution

Here’s the explanations.

1.  That’s a regular object method call.

2.  The same, parentheses do not change the order of operations here, the dot is first anyway.

3.  Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:

        f = obj.go; // calculate the expression
        f();        // call what we have

    Here `f()` is executed as a function, without `this`.

4.  The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.

To explain the behavior of `(3)` and `(4)` we need to recall that property accessors (dot or square brackets) return a value of the Reference Type.

Any operation on it except a method call (like assignment `=` or `||`) turns it into an ordinary value, which does not carry the information allowing to set `this`.
