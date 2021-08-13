EN

- <a href="https://ar.javascript.info/bezier-curve"
- <a href="bezier-curve.html"
- <a href="https://es.javascript.info/bezier-curve"

- <a href="https://it.javascript.info/bezier-curve"
  bezier-curve"

<!-- -->

- <a href="https://ko.javascript.info/bezier-curve"
- <a href=bezier-curve"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/bezier-curve"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbezier-curve" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbezier-curve" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="animation.html" Animation</span></a></span>

3rd December 2020

# Bezier curve

Bezier curves are used in computer graphics to draw shapes, for CSS animation and in many other places.

They are a very simple thing, worth to study once and then feel comfortable in the world of vector graphics and advanced animations.

## <a href="bezier-curve.html#control-points" id="control-points" class="main__anchor">Control points</a>

A [bezier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) is defined by control points.

There may be 2, 3, 4 or more.

For instance, two points curve:

<figure><img src="article/bezier-curve/bezier2.svg" width="149" height="187" /></figure>Three points curve:

<figure><img src="article/bezier-curve/bezier3.svg" width="149" height="187" /></figure>Four points curve:

<figure><img src="article/bezier-curve/bezier4.svg" width="149" height="187" /></figure>If you look closely at these curves, you can immediately notice:

1.  **Points are not always on curve.** That’s perfectly normal, later we’ll see how the curve is built.

2.  **The curve order equals the number of points minus one**. For two points we have a linear curve (that’s a straight line), for three points – quadratic curve (parabolic), for four points – cubic curve.

3.  **A curve is always inside the [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of control points:**

    <img src="article/bezier-curve/bezier4-e.svg" width="149" height="187" /> <img src="article/bezier-curve/bezier3-e.svg" width="149" height="187" />

Because of that last property, in computer graphics it’s possible to optimize intersection tests. If convex hulls do not intersect, then curves do not either. So checking for the convex hulls intersection first can give a very fast “no intersection” result. Checking the intersection of convex hulls is much easier, because they are rectangles, triangles and so on (see the picture above), much simpler figures than the curve.

**The main value of Bezier curves for drawing – by moving the points the curve is changing _in intuitively obvious way_.**

Try to move control points using a mouse in the example below:

**As you can notice, the curve stretches along the tangential lines 1 → 2 and 3 → 4.**

After some practice it becomes obvious how to place points to get the needed curve. And by connecting several curves we can get practically anything.

Here are some examples:

<img src="article/bezier-curve/bezier-car.svg" width="260" height="130" /> <img src="article/bezier-curve/bezier-letter.svg" width="166" height="173" /> <img src="article/bezier-curve/bezier-vase.svg" width="110" height="170" />

## <a href="bezier-curve.html#de-casteljau-s-algorithm" id="de-casteljau-s-algorithm" class="main__anchor">De Casteljau’s algorithm</a>

There’s a mathematical formula for Bezier curves, but let’s cover it a bit later, because [De Casteljau’s algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm) is identical to the mathematical definition and visually shows how it is constructed.

First let’s see the 3-points example.

Here’s the demo, and the explanation follow.

Control points (1,2 and 3) can be moved by the mouse. Press the “play” button to run it.

**De Casteljau’s algorithm of building the 3-point bezier curve:**

1.  Draw control points. In the demo above they are labeled: `1`, `2`, `3`.

2.  Build segments between control points 1 → 2 → 3. In the demo above they are <span style="color: #825e28">brown</span>.

3.  The parameter `t` moves from `0` to `1`. In the example above the step `0.05` is used: the loop goes over `0, 0.05, 0.1, 0.15, ... 0.95, 1`.

    For each of these values of `t`:

    - On each <span style="color: #825e28">brown</span> segment we take a point located on the distance proportional to `t` from its beginning. As there are two segments, we have two points.

      For instance, for `t=0` – both points will be at the beginning of segments, and for `t=0.25` – on the 25% of segment length from the beginning, for `t=0.5` – 50%(the middle), for `t=1` – in the end of segments.

    - Connect the points. On the picture below the connecting segment is painted <span style="color: #167490">blue</span>.

<table><thead><tr class="header"><th>For <code>t=0.25</code></th><th>For <code>t=0.5</code></th></tr></thead><tbody><tr class="odd"><td><img src="article/bezier-curve/bezier3-draw1.svg" width="340" height="350" /></td><td><img src="article/bezier-curve/bezier3-draw2.svg" width="340" height="350" /></td></tr></tbody></table>

1.  Now in the <span style="color: #167490">blue</span> segment take a point on the distance proportional to the same value of `t`. That is, for `t=0.25` (the left picture) we have a point at the end of the left quarter of the segment, and for `t=0.5` (the right picture) – in the middle of the segment. On pictures above that point is <span style="color: red">red</span>.

2.  As `t` runs from `0` to `1`, every value of `t` adds a point to the curve. The set of such points forms the Bezier curve. It’s red and parabolic on the pictures above.

That was a process for 3 points. But the same is for 4 points.

The demo for 4 points (points can be moved by a mouse):

The algorithm for 4 points:

- Connect control points by segments: 1 → 2, 2 → 3, 3 → 4. There will be 3 <span style="color: #825e28">brown</span> segments.
- For each `t` in the interval from `0` to `1`:
  - We take points on these segments on the distance proportional to `t` from the beginning. These points are connected, so that we have two <span style="color: #0a0">green segments</span>.
  - On these segments we take points proportional to `t`. We get one <span style="color: #167490">blue segment</span>.
  - On the blue segment we take a point proportional to `t`. On the example above it’s <span style="color: red">red</span>.
- These points together form the curve.

The algorithm is recursive and can be generalized for any number of control points.

Given N of control points:

1.  We connect them to get initially N-1 segments.
2.  Then for each `t` from `0` to `1`, we take a point on each segment on the distance proportional to `t` and connect them. There will be N-2 segments.
3.  Repeat step 2 until there is only one point.

These points make the curve.

**Run and pause examples to clearly see the segments and how the curve is built.**

A curve that looks like `y=1/t`:

Zig-zag control points also work fine:

Making a loop is possible:

A non-smooth Bezier curve (yeah, that’s possible too):

If there’s something unclear in the algorithm description, please look at the live examples above to see how the curve is built.

As the algorithm is recursive, we can build Bezier curves of any order, that is: using 5, 6 or more control points. But in practice many points are less useful. Usually we take 2-3 points, and for complex lines glue several curves together. That’s simpler to develop and calculate.

<span class="important__type">How to draw a curve _through_ given points?</span>

To specify a Bezier curve, control points are used. As we can see, they are not on the curve, except the first and the last ones.

Sometimes we have another task: to draw a curve _through several points_, so that all of them are on a single smooth curve. That task is called [interpolation](https://en.wikipedia.org/wiki/Interpolation), and here we don’t cover it.

There are mathematical formulas for such curves, for instance [Lagrange polynomial](https://en.wikipedia.org/wiki/Lagrange_polynomial). In computer graphics [spline interpolation](https://en.wikipedia.org/wiki/Spline_interpolation) is often used to build smooth curves that connect many points.

## <a href="bezier-curve.html#maths" id="maths" class="main__anchor">Maths</a>

A Bezier curve can be described using a mathematical formula.

As we saw – there’s actually no need to know it, most people just draw the curve by moving points with a mouse. But if you’re into maths – here it is.

Given the coordinates of control points `Pi`: the first control point has coordinates `P1 = (x1, y1)`, the second: `P2 = (x2, y2)`, and so on, the curve coordinates are described by the equation that depends on the parameter `t` from the segment `[0,1]`.

- The formula for a 2-points curve:

  `P = (1-t)P1 + tP2`

- For 3 control points:

  `P = (1−t)2P1 + 2(1−t)tP2 + t2P3`

- For 4 control points:

  `P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4`

These are vector equations. In other words, we can put `x` and `y` instead of `P` to get corresponding coordinates.

For instance, the 3-point curve is formed by points `(x,y)` calculated as:

- `x = (1−t)2x1 + 2(1−t)tx2 + t2x3`
- `y = (1−t)2y1 + 2(1−t)ty2 + t2y3`

Instead of `x1, y1, x2, y2, x3, y3` we should put coordinates of 3 control points, and then as `t` moves from `0` to `1`, for each value of `t` we’ll have `(x,y)` of the curve.

For instance, if control points are `(0,0)`, `(0.5, 1)` and `(1, 0)`, the equations become:

- `x = (1−t)2 * 0 + 2(1−t)t * 0.5 + t2 * 1 = (1-t)t + t2 = t`
- `y = (1−t)2 * 0 + 2(1−t)t * 1 + t2 * 0 = 2(1-t)t = –2t2 + 2t`

Now as `t` runs from `0` to `1`, the set of values `(x,y)` for each `t` forms the curve for such control points.

## <a href="bezier-curve.html#summary" id="summary" class="main__anchor">Summary</a>

Bezier curves are defined by their control points.

We saw two definitions of Bezier curves:

1.  Using a drawing process: De Casteljau’s algorithm.
2.  Using a mathematical formulas.

Good properties of Bezier curves:

- We can draw smooth lines with a mouse by moving control points.
- Complex shapes can be made of several Bezier curves.

Usage:

- In computer graphics, modeling, vector graphic editors. Fonts are described by Bezier curves.
- In web development – for graphics on Canvas and in the SVG format. By the way, “live” examples above are written in SVG. They are actually a single SVG document that is given different points as parameters. You can open it in a separate window and see the source: [demo.svg](article/bezier-curve/demo.svg%3Fp=0,0,1,0.5,0,0.5,1,1&animate=1).
- In CSS animation to describe the path and speed of animation.

<a href="animation.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="css-animations.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbezier-curve" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbezier-curve" </a>

<a href="tutorial/map.html" class="map">

## <a href="bezier-curve.html id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="animation.html" class="sidebar__link">Animation</a>

#### Lesson navigation

- <a href="bezier-curve.html#control-points" class="sidebar__link">Control points</a>
- <a href="bezier-curve.html#de-casteljau-s-algorithm" class="sidebar__link">De Casteljau’s algorithm</a>
- <a href="bezier-curve.html#maths" class="sidebar__link">Maths</a>
- <a href="bezier-curve.html#summary" class="sidebar__link">Summary</a>

- <a href="bezier-curve.html class="sidebar\_\_link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbezier-curve" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbezier-curve" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/7-animation/1-bezier-curve" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
