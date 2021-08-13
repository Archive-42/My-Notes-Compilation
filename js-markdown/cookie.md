EN

langs\_\_title">عربي</span></a>

- <a href="cookie.html"
- <a href="https://es.javascript.info/cookie"

- cookie"
  cookie"

<!-- -->

- /cookie"
- <a href=cookie"
- <a href="https://tr.javascript.info/cookie"
- <a href="https://zh.javascript.info/cookie"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcookie" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcookie" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="data-storage.html" Storing data in the browser</span></a></span>

18th June 2021

# Cookies, document.cookie

Cookies are small strings of data that are stored directly in the browser. They are a part of the HTTP protocol, defined by the [RFC 6265](https://tools.ietf.org/html/rfc6265) specification.

Cookies are usually set by a web-server using the response `Set-Cookie` HTTP-header. Then, the browser automatically adds them to (almost) every request to the same domain using the `Cookie` HTTP-header.

One of the most widespread use cases is authentication:

1.  Upon sign in, the server uses the `Set-Cookie` HTTP-header in the response to set a cookie with a unique “session identifier”.
2.  Next time when the request is sent to the same domain, the browser sends the cookie over the net using the `Cookie` HTTP-header.
3.  So the server knows who made the request.

We can also access cookies from the browser, using `document.cookie` property.

There are many tricky things about cookies and their options. In this chapter we’ll cover them in detail.

## <a href="cookie.html#reading-from-document-cookie" id="reading-from-document-cookie" class="main__anchor">Reading from document.cookie</a>

Does your browser store any cookies from this site? Let’s see:

<a href="cookie.html#"
<a href="cookie.html#"

    // At javascript.info, we use Google Analytics for statistics,
    // so there should be some cookies
    alert( document.cookie ); // cookie1=value1; cookie2=value2;...

The value of `document.cookie` consists of `name=value` pairs, delimited by `;`. Each one is a separate cookie.

To find a particular cookie, we can split `document.cookie` by `;`, and then find the right name. We can use either a regular expression or array functions to do that.

We leave it as an exercise for the reader. Also, at the end of the chapter you’ll find helper functions to manipulate cookies.

## <a href="cookie.html#writing-to-document-cookie" id="writing-to-document-cookie" class="main__anchor">Writing to document.cookie</a>

We can write to `document.cookie`. But it’s not a data property, it’s an [accessor (getter/setter)](property-accessors.html). An assignment to it is treated specially.

**A write operation to `document.cookie` updates only cookies mentioned in it, but doesn’t touch other cookies.**

For instance, this call sets a cookie with the name `user` and value `John`:

<a href="cookie.html#"
<a href="cookie.html#"

    document.cookie = "user=John"; // update only cookie named 'user'
    alert(document.cookie); // show all cookies

If you run it, then probably you’ll see multiple cookies. That’s because the `document.cookie=` operation does not overwrite all cookies. It only sets the mentioned cookie `user`.

Technically, name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in `encodeURIComponent` function:

<a href="cookie.html#"
<a href="cookie.html#"

    // special characters (spaces), need encoding
    let name = "my name";
    let value = "John Smith"

    // encodes the cookie as my%20name=John%20Smith
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    alert(document.cookie); // ...; my%20name=John%20Smith

<span class="important__type">Limitations</span>

There are few limitations:

- The `name=value` pair, after `encodeURIComponent`, should not exceed 4KB. So we can’t store anything huge in a cookie.
- The total number of cookies per domain is limited to around 20+, the exact limit depends on the browser.

Cookies have several options, many of them are important and should be set.

The options are listed after `key=value`, delimited by `;`, like this:

<a href="cookie.html#"
<a href="cookie.html#"

    document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"

## <a href="cookie.html#path" id="path" class="main__anchor">path</a>

- **`path=/mypath`**

The url path prefix must be absolute. It makes the cookie accessible for pages under that path. By default, it’s the current path.

If a cookie is set with `path=/admin`, it’s visible at pages `/admin` and `/admin/something`, but not at `/home` or `/adminpage`.

Usually, we should set `path` to the root: `path=/` to make the cookie accessible from all website pages.

## <a href="cookie.html#domain" id="domain" class="main__anchor">domain</a>

- **`domain=site.com`**

A domain defines where the cookie is accessible. In practice though, there are limitations. We can’t set any domain.

By default, a cookie is accessible only at the domain that set it. So, if the cookie was set by `site.com`, we won’t get it at `other.com`.

…But what’s more tricky, we also won’t get the cookie at a subdomain `forum.site.com`!

    // at site.com
    document.cookie = "user=John"

    // at forum.site.com
    alert(document.cookie); // no user

**There’s no way to let a cookie be accessible from another 2nd-level domain, so `other.com` will never receive a cookie set at `site.com`.**

It’s a safety restriction, to allow us to store sensitive data in cookies, that should be available only on one site.

…But if we’d like to allow subdomains like `forum.site.com` to get a cookie, that’s possible. When setting a cookie at `site.com`, we should explicitly set the `domain` option to the root domain: `domain=site.com`:

    // at site.com
    // make the cookie accessible on any subdomain *.site.com:
    document.cookie = "user=John; domain=site.com"

    // later

    // at forum.site.com
    alert(document.cookie); // has cookie user=John

For historical reasons, `domain=.site.com` (a dot before `site.com`) also works the same way, allowing access to the cookie from subdomains. That’s an old notation and should be used if we need to support very old browsers.

So, the `domain` option allows to make a cookie accessible at subdomains.

## <a href="cookie.html#expires-max-age" id="expires-max-age" class="main__anchor">expires, max-age</a>

By default, if a cookie doesn’t have one of these options, it disappears when the browser is closed. Such cookies are called “session cookies”

To let cookies survive a browser close, we can set either the `expires` or `max-age` option.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

The cookie expiration date defines the time, when the browser will automatically delete it.

The date must be exactly in this format, in the GMT timezone. We can use `date.toUTCString` to get it. For instance, we can set the cookie to expire in 1 day:

    // +1 day from now
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = "user=John; expires=" + date;

If we set `expires` to a date in the past, the cookie is deleted.

- **`max-age=3600`**

Is an alternative to `expires` and specifies the cookie’s expiration in seconds from the current moment.

If set to zero or a negative value, the cookie is deleted:

    // cookie will die in +1 hour from now
    document.cookie = "user=John; max-age=3600";

    // delete cookie (let it expire right now)
    document.cookie = "user=John; max-age=0";

## <a href="cookie.html#secure" id="secure" class="main__anchor">secure</a>

- **`secure`**

The cookie should be transferred only over HTTPS.

**By default, if we set a cookie at `http://site.com`, then it also appears at `https://site.com` and vice versa.**

That is, cookies are domain-based, they do not distinguish between the protocols.

With this option, if a cookie is set by `https://site.com`, then it doesn’t appear when the same site is accessed by HTTP, as `http://site.com`. So if a cookie has sensitive content that should never be sent over unencrypted HTTP, the `secure` flag is the right thing.

    // assuming we're on https:// now
    // set the cookie to be secure (only accessible over HTTPS)
    document.cookie = "user=John; secure";

## <a href="cookie.html#samesite" id="samesite" class="main__anchor">samesite</a>

That’s another security attribute `samesite`. It’s designed to protect from so-called XSRF (cross-site request forgery) attacks.

To understand how it works and when it’s useful, let’s take a look at XSRF attacks.

### <a href="cookie.html#xsrf-attack" id="xsrf-attack" class="main__anchor">XSRF attack</a>

Imagine, you are logged into the site `bank.com`. That is: you have an authentication cookie from that site. Your browser sends it to `bank.com` with every request, so that it recognizes you and performs all sensitive financial operations.

Now, while browsing the web in another window, you accidentally come to another site `evil.com`. That site has JavaScript code that submits a form `<form action="https://bank.com/pay">` to `bank.com` with fields that initiate a transaction to the hacker’s account.

The browser sends cookies every time you visit the site `bank.com`, even if the form was submitted from `evil.com`. So the bank recognizes you and actually performs the payment.

<figure><img src="article/cookie/cookie-xsrf.svg" width="668" height="166" /></figure>That’s a so-called “Cross-Site Request Forgery” (in short, XSRF) attack.

Real banks are protected from it of course. All forms generated by `bank.com` have a special field, a so-called “XSRF protection token”, that an evil page can’t generate or extract from a remote page. It can submit a form there, but can’t get the data back. The site `bank.com` checks for such token in every form it receives.

Such a protection takes time to implement though. We need to ensure that every form has the required token field, and we must also check all requests.

### <a href="cookie.html#enter-cookie-samesite-option" id="enter-cookie-samesite-option" class="main__anchor">Enter cookie samesite option</a>

The cookie `samesite` option provides another way to protect from such attacks, that (in theory) should not require “xsrf protection tokens”.

It has two possible values:

- **`samesite=strict` (same as `samesite` without value)**

A cookie with `samesite=strict` is never sent if the user comes from outside the same site.

In other words, whether a user follows a link from their mail or submits a form from `evil.com`, or does any operation that originates from another domain, the cookie is not sent.

If authentication cookies have the `samesite` option, then a XSRF attack has no chances to succeed, because a submission from `evil.com` comes without cookies. So `bank.com` will not recognize the user and will not proceed with the payment.

The protection is quite reliable. Only operations that come from `bank.com` will send the `samesite` cookie, e.g. a form submission from another page at `bank.com`.

Although, there’s a small inconvenience.

When a user follows a legitimate link to `bank.com`, like from their own notes, they’ll be surprised that `bank.com` does not recognize them. Indeed, `samesite=strict` cookies are not sent in that case.

We could work around that by using two cookies: one for “general recognition”, only for the purposes of saying: “Hello, John”, and the other one for data-changing operations with `samesite=strict`. Then, a person coming from outside of the site will see a welcome, but payments must be initiated from the bank’s website, for the second cookie to be sent.

- **`samesite=lax`**

A more relaxed approach that also protects from XSRF and doesn’t break the user experience.

Lax mode, just like `strict`, forbids the browser to send cookies when coming from outside the site, but adds an exception.

A `samesite=lax` cookie is sent if both of these conditions are true:

1.  The HTTP method is “safe” (e.g. GET, but not POST).

    The full list of safe HTTP methods is in the [RFC7231 specification](https://tools.ietf.org/html/rfc7231). Basically, these are the methods that should be used for reading, but not writing the data. They must not perform any data-changing operations. Following a link is always GET, the safe method.

2.  The operation performs a top-level navigation (changes URL in the browser address bar).

    That’s usually true, but if the navigation is performed in an `<iframe>`, then it’s not top-level. Also, JavaScript methods for network requests do not perform any navigation, hence they don’t fit.

So, what `samesite=lax` does, is to basically allow the most common “go to URL” operation to have cookies. E.g. opening a website link from notes that satisfy these conditions.

But anything more complicated, like a network request from another site or a form submission, loses cookies.

If that’s fine for you, then adding `samesite=lax` will probably not break the user experience and add protection.

Overall, `samesite` is a great option.

There’s a drawback:

- `samesite` is ignored (not supported) by very old browsers, year 2017 or so.

**So if we solely rely on `samesite` to provide protection, then old browsers will be vulnerable.**

But we surely can use `samesite` together with other protection measures, like xsrf tokens, to add an additional layer of defence and then, in the future, when old browsers die out, we’ll probably be able to drop xsrf tokens.

## <a href="cookie.html#httponly" id="httponly" class="main__anchor">httpOnly</a>

This option has nothing to do with JavaScript, but we have to mention it for completeness.

The web-server uses the `Set-Cookie` header to set a cookie. Also, it may set the `httpOnly` option.

This option forbids any JavaScript access to the cookie. We can’t see such a cookie or manipulate it using `document.cookie`.

That’s used as a precaution measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn’t be possible at all, hackers should not be able to inject their code into our site, but there may be bugs that let them do it.

Normally, if such a thing happens, and a user visits a web-page with hacker’s JavaScript code, then that code executes and gains access to `document.cookie` with user cookies containing authentication information. That’s bad.

But if a cookie is `httpOnly`, then `document.cookie` doesn’t see it, so it is protected.

## <a href="cookie.html#appendix-cookie-functions" id="appendix-cookie-functions" class="main__anchor">Appendix: Cookie functions</a>

Here’s a small set of functions to work with cookies, more convenient than a manual modification of `document.cookie`.

There exist many cookie libraries for that, so these are for demo purposes. Fully working though.

### <a href="cookie.html#getcookie-name" id="getcookie-name" class="main__anchor">getCookie(name)</a>

The shortest way to access a cookie is to use a [regular expression](regular-expressions.html).

The function `getCookie(name)` returns the cookie with the given `name`:

    // returns the cookie with the given name,
    // or undefined if not found
    function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

Here `new RegExp` is generated dynamically, to match `; name=<value>`.

Please note that a cookie value is encoded, so `getCookie` uses a built-in `decodeURIComponent` function to decode it.

### <a href="cookie.html#setcookie-name-value-options" id="setcookie-name-value-options" class="main__anchor">setCookie(name, value, options)</a>

Sets the cookie’s `name` to the given `value` with `path=/` by default (can be modified to add other defaults):

<a href="cookie.html#"
<a href="cookie.html#"

    function setCookie(name, value, options = {}) {

      options = {
        path: '/',
        // add other defaults here if necessary
        ...options
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }

    // Example of use:
    setCookie('user', 'John', {secure: true, 'max-age': 3600});

### <a href="cookie.html#deletecookie-name" id="deletecookie-name" class="main__anchor">deleteCookie(name)</a>

To delete a cookie, we can call it with a negative expiration date:

    function deleteCookie(name) {
      setCookie(name, "", {
        'max-age': -1
      })
    }

<span class="important__type">Updating or deleting must use same path and domain</span>

Please note: when we update or delete a cookie, we should use exactly the same path and domain options as when we set it.

Together: [cookie.js](article/cookie/cookie.js).

## <a href="cookie.html#appendix-third-party-cookies" id="appendix-third-party-cookies" class="main__anchor">Appendix: Third-party cookies</a>

A cookie is called “third-party” if it’s placed by a domain other than the page the user is visiting.

For instance:

1.  A page at `site.com` loads a banner from another site: `<img src="https://ads.com/banner.png">`.

2.  Along with the banner, the remote server at `ads.com` may set the `Set-Cookie` header with a cookie like `id=1234`. Such a cookie originates from the `ads.com` domain, and will only be visible at `ads.com`:

    <figure><img src="article/cookie/cookie-third-party.svg" width="668" height="192" /></figure>3.  Next time when `ads.com` is accessed, the remote server gets the `id` cookie and recognizes the user:

    <figure><img src="article/cookie/cookie-third-party-2.svg" width="668" height="192" /></figure>4.  What’s even more important is, when the user moves from `site.com` to another site `other.com`, which also has a banner, then `ads.com` gets the cookie, as it belongs to `ads.com`, thus recognizing the visitor and tracking him as he moves between sites:

    <figure><img src="article/cookie/cookie-third-party-3.svg" width="668" height="192" /></figure>

Third-party cookies are traditionally used for tracking and ads services, due to their nature. They are bound to the originating domain, so `ads.com` can track the same user between different sites, if they all access it.

Naturally, some people don’t like being tracked, so browsers allow to disable such cookies.

Also, some modern browsers employ special policies for such cookies:

- Safari does not allow third-party cookies at all.
- Firefox comes with a “black list” of third-party domains where it blocks third-party cookies.

<span class="important__type">Please note:</span>

If we load a script from a third-party domain, like `<script src="https://google-analytics.com/analytics.js">`, and that script uses `document.cookie` to set a cookie, then such cookie is not third-party.

If a script sets a cookie, then no matter where the script came from – the cookie belongs to the domain of the current webpage.

## <a href="cookie.html#appendix-gdpr" id="appendix-gdpr" class="main__anchor">Appendix: GDPR</a>

This topic is not related to JavaScript at all, just something to keep in mind when setting cookies.

There’s a legislation in Europe called GDPR, that enforces a set of rules for websites to respect the users’ privacy. One of these rules is to require an explicit permission for tracking cookies from the user.

Please note, that’s only about tracking/identifying/authorizing cookies.

So, if we set a cookie that just saves some information, but neither tracks nor identifies the user, then we are free to do it.

But if we are going to set a cookie with an authentication session or a tracking id, then a user must allow that.

Websites generally have two variants of following GDPR. You must have seen them both already in the web:

1.  If a website wants to set tracking cookies only for authenticated users.

    To do so, the registration form should have a checkbox like “accept the privacy policy” (that describes how cookies are used), the user must check it, and then the website is free to set auth cookies.

2.  If a website wants to set tracking cookies for everyone.

    To do so legally, a website shows a modal “splash screen” for newcomers, and requires them to agree to the cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see such “must-click” modal splash screens instead of the content. But GDPR requires an explicit agreement.

GDPR is not only about cookies, it’s about other privacy-related issues too, but that’s too much beyond our scope.

## <a href="cookie.html#summary" id="summary" class="main__anchor">Summary</a>

`document.cookie` provides access to cookies

- write operations modify only cookies mentioned in it.
- name/value must be encoded.
- one cookie must not exceed 4KB, 20+ cookies per site (depends on the browser).

Cookie options:

- `path=/`, by default current path, makes the cookie visible only under that path.
- `domain=site.com`, by default a cookie is visible on the current domain only. If the domain is set explicitly, the cookie becomes visible on subdomains.
- `expires` or `max-age` sets the cookie expiration time. Without them the cookie dies when the browser is closed.
- `secure` makes the cookie HTTPS-only.
- `samesite` forbids the browser to send the cookie with requests coming from outside the site. This helps to prevent XSRF attacks.

Additionally:

- Third-party cookies may be forbidden by the browser, e.g. Safari does that by default.
- When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.

<a href="data-storage.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="localstorage.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcookie" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcookie" </a>

<a href="tutorial/map.html" class="map">

## <a href="cookie.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-storage.html" class="sidebar__link">Storing data in the browser</a>

#### Lesson navigation

- <a href="cookie.html#reading-from-document-cookie" class="sidebar__link">Reading from document.cookie</a>
- <a href="cookie.html#writing-to-document-cookie" class="sidebar__link">Writing to document.cookie</a>
- <a href="cookie.html#path" class="sidebar__link">path</a>
- <a href="cookie.html#domain" class="sidebar__link">domain</a>
- <a href="cookie.html#expires-max-age" class="sidebar__link">expires, max-age</a>
- <a href="cookie.html#secure" class="sidebar__link">secure</a>
- <a href="cookie.html#samesite" class="sidebar__link">samesite</a>
- <a href="cookie.html#httponly" class="sidebar__link">httpOnly</a>
- <a href="cookie.html#appendix-cookie-functions" class="sidebar__link">Appendix: Cookie functions</a>
- <a href="cookie.html#appendix-third-party-cookies" class="sidebar__link">Appendix: Third-party cookies</a>
- <a href="cookie.html#appendix-gdpr" class="sidebar__link">Appendix: GDPR</a>
- <a href="cookie.html#summary" class="sidebar__link">Summary</a>

- <a href="cookie.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fcookie" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcookie" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/6-data-storage/01-cookie" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
