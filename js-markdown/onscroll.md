EN

- <a href="https://ar.javascript.info/"
- <a href="onscroll.html"
- <a href="https://es.javascript.info/onscroll"
- <a href="https://fr.javascript.info/onscroll"
- onscroll"
  onscroll"

<!-- -->

- /"
- <a href=onscroll"
- <a href="https://tr.javascript.info/onscroll"
- <a href="https://zh.javascript.info/onscroll"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonscroll" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="event-details.html" UI Events</span></a></span>

27th August 2020

# Scrolling

The `scroll` event allows reacting to a page or element scrolling. There are quite a few good things we can do here.

For instance:

- Show/hide additional controls or information depending on where in the document the user is.
- Load more data when the user scrolls down till the end of the page.

Here’s a small function to show the current scroll:

    window.addEventListener('scroll', function() {
      document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
    });

In action:

Current scroll = **scroll the window**

The `scroll` event works both on the `window` and on scrollable elements.

## <a href="onscroll.html#prevent-scrolling" id="prevent-scrolling" class="main__anchor">Prevent scrolling</a>

How do we make something unscrollable?

We can’t prevent scrolling by using `event.preventDefault()` in `onscroll` listener, because it triggers _after_ the scroll has already happened.

But we can prevent scrolling by `event.preventDefault()` on an event that causes the scroll, for instance `keydown` event for pageUp and pageDown.

If we add an event handler to these events and `event.preventDefault()` in it, then the scroll won’t start.

There are many ways to initiate a scroll, so it’s more reliable to use CSS, `overflow` property.

Here are few tasks that you can solve or look through to see applications of `onscroll`.

## <a href="onscroll.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="onscroll.html#endless-page" id="endless-page" class="main__anchor">Endless page</a>

<a href="task/endless-page.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an endless page. When a visitor scrolls it to the end, it auto-appends current date-time to the text (so that a visitor can scroll more).

Like this:

Please note two important features of the scroll:

1.  **The scroll is “elastic”.** We can scroll a little beyond the document start or end in some browsers/devices (empty space below is shown, and then the document will automatically “bounces back” to normal).
2.  **The scroll is imprecise.** When we scroll to page end, then we may be in fact like 0-50px away from the real document bottom.

So, “scrolling to the end” should mean that the visitor is no more than 100px away from the document end.

P.S. In real life we may want to show “more messages” or “more goods”.

[Open a sandbox for the task.](https://plnkr.co/edit/9og7bth6RKWq4fnw?p=preview)

solution

The core of the solution is a function that adds more dates to the page (or loads more stuff in real-life) while we’re at the page end.

We can call it immediately and add as a `window.onscroll` handler.

The most important question is: “How do we detect that the page is scrolled to bottom?”

Let’s use window-relative coordinates.

The document is represented (and contained) within `<html>` tag, that is `document.documentElement`.

We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

    // when we're on the top of the page
    // window-relative top = 0
    document.documentElement.getBoundingClientRect().top = 0

    // window-relative bottom = 2000
    // the document is long, so that is probably far beyond the window bottom
    document.documentElement.getBoundingClientRect().bottom = 2000

If we scroll `500px` below, then:

    // document top is above the window 500px
    document.documentElement.getBoundingClientRect().top = -500
    // document bottom is 500px closer
    document.documentElement.getBoundingClientRect().bottom = 1500

When we scroll till the end, assuming that the window height is `600px`:

    // document top is above the window 1400px
    document.documentElement.getBoundingClientRect().top = -1400
    // document bottom is below the window 600px
    document.documentElement.getBoundingClientRect().bottom = 600

Please note that the `bottom` can’t be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can’t scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).

So here’s the function:

    function populate() {
      while(true) {
        // document bottom
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

        // if the user hasn't scrolled far enough (>100px to the end)
        if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

        // let's add more data
        document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
      }
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/VVJZRWimYbGiMkqJ?p=preview)

### <a href="onscroll.html#up-down-button" id="up-down-button" class="main__anchor">Up/down button</a>

<a href="task/updown-button.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a “to the top” button to help with page scrolling.

It should work like this:

- While the page is not scrolled down at least for the window height – it’s invisible.
- When the page is scrolled down more than the window height – there appears an “upwards” arrow in the left-top corner. If the page is scrolled back, it disappears.
- When the arrow is clicked, the page scrolls to the top.

Like this (top-left corner, scroll to see):

<a href="https://en.js.cx/task/updown-button/solution/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

[Open a sandbox for the task.](https://plnkr.co/edit/DqgU6NJ1rB6Wdq42?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/pfARI2TpxF80roQY?p=preview)

### <a href="onscroll.html#load-visible-images" id="load-visible-images" class="main__anchor">Load visible images</a>

<a href="task/load-visible-img.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Let’s say we have a slow-speed client and want to save their mobile traffic.

For that purpose we decide not to show images immediately, but rather replace them with placeholders, like this:

    <img src="placeholder.svg" width="128" height="128" data-src="real.jpg">

So, initially all images are `placeholder.svg`. When the page scrolls to the position where the user can see the image – we change `src` to the one in `data-src`, and so the image loads.

Here’s an example in `iframe`:

Scroll it to see images load “on-demand”.

Requirements:

- When the page loads, those images that are on-screen should load immediately, prior to any scrolling.
- Some images may be regular, without `data-src`. The code should not touch them.
- Once an image is loaded, it should not reload any more when scrolled in/out.

P.S. If you can, make a more advanced solution that would “preload” images that are one page below/after the current position.

P.P.S. Only vertical scroll is to be handled, no horizontal scrolling.

[Open a sandbox for the task.](https://plnkr.co/edit/ZmiPqJnvJuXPBPzc?p=preview)

solution

The `onscroll` handler should check which images are visible and show them.

We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:

    // ...the page content is above...

    function isVisible(elem) {

      let coords = elem.getBoundingClientRect();

      let windowHeight = document.documentElement.clientHeight;

      // top elem edge is visible?
      let topVisible = coords.top > 0 && coords.top < windowHeight;

      // bottom elem edge is visible?
      let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

      return topVisible || bottomVisible;
    }

The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:

    function showVisible() {
      for (let img of document.querySelectorAll('img')) {
        let realSrc = img.dataset.src;
        if (!realSrc) continue;

        if (isVisible(img)) {
          img.src = realSrc;
          img.dataset.src = '';
        }
      }
    }

    showVisible();
    window.onscroll = showVisible;

P.S. The solution also has a variant of `isVisible` that “preloads” images that are within 1 page above/below the current document scroll.

[Open the solution in a sandbox.](https://plnkr.co/edit/Pz0LB74TUY6Lihkl?p=preview)

<a href="keyboard-events.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="forms-controls.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonscroll" </a>

<a href="tutorial/map.html" class="map">

## <a href="onscroll.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="event-details.html" class="sidebar__link">UI Events</a>

#### Lesson navigation

- <a href="onscroll.html#prevent-scrolling" class="sidebar__link">Prevent scrolling</a>

- <a href="onscroll.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="onscroll.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/3-event-details/8-onscroll" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
