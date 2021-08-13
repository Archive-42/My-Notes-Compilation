EN

- <a href="https://ar.javascript.info/"
- <a href="delay.html"
  /delay"
  /delay"
  delaydelay"

<!-- -->

- <a href="https://ko.javascript.info/"
  delay"
  /delay"
  delay"

k%2Fdelay"%2Fdelay" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../call-apply-decorators.html" Decorators and forwarding, call/apply</span></a>

<a href="../call-apply-decorators.html"

## Delaying decorator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a decorator `delay(f, ms)` that delays each call of `f` by `ms` milliseconds.

For instance:

    function f(x) {
      alert(x);
    }

    // create wrappers
    let f1000 = delay(f, 1000);
    let f1500 = delay(f, 1500);

    f1000("test"); // shows "test" after 1000ms
    f1500("test"); // shows "test" after 1500ms

In other words, `delay(f, ms)` returns a "delayed by `ms`" variant of `f`.

In the code above, `f` is a function of a single argument, but your solution should pass all arguments and the context `this`.

[Open a sandbox with tests.](https://plnkr.co/edit/S979fqC4ga95OKUV?p=preview)

solution

The solution:

<a href="delay.html#"
<a href="delay.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function delay(f, ms) {

      return function() {
        setTimeout(() => f.apply(this, arguments), ms);
      };

    }

    let f1000 = delay(alert, 1000);

    f1000("test"); // shows "test" after 1000ms

Please note how an arrow function is used here. As we know, arrow functions do not have own `this` and `arguments`, so `f.apply(this, arguments)` takes `this` and `arguments` from the wrapper.

If we pass a regular function, `setTimeout` would call it without arguments and `this=window` (assuming we’re in the browser).

We still can pass the right `this` by using an intermediate variable, but that’s a little bit more cumbersome:

    function delay(f, ms) {

      return function(...args) {
        let savedThis = this; // store this into an intermediate variable
        setTimeout(function() {
          f.apply(savedThis, args); // use it here
        }, ms);
      };

    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/sE5fOcbTxHuLo1fm?p=preview)
