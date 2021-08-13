position-inside-absolute"

- <a href="position-inside-absolute.html"
  /position-inside-absolute"
  /position-inside-absolute"
  position-inside-absoluteposition-inside-absolute"

<!-- -->

- <a href="https://ko.javascript.info/"
  position-inside-absolute"
- <a href="https://tr.javascript.info/"
  position-inside-absolute"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fposition-inside-absolute"%2Fposition-inside-absolute" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../coordinates.html" Coordinates</span></a>

<a href="../coordinates.html"

## Position the note inside (absolute)

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Extend the previous task [Show a note near the element (absolute)](position-at-absolute.html): teach the function `positionAt(anchor, position, elem)` to insert `elem` inside the `anchor`.

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

As the source code, take the solution of the task [Show a note near the element (absolute)](position-at-absolute.html).

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/KkS3sLDgUKFy4XUU?p=preview)
