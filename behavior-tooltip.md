EN

- <a href="https://ar.javascript.info/"
- <a href="behavior-tooltip.html"
  behavior-tooltip"
  /behavior-tooltip"
  behavior-tooltipbehavior-tooltip"

<!-- -->

- <a href="https://ko.javascript.info/"
  /behavior-tooltip"
- <a href="https://tr.javascript.info/"
  ask/behavior-tooltip"k%2Fbehavior-tooltip"%2Fbehavior-tooltip" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../event-delegation.html" Event delegation</span></a>

<a href="../event-delegation.html"

## Tooltip behavior

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create JS-code for the tooltip behavior.

When a mouse comes over an element with `data-tooltip`, the tooltip should appear over it, and when it’s gone then hide.

An example of annotated HTML:

    <button data-tooltip="the tooltip is longer than the element">Short button</button>
    <button data-tooltip="HTML<br>tooltip">One more button</button>

Should work like this:

In this task we assume that all elements with `data-tooltip` have only text inside. No nested tags (yet).

Details:

- The distance between the element and the tooltip should be `5px`.
- The tooltip should be centered relative to the element, if possible.
- The tooltip should not cross window edges. Normally it should be above the element, but if the element is at the page top and there’s no space for the tooltip, then below it.
- The tooltip content is given in the `data-tooltip` attribute. It can be arbitrary HTML.

You’ll need two events here:

- `mouseover` triggers when a pointer comes over an element.
- `mouseout` triggers when a pointer leaves an element.

Please use event delegation: set up two handlers on `document` to track all “overs” and “outs” from elements with `data-tooltip` and manage tooltips from there.

After the behavior is implemented, even people unfamiliar with JavaScript can add annotated elements.

P.S. Only one tooltip may show up at a time.

[Open a sandbox for the task.](https://plnkr.co/edit/qzyeY4q7GxRXgqc2?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/YkcXZKcB8AUpLuZN?p=preview)
