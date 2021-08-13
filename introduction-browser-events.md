EN

langs\_\_title">عربي</span></a>

- <a href="introduction-browser-events.html"
- <a href="https://es.javascript.info/introduction-browser-events"

- <a href="https://it.javascript.info/introduction-browser-events"
  introduction-browser-events"

<!-- -->

- <a href="https://ko.javascript.info/introduction-browser-events"
- <a href=introduction-browser-events"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/introduction-browser-events"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fintroduction-browser-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fintroduction-browser-events" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="events.html" Introduction to Events</span></a></span>

25th July 2020

# Introduction to browser events

_An event_ is a signal that something has happened. All DOM nodes generate such signals (but events are not limited to DOM).

Here’s a list of the most useful DOM events, just to take a look at:

**Mouse events:**

- `click` – when the mouse clicks on an element (touchscreen devices generate it on a tap).
- `contextmenu` – when the mouse right-clicks on an element.
- `mouseover` / `mouseout` – when the mouse cursor comes over / leaves an element.
- `mousedown` / `mouseup` – when the mouse button is pressed / released over an element.
- `mousemove` – when the mouse is moved.

**Keyboard events:**

- `keydown` and `keyup` – when a keyboard key is pressed and released.

**Form element events:**

- `submit` – when the visitor submits a `<form>`.
- `focus` – when the visitor focuses on an element, e.g. on an `<input>`.

**Document events:**

- `DOMContentLoaded` – when the HTML is loaded and processed, DOM is fully built.

**CSS events:**

- `transitionend` – when a CSS-animation finishes.

There are many other events. We’ll get into more details of particular events in next chapters.

## <a href="introduction-browser-events.html#event-handlers" id="event-handlers" class="main__anchor">Event handlers</a>

To react on events we can assign a _handler_ – a function that runs in case of an event.

Handlers are a way to run JavaScript code in case of user actions.

There are several ways to assign a handler. Let’s see them, starting from the simplest one.

### <a href="introduction-browser-events.html#html-attribute" id="html-attribute" class="main__anchor">HTML-attribute</a>

A handler can be set in HTML with an attribute named `on<event>`.

For instance, to assign a `click` handler for an `input`, we can use `onclick`, like here:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <input value="Click me" onclick="alert('Click!')" type="button">

On mouse click, the code inside `onclick` runs.

Please note that inside `onclick` we use single quotes, because the attribute itself is in double quotes. If we forget that the code is inside the attribute and use double quotes inside, like this: `onclick="alert("Click!")"`, then it won’t work right.

An HTML-attribute is not a convenient place to write a lot of code, so we’d better create a JavaScript function and call it there.

Here a click runs the function `countRabbits()`:

    <script>
      function countRabbits() {
        for(let i=1; i<=3; i++) {
          alert("Rabbit number " + i);
        }
      }
    </script>

    <input type="button" onclick="countRabbits()" value="Count rabbits!">

As we know, HTML attribute names are not case-sensitive, so `ONCLICK` works as well as `onClick` and `onCLICK`… But usually attributes are lowercased: `onclick`.

### <a href="introduction-browser-events.html#dom-property" id="dom-property" class="main__anchor">DOM property</a>

We can assign a handler using a DOM property `on<event>`.

For instance, `elem.onclick`:

    <input id="elem" type="button" value="Click me">
    <script>
      elem.onclick = function() {
        alert('Thank you');
      };
    </script>

If the handler is assigned using an HTML-attribute then the browser reads it, creates a new function from the attribute content and writes it to the DOM property.

So this way is actually the same as the previous one.

These two code pieces work the same:

1.  Only HTML:

        <input type="button" onclick="alert('Click!')" value="Button">

2.  HTML + JS:

        <input type="button" id="button" value="Button">
        <script>
          button.onclick = function() {
            alert('Click!');
          };
        </script>

In the first example, the HTML attribute is used to initialize the `button.onclick`, while in the second example – the script, that’s all the difference.

**As there’s only one `onclick` property, we can’t assign more than one event handler.**

In the example below adding a handler with JavaScript overwrites the existing handler:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <input type="button" id="elem" onclick="alert('Before')" value="Click me">
    <script>
      elem.onclick = function() { // overwrites the existing handler
        alert('After'); // only this will be shown
      };
    </script>

To remove a handler – assign `elem.onclick = null`.

## <a href="introduction-browser-events.html#accessing-the-element-this" id="accessing-the-element-this" class="main__anchor">Accessing the element: this</a>

The value of `this` inside a handler is the element. The one which has the handler on it.

In the code below `button` shows its contents using `this.innerHTML`:

    <button onclick="alert(this.innerHTML)">Click me</button>

## <a href="introduction-browser-events.html#possible-mistakes" id="possible-mistakes" class="main__anchor">Possible mistakes</a>

If you’re starting to work with events – please note some subtleties.

We can set an existing function as a handler:

    function sayThanks() {
      alert('Thanks!');
    }

    elem.onclick = sayThanks;

But be careful: the function should be assigned as `sayThanks`, not `sayThanks()`.

    // right
    button.onclick = sayThanks;

    // wrong
    button.onclick = sayThanks();

If we add parentheses, then `sayThanks()` becomes is a function call. So the last line actually takes the _result_ of the function execution, that is `undefined` (as the function returns nothing), and assigns it to `onclick`. That doesn’t work.

…On the other hand, in the markup we do need the parentheses:

    <input type="button" id="button" onclick="sayThanks()">

The difference is easy to explain. When the browser reads the attribute, it creates a handler function with body from the attribute content.

So the markup generates this property:

    button.onclick = function() {
      sayThanks(); // <-- the attribute content goes here
    };

**Don’t use `setAttribute` for handlers.**

Such a call won’t work:

<a href="introduction-browser-events.html#"
<a href="introduction-browser-events.html#"

    // a click on <body> will generate errors,
    // because attributes are always strings, function becomes a string
    document.body.setAttribute('onclick', function() { alert(1) });

**DOM-property case matters.**

Assign a handler to `elem.onclick`, not `elem.ONCLICK`, because DOM properties are case-sensitive.

## <a href="introduction-browser-events.html#addeventlistener" id="addeventlistener" class="main__anchor">addEventListener</a>

The fundamental problem of the aforementioned ways to assign handlers – we can’t assign multiple handlers to one event.

Let’s say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.

We’d like to assign two event handlers for that. But a new DOM property will overwrite the existing one:

    input.onclick = function() { alert(1); }
    // ...
    input.onclick = function() { alert(2); } // replaces the previous handler

Developers of web standards understood that long ago and suggested an alternative way of managing handlers using special methods `addEventListener` and `removeEventListener`. They are free of such a problem.

The syntax to add a handler:

    element.addEventListener(event, handler, [options]);

`event`  
Event name, e.g. `"click"`.

`handler`  
The handler function.

`options`  
An additional optional object with properties:

- `once`: if `true`, then the listener is automatically removed after it triggers.
- `capture`: the phase where to handle the event, to be covered later in the chapter [Bubbling and capturing](bubbling-and-capturing.html). For historical reasons, `options` can also be `false/true`, that’s the same as `{capture: false/true}`.
- `passive`: if `true`, then the handler will not call `preventDefault()`, we’ll explain that later in [Browser default actions](default-browser-action.html).

To remove the handler, use `removeEventListener`:

    element.removeEventListener(event, handler, [options]);

<span class="important__type">Removal requires the same function</span>

To remove a handler we should pass exactly the same function as was assigned.

This doesn’t work:

    elem.addEventListener( "click" , () => alert('Thanks!'));
    // ....
    elem.removeEventListener( "click", () => alert('Thanks!'));

The handler won’t be removed, because `removeEventListener` gets another function – with the same code, but that doesn’t matter, as it’s a different function object.

Here’s the right way:

    function handler() {
      alert( 'Thanks!' );
    }

    input.addEventListener("click", handler);
    // ....
    input.removeEventListener("click", handler);

Please note – if we don’t store the function in a variable, then we can’t remove it. There’s no way to “read back” handlers assigned by `addEventListener`.

Multiple calls to `addEventListener` allow to add multiple handlers, like this:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <input id="elem" type="button" value="Click me"/>

    <script>
      function handler1() {
        alert('Thanks!');
      };

      function handler2() {
        alert('Thanks again!');
      }

      elem.onclick = () => alert("Hello");
      elem.addEventListener("click", handler1); // Thanks!
      elem.addEventListener("click", handler2); // Thanks again!
    </script>

As we can see in the example above, we can set handlers _both_ using a DOM-property and `addEventListener`. But generally we use only one of these ways.

<span class="important__type">For some events, handlers only work with `addEventListener`</span>

There exist events that can’t be assigned via a DOM-property. Only with `addEventListener`.

For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and DOM is built.

    // will never run
    document.onDOMContentLoaded = function() {
      alert("DOM built");
    };

    // this way it works
    document.addEventListener("DOMContentLoaded", function() {
      alert("DOM built");
    });

So `addEventListener` is more universal. Although, such events are an exception rather than the rule.

## <a href="introduction-browser-events.html#event-object" id="event-object" class="main__anchor">Event object</a>

To properly handle an event we’d want to know more about what’s happened. Not just a “click” or a “keydown”, but what were the pointer coordinates? Which key was pressed? And so on.

When an event happens, the browser creates an _event object_, puts details into it and passes it as an argument to the handler.

Here’s an example of getting pointer coordinates from the event object:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <input type="button" value="Click me" id="elem">

    <script>
      elem.onclick = function(event) {
        // show event type, element and coordinates of the click
        alert(event.type + " at " + event.currentTarget);
        alert("Coordinates: " + event.clientX + ":" + event.clientY);
      };
    </script>

Some properties of `event` object:

`event.type`  
Event type, here it’s `"click"`.

`event.currentTarget`  
Element that handled the event. That’s exactly the same as `this`, unless the handler is an arrow function, or its `this` is bound to something else, then we can get the element from `event.currentTarget`.

`event.clientX / event.clientY`  
Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events – another one, we’ll study them later when we come to different events in details.

<span class="important__type">The event object is also available in HTML handlers</span>

If we assign a handler in HTML, we can also use the `event` object, like this:

    <input type="button" onclick="alert(event.type)" value="Event type">

That’s possible because when the browser reads the attribute, it creates a handler like this: `function(event) { alert(event.type) }`. That is: its first argument is called `"event"`, and the body is taken from the attribute.

## <a href="introduction-browser-events.html#object-handlers-handleevent" id="object-handlers-handleevent" class="main__anchor">Object handlers: handleEvent</a>

We can assign not just a function, but an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called.

For instance:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <button id="elem">Click me</button>

    <script>
      let obj = {
        handleEvent(event) {
          alert(event.type + " at " + event.currentTarget);
        }
      };

      elem.addEventListener('click', obj);
    </script>

As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.

We could also use a class for that:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <button id="elem">Click me</button>

    <script>
      class Menu {
        handleEvent(event) {
          switch(event.type) {
            case 'mousedown':
              elem.innerHTML = "Mouse button pressed";
              break;
            case 'mouseup':
              elem.innerHTML += "...and released.";
              break;
          }
        }
      }

      let menu = new Menu();
      elem.addEventListener('mousedown', menu);
      elem.addEventListener('mouseup', menu);
    </script>

Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `addEventListener`. The `menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

The method `handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <button id="elem">Click me</button>

    <script>
      class Menu {
        handleEvent(event) {
          // mousedown -> onMousedown
          let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
          this[method](event);
        }

        onMousedown() {
          elem.innerHTML = "Mouse button pressed";
        }

        onMouseup() {
          elem.innerHTML += "...and released.";
        }
      }

      let menu = new Menu();
      elem.addEventListener('mousedown', menu);
      elem.addEventListener('mouseup', menu);
    </script>

Now event handlers are clearly separated, that may be easier to support.

## <a href="introduction-browser-events.html#summary" id="summary" class="main__anchor">Summary</a>

There are 3 ways to assign event handlers:

1.  HTML attribute: `onclick="..."`.
2.  DOM property: `elem.onclick = function`.
3.  Methods: `elem.addEventListener(event, handler[, phase])` to add, `removeEventListener` to remove.

HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can’t write lots of code in there.

DOM properties are ok to use, but we can’t assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transitionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.

No matter how you assign the handler – it gets an event object as the first argument. That object contains the details about what’s happened.

We’ll learn more about events in general and about different types of events in the next chapters.

## <a href="introduction-browser-events.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="introduction-browser-events.html#hide-on-click" id="hide-on-click" class="main__anchor">Hide on click</a>

<a href="task/hide-other.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Add JavaScript to the `button` to make `<div id="text">` disappear when we click it.

The demo:

[Open a sandbox for the task.](https://plnkr.co/edit/6vWtOzQrn7qGGuey?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/XYTLqWVjKhbaXILs?p=preview)

### <a href="introduction-browser-events.html#hide-self" id="hide-self" class="main__anchor">Hide self</a>

<a href="task/hide-self-onclick.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a button that hides itself on click.

Like this:

solution

Can use `this` in the handler to reference “the element itself” here:

<a href="introduction-browser-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="introduction-browser-events.html#"

    <input type="button" onclick="this.hidden=true" value="Click to hide">

### <a href="introduction-browser-events.html#which-handlers-run" id="which-handlers-run" class="main__anchor">Which handlers run?</a>

<a href="task/which-handlers-run.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a button in the variable. There are no handlers on it.

Which handlers run on click after the following code? Which alerts show up?

    button.addEventListener("click", () => alert("1"));

    button.removeEventListener("click", () => alert("1"));

    button.onclick = () => alert(2);

solution

The answer: `1` and `2`.

The first handler triggers, because it’s not removed by `removeEventListener`. To remove the handler we need to pass exactly the function that was assigned. And in the code a new function is passed, that looks the same, but is still another function.

To remove a function object, we need to store a reference to it, like this:

    function handler() {
      alert(1);
    }

    button.addEventListener("click", handler);
    button.removeEventListener("click", handler);

The handler `button.onclick` works independently and in addition to `addEventListener`.

### <a href="introduction-browser-events.html#move-the-ball-across-the-field" id="move-the-ball-across-the-field" class="main__anchor">Move the ball across the field</a>

<a href="task/move-ball-field.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Move the ball across the field to a click. Like this:

<a href="https://en.js.cx/task/move-ball-field/solution/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

Requirements:

- The ball center should come exactly under the pointer on click (if possible without crossing the field edge).
- CSS-animation is welcome.
- The ball must not cross field boundaries.
- When the page is scrolled, nothing should break.

Notes:

- The code should also work with different ball and field sizes, not be bound to any fixed values.
- Use properties `event.clientX/event.clientY` for click coordinates.

[Open a sandbox for the task.](https://plnkr.co/edit/yi6xXY3XkYDiZbeD?p=preview)

solution

First we need to choose a method of positioning the ball.

We can’t use `position:fixed` for it, because scrolling the page would move the ball from the field.

So we should use `position:absolute` and, to make the positioning really solid, make `field` itself positioned.

Then the ball will be positioned relatively to the field:

    #field {
      width: 200px;
      height: 150px;
      position: relative;
    }

    #ball {
      position: absolute;
      left: 0; /* relative to the closest positioned ancestor (field) */
      top: 0;
      transition: 1s all; /* CSS animation for left/top makes the ball fly */
    }

Next we need to assign the correct `ball.style.left/top`. They contain field-relative coordinates now.

Here’s the picture:

<figure><img src="task/move-ball-field/move-ball-coords.svg" width="521" height="330" /></figure>We have `event.clientX/clientY` – window-relative coordinates of the click.

To get field-relative `left` coordinate of the click, we can substract the field left edge and the border width:

    let left = event.clientX - fieldCoords.left - field.clientLeft;

Normally, `ball.style.left` means the “left edge of the element” (the ball). So if we assign that `left`, then the ball edge, not center, would be under the mouse cursor.

We need to move the ball half-width left and half-height up to make it center.

So the final `left` would be:

    let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;

The vertical coordinate is calculated using the same logic.

Please note that the ball width/height must be known at the time we access `ball.offsetWidth`. Should be specified in HTML or CSS.

[Open the solution in a sandbox.](https://plnkr.co/edit/8dwHzsyytfPDr08F?p=preview)

### <a href="introduction-browser-events.html#create-a-sliding-menu" id="create-a-sliding-menu" class="main__anchor">Create a sliding menu</a>

<a href="task/sliding-menu.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a menu that opens/collapses on click:

P.S. HTML/CSS of the source document is to be modified.

[Open a sandbox for the task.](https://plnkr.co/edit/sDzWgqYxeNrla3Kz?p=preview)

solution

HTML/CSS

#### HTML/CSS

First let’s create HTML/CSS.

A menu is a standalone graphical component on the page, so it’s better to put it into a single DOM element.

A list of menu items can be laid out as a list `ul/li`.

Here’s the example structure:

    <div class="menu">
      <span class="title">Sweeties (click me)!</span>
      <ul>
        <li>Cake</li>
        <li>Donut</li>
        <li>Honey</li>
      </ul>
    </div>

We use `<span>` for the title, because `<div>` has an implicit `display:block` on it, and it will occupy 100% of the horizontal width.

Like this:

    <div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>

So if we set `onclick` on it, then it will catch clicks to the right of the text.

As `<span>` has an implicit `display: inline`, it occupies exactly enough place to fit all the text:

    <span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>

Toggling the menu

#### Toggling the menu

Toggling the menu should change the arrow and show/hide the menu list.

All these changes are perfectly handled by CSS. In JavaScript we should label the current state of the menu by adding/removing the class `.open`.

Without it, the menu will be closed:

    .menu ul {
      margin: 0;
      list-style: none;
      padding-left: 20px;
      display: none;
    }

    .menu .title::before {
      content: '▶ ';
      font-size: 80%;
      color: green;
    }

…And with `.open` the arrow changes and the list shows up:

    .menu.open .title::before {
      content: '▼ ';
    }

    .menu.open ul {
      display: block;
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/bO5pDSqsI4AbQzbL?p=preview)

### <a href="introduction-browser-events.html#add-a-closing-button" id="add-a-closing-button" class="main__anchor">Add a closing button</a>

<a href="task/hide-message.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a list of messages.

Use JavaScript to add a closing button to the right-upper corner of each message.

The result should look like this:

[Open a sandbox for the task.](https://plnkr.co/edit/bIotBX876EI3kDzy?p=preview)

solution

To add the button we can use either `position:absolute` (and make the pane `position:relative`) or `float:right`. The `float:right` has the benefit that the button never overlaps the text, but `position:absolute` gives more freedom. So the choice is yours.

Then for each pane the code can be like:

    pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');

Then the `<button>` becomes `pane.firstChild`, so we can add a handler to it like this:

    pane.firstChild.onclick = () => pane.remove();

[Open the solution in a sandbox.](https://plnkr.co/edit/anSCWBqFUzLiAok5?p=preview)

### <a href="introduction-browser-events.html#carousel" id="carousel" class="main__anchor">Carousel</a>

<a href="task/carousel.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a “carousel” – a ribbon of images that can be scrolled by clicking on arrows.

Later we can add more features to it: infinite scrolling, dynamic loading etc.

P.S. For this task HTML/CSS structure is actually 90% of the solution.

[Open a sandbox for the task.](https://plnkr.co/edit/qP4TJJCtiSTJf6Zi?p=preview)

solution

The images ribbon can be represented as `ul/li` list of images `<img>`.

Normally, such a ribbon is wide, but we put a fixed-size `<div>` around to “cut” it, so that only a part of the ribbon is visible:

<figure><img src="task/carousel/carousel1.svg" width="488" height="246" /></figure>To make the list show horizontally we need to apply correct CSS properties for `<li>`, like `display: inline-block`.

For `<img>` we should also adjust `display`, because by default it’s `inline`. There’s extra space reserved under `inline` elements for “letter tails”, so we can use `display:block` to remove it.

To do the scrolling, we can shift `<ul>`. There are many ways to do it, for instance by changing `margin-left` or (better performance) use `transform: translateX()`:

<figure><img src="task/carousel/carousel2.svg" width="639" height="246" /></figure>The outer `<div>` has a fixed width, so “extra” images are cut.

The whole carousel is a self-contained “graphical component” on the page, so we’d better wrap it into a single `<div class="carousel">` and style things inside it.

[Open the solution in a sandbox.](https://plnkr.co/edit/U6VSlPwWpUfHzlRB?p=preview)

<a href="events.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="bubbling-and-capturing.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fintroduction-browser-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fintroduction-browser-events" </a>

<a href="tutorial/map.html" class="map">

## <a href="introduction-browser-events.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="events.html" class="sidebar__link">Introduction to Events</a>

#### Lesson navigation

- <a href="introduction-browser-events.html#event-handlers" class="sidebar__link">Event handlers</a>
- <a href="introduction-browser-events.html#accessing-the-element-this" class="sidebar__link">Accessing the element: this</a>
- <a href="introduction-browser-events.html#possible-mistakes" class="sidebar__link">Possible mistakes</a>
- <a href="introduction-browser-events.html#addeventlistener" class="sidebar__link">addEventListener</a>
- <a href="introduction-browser-events.html#event-object" class="sidebar__link">Event object</a>
- <a href="introduction-browser-events.html#object-handlers-handleevent" class="sidebar__link">Object handlers: handleEvent</a>
- <a href="introduction-browser-events.html#summary" class="sidebar__link">Summary</a>

- <a href="introduction-browser-events.html#tasks" class="sidebar__link">Tasks (7)</a>
- <a href="introduction-browser-events.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fintroduction-browser-events" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fintroduction-browser-events" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/2-events/01-introduction-browser-events" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
