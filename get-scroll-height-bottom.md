EN

langs\_\_title">عربي</span></a>

- <a href="get-scroll-height-bottom.html"
  /get-scroll-height-bottom"
  /get-scroll-height-bottom"
  get-scroll-height-bottomget-scroll-height-bottom"

<!-- -->

- /"
  get-scroll-height-bottom"
  /get-scroll-height-bottom"
  get-scroll-height-bottom"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fget-scroll-height-bottom"%2Fget-scroll-height-bottom" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../size-and-scroll.html" Element size and scrolling</span></a>

<a href="../size-and-scroll.html"

## What's the scroll from the bottom?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The `elem.scrollTop` property is the size of the scrolled out part from the top. How to get the size of the bottom scroll (let’s call it `scrollBottom`)?

Write the code that works for an arbitrary `elem`.

P.S. Please check your code: if there’s no scroll or the element is fully scrolled down, then it should return `0`.

solution

The solution is:

    let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;

In other words: (full height) minus (scrolled out top part) minus (visible part) – that’s exactly the scrolled out bottom part.
