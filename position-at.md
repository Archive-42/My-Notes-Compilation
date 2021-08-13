position-at"

- <a href="position-at.html"
  /position-at"
  /position-at"
  position-atposition-at"

<!-- -->

- <a href="https://ko.javascript.info/"
  position-at"
  /position-at"
  position-at"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fposition-at"%2Fposition-at" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../coordinates.html" Coordinates</span></a>

<a href="../coordinates.html"

## Show a note near the element

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
