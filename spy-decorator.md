EN

- <a href="https://ar.javascript.info/"
- <a href="spy-decorator.html"
  /spy-decorator"
  /spy-decorator"
  spy-decorator"
  task/spy-decorator"

<!-- -->

- <a href="https://ko.javascript.info/"
  spy-decorator"
  /spy-decorator"
  spy-decorator"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fspy-decorator"%2Fspy-decorator" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../call-apply-decorators.html" Decorators and forwarding, call/apply</span></a>

<a href="../call-apply-decorators.html"

## Spy decorator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a decorator `spy(func)` that should return a wrapper that saves all calls to function in its `calls` property.

Every call is saved as an array of arguments.

For instance:

    function work(a, b) {
      alert( a + b ); // work is an arbitrary function or method
    }

    work = spy(work);

    work(1, 2); // 3
    work(4, 5); // 9

    for (let args of work.calls) {
      alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
    }

P.S. That decorator is sometimes useful for unit-testing. Its advanced form is `sinon.spy` in [Sinon.JS](http://sinonjs.org/) library.

[Open a sandbox with tests.](https://plnkr.co/edit/STraI11P0hzMLa14?p=preview)

solution

The wrapper returned by `spy(f)` should store all arguments and then use `f.apply` to forward the call.

    function spy(func) {

      function wrapper(...args) {
        // using ...args instead of arguments to store "real" array in wrapper.calls
        wrapper.calls.push(args);
        return func.apply(this, args);
      }

      wrapper.calls = [];

      return wrapper;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/R7efK9wZmOFKktML?p=preview)
