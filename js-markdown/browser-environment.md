EN

- <a href="https://ar.javascript.info/browser-environment"
- <a href="browser-environment.html"
- <a href="https://es.javascript.info/browser-environment"
- <a href="https://fr.javascript.info/browser-environment"
- <a href="https://it.javascript.info/browser-environment"
  browser-environment"

<!-- -->

- <a href="https://ko.javascript.info/browser-environment"
- <a href=browser-environment"
- <a href="https://tr.javascript.info/browser-environment"
- <a href="https://zh.javascript.info/browser-environment"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbrowser-environment" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbrowser-environment" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

27th June 2020

# Browser environment, specs

The JavaScript language was initially created for web browsers. Since then it has evolved and become a language with many uses and platforms.

A platform may be a browser, or a web-server or another _host_, even a “smart” coffee machine, if it can run JavaScript. Each of them provides platform-specific functionality. The JavaScript specification calls that a _host environment_.

A host environment provides own objects and functions additional to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here’s a bird’s-eye view of what we have when JavaScript runs in a web browser:

<figure><img src="article/browser-environment/windowObjects.svg" width="367" height="308" /></figure>There’s a “root” object called `window`. It has two roles:

1.  First, it is a global object for JavaScript code, as described in the chapter [Global object](global-object.html).
2.  Second, it represents the “browser window” and provides methods to control it.

For instance, here we use it as a global object:

<a href="browser-environment.html#"
<a href="browser-environment.html#"

    function sayHi() {
      alert("Hello");
    }

    // global functions are methods of the global object:
    window.sayHi();

And here we use it as a browser window, to see the window height:

<a href="browser-environment.html#"
<a href="browser-environment.html#"

    alert(window.innerHeight); // inner window height

There are more window-specific methods and properties, we’ll cover them later.

## <a href="browser-environment.html#dom-document-object-model" id="dom-document-object-model" class="main__anchor">DOM (Document Object Model)</a>

Document Object Model, or DOM for short, represents all page content as objects that can be modified.

The `document` object is the main “entry point” to the page. We can change or create anything on the page using it.

For instance:

<a href="browser-environment.html#"
<a href="browser-environment.html#"

    // change the background color to red
    document.body.style.background = "red";

    // change it back after 1 second
    setTimeout(() => document.body.style.background = "", 1000);

Here we used `document.body.style`, but there’s much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).

<span class="important__type">DOM is not only for browsers</span>

The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use DOM too.

For instance, server-side scripts that download HTML pages and process them can also use DOM. They may support only a part of the specification though.

<span class="important__type">CSSOM for styling</span>

There’s also a separate specification, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) for CSS rules and stylesheets, that explains how they are represented as objects, and how to read and write them.

CSSOM is used together with DOM when we modify style rules for the document. In practice though, CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that’s also possible.

## <a href="browser-environment.html#bom-browser-object-model" id="bom-browser-object-model" class="main__anchor">BOM (Browser Object Model)</a>

The Browser Object Model (BOM) represents additional objects provided by the browser (host environment) for working with everything except the document.

For instance:

- The [navigator](https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` – about the current browser, and `navigator.platform` – about the platform (can help to differ between Windows/Linux/Mac etc).
- The [location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) object allows us to read the current URL and can redirect the browser to a new one.

Here’s how we can use the `location` object:

<a href="browser-environment.html#"
<a href="browser-environment.html#"

    alert(location.href); // shows current URL
    if (confirm("Go to Wikipedia?")) {
      location.href = "https://wikipedia.org"; // redirect the browser to another URL
    }

Functions `alert/confirm/prompt` are also a part of BOM: they are directly not related to the document, but represent pure browser methods of communicating with the user.

<span class="important__type">Specifications</span>

BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the “HTML language” (tags, attributes), but also covers a bunch of objects, methods and browser-specific DOM extensions. That’s “HTML in broad terms”. Also, some parts have additional specs listed at <https://spec.whatwg.org>.

## <a href="browser-environment.html#summary" id="summary" class="main__anchor">Summary</a>

Talking about standards, we have:

DOM specification  
Describes the document structure, manipulations and events, see <https://dom.spec.whatwg.org>.

CSSOM specification  
Describes stylesheets and style rules, manipulations with them and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.

HTML specification  
Describes the HTML language (e.g. tags) and also the BOM (browser object model) – various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes the DOM specification and extends it with many additional properties and methods.

Additionally, some classes are described separately at <https://spec.whatwg.org/>.

Please note these links, as there’s so much stuff to learn it’s impossible to cover and remember everything.

When you’d like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/search> is also a nice resource, but the corresponding spec may be better: it’s more complex and longer to read, but will make your fundamental knowledge sound and complete.

To find something, it’s often convenient to use an internet search “WHATWG \[term\]” or “MDN \[term\]”, e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Now we’ll get down to learning DOM, because the document plays the central role in the UI.

<a href="document.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="dom-nodes.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbrowser-environment" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbrowser-environment" </a>

<a href="tutorial/map.html" class="map">

## <a href="browser-environment.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="browser-environment.html#dom-document-object-model" class="sidebar__link">DOM (Document Object Model)</a>
- <a href="browser-environment.html#bom-browser-object-model" class="sidebar__link">BOM (Browser Object Model)</a>
- <a href="browser-environment.html#summary" class="sidebar__link">Summary</a>

- <a href="browser-environment.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbrowser-environment" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbrowser-environment" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/01-browser-environment" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
