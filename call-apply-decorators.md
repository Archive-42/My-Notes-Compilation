EN

- <a href="https://ar.javascript.info/call-apply-decorators" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="call-apply-decorators.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/call-apply-decorators" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- call-apply-decorators" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/call-apply-decorators" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- <a href="https://ko.javascript.info/call-apply-decorators" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="call-apply-decorators%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/call-apply-decorators" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/call-apply-decorators" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<span class="share-icons__title">Share</span>2Fcall-apply-decorators" rel="nofollow" &gt;2Fcall-apply-decorators عربي English Español Français Italiano 日本語 한국어

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" class="breadcrumbs__link"><span>Advanced working with functions</span></a></span>

13th May 2021

# Decorators and forwarding, call/apply

JavaScript gives exceptional flexibility when dealing with functions. They can be passed around, used as objects, and now we’ll see how to _forward_ calls between them and _decorate_ them.

## <a href="call-apply-decorators.html#transparent-caching" id="transparent-caching" class="main__anchor">Transparent caching</a>

Let’s say we have a function `slow(x)` which is CPU-heavy, but its results are stable. In other words, for the same `x` it always returns the same result.

If the function is called often, we may want to cache (remember) the results to avoid spending extra-time on recalculations.

But instead of adding that functionality into `slow()` we’ll create a wrapper function, that adds caching. As we’ll see, there are many benefits of doing so.

Here’s the code, and explanations follow:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function slow(x) {
      // there can be a heavy CPU-intensive job here
      alert(`Called with ${x}`);
      return x;
    }

    function cachingDecorator(func) {
      let cache = new Map();

      return function(x) {
        if (cache.has(x)) {    // if there's such key in cache
          return cache.get(x); // read the result from it
        }

        let result = func(x);  // otherwise call func

        cache.set(x, result);  // and cache (remember) the result
        return result;
      };
    }

    slow = cachingDecorator(slow);

    alert( slow(1) ); // slow(1) is cached and the result returned
    alert( "Again: " + slow(1) ); // slow(1) result returned from cache

    alert( slow(2) ); // slow(2) is cached and the result returned
    alert( "Again: " + slow(2) ); // slow(2) result returned from cache

In the code above `cachingDecorator` is a _decorator_: a special function that takes another function and alters its behavior.

The idea is that we can call `cachingDecorator` for any function, and it will return the caching wrapper. That’s great, because we can have many functions that could use such a feature, and all we need to do is to apply `cachingDecorator` to them.

By separating caching from the main function code we also keep the main code simpler.

The result of `cachingDecorator(func)` is a “wrapper”: `function(x)` that “wraps” the call of `func(x)` into caching logic:

<figure><img src="article/call-apply-decorators/decorator-makecaching-wrapper.svg" width="458" height="260" /></figure>From an outside code, the wrapped `slow` function still does the same. It just got a caching aspect added to its behavior.

To summarize, there are several benefits of using a separate `cachingDecorator` instead of altering the code of `slow` itself:

- The `cachingDecorator` is reusable. We can apply it to another function.
- The caching logic is separate, it did not increase the complexity of `slow` itself (if there was any).
- We can combine multiple decorators if needed (other decorators will follow).

## <a href="call-apply-decorators.html#using-func-call-for-the-context" id="using-func-call-for-the-context" class="main__anchor">Using “func.call” for the context</a>

The caching decorator mentioned above is not suited to work with object methods.

For instance, in the code below `worker.slow()` stops working after the decoration:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // we'll make worker.slow caching
    let worker = {
      someMethod() {
        return 1;
      },

      slow(x) {
        // scary CPU-heavy task here
        alert("Called with " + x);
        return x * this.someMethod(); // (*)
      }
    };

    // same code as before
    function cachingDecorator(func) {
      let cache = new Map();
      return function(x) {
        if (cache.has(x)) {
          return cache.get(x);
        }
        let result = func(x); // (**)
        cache.set(x, result);
        return result;
      };
    }

    alert( worker.slow(1) ); // the original method works

    worker.slow = cachingDecorator(worker.slow); // now make it caching

    alert( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined

The error occurs in the line `(*)` that tries to access `this.someMethod` and fails. Can you see why?

The reason is that the wrapper calls the original function as `func(x)` in the line `(**)`. And, when called like that, the function gets `this = undefined`.

We would observe a similar symptom if we tried to run:

    let func = worker.slow;
    func(2);

So, the wrapper passes the call to the original method, but without the context `this`. Hence the error.

Let’s fix it.

There’s a special built-in function method [func.call(context, …args)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) that allows to call a function explicitly setting `this`.

The syntax is:

    func.call(context, arg1, arg2, ...)

It runs `func` providing the first argument as `this`, and the next as the arguments.

To put it simply, these two calls do almost the same:

    func(1, 2, 3);
    func.call(obj, 1, 2, 3)

They both call `func` with arguments `1`, `2` and `3`. The only difference is that `func.call` also sets `this` to `obj`.

As an example, in the code below we call `sayHi` in the context of different objects: `sayHi.call(user)` runs `sayHi` providing `this=user`, and the next line sets `this=admin`:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      alert(this.name);
    }

    let user = { name: "John" };
    let admin = { name: "Admin" };

    // use call to pass different objects as "this"
    sayHi.call( user ); // John
    sayHi.call( admin ); // Admin

And here we use `call` to call `say` with the given context and phrase:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function say(phrase) {
      alert(this.name + ': ' + phrase);
    }

    let user = { name: "John" };

    // user becomes this, and "Hello" becomes the first argument
    say.call( user, "Hello" ); // John: Hello

In our case, we can use `call` in the wrapper to pass the context to the original function:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let worker = {
      someMethod() {
        return 1;
      },

      slow(x) {
        alert("Called with " + x);
        return x * this.someMethod(); // (*)
      }
    };

    function cachingDecorator(func) {
      let cache = new Map();
      return function(x) {
        if (cache.has(x)) {
          return cache.get(x);
        }
        let result = func.call(this, x); // "this" is passed correctly now
        cache.set(x, result);
        return result;
      };
    }

    worker.slow = cachingDecorator(worker.slow); // now make it caching

    alert( worker.slow(2) ); // works
    alert( worker.slow(2) ); // works, doesn't call the original (cached)

Now everything is fine.

To make it all clear, let’s see more deeply how `this` is passed along:

1.  After the decoration `worker.slow` is now the wrapper `function (x) { ... }`.
2.  So when `worker.slow(2)` is executed, the wrapper gets `2` as an argument and `this=worker` (it’s the object before dot).
3.  Inside the wrapper, assuming the result is not yet cached, `func.call(this, x)` passes the current `this` (`=worker`) and the current argument (`=2`) to the original method.

## <a href="call-apply-decorators.html#going-multi-argument" id="going-multi-argument" class="main__anchor">Going multi-argument</a>

Now let’s make `cachingDecorator` even more universal. Till now it was working only with single-argument functions.

Now how to cache the multi-argument `worker.slow` method?

    let worker = {
      slow(min, max) {
        return min + max; // scary CPU-hogger is assumed
      }
    };

    // should remember same-argument calls
    worker.slow = cachingDecorator(worker.slow);

Previously, for a single argument `x` we could just `cache.set(x, result)` to save the result and `cache.get(x)` to retrieve it. But now we need to remember the result for a _combination of arguments_ `(min,max)`. The native `Map` takes single value only as the key.

There are many solutions possible:

1.  Implement a new (or use a third-party) map-like data structure that is more versatile and allows multi-keys.
2.  Use nested maps: `cache.set(min)` will be a `Map` that stores the pair `(max, result)`. So we can get `result` as `cache.get(min).get(max)`.
3.  Join two values into one. In our particular case we can just use a string `"min,max"` as the `Map` key. For flexibility, we can allow to provide a _hashing function_ for the decorator, that knows how to make one value from many.

For many practical applications, the 3rd variant is good enough, so we’ll stick to it.

Also we need to pass not just `x`, but all arguments in `func.call`. Let’s recall that in a `function()` we can get a pseudo-array of its arguments as `arguments`, so `func.call(this, x)` should be replaced with `func.call(this, ...arguments)`.

Here’s a more powerful `cachingDecorator`:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let worker = {
      slow(min, max) {
        alert(`Called with ${min},${max}`);
        return min + max;
      }
    };

    function cachingDecorator(func, hash) {
      let cache = new Map();
      return function() {
        let key = hash(arguments); // (*)
        if (cache.has(key)) {
          return cache.get(key);
        }

        let result = func.call(this, ...arguments); // (**)

        cache.set(key, result);
        return result;
      };
    }

    function hash(args) {
      return args[0] + ',' + args[1];
    }

    worker.slow = cachingDecorator(worker.slow, hash);

    alert( worker.slow(3, 5) ); // works
    alert( "Again " + worker.slow(3, 5) ); // same (cached)

Now it works with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments. An interesting way to handle this will be covered below).

There are two changes:

- In the line `(*)` it calls `hash` to create a single key from `arguments`. Here we use a simple “joining” function that turns arguments `(3, 5)` into the key `"3,5"`. More complex cases may require other hashing functions.
- Then `(**)` uses `func.call(this, ...arguments)` to pass both the context and all arguments the wrapper got (not just the first one) to the original function.

## <a href="call-apply-decorators.html#func-apply" id="func-apply" class="main__anchor">func.apply</a>

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) is:

    func.apply(context, args)

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

    func.call(context, ...args);
    func.apply(context, args);

They perform the same call of `func` with given context and arguments.

There’s only a subtle difference regarding `args`:

- The spread syntax `...` allows to pass _iterable_ `args` as the list to `call`.
- The `apply` accepts only _array-like_ `args`.

…And for objects that are both iterable and array-like, such as a real array, we can use any of them, but `apply` will probably be faster, because most JavaScript engines internally optimize it better.

Passing all arguments along with the context to another function is called _call forwarding_.

That’s the simplest form of it:

    let wrapper = function() {
      return func.apply(this, arguments);
    };

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`.

## <a href="call-apply-decorators.html#method-borrowing" id="method-borrowing" class="main__anchor">Borrowing a method</a>

Now let’s make one more minor improvement in the hashing function:

    function hash(args) {
      return args[0] + ',' + args[1];
    }

As of now, it works only on two arguments. It would be better if it could glue any number of `args`.

The natural solution would be to use [arr.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method:

    function hash(args) {
      return args.join();
    }

…Unfortunately, that won’t work. Because we are calling `hash(arguments)`, and `arguments` object is both iterable and array-like, but not a real array.

So calling `join` on it would fail, as we can see below:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function hash() {
      alert( arguments.join() ); // Error: arguments.join is not a function
    }

    hash(1, 2);

Still, there’s an easy way to use array join:

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function hash() {
      alert( [].join.call(arguments) ); // 1,2
    }

    hash(1, 2);

The trick is called _method borrowing_.

We take (borrow) a join method from a regular array (`[].join`) and use `[].join.call` to run it in the context of `arguments`.

Why does it work?

That’s because the internal algorithm of the native method `arr.join(glue)` is very simple.

Taken from the specification almost “as-is”:

1.  Let `glue` be the first argument or, if no arguments, then a comma `","`.
2.  Let `result` be an empty string.
3.  Append `this[0]` to `result`.
4.  Append `glue` and `this[1]`.
5.  Append `glue` and `this[2]`.
6.  …Do so until `this.length` items are glued.
7.  Return `result`.

So, technically it takes `this` and joins `this[0]`, `this[1]` …etc together. It’s intentionally written in a way that allows any array-like `this` (not a coincidence, many methods follow this practice). That’s why it also works with `this=arguments`.

## <a href="call-apply-decorators.html#decorators-and-function-properties" id="decorators-and-function-properties" class="main__anchor">Decorators and function properties</a>

It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like `func.calledCount` or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

E.g. in the example above if `slow` function had any properties on it, then `cachingDecorator(slow)` is a wrapper without them.

Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

There exists a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap a function. We’ll discuss it later in the article [Proxy and Reflect](proxy.html#proxy-apply).

## <a href="call-apply-decorators.html#summary" id="summary" class="main__anchor">Summary</a>

_Decorator_ is a wrapper around a function that alters its behavior. The main job is still carried out by the function.

Decorators can be seen as “features” or “aspects” that can be added to a function. We can add one or add many. And all this without changing its code!

To implement `cachingDecorator`, we studied methods:

- [func.call(context, arg1, arg2…)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) – calls `func` with given context and arguments.
- [func.apply(context, args)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) – calls `func` passing `context` as `this` and array-like `args` into a list of arguments.

The generic _call forwarding_ is usually done with `apply`:

    let wrapper = function() {
      return original.apply(this, arguments);
    };

We also saw an example of _method borrowing_ when we take a method from an object and `call` it in the context of another object. It is quite common to take array methods and apply them to `arguments`. The alternative is to use rest parameters object that is a real array.

There are many decorators there in the wild. Check how well you got them by solving the tasks of this chapter.

## <a href="call-apply-decorators.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="call-apply-decorators.html#spy-decorator" id="spy-decorator" class="main__anchor">Spy decorator</a>

<a href="task/spy-decorator.html" class="task__open-link"></a>

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

### <a href="call-apply-decorators.html#delaying-decorator" id="delaying-decorator" class="main__anchor">Delaying decorator</a>

<a href="task/delay.html" class="task__open-link"></a>

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

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="call-apply-decorators.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

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

### <a href="call-apply-decorators.html#debounce-decorator" id="debounce-decorator" class="main__anchor">Debounce decorator</a>

<a href="task/debounce.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The result of `debounce(f, ms)` decorator is a wrapper that suspends calls to `f` until there’s `ms` milliseconds of inactivity (no calls, “cooldown period”), then invokes `f` once with the latest arguments.

In other words, `debounce` is like a secretary that accepts “phone calls”, and waits until there’s `ms` milliseconds of being quiet. And only then it transfers the latest call information to “the boss” (calls the actual `f`).

For instance, we had a function `f` and replaced it with `f = debounce(f, 1000)`.

Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual `f` will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.

<figure><img src="task/debounce/debounce.svg" width="500" height="183" /></figure>…And it will get the arguments of the very last call, other calls are ignored.

Here’s the code for it (uses the debounce decorator from the [Lodash library](https://lodash.com/docs/4.17.15#debounce)):

    let f = _.debounce(alert, 1000);

    f("a");
    setTimeout( () => f("b"), 200);
    setTimeout( () => f("c"), 500);
    // debounced function waits 1000ms after the last call and then runs: alert("c")

Now a practical example. Let’s say, the user types something, and we’d like to send a request to the server when the input is finished.

There’s no point in sending the request for every character typed. Instead we’d like to wait, and then process the whole result.

In a web-browser, we can setup an event handler – a function that’s called on every change of an input field. Normally, an event handler is called very often, for every typed key. But if we `debounce` it by 1000ms, then it will be only called once, after 1000ms after the last input.

In this live example, the handler puts the result into a box below, try it:

See? The second input calls the debounced function, so its content is processed after 1000ms from the last input.

So, `debounce` is a great way to process a sequence of events: be it a sequence of key presses, mouse movements or something else.

It waits the given time after the last call, and then runs its function, that can process the result.

The task is to implement `debounce` decorator.

Hint: that’s just a few lines if you think about it :)

[Open a sandbox with tests.](https://plnkr.co/edit/QkMa1Ph67nQYEpAs?p=preview)

solution

    function debounce(func, ms) {
      let timeout;
      return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
      };
    }

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/ydqASHtEI8mS5AlD?p=preview)

### <a href="call-apply-decorators.html#throttle-decorator" id="throttle-decorator" class="main__anchor">Throttle decorator</a>

<a href="task/throttle.html" class="task__open-link"></a>

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

<a href="settimeout-setinterval.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="bind.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcall-apply-decorators" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcall-apply-decorators" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="call-apply-decorators.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- call-apply-decorators.html\#transparent-caching" &gt;Transparent caching
- call-apply-decorators.html\#using-func-call-for-the-context" &gt;Using “func.call” for the context
- call-apply-decorators.html\#going-multi-argument" &gt;Going multi-argument
- call-apply-decorators.html\#func-apply" &gt;func.apply
- call-apply-decorators.html\#method-borrowing" &gt;Borrowing a method
- call-apply-decorators.html\#decorators-and-function-properties" &gt;Decorators and function properties
- call-apply-decorators.html

<!-- -->

- call-apply-decorators.html\#tasks" &gt;Tasks (4)
- call-apply-decorators.html\#comments" &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Fcall-apply-decorators" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcall-apply-decorators" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/09-call-apply-decorators" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
