EN

- <a href="https://ar.javascript.info/"
- <a href="animate-ball-hops.html"
  animate-ball-hops"

animate-ball-hopsanimate-ball-hops"

<!-- -->

- <a href="https://ko.javascript.info/"
  /animate-ball-hops"
- <a href="https://tr.javascript.info/"
  ask/animate-ball-hops"k%2Fanimate-ball-hops"%2Fanimate-ball-hops" </a>

<a href="../animation.html" Animation</span></a>

<a href="../js-animation.html" JavaScript animations</span></a>

<a href="../js-animation.html"

## Animate the ball bouncing to the right

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make the ball bounce to the right. Like this:

Write the animation code. The distance to the left is `100px`.

Take the solution of the previous task [Animate the bouncing ball](animate-ball.html) as the source.

solution

In the task [Animate the bouncing ball](animate-ball.html) we had only one property to animate. Now we need one more: `elem.style.left`.

The horizontal coordinate changes by another law: it does not “bounce”, but gradually increases shifting the ball to the right.

We can write one more `animate` for it.

As the time function we could use `linear`, but something like `makeEaseOut(quad)` looks much better.

The code:

    let height = field.clientHeight - ball.clientHeight;
    let width = 100;

    // animate top (bouncing)
    animate({
      duration: 2000,
      timing: makeEaseOut(bounce),
      draw: function(progress) {
        ball.style.top = height * progress + 'px'
      }
    });

    // animate left (moving to the right)
    animate({
      duration: 2000,
      timing: makeEaseOut(quad),
      draw: function(progress) {
        ball.style.left = width * progress + "px"
      }
    });

[Open the solution in a sandbox.](https://plnkr.co/edit/rnGU4RsR71ShA8kE?p=preview)
