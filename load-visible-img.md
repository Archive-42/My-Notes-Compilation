EN

langs\_\_title">عربي</span></a>

- <a href="load-visible-img.html"
  /load-visible-img"
  /load-visible-img"
  load-visible-imgload-visible-img"

<!-- -->

- /"
  load-visible-img"
  /load-visible-img"
  load-visible-img"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fload-visible-img"%2Fload-visible-img" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../event-details.html" UI Events</span></a>

<a href="../onscroll.html" Scrolling</span></a>

<a href="../onscroll.html"

## Load visible images

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
