EN

- <a href="https://ar.javascript.info/"
- <a href="script-async-defer.html"
- <a href="https://es.javascript.info/script-async-defer"
- <a href="https://fr.javascript.info/script-async-defer"
- script-async-defer"
  script-async-defer"

<!-- -->

- <a href="https://ko.javascript.info/script-async-defer"
- <a href=script-async-defer"
- <a href="https://tr.javascript.info/script-async-defer"
- <a href="https://zh.javascript.info/script-async-defer"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fscript-async-defer" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fscript-async-defer" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="loading.html" Document and resource loading</span></a></span>

22nd November 2020

# Scripts: async, defer

In modern websites, scripts are often “heavier” than HTML: their download size is larger, and processing time is also longer.

When the browser loads HTML and comes across a `<script>...</script>` tag, it can’t continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait for the script to download, execute the downloaded script, and only then can it process the rest of the page.

That leads to two important issues:

1.  Scripts can’t see DOM elements below them, so they can’t add handlers etc.
2.  If there’s a bulky script at the top of the page, it “blocks the page”. Users can’t see the page content till it downloads and runs:

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p>...content before script...</p>

    <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <!-- This isn't visible until the script loads -->
    <p>...content after script...</p>

There are some workarounds to that. For instance, we can put a script at the bottom of the page. Then it can see elements above it, and it doesn’t block the page content from showing:

    <body>
      ...all content is above the script...

      <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
    </body>

But this solution is far from perfect. For example, the browser notices the script (and can start downloading it) only after it downloaded the full HTML document. For long HTML documents, that may be a noticeable delay.

Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.

Luckily, there are two `<script>` attributes that solve the problem for us: `defer` and `async`.

## <a href="script-async-defer.html#defer" id="defer" class="main__anchor">defer</a>

The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads “in the background”, and then runs when the DOM is fully built.

Here’s the same example as above, but with `defer`:

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p>...content before script...</p>

    <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <!-- visible immediately -->
    <p>...content after script...</p>

In other words:

- Scripts with `defer` never block the page.
- Scripts with `defer` always execute when the DOM is ready (but before `DOMContentLoaded` event).

The following example demonstrates the second part:

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p>...content before scripts...</p>

    <script>
      document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
    </script>

    <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <p>...content after scripts...</p>

1.  The page content shows up immediately.
2.  `DOMContentLoaded` event handler waits for the deferred script. It only triggers when the script is downloaded and executed.

**Deferred scripts keep their relative order, just like regular scripts.**

Let’s say, we have two deferred scripts: the `long.js` and then `small.js`:

    <script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
    <script defer src="https://javascript.info/article/script-async-defer/small.js"></script>

Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably finishes first.

…But the `defer` attribute, besides telling the browser “not to block”, ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.

<span class="important__type">The `defer` attribute is only for external scripts</span>

The `defer` attribute is ignored if the `<script>` tag has no `src`.

## <a href="script-async-defer.html#async" id="async" class="main__anchor">async</a>

The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn’t block on `async` scripts (like `defer`).
- Other scripts don’t wait for `async` scripts, and `async` scripts don’t wait for them.
- `DOMContentLoaded` and async scripts don’t wait for each other:
  - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
  - …or after an async script (if an async script is short or was in HTTP-cache)

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don’t wait for them, and they don’t wait for anything. A fully independent script that runs when loaded. As simple, as it can get, right?

Here’s an example similar to what we’ve seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

They don’t wait for each other. Whatever loads first (probably `small.js`) – runs first:

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="script-async-defer.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p>...content before scripts...</p>

    <script>
      document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
    </script>

    <script async src="https://javascript.info/article/script-async-defer/long.js"></script>
    <script async src="https://javascript.info/article/script-async-defer/small.js"></script>

    <p>...content after scripts...</p>

- The page content shows up immediately: `async` doesn’t block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the “load-first” order.

Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don’t depend on our scripts, and our scripts shouldn’t wait for them:

    <!-- Google Analytics is usually added like this -->
    <script async src="https://google-analytics.com/analytics.js"></script>

## <a href="script-async-defer.html#dynamic-scripts" id="dynamic-scripts" class="main__anchor">Dynamic scripts</a>

There’s one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:

<a href="script-async-defer.html#"
<a href="script-async-defer.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let script = document.createElement('script');
    script.src = "/article/script-async-defer/long.js";
    document.body.append(script); // (*)

The script starts loading as soon as it’s appended to the document `(*)`.

**Dynamic scripts behave as “async” by default.**

That is:

- They don’t wait for anything, nothing waits for them.
- The script that loads first – runs first (“load-first” order).

This can be changed if we explicitly set `script.async=false`. Then scripts will be executed in the document order, just like `defer`.

In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.

So `long.js` always runs first (as it’s added first):

<a href="script-async-defer.html#"
<a href="script-async-defer.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function loadScript(src) {
      let script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.append(script);
    }

    // long.js runs first because of async=false
    loadScript("/article/script-async-defer/long.js");
    loadScript("/article/script-async-defer/small.js");

Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we’d like to load a library and then another script that depends on it.

## <a href="script-async-defer.html#summary" id="summary" class="main__anchor">Summary</a>

Both `async` and `defer` have one common thing: downloading of such scripts doesn’t block page rendering. So the user can read page content and get acquainted with the page immediately.

But there are also essential differences between them:

<table><thead><tr class="header"><th></th><th>Order</th><th><code>DOMContentLoaded</code></th></tr></thead><tbody><tr class="odd"><td><code>async</code></td><td><em>Load-first order</em>. Their document order doesn’t matter – which loads first runs first</td><td>Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough.</td></tr><tr class="even"><td><code>defer</code></td><td><em>Document order</em> (as they go in the document).</td><td>Execute after the document is loaded and parsed (they wait if needed), right before <code>DOMContentLoaded</code>.</td></tr></tbody></table>

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important.

And `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

<span class="important__type">Page without scripts should be usable</span>

Please note: if you’re using `defer` or `async`, then user will see the the page _before_ the script loads.

In such case, some graphical components are probably not initialized yet.

Don’t forget to put “loading” indication and disable buttons that aren’t functional yet. Let the user clearly see what he can do on the page, and what’s still getting ready.

<a href="onload-ondomcontentloaded.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="onload-onerror.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fscript-async-defer" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fscript-async-defer" </a>

<a href="tutorial/map.html" class="map">

## <a href="script-async-defer.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="loading.html" class="sidebar__link">Document and resource loading</a>

#### Lesson navigation

- <a href="script-async-defer.html#defer" class="sidebar__link">defer</a>
- <a href="script-async-defer.html#async" class="sidebar__link">async</a>
- <a href="script-async-defer.html#dynamic-scripts" class="sidebar__link">Dynamic scripts</a>
- <a href="script-async-defer.html#summary" class="sidebar__link">Summary</a>

- <a href="script-async-defer.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fscript-async-defer" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fscript-async-defer" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/5-loading/02-script-async-defer" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
