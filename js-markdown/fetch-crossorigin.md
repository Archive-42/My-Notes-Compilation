EN

langs\_\_title">عربي</span></a>

- <a href="fetch-crossorigin.html"
- <a href="https://es.javascript.info/fetch-crossorigin"
- <a href="https://fr.javascript.info/fetch-crossorigin"
- fetch-crossorigin"
  fetch-crossorigin"

<!-- -->

- <a href="https://ko.javascript.info/fetch-crossorigin"
- <a href=fetch-crossorigin"
- <a href="https://tr.javascript.info/fetch-crossorigin"
- <a href="https://zh.javascript.info/fetch-crossorigin"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-crossorigin" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-crossorigin" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

2nd January 2021

# Fetch: Cross-Origin Requests

If we send a `fetch` request to another web-site, it will probably fail.

For instance, let’s try fetching `http://example.com`:

<a href="fetch-crossorigin.html#"
<a href="fetch-crossorigin.html#"

    try {
      await fetch('http://example.com');
    } catch(err) {
      alert(err); // Failed to fetch
    }

Fetch fails, as expected.

The core concept here is _origin_ – a domain/port/protocol triplet.

Cross-origin requests – those sent to another domain (even a subdomain) or protocol or port – require special headers from the remote side.

That policy is called “CORS”: Cross-Origin Resource Sharing.

## <a href="fetch-crossorigin.html#why-is-cors-needed-a-brief-history" id="why-is-cors-needed-a-brief-history" class="main__anchor">Why is CORS needed? A brief history</a>

CORS exists to protect the internet from evil hackers.

Seriously. Let’s make a very brief historical digression.

**For many years a script from one site could not access the content of another site.**

That simple, yet powerful rule was a foundation of the internet security. E.g. an evil script from website `hacker.com` could not access the user’s mailbox at website `gmail.com`. People felt safe.

JavaScript also did not have any special methods to perform network requests at that time. It was a toy language to decorate a web page.

But web developers demanded more power. A variety of tricks were invented to work around the limitation and make requests to other websites.

### <a href="fetch-crossorigin.html#using-forms" id="using-forms" class="main__anchor">Using forms</a>

One way to communicate with another server was to submit a `<form>` there. People submitted it into `<iframe>`, just to stay on the current page, like this:

    <!-- form target -->
    <iframe name="iframe"></iframe>

    <!-- a form could be dynamically generated and submited by JavaScript -->
    <form target="iframe" method="POST" action="http://another.com/…">
      ...
    </form>

So, it was possible to make a GET/POST request to another site, even without networking methods, as forms can send data anywhere. But as it’s forbidden to access the content of an `<iframe>` from another site, it wasn’t possible to read the response.

To be precise, there were actually tricks for that, they required special scripts at both the iframe and the page. So the communication with the iframe was technically possible. Right now there’s no point to go into details, let these dinosaurs rest in peace.

### <a href="fetch-crossorigin.html#using-scripts" id="using-scripts" class="main__anchor">Using scripts</a>

Another trick was to use a `script` tag. A script could have any `src`, with any domain, like `<script src="http://another.com/…">`. It’s possible to execute a script from any website.

If a website, e.g. `another.com` intended to expose data for this kind of access, then a so-called “JSONP (JSON with padding)” protocol was used.

Here’s how it worked.

Let’s say we, at our site, need to get the data from `http://another.com`, such as the weather:

1.  First, in advance, we declare a global function to accept the data, e.g. `gotWeather`.

        // 1. Declare the function to process the weather data
        function gotWeather({ temperature, humidity }) {
          alert(`temperature: ${temperature}, humidity: ${humidity}`);
        }

2.  Then we make a `<script>` tag with `src="http://another.com/weather.json?callback=gotWeather"`, using the name of our function as the `callback` URL-parameter.

        let script = document.createElement('script');
        script.src = `http://another.com/weather.json?callback=gotWeather`;
        document.body.append(script);

3.  The remote server `another.com` dynamically generates a script that calls `gotWeather(...)` with the data it wants us to receive.

        // The expected answer from the server looks like this:
        gotWeather({
          temperature: 25,
          humidity: 78
        });

4.  When the remote script loads and executes, `gotWeather` runs, and, as it’s our function, we have the data.

That works, and doesn’t violate security, because both sides agreed to pass the data this way. And, when both sides agree, it’s definitely not a hack. There are still services that provide such access, as it works even for very old browsers.

After a while, networking methods appeared in browser JavaScript.

At first, cross-origin requests were forbidden. But as a result of long discussions, cross-origin requests were allowed, but with any new capabilities requiring an explicit allowance by the server, expressed in special headers.

## <a href="fetch-crossorigin.html#safe-requests" id="safe-requests" class="main__anchor">Safe requests</a>

There are two types of cross-origin requests:

1.  Safe requests.
2.  All the others.

Safe Requests are simpler to make, so let’s start with them.

A request is safe if it satisfies two conditions:

1.  [Safe method](https://fetch.spec.whatwg.org/#cors-safelisted-method): GET, POST or HEAD
2.  [Safe headers](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) – the only allowed custom headers are:
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` with the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

Any other request is considered “unsafe”. For instance, a request with `PUT` method or with an `API-Key` HTTP-header does not fit the limitations.

**The essential difference is that a safe request can be made with a `<form>` or a `<script>`, without any special methods.**

So, even a very old server should be ready to accept a safe request.

Contrary to that, requests with non-standard headers or e.g. method `DELETE` can’t be created this way. For a long time JavaScript was unable to do such requests. So an old server may assume that such requests come from a privileged source, “because a webpage is unable to send them”.

When we try to make a unsafe request, the browser sends a special “preflight” request that asks the server – does it agree to accept such cross-origin requests, or not?

And, unless the server explicitly confirms that with headers, an unsafe request is not sent.

Now we’ll go into details.

## <a href="fetch-crossorigin.html#cors-for-safe-requests" id="cors-for-safe-requests" class="main__anchor">CORS for safe requests</a>

If a request is cross-origin, the browser always adds the `Origin` header to it.

For instance, if we request `https://anywhere.com/request` from `https://javascript.info/page`, the headers will look like:

    GET /request
    Host: anywhere.com
    Origin: https://javascript.info
    ...

As you can see, the `Origin` header contains exactly the origin (domain/protocol/port), without a path.

The server can inspect the `Origin` and, if it agrees to accept such a request, add a special header `Access-Control-Allow-Origin` to the response. That header should contain the allowed origin (in our case `https://javascript.info`), or a star `*`. Then the response is successful, otherwise it’s an error.

The browser plays the role of a trusted mediator here:

1.  It ensures that the correct `Origin` is sent with a cross-origin request.
2.  It checks for permitting `Access-Control-Allow-Origin` in the response, if it exists, then JavaScript is allowed to access the response, otherwise it fails with an error.

<figure><img src="article/fetch-crossorigin/xhr-another-domain.svg" width="633" height="411" /></figure>Here’s an example of a permissive server response:

    200 OK
    Content-Type:text/html; charset=UTF-8
    Access-Control-Allow-Origin: https://javascript.info

## <a href="fetch-crossorigin.html#response-headers" id="response-headers" class="main__anchor">Response headers</a>

For cross-origin request, by default JavaScript may only access so-called “safe” response headers:

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

Accessing any other response header causes an error.

<span class="important__type">Please note:</span>

There’s no `Content-Length` header in the list!

This header contains the full response length. So, if we’re downloading something and would like to track the percentage of progress, then an additional permission is required to access that header (see below).

To grant JavaScript access to any other response header, the server must send the `Access-Control-Expose-Headers` header. It contains a comma-separated list of unsafe header names that should be made accessible.

For example:

    200 OK
    Content-Type:text/html; charset=UTF-8
    Content-Length: 12345
    API-Key: 2c9de507f2c54aa1
    Access-Control-Allow-Origin: https://javascript.info
    Access-Control-Expose-Headers: Content-Length,API-Key

With such an `Access-Control-Expose-Headers` header, the script is allowed to read the `Content-Length` and `API-Key` headers of the response.

## <a href="fetch-crossorigin.html#unsafe-requests" id="unsafe-requests" class="main__anchor">“Unsafe” requests</a>

We can use any HTTP-method: not just `GET/POST`, but also `PATCH`, `DELETE` and others.

Some time ago no one could even imagine that a webpage could make such requests. So there may still exist webservices that treat a non-standard method as a signal: “That’s not a browser”. They can take it into account when checking access rights.

So, to avoid misunderstandings, any “unsafe” request – that couldn’t be done in the old times, the browser does not make such requests right away. First, it sends a preliminary, so-called “preflight” request, to ask for permission.

A preflight request uses the method `OPTIONS`, no body and two headers:

- `Access-Control-Request-Method` header has the method of the unsafe request.
- `Access-Control-Request-Headers` header provides a comma-separated list of its unsafe HTTP-headers.

If the server agrees to serve the requests, then it should respond with empty body, status 200 and headers:

- `Access-Control-Allow-Origin` must be either `*` or the requesting origin, such as `https://javascript.info`, to allow it.
- `Access-Control-Allow-Methods` must have the allowed method.
- `Access-Control-Allow-Headers` must have a list of allowed headers.
- Additionally, the header `Access-Control-Max-Age` may specify a number of seconds to cache the permissions. So the browser won’t have to send a preflight for subsequent requests that satisfy given permissions.

<figure><img src="article/fetch-crossorigin/xhr-preflight.svg" width="620" height="633" /></figure>Let’s see how it works step-by-step on the example of a cross-origin `PATCH` request (this method is often used to update data):

    let response = await fetch('https://site.com/service.json', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': 'secret'
      }
    });

There are three reasons why the request is unsafe (one is enough):

- Method `PATCH`
- `Content-Type` is not one of: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`.
- “Unsafe” `API-Key` header.

### <a href="fetch-crossorigin.html#step-1-preflight-request" id="step-1-preflight-request" class="main__anchor">Step 1 (preflight request)</a>

Prior to sending such a request, the browser, on its own, sends a preflight request that looks like this:

    OPTIONS /service.json
    Host: site.com
    Origin: https://javascript.info
    Access-Control-Request-Method: PATCH
    Access-Control-Request-Headers: Content-Type,API-Key

- Method: `OPTIONS`.
- The path – exactly the same as the main request: `/service.json`.
- Cross-origin special headers:
  - `Origin` – the source origin.
  - `Access-Control-Request-Method` – requested method.
  - `Access-Control-Request-Headers` – a comma-separated list of “unsafe” headers.

### <a href="fetch-crossorigin.html#step-2-preflight-response" id="step-2-preflight-response" class="main__anchor">Step 2 (preflight response)</a>

The server should respond with status 200 and the headers:

- `Access-Control-Allow-Origin: https://javascript.info`
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

That allows future communication, otherwise an error is triggered.

If the server expects other methods and headers in the future, it makes sense to allow them in advance by adding them to the list.

For example, this response also allows `PUT`, `DELETE` and additional headers:

    200 OK
    Access-Control-Allow-Origin: https://javascript.info
    Access-Control-Allow-Methods: PUT,PATCH,DELETE
    Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
    Access-Control-Max-Age: 86400

Now the browser can see that `PATCH` is in `Access-Control-Allow-Methods` and `Content-Type,API-Key` are in the list `Access-Control-Allow-Headers`, so it sends out the main request.

If there’s the header `Access-Control-Max-Age` with a number of seconds, then the preflight permissions are cached for the given time. The response above will be cached for 86400 seconds (one day). Within this timeframe, subsequent requests will not cause a preflight. Assuming that they fit the cached allowances, they will be sent directly.

### <a href="fetch-crossorigin.html#step-3-actual-request" id="step-3-actual-request" class="main__anchor">Step 3 (actual request)</a>

When the preflight is successful, the browser now makes the main request. The process here is the same as for safe requests.

The main request has the `Origin` header (because it’s cross-origin):

    PATCH /service.json
    Host: site.com
    Content-Type: application/json
    API-Key: secret
    Origin: https://javascript.info

### <a href="fetch-crossorigin.html#step-4-actual-response" id="step-4-actual-response" class="main__anchor">Step 4 (actual response)</a>

The server should not forget to add `Access-Control-Allow-Origin` to the main response. A successful preflight does not relieve from that:

    Access-Control-Allow-Origin: https://javascript.info

Then JavaScript is able to read the main server response.

<span class="important__type">Please note:</span>

Preflight request occurs “behind the scenes”, it’s invisible to JavaScript.

JavaScript only gets the response to the main request or an error if there’s no server permission.

## <a href="fetch-crossorigin.html#credentials" id="credentials" class="main__anchor">Credentials</a>

A cross-origin request initiated by JavaScript code by default does not bring any credentials (cookies or HTTP authentication).

That’s uncommon for HTTP-requests. Usually, a request to `http://site.com` is accompanied by all cookies from that domain. Cross-origin requests made by JavaScript methods on the other hand are an exception.

For example, `fetch('http://another.com')` does not send any cookies, even those (!) that belong to `another.com` domain.

Why?

That’s because a request with credentials is much more powerful than without them. If allowed, it grants JavaScript the full power to act on behalf of the user and access sensitive information using their credentials.

Does the server really trust the script that much? Then it must explicitly allow requests with credentials with an additional header.

To send credentials in `fetch`, we need to add the option `credentials: "include"`, like this:

    fetch('http://another.com', {
      credentials: "include"
    });

Now `fetch` sends cookies originating from `another.com` with request to that site.

If the server agrees to accept the request _with credentials_, it should add a header `Access-Control-Allow-Credentials: true` to the response, in addition to `Access-Control-Allow-Origin`.

For example:

    200 OK
    Access-Control-Allow-Origin: https://javascript.info
    Access-Control-Allow-Credentials: true

Please note: `Access-Control-Allow-Origin` is prohibited from using a star `*` for requests with credentials. Like shown above, it must provide the exact origin there. That’s an additional safety measure, to ensure that the server really knows who it trusts to make such requests.

## <a href="fetch-crossorigin.html#summary" id="summary" class="main__anchor">Summary</a>

From the browser point of view, there are two kinds of cross-origin requests: “safe” and all the others.

“Safe” requests must satisfy the following conditions:

- Method: GET, POST or HEAD.
- Headers – we can set only:
  - `Accept`
  - `Accept-Language`
  - `Content-Language`
  - `Content-Type` to the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

The essential difference is that safe requests were doable since ancient times using `<form>` or `<script>` tags, while unsafe were impossible for browsers for a long time.

So, the practical difference is that safe requests are sent right away, with the `Origin` header, while for the other ones the browser makes a preliminary “preflight” request, asking for permission.

**For safe requests:**

- → The browser sends the `Origin` header with the origin.
- ← For requests without credentials (not sent by default), the server should set:
  - `Access-Control-Allow-Origin` to `*` or same value as `Origin`
- ← For requests with credentials, the server should set:
  - `Access-Control-Allow-Origin` to same value as `Origin`
  - `Access-Control-Allow-Credentials` to `true`

Additionally, to grant JavaScript access to any response headers except `Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` or `Pragma`, the server should list the allowed ones in `Access-Control-Expose-Headers` header.

**For unsafe requests, a preliminary “preflight” request is issued before the requested one:**

- → The browser sends an `OPTIONS` request to the same URL, with the headers:
  - `Access-Control-Request-Method` has requested method.
  - `Access-Control-Request-Headers` lists unsafe requested headers.
- ← The server should respond with status 200 and the headers:
  - `Access-Control-Allow-Methods` with a list of allowed methods,
  - `Access-Control-Allow-Headers` with a list of allowed headers,
  - `Access-Control-Max-Age` with a number of seconds to cache the permissions.
- Then the actual request is sent, and the previous “safe” scheme is applied.

## <a href="fetch-crossorigin.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="fetch-crossorigin.html#why-do-we-need-origin" id="why-do-we-need-origin" class="main__anchor">Why do we need Origin?</a>

<a href="task/do-we-need-origin.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

As you probably know, there’s HTTP-header `Referer`, that usually contains an url of the page which initiated a network request.

For instance, when fetching `http://google.com` from `http://javascript.info/some/url`, the headers look like this:

    Accept: */*
    Accept-Charset: utf-8
    Accept-Encoding: gzip,deflate,sdch
    Connection: keep-alive
    Host: google.com
    Origin: http://javascript.info
    Referer: http://javascript.info/some/url

As you can see, both `Referer` and `Origin` are present.

The questions:

1.  Why `Origin` is needed, if `Referer` has even more information?
2.  Is it possible that there’s no `Referer` or `Origin`, or is it incorrect?

solution

We need `Origin`, because sometimes `Referer` is absent. For instance, when we `fetch` HTTP-page from HTTPS (access less secure from more secure), then there’s no `Referer`.

The [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) may forbid sending a `Referer`.

As we’ll see, `fetch` has options that prevent sending the `Referer` and even allow to change it (within the same site).

By specification, `Referer` is an optional HTTP-header.

Exactly because `Referer` is unreliable, `Origin` was invented. The browser guarantees correct `Origin` for cross-origin requests.

<a href="fetch-abort.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="fetch-api.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-crossorigin" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-crossorigin" </a>

<a href="tutorial/map.html" class="map">

## <a href="fetch-crossorigin.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="fetch-crossorigin.html#why-is-cors-needed-a-brief-history" class="sidebar__link">Why is CORS needed? A brief history</a>
- <a href="fetch-crossorigin.html#safe-requests" class="sidebar__link">Safe requests</a>
- <a href="fetch-crossorigin.html#cors-for-safe-requests" class="sidebar__link">CORS for safe requests</a>
- <a href="fetch-crossorigin.html#response-headers" class="sidebar__link">Response headers</a>
- <a href="fetch-crossorigin.html#unsafe-requests" class="sidebar__link">“Unsafe” requests</a>
- <a href="fetch-crossorigin.html#credentials" class="sidebar__link">Credentials</a>
- <a href="fetch-crossorigin.html#summary" class="sidebar__link">Summary</a>

- <a href="fetch-crossorigin.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="fetch-crossorigin.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Ffetch-crossorigin" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-crossorigin" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/05-fetch-crossorigin" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
