EN

- <a href="https://ar.javascript.info/"
- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html"
- <a href="https://es.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave"
- <a href="https://fr.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave"
- mousemove-mouseover-mouseout-mouseenter-mouseleave"
  mousemove-mouseover-mouseout-mouseenter-mouseleave"

<!-- -->

- /"
- <a href=mousemove-mouseover-mouseout-mouseenter-mouseleave"
- <a href="https://tr.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave"
- <a href="https://zh.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmousemove-mouseover-mouseout-mouseenter-mouseleave" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmousemove-mouseover-mouseout-mouseenter-mouseleave" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="event-details.html" UI Events</span></a></span>

18th November 2020

# Moving the mouse: mouseover/out, mouseenter/leave

Let’s dive into more details about events that happen when the mouse moves between elements.

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#events-mouseover-mouseout-relatedtarget" id="events-mouseover-mouseout-relatedtarget" class="main__anchor">Events mouseover/mouseout, relatedTarget</a>

The `mouseover` event occurs when a mouse pointer comes over an element, and `mouseout` – when it leaves.

<figure><img src="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseover-mouseout.svg" width="278" height="92" /></figure>These events are special, because they have property `relatedTarget`. This property complements `target`. When a mouse leaves one element for another, one of them becomes `target`, and the other one – `relatedTarget`.

For `mouseover`:

- `event.target` – is the element where the mouse came over.
- `event.relatedTarget` – is the element from which the mouse came (`relatedTarget` → `target`).

For `mouseout` the reverse:

- `event.target` – is the element that the mouse left.
- `event.relatedTarget` – is the new under-the-pointer element, that mouse left for (`target` → `relatedTarget`).

In the example below each face and its features are separate elements. When you move the mouse, you can see mouse events in the text area.

Each event has the information about both `target` and `relatedTarget`:

Result

script.js

style.css

index.html

<a href="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseoverout/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/3dGFqjP8JiDQPZg2?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    container.onmouseover = container.onmouseout = handler;

    function handler(event) {

      function str(el) {
        if (!el) return "null"
        return el.className || el.tagName;
      }

      log.value += event.type + ':  ' +
        'target=' + str(event.target) +
        ',  relatedTarget=' + str(event.relatedTarget) + "\n";
      log.scrollTop = log.scrollHeight;

      if (event.type == 'mouseover') {
        event.target.style.background = 'pink'
      }
      if (event.type == 'mouseout') {
        event.target.style.background = ''
      }
    }

    body,
    html {
      margin: 0;
      padding: 0;
    }

    #container {
      border: 1px solid brown;
      padding: 10px;
      width: 330px;
      margin-bottom: 5px;
      box-sizing: border-box;
    }

    #log {
      height: 120px;
      width: 350px;
      display: block;
      box-sizing: border-box;
    }

    [class^="smiley-"] {
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 20px;
    }

    .smiley-green {
      background: #a9db7a;
      border: 5px solid #92c563;
      position: relative;
    }

    .smiley-green .left-eye {
      width: 18%;
      height: 18%;
      background: #84b458;
      position: relative;
      top: 29%;
      left: 22%;
      border-radius: 50%;
      float: left;
    }

    .smiley-green .right-eye {
      width: 18%;
      height: 18%;
      border-radius: 50%;
      position: relative;
      background: #84b458;
      top: 29%;
      right: 22%;
      float: right;
    }

    .smiley-green .smile {
      position: absolute;
      top: 67%;
      left: 16.5%;
      width: 70%;
      height: 20%;
      overflow: hidden;
    }

    .smiley-green .smile:after,
    .smiley-green .smile:before {
      content: "";
      position: absolute;
      top: -50%;
      left: 0%;
      border-radius: 50%;
      background: #84b458;
      height: 100%;
      width: 97%;
    }

    .smiley-green .smile:after {
      background: #84b458;
      height: 80%;
      top: -40%;
      left: 0%;
    }

    .smiley-yellow {
      background: #eed16a;
      border: 5px solid #dbae51;
      position: relative;
    }

    .smiley-yellow .left-eye {
      width: 18%;
      height: 18%;
      background: #dba652;
      position: relative;
      top: 29%;
      left: 22%;
      border-radius: 50%;
      float: left;
    }

    .smiley-yellow .right-eye {
      width: 18%;
      height: 18%;
      border-radius: 50%;
      position: relative;
      background: #dba652;
      top: 29%;
      right: 22%;
      float: right;
    }

    .smiley-yellow .smile {
      position: absolute;
      top: 67%;
      left: 19%;
      width: 65%;
      height: 14%;
      background: #dba652;
      overflow: hidden;
      border-radius: 8px;
    }

    .smiley-red {
      background: #ee9295;
      border: 5px solid #e27378;
      position: relative;
    }

    .smiley-red .left-eye {
      width: 18%;
      height: 18%;
      background: #d96065;
      position: relative;
      top: 29%;
      left: 22%;
      border-radius: 50%;
      float: left;
    }

    .smiley-red .right-eye {
      width: 18%;
      height: 18%;
      border-radius: 50%;
      position: relative;
      background: #d96065;
      top: 29%;
      right: 22%;
      float: right;
    }

    .smiley-red .smile {
      position: absolute;
      top: 57%;
      left: 16.5%;
      width: 70%;
      height: 20%;
      overflow: hidden;
    }

    .smiley-red .smile:after,
    .smiley-red .smile:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0%;
      border-radius: 50%;
      background: #d96065;
      height: 100%;
      width: 97%;
    }

    .smiley-red .smile:after {
      background: #d96065;
      height: 80%;
      top: 60%;
      left: 0%;
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <div id="container">
        <div class="smiley-green">
          <div class="left-eye"></div>
          <div class="right-eye"></div>
          <div class="smile"></div>
        </div>

        <div class="smiley-yellow">
          <div class="left-eye"></div>
          <div class="right-eye"></div>
          <div class="smile"></div>
        </div>

        <div class="smiley-red">
          <div class="left-eye"></div>
          <div class="right-eye"></div>
          <div class="smile"></div>
        </div>
      </div>

      <textarea id="log">Events will show up here!
    </textarea>

      <script src="script.js"></script>

    </body>
    </html>

<span class="important__type">`relatedTarget` can be `null`</span>

The `relatedTarget` property can be `null`.

That’s normal and just means that the mouse came not from another element, but from out of the window. Or that it left the window.

We should keep that possibility in mind when using `event.relatedTarget` in our code. If we access `event.relatedTarget.tagName`, then there will be an error.

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#skipping-elements" id="skipping-elements" class="main__anchor">Skipping elements</a>

The `mousemove` event triggers when the mouse moves. But that doesn’t mean that every pixel leads to an event.

The browser checks the mouse position from time to time. And if it notices changes then triggers the events.

That means that if the visitor is moving the mouse very fast then some DOM-elements may be skipped:

<figure><img src="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseover-mouseout-over-elems.svg" width="508" height="92" /></figure>If the mouse moves very fast from `#FROM` to `#TO` elements as painted above, then intermediate `<div>` elements (or some of them) may be skipped. The `mouseout` event may trigger on `#FROM` and then immediately `mouseover` on `#TO`.

That’s good for performance, because there may be many intermediate elements. We don’t really want to process in and out of each one.

On the other hand, we should keep in mind that the mouse pointer doesn’t “visit” all elements along the way. It can “jump”.

In particular, it’s possible that the pointer jumps right inside the middle of the page from out of the window. In that case `relatedTarget` is `null`, because it came from “nowhere”:

<figure><img src="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseover-mouseout-from-outside.svg" width="440" height="183" /></figure>You can check it out “live” on a teststand below.

Its HTML has two nested elements: the `<div id="child">` is inside the `<div id="parent">`. If you move the mouse fast over them, then maybe only the child div triggers events, or maybe the parent one, or maybe there will be no events at all.

Also move the pointer into the child `div`, and then move it out quickly down through the parent one. If the movement is fast enough, then the parent element is ignored. The mouse will cross the parent element without noticing it.

Result

script.js

style.css

index.html

<a href="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseoverout-fast/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/JPekeDa1wxumIXNT?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    let parent = document.getElementById('parent');
    parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;

    function handler(event) {
      let type = event.type;
      while (type < 11) type += ' ';

      log(type + " target=" + event.target.id)
      return false;
    }


    function clearText() {
      text.value = "";
      lastMessage = "";
    }

    let lastMessageTime = 0;
    let lastMessage = "";
    let repeatCounter = 1;

    function log(message) {
      if (lastMessageTime == 0) lastMessageTime = new Date();

      let time = new Date();

      if (time - lastMessageTime > 500) {
        message = '------------------------------\n' + message;
      }

      if (message === lastMessage) {
        repeatCounter++;
        if (repeatCounter == 2) {
          text.value = text.value.trim() + ' x 2\n';
        } else {
          text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + repeatCounter + "\n";
        }

      } else {
        repeatCounter = 1;
        text.value += message + "\n";
      }

      text.scrollTop = text.scrollHeight;

      lastMessageTime = time;
      lastMessage = message;
    }

    #parent {
      background: #99C0C3;
      width: 160px;
      height: 120px;
      position: relative;
    }

    #child {
      background: #FFDE99;
      width: 50%;
      height: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    textarea {
      height: 140px;
      width: 300px;
      display: block;
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <div id="parent">parent
        <div id="child">child</div>
      </div>
      <textarea id="text"></textarea>
      <input onclick="clearText()" value="Clear" type="button">

      <script src="script.js"></script>

    </body>

    </html>

<span class="important__type">If `mouseover` triggered, there must be `mouseout`</span>

In case of fast mouse movements, intermediate elements may be ignored, but one thing we know for sure: if the pointer “officially” entered an element (`mouseover` event generated), then upon leaving it we always get `mouseout`.

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#mouseout-when-leaving-for-a-child" id="mouseout-when-leaving-for-a-child" class="main__anchor">Mouseout when leaving for a child</a>

An important feature of `mouseout` – it triggers, when the pointer moves from an element to its descendant, e.g. from `#parent` to `#child` in this HTML:

    <div id="parent">
      <div id="child">...</div>
    </div>

If we’re on `#parent` and then move the pointer deeper into `#child`, we get `mouseout` on `#parent`!

<figure><img src="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseover-to-child.svg" width="274" height="143" /></figure>That may seem strange, but can be easily explained.

**According to the browser logic, the mouse cursor may be only over a _single_ element at any time – the most nested one and top by z-index.**

So if it goes to another element (even a descendant), then it leaves the previous one.

Please note another important detail of event processing.

The `mouseover` event on a descendant bubbles up. So, if `#parent` has `mouseover` handler, it triggers:

<figure><img src="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseover-bubble-nested.svg" width="258" height="143" /></figure>You can see that very well in the example below: `<div id="child">` is inside the `<div id="parent">`. There are `mouseover/out` handlers on `#parent` element that output event details.

If you move the mouse from `#parent` to `#child`, you see two events on `#parent`:

1.  `mouseout [target: parent]` (left the parent), then
2.  `mouseover [target: child]` (came to the child, bubbled).

Result

script.js

style.css

index.html

<a href="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseoverout-child/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/a7aOTFUzIkq1Cdrr?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    function mouselog(event) {
      let d = new Date();
      text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
      text.scrollTop = text.scrollHeight;
    }

    #parent {
      background: #99C0C3;
      width: 160px;
      height: 120px;
      position: relative;
    }

    #child {
      background: #FFDE99;
      width: 50%;
      height: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    textarea {
      height: 140px;
      width: 300px;
      display: block;
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <div id="parent" onmouseover="mouselog(event)" onmouseout="mouselog(event)">parent
        <div id="child">child</div>
      </div>

      <textarea id="text"></textarea>
      <input type="button" onclick="text.value=''" value="Clear">

      <script src="script.js"></script>

    </body>

    </html>

As shown, when the pointer moves from `#parent` element to `#child`, two handlers trigger on the parent element: `mouseout` and `mouseover`:

    parent.onmouseout = function(event) {
      /* event.target: parent element */
    };
    parent.onmouseover = function(event) {
      /* event.target: child element (bubbled) */
    };

**If we don’t examine `event.target` inside the handlers, then it may seem that the mouse pointer left `#parent` element, and then immediately came back over it.**

But that’s not the case! The pointer is still over the parent, it just moved deeper into the child element.

If there are some actions upon leaving the parent element, e.g. an animation runs in `parent.onmouseout`, we usually don’t want it when the pointer just goes deeper into `#parent`.

To avoid it, we can check `relatedTarget` in the handler and, if the mouse is still inside the element, then ignore such event.

Alternatively we can use other events: `mouseenter` and `mouseleave`, that we’ll be covering now, as they don’t have such problems.

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#events-mouseenter-and-mouseleave" id="events-mouseenter-and-mouseleave" class="main__anchor">Events mouseenter and mouseleave</a>

Events `mouseenter/mouseleave` are like `mouseover/mouseout`. They trigger when the mouse pointer enters/leaves the element.

But there are two important differences:

1.  Transitions inside the element, to/from descendants, are not counted.
2.  Events `mouseenter/mouseleave` do not bubble.

These events are extremely simple.

When the pointer enters an element – `mouseenter` triggers. The exact location of the pointer inside the element or its descendants doesn’t matter.

When the pointer leaves an element – `mouseleave` triggers.

This example is similar to the one above, but now the top element has `mouseenter/mouseleave` instead of `mouseover/mouseout`.

As you can see, the only generated events are the ones related to moving the pointer in and out of the top element. Nothing happens when the pointer goes to the child and back. Transitions between descendants are ignored

Result

script.js

style.css

index.html

<a href="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseleave/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/ApJzT0t69pMyJPmq?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    function mouselog(event) {
      let d = new Date();
      text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
      text.scrollTop = text.scrollHeight;
    }

    #parent {
      background: #99C0C3;
      width: 160px;
      height: 120px;
      position: relative;
    }

    #child {
      background: #FFDE99;
      width: 50%;
      height: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    textarea {
      height: 140px;
      width: 300px;
      display: block;
    }

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <div id="parent" onmouseenter="mouselog(event)" onmouseleave="mouselog(event)">parent
        <div id="child">child</div>
      </div>

      <textarea id="text"></textarea>
      <input type="button" onclick="text.value=''" value="Clear">

      <script src="script.js"></script>

    </body>

    </html>

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#event-delegation" id="event-delegation" class="main__anchor">Event delegation</a>

Events `mouseenter/leave` are very simple and easy to use. But they do not bubble. So we can’t use event delegation with them.

Imagine we want to handle mouse enter/leave for table cells. And there are hundreds of cells.

The natural solution would be – to set the handler on `<table>` and process events there. But `mouseenter/leave` don’t bubble. So if such event happens on `<td>`, then only a handler on that `<td>` is able to catch it.

Handlers for `mouseenter/leave` on `<table>` only trigger when the pointer enters/leaves the table as a whole. It’s impossible to get any information about transitions inside it.

So, let’s use `mouseover/mouseout`.

Let’s start with simple handlers that highlight the element under mouse:

    // let's highlight an element under the pointer
    table.onmouseover = function(event) {
      let target = event.target;
      target.style.background = 'pink';
    };

    table.onmouseout = function(event) {
      let target = event.target;
      target.style.background = '';
    };

Here they are in action. As the mouse travels across the elements of this table, the current one is highlighted:

Result

script.js

style.css

index.html

<a href="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseenter-mouseleave-delegation/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/bYA8iBDQXZlqYdfW?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    table.onmouseover = function(event) {
      let target = event.target;
      target.style.background = 'pink';

      text.value += `over -> ${target.tagName}\n`;
      text.scrollTop = text.scrollHeight;
    };

    table.onmouseout = function(event) {
      let target = event.target;
      target.style.background = '';

      text.value += `out <- ${target.tagName}\n`;
      text.scrollTop = text.scrollHeight;
    };

    #text {
      display: block;
      height: 100px;
      width: 456px;
    }

    #table th {
      text-align: center;
      font-weight: bold;
    }

    #table td {
      width: 150px;
      white-space: nowrap;
      text-align: center;
      vertical-align: bottom;
      padding-top: 5px;
      padding-bottom: 12px;
      cursor: pointer;
    }

    #table .nw {
      background: #999;
    }

    #table .n {
      background: #03f;
      color: #fff;
    }

    #table .ne {
      background: #ff6;
    }

    #table .w {
      background: #ff0;
    }

    #table .c {
      background: #60c;
      color: #fff;
    }

    #table .e {
      background: #09f;
      color: #fff;
    }

    #table .sw {
      background: #963;
      color: #fff;
    }

    #table .s {
      background: #f60;
      color: #fff;
    }

    #table .se {
      background: #0c3;
      color: #fff;
    }

    #table .highlight {
      background: red;
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>


      <table id="table">
        <tr>
          <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
        </tr>
        <tr>
          <td class="nw"><strong>Northwest</strong>
            <br>Metal
            <br>Silver
            <br>Elders
          </td>
          <td class="n"><strong>North</strong>
            <br>Water
            <br>Blue
            <br>Change
          </td>
          <td class="ne"><strong>Northeast</strong>
            <br>Earth
            <br>Yellow
            <br>Direction
          </td>
        </tr>
        <tr>
          <td class="w"><strong>West</strong>
            <br>Metal
            <br>Gold
            <br>Youth
          </td>
          <td class="c"><strong>Center</strong>
            <br>All
            <br>Purple
            <br>Harmony
          </td>
          <td class="e"><strong>East</strong>
            <br>Wood
            <br>Blue
            <br>Future
          </td>
        </tr>
        <tr>
          <td class="sw"><strong>Southwest</strong>
            <br>Earth
            <br>Brown
            <br>Tranquility
          </td>
          <td class="s"><strong>South</strong>
            <br>Fire
            <br>Orange
            <br>Fame
          </td>
          <td class="se"><strong>Southeast</strong>
            <br>Wood
            <br>Green
            <br>Romance
          </td>
        </tr>

      </table>

      <textarea id="text"></textarea>

      <input type="button" onclick="text.value=''" value="Clear">

      <script src="script.js"></script>

    </body>
    </html>

In our case we’d like to handle transitions between table cells `<td>`: entering a cell and leaving it. Other transitions, such as inside the cell or outside of any cells, don’t interest us. Let’s filter them out.

Here’s what we can do:

- Remember the currently highlighted `<td>` in a variable, let’s call it `currentElem`.
- On `mouseover` – ignore the event if we’re still inside the current `<td>`.
- On `mouseout` – ignore if we didn’t leave the current `<td>`.

Here’s an example of code that accounts for all possible situations:

    // <td> under the mouse right now (if any)
    let currentElem = null;

    table.onmouseover = function(event) {
      // before entering a new element, the mouse always leaves the previous one
      // if currentElem is set, we didn't leave the previous <td>,
      // that's a mouseover inside it, ignore the event
      if (currentElem) return;

      let target = event.target.closest('td');

      // we moved not into a <td> - ignore
      if (!target) return;

      // moved into <td>, but outside of our table (possible in case of nested tables)
      // ignore
      if (!table.contains(target)) return;

      // hooray! we entered a new <td>
      currentElem = target;
      onEnter(currentElem);
    };


    table.onmouseout = function(event) {
      // if we're outside of any <td> now, then ignore the event
      // that's probably a move inside the table, but out of <td>,
      // e.g. from <tr> to another <tr>
      if (!currentElem) return;

      // we're leaving the element – where to? Maybe to a descendant?
      let relatedTarget = event.relatedTarget;

      while (relatedTarget) {
        // go up the parent chain and check – if we're still inside currentElem
        // then that's an internal transition – ignore it
        if (relatedTarget == currentElem) return;

        relatedTarget = relatedTarget.parentNode;
      }

      // we left the <td>. really.
      onLeave(currentElem);
      currentElem = null;
    };

    // any functions to handle entering/leaving an element
    function onEnter(elem) {
      elem.style.background = 'pink';

      // show that in textarea
      text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
      text.scrollTop = 1e6;
    }

    function onLeave(elem) {
      elem.style.background = '';

      // show that in textarea
      text.value += `out <- ${elem.tagName}.${elem.className}\n`;
      text.scrollTop = 1e6;
    }

Once again, the important features are:

1.  It uses event delegation to handle entering/leaving of any `<td>` inside the table. So it relies on `mouseover/out` instead of `mouseenter/leave` that don’t bubble and hence allow no delegation.
2.  Extra events, such as moving between descendants of `<td>` are filtered out, so that `onEnter/Leave` runs only if the pointer leaves or enters `<td>` as a whole.

Here’s the full example with all details:

Result

script.js

style.css

index.html

<a href="article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseenter-mouseleave-delegation-2/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/Ia2w3ok0klgoLPND?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    // <td> under the mouse right now (if any)
    let currentElem = null;

    table.onmouseover = function(event) {
      // before entering a new element, the mouse always leaves the previous one
      // if currentElem is set, we didn't leave the previous <td>,
      // that's a mouseover inside it, ignore the event
      if (currentElem) return;

      let target = event.target.closest('td');

      // we moved not into a <td> - ignore
      if (!target) return;

      // moved into <td>, but outside of our table (possible in case of nested tables)
      // ignore
      if (!table.contains(target)) return;

      // hooray! we entered a new <td>
      currentElem = target;
      onEnter(currentElem);
    };


    table.onmouseout = function(event) {
      // if we're outside of any <td> now, then ignore the event
      // that's probably a move inside the table, but out of <td>,
      // e.g. from <tr> to another <tr>
      if (!currentElem) return;

      // we're leaving the element – where to? Maybe to a descendant?
      let relatedTarget = event.relatedTarget;

      while (relatedTarget) {
        // go up the parent chain and check – if we're still inside currentElem
        // then that's an internal transition – ignore it
        if (relatedTarget == currentElem) return;

        relatedTarget = relatedTarget.parentNode;
      }

      // we left the <td>. really.
      onLeave(currentElem);
      currentElem = null;
    };

    // any functions to handle entering/leaving an element
    function onEnter(elem) {
      elem.style.background = 'pink';

      // show that in textarea
      text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
      text.scrollTop = 1e6;
    }

    function onLeave(elem) {
      elem.style.background = '';

      // show that in textarea
      text.value += `out <- ${elem.tagName}.${elem.className}\n`;
      text.scrollTop = 1e6;
    }

    #text {
      display: block;
      height: 100px;
      width: 456px;
    }

    #table th {
      text-align: center;
      font-weight: bold;
    }

    #table td {
      width: 150px;
      white-space: nowrap;
      text-align: center;
      vertical-align: bottom;
      padding-top: 5px;
      padding-bottom: 12px;
      cursor: pointer;
    }

    #table .nw {
      background: #999;
    }

    #table .n {
      background: #03f;
      color: #fff;
    }

    #table .ne {
      background: #ff6;
    }

    #table .w {
      background: #ff0;
    }

    #table .c {
      background: #60c;
      color: #fff;
    }

    #table .e {
      background: #09f;
      color: #fff;
    }

    #table .sw {
      background: #963;
      color: #fff;
    }

    #table .s {
      background: #f60;
      color: #fff;
    }

    #table .se {
      background: #0c3;
      color: #fff;
    }

    #table .highlight {
      background: red;
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>


      <table id="table">
        <tr>
          <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
        </tr>
        <tr>
          <td class="nw"><strong>Northwest</strong>
            <br>Metal
            <br>Silver
            <br>Elders
          </td>
          <td class="n"><strong>North</strong>
            <br>Water
            <br>Blue
            <br>Change
          </td>
          <td class="ne"><strong>Northeast</strong>
            <br>Earth
            <br>Yellow
            <br>Direction
          </td>
        </tr>
        <tr>
          <td class="w"><strong>West</strong>
            <br>Metal
            <br>Gold
            <br>Youth
          </td>
          <td class="c"><strong>Center</strong>
            <br>All
            <br>Purple
            <br>Harmony
          </td>
          <td class="e"><strong>East</strong>
            <br>Wood
            <br>Blue
            <br>Future
          </td>
        </tr>
        <tr>
          <td class="sw"><strong>Southwest</strong>
            <br>Earth
            <br>Brown
            <br>Tranquility
          </td>
          <td class="s"><strong>South</strong>
            <br>Fire
            <br>Orange
            <br>Fame
          </td>
          <td class="se"><strong>Southeast</strong>
            <br>Wood
            <br>Green
            <br>Romance
          </td>
        </tr>

      </table>

      <textarea id="text"></textarea>

      <input type="button" onclick="text.value=''" value="Clear">

      <script src="script.js"></script>

    </body>
    </html>

Try to move the cursor in and out of table cells and inside them. Fast or slow – doesn’t matter. Only `<td>` as a whole is highlighted, unlike the example before.

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#summary" id="summary" class="main__anchor">Summary</a>

We covered events `mouseover`, `mouseout`, `mousemove`, `mouseenter` and `mouseleave`.

These things are good to note:

- A fast mouse move may skip intermediate elements.
- Events `mouseover/out` and `mouseenter/leave` have an additional property: `relatedTarget`. That’s the element that we are coming from/to, complementary to `target`.

Events `mouseover/out` trigger even when we go from the parent element to a child element. The browser assumes that the mouse can be only over one element at one time – the deepest one.

Events `mouseenter/leave` are different in that aspect: they only trigger when the mouse comes in and out the element as a whole. Also they do not bubble.

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#improved-tooltip-behavior" id="improved-tooltip-behavior" class="main__anchor">Improved tooltip behavior</a>

<a href="task/behavior-nested-tooltip.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`. The value of this attribute should become the tooltip text.

That’s like the task [Tooltip behavior](task/behavior-tooltip.html), but here the annotated elements can be nested. The most deeply nested tooltip is shown.

Only one tooltip may show up at the same time.

For instance:

    <div data-tooltip="Here – is the house interior" id="house">
      <div data-tooltip="Here – is the roof" id="roof"></div>
      ...
      <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">Hover over me</a>
    </div>

The result in iframe:

[Open a sandbox for the task.](https://plnkr.co/edit/N8Y84iRZJK3JdVjW?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/Ykgy8Hq2hA92bKxe?p=preview)

### <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#smart-tooltip" id="smart-tooltip" class="main__anchor">"Smart" tooltip</a>

<a href="task/hoverintent.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function that shows a tooltip over an element only if the visitor moves the mouse _to it_, but not _through it_.

In other words, if the visitor moves the mouse to the element and stops there – show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?

Technically, we can measure the mouse speed over the element, and if it’s slow then we assume that it comes “over the element” and show the tooltip, if it’s fast – then we ignore it.

Make a universal object `new HoverIntent(options)` for it.

Its `options`:

- `elem` – element to track.
- `over` – a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
- `out` – a function to call when the mouse leaves the element (if `over` was called).

An example of using such object for the tooltip:

    // a sample tooltip
    let tooltip = document.createElement('div');
    tooltip.className = "tooltip";
    tooltip.innerHTML = "Tooltip";

    // the object will track mouse and call over/out
    new HoverIntent({
      elem,
      over() {
        tooltip.style.left = elem.getBoundingClientRect().left + 'px';
        tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
        document.body.append(tooltip);
      },
      out() {
        tooltip.remove();
      }
    });

The demo:

If you move the mouse over the “clock” fast then nothing happens, and if you do it slow or stop on them, then there will be a tooltip.

Please note: the tooltip doesn’t “blink” when the cursor moves between the clock subelements.

[Open a sandbox with tests.](https://plnkr.co/edit/vaC7qQoEslRkWWZ7?p=preview)

solution

The algorithm looks simple:

1.  Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won’t work if we introduce delegation.
2.  When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3.  If the speed is slow, then run `over`.
4.  When we’re going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it’s small, then the speed is small.

Unfortunately, there’s no way to get “current mouse coordinates” in JavaScript. There’s no function like `getCurrentMouseCoordinates()`.

The only way to get coordinates is to listen for mouse events, like `mousemove`, and take coordinates from the event object.

So let’s set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.

P.S. Please note: the solution tests use `dispatchEvent` to see if the tooltip works right.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/n8OtYNISvRNcwCcm?p=preview)

<a href="mouse-events-basics.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="mouse-drag-and-drop.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fmousemove-mouseover-mouseout-mouseenter-mouseleave" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmousemove-mouseover-mouseout-mouseenter-mouseleave" </a>

<a href="tutorial/map.html" class="map">

## <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="event-details.html" class="sidebar__link">UI Events</a>

#### Lesson navigation

- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#events-mouseover-mouseout-relatedtarget" class="sidebar__link">Events mouseover/mouseout, relatedTarget</a>
- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#skipping-elements" class="sidebar__link">Skipping elements</a>
- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#mouseout-when-leaving-for-a-child" class="sidebar__link">Mouseout when leaving for a child</a>
- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#events-mouseenter-and-mouseleave" class="sidebar__link">Events mouseenter and mouseleave</a>
- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#event-delegation" class="sidebar__link">Event delegation</a>
- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#summary" class="sidebar__link">Summary</a>

- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="mousemove-mouseover-mouseout-mouseenter-mouseleave.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fmousemove-mouseover-mouseout-mouseenter-mouseleave" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmousemove-mouseover-mouseout-mouseenter-mouseleave" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/3-event-details/3-mousemove-mouseover-mouseout-mouseenter-mouseleave" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
