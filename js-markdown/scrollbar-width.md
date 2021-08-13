EN

langs\_\_title">عربي</span></a>

- <a href="scrollbar-width.html"
  /scrollbar-width"
  /scrollbar-width"
  scrollbar-widthscrollbar-width"

<!-- -->

- /"
  scrollbar-width"
  /scrollbar-width"
  scrollbar-width"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fscrollbar-width"%2Fscrollbar-width" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../size-and-scroll.html" Element size and scrolling</span></a>

<a href="../size-and-scroll.html"

## What is the scrollbar width?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Write the code that returns the width of a standard scrollbar.

For Windows it usually varies between `12px` and `20px`. If the browser doesn’t reserve any space for it (the scrollbar is half-translucent over the text, also happens), then it may be `0px`.

P.S. The code should work for any HTML document, do not depend on its content.

solution

To get the scrollbar width, we can create an element with the scroll, but without borders and paddings.

Then the difference between its full width `offsetWidth` and the inner content area width `clientWidth` will be exactly the scrollbar:

<a href="scrollbar-width.html#"
<a href="scrollbar-width.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

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
