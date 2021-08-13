EN

langs\_\_title">عربي</span></a>

- <a href="clickjacking.html"
- <a href="https://es.javascript.info/clickjacking"

- clickjacking"
  clickjacking"

<!-- -->

- /"
- <a href=clickjacking"
- <a href="https://tr.javascript.info/clickjacking"
- <a href="https://zh.javascript.info/clickjacking"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclickjacking" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="frames-and-windows.html" Frames and windows</span></a></span>

29th June 2019

# The clickjacking attack

The “clickjacking” attack allows an evil page to click on a “victim site” _on behalf of the visitor_.

Many sites were hacked this way, including Twitter, Facebook, Paypal and other sites. They have all been fixed, of course.

## <a href="clickjacking.html#the-idea" id="the-idea" class="main__anchor">The idea</a>

The idea is very simple.

Here’s how clickjacking was done with Facebook:

1.  A visitor is lured to the evil page. It doesn’t matter how.
2.  The page has a harmless-looking link on it (like “get rich now” or “click here, very funny”).
3.  Over that link the evil page positions a transparent `<iframe>` with `src` from facebook.com, in such a way that the “Like” button is right above that link. Usually that’s done with `z-index`.
4.  In attempting to click the link, the visitor in fact clicks the button.

## <a href="clickjacking.html#the-demo" id="the-demo" class="main__anchor">The demo</a>

Here’s how the evil page looks. To make things clear, the `<iframe>` is half-transparent (in real evil pages it’s fully transparent):

<a href="clickjacking.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="clickjacking.html#"

    <style>
    iframe { /* iframe from the victim site */
      width: 400px;
      height: 100px;
      position: absolute;
      top:0; left:-20px;
      opacity: 0.5; /* in real opacity:0 */
      z-index: 1;
    }
    </style>

    <div>Click to get rich now:</div>

    <!-- The url from the victim site -->
    <iframe src="/clickjacking/facebook.html"></iframe>

    <button>Click here!</button>

    <div>...And you're cool (I'm a cool hacker actually)!</div>

The full demo of the attack:

Result

facebook.html

index.html

<a href="article/clickjacking/clickjacking-visible/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/xQ6XQZLiF5crCD8f?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!DOCTYPE HTML>
    <html>

    <body style="margin:10px;padding:10px">

      <input type="button" onclick="alert('Like pressed on facebook.html!')" value="I LIKE IT !">

    </body>

    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <style>
        iframe {
          width: 400px;
          height: 100px;
          position: absolute;
          top: 5px;
          left: -14px;
          opacity: 0.5;
          z-index: 1;
        }
      </style>

      <div>Click to get rich now:</div>

      <!-- The url from the victim site -->
      <iframe src="facebook.html"></iframe>

      <button>Click here!</button>

      <div>...And you're cool (I'm a cool hacker actually)!</div>

    </body>
    </html>

Here we have a half-transparent `<iframe src="facebook.html">`, and in the example we can see it hovering over the button. A click on the button actually clicks on the iframe, but that’s not visible to the user, because the iframe is transparent.

As a result, if the visitor is authorized on Facebook (“remember me” is usually turned on), then it adds a “Like”. On Twitter that would be a “Follow” button.

Here’s the same example, but closer to reality, with `opacity:0` for `<iframe>`:

Result

facebook.html

index.html

<a href="article/clickjacking/clickjacking/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/l4BFtW1VNSKY2QMm?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!DOCTYPE HTML>
    <html>

    <body style="margin:10px;padding:10px">

      <input type="button" onclick="alert('Like pressed on facebook.html!')" value="I LIKE IT !">

    </body>

    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <style>
        iframe {
          width: 400px;
          height: 100px;
          position: absolute;
          top: 5px;
          left: -14px;
          opacity: 0;
          z-index: 1;
        }
      </style>

      <div>Click to get rich now:</div>

      <!-- The url from the victim site -->
      <iframe src="facebook.html"></iframe>

      <button>Click here!</button>

      <div>...And you're cool (I'm a cool hacker actually)!</div>

    </body>
    </html>

All we need to attack – is to position the `<iframe>` on the evil page in such a way that the button is right over the link. So that when a user clicks the link, they actually click the button. That’s usually doable with CSS.

<span class="important__type">Clickjacking is for clicks, not for keyboard</span>

The attack only affects mouse actions (or similar, like taps on mobile).

Keyboard input is much difficult to redirect. Technically, if we have a text field to hack, then we can position an iframe in such a way that text fields overlap each other. So when a visitor tries to focus on the input they see on the page, they actually focus on the input inside the iframe.

But then there’s a problem. Everything that the visitor types will be hidden, because the iframe is not visible.

People will usually stop typing when they can’t see their new characters printing on the screen.

## <a href="clickjacking.html#old-school-defences-weak" id="old-school-defences-weak" class="main__anchor">Old-school defences (weak)</a>

The oldest defence is a bit of JavaScript which forbids opening the page in a frame (so-called “framebusting”).

That looks like this:

    if (top != window) {
      top.location = window.location;
    }

That is: if the window finds out that it’s not on top, then it automatically makes itself the top.

This not a reliable defence, because there are many ways to hack around it. Let’s cover a few.

### <a href="clickjacking.html#blocking-top-navigation" id="blocking-top-navigation" class="main__anchor">Blocking top-navigation</a>

We can block the transition caused by changing `top.location` in [beforeunload](onload-ondomcontentloaded.html#window.onbeforeunload) event handler.

The top page (enclosing one, belonging to the hacker) sets a preventing handler to it, like this:

    window.onbeforeunload = function() {
      return false;
    };

When the `iframe` tries to change `top.location`, the visitor gets a message asking them whether they want to leave.

In most cases the visitor would answer negatively because they don’t know about the iframe – all they can see is the top page, there’s no reason to leave. So `top.location` won’t change!

In action:

Result

iframe.html

index.html

<a href="article/clickjacking/top-location/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/UMxYFoefqlhTMUbA?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <div>Changes top.location to javascript.info</div>

      <script>
        top.location = 'https://javascript.info';
      </script>

    </body>

    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">

      <style>
        iframe {
          width: 400px;
          height: 100px;
          position: absolute;
          top: 0;
          left: -20px;
          opacity: 0;
          z-index: 1;
        }
      </style>

      <script>
        function attack() {

          window.onbeforeunload = function() {
            window.onbeforeunload = null;
            return "Want to leave without learning all the secrets (he-he)?";
          };

          document.body.insertAdjacentHTML('beforeend', '<iframe src="iframe.html">');
        }
      </script>
    </head>

    <body>

      <p>After a click on the button the visitor gets a "strange" question about whether they want to leave.</p>

      <p>Probably they would respond "No", and the iframe protection is hacked.</p>

      <button onclick="attack()">Add a "protected" iframe</button>

    </body>
    </html>

### <a href="clickjacking.html#sandbox-attribute" id="sandbox-attribute" class="main__anchor">Sandbox attribute</a>

One of the things restricted by the `sandbox` attribute is navigation. A sandboxed iframe may not change `top.location`.

So we can add the iframe with `sandbox="allow-scripts allow-forms"`. That would relax the restrictions, permitting scripts and forms. But we omit `allow-top-navigation` so that changing `top.location` is forbidden.

Here’s the code:

    <iframe sandbox="allow-scripts allow-forms" src="facebook.html"></iframe>

There are other ways to work around that simple protection too.

## <a href="clickjacking.html#x-frame-options" id="x-frame-options" class="main__anchor">X-Frame-Options</a>

The server-side header `X-Frame-Options` can permit or forbid displaying the page inside a frame.

It must be sent exactly as HTTP-header: the browser will ignore it if found in HTML `<meta>` tag. So, `<meta http-equiv="X-Frame-Options"...>` won’t do anything.

The header may have 3 values:

`DENY`  
Never ever show the page inside a frame.

`SAMEORIGIN`  
Allow inside a frame if the parent document comes from the same origin.

`ALLOW-FROM domain`  
Allow inside a frame if the parent document is from the given domain.

For instance, Twitter uses `X-Frame-Options: SAMEORIGIN`.

Here’s the result:

    <iframe src="https://twitter.com"></iframe>

Depending on your browser, the `iframe` above is either empty or alerting you that the browser won’t permit that page to be navigating in this way.

## <a href="clickjacking.html#showing-with-disabled-functionality" id="showing-with-disabled-functionality" class="main__anchor">Showing with disabled functionality</a>

The `X-Frame-Options` header has a side-effect. Other sites won’t be able to show our page in a frame, even if they have good reasons to do so.

So there are other solutions… For instance, we can “cover” the page with a `<div>` with styles `height: 100%; width: 100%;`, so that it will intercept all clicks. That `<div>` is to be removed if `window == top` or if we figure out that we don’t need the protection.

Something like this:

    <style>
      #protector {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99999999;
      }
    </style>

    <div id="protector">
      <a href="/" target="_blank">Go to the site</a>
    </div>

    <script>
      // there will be an error if top window is from the different origin
      // but that's ok here
      if (top.document.domain == document.domain) {
        protector.remove();
      }
    </script>

The demo:

Result

iframe.html

index.html

<a href="article/clickjacking/protector/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/COt3mNoUc7sWmzRM?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">

      <style>
        #protector {
          height: 100%;
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 99999999;
        }
      </style>

    </head>

    <body>

    <div id="protector">
      <a href="/" target="_blank">Go to the site</a>
    </div>

    <script>

      if (top.document.domain == document.domain) {
        protector.remove();
      }

    </script>

      This text is always visible.

      But if the page was open inside a document from another domain, the div over it would prevent any actions.

      <button onclick="alert(1)">Click wouldn't work in that case</button>

    </body>
    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>
    <body>

      <iframe src="iframe.html"></iframe>

    </body>
    </html>

## <a href="clickjacking.html#samesite-cookie-attribute" id="samesite-cookie-attribute" class="main__anchor">Samesite cookie attribute</a>

The `samesite` cookie attribute can also prevent clickjacking attacks.

A cookie with such attribute is only sent to a website if it’s opened directly, not via a frame, or otherwise. More information in the chapter [Cookies, document.cookie](cookie.html#samesite).

If the site, such as Facebook, had `samesite` attribute on its authentication cookie, like this:

    Set-Cookie: authorization=secret; samesite

…Then such cookie wouldn’t be sent when Facebook is open in iframe from another site. So the attack would fail.

The `samesite` cookie attribute will not have an effect when cookies are not used. This may allow other websites to easily show our public, unauthenticated pages in iframes.

However, this may also allow clickjacking attacks to work in a few limited cases. An anonymous polling website that prevents duplicate voting by checking IP addresses, for example, would still be vulnerable to clickjacking because it does not authenticate users using cookies.

## <a href="clickjacking.html#summary" id="summary" class="main__anchor">Summary</a>

Clickjacking is a way to “trick” users into clicking on a victim site without even knowing what’s happening. That’s dangerous if there are important click-activated actions.

A hacker can post a link to their evil page in a message, or lure visitors to their page by some other means. There are many variations.

From one perspective – the attack is “not deep”: all a hacker is doing is intercepting a single click. But from another perspective, if the hacker knows that after the click another control will appear, then they may use cunning messages to coerce the user into clicking on them as well.

The attack is quite dangerous, because when we engineer the UI we usually don’t anticipate that a hacker may click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

- It is recommended to use `X-Frame-Options: SAMEORIGIN` on pages (or whole websites) which are not intended to be viewed inside frames.
- Use a covering `<div>` if we want to allow our pages to be shown in iframes, but still stay safe.

<a href="cross-window-communication.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="binary.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclickjacking" </a>

<a href="tutorial/map.html" class="map">

## <a href="clickjacking.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="frames-and-windows.html" class="sidebar__link">Frames and windows</a>

#### Lesson navigation

- <a href="clickjacking.html#the-idea" class="sidebar__link">The idea</a>
- <a href="clickjacking.html#the-demo" class="sidebar__link">The demo</a>
- <a href="clickjacking.html#old-school-defences-weak" class="sidebar__link">Old-school defences (weak)</a>
- <a href="clickjacking.html#x-frame-options" class="sidebar__link">X-Frame-Options</a>
- <a href="clickjacking.html#showing-with-disabled-functionality" class="sidebar__link">Showing with disabled functionality</a>
- <a href="clickjacking.html#samesite-cookie-attribute" class="sidebar__link">Samesite cookie attribute</a>
- <a href="clickjacking.html#summary" class="sidebar__link">Summary</a>

- <a href="clickjacking.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/3-frames-and-windows/06-clickjacking" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
