EN

- <a href="https://ar.javascript.info/"
- <a href="mouse-drag-and-drop.html"
- <a href="https://es.javascript.info/mouse-drag-and-drop"
- <a href="https://fr.javascript.info/mouse-drag-and-drop"
- mouse-drag-and-drop"
  mouse-drag-and-drop"

<!-- -->

- <a href="https://ko.javascript.info/mouse-drag-and-drop"
- <a href=mouse-drag-and-drop"
- <a href="https://tr.javascript.info/mouse-drag-and-drop"
- <a href="https://zh.javascript.info/mouse-drag-and-drop"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmouse-drag-and-drop" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmouse-drag-and-drop" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="event-details.html" UI Events</span></a></span>

25th March 2021

# Drag'n'Drop with mouse events

Drag’n’Drop is a great interface solution. Taking something and dragging and dropping it is a clear and simple way to do many things, from copying and moving documents (as in file managers) to ordering (dropping items into a cart).

In the modern HTML standard there’s a [section about Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) with special events such as `dragstart`, `dragend`, and so on.

These events allow us to support special kinds of drag’n’drop, such as handling dragging a file from OS file-manager and dropping it into the browser window. Then JavaScript can access the contents of such files.

But native Drag Events also have limitations. For instance, we can’t prevent dragging from a certain area. Also we can’t make the dragging “horizontal” or “vertical” only. And there are many other drag’n’drop tasks that can’t be done using them. Also, mobile device support for such events is very weak.

So here we’ll see how to implement Drag’n’Drop using mouse events.

## <a href="mouse-drag-and-drop.html#drag-n-drop-algorithm" id="drag-n-drop-algorithm" class="main__anchor">Drag’n’Drop algorithm</a>

The basic Drag’n’Drop algorithm looks like this:

1.  On `mousedown` – prepare the element for moving, if needed (maybe create a clone of it, add a class to it or whatever).
2.  Then on `mousemove` move it by changing `left/top` with `position:absolute`.
3.  On `mouseup` – perform all actions related to finishing the drag’n’drop.

These are the basics. Later we’ll see how to other features, such as highlighting current underlying elements while we drag over them.

Here’s the implementation of dragging a ball:

    ball.onmousedown = function(event) {
      // (1) prepare to moving: make absolute and on top by z-index
      ball.style.position = 'absolute';
      ball.style.zIndex = 1000;

      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(ball);

      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
        ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
      }

      // move our absolutely positioned ball under the pointer
      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      // (2) move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);

      // (3) drop the ball, remove unneeded handlers
      ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
      };

    };

If we run the code, we can notice something strange. On the beginning of the drag’n’drop, the ball “forks”: we start dragging its “clone”.

Here’s an example in action:

Try to drag’n’drop with the mouse and you’ll see such behavior.

That’s because the browser has its own drag’n’drop support for images and some other elements. It runs automatically and conflicts with ours.

To disable it:

    ball.ondragstart = function() {
      return false;
    };

Now everything will be all right.

In action:

Another important aspect – we track `mousemove` on `document`, not on `ball`. From the first sight it may seem that the mouse is always over the ball, and we can put `mousemove` on it.

But as we remember, `mousemove` triggers often, but not for every pixel. So after swift move the pointer can jump from the ball somewhere in the middle of document (or even outside of the window).

So we should listen on `document` to catch it.

## <a href="mouse-drag-and-drop.html#correct-positioning" id="correct-positioning" class="main__anchor">Correct positioning</a>

In the examples above the ball is always moved so, that it’s center is under the pointer:

    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';

Not bad, but there’s a side-effect. To initiate the drag’n’drop, we can `mousedown` anywhere on the ball. But if “take” it from its edge, then the ball suddenly “jumps” to become centered under the mouse pointer.

It would be better if we keep the initial shift of the element relative to the pointer.

For instance, if we start dragging by the edge of the ball, then the pointer should remain over the edge while dragging.

<figure><img src="article/mouse-drag-and-drop/ball_shift.svg" width="149" height="133" /></figure>Let’s update our algorithm:

1.  When a visitor presses the button (`mousedown`) – remember the distance from the pointer to the left-upper corner of the ball in variables `shiftX/shiftY`. We’ll keep that distance while dragging.

    To get these shifts we can substract the coordinates:

        // onmousedown
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;

2.  Then while dragging we position the ball on the same shift relative to the pointer, like this:

        // onmousemove
        // ball has position:absolute
        ball.style.left = event.pageX - shiftX + 'px';
        ball.style.top = event.pageY - shiftY + 'px';

The final code with better positioning:

    ball.onmousedown = function(event) {

      let shiftX = event.clientX - ball.getBoundingClientRect().left;
      let shiftY = event.clientY - ball.getBoundingClientRect().top;

      ball.style.position = 'absolute';
      ball.style.zIndex = 1000;
      document.body.append(ball);

      moveAt(event.pageX, event.pageY);

      // moves the ball at (pageX, pageY) coordinates
      // taking initial shifts into account
      function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      // move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);

      // drop the ball, remove unneeded handlers
      ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
      };

    };

    ball.ondragstart = function() {
      return false;
    };

In action (inside `<iframe>`):

The difference is especially noticeable if we drag the ball by its right-bottom corner. In the previous example the ball “jumps” under the pointer. Now it fluently follows the pointer from the current position.

## <a href="mouse-drag-and-drop.html#potential-drop-targets-droppables" id="potential-drop-targets-droppables" class="main__anchor">Potential drop targets (droppables)</a>

In previous examples the ball could be dropped just “anywhere” to stay. In real-life we usually take one element and drop it onto another. For instance, a “file” into a “folder” or something else.

Speaking abstract, we take a “draggable” element and drop it onto “droppable” element.

We need to know:

- where the element was dropped at the end of Drag’n’Drop – to do the corresponding action,
- and, preferably, know the droppable we’re dragging over, to highlight it.

The solution is kind-of interesting and just a little bit tricky, so let’s cover it here.

What may be the first idea? Probably to set `mouseover/mouseup` handlers on potential droppables?

But that doesn’t work.

The problem is that, while we’re dragging, the draggable element is always above other elements. And mouse events only happen on the top element, not on those below it.

For instance, below are two `<div>` elements, red one on top of the blue one (fully covers). There’s no way to catch an event on the blue one, because the red is on top:

<a href="mouse-drag-and-drop.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="mouse-drag-and-drop.html#"

    <style>
      div {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
      }
    </style>
    <div style="background:blue" onmouseover="alert('never works')"></div>
    <div style="background:red" onmouseover="alert('over red!')"></div>

The same with a draggable element. The ball is always on top over other elements, so events happen on it. Whatever handlers we set on lower elements, they won’t work.

That’s why the initial idea to put handlers on potential droppables doesn’t work in practice. They won’t run.

So, what to do?

There’s a method called `document.elementFromPoint(clientX, clientY)`. It returns the most nested element on given window-relative coordinates (or `null` if given coordinates are out of the window).

We can use it in any of our mouse event handlers to detect the potential droppable under the pointer, like this:

    // in a mouse event handler
    ball.hidden = true; // (*) hide the element that we drag

    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    // elemBelow is the element below the ball, may be droppable

    ball.hidden = false;

Please note: we need to hide the ball before the call `(*)`. Otherwise we’ll usually have a ball on these coordinates, as it’s the top element under the pointer: `elemBelow=ball`. So we hide it and immediately show again.

We can use that code to check what element we’re “flying over” at any time. And handle the drop when it happens.

An extended code of `onMouseMove` to find “droppable” elements:

    // potential droppable that we're flying over right now
    let currentDroppable = null;

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      ball.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;

      // mousemove events may trigger out of the window (when the ball is dragged off-screen)
      // if clientX/clientY are out of the window, then elementFromPoint returns null
      if (!elemBelow) return;

      // potential droppables are labeled with the class "droppable" (can be other logic)
      let droppableBelow = elemBelow.closest('.droppable');

      if (currentDroppable != droppableBelow) {
        // we're flying in or out...
        // note: both values can be null
        //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
        //   droppableBelow=null if we're not over a droppable now, during this event

        if (currentDroppable) {
          // the logic to process "flying out" of the droppable (remove highlight)
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // the logic to process "flying in" of the droppable
          enterDroppable(currentDroppable);
        }
      }
    }

In the example below when the ball is dragged over the soccer goal, the goal is highlighted.

Result

style.css

index.html

<a href="article/mouse-drag-and-drop/ball4/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/vsRwWmKx1C6jIVue?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    #gate {
      cursor: pointer;
      margin-bottom: 100px;
      width: 83px;
      height: 46px;
    }

    #ball {
      cursor: pointer;
      width: 40px;
      height: 40px;
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <p>Drag the ball.</p>

      <img src="https://en.js.cx/clipart/soccer-gate.svg" id="gate" class="droppable">

      <img src="https://en.js.cx/clipart/ball.svg" id="ball">

      <script>
        let currentDroppable = null;

        ball.onmousedown = function(event) {

          let shiftX = event.clientX - ball.getBoundingClientRect().left;
          let shiftY = event.clientY - ball.getBoundingClientRect().top;

          ball.style.position = 'absolute';
          ball.style.zIndex = 1000;
          document.body.append(ball);

          moveAt(event.pageX, event.pageY);

          function moveAt(pageX, pageY) {
            ball.style.left = pageX - shiftX + 'px';
            ball.style.top = pageY - shiftY + 'px';
          }

          function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            ball.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            ball.hidden = false;

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable != droppableBelow) {
              if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(currentDroppable);
              }
              currentDroppable = droppableBelow;
              if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                enterDroppable(currentDroppable);
              }
            }
          }

          document.addEventListener('mousemove', onMouseMove);

          ball.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            ball.onmouseup = null;
          };

        };

        function enterDroppable(elem) {
          elem.style.background = 'pink';
        }

        function leaveDroppable(elem) {
          elem.style.background = '';
        }

        ball.ondragstart = function() {
          return false;
        };
      </script>


    </body>
    </html>

Now we have the current “drop target”, that we’re flying over, in the variable `currentDroppable` during the whole process and can use it to highlight or any other stuff.

## <a href="mouse-drag-and-drop.html#summary" id="summary" class="main__anchor">Summary</a>

We considered a basic Drag’n’Drop algorithm.

The key components:

1.  Events flow: `ball.mousedown` → `document.mousemove` → `ball.mouseup` (don’t forget to cancel native `ondragstart`).
2.  At the drag start – remember the initial shift of the pointer relative to the element: `shiftX/shiftY` and keep it during the dragging.
3.  Detect droppable elements under the pointer using `document.elementFromPoint`.

We can lay a lot on this foundation.

- On `mouseup` we can intellectually finalize the drop: change data, move elements around.
- We can highlight the elements we’re flying over.
- We can limit dragging by a certain area or direction.
- We can use event delegation for `mousedown/up`. A large-area event handler that checks `event.target` can manage Drag’n’Drop for hundreds of elements.
- And so on.

There are frameworks that build architecture over it: `DragZone`, `Droppable`, `Draggable` and other classes. Most of them do the similar stuff to what’s described above, so it should be easy to understand them now. Or roll your own, as you can see that that’s easy enough to do, sometimes easier than adapting a third-party solution.

## <a href="mouse-drag-and-drop.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="mouse-drag-and-drop.html#slider" id="slider" class="main__anchor">Slider</a>

<a href="task/slider.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a slider:

Drag the blue thumb with the mouse and move it.

Important details:

- When the mouse button is pressed, during the dragging the mouse may go over or below the slider. The slider will still work (convenient for the user).
- If the mouse moves very fast to the left or to the right, the thumb should stop exactly at the edge.

[Open a sandbox for the task.](https://plnkr.co/edit/p7Ag21yFCKk3iLFe?p=preview)

solution

As we can see from HTML/CSS, the slider is a `<div>` with a colored background, that contains a runner – another `<div>` with `position:relative`.

To position the runner we use `position:relative`, to provide the coordinates relative to its parent, here it’s more convenient here than `position:absolute`.

Then we implement horizontal-only Drag’n’Drop with limitation by width.

[Open the solution in a sandbox.](https://plnkr.co/edit/zYSBv9zIaLpa3rQr?p=preview)

### <a href="mouse-drag-and-drop.html#drag-superheroes-around-the-field" id="drag-superheroes-around-the-field" class="main__anchor">Drag superheroes around the field</a>

<a href="task/drag-heroes.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

This task can help you to check understanding of several aspects of Drag’n’Drop and DOM.

Make all elements with class `draggable` – draggable. Like a ball in the chapter.

Requirements:

- Use event delegation to track drag start: a single event handler on `document` for `mousedown`.
- If elements are dragged to top/bottom window edges – the page scrolls up/down to allow further dragging.
- There is no horizontal scroll (this makes the task a bit simpler, adding it is easy).
- Draggable elements or their parts should never leave the window, even after swift mouse moves.

The demo is too big to fit it here, so here’s the link.

[Demo in new window](https://en.js.cx/task/drag-heroes/solution/)

[Open a sandbox for the task.](https://plnkr.co/edit/lAng5DJhG41lE78n?p=preview)

solution

To drag the element we can use `position:fixed`, it makes coordinates easier to manage. At the end we should switch it back to `position:absolute` to lay the element into the document.

When coordinates are at window top/bottom, we use `window.scrollTo` to scroll it.

More details in the code, in comments.

[Open the solution in a sandbox.](https://plnkr.co/edit/KxqImMT4P0ySjN97?p=preview)

<a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="pointer-events.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmouse-drag-and-drop" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmouse-drag-and-drop" </a>

<a href="tutorial/map.html" class="map">

## <a href="mouse-drag-and-drop.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="event-details.html" class="sidebar__link">UI Events</a>

#### Lesson navigation

- <a href="mouse-drag-and-drop.html#drag-n-drop-algorithm" class="sidebar__link">Drag’n’Drop algorithm</a>
- <a href="mouse-drag-and-drop.html#correct-positioning" class="sidebar__link">Correct positioning</a>
- <a href="mouse-drag-and-drop.html#potential-drop-targets-droppables" class="sidebar__link">Potential drop targets (droppables)</a>
- <a href="mouse-drag-and-drop.html#summary" class="sidebar__link">Summary</a>

- <a href="mouse-drag-and-drop.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="mouse-drag-and-drop.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fmouse-drag-and-drop" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmouse-drag-and-drop" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/3-event-details/4-mouse-drag-and-drop" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
