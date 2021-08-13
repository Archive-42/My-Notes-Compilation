EN

- <a href="https://ar.javascript.info/"
- <a href="mutation-observer.html"
- <a href="https://es.javascript.info/mutation-observer"
- <a href="https://fr.javascript.info/mutation-observer"
- mutation-observer"
  mutation-observer"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=mutation-observer"
- <a href="https://tr.javascript.info/mutation-observer"
- <a href="https://zh.javascript.info/mutation-observer"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmutation-observer" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmutation-observer" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="ui-misc.html" Miscellaneous</span></a></span>

13th September 2020

# Mutation observer

`MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change.

We’ll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.

## <a href="mutation-observer.html#syntax" id="syntax" class="main__anchor">Syntax</a>

`MutationObserver` is easy to use.

First, we create an observer with a callback-function:

    let observer = new MutationObserver(callback);

And then attach it to a DOM node:

    observer.observe(node, config);

`config` is an object with boolean options “what kind of changes to react on”:

- `childList` – changes in the direct children of `node`,
- `subtree` – in all descendants of `node`,
- `attributes` – attributes of `node`,
- `attributeFilter` – an array of attribute names, to observe only selected ones.
- `characterData` – whether to observe `node.data` (text content),

Few other options:

- `attributeOldValue` – if `true`, pass both the old and the new value of attribute to callback (see below), otherwise only the new one (needs `attributes` option),
- `characterDataOldValue` – if `true`, pass both the old and the new value of `node.data` to callback (see below), otherwise only the new one (needs `characterData` option).

Then after any changes, the `callback` is executed: changes are passed in the first argument as a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects, and the observer itself as the second argument.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:

- `type` – mutation type, one of
  - `"attributes"`: attribute modified
  - `"characterData"`: data modified, used for text nodes,
  - `"childList"`: child elements added/removed,
- `target` – where the change occurred: an element for `"attributes"`, or text node for `"characterData"`, or an element for a `"childList"` mutation,
- `addedNodes/removedNodes` – nodes that were added/removed,
- `previousSibling/nextSibling` – the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` – the name/namespace (for XML) of the changed attribute,
- `oldValue` – the previous value, only for attribute or text changes, if the corresponding option is set `attributeOldValue`/`characterDataOldValue`.

For example, here’s a `<div>` with a `contentEditable` attribute. That attribute allows us to focus on it and edit.

<a href="mutation-observer.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="mutation-observer.html#"

    <div contentEditable id="elem">Click and <b>edit</b>, please</div>

    <script>
    let observer = new MutationObserver(mutationRecords => {
      console.log(mutationRecords); // console.log(the changes)
    });

    // observe everything except attributes
    observer.observe(elem, {
      childList: true, // observe direct children
      subtree: true, // and lower descendants too
      characterDataOldValue: true // pass old data to callback
    });
    </script>

If we run this code in the browser, then focus on the given `<div>` and change the text inside `<b>edit</b>`, `console.log` will show one mutation:

    mutationRecords = [{
      type: "characterData",
      oldValue: "edit",
      target: <text node>,
      // other properties empty
    }];

If we make more complex editing operations, e.g. remove the `<b>edit</b>`, the mutation event may contain multiple mutation records:

    mutationRecords = [{
      type: "childList",
      target: <div#elem>,
      removedNodes: [<b>],
      nextSibling: <text node>,
      previousSibling: <text node>
      // other properties empty
    }, {
      type: "characterData"
      target: <text node>
      // ...mutation details depend on how the browser handles such removal
      // it may coalesce two adjacent text nodes "edit " and ", please" into one node
      // or it may leave them separate text nodes
    }];

So, `MutationObserver` allows to react on any changes within DOM subtree.

## <a href="mutation-observer.html#usage-for-integration" id="usage-for-integration" class="main__anchor">Usage for integration</a>

When such thing may be useful?

Imagine the situation when you need to add a third-party script that contains useful functionality, but also does something unwanted, e.g. shows ads `<div class="ads">Unwanted ads</div>`.

Naturally, the third-party script provides no mechanisms to remove it.

Using `MutationObserver`, we can detect when the unwanted element appears in our DOM and remove it.

There are other situations when a third-party script adds something into our document, and we’d like to detect, when it happens, to adapt our page, dynamically resize something etc.

`MutationObserver` allows to implement this.

## <a href="mutation-observer.html#usage-for-architecture" id="usage-for-architecture" class="main__anchor">Usage for architecture</a>

There are also situations when `MutationObserver` is good from architectural standpoint.

Let’s say we’re making a website about programming. Naturally, articles and other materials may contain source code snippets.

Such snippet in an HTML markup looks like this:

    ...
    <pre class="language-javascript"><code>
      // here's the code
      let hello = "world";
    </code></pre>
    ...

For better readability and at the same time, to beautify it, we’ll be using a JavaScript syntax highlighting library on our site, like [Prism.js](https://prismjs.com/). To get syntax highlighting for above snippet in Prism, `Prism.highlightElem(pre)` is called, which examines the contents of such `pre` elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.

When exactly should we run that highlighting method? Well, we can do it on `DOMContentLoaded` event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:

    // highlight all code snippets on the page
    document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);

Everything’s simple so far, right? We find code snippets in HTML and highlight them.

Now let’s go on. Let’s say we’re going to dynamically fetch materials from a server. We’ll study methods for that [later in the tutorial](fetch.html). For now it only matters that we fetch an HTML article from a webserver and display it on demand:

    let article = /* fetch new content from server */
    articleElem.innerHTML = article;

The new `article` HTML may contain code snippets. We need to call `Prism.highlightElem` on them, otherwise they won’t get highlighted.

**Where and when to call `Prism.highlightElem` for a dynamically loaded article?**

We could append that call to the code that loads an article, like this:

    let article = /* fetch new content from server */
    articleElem.innerHTML = article;

    let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
    snippets.forEach(Prism.highlightElem);

…But, imagine if we have many places in the code where we load our content – articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That’s not very convenient.

And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we’d like to add syntax highlighting to it. No one likes patching third-party scripts.

Luckily, there’s another option.

We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.

So we’ll handle the highlighting functionality in one place, relieving us from the need to integrate it.

### <a href="mutation-observer.html#dynamic-highlight-demo" id="dynamic-highlight-demo" class="main__anchor">Dynamic highlight demo</a>

Here’s the working example.

If you run this code, it starts observing the element below and highlighting any code snippets that appear there:

<a href="mutation-observer.html#"
<a href="mutation-observer.html#"

    let observer = new MutationObserver(mutations => {

      for(let mutation of mutations) {
        // examine new nodes, is there anything to highlight?

        for(let node of mutation.addedNodes) {
          // we track only elements, skip other nodes (e.g. text nodes)
          if (!(node instanceof HTMLElement)) continue;

          // check the inserted element for being a code snippet
          if (node.matches('pre[class*="language-"]')) {
            Prism.highlightElement(node);
          }

          // or maybe there's a code snippet somewhere in its subtree?
          for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
            Prism.highlightElement(elem);
          }
        }
      }

    });

    let demoElem = document.getElementById('highlight-demo');

    observer.observe(demoElem, {childList: true, subtree: true});

Here, below, there’s an HTML-element and JavaScript that dynamically fills it using `innerHTML`.

Please run the previous code (above, observes that element), and then the code below. You’ll see how `MutationObserver` detects and highlights the snippet.

A demo-element with `id="highlight-demo"`, run the code above to observe it.

The following code populates its `innerHTML`, that causes the `MutationObserver` to react and highlight its contents:

<a href="mutation-observer.html#"
<a href="mutation-observer.html#"

    let demoElem = document.getElementById('highlight-demo');

    // dynamically insert content with code snippets
    demoElem.innerHTML = `A code snippet is below:
      <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
      <div>Another one:</div>
      <div>
        <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
      </div>
    `;

Now we have `MutationObserver` that can track all highlighting in observed elements or the whole `document`. We can add/remove code snippets in HTML without thinking about it.

## <a href="mutation-observer.html#additional-methods" id="additional-methods" class="main__anchor">Additional methods</a>

There’s a method to stop observing the node:

- `observer.disconnect()` – stops the observation.

When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use

- `observer.takeRecords()` – gets a list of unprocessed mutation records – those that happened, but the callback has not handled them.

These methods can be used together, like this:

    // get a list of unprocessed mutations
    // should be called before disconnecting,
    // if you care about possibly unhandled recent mutations
    let mutationRecords = observer.takeRecords();

    // stop tracking changes
    observer.disconnect();
    ...

<span class="important__type">Records returned by `observer.takeRecords()` are removed from the processing queue</span>

The callback won’t be called for records, returned by `observer.takeRecords()`.

<span class="important__type">Garbage collection interaction</span>

Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.

The mere fact that a DOM node is observed doesn’t prevent the garbage collection.

## <a href="mutation-observer.html#summary" id="summary" class="main__anchor">Summary</a>

`MutationObserver` can react to changes in DOM – attributes, text content and adding/removing elements.

We can use it to track changes introduced by other parts of our code, as well as to integrate with third-party scripts.

`MutationObserver` can track any changes. The config “what to observe” options are used for optimizations, not to spend resources on unneeded callback invocations.

<a href="ui-misc.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="selection-range.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmutation-observer" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmutation-observer" </a>

<a href="tutorial/map.html" class="map">

## <a href="mutation-observer.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="ui-misc.html" class="sidebar__link">Miscellaneous</a>

#### Lesson navigation

- <a href="mutation-observer.html#syntax" class="sidebar__link">Syntax</a>
- <a href="mutation-observer.html#usage-for-integration" class="sidebar__link">Usage for integration</a>
- <a href="mutation-observer.html#usage-for-architecture" class="sidebar__link">Usage for architecture</a>
- <a href="mutation-observer.html#additional-methods" class="sidebar__link">Additional methods</a>
- <a href="mutation-observer.html#summary" class="sidebar__link">Summary</a>

- <a href="mutation-observer.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fmutation-observer" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmutation-observer" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/99-ui-misc/01-mutation-observer" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
