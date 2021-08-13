EN

- <a href="https://ar.javascript.info/default-browser-action"
- <a href="default-browser-action.html"
- <a href="https://es.javascript.info/default-browser-action"
- <a href="https://fr.javascript.info/default-browser-action"
- default-browser-action"
  default-browser-action"

<!-- -->

- /default-browser-action"
- <a href=default-browser-action"
- <a href="https://tr.javascript.info/default-browser-action"
- <a href="https://zh.javascript.info/default-browser-action"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdefault-browser-action" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdefault-browser-action" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="events.html" Introduction to Events</span></a></span>

27th March 2020

# Browser default actions

Many events automatically lead to certain actions performed by the browser.

For instance:

- A click on a link – initiates navigation to its URL.
- A click on a form submit button – initiates its submission to the server.
- Pressing a mouse button over a text and moving it – selects the text.

If we handle an event in JavaScript, we may not want the corresponding browser action to happen, and want to implement another behavior instead.

## <a href="default-browser-action.html#preventing-browser-actions" id="preventing-browser-actions" class="main__anchor">Preventing browser actions</a>

There are two ways to tell the browser we don’t want it to act:

- The main way is to use the `event` object. There’s a method `event.preventDefault()`.
- If the handler is assigned using `on<event>` (not by `addEventListener`), then returning `false` also works the same.

In this HTML a click on a link doesn’t lead to navigation, browser doesn’t do anything:

    <a href="/" onclick="return false">Click here</a>
    or
    <a href="/" onclick="event.preventDefault()">here</a>

In the next example we’ll use this technique to create a JavaScript-powered menu.

<span class="important__type">Returning `false` from a handler is an exception</span>

The value returned by an event handler is usually ignored.

The only exception is `return false` from a handler assigned using `on<event>`.

In all other cases, `return` value is ignored. In particular, there’s no sense in returning `true`.

### <a href="default-browser-action.html#example-the-menu" id="example-the-menu" class="main__anchor">Example: the menu</a>

Consider a site menu, like this:

    <ul id="menu" class="menu">
      <li><a href="/html">HTML</a></li>
      <li><a href="/javascript">JavaScript</a></li>
      <li><a href="/css">CSS</a></li>
    </ul>

Here’s how it looks with some CSS:

<a href="https://en.js.cx/article/default-browser-action/menu/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/et0Ow67yDOD9JtOR?p=preview"

Menu items are implemented as HTML-links `<a>`, not buttons `<button>`. There are several reasons to do so, for instance:

- Many people like to use “right click” – “open in a new window”. If we use `<button>` or `<span>`, that doesn’t work.
- Search engines follow `<a href="...">` links while indexing.

So we use `<a>` in the markup. But normally we intend to handle clicks in JavaScript. So we should prevent the default browser action.

Like here:

    menu.onclick = function(event) {
      if (event.target.nodeName != 'A') return;

      let href = event.target.getAttribute('href');
      alert( href ); // ...can be loading from the server, UI generation etc

      return false; // prevent browser action (don't go to the URL)
    };

If we omit `return false`, then after our code executes the browser will do its “default action” – navigating to the URL in `href`. And we don’t need that here, as we’re handling the click by ourselves.

By the way, using event delegation here makes our menu very flexible. We can add nested lists and style them using CSS to “slide down”.

<span class="important__type">Follow-up events</span>

Certain events flow one into another. If we prevent the first event, there will be no second.

For instance, `mousedown` on an `<input>` field leads to focusing in it, and the `focus` event. If we prevent the `mousedown` event, there’s no focus.

Try to click on the first `<input>` below – the `focus` event happens. But if you click the second one, there’s no focus.

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <input value="Focus works" onfocus="this.value=''">
    <input onmousedown="return false" onfocus="this.value=''" value="Click me">

That’s because the browser action is canceled on `mousedown`. The focusing is still possible if we use another way to enter the input. For instance, the Tab key to switch from the 1st input into the 2nd. But not with the mouse click any more.

## <a href="default-browser-action.html#the-passive-handler-option" id="the-passive-handler-option" class="main__anchor">The “passive” handler option</a>

The optional `passive: true` option of `addEventListener` signals the browser that the handler is not going to call `preventDefault()`.

Why that may be needed?

There are some events like `touchmove` on mobile devices (when the user moves their finger across the screen), that cause scrolling by default, but that scrolling can be prevented using `preventDefault()` in the handler.

So when the browser detects such event, it has first to process all handlers, and then if `preventDefault` is not called anywhere, it can proceed with scrolling. That may cause unnecessary delays and “jitters” in the UI.

The `passive: true` options tells the browser that the handler is not going to cancel scrolling. Then browser scrolls immediately providing a maximally fluent experience, and the event is handled by the way.

For some browsers (Firefox, Chrome), `passive` is `true` by default for `touchstart` and `touchmove` events.

## <a href="default-browser-action.html#event-defaultprevented" id="event-defaultprevented" class="main__anchor">event.defaultPrevented</a>

The property `event.defaultPrevented` is `true` if the default action was prevented, and `false` otherwise.

There’s an interesting use case for it.

You remember in the chapter [Bubbling and capturing](bubbling-and-capturing.html) we talked about `event.stopPropagation()` and why stopping bubbling is bad?

Sometimes we can use `event.defaultPrevented` instead, to signal other event handlers that the event was handled.

Let’s see a practical example.

By default the browser on `contextmenu` event (right mouse click) shows a context menu with standard options. We can prevent it and show our own, like this:

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <button>Right-click shows browser context menu</button>

    <button oncontextmenu="alert('Draw our menu'); return false">
      Right-click shows our context menu
    </button>

Now, in addition to that context menu we’d like to implement document-wide context menu.

Upon right click, the closest context menu should show up.

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <p>Right-click here for the document context menu</p>
    <button id="elem">Right-click here for the button context menu</button>

    <script>
      elem.oncontextmenu = function(event) {
        event.preventDefault();
        alert("Button context menu");
      };

      document.oncontextmenu = function(event) {
        event.preventDefault();
        alert("Document context menu");
      };
    </script>

The problem is that when we click on `elem`, we get two menus: the button-level and (the event bubbles up) the document-level menu.

How to fix it? One of solutions is to think like: “When we handle right-click in the button handler, let’s stop its bubbling” and use `event.stopPropagation()`:

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <p>Right-click for the document menu</p>
    <button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

    <script>
      elem.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        alert("Button context menu");
      };

      document.oncontextmenu = function(event) {
        event.preventDefault();
        alert("Document context menu");
      };
    </script>

Now the button-level menu works as intended. But the price is high. We forever deny access to information about right-clicks for any outer code, including counters that gather statistics and so on. That’s quite unwise.

An alternative solution would be to check in the `document` handler if the default action was prevented? If it is so, then the event was handled, and we don’t need to react on it.

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
    <button id="elem">Right-click for the button menu</button>

    <script>
      elem.oncontextmenu = function(event) {
        event.preventDefault();
        alert("Button context menu");
      };

      document.oncontextmenu = function(event) {
        if (event.defaultPrevented) return;

        event.preventDefault();
        alert("Document context menu");
      };
    </script>

Now everything also works correctly. If we have nested elements, and each of them has a context menu of its own, that would also work. Just make sure to check for `event.defaultPrevented` in each `contextmenu` handler.

<span class="important__type">event.stopPropagation() and event.preventDefault()</span>

As we can clearly see, `event.stopPropagation()` and `event.preventDefault()` (also known as `return false`) are two different things. They are not related to each other.

<span class="important__type">Nested context menus architecture</span>

There are also alternative ways to implement nested context menus. One of them is to have a single global object with a handler for `document.oncontextmenu`, and also methods that allow us to store other handlers in it.

The object will catch any right-click, look through stored handlers and run the appropriate one.

But then each piece of code that wants a context menu should know about that object and use its help instead of the own `contextmenu` handler.

## <a href="default-browser-action.html#summary" id="summary" class="main__anchor">Summary</a>

There are many default browser actions:

- `mousedown` – starts the selection (move the mouse to select).
- `click` on `<input type="checkbox">` – checks/unchecks the `input`.
- `submit` – clicking an `<input type="submit">` or hitting Enter inside a form field causes this event to happen, and the browser submits the form after it.
- `keydown` – pressing a key may lead to adding a character into a field, or other actions.
- `contextmenu` – the event happens on a right-click, the action is to show the browser context menu.
- …there are more…

All the default actions can be prevented if we want to handle the event exclusively by JavaScript.

To prevent a default action – use either `event.preventDefault()` or `return false`. The second method works only for handlers assigned with `on<event>`.

The `passive: true` option of `addEventListener` tells the browser that the action is not going to be prevented. That’s useful for some mobile events, like `touchstart` and `touchmove`, to tell the browser that it should not wait for all handlers to finish before scrolling.

If the default action was prevented, the value of `event.defaultPrevented` becomes `true`, otherwise it’s `false`.

<span class="important__type">Stay semantic, don’t abuse</span>

Technically, by preventing default actions and adding JavaScript we can customize the behavior of any elements. For instance, we can make a link `<a>` work like a button, and a button `<button>` behave as a link (redirect to another URL or so).

But we should generally keep the semantic meaning of HTML elements. For instance, `<a>` should perform navigation, not a button.

Besides being “just a good thing”, that makes your HTML better in terms of accessibility.

Also if we consider the example with `<a>`, then please note: a browser allows us to open such links in a new window (by right-clicking them and other means). And people like that. But if we make a button behave as a link using JavaScript and even look like a link using CSS, then `<a>`-specific browser features still won’t work for it.

## <a href="default-browser-action.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="default-browser-action.html#why-return-false-doesn-t-work" id="why-return-false-doesn-t-work" class="main__anchor">Why "return false" doesn't work?</a>

<a href="task/why-return-false-fails.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Why in the code below `return false` doesn’t work at all?

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <script>
      function handler() {
        alert( "..." );
        return false;
      }
    </script>

    <a href="https://w3.org" onclick="handler()">the browser will go to w3.org</a>

The browser follows the URL on click, but we don’t want it.

How to fix?

solution

When the browser reads the `on*` attribute like `onclick`, it creates the handler from its content.

For `onclick="handler()"` the function will be:

    function(event) {
      handler() // the content of onclick
    }

Now we can see that the value returned by `handler()` is not used and does not affect the result.

The fix is simple:

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <script>
      function handler() {
        alert("...");
        return false;
      }
    </script>

    <a href="https://w3.org" onclick="return handler()">w3.org</a>

Also we can use `event.preventDefault()`, like this:

<a href="default-browser-action.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="default-browser-action.html#"

    <script>
      function handler(event) {
        alert("...");
        event.preventDefault();
      }
    </script>

    <a href="https://w3.org" onclick="handler(event)">w3.org</a>

### <a href="default-browser-action.html#catch-links-in-the-element" id="catch-links-in-the-element" class="main__anchor">Catch links in the element</a>

<a href="task/catch-link-navigation.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make all links inside the element with `id="contents"` ask the user if they really want to leave. And if they don’t then don’t follow.

Like this:

Details:

- HTML inside the element may be loaded or regenerated dynamically at any time, so we can’t find all links and put handlers on them. Use event delegation.
- The content may have nested tags. Inside links too, like `<a href=".."><i>...</i></a>`.

[Open a sandbox for the task.](https://plnkr.co/edit/2q3DhC51iVEYU3Ht?p=preview)

solution

That’s a great use of the event delegation pattern.

In real life instead of asking we can send a “logging” request to the server that saves the information about where the visitor left. Or we can load the content and show it right in the page (if allowable).

All we need is to catch the `contents.onclick` and use `confirm` to ask the user. A good idea would be to use `link.getAttribute('href')` instead of `link.href` for the URL. See the solution for details.

[Open the solution in a sandbox.](https://plnkr.co/edit/dFmfWhLtL4Gd4ryk?p=preview)

### <a href="default-browser-action.html#image-gallery" id="image-gallery" class="main__anchor">Image gallery</a>

<a href="task/image-gallery.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an image gallery where the main image changes by the click on a thumbnail.

Like this:

P.S. Use event delegation.

[Open a sandbox for the task.](https://plnkr.co/edit/b8rcZiN2kqsbPyT0?p=preview)

solution

The solution is to assign the handler to the container and track clicks. If a click is on the `<a>` link, then change `src` of `#largeImg` to the `href` of the thumbnail.

[Open the solution in a sandbox.](https://plnkr.co/edit/swIOGZytjCu3Otsb?p=preview)

<a href="event-delegation.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="dispatch-events.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdefault-browser-action" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdefault-browser-action" </a>

<a href="tutorial/map.html" class="map">

## <a href="default-browser-action.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="events.html" class="sidebar__link">Introduction to Events</a>

#### Lesson navigation

- <a href="default-browser-action.html#preventing-browser-actions" class="sidebar__link">Preventing browser actions</a>
- <a href="default-browser-action.html#the-passive-handler-option" class="sidebar__link">The “passive” handler option</a>
- <a href="default-browser-action.html#event-defaultprevented" class="sidebar__link">event.defaultPrevented</a>
- <a href="default-browser-action.html#summary" class="sidebar__link">Summary</a>

- <a href="default-browser-action.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="default-browser-action.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fdefault-browser-action" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdefault-browser-action" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/2-events/04-default-browser-action" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
