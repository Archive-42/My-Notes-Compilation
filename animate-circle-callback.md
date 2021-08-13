animate-circle-callback"

- <a href="animate-circle-callback.html"
  animate-circle-callback"

animate-circle-callbackanimate-circle-callback"

<!-- -->

- /"
- <a href="
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/"k%2Fanimate-circle-callback"%2Fanimate-circle-callback" </a>

<a href="../animation.html" Animation</span></a>

<a href="../css-animations.html" CSS-animations</span></a>

<a href="../css-animations.html"

## Animated circle with callback

In the task [Animated circle](animate-circle.html) an animated growing circle is shown.

Now let’s say we need not just a circle, but to show a message inside it. The message should appear _after_ the animation is complete (the circle is fully grown), otherwise it would look ugly.

In the solution of the task, the function `showCircle(cx, cy, radius)` draws the circle, but gives no way to track when it’s ready.

Add a callback argument: `showCircle(cx, cy, radius, callback)` to be called when the animation is complete. The `callback` should receive the circle `<div>` as an argument.

Here’s the example:

    showCircle(150, 150, 100, div => {
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });

Demo:

Take the solution of the task [Animated circle](animate-circle.html) as the base.

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/CwXJViltnzVEWbk2?p=preview)
