EN

- <a href="https://ar.javascript.info/"
- <a href="animate-logo-bezier-css.html"
  animate-logo-bezier-css"

animate-logo-bezier-cssanimate-logo-bezier-css"

<!-- -->

- <a href="https://ko.javascript.info/"
  /animate-logo-bezier-css"
  /animate-logo-bezier-css"
  ask/animate-logo-bezier-css"k%2Fanimate-logo-bezier-css"%2Fanimate-logo-bezier-css" </a>

<a href="../animation.html" Animation</span></a>

<a href="../css-animations.html" CSS-animations</span></a>

<a href="../css-animations.html"

## Animate the flying plane (CSS)

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Modify the solution of the previous task [Animate a plane (CSS)](animate-logo-css.html) to make the plane grow more than its original size 400x240px (jump out), and then return to that size.

Here’s how it should look (click on the plane):

Take the solution of the previous task as the source.

solution

We need to choose the right Bezier curve for that animation. It should have `y>1` somewhere for the plane to “jump out”.

For instance, we can take both control points with `y>1`, like: `cubic-bezier(0.25, 1.5, 0.75, 1.5)`.

The graph:

<figure><img src="animate-logo-bezier-css/bezier-up.svg" width="149" height="187" /></figure>[Open the solution in a sandbox.](https://plnkr.co/edit/siJdHAbKzgvoC0j5?p=preview)
