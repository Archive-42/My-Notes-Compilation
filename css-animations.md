EN

- <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="css-animations.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/css-animations" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- css-animations" class="supported-langs**link"><span class="supported-langs**brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/css-animations" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- /css-animations" class="supported-langs**link"><span class="supported-langs**brief">KO</span><span>한국어</span></a>
- <a href="css-animations%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/css-animations" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/css-animations" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<span class="share-icons__title">Share</span>2Fcss-animations" rel="nofollow" &gt;2Fcss-animations عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="animation.html" class="breadcrumbs__link"><span>Animation</span></a></span>

28th June 2021

# CSS-animations

CSS animations make it possible to do simple animations without JavaScript at all.

JavaScript can be used to control CSS animations and make them even better, with little code.

## <a href="css-animations.html#css-transition" id="css-transition" class="main__anchor">CSS transitions</a>

The idea of CSS transitions is simple. We describe a property and how its changes should be animated. When the property changes, the browser paints the animation.

That is, all we need is to change the property, and the fluid transition will be done by the browser.

For instance, the CSS below animates changes of `background-color` for 3 seconds:

    .animated {
      transition-property: background-color;
      transition-duration: 3s;
    }

Now if an element has `.animated` class, any change of `background-color` is animated during 3 seconds.

Click the button below to animate the background:

<a href="css-animations.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="css-animations.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <button id="color">Click me</button>

    <style>
      #color {
        transition-property: background-color;
        transition-duration: 3s;
      }
    </style>

    <script>
      color.onclick = function() {
        this.style.backgroundColor = 'red';
      };
    </script>

There are 4 properties to describe CSS transitions:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

We’ll cover them in a moment, for now let’s note that the common `transition` property allows declaring them together in the order: `property duration timing-function delay`, as well as animating multiple properties at once.

For instance, this button animates both `color` and `font-size`:

<a href="css-animations.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="css-animations.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <button id="growing">Click me</button>

    <style>
    #growing {
      transition: font-size 3s, color 2s;
    }
    </style>

    <script>
    growing.onclick = function() {
      this.style.fontSize = '36px';
      this.style.color = 'red';
    };
    </script>

Now, let’s cover animation properties one by one.

## <a href="css-animations.html#transition-property" id="transition-property" class="main__anchor">transition-property</a>

In `transition-property`, we write a list of properties to animate, for instance: `left`, `margin-left`, `height`, `color`. Or we could write `all`, which means “animate all properties”.

Do note that, there are properties which can not be animated. However, [most of the generally used properties are animatable](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

## <a href="css-animations.html#transition-duration" id="transition-duration" class="main__anchor">transition-duration</a>

In `transition-duration` we can specify how long the animation should take. The time should be in [CSS time format](http://www.w3.org/TR/css3-values/#time): in seconds `s` or milliseconds `ms`.

## <a href="css-animations.html#transition-delay" id="transition-delay" class="main__anchor">transition-delay</a>

In `transition-delay` we can specify the delay _before_ the animation. For instance, if `transition-delay` is `1s` and `transition-duration` is `2s`, then the animation starts 1 second after the property change and the total duration will be 2 seconds.

Negative values are also possible. Then the animation is shown immediately, but the starting point of the animation will be after given value (time). For example, if `transition-delay` is `-1s` and `transition-duration` is `2s`, then animation starts from the halfway point and total duration will be 1 second.

Here the animation shifts numbers from `0` to `9` using CSS `translate` property:

Result

script.js

style.css

index.html

<a href="article/css-animations/digits/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/hNWQCqgJhU7lejdC?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    stripe.onclick = function() {
      stripe.classList.add('animate');
    };

    #digit {
      width: .5em;
      overflow: hidden;
      font: 32px monospace;
      cursor: pointer;
    }

    #stripe {
      display: inline-block
    }

    #stripe.animate {
      transform: translate(-90%);
      transition-property: transform;
      transition-duration: 9s;
      transition-timing-function: linear;
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      Click below to animate:

      <div id="digit"><div id="stripe">0123456789</div></div>

      <script src="script.js"></script>
    </body>

    </html>

The `transform` property is animated like this:

    #stripe.animate {
      transform: translate(-90%);
      transition-property: transform;
      transition-duration: 9s;
    }

In the example above JavaScript adds the class `.animate` to the element – and the animation starts:

    stripe.classList.add('animate');

We could also start it from somewhere in the middle of the transition, from an exact number, e.g. corresponding to the current second, using a negative `transition-delay`.

Here if you click the digit – it starts the animation from the current second:

Result

script.js

style.css

index.html

<a href="article/css-animations/digits-negative-delay/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/HcnkmoAJTGV85tHJ?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    stripe.onclick = function() {
      let sec = new Date().getSeconds() % 10;
      stripe.style.transitionDelay = '-' + sec + 's';
      stripe.classList.add('animate');
    };

    #digit {
      width: .5em;
      overflow: hidden;
      font: 32px monospace;
      cursor: pointer;
    }

    #stripe {
      display: inline-block
    }

    #stripe.animate {
      transform: translate(-90%);
      transition-property: transform;
      transition-duration: 9s;
      transition-timing-function: linear;
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      Click below to animate:
      <div id="digit"><div id="stripe">0123456789</div></div>

      <script src="script.js"></script>
    </body>
    </html>

JavaScript does it with an extra line:

    stripe.onclick = function() {
      let sec = new Date().getSeconds() % 10;
      // for instance, -3s here starts the animation from the 3rd second
      stripe.style.transitionDelay = '-' + sec + 's';
      stripe.classList.add('animate');
    };

## <a href="css-animations.html#transition-timing-function" id="transition-timing-function" class="main__anchor">transition-timing-function</a>

The timing function describes how the animation process is distributed along its timeline. Will it start slowly and then go fast, or vice versa.

It appears to be the most complicated property at first. But it becomes very simple if we devote a bit time to it.

That property accepts two kinds of values: a Bezier curve or steps. Let’s start with the curve, as it’s used more often.

### <a href="css-animations.html#bezier-curve" id="bezier-curve" class="main__anchor">Bezier curve</a>

The timing function can be set as a [Bezier curve](bezier-curve.html) with 4 control points that satisfy the conditions:

1.  First control point: `(0,0)`.
2.  Last control point: `(1,1)`.
3.  For intermediate points, the values of `x` must be in the interval `0..1`, `y` can be anything.

The syntax for a Bezier curve in CSS: `cubic-bezier(x2, y2, x3, y3)`. Here we need to specify only 2nd and 3rd control points, because the 1st one is fixed to `(0,0)` and the 4th one is `(1,1)`.

The timing function describes how fast the animation process goes.

- The `x` axis is the time: `0` – the start, `1` – the end of `transition-duration`.
- The `y` axis specifies the completion of the process: `0` – the starting value of the property, `1` – the final value.

The simplest variant is when the animation goes uniformly, with the same linear speed. That can be specified by the curve `cubic-bezier(0, 0, 1, 1)`.

Here’s how that curve looks:

<figure><img src="article/css-animations/bezier-linear.svg" width="144" height="150" /></figure>…As we can see, it’s just a straight line. As the time (`x`) passes, the completion (`y`) of the animation steadily goes from `0` to `1`.

The train in the example below goes from left to right with the permanent speed (click it):

Result

style.css

index.html

<a href="article/css-animations/train-linear/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/TVoj0Crt0NCuvW0X?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    .train {
      position: relative;
      cursor: pointer;
      width: 177px;
      height: 160px;
      left: 0;
      transition: left 5s cubic-bezier(0, 0, 1, 1);
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <img class="train" src="https://js.cx/clipart/train.gif" onclick="this.style.left='450px'">

    </body>

    </html>

The CSS `transition` is based on that curve:

    .train {
      left: 0;
      transition: left 5s cubic-bezier(0, 0, 1, 1);
      /* click on a train sets left to 450px, thus triggering the animation */
    }

…And how can we show a train slowing down?

We can use another Bezier curve: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

The graph:

<figure><img src="article/css-animations/train-curve.svg" width="149" height="187" /></figure>As we can see, the process starts fast: the curve soars up high, and then slower and slower.

Here’s the timing function in action (click the train):

Result

style.css

index.html

<a href="article/css-animations/train/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/3EbcS9Ownt1LGgRb?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    .train {
      position: relative;
      cursor: pointer;
      width: 177px;
      height: 160px;
      left: 0px;
      transition: left 5s cubic-bezier(0.0, 0.5, 0.5, 1.0);
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <img class="train" src="https://js.cx/clipart/train.gif" onclick="this.style.left='450px'">

    </body>

    </html>

CSS:

    .train {
      left: 0;
      transition: left 5s cubic-bezier(0, .5, .5, 1);
      /* click on a train sets left to 450px, thus triggering the animation */
    }

There are several built-in curves: `linear`, `ease`, `ease-in`, `ease-out` and `ease-in-out`.

The `linear` is a shorthand for `cubic-bezier(0, 0, 1, 1)` – a straight line, which we described above.

Other names are shorthands for the following `cubic-bezier`:

<table><colgroup><col style="width: 25%" /><col style="width: 25%" /><col style="width: 25%" /><col style="width: 25%" /></colgroup><thead><tr class="header"><th><code>ease</code><sup>*</sup></th><th><code>ease-in</code></th><th><code>ease-out</code></th><th><code>ease-in-out</code></th></tr></thead><tbody><tr class="odd"><td><code>(0.25, 0.1, 0.25, 1.0)</code></td><td><code>(0.42, 0, 1.0, 1.0)</code></td><td><code>(0, 0, 0.58, 1.0)</code></td><td><code>(0.42, 0, 0.58, 1.0)</code></td></tr><tr class="even"><td><figure><img src="article/css-animations/ease.svg" width="149" height="187" /></figure></td><td><figure><img src="article/css-animations/ease-in.svg" width="149" height="187" /></figure></td><td><figure><img src="article/css-animations/ease-out.svg" width="149" height="187" /></figure></td><td><figure><img src="article/css-animations/ease-in-out.svg" width="149" height="187" /></figure></td></tr></tbody></table>

`*` – by default, if there’s no timing function, `ease` is used.

So we could use `ease-out` for our slowing down train:

    .train {
      left: 0;
      transition: left 5s ease-out;
      /* same as transition: left 5s cubic-bezier(0, .5, .5, 1); */
    }

But it looks a bit differently.

**A Bezier curve can make the animation exceed its range.**

The control points on the curve can have any `y` coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.

In the example below the animation code is:

    .train {
      left: 100px;
      transition: left 5s cubic-bezier(.5, -1, .5, 2);
      /* click on a train sets left to 450px */
    }

The property `left` should animate from `100px` to `400px`.

But if you click the train, you’ll see that:

- First, the train goes _back_: `left` becomes less than `100px`.
- Then it goes forward, a little bit farther than `400px`.
- And then back again – to `400px`.

Result

style.css

index.html

<a href="article/css-animations/train-over/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/RWFrhdwYUMbhSB96?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    .train {
      position: relative;
      cursor: pointer;
      width: 177px;
      height: 160px;
      left: 100px;
      transition: left 5s cubic-bezier(.5, -1, .5, 2);
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <img class="train" src="https://js.cx/clipart/train.gif" onclick="this.style.left='400px'">

    </body>

    </html>

Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

<figure><img src="article/css-animations/bezier-train-over.svg" width="225" height="331" /></figure>We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made it over `1`, so the curve goes out of the “regular” quadrant. The `y` is out of the “standard” range `0..1`.

As we know, `y` measures “the completion of the animation process”. The value `y = 0` corresponds to the starting property value and `y = 1` – the ending value. So values `y<0` move the property beyond the starting `left` and `y>1` – past the final `left`.

That’s a “soft” variant for sure. If we put `y` values like `-99` and `99` then the train would jump out of the range much more.

But how do we make a Bezier curve for a specific task? There are many tools. For instance, we can do it on the site <http://cubic-bezier.com/>.

### <a href="css-animations.html#steps" id="steps" class="main__anchor">Steps</a>

The timing function `steps(number of steps[, start/end])` allows splitting an transition into multiple steps.

Let’s see that in an example with digits.

Here’s a list of digits, without any animations, just as a source:

Result

style.css

index.html

<a href="article/css-animations/step-list/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/VoTKJ4AgOOaKknZJ?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    #digit {
      border: 1px solid red;
      width: 1.2em;
    }

    #stripe {
      display: inline-block;
      font: 32px monospace;
    }

    <!DOCTYPE html>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <div id="digit"><div id="stripe">0123456789</div></div>

    </body>
    </html>

We’ll make the digits appear in a discrete way by making the part of the list outside of the red “window” invisible and shifting the list to the left with each step.

There will be 9 steps, a step-move for each digit:

    #stripe.animate  {
      transform: translate(-90%);
      transition: transform 9s steps(9, start);
    }

In action:

Result

style.css

index.html

<a href="article/css-animations/step/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/LYbm3oaZknVzXnFJ?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    #digit {
      width: .5em;
      overflow: hidden;
      font: 32px monospace;
      cursor: pointer;
    }

    #stripe {
      display: inline-block
    }

    #stripe.animate {
      transform: translate(-90%);
      transition-property: transform;
      transition-duration: 9s;
      transition-timing-function: steps(9, start);
    }

    <!DOCTYPE html>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      Click below to animate:

      <div id="digit"><div id="stripe">0123456789</div></div>

      <script>
        digit.onclick = function() {
          stripe.classList.add('animate');
        }
      </script>


    </body>

    </html>

The first argument of `steps(9, start)` is the number of steps. The transform will be split into 9 parts (10% each). The time interval is automatically divided into 9 parts as well, so `transition: 9s` gives us 9 seconds for the whole animation – 1 second per digit.

The second argument is one of two words: `start` or `end`.

The `start` means that in the beginning of animation we need to make the first step immediately.

We can observe that during the animation: when we click on the digit it changes to `1` (the first step) immediately, and then changes in the beginning of the next second.

The process is progressing like this:

- `0s` – `-10%` (first change in the beginning of the 1st second, immediately)
- `1s` – `-20%`
- …
- `8s` – `-80%`
- (the last second shows the final value).

The alternative value `end` would mean that the change should be applied not in the beginning, but at the end of each second.

So the process for `steps(9, end)` would go like this:

- `0s` – `0` (during the first second nothing changes)
- `1s` – `-10%` (first change at the end of the 1st second)
- `2s` – `-20%`
- …
- `9s` – `-90%`

Here’s `steps(9, end)` in action (note the pause between the first digit change):

Result

style.css

index.html

<a href="article/css-animations/step-end/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/rZVQXIj2vQ73mvem?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    #digit {
      width: .5em;
      overflow: hidden;
      font: 32px monospace;
      cursor: pointer;
    }

    #stripe {
      display: inline-block
    }

    #stripe.animate {
      transform: translate(-90%);
      transition-property: transform;
      transition-duration: 9s;
      transition-timing-function: steps(9, end);
    }

    <!DOCTYPE html>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      Click below to animate:

      <div id="digit"><div id="stripe">0123456789</div></div>

      <script>
        digit.onclick = function() {
          stripe.classList.add('animate');
        }
      </script>


    </body>

    </html>

There are also shorthand values:

- `step-start` – is the same as `steps(1, start)`. That is, the animation starts immediately and takes 1 step. So it starts and finishes immediately, as if there were no animation.
- `step-end` – the same as `steps(1, end)`: make the animation in a single step at the end of `transition-duration`.

These values are rarely used, because that’s not really animation, but rather a single-step change.

## <a href="css-animations.html#event-transitionend" id="event-transitionend" class="main__anchor">Event transitionend</a>

When the CSS animation finishes the `transitionend` event triggers.

It is widely used to do an action after the animation is done. Also we can join animations.

For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

<a href="https://en.js.cx/article/css-animations/boat/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/zgsC80ZHJeG1Xn8t?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:

    boat.onclick = function() {
      //...
      let times = 1;

      function go() {
        if (times % 2) {
          // sail to the right
          boat.classList.remove('back');
          boat.style.marginLeft = 100 * times + 200 + 'px';
        } else {
          // sail to the left
          boat.classList.add('back');
          boat.style.marginLeft = 100 * times - 200 + 'px';
        }

      }

      go();

      boat.addEventListener('transitionend', function() {
        times++;
        go();
      });
    };

The event object for `transitionend` has a few specific properties:

`event.propertyName`  
The property that has finished animating. Can be good if we animate multiple properties simultaneously.

`event.elapsedTime`  
The time (in seconds) that the animation took, without `transition-delay`.

## <a href="css-animations.html#keyframes" id="keyframes" class="main__anchor">Keyframes</a>

We can join multiple simple animations together using the `@keyframes` CSS rule.

It specifies the “name” of the animation and rules – what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.

Here’s an example with explanations:

<a href="css-animations.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="css-animations.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div class="progress"></div>

    <style>
      @keyframes go-left-right {        /* give it a name: "go-left-right" */
        from { left: 0px; }             /* animate from left: 0px */
        to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
      }

      .progress {
        animation: go-left-right 3s infinite alternate;
        /* apply the animation "go-left-right" to the element
           duration 3 seconds
           number of times: infinite
           alternate direction every time
        */

        position: relative;
        border: 2px solid green;
        width: 50px;
        height: 20px;
        background: lime;
      }
    </style>

There are many articles about `@keyframes` and a [detailed specification](https://drafts.csswg.org/css-animations/).

You probably won’t need `@keyframes` often, unless everything is in constant motion on your sites.

## <a href="css-animations.html#performance" id="performance" class="main__anchor">Performance</a>

Most CSS properties can be animated, because most of them are numeric values. For instance, `width`, `color`, `font-size` are all numbers. When you animate them, the browser gradually changes these numbers frame by frame, creating a smooth effect.

However, not all animations will look as smooth as you’d like, because different CSS properties cost differently to change.

In more technical details, when there’s a style change, the browser goes through 3 steps to render the new look:

1.  **Layout**: re-compute the geometry and position of each element, then
2.  **Paint**: re-compute how everything should look like at their places, including background, colors,
3.  **Composite**: render the final results into pixels on screen, apply CSS transforms if they exist.

During a CSS animation, this process repeats every frame. However, CSS properties that never affect geometry or position, such as `color`, may skip the Layout step. If a `color` changes, the browser doesn’t calculate any new geometry, it goes to Paint → Composite. And there are few properties that directly go to Composite. You can find a longer list of CSS properties and which stages they trigger at <https://csstriggers.com>.

The calculations may take time, especially on pages with many elements and a complex layout. And the delays are actually visible on most devices, leading to “jittery”, less fluid animations.

Animations of properties that skip the Layout step are faster. It’s even better if Paint is skipped too.

The `transform` property is a great choice, because:

- CSS transforms affect the target element box as a whole (rotate, flip, stretch, shift it).
- CSS transforms never affect neighbour elements.

…So browsers apply `transform` “on top” of existing Layout and Paint calculations, in the Composite stage.

In other words, the browser calculates the Layout (sizes, positions), paints it with colors, backgrounds, etc at the Paint stage, and then applies `transform` to element boxes that need it.

Changes (animations) of the `transform` property never trigger Layout and Paint steps. More than that, the browser leverages the graphics accelerator (a special chip on the CPU or graphics card) for CSS transforms, thus making them very effecient.

Luckily, the `transform` property is very powerful. By using `transform` on an element, you could rotate and flip it, stretch and shrink it, move it around, and [much more](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). So instead of `left/margin-left` properties we can use `transform: translateX(…)`, use `transform: scale` for increasing element size, etc.

The `opacity` property also never triggers Layout (also skips Paint in Mozilla Gecko). We can use it for show/hide or fade-in/fade-out effects.

Paring `transform` with `opacity` can usually solve most of our needs, providing fluid, good-looking animations.

For example, here clicking on the `#boat` element adds the class with `transform: translateX(300)` and `opacity: 0`, thus making it move `300px` to the right and disappear:

<a href="css-animations.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="css-animations.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <img src="https://js.cx/clipart/boat.png" id="boat">

    <style>
    #boat {
      cursor: pointer;
      transition: transform 2s ease-in-out, opacity 2s ease-in-out;
    }

    .move {
      transform: translateX(300px);
      opacity: 0;
    }
    </style>
    <script>
      boat.onclick = () => boat.classList.add('move');
    </script>

Here’s a more complex example, with `@keyframes`:

<a href="css-animations.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="css-animations.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
    <style>
      .animated {
        animation: hello-goodbye 1.8s infinite;
        width: fit-content;
      }
      @keyframes hello-goodbye {
        0% {
          transform: translateY(-60px) rotateX(0.7turn);
          opacity: 0;
        }
        50% {
          transform: none;
          opacity: 1;
        }
        100% {
          transform: translateX(230px) rotateZ(90deg) scale(0.5);
          opacity: 0;
        }
      }
    </style>

## <a href="css-animations.html#summary" id="summary" class="main__anchor">Summary</a>

CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.

They are good for most animation tasks. We’re also able to use JavaScript for animations, the next chapter is devoted to that.

Limitations of CSS animations compared to JavaScript animations:

Merits

- Simple things done simply.
- Fast and lightweight for CPU.

Demerits

- JavaScript animations are flexible. They can implement any animation logic, like an “explosion” of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.

In early examples in this chapter, we animate `font-size`, `left`, `width`, `height`, etc. In real life projects, we should use `transform: scale()` and `transform: translate()` for better performance.

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.

But in the next chapter we’ll do some JavaScript animations to cover more complex cases.

## <a href="css-animations.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="css-animations.html#animate-a-plane-css" id="animate-a-plane-css" class="main__anchor">Animate a plane (CSS)</a>

<a href="task/animate-logo-css.html" class="task__open-link"></a>

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

### <a href="css-animations.html#animate-the-flying-plane-css" id="animate-the-flying-plane-css" class="main__anchor">Animate the flying plane (CSS)</a>

<a href="task/animate-logo-bezier-css.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Modify the solution of the previous task [Animate a plane (CSS)](task/animate-logo-css.html) to make the plane grow more than its original size 400x240px (jump out), and then return to that size.

Here’s how it should look (click on the plane):

Take the solution of the previous task as the source.

solution

We need to choose the right Bezier curve for that animation. It should have `y>1` somewhere for the plane to “jump out”.

For instance, we can take both control points with `y>1`, like: `cubic-bezier(0.25, 1.5, 0.75, 1.5)`.

The graph:

<figure><img src="task/animate-logo-bezier-css/bezier-up.svg" width="149" height="187" /></figure>[Open the solution in a sandbox.](https://plnkr.co/edit/siJdHAbKzgvoC0j5?p=preview)

### <a href="css-animations.html#animated-circle" id="animated-circle" class="main__anchor">Animated circle</a>

<a href="task/animate-circle.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `showCircle(cx, cy, radius)` that shows an animated growing circle.

- `cx,cy` are window-relative coordinates of the center of the circle,
- `radius` is the radius of the circle.

Click the button below to see how it should look like:

The source document has an example of a circle with right styles, so the task is precisely to do the animation right.

[Open a sandbox for the task.](https://plnkr.co/edit/qd8u6qKVygb8km0v?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/liP2z1HWtstH37Hl?p=preview)

### <a href="css-animations.html#animated-circle-with-callback" id="animated-circle-with-callback" class="main__anchor">Animated circle with callback</a>

<a href="task/animate-circle-callback.html" class="task__open-link"></a>

In the task [Animated circle](task/animate-circle.html) an animated growing circle is shown.

Now let’s say we need not just a circle, but to show a message inside it. The message should appear _after_ the animation is complete (the circle is fully grown), otherwise it would look ugly.

In the solution of the task, the function `showCircle(cx, cy, radius)` draws the circle, but gives no way to track when it’s ready.

Add a callback argument: `showCircle(cx, cy, radius, callback)` to be called when the animation is complete. The `callback` should receive the circle `<div>` as an argument.

Here’s the example:

    showCircle(150, 150, 100, div => {
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });

Demo:

Take the solution of the task [Animated circle](task/animate-circle.html) as the base.

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/CwXJViltnzVEWbk2?p=preview)

<a href="bezier-curve.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="js-animation.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcss-animations" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcss-animations" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="css-animations.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="animation.html" class="sidebar__link">Animation</a>

#### Lesson navigation

- css-animations.html\#css-transition" &gt;CSS transitions
- css-animations.html\#transition-property" &gt;transition-property
- css-animations.html\#transition-duration" &gt;transition-duration
- css-animations.html\#transition-delay" &gt;transition-delay
- css-animations.html\#transition-timing-function" &gt;transition-timing-function
- css-animations.html\#event-transitionend" &gt;Event transitionend
- css-animations.html\#keyframes" &gt;Keyframes
- css-animations.html\#performance" &gt;Performance
- css-animations.html

<!-- -->

- <a href="css-animations.html#tasks" class="sidebar__link">Tasks (4)</a>
- css-animations.html\#comments" &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Fcss-animations" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcss-animations" class="share share_fb sidebar**share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/7-animation/2-css-animations" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
