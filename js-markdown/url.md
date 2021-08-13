EN

- <a href="https://ar.javascript.info/"
- <a href="url.html"
- <a href="https://es.javascript.info/url"
- <a href="https://fr.javascript.info/url"
- url"
  url"

<!-- -->

- /"
- <a href=url"
- <a href="https://tr.javascript.info/url"
- <a href="https://zh.javascript.info/url"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Furl" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Furl" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

14th December 2020

# URL objects

The built-in [URL](https://url.spec.whatwg.org/#api) class provides a convenient interface for creating and parsing URLs.

There are no networking methods that require exactly a `URL` object, strings are good enough. So technically we don’t have to use `URL`. But sometimes it can be really helpful.

## <a href="url.html#creating-a-url" id="creating-a-url" class="main__anchor">Creating a URL</a>

The syntax to create a new `URL` object:

    new URL(url, [base])

- **`url`** – the full URL or only path (if base is set, see below),
- **`base`** – an optional base URL: if set and `url` argument has only path, then the URL is generated relative to `base`.

For example:

    let url = new URL('https://javascript.info/profile/admin');

These two URLs are same:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let url1 = new URL('https://javascript.info/profile/admin');
    let url2 = new URL('/profile/admin', 'https://javascript.info');

    alert(url1); // https://javascript.info/profile/admin
    alert(url2); // https://javascript.info/profile/admin

We can easily create a new URL based on the path relative to an existing URL:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let url = new URL('https://javascript.info/profile/admin');
    let newUrl = new URL('tester', url);

    alert(newUrl); // https://javascript.info/profile/tester

The `URL` object immediately allows us to access its components, so it’s a nice way to parse the url, e.g.:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let url = new URL('https://javascript.info/url');

    alert(url.protocol); // https:
    alert(url.host);     // javascript.info
    alert(url.pathname); // /url

Here’s the cheatsheet for URL components:

<figure><img src="article/url/url-object.svg" width="698" height="246" /></figure>-   `href` is the full url, same as `url.toString()`
-   `protocol` ends with the colon character `:`
-   `search` – a string of parameters, starts with the question mark `?`
-   `hash` starts with the hash character `#`
-   there may be also `user` and `password` properties if HTTP authentication is present: `http://login:password@site.com` (not painted above, rarely used).

<span class="important__type">We can pass `URL` objects to networking (and most other) methods instead of a string</span>

We can use a `URL` object in `fetch` or `XMLHttpRequest`, almost everywhere where a URL-string is expected.

Generally, the `URL` object can be passed to any method instead of a string, as most methods will perform the string conversion, that turns a `URL` object into a string with full URL.

## <a href="url.html#searchparams" id="searchparams" class="main__anchor">SearchParams “?…”</a>

Let’s say we want to create a url with given search params, for instance, `https://google.com/search?query=JavaScript`.

We can provide them in the URL string:

    new URL('https://google.com/search?query=JavaScript')

…But parameters need to be encoded if they contain spaces, non-latin letters, etc (more about that below).

So there’s a URL property for that: `url.searchParams`, an object of type [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

It provides convenient methods for search parameters:

- **`append(name, value)`** – add the parameter by `name`,
- **`delete(name)`** – remove the parameter by `name`,
- **`get(name)`** – get the parameter by `name`,
- **`getAll(name)`** – get all parameters with the same `name` (that’s possible, e.g. `?user=John&user=Pete`),
- **`has(name)`** – check for the existence of the parameter by `name`,
- **`set(name, value)`** – set/replace the parameter,
- **`sort()`** – sort parameters by name, rarely needed,
- …and it’s also iterable, similar to `Map`.

An example with parameters that contain spaces and punctuation marks:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let url = new URL('https://google.com/search');

    url.searchParams.set('q', 'test me!'); // added parameter with a space and !

    alert(url); // https://google.com/search?q=test+me%21

    url.searchParams.set('tbs', 'qdr:y'); // added parameter with a colon :

    // parameters are automatically encoded
    alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

    // iterate over search parameters (decoded)
    for(let [name, value] of url.searchParams) {
      alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
    }

## <a href="url.html#encoding" id="encoding" class="main__anchor">Encoding</a>

There’s a standard [RFC3986](https://tools.ietf.org/html/rfc3986) that defines which characters are allowed in URLs and which are not.

Those that are not allowed, must be encoded, for instance non-latin letters and spaces – replaced with their UTF-8 codes, prefixed by `%`, such as `%20` (a space can be encoded by `+`, for historical reasons, but that’s an exception).

The good news is that `URL` objects handle all that automatically. We just supply all parameters unencoded, and then convert the `URL` to string:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // using some cyrillic characters for this example

    let url = new URL('https://ru.wikipedia.org/wiki/Тест');

    url.searchParams.set('key', 'ъ');
    alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A

As you can see, both `Тест` in the url path and `ъ` in the parameter are encoded.

The URL became longer, because each cyrillic letter is represented with two bytes in UTF-8, so there are two `%..` entities.

### <a href="url.html#encoding-strings" id="encoding-strings" class="main__anchor">Encoding strings</a>

In old times, before `URL` objects appeared, people used strings for URLs.

As of now, `URL` objects are often more convenient, but strings can still be used as well. In many cases using a string makes the code shorter.

If we use a string though, we need to encode/decode special characters manually.

There are built-in functions for that:

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) – encodes URL as a whole.
- [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) – decodes it back.
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) – encodes a URL component, such as a search parameter, or a hash, or a pathname.
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) – decodes it back.

A natural question is: “What’s the difference between `encodeURIComponent` and `encodeURI`? When we should use either?”

That’s easy to understand if we look at the URL, that’s split into components in the picture above:

    https://site.com:8080/path/page?p1=v1&p2=v2#hash

As we can see, characters such as `:`, `?`, `=`, `&`, `#` are allowed in URL.

…On the other hand, if we look at a single URL component, such as a search parameter, these characters must be encoded, not to break the formatting.

- `encodeURI` encodes only characters that are totally forbidden in URL.
- `encodeURIComponent` encodes same characters, and, in addition to them, characters `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` and `@`.

So, for a whole URL we can use `encodeURI`:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // using cyrillic characters in url path
    let url = encodeURI('http://site.com/привет');

    alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82

…While for URL parameters we should use `encodeURIComponent` instead:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let music = encodeURIComponent('Rock&Roll');

    let url = `https://google.com/search?q=${music}`;
    alert(url); // https://google.com/search?q=Rock%26Roll

Compare it with `encodeURI`:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let music = encodeURI('Rock&Roll');

    let url = `https://google.com/search?q=${music}`;
    alert(url); // https://google.com/search?q=Rock&Roll

As we can see, `encodeURI` does not encode `&`, as this is a legit character in URL as a whole.

But we should encode `&` inside a search parameter, otherwise, we get `q=Rock&Roll` – that is actually `q=Rock` plus some obscure parameter `Roll`. Not as intended.

So we should use only `encodeURIComponent` for each search parameter, to correctly insert it in the URL string. The safest is to encode both name and value, unless we’re absolutely sure that it has only allowed characters.

<span class="important__type">Encoding difference compared to `URL`</span>

Classes [URL](https://url.spec.whatwg.org/#url-class) and [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) are based on the latest URI specification: [RFC3986](https://tools.ietf.org/html/rfc3986), while `encode*` functions are based on the obsolete version [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

There are a few differences, e.g. IPv6 addresses are encoded differently:

<a href="url.html#"
<a href="url.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // valid url with IPv6 address
    let url = 'http://[2607:f8b0:4005:802::1007]/';

    alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
    alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/

As we can see, `encodeURI` replaced square brackets `[...]`, that’s not correct, the reason is: IPv6 urls did not exist at the time of RFC2396 (August 1998).

Such cases are rare, `encode*` functions work well most of the time.

<a href="fetch-api.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="xmlhttprequest.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Furl" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Furl" </a>

<a href="tutorial/map.html" class="map">

## <a href="url.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="url.html#creating-a-url" class="sidebar__link">Creating a URL</a>
- <a href="url.html#searchparams" class="sidebar__link">SearchParams “?…”</a>
- <a href="url.html#encoding" class="sidebar__link">Encoding</a>

- <a href="url.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Furl" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Furl" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/07-url" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
