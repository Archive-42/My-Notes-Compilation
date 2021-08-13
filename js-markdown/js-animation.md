EN

langs\_\_title">عربي</span></a>

- <a href="js-animation.html"
- <a href="https://es.javascript.info/js-animation"

- <a href="https://it.javascript.info/js-animation"
  js-animation"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=js-animation"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/js-animation"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fjs-animation" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fjs-animation" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="animation.html" Animation</span></a></span>

5th December 2020

# JavaScript animations

JavaScript animations can handle things that CSS can’t.

For instance, moving along a complex path, with a timing function different from Bezier curves, or an animation on a canvas.

## <a href="js-animation.html#using-setinterval" id="using-setinterval" class="main__anchor">Using setInterval</a>

An animation can be implemented as a sequence of frames – usually small changes to HTML/CSS properties.

For instance, changing `style.left` from `0px` to `100px` moves the element. And if we increase it in `setInterval`, changing by `2px` with a tiny delay, like 50 times per second, then it looks smooth. That’s the same principle as in the cinema: 24 frames per second is enough to make it look smooth.

The pseudo-code can look like this:

    let timer = setInterval(function() {
      if (animation complete) clearInterval(timer);
      else increase style.left by 2px
    }, 20); // change by 2px every 20ms, about 50 frames per second

More complete example of the animation:

    let start = Date.now(); // remember start time

    let timer = setInterval(function() {
      // how much time passed from the start?
      let timePassed = Date.now() - start;

      if (timePassed >= 2000) {
        clearInterval(timer); // finish the animation after 2 seconds
        return;
      }

      // draw the animation at the moment timePassed
      draw(timePassed);

    }, 20);

    // as timePassed goes from 0 to 2000
    // left gets values from 0px to 400px
    function draw(timePassed) {
      train.style.left = timePassed / 5 + 'px';
    }

Click for the demo:

Result

index.html

<a href="article/js-animation/move/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/jtpeI2A25KZpcYdP?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!DOCTYPE HTML>
    <html>

    <head>
      <style>
        #train {
          position: relative;
          cursor: pointer;
        }
      </style>
    </head>

    <body>

      <img id="train" src="https://js.cx/clipart/train.gif">


      <script>
        train.onclick = function() {
          let start = Date.now();

          let timer = setInterval(function() {
            let timePassed = Date.now() - start;

            train.style.left = timePassed / 5 + 'px';

            if (timePassed > 2000) clearInterval(timer);

          }, 20);
        }
      </script>


    </body>

    </html>

## <a href="js-animation.html#using-requestanimationframe" id="using-requestanimationframe" class="main__anchor">Using requestAnimationFrame</a>

Let’s imagine we have several animations running simultaneously.

If we run them separately, then even though each one has `setInterval(..., 20)`, then the browser would have to repaint much more often than every `20ms`.

That’s because they have different starting time, so “every 20ms” differs between different animations. The intervals are not aligned. So we’ll have several independent runs within `20ms`.

In other words, this:

    setInterval(function() {
      animate1();
      animate2();
      animate3();
    }, 20)

…Is lighter than three independent calls:

    setInterval(animate1, 20); // independent animations
    setInterval(animate2, 20); // in different places of the script
    setInterval(animate3, 20);

These several independent redraws should be grouped together, to make the redraw easier for the browser and hence load less CPU load and look smoother.

There’s one more thing to keep in mind. Sometimes CPU is overloaded, or there are other reasons to redraw less often (like when the browser tab is hidden), so we really shouldn’t run it every `20ms`.

But how do we know about that in JavaScript? There’s a specification [Animation timing](http://www.w3.org/TR/animation-timing/) that provides the function `requestAnimationFrame`. It addresses all these issues and even more.

The syntax:

    let requestId = requestAnimationFrame(callback)

That schedules the `callback` function to run in the closest time when the browser wants to do animation.

If we do changes in elements in `callback` then they will be grouped together with other `requestAnimationFrame` callbacks and with CSS animations. So there will be one geometry recalculation and repaint instead of many.

The returned value `requestId` can be used to cancel the call:

    // cancel the scheduled execution of callback
    cancelAnimationFrame(requestId);

The `callback` gets one argument – the time passed from the beginning of the page load in microseconds. This time can also be obtained by calling [performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now).

Usually `callback` runs very soon, unless the CPU is overloaded or the laptop battery is almost discharged, or there’s another reason.

The code below shows the time between first 10 runs for `requestAnimationFrame`. Usually it’s 10-20ms:

<a href="js-animation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="js-animation.html#"

    <script>
      let prev = performance.now();
      let times = 0;

      requestAnimationFrame(function measure(time) {
        document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
        prev = time;

        if (times++ < 10) requestAnimationFrame(measure);
      })
    </script>

## <a href="js-animation.html#structured-animation" id="structured-animation" class="main__anchor">Structured animation</a>

Now we can make a more universal animation function based on `requestAnimationFrame`:

    function animate({timing, draw, duration}) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction)

        draw(progress); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }

      });
    }

Function `animate` accepts 3 parameters that essentially describes the animation:

`duration`  
Total time of animation. Like, `1000`.

`timing(timeFraction)`  
Timing function, like CSS-property `transition-timing-function` that gets the fraction of time that passed (`0` at start, `1` at the end) and returns the animation completion (like `y` on the Bezier curve).

For instance, a linear function means that the animation goes on uniformly with the same speed:

    function linear(timeFraction) {
      return timeFraction;
    }

It’s graph: <img src="article/js-animation/linear.svg" width="234" height="240" />

That’s just like `transition-timing-function: linear`. There are more interesting variants shown below.

`draw(progress)`  
The function that takes the animation completion state and draws it. The value `progress=0` denotes the beginning animation state, and `progress=1` – the end state.

This is that function that actually draws out the animation.

It can move the element:

    function draw(progress) {
      train.style.left = progress + 'px';
    }

…Or do anything else, we can animate anything, in any way.

Let’s animate the element `width` from `0` to `100%` using our function.

Click on the element for the demo:

Result

animate.js

index.html

<a href="article/js-animation/width/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/Yupzn1gOem83bG9J?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    function animate({duration, draw, timing}) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }

      });
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <style>
        progress {
          width: 5%;
        }
      </style>
      <script src="animate.js"></script>
    </head>

    <body>


      <progress id="elem"></progress>

      <script>
        elem.onclick = function() {
          animate({
            duration: 1000,
            timing: function(timeFraction) {
              return timeFraction;
            },
            draw: function(progress) {
              elem.style.width = progress * 100 + '%';
            }
          });
        };
      </script>


    </body>

    </html>

The code for it:

    animate({
      duration: 1000,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        elem.style.width = progress * 100 + '%';
      }
    });

Unlike CSS animation, we can make any timing function and any drawing function here. The timing function is not limited by Bezier curves. And `draw` can go beyond properties, create new elements for like fireworks animation or something.

## <a href="js-animation.html#timing-functions" id="timing-functions" class="main__anchor">Timing functions</a>

We saw the simplest, linear timing function above.

Let’s see more of them. We’ll try movement animations with different timing functions to see how they work.

### <a href="js-animation.html#power-of-n" id="power-of-n" class="main__anchor">Power of n</a>

If we want to speed up the animation, we can use `progress` in the power `n`.

For instance, a parabolic curve:

    function quad(timeFraction) {
      return Math.pow(timeFraction, 2)
    }

The graph:

<figure><img src="article/js-animation/quad.svg" width="234" height="240" /></figure>See in action (click to activate):

<a href="https://en.js.cx/article/js-animation/quad/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

…Or the cubic curve or even greater `n`. Increasing the power makes it speed up faster.

Here’s the graph for `progress` in the power `5`:

<figure><img src="article/js-animation/quint.svg" width="234" height="240" /></figure>In action:

<a href="https://en.js.cx/article/js-animation/quint/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

### <a href="js-animation.html#the-arc" id="the-arc" class="main__anchor">The arc</a>

Function:

    function circ(timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction));
    }

The graph:

<figure><img src="article/js-animation/circ.svg" width="234" height="240" /></figure><a href="https://en.js.cx/article/js-animation/circ/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

### <a href="js-animation.html#back-bow-shooting" id="back-bow-shooting" class="main__anchor">Back: bow shooting</a>

This function does the “bow shooting”. First we “pull the bowstring”, and then “shoot”.

Unlike previous functions, it depends on an additional parameter `x`, the “elasticity coefficient”. The distance of “bowstring pulling” is defined by it.

The code:

    function back(x, timeFraction) {
      return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
    }

**The graph for `x = 1.5`:**

<figure><img src="article/js-animation/back.svg" width="234" height="240" /></figure>For animation we use it with a specific value of `x`. Example for `x = 1.5`:

<a href="https://en.js.cx/article/js-animation/back/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

### <a href="js-animation.html#bounce" id="bounce" class="main__anchor">Bounce</a>

Imagine we are dropping a ball. It falls down, then bounces back a few times and stops.

The `bounce` function does the same, but in the reverse order: “bouncing” starts immediately. It uses few special coefficients for that:

    function bounce(timeFraction) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    }

In action:

<a href="https://en.js.cx/article/js-animation/bounce/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

### <a href="js-animation.html#elastic-animation" id="elastic-animation" class="main__anchor">Elastic animation</a>

One more “elastic” function that accepts an additional parameter `x` for the “initial range”.

    function elastic(x, timeFraction) {
      return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
    }

**The graph for `x=1.5`:** <img src="article/js-animation/elastic.svg" width="233" height="388" />

In action for `x=1.5`:

<a href="https://en.js.cx/article/js-animation/elastic/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

## <a href="js-animation.html#reversal-ease" id="reversal-ease" class="main__anchor">Reversal: ease\*</a>

So we have a collection of timing functions. Their direct application is called “easeIn”.

Sometimes we need to show the animation in the reverse order. That’s done with the “easeOut” transform.

### <a href="js-animation.html#easeout" id="easeout" class="main__anchor">easeOut</a>

In the “easeOut” mode the `timing` function is put into a wrapper `timingEaseOut`:

    timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)

In other words, we have a “transform” function `makeEaseOut` that takes a “regular” timing function and returns the wrapper around it:

    // accepts a timing function, returns the transformed variant
    function makeEaseOut(timing) {
      return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
      }
    }

For instance, we can take the `bounce` function described above and apply it:

    let bounceEaseOut = makeEaseOut(bounce);

Then the bounce will be not in the beginning, but at the end of the animation. Looks even better:

Result

style.css

index.html

<a href="article/js-animation/bounce-easeout/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/SsqTsJBTOD8dMG33?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    #brick {
      width: 40px;
      height: 20px;
      background: #EE6B47;
      position: relative;
      cursor: pointer;
    }

    #path {
      outline: 1px solid #E8C48E;
      width: 540px;
      height: 20px;
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
      <script src="https://js.cx/libs/animate.js"></script>
    </head>

    <body>


      <div id="path">
        <div id="brick"></div>
      </div>

      <script>
        function makeEaseOut(timing) {
          return function(timeFraction) {
            return 1 - timing(1 - timeFraction);
          }
        }

        function bounce(timeFraction) {
          for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
              return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
          }
        }

        let bounceEaseOut = makeEaseOut(bounce);

        brick.onclick = function() {
          animate({
            duration: 3000,
            timing: bounceEaseOut,
            draw: function(progress) {
              brick.style.left = progress * 500 + 'px';
            }
          });
        };
      </script>


    </body>

    </html>

Here we can see how the transform changes the behavior of the function:

<figure><img src="article/js-animation/bounce-inout.svg" width="234" height="240" /></figure>If there’s an animation effect in the beginning, like bouncing – it will be shown at the end.

In the graph above the <span style="color:#EE6B47">regular bounce</span> has the red color, and the <span style="color:#62C0DC">easeOut bounce</span> is blue.

- Regular bounce – the object bounces at the bottom, then at the end sharply jumps to the top.
- After `easeOut` – it first jumps to the top, then bounces there.

### <a href="js-animation.html#easeinout" id="easeinout" class="main__anchor">easeInOut</a>

We also can show the effect both in the beginning and the end of the animation. The transform is called “easeInOut”.

Given the timing function, we calculate the animation state like this:

    if (timeFraction <= 0.5) { // first half of the animation
      return timing(2 * timeFraction) / 2;
    } else { // second half of the animation
      return (2 - timing(2 * (1 - timeFraction))) / 2;
    }

The wrapper code:

    function makeEaseInOut(timing) {
      return function(timeFraction) {
        if (timeFraction < .5)
          return timing(2 * timeFraction) / 2;
        else
          return (2 - timing(2 * (1 - timeFraction))) / 2;
      }
    }

    bounceEaseInOut = makeEaseInOut(bounce);

In action, `bounceEaseInOut`:

Result

style.css

index.html

<a href="article/js-animation/bounce-easeinout/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/Pnmxv6JRtV1QiKm4?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    #brick {
      width: 40px;
      height: 20px;
      background: #EE6B47;
      position: relative;
      cursor: pointer;
    }

    #path {
      outline: 1px solid #E8C48E;
      width: 540px;
      height: 20px;
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
      <script src="https://js.cx/libs/animate.js"></script>
    </head>

    <body>


      <div id="path">
        <div id="brick"></div>
      </div>

      <script>
        function makeEaseInOut(timing) {
          return function(timeFraction) {
            if (timeFraction < .5)
              return timing(2 * timeFraction) / 2;
            else
              return (2 - timing(2 * (1 - timeFraction))) / 2;
          }
        }


        function bounce(timeFraction) {
          for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
              return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
          }
        }

        let bounceEaseInOut = makeEaseInOut(bounce);

        brick.onclick = function() {
          animate({
            duration: 3000,
            timing: bounceEaseInOut,
            draw: function(progress) {
              brick.style.left = progress * 500 + 'px';
            }
          });
        };
      </script>


    </body>

    </html>

The “easeInOut” transform joins two graphs into one: `easeIn` (regular) for the first half of the animation and `easeOut` (reversed) – for the second part.

The effect is clearly seen if we compare the graphs of `easeIn`, `easeOut` and `easeInOut` of the `circ` timing function:

<figure><img src="article/js-animation/circ-ease.svg" width="234" height="240" /></figure>-   <span style="color:#EE6B47">Red</span> is the regular variant of `circ` (`easeIn`).
-   <span style="color:#8DB173">Green</span> – `easeOut`.
-   <span style="color:#62C0DC">Blue</span> – `easeInOut`.

As we can see, the graph of the first half of the animation is the scaled down `easeIn`, and the second half is the scaled down `easeOut`. As a result, the animation starts and finishes with the same effect.

## <a href="js-animation.html#more-interesting-draw" id="more-interesting-draw" class="main__anchor">More interesting “draw”</a>

Instead of moving the element we can do something else. All we need is to write the proper `draw`.

Here’s the animated “bouncing” text typing:

Result

style.css

index.html

<a href="article/js-animation/text/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/DdwXJ1C2XNLB3G5w?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    textarea {
      display: block;
      border: 1px solid #BBB;
      color: #444;
      font-size: 110%;
    }

    button {
      margin-top: 10px;
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
      <script src="https://js.cx/libs/animate.js"></script>
    </head>

    <body>


      <textarea id="textExample" rows="5" cols="60">He took his vorpal sword in hand:
    Long time the manxome foe he sought—
    So rested he by the Tumtum tree,
    And stood awhile in thought.
      </textarea>

      <button onclick="animateText(textExample)">Run the animated typing!</button>

      <script>
        function animateText(textArea) {
          let text = textArea.value;
          let to = text.length,
            from = 0;

          animate({
            duration: 5000,
            timing: bounce,
            draw: function(progress) {
              let result = (to - from) * progress + from;
              textArea.value = text.substr(0, Math.ceil(result))
            }
          });
        }


        function bounce(timeFraction) {
          for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
              return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
          }
        }
      </script>


    </body>

    </html>

## <a href="js-animation.html#summary" id="summary" class="main__anchor">Summary</a>

For animations that CSS can’t handle well, or those that need tight control, JavaScript can help. JavaScript animations should be implemented via `requestAnimationFrame`. That built-in method allows to setup a callback function to run when the browser will be preparing a repaint. Usually that’s very soon, but the exact time depends on the browser.

When a page is in the background, there are no repaints at all, so the callback won’t run: the animation will be suspended and won’t consume resources. That’s great.

Here’s the helper `animate` function to setup most animations:

    function animate({timing, draw, duration}) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);

        draw(progress); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }

      });
    }

Options:

- `duration` – the total animation time in ms.
- `timing` – the function to calculate animation progress. Gets a time fraction from 0 to 1, returns the animation progress, usually from 0 to 1.
- `draw` – the function to draw the animation.

Surely we could improve it, add more bells and whistles, but JavaScript animations are not applied on a daily basis. They are used to do something interesting and non-standard. So you’d want to add the features that you need when you need them.

JavaScript animations can use any timing function. We covered a lot of examples and transformations to make them even more versatile. Unlike CSS, we are not limited to Bezier curves here.

The same is about `draw`: we can animate anything, not just CSS properties.

## <a href="js-animation.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="js-animation.html#animate-the-bouncing-ball" id="animate-the-bouncing-ball" class="main__anchor">Animate the bouncing ball</a>

<a href="task/animate-ball.html" class="task__open-link"></a>

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

### <a href="js-animation.html#animate-the-ball-bouncing-to-the-right" id="animate-the-ball-bouncing-to-the-right" class="main__anchor">Animate the ball bouncing to the right</a>

<a href="task/animate-ball-hops.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make the ball bounce to the right. Like this:

Write the animation code. The distance to the left is `100px`.

Take the solution of the previous task [Animate the bouncing ball](task/animate-ball.html) as the source.

solution

In the task [Animate the bouncing ball](task/animate-ball.html) we had only one property to animate. Now we need one more: `elem.style.left`.

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

<a href="css-animations.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="web-components.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fjs-animation" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fjs-animation" </a>

<a href="tutorial/map.html" class="map">

## <a href="js-animation.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="animation.html" class="sidebar__link">Animation</a>

#### Lesson navigation

- <a href="js-animation.html#using-setinterval" class="sidebar__link">Using setInterval</a>
- <a href="js-animation.html#using-requestanimationframe" class="sidebar__link">Using requestAnimationFrame</a>
- <a href="js-animation.html#structured-animation" class="sidebar__link">Structured animation</a>
- <a href="js-animation.html#timing-functions" class="sidebar__link">Timing functions</a>
- <a href="js-animation.html#reversal-ease" class="sidebar__link">Reversal: ease\*</a>
- <a href="js-animation.html#more-interesting-draw" class="sidebar__link">More interesting “draw”</a>
- <a href="js-animation.html#summary" class="sidebar__link">Summary</a>

- <a href="js-animation.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="js-animation.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fjs-animation" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fjs-animation" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/7-animation/3-js-animation" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
