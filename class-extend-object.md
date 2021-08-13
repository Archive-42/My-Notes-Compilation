class-extend-object"

- <a href="class-extend-object.html"
  class-extend-object"
  /class-extend-object"
  class-extend-object"
  "

<!-- -->

class-extend-object"
/class-extend-object"

- <a href="https://tr.javascript.info/"
  ask/class-extend-object"k%2Fclass-extend-object"%2Fclass-extend-object" </a>

<a href="../classes.html" Classes</span></a>

<a href="../static-properties-methods.html" Static properties and methods</span></a>

<a href="../static-properties-methods.html"

## Class extends Object?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

As we know, all objects normally inherit from `Object.prototype` and get access to “generic” object methods like `hasOwnProperty` etc.

For instance:

<a href="class-extend-object.html#"
<a href="class-extend-object.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit {
      constructor(name) {
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    // hasOwnProperty method is from Object.prototype
    alert( rabbit.hasOwnProperty('name') ); // true

But if we spell it out explicitly like `"class Rabbit extends Object"`, then the result would be different from a simple `"class Rabbit"`?

What’s the difference?

Here’s an example of such code (it doesn’t work – why? fix it?):

    class Rabbit extends Object {
      constructor(name) {
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    alert( rabbit.hasOwnProperty('name') ); // Error

solution

First, let’s see why the latter code doesn’t work.

The reason becomes obvious if we try to run it. An inheriting class constructor must call `super()`. Otherwise `"this"` won’t be “defined”.

So here’s the fix:

<a href="class-extend-object.html#"
<a href="class-extend-object.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {
      constructor(name) {
        super(); // need to call the parent constructor when inheriting
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    alert( rabbit.hasOwnProperty('name') ); // true

But that’s not all yet.

Even after the fix, there’s still important difference in `"class Rabbit extends Object"` versus `class Rabbit`.

As we know, the “extends” syntax sets up two prototypes:

1.  Between `"prototype"` of the constructor functions (for methods).
2.  Between the constructor functions themselves (for static methods).

In our case, for `class Rabbit extends Object` it means:

<a href="class-extend-object.html#"
<a href="class-extend-object.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {}

    alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
    alert( Rabbit.__proto__ === Object ); // (2) true

So `Rabbit` now provides access to static methods of `Object` via `Rabbit`, like this:

<a href="class-extend-object.html#"
<a href="class-extend-object.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {}

    // normally we call Object.getOwnPropertyNames
    alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b

But if we don’t have `extends Object`, then `Rabbit.__proto__` is not set to `Object`.

Here’s the demo:

<a href="class-extend-object.html#"
<a href="class-extend-object.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit {}

    alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
    alert( Rabbit.__proto__ === Object ); // (2) false (!)
    alert( Rabbit.__proto__ === Function.prototype ); // as any function by default

    // error, no such function in Rabbit
    alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error

So `Rabbit` doesn’t provide access to static methods of `Object` in that case.

By the way, `Function.prototype` has “generic” function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.

Here’s the picture:

<figure><img src="class-extend-object/rabbit-extends-object.svg" width="458" height="344" /></figure>So, to put it short, there are two differences:

<table><thead><tr class="header"><th>class Rabbit</th><th>class Rabbit extends Object</th></tr></thead><tbody><tr class="odd"><td>–</td><td>needs to call <code>super()</code> in constructor</td></tr><tr class="even"><td><code>Rabbit.__proto__ === Function.prototype</code></td><td><code>Rabbit.__proto__ === Object</code></td></tr></tbody></table>
