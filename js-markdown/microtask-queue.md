EN

- <a href="https://ar.javascript.info/microtask-queue"
- <a href="microtask-queue.html"
- <a href="https://es.javascript.info/microtask-queue"
- <a href="https://fr.javascript.info/microtask-queue"
- microtask-queue"
  microtask-queue"

<!-- -->

- /microtask-queue"
- <a href=microtask-queue"
- <a href="https://tr.javascript.info/microtask-queue"
- <a href="https://zh.javascript.info/microtask-queue"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmicrotask-queue" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmicrotask-queue" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="async.html" Promises, async/await</span></a></span>

26th March 2021

# Microtasks

Promise handlers `.then`/`.catch`/`.finally` are always asynchronous.

Even when a Promise is immediately resolved, the code on the lines _below_ `.then`/`.catch`/`.finally` will still execute before these handlers.

Here’s a demo:

<a href="microtask-queue.html#"
<a href="microtask-queue.html#"

    let promise = Promise.resolve();

    promise.then(() => alert("promise done!"));

    alert("code finished"); // this alert shows first

If you run it, you see `code finished` first, and then `promise done!`.

That’s strange, because the promise is definitely done from the beginning.

Why did the `.then` trigger afterwards? What’s going on?

## <a href="microtask-queue.html#microtasks-queue" id="microtasks-queue" class="main__anchor">Microtasks queue</a>

Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue `PromiseJobs`, more often referred to as the “microtask queue” (V8 term).

As stated in the [specification](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):

- The queue is first-in-first-out: tasks enqueued first are run first.
- Execution of a task is initiated only when nothing else is running.

Or, to put it more simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue; they are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.

That’s why “code finished” in the example above shows first.

<figure><img src="article/microtask-queue/promiseQueue.svg" width="430" height="185" /></figure>Promise handlers always go through this internal queue.

If there’s a chain with multiple `.then/catch/finally`, then every one of them is executed asynchronously. That is, it first gets queued, then executed when the current code is complete and previously queued handlers are finished.

**What if the order matters for us? How can we make `code finished` appear after `promise done`?**

Easy, just put it into the queue with `.then`:

<a href="microtask-queue.html#"
<a href="microtask-queue.html#"

    Promise.resolve()
      .then(() => alert("promise done!"))
      .then(() => alert("code finished"));

Now the order is as intended.

## <a href="microtask-queue.html#unhandled-rejection" id="unhandled-rejection" class="main__anchor">Unhandled rejection</a>

Remember the `unhandledrejection` event from the article [Error handling with promises](promise-error-handling.html)?

Now we can see exactly how JavaScript finds out that there was an unhandled rejection.

**An “unhandled rejection” occurs when a promise error is not handled at the end of the microtask queue.**

Normally, if we expect an error, we add `.catch` to the promise chain to handle it:

<a href="microtask-queue.html#"
<a href="microtask-queue.html#"

    let promise = Promise.reject(new Error("Promise Failed!"));
    promise.catch(err => alert('caught'));

    // doesn't run: error handled
    window.addEventListener('unhandledrejection', event => alert(event.reason));

But if we forget to add `.catch`, then, after the microtask queue is empty, the engine triggers the event:

<a href="microtask-queue.html#"
<a href="microtask-queue.html#"

    let promise = Promise.reject(new Error("Promise Failed!"));

    // Promise Failed!
    window.addEventListener('unhandledrejection', event => alert(event.reason));

What if we handle the error later? Like this:

<a href="microtask-queue.html#"
<a href="microtask-queue.html#"

    let promise = Promise.reject(new Error("Promise Failed!"));
    setTimeout(() => promise.catch(err => alert('caught')), 1000);

    // Error: Promise Failed!
    window.addEventListener('unhandledrejection', event => alert(event.reason));

Now, if we run it, we’ll see `Promise Failed!` first and then `caught`.

If we didn’t know about the microtasks queue, we could wonder: “Why did `unhandledrejection` handler run? We did catch and handle the error!”

But now we understand that `unhandledrejection` is generated when the microtask queue is complete: the engine examines promises and, if any of them is in the “rejected” state, then the event triggers.

In the example above, `.catch` added by `setTimeout` also triggers. But it does so later, after `unhandledrejection` has already occurred, so it doesn’t change anything.

## <a href="microtask-queue.html#summary" id="summary" class="main__anchor">Summary</a>

Promise handling is always asynchronous, as all promise actions pass through the internal “promise jobs” queue, also called “microtask queue” (V8 term).

So `.then/catch/finally` handlers are always called after the current code is finished.

If we need to guarantee that a piece of code is executed after `.then/catch/finally`, we can add it into a chained `.then` call.

In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the “event loop” and “macrotasks”. As these have no direct relation to promises, they are covered in another part of the tutorial, in the article [Event loop: microtasks and macrotasks](event-loop.html).

<a href="promisify.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="async-await.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmicrotask-queue" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmicrotask-queue" </a>

<a href="tutorial/map.html" class="map">

## <a href="microtask-queue.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="async.html" class="sidebar__link">Promises, async/await</a>

#### Lesson navigation

- <a href="microtask-queue.html#microtasks-queue" class="sidebar__link">Microtasks queue</a>
- <a href="microtask-queue.html#unhandled-rejection" class="sidebar__link">Unhandled rejection</a>
- <a href="microtask-queue.html#summary" class="sidebar__link">Summary</a>

- <a href="microtask-queue.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fmicrotask-queue" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmicrotask-queue" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/11-async/07-microtask-queue" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
