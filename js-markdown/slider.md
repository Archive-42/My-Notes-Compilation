EN

langs\_\_title">عربي</span></a>

- <a href="slider.html"
  /slider"
  /slider"
  sliderslider"

<!-- -->

- /"
  slider"
  /slider"
  slider"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fslider"%2Fslider" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../event-details.html" UI Events</span></a>

<a href="../mouse-drag-and-drop.html" Drag'n'Drop with mouse events</span></a>

<a href="../mouse-drag-and-drop.html"

## Slider

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a slider:

Drag the blue thumb with the mouse and move it.

Important details:

- When the mouse button is pressed, during the dragging the mouse may go over or below the slider. The slider will still work (convenient for the user).
- If the mouse moves very fast to the left or to the right, the thumb should stop exactly at the edge.

[Open a sandbox for the task.](https://plnkr.co/edit/p7Ag21yFCKk3iLFe?p=preview)

solution

As we can see from HTML/CSS, the slider is a `<div>` with a colored background, that contains a runner – another `<div>` with `position:relative`.

To position the runner we use `position:relative`, to provide the coordinates relative to its parent, here it’s more convenient here than `position:absolute`.

Then we implement horizontal-only Drag’n’Drop with limitation by width.

[Open the solution in a sandbox.](https://plnkr.co/edit/zYSBv9zIaLpa3rQr?p=preview)
