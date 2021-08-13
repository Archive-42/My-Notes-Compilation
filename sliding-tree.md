EN

langs\_\_title">عربي</span></a>

- <a href="sliding-tree.html"
  /sliding-tree"
  /sliding-tree"
  sliding-treesliding-tree"

<!-- -->

- <a href="https://ko.javascript.info/"
  sliding-tree"
- <a href="https://tr.javascript.info/"
  sliding-tree"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsliding-tree"%2Fsliding-tree" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../event-delegation.html" Event delegation</span></a>

<a href="../event-delegation.html"

## Tree menu

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a tree that shows/hides node children on click:

Requirements:

- Only one event handler (use delegation)
- A click outside the node title (on an empty space) should not do anything.

[Open a sandbox for the task.](https://plnkr.co/edit/zQFuLhTPX4lkrokp?p=preview)

solution

The solution has two parts.

1.  Wrap every tree node title into `<span>`. Then we can CSS-style them on `:hover` and handle clicks exactly on text, because `<span>` width is exactly the text width (unlike without it).
2.  Set a handler to the `tree` root node and handle clicks on that `<span>` titles.

[Open the solution in a sandbox.](https://plnkr.co/edit/efPMXY7fSzxUXW5H?p=preview)
