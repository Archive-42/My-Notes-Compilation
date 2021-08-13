EN

langs\_\_title">عربي</span></a>

- <a href="keyboard-mouse.html"
- <a href="https://es.javascript.info/"
  /keyboard-mouse"
  keyboard-mousekeyboard-mouse"

<!-- -->

keyboard-mouse"
keyboard-mouse"

- <a href="https://tr.javascript.info/"
  keyboard-mouse"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fkeyboard-mouse"%2Fkeyboard-mouse" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../forms-controls.html" Forms, controls</span></a>

<a href="../focus-blur.html" Focusing: focus/blur</span></a>

<a href="../focus-blur.html"

## Keyboard-driven mouse

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Focus on the mouse. Then use arrow keys to move it:

[Demo in new window](https://en.js.cx/task/keyboard-mouse/solution/)

P.S. Don’t put event handlers anywhere except the `#mouse` element.

P.P.S. Don’t modify HTML/CSS, the approach should be generic and work with any element.

[Open a sandbox for the task.](https://plnkr.co/edit/mWShSzKepRZFzHVn?p=preview)

solution

We can use `mouse.onclick` to handle the click and make the mouse “moveable” with `position:fixed`, then `mouse.onkeydown` to handle arrow keys.

The only pitfall is that `keydown` only triggers on elements with focus. So we need to add `tabindex` to the element. As we’re forbidden to change HTML, we can use `mouse.tabIndex` property for that.

P.S. We also can replace `mouse.onclick` with `mouse.onfocus`.

[Open the solution in a sandbox.](https://plnkr.co/edit/qlu8VmYgpt7qZc98?p=preview)
