EN

- <a href="https://ar.javascript.info/"
- <a href="do-we-need-origin.html"
  /do-we-need-origin"
  /do-we-need-origin"
  do-we-need-origindo-we-need-origin"

<!-- -->

do-we-need-origin"
do-we-need-origin"
/do-we-need-origin"
do-we-need-origin"

k%2Fdo-we-need-origin"%2Fdo-we-need-origin" </a>

<a href="../network.html" Network requests</span></a>

<a href="../fetch-crossorigin.html" Fetch: Cross-Origin Requests</span></a>

<a href="../fetch-crossorigin.html"

## Why do we need Origin?

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
