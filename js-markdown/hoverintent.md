EN

langs\_\_title">عربي</span></a>

- <a href="hoverintent.html"
  /hoverintent"
  /hoverintent"
  hoverintenthoverintent"

<!-- -->

- <a href="https://ko.javascript.info/"
  hoverintent"
  /hoverintent"
  hoverintent"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fhoverintent"%2Fhoverintent" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../event-details.html" UI Events</span></a>

<a href="../mousemove-mouseover-mouseout-mouseenter-mouseleave.html" Moving the mouse: mouseover/out, mouseenter/leave</span></a>

<a href="../mousemove-mouseover-mouseout-mouseenter-mouseleave.html"

## "Smart" tooltip

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function that shows a tooltip over an element only if the visitor moves the mouse _to it_, but not _through it_.

In other words, if the visitor moves the mouse to the element and stops there – show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?

Technically, we can measure the mouse speed over the element, and if it’s slow then we assume that it comes “over the element” and show the tooltip, if it’s fast – then we ignore it.

Make a universal object `new HoverIntent(options)` for it.

Its `options`:

- `elem` – element to track.
- `over` – a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
- `out` – a function to call when the mouse leaves the element (if `over` was called).

An example of using such object for the tooltip:

    // a sample tooltip
    let tooltip = document.createElement('div');
    tooltip.className = "tooltip";
    tooltip.innerHTML = "Tooltip";

    // the object will track mouse and call over/out
    new HoverIntent({
      elem,
      over() {
        tooltip.style.left = elem.getBoundingClientRect().left + 'px';
        tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
        document.body.append(tooltip);
      },
      out() {
        tooltip.remove();
      }
    });

The demo:

If you move the mouse over the “clock” fast then nothing happens, and if you do it slow or stop on them, then there will be a tooltip.

Please note: the tooltip doesn’t “blink” when the cursor moves between the clock subelements.

[Open a sandbox with tests.](https://plnkr.co/edit/vaC7qQoEslRkWWZ7?p=preview)

solution

The algorithm looks simple:

1.  Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won’t work if we introduce delegation.
2.  When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3.  If the speed is slow, then run `over`.
4.  When we’re going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it’s small, then the speed is small.

Unfortunately, there’s no way to get “current mouse coordinates” in JavaScript. There’s no function like `getCurrentMouseCoordinates()`.

The only way to get coordinates is to listen for mouse events, like `mousemove`, and take coordinates from the event object.

So let’s set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.

P.S. Please note: the solution tests use `dispatchEvent` to see if the tooltip works right.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/n8OtYNISvRNcwCcm?p=preview)
