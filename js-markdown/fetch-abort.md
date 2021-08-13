EN

langs\_\_title">عربي</span></a>

- <a href="fetch-abort.html"
- <a href="https://es.javascript.info/fetch-abort"
- <a href="https://fr.javascript.info/fetch-abort"
- fetch-abort"
  fetch-abort"

<!-- -->

- <a href="https://ko.javascript.info/fetch-abort"
- <a href=fetch-abort"
- <a href="https://tr.javascript.info/fetch-abort"
- <a href="https://zh.javascript.info/fetch-abort"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-abort" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

29th January 2021

# Fetch: Abort

As we know, `fetch` returns a promise. And JavaScript generally has no concept of “aborting” a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn’t needed any more.

There’s a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## <a href="fetch-abort.html#the-abortcontroller-object" id="the-abortcontroller-object" class="main__anchor">The AbortController object</a>

Create a controller:

    let controller = new AbortController();

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event listeners on it.

When `abort()` is called:

- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.

Generally, we have two parties in the process:

1.  The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2.  The one that cancels: it calls `controller.abort()` when needed.

Here’s the full example (without `fetch` yet):

<a href="fetch-abort.html#"
<a href="fetch-abort.html#"

    let controller = new AbortController();
    let signal = controller.signal;

    // The party that performs a cancelable operation
    // gets the "signal" object
    // and sets the listener to trigger when controller.abort() is called
    signal.addEventListener('abort', () => alert("abort!"));

    // The other party, that cancels (at any point later):
    controller.abort(); // abort!

    // The event triggers and signal.aborted becomes true
    alert(signal.aborted); // true

As we can see, `AbortController` is just a mean to pass `abort` events when `abort()` is called on it.

We could implement the same kind of event listening in our code on our own, without the `AbortController` object.

But what’s valuable is that `fetch` knows how to work with the `AbortController` object. It’s integrated in it.

## <a href="fetch-abort.html#using-with-fetch" id="using-with-fetch" class="main__anchor">Using with fetch</a>

To be able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to abort, call `controller.abort()`:

    controller.abort();

We’re done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here’s the full example with `fetch` aborted after 1 second:

<a href="fetch-abort.html#"
<a href="fetch-abort.html#"

    // abort in 1 second
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    try {
      let response = await fetch('/article/fetch-abort/demo/hang', {
        signal: controller.signal
      });
    } catch(err) {
      if (err.name == 'AbortError') { // handle abort()
        alert("Aborted!");
      } else {
        throw err;
      }
    }

## <a href="fetch-abort.html#abortcontroller-is-scalable" id="abortcontroller-is-scalable" class="main__anchor">AbortController is scalable</a>

`AbortController` is scalable. It allows to cancel multiple fetches at once.

Here’s a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:

    let urls = [...]; // a list of urls to fetch in parallel

    let controller = new AbortController();

    // an array of fetch promises
    let fetchJobs = urls.map(url => fetch(url, {
      signal: controller.signal
    }));

    let results = await Promise.all(fetchJobs);

    // if controller.abort() is called from anywhere,
    // it aborts all fetches

If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:

    let urls = [...];
    let controller = new AbortController();

    let ourJob = new Promise((resolve, reject) => { // our task
      ...
      controller.signal.addEventListener('abort', reject);
    });

    let fetchJobs = urls.map(url => fetch(url, { // fetches
      signal: controller.signal
    }));

    // Wait for fetches and our task in parallel
    let results = await Promise.all([...fetchJobs, ourJob]);

    // if controller.abort() is called from anywhere,
    // it aborts all fetches and ourJob

## <a href="fetch-abort.html#summary" id="summary" class="main__anchor">Summary</a>

- `AbortController` is a simple object that generates an `abort` event on it’s `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it’s possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" → “listen to `abort` event” interaction is simple and universal. We can use it even without `fetch`.

<a href="fetch-progress.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="fetch-crossorigin.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-abort" </a>

<a href="tutorial/map.html" class="map">

## <a href="fetch-abort.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="fetch-abort.html#the-abortcontroller-object" class="sidebar__link">The AbortController object</a>
- <a href="fetch-abort.html#using-with-fetch" class="sidebar__link">Using with fetch</a>
- <a href="fetch-abort.html#abortcontroller-is-scalable" class="sidebar__link">AbortController is scalable</a>
- <a href="fetch-abort.html#summary" class="sidebar__link">Summary</a>

- <a href="fetch-abort.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/04-fetch-abort" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
