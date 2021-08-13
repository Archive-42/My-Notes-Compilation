EN

- <a href="https://ar.javascript.info/"
- <a href="animate-logo-css.html"
  animate-logo-css"

animate-logo-cssanimate-logo-css"

<!-- -->

animate-logo-css"
/animate-logo-css"
/animate-logo-css"
ask/animate-logo-css"k%2Fanimate-logo-css"%2Fanimate-logo-css" </a>

<a href="../animation.html" Animation</span></a>

<a href="../css-animations.html" CSS-animations</span></a>

<a href="../css-animations.html"

## Animate a plane (CSS)

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Show the animation like on the picture below (click the plane):

- The picture grows on click from `40x24px` to `400x240px` (10 times larger).
- The animation takes 3 seconds.
- At the end output: “Done!”.
- During the animation process, there may be more clicks on the plane. They shouldn’t “break” anything.

[Open a sandbox for the task.](https://plnkr.co/edit/Lj9szlcP8lRxn5pC?p=preview)

solution

CSS to animate both `width` and `height`:

    /* original class */

    #flyjet {
      transition: all 3s;
    }

    /* JS adds .growing */
    #flyjet.growing {
      width: 400px;
      height: 240px;
    }

Please note that `transitionend` triggers two times – once for every property. So if we don’t perform an additional check then the message would show up 2 times.

[Open the solution in a sandbox.](https://plnkr.co/edit/k5YmImynpIdmj2OK?p=preview)
