EN

- <a href="https://ar.javascript.info/"
- <a href="width-vs-clientwidth.html"
  /width-vs-clientwidth"
  /width-vs-clientwidth"
  width-vs-clientwidth"
  task/width-vs-clientwidth"

<!-- -->

- /"
  width-vs-clientwidth"
- <a href="https://tr.javascript.info/"
  width-vs-clientwidth"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fwidth-vs-clientwidth"%2Fwidth-vs-clientwidth" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../size-and-scroll.html" Element size and scrolling</span></a>

<a href="../size-and-scroll.html"

## The difference: CSS width versus clientWidth

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What’s the difference between `getComputedStyle(elem).width` and `elem.clientWidth`?

Give at least 3 differences. The more the better.

solution

Differences:

1.  `clientWidth` is numeric, while `getComputedStyle(elem).width` returns a string with `px` at the end.
2.  `getComputedStyle` may return non-numeric width like `"auto"` for an inline element.
3.  `clientWidth` is the inner content area of the element plus paddings, while CSS width (with standard `box-sizing`) is the inner content area _without paddings_.
4.  If there’s a scrollbar and the browser reserves the space for it, some browser substract that space from CSS width (cause it’s not available for content any more), and some do not. The `clientWidth` property is always the same: scrollbar size is substracted if reserved.
