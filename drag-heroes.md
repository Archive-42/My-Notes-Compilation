EN

- <a href="https://ar.javascript.info/"
- <a href="drag-heroes.html"
  /drag-heroes"
  /drag-heroes"
  drag-heroesdrag-heroes"

<!-- -->

- <a href="https://ko.javascript.info/"
  drag-heroes"
  /drag-heroes"
  drag-heroes"

k%2Fdrag-heroes"%2Fdrag-heroes" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../event-details.html" UI Events</span></a>

<a href="../mouse-drag-and-drop.html" Drag'n'Drop with mouse events</span></a>

<a href="../mouse-drag-and-drop.html"

## Drag superheroes around the field

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

This task can help you to check understanding of several aspects of Drag’n’Drop and DOM.

Make all elements with class `draggable` – draggable. Like a ball in the chapter.

Requirements:

- Use event delegation to track drag start: a single event handler on `document` for `mousedown`.
- If elements are dragged to top/bottom window edges – the page scrolls up/down to allow further dragging.
- There is no horizontal scroll (this makes the task a bit simpler, adding it is easy).
- Draggable elements or their parts should never leave the window, even after swift mouse moves.

The demo is too big to fit it here, so here’s the link.

[Demo in new window](https://en.js.cx/task/drag-heroes/solution/)

[Open a sandbox for the task.](https://plnkr.co/edit/lAng5DJhG41lE78n?p=preview)

solution

To drag the element we can use `position:fixed`, it makes coordinates easier to manage. At the end we should switch it back to `position:absolute` to lay the element into the document.

When coordinates are at window top/bottom, we use `window.scrollTo` to scroll it.

More details in the code, in comments.

[Open the solution in a sandbox.](https://plnkr.co/edit/KxqImMT4P0ySjN97?p=preview)
