defer-to-prototype-extended"

- <a href="defer-to-prototype-extended.html"
  /defer-to-prototype-extended"
  /defer-to-prototype-extended"
  defer-to-prototype-extendeddefer-to-prototype-extended"

<!-- -->

defer-to-prototype-extended"
defer-to-prototype-extended"
/defer-to-prototype-extended"
defer-to-prototype-extended"

k%2Fdefer-to-prototype-extended"%2Fdefer-to-prototype-extended" </a>

<a href="../prototypes.html" Prototypes, inheritance</span></a>

<a href="../native-prototypes.html" Native prototypes</span></a>

<a href="../native-prototypes.html"

## Add the decorating "defer()" to functions

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Add to the prototype of all functions the method `defer(ms)`, that returns a wrapper, delaying the call by `ms` milliseconds.

Here’s an example of how it should work:

    function f(a, b) {
      alert( a + b );
    }

    f.defer(1000)(1, 2); // shows 3 after 1 second

Please note that the arguments should be passed to the original function.

solution

<a href="defer-to-prototype-extended.html#"
<a href="defer-to-prototype-extended.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    Function.prototype.defer = function(ms) {
      let f = this;
      return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
      }
    };

    // check it
    function f(a, b) {
      alert( a + b );
    }

    f.defer(1000)(1, 2); // shows 3 after 1 sec

Please note: we use `this` in `f.apply` to make our decoration work for object methods.

So if the wrapper function is called as an object method, then `this` is passed to the original method `f`.

<a href="defer-to-prototype-extended.html#"
<a href="defer-to-prototype-extended.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    Function.prototype.defer = function(ms) {
      let f = this;
      return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
      }
    };

    let user = {
      name: "John",
      sayHi() {
        alert(this.name);
      }
    }

    user.sayHi = user.sayHi.defer(1000);

    user.sayHi();
