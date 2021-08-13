EN

- <a href="https://ar.javascript.info/"
- <a href="animate-ball.html"
  animate-ball"

animate-ballanimate-ball"

<!-- -->

animate-ball"
/animate-ball"
/animate-ball"
ask/animate-ball"k%2Fanimate-ball"%2Fanimate-ball" </a>

<a href="../animation.html" Animation</span></a>

<a href="../js-animation.html" JavaScript animations</span></a>

<a href="../js-animation.html"

## Animate the bouncing ball

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make a bouncing ball. Click to see how it should look:

[Open a sandbox for the task.](https://plnkr.co/edit/co0XGJ1r0UGWPZCw?p=preview)

solution

To bounce we can use CSS property `top` and `position:absolute` for the ball inside the field with `position:relative`.

The bottom coordinate of the field is `field.clientHeight`. The CSS `top` property refers to the upper edge of the ball. So it should go from `0` till `field.clientHeight - ball.clientHeight`, that’s the final lowest position of the upper edge of the ball.

To get the “bouncing” effect we can use the timing function `bounce` in `easeOut` mode.

Here’s the final code for the animation:

    let to = field.clientHeight - ball.clientHeight;

    animate({
      duration: 2000,
      timing: makeEaseOut(bounce),
      draw(progress) {
        ball.style.top = to * progress + 'px'
      }
    });

[Open the solution in a sandbox.](https://plnkr.co/edit/ltbXZe5pp7wqNTN6?p=preview)
