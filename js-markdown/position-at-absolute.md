position-at-absolute"

- <a href="position-at-absolute.html"
  /position-at-absolute"
  /position-at-absolute"
  position-at-absoluteposition-at-absolute"

<!-- -->

- /"
  position-at-absolute"
- <a href="https://tr.javascript.info/"
  position-at-absolute"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fposition-at-absolute"%2Fposition-at-absolute" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../coordinates.html" Coordinates</span></a>

<a href="../coordinates.html"

## Show a note near the element (absolute)

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Modify the solution of the [previous task](position-at.html) so that the note uses `position:absolute` instead of `position:fixed`.

That will prevent its “runaway” from the element when the page scrolls.

Take the solution of that task as a starting point. To test the scroll, add the style `<body style="height: 2000px">`.

solution

The solution is actually pretty simple:

- Use `position:absolute` in CSS instead of `position:fixed` for `.note`.
- Use the function [getCoords()](../coordinates.html#getCoords) from the chapter [Coordinates](../coordinates.html) to get document-relative coordinates.

[Open the solution in a sandbox.](https://plnkr.co/edit/IltvUDuUTs6bVjl3?p=preview)
