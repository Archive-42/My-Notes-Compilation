EN

- <a href="https://ar.javascript.info/"
- <a href="behavior-nested-tooltip.html"
  behavior-nested-tooltip"

behavior-nested-tooltipbehavior-nested-tooltip"

<!-- -->

- /"
  /behavior-nested-tooltip"
  /behavior-nested-tooltip"
  ask/behavior-nested-tooltip"k%2Fbehavior-nested-tooltip"%2Fbehavior-nested-tooltip" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../event-details.html" UI Events</span></a>

<a href="../mousemove-mouseover-mouseout-mouseenter-mouseleave.html" Moving the mouse: mouseover/out, mouseenter/leave</span></a>

<a href="../mousemove-mouseover-mouseout-mouseenter-mouseleave.html"

## Improved tooltip behavior

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`. The value of this attribute should become the tooltip text.

That’s like the task [Tooltip behavior](behavior-tooltip.html), but here the annotated elements can be nested. The most deeply nested tooltip is shown.

Only one tooltip may show up at the same time.

For instance:

    <div data-tooltip="Here – is the house interior" id="house">
      <div data-tooltip="Here – is the roof" id="roof"></div>
      ...
      <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">Hover over me</a>
    </div>

The result in iframe:

[Open a sandbox for the task.](https://plnkr.co/edit/N8Y84iRZJK3JdVjW?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/Ykgy8Hq2hA92bKxe?p=preview)
