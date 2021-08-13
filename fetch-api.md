EN

langs\_\_title">عربي</span></a>

- <a href="fetch-api.html"
- <a href="https://es.javascript.info/fetch-api"
- <a href="https://fr.javascript.info/fetch-api"
- fetch-api"
  fetch-api"

<!-- -->

- <a href="https://ko.javascript.info/fetch-api"
- <a href=fetch-api"
- <a href="https://tr.javascript.info/fetch-api"
- <a href="https://zh.javascript.info/fetch-api"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-api" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-api" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

3rd July 2021

# Fetch API

So far, we know quite a bit about `fetch`.

Let’s see the rest of API, to cover all its abilities.

<span class="important__type">Please note:</span>

Please note: most of these options are used rarely. You may skip this chapter and still use `fetch` well.

Still, it’s good to know what `fetch` can do, so if the need arises, you can return and read the details.

Here’s the full list of all possible `fetch` options with their default values (alternatives in comments):

    let promise = fetch(url, {
      method: "GET", // POST, PUT, DELETE, etc.
      headers: {
        // the content type header value is usually auto-set
        // depending on the request body
        "Content-Type": "text/plain;charset=UTF-8"
      },
      body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
      referrer: "about:client", // or "" to send no Referer header,
      // or an url from the current origin
      referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
      mode: "cors", // same-origin, no-cors
      credentials: "same-origin", // omit, include
      cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
      redirect: "follow", // manual, error
      integrity: "", // a hash, like "sha256-abcdef1234567890"
      keepalive: false, // true
      signal: undefined, // AbortController to abort request
      window: window // null
    });

An impressive list, right?

We fully covered `method`, `headers` and `body` in the chapter [Fetch](fetch.html).

The `signal` option is covered in [Fetch: Abort](fetch-abort.html).

Now let’s explore the remaining capabilities.

## <a href="fetch-api.html#referrer-referrerpolicy" id="referrer-referrerpolicy" class="main__anchor">referrer, referrerPolicy</a>

These options govern how `fetch` sets the HTTP `Referer` header.

Usually that header is set automatically and contains the url of the page that made the request. In most scenarios, it’s not important at all, sometimes, for security purposes, it makes sense to remove or shorten it.

**The `referrer` option allows to set any `Referer` (within the current origin) or remove it.**

To send no referer, set an empty string:

    fetch('/page', {
      referrer: "" // no Referer header
    });

To set another url within the current origin:

    fetch('/page', {
      // assuming we're on https://javascript.info
      // we can set any Referer header, but only within the current origin
      referrer: "https://javascript.info/anotherpage"
    });

**The `referrerPolicy` option sets general rules for `Referer`.**

Requests are split into 3 types:

1.  Request to the same origin.
2.  Request to another origin.
3.  Request from HTTPS to HTTP (from safe to unsafe protocol).

Unlike the `referrer` option that allows to set the exact `Referer` value, `referrerPolicy` tells the browser general rules for each request type.

Possible values are described in the [Referrer Policy specification](https://w3c.github.io/webappsec-referrer-policy/):

- **`"no-referrer-when-downgrade"`** – the default value: full `Referer` is always sent, unless we send a request from HTTPS to HTTP (to the less secure protocol).
- **`"no-referrer"`** – never send `Referer`.
- **`"origin"`** – only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** – send the full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** – send the full `Referer` to the same origin, but no `Referer` for cross-origin requests.
- **`"strict-origin"`** – send only the origin, not the `Referer` for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** – for same-origin send the full `Referer`, for cross-origin send only the origin, unless it’s HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** – always send the full url in `Referer`, even for HTTPS→HTTP requests.

Here’s a table with all combinations:

<table><thead><tr class="header"><th>Value</th><th>To same origin</th><th>To another origin</th><th>HTTPS→HTTP</th></tr></thead><tbody><tr class="odd"><td><code>"no-referrer"</code></td><td>-</td><td>-</td><td>-</td></tr><tr class="even"><td><code>"no-referrer-when-downgrade"</code> or <code>""</code> (default)</td><td>full</td><td>full</td><td>-</td></tr><tr class="odd"><td><code>"origin"</code></td><td>origin</td><td>origin</td><td>origin</td></tr><tr class="even"><td><code>"origin-when-cross-origin"</code></td><td>full</td><td>origin</td><td>origin</td></tr><tr class="odd"><td><code>"same-origin"</code></td><td>full</td><td>-</td><td>-</td></tr><tr class="even"><td><code>"strict-origin"</code></td><td>origin</td><td>origin</td><td>-</td></tr><tr class="odd"><td><code>"strict-origin-when-cross-origin"</code></td><td>full</td><td>origin</td><td>-</td></tr><tr class="even"><td><code>"unsafe-url"</code></td><td>full</td><td>full</td><td>full</td></tr></tbody></table>

Let’s say we have an admin zone with a URL structure that shouldn’t be known from outside of the site.

If we send a `fetch`, then by default it always sends the `Referer` header with the full url of our page (except when we request from HTTPS to HTTP, then no `Referer`).

E.g. `Referer: https://javascript.info/admin/secret/paths`.

If we’d like other websites know only the origin part, not the URL-path, we can set the option:

    fetch('https://another.com/page', {
      // ...
      referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
    });

We can put it to all `fetch` calls, maybe integrate into JavaScript library of our project that does all requests and uses `fetch` inside.

Its only difference compared to the default behavior is that for requests to another origin `fetch` sends only the origin part of the URL (e.g. `https://javascript.info`, without path). For requests to our origin we still get the full `Referer` (maybe useful for debugging purposes).

<span class="important__type">Referrer policy is not only for `fetch`</span>

Referrer policy, described in the [specification](https://w3c.github.io/webappsec-referrer-policy/), is not just for `fetch`, but more global.

In particular, it’s possible to set the default policy for the whole page using the `Referrer-Policy` HTTP header, or per-link, with `<a rel="noreferrer">`.

## <a href="fetch-api.html#mode" id="mode" class="main__anchor">mode</a>

The `mode` option is a safe-guard that prevents occasional cross-origin requests:

- **`"cors"`** – the default, cross-origin requests are allowed, as described in [Fetch: Cross-Origin Requests](fetch-crossorigin.html),
- **`"same-origin"`** – cross-origin requests are forbidden,
- **`"no-cors"`** – only safe cross-origin requests are allowed.

This option may be useful when the URL for `fetch` comes from a 3rd-party, and we want a “power off switch” to limit cross-origin capabilities.

## <a href="fetch-api.html#credentials" id="credentials" class="main__anchor">credentials</a>

The `credentials` option specifies whether `fetch` should send cookies and HTTP-Authorization headers with the request.

- **`"same-origin"`** – the default, don’t send for cross-origin requests,
- **`"include"`** – always send, requires `Access-Control-Allow-Credentials` from cross-origin server in order for JavaScript to access the response, that was covered in the chapter [Fetch: Cross-Origin Requests](fetch-crossorigin.html),
- **`"omit"`** – never send, even for same-origin requests.

## <a href="fetch-api.html#cache" id="cache" class="main__anchor">cache</a>

By default, `fetch` requests make use of standard HTTP-caching. That is, it respects the `Expires` and `Cache-Control` headers, sends `If-Modified-Since` and so on. Just like regular HTTP-requests do.

The `cache` options allows to ignore HTTP-cache or fine-tune its usage:

- **`"default"`** – `fetch` uses standard HTTP-cache rules and headers,
- **`"no-store"`** – totally ignore HTTP-cache, this mode becomes the default if we set a header `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, or `If-Range`,
- **`"reload"`** – don’t take the result from HTTP-cache (if any), but populate the cache with the response (if the response headers permit this action),
- **`"no-cache"`** – create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
- **`"force-cache"`** – use a response from HTTP-cache, even if it’s stale. If there’s no response in HTTP-cache, make a regular HTTP-request, behave normally,
- **`"only-if-cached"`** – use a response from HTTP-cache, even if it’s stale. If there’s no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.

## <a href="fetch-api.html#redirect" id="redirect" class="main__anchor">redirect</a>

Normally, `fetch` transparently follows HTTP-redirects, like 301, 302 etc.

The `redirect` option allows to change that:

- **`"follow"`** – the default, follow HTTP-redirects,
- **`"error"`** – error in case of HTTP-redirect,
- **`"manual"`** – allows to process HTTP-redirects manually. In case of redirect, we’ll get a special response object, with `response.type="opaqueredirect"` and zeroed/empty status and most other properies.

## <a href="fetch-api.html#integrity" id="integrity" class="main__anchor">integrity</a>

The `integrity` option allows to check if the response matches the known-ahead checksum.

As described in the [specification](https://w3c.github.io/webappsec-subresource-integrity/), supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on the browser.

For example, we’re downloading a file, and we know that it’s SHA-256 checksum is “abcdef” (a real checksum is longer, of course).

We can put it in the `integrity` option, like this:

    fetch('http://site.com/file', {
      integrity: 'sha256-abcdef'
    });

Then `fetch` will calculate SHA-256 on its own and compare it with our string. In case of a mismatch, an error is triggered.

## <a href="fetch-api.html#keepalive" id="keepalive" class="main__anchor">keepalive</a>

The `keepalive` option indicates that the request may “outlive” the webpage that initiated it.

For example, we gather statistics on how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve the user experience.

When the visitor leaves our page – we’d like to save the data to our server.

We can use the `window.onunload` event for that:

<a href="fetch-api.html#"
<a href="fetch-api.html#"

    window.onunload = function() {
      fetch('/analytics', {
        method: 'POST',
        body: "statistics",
        keepalive: true
      });
    };

Normally, when a document is unloaded, all associated network requests are aborted. But the `keepalive` option tells the browser to perform the request in the background, even after it leaves the page. So this option is essential for our request to succeed.

It has a few limitations:

- We can’t send megabytes: the body limit for `keepalive` requests is 64KB.
  - If we need to gather a lot of statistics about the visit, we should send it out regularly in packets, so that there won’t be a lot left for the last `onunload` request.
  - This limit applies to all `keepalive` requests together. In other words, we can perform multiple `keepalive` requests in parallel, but the sum of their body lengths should not exceed 64KB.
- We can’t handle the server response if the document is unloaded. So in our example `fetch` will succeed due to `keepalive`, but subsequent functions won’t work.
  - In most cases, such as sending out statistics, it’s not a problem, as the server just accepts the data and usually sends an empty response to such requests.

<a href="fetch-crossorigin.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="url.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-api" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-api" </a>

<a href="tutorial/map.html" class="map">

## <a href="fetch-api.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="fetch-api.html#referrer-referrerpolicy" class="sidebar__link">referrer, referrerPolicy</a>
- <a href="fetch-api.html#mode" class="sidebar__link">mode</a>
- <a href="fetch-api.html#credentials" class="sidebar__link">credentials</a>
- <a href="fetch-api.html#cache" class="sidebar__link">cache</a>
- <a href="fetch-api.html#redirect" class="sidebar__link">redirect</a>
- <a href="fetch-api.html#integrity" class="sidebar__link">integrity</a>
- <a href="fetch-api.html#keepalive" class="sidebar__link">keepalive</a>

- <a href="fetch-api.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Ffetch-api" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-api" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/06-fetch-api" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
