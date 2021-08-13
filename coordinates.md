EN

- <a href="https://ar.javascript.info/coordinates"
- <a href="coordinates.html"
- <a href="https://es.javascript.info/coordinates"
- <a href="https://fr.javascript.info/coordinates"
- coordinates"
  coordinates"

<!-- -->

- <a href="https://ko.javascript.info/coordinates"
- <a href=coordinates"
- <a href="https://tr.javascript.info/coordinates"
- <a href="https://zh.javascript.info/coordinates"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcoordinates" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcoordinates" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

13th August 2020

# Coordinates

To move elements around we should be familiar with coordinates.

Most JavaScript methods deal with one of two coordinate systems:

1.  **Relative to the window** – similar to `position:fixed`, calculated from the window top/left edge.
    - we’ll denote these coordinates as `clientX/clientY`, the reasoning for such name will become clear later, when we study event properties.
2.  **Relative to the document** – similar to `position:absolute` in the document root, calculated from the document top/left edge.
    - we’ll denote them `pageX/pageY`.

When the page is scrolled to the very beginning, so that the top/left corner of the window is exactly the document top/left corner, these coordinates equal each other. But after the document shifts, window-relative coordinates of elements change, as elements move across the window, while document-relative coordinates remain the same.

On this picture we take a point in the document and demonstrate its coordinates before the scroll (left) and after it (right):

<figure><img src="article/coordinates/document-and-window-coordinates-scrolled.svg" width="728" height="358" /></figure>When the document scrolled:

- `pageY` – document-relative coordinate stayed the same, it’s counted from the document top (now scrolled out).
- `clientY` – window-relative coordinate did change (the arrow became shorter), as the same point became closer to window top.

## <a href="coordinates.html#element-coordinates-getboundingclientrect" id="element-coordinates-getboundingclientrect" class="main__anchor">Element coordinates: getBoundingClientRect</a>

The method `elem.getBoundingClientRect()` returns window coordinates for a minimal rectangle that encloses `elem` as an object of built-in [DOMRect](https://www.w3.org/TR/geometry-1/#domrect) class.

Main `DOMRect` properties:

- `x/y` – X/Y-coordinates of the rectangle origin relative to window,
- `width/height` – width/height of the rectangle (can be negative).

Additionally, there are derived properties:

- `top/bottom` – Y-coordinate for the top/bottom rectangle edge,
- `left/right` – X-coordinate for the left/right rectangle edge.

For instance click this button to see its window coordinates:

If you scroll the page and repeat, you’ll notice that as window-relative button position changes, its window coordinates (`y/top/bottom` if you scroll vertically) change as well.

Here’s the picture of `elem.getBoundingClientRect()` output:

<figure><img src="article/coordinates/coordinates.svg" width="521" height="411" /></figure>As you can see, `x/y` and `width/height` fully describe the rectangle. Derived properties can be easily calculated from them:

- `left = x`
- `top = y`
- `right = x + width`
- `bottom = y + height`

Please note:

- Coordinates may be decimal fractions, such as `10.5`. That’s normal, internally browser uses fractions in calculations. We don’t have to round them when setting to `style.left/top`.
- Coordinates may be negative. For instance, if the page is scrolled so that `elem` is now above the window, then `elem.getBoundingClientRect().top` is negative.

<span class="important__type">Why derived properties are needed? Why does `top/left` exist if there’s `x/y`?</span>

Mathematically, a rectangle is uniquely defined with its starting point `(x,y)` and the direction vector `(width,height)`. So the additional derived properties are for convenience.

Technically it’s possible for `width/height` to be negative, that allows for “directed” rectangle, e.g. to represent mouse selection with properly marked start and end.

Negative `width/height` values mean that the rectangle starts at its bottom-right corner and then “grows” left-upwards.

Here’s a rectangle with negative `width` and `height` (e.g. `width=-200`, `height=-100`):

<figure><img src="article/coordinates/coordinates-negative.svg" width="521" height="355" /></figure>As you can see, `left/top` do not equal `x/y` in such case.

In practice though, `elem.getBoundingClientRect()` always returns positive width/height, here we mention negative `width/height` only for you to understand why these seemingly duplicate properties are not actually duplicates.

<span class="important__type">Internet Explorer: no support for `x/y`</span>

Internet Explorer doesn’t support `x/y` properties for historical reasons.

So we can either make a polyfill (add getters in `DomRect.prototype`) or just use `top/left`, as they are always the same as `x/y` for positive `width/height`, in particular in the result of `elem.getBoundingClientRect()`.

<span class="important__type">Coordinates right/bottom are different from CSS position properties</span>

There are obvious similarities between window-relative coordinates and CSS `position:fixed`.

But in CSS positioning, `right` property means the distance from the right edge, and `bottom` property means the distance from the bottom edge.

If we just look at the picture above, we can see that in JavaScript it is not so. All window coordinates are counted from the top-left corner, including these ones.

## <a href="coordinates.html#elementFromPoint" id="elementFromPoint" class="main__anchor">elementFromPoint(x, y)</a>

The call to `document.elementFromPoint(x, y)` returns the most nested element at window coordinates `(x, y)`.

The syntax is:

    let elem = document.elementFromPoint(x, y);

For instance, the code below highlights and outputs the tag of the element that is now in the middle of the window:

<a href="coordinates.html#"
<a href="coordinates.html#"

    let centerX = document.documentElement.clientWidth / 2;
    let centerY = document.documentElement.clientHeight / 2;

    let elem = document.elementFromPoint(centerX, centerY);

    elem.style.background = "red";
    alert(elem.tagName);

As it uses window coordinates, the element may be different depending on the current scroll position.

<span class="important__type">For out-of-window coordinates the `elementFromPoint` returns `null`</span>

The method `document.elementFromPoint(x,y)` only works if `(x,y)` are inside the visible area.

If any of the coordinates is negative or exceeds the window width/height, then it returns `null`.

Here’s a typical error that may occur if we don’t check for it:

    let elem = document.elementFromPoint(x, y);
    // if the coordinates happen to be out of the window, then elem = null
    elem.style.background = ''; // Error!

## <a href="coordinates.html#using-for-fixed-positioning" id="using-for-fixed-positioning" class="main__anchor">Using for “fixed” positioning</a>

Most of time we need coordinates in order to position something.

To show something near an element, we can use `getBoundingClientRect` to get its coordinates, and then CSS `position` together with `left/top` (or `right/bottom`).

For instance, the function `createMessageUnder(elem, html)` below shows the message under `elem`:

    let elem = document.getElementById("coords-show-mark");

    function createMessageUnder(elem, html) {
      // create message element
      let message = document.createElement('div');
      // better to use a css class for the style here
      message.style.cssText = "position:fixed; color: red";

      // assign coordinates, don't forget "px"!
      let coords = elem.getBoundingClientRect();

      message.style.left = coords.left + "px";
      message.style.top = coords.bottom + "px";

      message.innerHTML = html;

      return message;
    }

    // Usage:
    // add it for 5 seconds in the document
    let message = createMessageUnder(elem, 'Hello, world!');
    document.body.append(message);
    setTimeout(() => message.remove(), 5000);

Click the button to run it:

Button with id=“coords-show-mark”, the message will appear under it

The code can be modified to show the message at the left, right, below, apply CSS animations to “fade it in” and so on. That’s easy, as we have all the coordinates and sizes of the element.

But note the important detail: when the page is scrolled, the message flows away from the button.

The reason is obvious: the message element relies on `position:fixed`, so it remains at the same place of the window while the page scrolls away.

To change that, we need to use document-based coordinates and `position:absolute`.

## <a href="coordinates.html#getCoords" id="getCoords" class="main__anchor">Document coordinates</a>

Document-relative coordinates start from the upper-left corner of the document, not the window.

In CSS, window coordinates correspond to `position:fixed`, while document coordinates are similar to `position:absolute` on top.

We can use `position:absolute` and `top/left` to put something at a certain place of the document, so that it remains there during a page scroll. But we need the right coordinates first.

There’s no standard method to get the document coordinates of an element. But it’s easy to write it.

The two coordinate systems are connected by the formula:

- `pageY` = `clientY` + height of the scrolled-out vertical part of the document.
- `pageX` = `clientX` + width of the scrolled-out horizontal part of the document.

The function `getCoords(elem)` will take window coordinates from `elem.getBoundingClientRect()` and add the current scroll to them:

    // get document coordinates of the element
    function getCoords(elem) {
      let box = elem.getBoundingClientRect();

      return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
      };
    }

If in the example above we used it with `position:absolute`, then the message would stay near the element on scroll.

The modified `createMessageUnder` function:

    function createMessageUnder(elem, html) {
      let message = document.createElement('div');
      message.style.cssText = "position:absolute; color: red";

      let coords = getCoords(elem);

      message.style.left = coords.left + "px";
      message.style.top = coords.bottom + "px";

      message.innerHTML = html;

      return message;
    }

## <a href="coordinates.html#summary" id="summary" class="main__anchor">Summary</a>

Any point on the page has coordinates:

1.  Relative to the window – `elem.getBoundingClientRect()`.
2.  Relative to the document – `elem.getBoundingClientRect()` plus the current page scroll.

Window coordinates are great to use with `position:fixed`, and document coordinates do well with `position:absolute`.

Both coordinate systems have their pros and cons; there are times we need one or the other one, just like CSS `position` `absolute` and `fixed`.

## <a href="coordinates.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="coordinates.html#find-window-coordinates-of-the-field" id="find-window-coordinates-of-the-field" class="main__anchor">Find window coordinates of the field</a>

<a href="task/find-point-coordinates.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the iframe below you can see a document with the green “field”.

Use JavaScript to find window coordinates of corners pointed by with arrows.

There’s a small feature implemented in the document for convenience. A click at any place shows coordinates there.

<a href="https://en.js.cx/task/find-point-coordinates/source/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/EDtjdNk6S43g1SAB?p=preview"

Your code should use DOM to get window coordinates of:

1.  Upper-left, outer corner (that’s simple).
2.  Bottom-right, outer corner (simple too).
3.  Upper-left, inner corner (a bit harder).
4.  Bottom-right, inner corner (there are several ways, choose one).

The coordinates that you calculate should be the same as those returned by the mouse click.

P.S. The code should also work if the element has another size or border, not bound to any fixed values.

[Open a sandbox for the task.](https://plnkr.co/edit/EDtjdNk6S43g1SAB?p=preview)

solution

Outer corners

#### Outer corners

Outer corners are basically what we get from [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Coordinates of the upper-left corner `answer1` and the bottom-right corner `answer2`:

    let coords = elem.getBoundingClientRect();

    let answer1 = [coords.left, coords.top];
    let answer2 = [coords.right, coords.bottom];

Left-upper inner corner

#### Left-upper inner corner

That differs from the outer corner by the border width. A reliable way to get the distance is `clientLeft/clientTop`:

    let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];

Right-bottom inner corner

#### Right-bottom inner corner

In our case we need to substract the border size from the outer coordinates.

We could use CSS way:

    let answer4 = [
      coords.right - parseInt(getComputedStyle(field).borderRightWidth),
      coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
    ];

An alternative way would be to add `clientWidth/clientHeight` to coordinates of the left-upper corner. That’s probably even better:

    let answer4 = [
      coords.left + elem.clientLeft + elem.clientWidth,
      coords.top + elem.clientTop + elem.clientHeight
    ];

[Open the solution in a sandbox.](https://plnkr.co/edit/K35otM66PlWyBgbb?p=preview)

### <a href="coordinates.html#show-a-note-near-the-element" id="show-a-note-near-the-element" class="main__anchor">Show a note near the element</a>

<a href="task/position-at.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `positionAt(anchor, position, elem)` that positions `elem`, depending on `position` near `anchor` element.

The `position` must be a string with any one of 3 values:

- `"top"` – position `elem` right above `anchor`
- `"right"` – position `elem` immediately at the right of `anchor`
- `"bottom"` – position `elem` right below `anchor`

It’s used inside function `showNote(anchor, position, html)`, provided in the task source code, that creates a “note” element with given `html` and shows it at the given `position` near the `anchor`.

Here’s the demo of notes:

<a href="https://en.js.cx/task/position-at/solution/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

[Open a sandbox for the task.](https://plnkr.co/edit/nwn7WjPXNeRuuTg8?p=preview)

solution

In this task we only need to accurately calculate the coordinates. See the code for details.

Please note: the elements must be in the document to read `offsetHeight` and other properties. A hidden (`display:none`) or out of the document element has no size.

[Open the solution in a sandbox.](https://plnkr.co/edit/VyAb5Fjkqui3CRmS?p=preview)

### <a href="coordinates.html#show-a-note-near-the-element-absolute" id="show-a-note-near-the-element-absolute" class="main__anchor">Show a note near the element (absolute)</a>

<a href="task/position-at-absolute.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Modify the solution of the [previous task](task/position-at.html) so that the note uses `position:absolute` instead of `position:fixed`.

That will prevent its “runaway” from the element when the page scrolls.

Take the solution of that task as a starting point. To test the scroll, add the style `<body style="height: 2000px">`.

solution

The solution is actually pretty simple:

- Use `position:absolute` in CSS instead of `position:fixed` for `.note`.
- Use the function [getCoords()](coordinates.html#getCoords) from the chapter [Coordinates](coordinates.html) to get document-relative coordinates.

[Open the solution in a sandbox.](https://plnkr.co/edit/IltvUDuUTs6bVjl3?p=preview)

### <a href="coordinates.html#position-the-note-inside-absolute" id="position-the-note-inside-absolute" class="main__anchor">Position the note inside (absolute)</a>

<a href="task/position-inside-absolute.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Extend the previous task [Show a note near the element (absolute)](task/position-at-absolute.html): teach the function `positionAt(anchor, position, elem)` to insert `elem` inside the `anchor`.

New values for `position`:

- `top-out`, `right-out`, `bottom-out` – work the same as before, they insert the `elem` over/right/under `anchor`.
- `top-in`, `right-in`, `bottom-in` – insert `elem` inside the `anchor`: stick it to the upper/right/bottom edge.

For instance:

    // shows the note above blockquote
    positionAt(blockquote, "top-out", note);

    // shows the note inside blockquote, at the top
    positionAt(blockquote, "top-in", note);

The result:

<a href="https://en.js.cx/task/position-inside-absolute/solution/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

As the source code, take the solution of the task [Show a note near the element (absolute)](task/position-at-absolute.html).

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/KkS3sLDgUKFy4XUU?p=preview)

<a href="size-and-scroll-window.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="events.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcoordinates" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcoordinates" </a>

<a href="tutorial/map.html" class="map">

## <a href="coordinates.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="coordinates.html#element-coordinates-getboundingclientrect" class="sidebar__link">Element coordinates: getBoundingClientRect</a>
- <a href="coordinates.html#elementFromPoint" class="sidebar__link">elementFromPoint(x, y)</a>
- <a href="coordinates.html#using-for-fixed-positioning" class="sidebar__link">Using for “fixed” positioning</a>
- <a href="coordinates.html#getCoords" class="sidebar__link">Document coordinates</a>
- <a href="coordinates.html#summary" class="sidebar__link">Summary</a>

- <a href="coordinates.html#tasks" class="sidebar__link">Tasks (4)</a>
- <a href="coordinates.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fcoordinates" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcoordinates" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/11-coordinates" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
