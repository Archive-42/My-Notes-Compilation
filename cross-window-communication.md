EN

langs\_\_title">عربي</span></a>

- <a href="cross-window-communication.html"
- <a href="https://es.javascript.info/cross-window-communication"
- <a href="https://fr.javascript.info/cross-window-communication"
- cross-window-communication"
  cross-window-communication"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=cross-window-communication"
- <a href="https://tr.javascript.info/cross-window-communication"
- <a href="https://zh.javascript.info/cross-window-communication"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcross-window-communication" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcross-window-communication" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="frames-and-windows.html" Frames and windows</span></a></span>

12th September 2020

# Cross-window communication

The “Same Origin” (same site) policy limits access of windows and frames to each other.

The idea is that if a user has two pages open: one from `john-smith.com`, and another one is `gmail.com`, then they wouldn’t want a script from `john-smith.com` to read our mail from `gmail.com`. So, the purpose of the “Same Origin” policy is to protect users from information theft.

## <a href="cross-window-communication.html#same-origin" id="same-origin" class="main__anchor">Same Origin</a>

Two URLs are said to have the “same origin” if they have the same protocol, domain and port.

These URLs all share the same origin:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

These ones do not:

- `http://www.site.com` (another domain: `www.` matters)
- `http://site.org` (another domain: `.org` matters)
- `https://site.com` (another protocol: `https`)
- `http://site.com:8080` (another port: `8080`)

The “Same Origin” policy states that:

- if we have a reference to another window, e.g. a popup created by `window.open` or a window inside `<iframe>`, and that window comes from the same origin, then we have full access to that window.
- otherwise, if it comes from another origin, then we can’t access the content of that window: variables, document, anything. The only exception is `location`: we can change it (thus redirecting the user). But we cannot _read_ location (so we can’t see where the user is now, no information leak).

### <a href="cross-window-communication.html#in-action-iframe" id="in-action-iframe" class="main__anchor">In action: iframe</a>

An `<iframe>` tag hosts a separate embedded window, with its own separate `document` and `window` objects.

We can access them using properties:

- `iframe.contentWindow` to get the window inside the `<iframe>`.
- `iframe.contentDocument` to get the document inside the `<iframe>`, shorthand for `iframe.contentWindow.document`.

When we access something inside the embedded window, the browser checks if the iframe has the same origin. If that’s not so then the access is denied (writing to `location` is an exception, it’s still permitted).

For instance, let’s try reading and writing to `<iframe>` from another origin:

<a href="cross-window-communication.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="cross-window-communication.html#"

    <iframe src="https://example.com" id="iframe"></iframe>

    <script>
      iframe.onload = function() {
        // we can get the reference to the inner window
        let iframeWindow = iframe.contentWindow; // OK
        try {
          // ...but not to the document inside it
          let doc = iframe.contentDocument; // ERROR
        } catch(e) {
          alert(e); // Security Error (another origin)
        }

        // also we can't READ the URL of the page in iframe
        try {
          // Can't read URL from the Location object
          let href = iframe.contentWindow.location.href; // ERROR
        } catch(e) {
          alert(e); // Security Error
        }

        // ...we can WRITE into location (and thus load something else into the iframe)!
        iframe.contentWindow.location = '/'; // OK

        iframe.onload = null; // clear the handler, not to run it after the location change
      };
    </script>

The code above shows errors for any operations except:

- Getting the reference to the inner window `iframe.contentWindow` – that’s allowed.
- Writing to `location`.

Contrary to that, if the `<iframe>` has the same origin, we can do anything with it:

<a href="cross-window-communication.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="cross-window-communication.html#"

    <!-- iframe from the same site -->
    <iframe src="/" id="iframe"></iframe>

    <script>
      iframe.onload = function() {
        // just do anything
        iframe.contentDocument.body.prepend("Hello, world!");
      };
    </script>

<span class="important__type">`iframe.onload` vs `iframe.contentWindow.onload`</span>

The `iframe.onload` event (on the `<iframe>` tag) is essentially the same as `iframe.contentWindow.onload` (on the embedded window object). It triggers when the embedded window fully loads with all resources.

…But we can’t access `iframe.contentWindow.onload` for an iframe from another origin, so using `iframe.onload`.

## <a href="cross-window-communication.html#windows-on-subdomains-document-domain" id="windows-on-subdomains-document-domain" class="main__anchor">Windows on subdomains: document.domain</a>

By definition, two URLs with different domains have different origins.

But if windows share the same second-level domain, for instance `john.site.com`, `peter.site.com` and `site.com` (so that their common second-level domain is `site.com`), we can make the browser ignore that difference, so that they can be treated as coming from the “same origin” for the purposes of cross-window communication.

To make it work, each such window should run the code:

    document.domain = 'site.com';

That’s all. Now they can interact without limitations. Again, that’s only possible for pages with the same second-level domain.

## <a href="cross-window-communication.html#iframe-wrong-document-pitfall" id="iframe-wrong-document-pitfall" class="main__anchor">Iframe: wrong document pitfall</a>

When an iframe comes from the same origin, and we may access its `document`, there’s a pitfall. It’s not related to cross-origin things, but important to know.

Upon its creation an iframe immediately has a document. But that document is different from the one that loads into it!

So if we do something with the document immediately, that will probably be lost.

Here, look:

<a href="cross-window-communication.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="cross-window-communication.html#"

    <iframe src="/" id="iframe"></iframe>

    <script>
      let oldDoc = iframe.contentDocument;
      iframe.onload = function() {
        let newDoc = iframe.contentDocument;
        // the loaded document is not the same as initial!
        alert(oldDoc == newDoc); // false
      };
    </script>

We shouldn’t work with the document of a not-yet-loaded iframe, because that’s the _wrong document_. If we set any event handlers on it, they will be ignored.

How to detect the moment when the document is there?

The right document is definitely at place when `iframe.onload` triggers. But it only triggers when the whole iframe with all resources is loaded.

We can try to catch the moment earlier using checks in `setInterval`:

<a href="cross-window-communication.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="cross-window-communication.html#"

    <iframe src="/" id="iframe"></iframe>

    <script>
      let oldDoc = iframe.contentDocument;

      // every 100 ms check if the document is the new one
      let timer = setInterval(() => {
        let newDoc = iframe.contentDocument;
        if (newDoc == oldDoc) return;

        alert("New document is here!");

        clearInterval(timer); // cancel setInterval, don't need it any more
      }, 100);
    </script>

## <a href="cross-window-communication.html#collection-window-frames" id="collection-window-frames" class="main__anchor">Collection: window.frames</a>

An alternative way to get a window object for `<iframe>` – is to get it from the named collection `window.frames`:

- By number: `window.frames[0]` – the window object for the first frame in the document.
- By name: `window.frames.iframeName` – the window object for the frame with `name="iframeName"`.

For instance:

<a href="cross-window-communication.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="cross-window-communication.html#"

    <iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

    <script>
      alert(iframe.contentWindow == frames[0]); // true
      alert(iframe.contentWindow == frames.win); // true
    </script>

An iframe may have other iframes inside. The corresponding `window` objects form a hierarchy.

Navigation links are:

- `window.frames` – the collection of “children” windows (for nested frames).
- `window.parent` – the reference to the “parent” (outer) window.
- `window.top` – the reference to the topmost parent window.

For instance:

<a href="cross-window-communication.html#"
<a href="cross-window-communication.html#"

    window.frames[0].parent === window; // true

We can use the `top` property to check if the current document is open inside a frame or not:

<a href="cross-window-communication.html#"
<a href="cross-window-communication.html#"

    if (window == top) { // current window == window.top?
      alert('The script is in the topmost window, not in a frame');
    } else {
      alert('The script runs in a frame!');
    }

## <a href="cross-window-communication.html#the-sandbox-iframe-attribute" id="the-sandbox-iframe-attribute" class="main__anchor">The “sandbox” iframe attribute</a>

The `sandbox` attribute allows for the exclusion of certain actions inside an `<iframe>` in order to prevent it executing untrusted code. It “sandboxes” the iframe by treating it as coming from another origin and/or applying other limitations.

There’s a “default set” of restrictions applied for `<iframe sandbox src="...">`. But it can be relaxed if we provide a space-separated list of restrictions that should not be applied as a value of the attribute, like this: `<iframe sandbox="allow-forms allow-popups">`.

In other words, an empty `"sandbox"` attribute puts the strictest limitations possible, but we can put a space-delimited list of those that we want to lift.

Here’s a list of limitations:

`allow-same-origin`  
By default `"sandbox"` forces the “different origin” policy for the iframe. In other words, it makes the browser to treat the `iframe` as coming from another origin, even if its `src` points to the same site. With all implied restrictions for scripts. This option removes that feature.

`allow-top-navigation`  
Allows the `iframe` to change `parent.location`.

`allow-forms`  
Allows to submit forms from `iframe`.

`allow-scripts`  
Allows to run scripts from the `iframe`.

`allow-popups`  
Allows to `window.open` popups from the `iframe`

See [the manual](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) for more.

The example below demonstrates a sandboxed iframe with the default set of restrictions: `<iframe sandbox src="...">`. It has some JavaScript and a form.

Please note that nothing works. So the default set is really harsh:

Result

index.html

sandboxed.html

<a href="article/cross-window-communication/sandbox/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/KdOaJdnKKBVrHYuz?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <div>The iframe below has the <code>sandbox</code> attribute.</div>

      <iframe sandbox src="sandboxed.html" style="height:60px;width:90%"></iframe>

    </body>
    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <button onclick="alert(123)">Click to run a script (doesn't work)</button>

      <form action="http://google.com">
        <input type="text">
        <input type="submit" value="Submit (doesn't work)">
      </form>

    </body>
    </html>

<span class="important__type">Please note:</span>

The purpose of the `"sandbox"` attribute is only to _add more_ restrictions. It cannot remove them. In particular, it can’t relax same-origin restrictions if the iframe comes from another origin.

## <a href="cross-window-communication.html#cross-window-messaging" id="cross-window-messaging" class="main__anchor">Cross-window messaging</a>

The `postMessage` interface allows windows to talk to each other no matter which origin they are from.

So, it’s a way around the “Same Origin” policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding JavaScript functions. That makes it safe for users.

The interface has two parts.

### <a href="cross-window-communication.html#postmessage" id="postmessage" class="main__anchor">postMessage</a>

The window that wants to send a message calls [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage) method of the receiving window. In other words, if we want to send the message to `win`, we should call `win.postMessage(data, targetOrigin)`.

Arguments:

`data`  
The data to send. Can be any object, the data is cloned using the “structured serialization algorithm”. IE supports only strings, so we should `JSON.stringify` complex objects to support that browser.

`targetOrigin`  
Specifies the origin for the target window, so that only a window from the given origin will get the message.

The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can’t read it’s `location` in the sender window. So we can’t be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.

Specifying `targetOrigin` ensures that the window only receives the data if it’s still at the right site. Important when the data is sensitive.

For instance, here `win` will only receive the message if it has a document from the origin `http://example.com`:

    <iframe src="http://example.com" name="example">

    <script>
      let win = window.frames.example;

      win.postMessage("message", "http://example.com");
    </script>

If we don’t want that check, we can set `targetOrigin` to `*`.

    <iframe src="http://example.com" name="example">

    <script>
      let win = window.frames.example;

      win.postMessage("message", "*");
    </script>

### <a href="cross-window-communication.html#onmessage" id="onmessage" class="main__anchor">onmessage</a>

To receive a message, the target window should have a handler on the `message` event. It triggers when `postMessage` is called (and `targetOrigin` check is successful).

The event object has special properties:

`data`  
The data from `postMessage`.

`origin`  
The origin of the sender, for instance `http://javascript.info`.

`source`  
The reference to the sender window. We can immediately `source.postMessage(...)` back if we want.

To assign that handler, we should use `addEventListener`, a short syntax `window.onmessage` does not work.

Here’s an example:

    window.addEventListener("message", function(event) {
      if (event.origin != 'http://javascript.info') {
        // something from an unknown domain, let's ignore it
        return;
      }

      alert( "received: " + event.data );

      // can message back using event.source.postMessage(...)
    });

The full example:

Result

iframe.html

index.html

<a href="article/cross-window-communication/postmessage/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/Ck5PbEJ8XvDIARFV?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      Receiving iframe.
      <script>
        window.addEventListener('message', function(event) {
          alert(`Received ${event.data} from ${event.origin}`);
        });
      </script>

    </body>
    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <form id="form">
        <input type="text" placeholder="Enter message" name="message">
        <input type="submit" value="Click to send">
      </form>

      <iframe src="iframe.html" id="iframe" style="display:block;height:60px"></iframe>

      <script>
        form.onsubmit = function() {
          iframe.contentWindow.postMessage(this.message.value, '*');
          return false;
        };
      </script>

    </body>
    </html>

## <a href="cross-window-communication.html#summary" id="summary" class="main__anchor">Summary</a>

To call methods and access the content of another window, we should first have a reference to it.

For popups we have these references:

- From the opener window: `window.open` – opens a new window and returns a reference to it,
- From the popup: `window.opener` – is a reference to the opener window from a popup.

For iframes, we can access parent/children windows using:

- `window.frames` – a collection of nested window objects,
- `window.parent`, `window.top` are the references to parent and top windows,
- `iframe.contentWindow` is the window inside an `<iframe>` tag.

If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

Otherwise, only possible actions are:

- Change the `location` of another window (write-only access).
- Post a message to it.

Exceptions are:

- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the “same origin” state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the “different origin” state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows with any origins to talk:

1.  The sender calls `targetWin.postMessage(data, targetOrigin)`.

2.  If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the origin `targetOrigin`.

3.  If it is so, then `targetWin` triggers the `message` event with special properties:

    - `origin` – the origin of the sender window (like `http://my.site.com`)
    - `source` – the reference to the sender window.
    - `data` – the data, any object in everywhere except IE that supports only strings.

    We should use `addEventListener` to set the handler for this event inside the target window.

<a href="popup-windows.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="clickjacking.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcross-window-communication" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcross-window-communication" </a>

<a href="tutorial/map.html" class="map">

## <a href="cross-window-communication.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="frames-and-windows.html" class="sidebar__link">Frames and windows</a>

#### Lesson navigation

- <a href="cross-window-communication.html#same-origin" class="sidebar__link">Same Origin</a>
- <a href="cross-window-communication.html#windows-on-subdomains-document-domain" class="sidebar__link">Windows on subdomains: document.domain</a>
- <a href="cross-window-communication.html#iframe-wrong-document-pitfall" class="sidebar__link">Iframe: wrong document pitfall</a>
- <a href="cross-window-communication.html#collection-window-frames" class="sidebar__link">Collection: window.frames</a>
- <a href="cross-window-communication.html#the-sandbox-iframe-attribute" class="sidebar__link">The “sandbox” iframe attribute</a>
- <a href="cross-window-communication.html#cross-window-messaging" class="sidebar__link">Cross-window messaging</a>
- <a href="cross-window-communication.html#summary" class="sidebar__link">Summary</a>

- <a href="cross-window-communication.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fcross-window-communication" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcross-window-communication" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/3-frames-and-windows/03-cross-window-communication" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
