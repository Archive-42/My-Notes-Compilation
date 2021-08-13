find-point-coordinates"

- <a href="find-point-coordinates.html"
  /find-point-coordinates"
  /find-point-coordinates"
  find-point-coordinatesfind-point-coordinates"

<!-- -->

- <a href="https://ko.javascript.info/"
  find-point-coordinates"
  /find-point-coordinates"
  find-point-coordinates"

k%2Ffind-point-coordinates"%2Ffind-point-coordinates" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../coordinates.html" Coordinates</span></a>

<a href="../coordinates.html"

## Find window coordinates of the field

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the iframe below you can see a document with the green “field”.

Use JavaScript to find window coordinates of corners pointed by with arrows.

There’s a small feature implemented in the document for convenience. A click at any place shows coordinates there.

<a href="https://en.js.cx/task/find-point-coordinates/source/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/EDtjdNk6S43g1SAB?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

Your code should use DOM to get window coordinates of:

1.  Upper-left, outer corner (that’s simple).
2.  Bottom-right, outer corner (simple too).
3.  Upper-left, inner corner (a bit harder).
4.  Bottom-right, inner corner (there are several ways, choose one).

The coordinates that you calculate should be the same as those returned by the mouse click.

P.S. The code should also work if the element has another size or border, not bound to any fixed values.

[Open a sandbox for the task.](https://plnkr.co/edit/EDtjdNk6S43g1SAB?p=preview)

solution

Outer corners

#### Outer corners

Outer corners are basically what we get from [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Coordinates of the upper-left corner `answer1` and the bottom-right corner `answer2`:

    let coords = elem.getBoundingClientRect();

    let answer1 = [coords.left, coords.top];
    let answer2 = [coords.right, coords.bottom];

Left-upper inner corner

#### Left-upper inner corner

That differs from the outer corner by the border width. A reliable way to get the distance is `clientLeft/clientTop`:

    let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];

Right-bottom inner corner

#### Right-bottom inner corner

In our case we need to substract the border size from the outer coordinates.

We could use CSS way:

    let answer4 = [
      coords.right - parseInt(getComputedStyle(field).borderRightWidth),
      coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
    ];

An alternative way would be to add `clientWidth/clientHeight` to coordinates of the left-upper corner. That’s probably even better:

    let answer4 = [
      coords.left + elem.clientLeft + elem.clientWidth,
      coords.top + elem.clientTop + elem.clientHeight
    ];

[Open the solution in a sandbox.](https://plnkr.co/edit/K35otM66PlWyBgbb?p=preview)
