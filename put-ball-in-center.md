EN

langs\_\_title">عربي</span></a>

- <a href="put-ball-in-center.html"
  /put-ball-in-center"
  /put-ball-in-center"
  put-ball-in-centerput-ball-in-center"

<!-- -->

- <a href="https://ko.javascript.info/"
  put-ball-in-center"
- <a href="https://tr.javascript.info/"
  put-ball-in-center"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fput-ball-in-center"%2Fput-ball-in-center" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../size-and-scroll.html" Element size and scrolling</span></a>

<a href="../size-and-scroll.html"

## Place the ball in the field center

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here’s how the source document looks:

<a href="https://en.js.cx/task/put-ball-in-center/source/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/xkru9S3bh1Ihfr9y?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

What are coordinates of the field center?

Calculate them and use to place the ball into the center of the green field:

- The element should be moved by JavaScript, not CSS.
- The code should work with any ball size (`10`, `20`, `30` pixels) and any field size, not be bound to the given values.

P.S. Sure, centering could be done with CSS, but here we want exactly JavaScript. Further we’ll meet other topics and more complex situations when JavaScript must be used. Here we do a “warm-up”.

[Open a sandbox for the task.](https://plnkr.co/edit/xkru9S3bh1Ihfr9y?p=preview)

solution

The ball has `position:absolute`. It means that its `left/top` coordinates are measured from the nearest positioned element, that is `#field` (because it has `position:relative`).

The coordinates start from the inner left-upper corner of the field:

<figure><img src="put-ball-in-center/field.svg" width="233" height="156" /></figure>The inner field width/height is `clientWidth/clientHeight`. So the field center has coordinates `(clientWidth/2, clientHeight/2)`.

…But if we set `ball.style.left/top` to such values, then not the ball as a whole, but the left-upper edge of the ball would be in the center:

    ball.style.left = Math.round(field.clientWidth / 2) + 'px';
    ball.style.top = Math.round(field.clientHeight / 2) + 'px';

Here’s how it looks:

To align the ball center with the center of the field, we should move the ball to the half of its width to the left and to the half of its height to the top:

    ball.style.left = Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
    ball.style.top = Math.round(field.clientHeight / 2 - ball.offsetHeight / 2) + 'px';

Now the ball is finally centered.

<span class="important__type">Attention: the pitfall!</span>

The code won’t work reliably while `<img>` has no width/height:

    <img src="ball.png" id="ball">

When the browser does not know the width/height of an image (from tag attributes or CSS), then it assumes them to equal `0` until the image finishes loading.

So the value of `ball.offsetWidth` will be `0` until the image loads. That leads to wrong coordinates in the code above.

After the first load, the browser usually caches the image, and on reloads it will have the size immediately. But on the first load the value of `ball.offsetWidth` is `0`.

We should fix that by adding `width/height` to `<img>`:

    <img src="ball.png" width="40" height="40" id="ball">

…Or provide the size in CSS:

    #ball {
      width: 40px;
      height: 40px;
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/Tthd4Zdyvyxku03K?p=preview)
