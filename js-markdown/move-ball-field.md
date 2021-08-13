EN

langs\_\_title">عربي</span></a>

- <a href="move-ball-field.html"
  /move-ball-field"

move-ball-fieldmove-ball-field"

<!-- -->

- /"
  move-ball-field"
- <a href="https://tr.javascript.info/"
  move-ball-field"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmove-ball-field"%2Fmove-ball-field" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../introduction-browser-events.html" Introduction to browser events</span></a>

<a href="../introduction-browser-events.html"

## Move the ball across the field

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Move the ball across the field to a click. Like this:

<a href="https://en.js.cx/task/move-ball-field/solution/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

Requirements:

- The ball center should come exactly under the pointer on click (if possible without crossing the field edge).
- CSS-animation is welcome.
- The ball must not cross field boundaries.
- When the page is scrolled, nothing should break.

Notes:

- The code should also work with different ball and field sizes, not be bound to any fixed values.
- Use properties `event.clientX/event.clientY` for click coordinates.

[Open a sandbox for the task.](https://plnkr.co/edit/yi6xXY3XkYDiZbeD?p=preview)

solution

First we need to choose a method of positioning the ball.

We can’t use `position:fixed` for it, because scrolling the page would move the ball from the field.

So we should use `position:absolute` and, to make the positioning really solid, make `field` itself positioned.

Then the ball will be positioned relatively to the field:

    #field {
      width: 200px;
      height: 150px;
      position: relative;
    }

    #ball {
      position: absolute;
      left: 0; /* relative to the closest positioned ancestor (field) */
      top: 0;
      transition: 1s all; /* CSS animation for left/top makes the ball fly */
    }

Next we need to assign the correct `ball.style.left/top`. They contain field-relative coordinates now.

Here’s the picture:

<figure><img src="move-ball-field/move-ball-coords.svg" width="521" height="330" /></figure>We have `event.clientX/clientY` – window-relative coordinates of the click.

To get field-relative `left` coordinate of the click, we can substract the field left edge and the border width:

    let left = event.clientX - fieldCoords.left - field.clientLeft;

Normally, `ball.style.left` means the “left edge of the element” (the ball). So if we assign that `left`, then the ball edge, not center, would be under the mouse cursor.

We need to move the ball half-width left and half-height up to make it center.

So the final `left` would be:

    let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;

The vertical coordinate is calculated using the same logic.

Please note that the ball width/height must be known at the time we access `ball.offsetWidth`. Should be specified in HTML or CSS.

[Open the solution in a sandbox.](https://plnkr.co/edit/8dwHzsyytfPDr08F?p=preview)
