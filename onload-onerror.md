EN

- <a href="https://ar.javascript.info/"
- <a href="onload-onerror.html"
- <a href="https://es.javascript.info/onload-onerror"
- <a href="https://fr.javascript.info/onload-onerror"
- onload-onerror"
  onload-onerror"

<!-- -->

- /"
- <a href=onload-onerror"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/onload-onerror"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fonload-onerror" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonload-onerror" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="loading.html" Document and resource loading</span></a></span>

5th October 2020

# Resource loading: onload and onerror

The browser allows us to track the loading of external resources – scripts, iframes, pictures and so on.

There are two events for it:

- `onload` – successful load,
- `onerror` – an error occurred.

## <a href="onload-onerror.html#loading-a-script" id="loading-a-script" class="main__anchor">Loading a script</a>

Let’s say we need to load a third-party script and call a function that resides there.

We can load it dynamically, like this:

    let script = document.createElement('script');
    script.src = "my.js";

    document.head.append(script);

…But how to run the function that is declared inside that script? We need to wait until the script loads, and only then we can call it.

<span class="important__type">Please note:</span>

For our own scripts we could use [JavaScript modules](modules.html) here, but they are not widely adopted by third-party libraries.

### <a href="onload-onerror.html#script-onload" id="script-onload" class="main__anchor">script.onload</a>

The main helper is the `load` event. It triggers after the script was loaded and executed.

For instance:

<a href="onload-onerror.html#"
<a href="onload-onerror.html#"

    let script = document.createElement('script');

    // can load any script, from any domain
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
    document.head.append(script);

    script.onload = function() {
      // the script creates a variable "_"
      alert( _.VERSION ); // shows library version
    };

So in `onload` we can use script variables, run functions etc.

…And what if the loading failed? For instance, there’s no such script (error 404) or the server is down (unavailable).

### <a href="onload-onerror.html#script-onerror" id="script-onerror" class="main__anchor">script.onerror</a>

Errors that occur during the loading of the script can be tracked in an `error` event.

For instance, let’s request a script that doesn’t exist:

<a href="onload-onerror.html#"
<a href="onload-onerror.html#"

    let script = document.createElement('script');
    script.src = "https://example.com/404.js"; // no such script
    document.head.append(script);

    script.onerror = function() {
      alert("Error loading " + this.src); // Error loading https://example.com/404.js
    };

Please note that we can’t get HTTP error details here. We don’t know if it was an error 404 or 500 or something else. Just that the loading failed.

<span class="important__type">Important:</span>

Events `onload`/`onerror` track only the loading itself.

Errors that may occur during script processing and execution are out of scope for these events. That is: if a script loaded successfully, then `onload` triggers, even if it has programming errors in it. To track script errors, one can use `window.onerror` global handler.

## <a href="onload-onerror.html#other-resources" id="other-resources" class="main__anchor">Other resources</a>

The `load` and `error` events also work for other resources, basically for any resource that has an external `src`.

For example:

<a href="onload-onerror.html#"
<a href="onload-onerror.html#"

    let img = document.createElement('img');
    img.src = "https://js.cx/clipart/train.gif"; // (*)

    img.onload = function() {
      alert(`Image loaded, size ${img.width}x${img.height}`);
    };

    img.onerror = function() {
      alert("Error occurred while loading image");
    };

There are some notes though:

- Most resources start loading when they are added to the document. But `<img>` is an exception. It starts loading when it gets a src `(*)`.
- For `<iframe>`, the `iframe.onload` event triggers when the iframe loading finished, both for successful load and in case of an error.

That’s for historical reasons.

## <a href="onload-onerror.html#crossorigin-policy" id="crossorigin-policy" class="main__anchor">Crossorigin policy</a>

There’s a rule: scripts from one site can’t access contents of the other site. So, e.g. a script at `https://facebook.com` can’t read the user’s mailbox at `https://gmail.com`.

Or, to be more precise, one origin (domain/port/protocol triplet) can’t access the content from another one. So even if we have a subdomain, or just another port, these are different origins with no access to each other.

This rule also affects resources from other domains.

If we’re using a script from another domain, and there’s an error in it, we can’t get error details.

For example, let’s take a script `error.js` that consists of a single (bad) function call:

    // 📁 error.js
    noSuchFunction();

Now load it from the same site where it’s located:

<a href="onload-onerror.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="onload-onerror.html#"

    <script>
    window.onerror = function(message, url, line, col, errorObj) {
      alert(`${message}\n${url}, ${line}:${col}`);
    };
    </script>
    <script src="/article/onload-onerror/crossorigin/error.js"></script>

We can see a good error report, like this:

    Uncaught ReferenceError: noSuchFunction is not defined
    https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1

Now let’s load the same script from another domain:

<a href="onload-onerror.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="onload-onerror.html#"

    <script>
    window.onerror = function(message, url, line, col, errorObj) {
      alert(`${message}\n${url}, ${line}:${col}`);
    };
    </script>
    <script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>

The report is different, like this:

    Script error.
    , 0:0

Details may vary depending on the browser, but the idea is the same: any information about the internals of a script, including error stack traces, is hidden. Exactly because it’s from another domain.

Why do we need error details?

There are many services (and we can build our own) that listen for global errors using `window.onerror`, save errors and provide an interface to access and analyze them. That’s great, as we can see real errors, triggered by our users. But if a script comes from another origin, then there’s not much information about errors in it, as we’ve just seen.

Similar cross-origin policy (CORS) is enforced for other types of resources as well.

**To allow cross-origin access, the `<script>` tag needs to have the `crossorigin` attribute, plus the remote server must provide special headers.**

There are three levels of cross-origin access:

1.  **No `crossorigin` attribute** – access prohibited.
2.  **`crossorigin="anonymous"`** – access allowed if the server responds with the header `Access-Control-Allow-Origin` with `*` or our origin. Browser does not send authorization information and cookies to remote server.
3.  **`crossorigin="use-credentials"`** – access allowed if the server sends back the header `Access-Control-Allow-Origin` with our origin and `Access-Control-Allow-Credentials: true`. Browser sends authorization information and cookies to remote server.

<span class="important__type">Please note:</span>

You can read more about cross-origin access in the chapter [Fetch: Cross-Origin Requests](fetch-crossorigin.html). It describes the `fetch` method for network requests, but the policy is exactly the same.

Such thing as “cookies” is out of our current scope, but you can read about them in the chapter [Cookies, document.cookie](cookie.html).

In our case, we didn’t have any crossorigin attribute. So the cross-origin access was prohibited. Let’s add it.

We can choose between `"anonymous"` (no cookies sent, one server-side header needed) and `"use-credentials"` (sends cookies too, two server-side headers needed).

If we don’t care about cookies, then `"anonymous"` is the way to go:

<a href="onload-onerror.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="onload-onerror.html#"

    <script>
    window.onerror = function(message, url, line, col, errorObj) {
      alert(`${message}\n${url}, ${line}:${col}`);
    };
    </script>
    <script crossorigin="anonymous" src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>

Now, assuming that the server provides an `Access-Control-Allow-Origin` header, everything’s fine. We have the full error report.

## <a href="onload-onerror.html#summary" id="summary" class="main__anchor">Summary</a>

Images `<img>`, external styles, scripts and other resources provide `load` and `error` events to track their loading:

- `load` triggers on a successful load,
- `error` triggers on a failed load.

The only exception is `<iframe>`: for historical reasons it always triggers `load`, for any load completion, even if the page is not found.

The `readystatechange` event also works for resources, but is rarely used, because `load/error` events are simpler.

## <a href="onload-onerror.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="onload-onerror.html#load-images-with-a-callback" id="load-images-with-a-callback" class="main__anchor">Load images with a callback</a>

<a href="task/load-img-callback.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Normally, images are loaded when they are created. So when we add `<img>` to the page, the user does not see the picture immediately. The browser needs to load it first.

To show an image immediately, we can create it “in advance”, like this:

    let img = document.createElement('img');
    img.src = 'my.jpg';

The browser starts loading the image and remembers it in the cache. Later, when the same image appears in the document (no matter how), it shows up immediately.

**Create a function `preloadImages(sources, callback)` that loads all images from the array `sources` and, when ready, runs `callback`.**

For instance, this will show an `alert` after the images are loaded:

    function loaded() {
      alert("Images loaded")
    }

    preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);

In case of an error, the function should still assume the picture “loaded”.

In other words, the `callback` is executed when all images are either loaded or errored out.

The function is useful, for instance, when we plan to show a gallery with many scrollable images, and want to be sure that all images are loaded.

In the source document you can find links to test images, and also the code to check whether they are loaded or not. It should output `300`.

[Open a sandbox for the task.](https://plnkr.co/edit/dZ22M5URaGd0Dx0Q?p=preview)

solution

The algorithm:

1.  Make `img` for every source.
2.  Add `onload/onerror` for every image.
3.  Increase the counter when either `onload` or `onerror` triggers.
4.  When the counter value equals to the sources count – we’re done: `callback()`.

[Open the solution in a sandbox.](https://plnkr.co/edit/D31flNmxdXwV2g8G?p=preview)

<a href="script-async-defer.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="ui-misc.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fonload-onerror" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonload-onerror" </a>

<a href="tutorial/map.html" class="map">

## <a href="onload-onerror.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="loading.html" class="sidebar__link">Document and resource loading</a>

#### Lesson navigation

- <a href="onload-onerror.html#loading-a-script" class="sidebar__link">Loading a script</a>
- <a href="onload-onerror.html#other-resources" class="sidebar__link">Other resources</a>
- <a href="onload-onerror.html#crossorigin-policy" class="sidebar__link">Crossorigin policy</a>
- <a href="onload-onerror.html#summary" class="sidebar__link">Summary</a>

- <a href="onload-onerror.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="onload-onerror.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fonload-onerror" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonload-onerror" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/5-loading/03-onload-onerror" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
