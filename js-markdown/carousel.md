EN

- <a href="https://ar.javascript.info/"
- <a href="carousel.html"
  carousel"

carouselcarousel"

<!-- -->

- <a href="https://ko.javascript.info/"
  /carousel"
- <a href="https://tr.javascript.info/"
  ask/carousel"k%2Fcarousel"%2Fcarousel" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../introduction-browser-events.html" Introduction to browser events</span></a>

<a href="../introduction-browser-events.html"

## Carousel

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a “carousel” – a ribbon of images that can be scrolled by clicking on arrows.

Later we can add more features to it: infinite scrolling, dynamic loading etc.

P.S. For this task HTML/CSS structure is actually 90% of the solution.

[Open a sandbox for the task.](https://plnkr.co/edit/qP4TJJCtiSTJf6Zi?p=preview)

solution

The images ribbon can be represented as `ul/li` list of images `<img>`.

Normally, such a ribbon is wide, but we put a fixed-size `<div>` around to “cut” it, so that only a part of the ribbon is visible:

<figure><img src="carousel/carousel1.svg" width="488" height="246" /></figure>To make the list show horizontally we need to apply correct CSS properties for `<li>`, like `display: inline-block`.

For `<img>` we should also adjust `display`, because by default it’s `inline`. There’s extra space reserved under `inline` elements for “letter tails”, so we can use `display:block` to remove it.

To do the scrolling, we can shift `<ul>`. There are many ways to do it, for instance by changing `margin-left` or (better performance) use `transform: translateX()`:

<figure><img src="carousel/carousel2.svg" width="639" height="246" /></figure>The outer `<div>` has a fixed width, so “extra” images are cut.

The whole carousel is a self-contained “graphical component” on the page, so we’d better wrap it into a single `<div class="carousel">` and style things inside it.

[Open the solution in a sandbox.](https://plnkr.co/edit/U6VSlPwWpUfHzlRB?p=preview)
