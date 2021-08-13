EN

- <a href="https://ar.javascript.info/promise-basics"
- <a href="promise-basics.html"
- <a href="https://es.javascript.info/promise-basics"
- <a href="https://fr.javascript.info/promise-basics"
- <a href="https://it.javascript.info/promise-basics"
  promise-basics"

<!-- -->

- <a href="https://ko.javascript.info/promise-basics"
- <a href=promise-basics"
- <a href="https://tr.javascript.info/promise-basics"
- <a href="https://zh.javascript.info/promise-basics"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fpromise-basics" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-basics" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="async.html" Promises, async/await</span></a></span>

31st March 2021

# Promise

Imagine that you’re a top singer, and fans ask day and night for your upcoming song.

To get some relief, you promise to send it to them when it’s published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can’t publish the song, they will still be notified.

Everyone is happy: you, because the people don’t crowd you anymore, and fans, because they won’t miss the song.

This is a real-life analogy for things we often have in programming:

1.  A “producing code” that does something and takes time. For instance, some code that loads the data over a network. That’s a “singer”.
2.  A “consuming code” that wants the result of the “producing code” once it’s ready. Many functions may need that result. These are the “fans”.
3.  A _promise_ is a special JavaScript object that links the “producing code” and the “consuming code” together. In terms of our analogy: this is the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result available to all of the subscribed code when it’s ready.

The analogy isn’t terribly accurate, because JavaScript promises are more complex than a simple subscription list: they have additional features and limitations. But it’s fine to begin with.

The constructor syntax for a promise object is:

    let promise = new Promise(function(resolve, reject) {
      // executor (the producing code, "singer")
    });

The function passed to `new Promise` is called the _executor_. When `new Promise` is created, the executor runs automatically. It contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the “singer”.

Its arguments `resolve` and `reject` are callbacks provided by JavaScript itself. Our code is only inside the executor.

When the executor obtains the result, be it soon or late, doesn’t matter, it should call one of these callbacks:

- `resolve(value)` — if the job is finished successfully, with result `value`.
- `reject(error)` — if an error has occurred, `error` is the error object.

So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls `resolve` if it was successful or `reject` if there was an error.

The `promise` object returned by the `new Promise` constructor has these internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` called or `error` when `reject(error)` is called.

So the executor eventually moves `promise` to one of these states:

<figure><img src="article/promise-basics/promise-resolve-reject.svg" width="512" height="246" /></figure>Later we’ll see how “fans” can subscribe to these changes.

Here’s an example of a promise constructor and a simple executor function with “producing code” that takes time (via `setTimeout`):

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    let promise = new Promise(function(resolve, reject) {
      // the function is executed automatically when the promise is constructed

      // after 1 second signal that the job is done with the result "done"
      setTimeout(() => resolve("done"), 1000);
    });

We can see two things by running the code above:

1.  The executor is called automatically and immediately (by `new Promise`).

2.  The executor receives two arguments: `resolve` and `reject`. These functions are pre-defined by the JavaScript engine, so we don’t need to create them. We should only call one of them when ready.

    After one second of “processing” the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:

    <figure><img src="article/promise-basics/promise-resolve-1.svg" width="538" height="106" /></figure>

That was an example of a successful job completion, a “fulfilled promise”.

And now an example of the executor rejecting the promise with an error:

    let promise = new Promise(function(resolve, reject) {
      // after 1 second signal that the job is finished with an error
      setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

The call to `reject(...)` moves the promise object to `"rejected"` state:

<figure><img src="article/promise-basics/promise-reject-1.svg" width="535" height="106" /></figure>To summarize, the executor should perform a job (usually something that takes time) and then call `resolve` or `reject` to change the state of the corresponding promise object.

A promise that is either resolved or rejected is called “settled”, as opposed to an initially “pending” promise.

<span class="important__type">There can be only a single result or an error</span>

The executor should call only one `resolve` or one `reject`. Any state change is final.

All further calls of `resolve` and `reject` are ignored:

    let promise = new Promise(function(resolve, reject) {
      resolve("done");

      reject(new Error("…")); // ignored
      setTimeout(() => resolve("…")); // ignored
    });

The idea is that a job done by the executor may have only one result or an error.

Also, `resolve`/`reject` expect only one argument (or none) and will ignore additional arguments.

<span class="important__type">Reject with `Error` objects</span>

In case something goes wrong, the executor should call `reject`. That can be done with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.

<span class="important__type">Immediately calling `resolve`/`reject`</span>

In practice, an executor usually does something asynchronously and calls `resolve`/`reject` after some time, but it doesn’t have to. We also can call `resolve` or `reject` immediately, like this:

    let promise = new Promise(function(resolve, reject) {
      // not taking our time to do the job
      resolve(123); // immediately give the result: 123
    });

For instance, this might happen when we start to do a job but then see that everything has already been completed and cached.

That’s fine. We immediately have a resolved promise.

<span class="important__type">The `state` and `result` are internal</span>

The properties `state` and `result` of the Promise object are internal. We can’t directly access them. We can use the methods `.then`/`.catch`/`.finally` for that. They are described below.

## <a href="promise-basics.html#consumers-then-catch-finally" id="consumers-then-catch-finally" class="main__anchor">Consumers: then, catch, finally</a>

A Promise object serves as a link between the executor (the “producing code” or “singer”) and the consuming functions (the “fans”), which will receive the result or error. Consuming functions can be registered (subscribed) using methods `.then`, `.catch` and `.finally`.

### <a href="promise-basics.html#then" id="then" class="main__anchor">then</a>

The most important, fundamental one is `.then`.

The syntax is:

    promise.then(
      function(result) { /* handle a successful result */ },
      function(error) { /* handle an error */ }
    );

The first argument of `.then` is a function that runs when the promise is resolved, and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected, and receives the error.

For instance, here’s a reaction to a successfully resolved promise:

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done!"), 1000);
    });

    // resolve runs the first function in .then
    promise.then(
      result => alert(result), // shows "done!" after 1 second
      error => alert(error) // doesn't run
    );

The first function was executed.

And in the case of a rejection, the second one:

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

    // reject runs the second function in .then
    promise.then(
      result => alert(result), // doesn't run
      error => alert(error) // shows "Error: Whoops!" after 1 second
    );

If we’re interested only in successful completions, then we can provide only one function argument to `.then`:

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    let promise = new Promise(resolve => {
      setTimeout(() => resolve("done!"), 1000);
    });

    promise.then(alert); // shows "done!" after 1 second

### <a href="promise-basics.html#catch" id="catch" class="main__anchor">catch</a>

If we’re interested only in errors, then we can use `null` as the first argument: `.then(null, errorHandlingFunction)`. Or we can use `.catch(errorHandlingFunction)`, which is exactly the same:

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

    // .catch(f) is the same as promise.then(null, f)
    promise.catch(alert); // shows "Error: Whoops!" after 1 second

The call `.catch(f)` is a complete analog of `.then(null, f)`, it’s just a shorthand.

### <a href="promise-basics.html#finally" id="finally" class="main__anchor">finally</a>

Just like there’s a `finally` clause in a regular `try {...} catch {...}`, there’s `finally` in promises.

The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` always runs when the promise is settled: be it resolve or reject.

`finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is.

Like this:

    new Promise((resolve, reject) => {
      /* do something that takes time, and then call resolve/reject */
    })
      // runs when the promise is settled, doesn't matter successfully or not
      .finally(() => stop loading indicator)
      // so the loading indicator is always stopped before we process the result/error
      .then(result => show result, err => show error)

That said, `finally(f)` isn’t exactly an alias of `then(f,f)` though. There are few subtle differences:

1.  A `finally` handler has no arguments. In `finally` we don’t know whether the promise is successful or not. That’s all right, as our task is usually to perform “general” finalizing procedures.

2.  A `finally` handler passes through results and errors to the next handler.

    For instance, here the result is passed through `finally` to `then`:

    <a href="promise-basics.html#"
    <a href="promise-basics.html#"

        new Promise((resolve, reject) => {
          setTimeout(() => resolve("result"), 2000)
        })
          .finally(() => alert("Promise ready"))
          .then(result => alert(result)); // <-- .then handles the result

    And here there’s an error in the promise, passed through `finally` to `catch`:

    <a href="promise-basics.html#"
    <a href="promise-basics.html#"

        new Promise((resolve, reject) => {
          throw new Error("error");
        })
          .finally(() => alert("Promise ready"))
          .catch(err => alert(err));  // <-- .catch handles the error object

That’s very convenient, because `finally` is not meant to process a promise result. So it passes it through.

We’ll talk more about promise chaining and result-passing between handlers in the next chapter.

<span class="important__type">We can attach handlers to settled promises</span>

If a promise is pending, `.then/catch/finally` handlers wait for it. Otherwise, if a promise has already settled, they just run:

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    // the promise becomes resolved immediately upon creation
    let promise = new Promise(resolve => resolve("done!"));

    promise.then(alert); // done! (shows up right now)

Note that this makes promises more powerful than the real life “subscription list” scenario. If the singer has already released their song and then a person signs up on the subscription list, they probably won’t receive that song. Subscriptions in real life must be done prior to the event.

Promises are more flexible. We can add handlers any time: if the result is already there, they just execute.

Next, let’s see more practical examples of how promises can help us write asynchronous code.

## <a href="promise-basics.html#loadscript" id="loadscript" class="main__anchor">Example: loadScript</a>

We’ve got the `loadScript` function for loading a script from the previous chapter.

Here’s the callback-based variant, just to remind us of it:

    function loadScript(src, callback) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => callback(null, script);
      script.onerror = () => callback(new Error(`Script load error for ${src}`));

      document.head.append(script);
    }

Let’s rewrite it using Promises.

The new function `loadScript` will not require a callback. Instead, it will create and return a Promise object that resolves when the loading is complete. The outer code can add handlers (subscribing functions) to it using `.then`:

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    function loadScript(src) {
      return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));

        document.head.append(script);
      });
    }

Usage:

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

    promise.then(
      script => alert(`${script.src} is loaded!`),
      error => alert(`Error: ${error.message}`)
    );

    promise.then(script => alert('Another handler...'));

We can immediately see a few benefits over the callback-based pattern:

<table><thead><tr class="header"><th>Promises</th><th>Callbacks</th></tr></thead><tbody><tr class="odd"><td>Promises allow us to do things in the natural order. First, we run <code>loadScript(script)</code>, and <code>.then</code> we write what to do with the result.</td><td>We must have a <code>callback</code> function at our disposal when calling <code>loadScript(script, callback)</code>. In other words, we must know what to do with the result <em>before</em> <code>loadScript</code> is called.</td></tr><tr class="even"><td>We can call <code>.then</code> on a Promise as many times as we want. Each time, we’re adding a new “fan”, a new subscribing function, to the “subscription list”. More about this in the next chapter: <a href="promise-chaining.html">Promises chaining</a>.</td><td>There can be only one callback.</td></tr></tbody></table>

So promises give us better code flow and flexibility. But there’s more. We’ll see that in the next chapters.

## <a href="promise-basics.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="promise-basics.html#re-resolve-a-promise" id="re-resolve-a-promise" class="main__anchor">Re-resolve a promise?</a>

<a href="task/re-resolve.html" class="task__open-link"></a>

What’s the output of the code below?

    let promise = new Promise(function(resolve, reject) {
      resolve(1);

      setTimeout(() => resolve(2), 1000);
    });

    promise.then(alert);

solution

The output is: `1`.

The second call to `resolve` is ignored, because only the first call of `reject/resolve` is taken into account. Further calls are ignored.

### <a href="promise-basics.html#delay-with-a-promise" id="delay-with-a-promise" class="main__anchor">Delay with a promise</a>

<a href="task/delay-promise.html" class="task__open-link"></a>

The built-in function `setTimeout` uses callbacks. Create a promise-based alternative.

The function `delay(ms)` should return a promise. That promise should resolve after `ms` milliseconds, so that we can add `.then` to it, like this:

    function delay(ms) {
      // your code
    }

    delay(3000).then(() => alert('runs after 3 seconds'));

solution

<a href="promise-basics.html#"
<a href="promise-basics.html#"

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    delay(3000).then(() => alert('runs after 3 seconds'));

Please note that in this task `resolve` is called without arguments. We don’t return any value from `delay`, just ensure the delay.

### <a href="promise-basics.html#animated-circle-with-promise" id="animated-circle-with-promise" class="main__anchor">Animated circle with promise</a>

<a href="task/animate-circle-promise.html" class="task__open-link"></a>

Rewrite the `showCircle` function in the solution of the task [Animated circle with callback](task/animate-circle-callback.html) so that it returns a promise instead of accepting a callback.

The new usage:

    showCircle(150, 150, 100).then(div => {
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });

Take the solution of the task [Animated circle with callback](task/animate-circle-callback.html) as the base.

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/Q1jyGXvy9INMRG3Y?p=preview)

<a href="callbacks.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="promise-chaining.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fpromise-basics" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-basics" </a>

<a href="tutorial/map.html" class="map">

## <a href="promise-basics.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="async.html" class="sidebar__link">Promises, async/await</a>

#### Lesson navigation

- <a href="promise-basics.html#consumers-then-catch-finally" class="sidebar__link">Consumers: then, catch, finally</a>
- <a href="promise-basics.html#loadscript" class="sidebar__link">Example: loadScript</a>

- <a href="promise-basics.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="promise-basics.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fpromise-basics" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-basics" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/11-async/02-promise-basics" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
