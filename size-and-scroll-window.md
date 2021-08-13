EN

- <a href="https://ar.javascript.info/size-and-scroll-window"
- <a href="size-and-scroll-window.html"
- <a href="https://es.javascript.info/size-and-scroll-window"
- <a href="https://fr.javascript.info/size-and-scroll-window"
- size-and-scroll-window"
  size-and-scroll-window"

<!-- -->

- <a href="https://ko.javascript.info/size-and-scroll-window"
- <a href=size-and-scroll-window"
- <a href="https://tr.javascript.info/size-and-scroll-window"
- <a href="https://zh.javascript.info/size-and-scroll-window"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsize-and-scroll-window" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsize-and-scroll-window" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

15th April 2021

# Window sizes and scrolling

How do we find the width and height of the browser window? How do we get the full width and height of the document, including the scrolled out part? How do we scroll the page using JavaScript?

For this type of information, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities to consider.

## <a href="size-and-scroll-window.html#width-height-of-the-window" id="width-height-of-the-window" class="main__anchor">Width/height of the window</a>

To get window width and height, we can use the `clientWidth/clientHeight` of `document.documentElement`:

<figure><img src="article/size-and-scroll-window/document-client-width-height.svg" width="508" height="203" /></figure>For instance, this button shows the height of your window:

alert(document.documentElement.clientHeight)

<span class="important__type">Not `window.innerWidth/innerHeight`</span>

Browsers also support properties like `window.innerWidth/innerHeight`. They look like what we want, so why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

`window.innerWidth/innerHeight` includes the scrollbar.

If there’s a scrollbar, and it occupies some space, then these two lines show different values:

<a href="size-and-scroll-window.html#"
<a href="size-and-scroll-window.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( window.innerWidth ); // full window width
    alert( document.documentElement.clientWidth ); // window width minus the scrollbar

In most cases, we need the _available_ window width in order to draw or position something within scrollbars (if there are any), so we should use `documentElement.clientHeight/clientWidth`.

<span class="important__type">`DOCTYPE` is important</span>

Please note: top-level geometry properties may work a little bit differently when there’s no `<!DOCTYPE HTML>` in HTML. Odd things are possible.

In modern HTML we should always write `DOCTYPE`.

## <a href="size-and-scroll-window.html#width-height-of-the-document" id="width-height-of-the-document" class="main__anchor">Width/height of the document</a>

Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure the document’s full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there’s no scroll, then `documentElement.scrollHeight` may be even less than `documentElement.clientHeight`! Weird, right?

To reliably obtain the full document height, we should take the maximum of these properties:

<a href="size-and-scroll-window.html#"
<a href="size-and-scroll-window.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    alert('Full document height, with scrolled out part: ' + scrollHeight);

Why so? Better don’t ask. These inconsistencies come from ancient times, not a “smart” logic.

## <a href="size-and-scroll-window.html#page-scroll" id="page-scroll" class="main__anchor">Get the current scroll</a>

DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don’t have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:

<a href="size-and-scroll-window.html#"
<a href="size-and-scroll-window.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert('Current scroll from the top: ' + window.pageYOffset);
    alert('Current scroll from the left: ' + window.pageXOffset);

These properties are read-only.

<span class="important__type">Also available as `window` properties `scrollX` and `scrollY`</span>

For historical reasons, both properties exist, but they are the same:

- `window.pageXOffset` is an alias of `window.scrollX`.
- `window.pageYOffset` is an alias of `window.scrollY`.

## <a href="size-and-scroll-window.html#window-scroll" id="window-scroll" class="main__anchor">Scrolling: scrollTo, scrollBy, scrollIntoView</a>

<span class="important__type">Important:</span>

To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won’t work.

Regular elements can be scrolled by changing `scrollTop/scrollLeft`.

We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there’s a simpler, universal solution: special methods [window.scrollBy(x,y)](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy) and [window.scrollTo(pageX,pageY)](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo).

- The method `scrollBy(x,y)` scrolls the page _relative to its current position_. For instance, `scrollBy(0,10)` scrolls the page `10px` down.

  The button below demonstrates this:

  window.scrollBy(0,10)

- The method `scrollTo(pageX,pageY)` scrolls the page _to absolute coordinates_, so that the top-left corner of the visible part has coordinates `(pageX, pageY)` relative to the document’s top-left corner. It’s like setting `scrollLeft/scrollTop`.

  To scroll to the very beginning, we can use `scrollTo(0,0)`.

  window.scrollTo(0,0)

These methods work for all browsers the same way.

## <a href="size-and-scroll-window.html#scrollintoview" id="scrollintoview" class="main__anchor">scrollIntoView</a>

For completeness, let’s cover one more method: [elem.scrollIntoView(top)](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView).

The call to `elem.scrollIntoView(top)` scrolls the page to make `elem` visible. It has one argument:

- If `top=true` (that’s the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

The button below scrolls the page to position itself at the window top:

this.scrollIntoView()

And this button scrolls the page to position itself at the bottom:

this.scrollIntoView(false)

## <a href="size-and-scroll-window.html#forbid-the-scrolling" id="forbid-the-scrolling" class="main__anchor">Forbid the scrolling</a>

Sometimes we need to make the document “unscrollable”. For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it’s enough to set `document.body.style.overflow = "hidden"`. The page will “freeze” at its current scroll position.

Try it:

document.body.style.overflow = ‘hidden’

document.body.style.overflow = ‘’

The first button freezes the scroll, while the second one releases it.

We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content “jumps” to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.

## <a href="size-and-scroll-window.html#summary" id="summary" class="main__anchor">Summary</a>

Geometry:

- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`

- Width/height of the whole document, with the scrolled out part:

      let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

Scrolling:

- Read the current scroll: `window.pageYOffset/pageXOffset`.

- Change the current scroll:

  - `window.scrollTo(pageX,pageY)` – absolute coordinates,
  - `window.scrollBy(x,y)` – scroll relative the current place,
  - `elem.scrollIntoView(top)` – scroll to make `elem` visible (align with the top/bottom of the window).

<a href="size-and-scroll.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="coordinates.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsize-and-scroll-window" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsize-and-scroll-window" </a>

<a href="tutorial/map.html" class="map">

## <a href="size-and-scroll-window.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="size-and-scroll-window.html#width-height-of-the-window" class="sidebar__link">Width/height of the window</a>
- <a href="size-and-scroll-window.html#width-height-of-the-document" class="sidebar__link">Width/height of the document</a>
- <a href="size-and-scroll-window.html#page-scroll" class="sidebar__link">Get the current scroll</a>
- <a href="size-and-scroll-window.html#window-scroll" class="sidebar__link">Scrolling: scrollTo, scrollBy, scrollIntoView</a>
- <a href="size-and-scroll-window.html#scrollintoview" class="sidebar__link">scrollIntoView</a>
- <a href="size-and-scroll-window.html#forbid-the-scrolling" class="sidebar__link">Forbid the scrolling</a>
- <a href="size-and-scroll-window.html#summary" class="sidebar__link">Summary</a>

- <a href="size-and-scroll-window.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fsize-and-scroll-window" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsize-and-scroll-window" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/10-size-and-scroll-window" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
