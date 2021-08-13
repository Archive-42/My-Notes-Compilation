EN

- <a href="https://ar.javascript.info/"
- <a href="throttle.html"
  /throttle"
  /throttle"
  throttle"
  task/throttle"

<!-- -->

- <a href="https://ko.javascript.info/"
  throttle"
  /throttle"
  throttle"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fthrottle"%2Fthrottle" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../call-apply-decorators.html" Decorators and forwarding, call/apply</span></a>

<a href="../call-apply-decorators.html"

## Throttle decorator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a “throttling” decorator `throttle(f, ms)` – that returns a wrapper.

When it’s called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds.

The difference with debounce is that it’s completely different decorator:

- `debounce` runs the function once after the “cooldown” period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn’t be very often.

In other words, `throttle` is like a secretary that accepts phone calls, but bothers the boss (calls the actual `f`) not more often than once per `ms` milliseconds.

Let’s check the real-life application to better understand that requirement and to see where it comes from.

**For instance, we want to track mouse movements.**

In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms). **We’d like to update some information on the web-page when the pointer moves.**

…But updating function `update()` is too heavy to do it on every micro-movement. There is also no sense in updating more often than once per 100ms.

So we’ll wrap it into the decorator: use `throttle(update, 100)` as the function to run on each mouse move instead of the original `update()`. The decorator will be called often, but forward the call to `update()` at maximum once per 100ms.

Visually, it will look like this:

1.  For the first mouse movement the decorated variant immediately passes the call to `update`. That’s important, the user sees our reaction to their move immediately.
2.  Then as the mouse moves on, until `100ms` nothing happens. The decorated variant ignores calls.
3.  At the end of `100ms` – one more `update` happens with the last coordinates.
4.  Then, finally, the mouse stops somewhere. The decorated variant waits until `100ms` expire and then runs `update` with last coordinates. So, quite important, the final mouse coordinates are processed.

A code example:

    function f(a) {
      console.log(a);
    }

    // f1000 passes calls to f at maximum once per 1000 ms
    let f1000 = throttle(f, 1000);

    f1000(1); // shows 1
    f1000(2); // (throttling, 1000ms not out yet)
    f1000(3); // (throttling, 1000ms not out yet)

    // when 1000 ms time out...
    // ...outputs 3, intermediate value 2 was ignored

P.S. Arguments and the context `this` passed to `f1000` should be passed to the original `f`.

[Open a sandbox with tests.](https://plnkr.co/edit/hXYTiNGcB0hq2ZV2?p=preview)

solution

    function throttle(func, ms) {

      let isThrottled = false,
        savedArgs,
        savedThis;

      function wrapper() {

        if (isThrottled) { // (2)
          savedArgs = arguments;
          savedThis = this;
          return;
        }
        isThrottled = true;

        func.apply(this, arguments); // (1)

        setTimeout(function() {
          isThrottled = false; // (3)
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }

      return wrapper;
    }

A call to `throttle(func, ms)` returns `wrapper`.

1.  During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2.  In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3.  After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.

The 3rd step runs not `func`, but `wrapper`, because we not only need to execute `func`, but once again enter the cooldown state and setup the timeout to reset it.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/7jLStqfW8AQCyE96?p=preview)
