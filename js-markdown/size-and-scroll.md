EN

- <a href="https://ar.javascript.info/size-and-scroll"
- <a href="size-and-scroll.html"
- <a href="https://es.javascript.info/size-and-scroll"
- <a href="https://fr.javascript.info/size-and-scroll"
- size-and-scroll"
  size-and-scroll"

<!-- -->

- /size-and-scroll"
- <a href=size-and-scroll"
- <a href="https://tr.javascript.info/size-and-scroll"
- <a href="https://zh.javascript.info/size-and-scroll"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsize-and-scroll" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsize-and-scroll" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

7th June 2020

# Element size and scrolling

There are many JavaScript properties that allow us to read information about element width, height and other geometry features.

We often need them when moving or positioning elements in JavaScript.

## <a href="size-and-scroll.html#sample-element" id="sample-element" class="main__anchor">Sample element</a>

As a sample element to demonstrate properties we’ll use the one given below:

    <div id="example">
      ...Text...
    </div>
    <style>
      #example {
        width: 300px;
        height: 200px;
        border: 25px solid #E8C48F;
        padding: 20px;
        overflow: auto;
      }
    </style>

It has the border, padding and scrolling. The full set of features. There are no margins, as they are not the part of the element itself, and there are no special properties for them.

The element looks like this:

<figure><img src="article/size-and-scroll/metric-css.svg" width="566" height="469" /></figure>You can [open the document in the sandbox](https://plnkr.co/edit/79q3ufWDJVxYnGfE?p=preview).

<span class="important__type">Mind the scrollbar</span>

The picture above demonstrates the most complex case when the element has a scrollbar. Some browsers (not all) reserve the space for it by taking it from the content (labeled as “content width” above).

So, without scrollbar the content width would be `300px`, but if the scrollbar is `16px` wide (the width may vary between devices and browsers) then only `300 - 16 = 284px` remains, and we should take it into account. That’s why examples from this chapter assume that there’s a scrollbar. Without it, some calculations are simpler.

<span class="important__type">The `padding-bottom` area may be filled with text</span>

Usually paddings are shown empty on our illustrations, but if there’s a lot of text in the element and it overflows, then browsers show the “overflowing” text at `padding-bottom`, that’s normal.

## <a href="size-and-scroll.html#geometry" id="geometry" class="main__anchor">Geometry</a>

Here’s the overall picture with geometry properties:

<figure><img src="article/size-and-scroll/metric-all.svg" width="670" height="602" /></figure>Values of these properties are technically numbers, but these numbers are “of pixels”, so these are pixel measurements.

Let’s start exploring the properties starting from the outside of the element.

## <a href="size-and-scroll.html#offsetparent-offsetleft-top" id="offsetparent-offsetleft-top" class="main__anchor">offsetParent, offsetLeft/Top</a>

These properties are rarely needed, but still they are the “most outer” geometry properties, so we’ll start with them.

The `offsetParent` is the nearest ancestor that the browser uses for calculating coordinates during rendering.

That’s the nearest ancestor that is one of the following:

1.  CSS-positioned (`position` is `absolute`, `relative`, `fixed` or `sticky`), or
2.  `<td>`, `<th>`, or `<table>`, or
3.  `<body>`.

Properties `offsetLeft/offsetTop` provide x/y coordinates relative to `offsetParent` upper-left corner.

In the example below the inner `<div>` has `<main>` as `offsetParent` and `offsetLeft/offsetTop` shifts from its upper-left corner (`180`):

<a href="size-and-scroll.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="size-and-scroll.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <main style="position: relative" id="main">
      <article>
        <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
      </article>
    </main>
    <script>
      alert(example.offsetParent.id); // main
      alert(example.offsetLeft); // 180 (note: a number, not a string "180px")
      alert(example.offsetTop); // 180
    </script>

<figure><img src="article/size-and-scroll/metric-offset-parent.svg" width="597" height="520" /></figure>There are several occasions when `offsetParent` is `null`:

1.  For not shown elements (`display:none` or not in the document).
2.  For `<body>` and `<html>`.
3.  For elements with `position:fixed`.

## <a href="size-and-scroll.html#offsetwidth-height" id="offsetwidth-height" class="main__anchor">offsetWidth/Height</a>

Now let’s move on to the element itself.

These two properties are the simplest ones. They provide the “outer” width/height of the element. Or, in other words, its full size including borders.

<figure><img src="article/size-and-scroll/metric-offset-width-height.svg" width="508" height="509" /></figure>For our sample element:

- `offsetWidth = 390` – the outer width, can be calculated as inner CSS-width (`300px`) plus paddings (`2 * 20px`) and borders (`2 * 25px`).
- `offsetHeight = 290` – the outer height.

<span class="important__type">Geometry properties are zero/null for elements that are not displayed</span>

Geometry properties are calculated only for displayed elements.

If an element (or any of its ancestors) has `display:none` or is not in the document, then all geometry properties are zero (or `null` for `offsetParent`).

For example, `offsetParent` is `null`, and `offsetWidth`, `offsetHeight` are `0` when we created an element, but haven’t inserted it into the document yet, or it (or it’s ancestor) has `display:none`.

We can use this to check if an element is hidden, like this:

    function isHidden(elem) {
      return !elem.offsetWidth && !elem.offsetHeight;
    }

Please note that such `isHidden` returns `true` for elements that are on-screen, but have zero sizes (like an empty `<div>`).

## <a href="size-and-scroll.html#clienttop-left" id="clienttop-left" class="main__anchor">clientTop/Left</a>

Inside the element we have the borders.

To measure them, there are properties `clientTop` and `clientLeft`.

In our example:

- `clientLeft = 25` – left border width
- `clientTop = 25` – top border width

<figure><img src="article/size-and-scroll/metric-client-left-top.svg" width="353" height="316" /></figure>…But to be precise – these properties are not border width/height, but rather relative coordinates of the inner side from the outer side.

What’s the difference?

It becomes visible when the document is right-to-left (the operating system is in Arabic or Hebrew languages). The scrollbar is then not on the right, but on the left, and then `clientLeft` also includes the scrollbar width.

In that case, `clientLeft` would be not `25`, but with the scrollbar width `25 + 16 = 41`.

Here’s the example in hebrew:

## <figure><img src="article/size-and-scroll/metric-client-left-top-rtl.svg" width="359" height="316" /></figure><a href="size-and-scroll.html#clientwidth-height" id="clientwidth-height" class="main__anchor">clientWidth/Height</a>

These properties provide the size of the area inside the element borders.

They include the content width together with paddings, but without the scrollbar:

<figure><img src="article/size-and-scroll/metric-client-width-height.svg" width="500" height="493" /></figure>On the picture above let’s first consider `clientHeight`.

There’s no horizontal scrollbar, so it’s exactly the sum of what’s inside the borders: CSS-height `200px` plus top and bottom paddings (`2 * 20px`) total `240px`.

Now `clientWidth` – here the content width is not `300px`, but `284px`, because `16px` are occupied by the scrollbar. So the sum is `284px` plus left and right paddings, total `324px`.

**If there are no paddings, then `clientWidth/Height` is exactly the content area, inside the borders and the scrollbar (if any).**

<figure><img src="article/size-and-scroll/metric-client-width-nopadding.svg" width="409" height="467" /></figure>So when there’s no padding we can use `clientWidth/clientHeight` to get the content area size.

## <a href="size-and-scroll.html#scrollwidth-height" id="scrollwidth-height" class="main__anchor">scrollWidth/Height</a>

These properties are like `clientWidth/clientHeight`, but they also include the scrolled out (hidden) parts:

<figure><img src="article/size-and-scroll/metric-scroll-width-height.svg" width="463" height="524" /></figure>On the picture above:

- `scrollHeight = 723` – is the full inner height of the content area including the scrolled out parts.
- `scrollWidth = 324` – is the full inner width, here we have no horizontal scroll, so it equals `clientWidth`.

We can use these properties to expand the element wide to its full width/height.

Like this:

    // expand the element to the full content height
    element.style.height = `${element.scrollHeight}px`;

Click the button to expand the element:

text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text

element.style.height = `${element.scrollHeight}px`

## <a href="size-and-scroll.html#scrollleft-scrolltop" id="scrollleft-scrolltop" class="main__anchor">scrollLeft/scrollTop</a>

Properties `scrollLeft/scrollTop` are the width/height of the hidden, scrolled out part of the element.

On the picture below we can see `scrollHeight` and `scrollTop` for a block with a vertical scroll.

<figure><img src="article/size-and-scroll/metric-scroll-top.svg" width="489" height="542" /></figure>In other words, `scrollTop` is “how much is scrolled up”.

<span class="important__type">`scrollLeft/scrollTop` can be modified</span>

Most of the geometry properties here are read-only, but `scrollLeft/scrollTop` can be changed, and the browser will scroll the element.

If you click the element below, the code `elem.scrollTop += 10` executes. That makes the element content scroll `10px` down.

Click  
Me  
1  
2  
3  
4  
5  
6  
7  
8  
9

Setting `scrollTop` to `0` or a big value, such as `1e9` will make the element scroll to the very top/bottom respectively.

## <a href="size-and-scroll.html#don-t-take-width-height-from-css" id="don-t-take-width-height-from-css" class="main__anchor">Don’t take width/height from CSS</a>

We’ve just covered geometry properties of DOM elements, that can be used to get widths, heights and calculate distances.

But as we know from the chapter [Styles and classes](styles-and-classes.html), we can read CSS-height and width using `getComputedStyle`.

So why not to read the width of an element with `getComputedStyle`, like this?

<a href="size-and-scroll.html#"
<a href="size-and-scroll.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let elem = document.body;

    alert( getComputedStyle(elem).width ); // show CSS width for elem

Why should we use geometry properties instead? There are two reasons:

1.  First, CSS `width/height` depend on another property: `box-sizing` that defines “what is” CSS width and height. A change in `box-sizing` for CSS purposes may break such JavaScript.

2.  Second, CSS `width/height` may be `auto`, for instance for an inline element:

    <a href="size-and-scroll.html#" class="toolbar__button toolbar__button_run" title="show"></a>

    <a href="size-and-scroll.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        <span id="elem">Hello!</span>

        <script>
          alert( getComputedStyle(elem).width ); // auto
        </script>

    From the CSS standpoint, `width:auto` is perfectly normal, but in JavaScript we need an exact size in `px` that we can use in calculations. So here CSS width is useless.

And there’s one more reason: a scrollbar. Sometimes the code that works fine without a scrollbar becomes buggy with it, because a scrollbar takes the space from the content in some browsers. So the real width available for the content is _less_ than CSS width. And `clientWidth/clientHeight` take that into account.

…But with `getComputedStyle(elem).width` the situation is different. Some browsers (e.g. Chrome) return the real inner width, minus the scrollbar, and some of them (e.g. Firefox) – CSS width (ignore the scrollbar). Such cross-browser differences is the reason not to use `getComputedStyle`, but rather rely on geometry properties.

If your browser reserves the space for a scrollbar (most browsers for Windows do), then you can test it below.

<a href="https://en.js.cx/article/size-and-scroll/cssWidthScroll/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

The element with text has CSS `width:300px`.

On a Desktop Windows OS, Firefox, Chrome, Edge all reserve the space for the scrollbar. But Firefox shows `300px`, while Chrome and Edge show less. That’s because Firefox returns the CSS width and other browsers return the “real” width.

Please note that the described difference is only about reading `getComputedStyle(...).width` from JavaScript, visually everything is correct.

## <a href="size-and-scroll.html#summary" id="summary" class="main__anchor">Summary</a>

Elements have the following geometry properties:

- `offsetParent` – is the nearest positioned ancestor or `td`, `th`, `table`, `body`.
- `offsetLeft/offsetTop` – coordinates relative to the upper-left edge of `offsetParent`.
- `offsetWidth/offsetHeight` – “outer” width/height of an element including borders.
- `clientLeft/clientTop` – the distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so `clientLeft` includes its width too.
- `clientWidth/clientHeight` – the width/height of the content including paddings, but without the scrollbar.
- `scrollWidth/scrollHeight` – the width/height of the content, just like `clientWidth/clientHeight`, but also include scrolled-out, invisible part of the element.
- `scrollLeft/scrollTop` – width/height of the scrolled out upper part of the element, starting from its upper-left corner.

All properties are read-only except `scrollLeft/scrollTop` that make the browser scroll the element if changed.

## <a href="size-and-scroll.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="size-and-scroll.html#what-s-the-scroll-from-the-bottom" id="what-s-the-scroll-from-the-bottom" class="main__anchor">What's the scroll from the bottom?</a>

<a href="task/get-scroll-height-bottom.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The `elem.scrollTop` property is the size of the scrolled out part from the top. How to get the size of the bottom scroll (let’s call it `scrollBottom`)?

Write the code that works for an arbitrary `elem`.

P.S. Please check your code: if there’s no scroll or the element is fully scrolled down, then it should return `0`.

solution

The solution is:

    let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;

In other words: (full height) minus (scrolled out top part) minus (visible part) – that’s exactly the scrolled out bottom part.

### <a href="size-and-scroll.html#what-is-the-scrollbar-width" id="what-is-the-scrollbar-width" class="main__anchor">What is the scrollbar width?</a>

<a href="task/scrollbar-width.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Write the code that returns the width of a standard scrollbar.

For Windows it usually varies between `12px` and `20px`. If the browser doesn’t reserve any space for it (the scrollbar is half-translucent over the text, also happens), then it may be `0px`.

P.S. The code should work for any HTML document, do not depend on its content.

solution

To get the scrollbar width, we can create an element with the scroll, but without borders and paddings.

Then the difference between its full width `offsetWidth` and the inner content area width `clientWidth` will be exactly the scrollbar:

<a href="size-and-scroll.html#"
<a href="size-and-scroll.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // create a div with the scroll
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    // must put it in the document, otherwise sizes will be 0
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    alert(scrollWidth);

### <a href="size-and-scroll.html#place-the-ball-in-the-field-center" id="place-the-ball-in-the-field-center" class="main__anchor">Place the ball in the field center</a>

<a href="task/put-ball-in-center.html" class="task__open-link"></a>

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

<figure><img src="task/put-ball-in-center/field.svg" width="233" height="156" /></figure>The inner field width/height is `clientWidth/clientHeight`. So the field center has coordinates `(clientWidth/2, clientHeight/2)`.

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

### <a href="size-and-scroll.html#the-difference-css-width-versus-clientwidth" id="the-difference-css-width-versus-clientwidth" class="main__anchor">The difference: CSS width versus clientWidth</a>

<a href="task/width-vs-clientwidth.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What’s the difference between `getComputedStyle(elem).width` and `elem.clientWidth`?

Give at least 3 differences. The more the better.

solution

Differences:

1.  `clientWidth` is numeric, while `getComputedStyle(elem).width` returns a string with `px` at the end.
2.  `getComputedStyle` may return non-numeric width like `"auto"` for an inline element.
3.  `clientWidth` is the inner content area of the element plus paddings, while CSS width (with standard `box-sizing`) is the inner content area _without paddings_.
4.  If there’s a scrollbar and the browser reserves the space for it, some browser substract that space from CSS width (cause it’s not available for content any more), and some do not. The `clientWidth` property is always the same: scrollbar size is substracted if reserved.

<a href="styles-and-classes.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="size-and-scroll-window.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsize-and-scroll" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsize-and-scroll" </a>

<a href="tutorial/map.html" class="map">

## <a href="size-and-scroll.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="size-and-scroll.html#sample-element" class="sidebar__link">Sample element</a>
- <a href="size-and-scroll.html#geometry" class="sidebar__link">Geometry</a>
- <a href="size-and-scroll.html#offsetparent-offsetleft-top" class="sidebar__link">offsetParent, offsetLeft/Top</a>
- <a href="size-and-scroll.html#offsetwidth-height" class="sidebar__link">offsetWidth/Height</a>
- <a href="size-and-scroll.html#clienttop-left" class="sidebar__link">clientTop/Left</a>
- <a href="size-and-scroll.html#clientwidth-height" class="sidebar__link">clientWidth/Height</a>
- <a href="size-and-scroll.html#scrollwidth-height" class="sidebar__link">scrollWidth/Height</a>
- <a href="size-and-scroll.html#scrollleft-scrolltop" class="sidebar__link">scrollLeft/scrollTop</a>
- <a href="size-and-scroll.html#don-t-take-width-height-from-css" class="sidebar__link">Don’t take width/height from CSS</a>
- <a href="size-and-scroll.html#summary" class="sidebar__link">Summary</a>

- <a href="size-and-scroll.html#tasks" class="sidebar__link">Tasks (4)</a>
- <a href="size-and-scroll.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fsize-and-scroll" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsize-and-scroll" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/09-size-and-scroll" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
