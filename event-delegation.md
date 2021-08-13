EN

- <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="event-delegation.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/event-delegation" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- event-delegation" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/event-delegation" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- <a href="https://ko.javascript.info/event-delegation" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="event-delegation%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/event-delegation" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

Search

<span class="share-icons__title">Share</span>2Fevent-delegation" rel="nofollow" &gt;2Fevent-delegation عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="events.html" class="breadcrumbs__link"><span>Introduction to Events</span></a></span>

19th October 2020

# Event delegation

Capturing and bubbling allow us to implement one of most powerful event handling patterns called _event delegation_.

The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.

In the handler we get `event.target` to see where the event actually happened and handle it.

Let’s see an example – the [Ba-Gua diagram](http://en.wikipedia.org/wiki/Ba_gua) reflecting the ancient Chinese philosophy.

Here it is:

<a href="https://en.js.cx/article/event-delegation/bagua/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/Q6Aafx11IW6CnC8k?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

The HTML is like this:

    <table>
      <tr>
        <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
      </tr>
      <tr>
        <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>
        <td class="n">...</td>
        <td class="ne">...</td>
      </tr>
      <tr>...2 more lines of this kind...</tr>
      <tr>...2 more lines of this kind...</tr>
    </table>

The table has 9 cells, but there could be 99 or 9999, doesn’t matter.

**Our task is to highlight a cell `<td>` on click.**

Instead of assign an `onclick` handler to each `<td>` (can be many) – we’ll setup the “catch-all” handler on `<table>` element.

It will use `event.target` to get the clicked element and highlight it.

The code:

    let selectedTd;

    table.onclick = function(event) {
      let target = event.target; // where was the click?

      if (target.tagName != 'TD') return; // not on TD? Then we're not interested

      highlight(target); // highlight it
    };

    function highlight(td) {
      if (selectedTd) { // remove the existing highlight if any
        selectedTd.classList.remove('highlight');
      }
      selectedTd = td;
      selectedTd.classList.add('highlight'); // highlight the new td
    }

Such a code doesn’t care how many cells there are in the table. We can add/remove `<td>` dynamically at any time and the highlighting will still work.

Still, there’s a drawback.

The click may occur not on the `<td>`, but inside it.

In our case if we take a look inside the HTML, we can see nested tags inside `<td>`, like `<strong>`:

    <td>
      <strong>Northwest</strong>
      ...
    </td>

Naturally, if a click happens on that `<strong>` then it becomes the value of `event.target`.

<figure><img src="article/event-delegation/bagua-bubble.svg" width="369" height="216" /></figure>In the handler `table.onclick` we should take such `event.target` and find out whether the click was inside `<td>` or not.

Here’s the improved code:

    table.onclick = function(event) {
      let td = event.target.closest('td'); // (1)

      if (!td) return; // (2)

      if (!table.contains(td)) return; // (3)

      highlight(td); // (4)
    };

Explanations:

1.  The method `elem.closest(selector)` returns the nearest ancestor that matches the selector. In our case we look for `<td>` on the way up from the source element.
2.  If `event.target` is not inside any `<td>`, then the call returns immediately, as there’s nothing to do.
3.  In case of nested tables, `event.target` may be a `<td>`, but lying outside of the current table. So we check if that’s actually _our table’s_ `<td>`.
4.  And, if it’s so, then highlight it.

As the result, we have a fast, efficient highlighting code, that doesn’t care about the total number of `<td>` in the table.

## <a href="event-delegation.html#delegation-example-actions-in-markup" id="delegation-example-actions-in-markup" class="main__anchor">Delegation example: actions in markup</a>

There are other uses for event delegation.

Let’s say, we want to make a menu with buttons “Save”, “Load”, “Search” and so on. And there’s an object with methods `save`, `load`, `search`… How to match them?

The first idea may be to assign a separate handler to each button. But there’s a more elegant solution. We can add a handler for the whole menu and `data-action` attributes for buttons that has the method to call:

    <button data-action="save">Click to Save</button>

The handler reads the attribute and executes the method. Take a look at the working example:

<a href="event-delegation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="event-delegation.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="menu">
      <button data-action="save">Save</button>
      <button data-action="load">Load</button>
      <button data-action="search">Search</button>
    </div>

    <script>
      class Menu {
        constructor(elem) {
          this._elem = elem;
          elem.onclick = this.onClick.bind(this); // (*)
        }

        save() {
          alert('saving');
        }

        load() {
          alert('loading');
        }

        search() {
          alert('searching');
        }

        onClick(event) {
          let action = event.target.dataset.action;
          if (action) {
            this[action]();
          }
        };
      }

      new Menu(menu);
    </script>

Please note that `this.onClick` is bound to `this` in `(*)`. That’s important, because otherwise `this` inside it would reference the DOM element (`elem`), not the `Menu` object, and `this[action]` would not be what we need.

So, what advantages does delegation give us here?

- We don’t need to write the code to assign a handler to each button. Just make a method and put it in the markup.
- The HTML structure is flexible, we can add/remove buttons at any time.

We could also use classes `.action-save`, `.action-load`, but an attribute `data-action` is better semantically. And we can use it in CSS rules too.

## <a href="event-delegation.html#the-behavior-pattern" id="the-behavior-pattern" class="main__anchor">The “behavior” pattern</a>

We can also use event delegation to add “behaviors” to elements _declaratively_, with special attributes and classes.

The pattern has two parts:

1.  We add a custom attribute to an element that describes its behavior.
2.  A document-wide handler tracks events, and if an event happens on an attributed element – performs the action.

### <a href="event-delegation.html#behavior-counter" id="behavior-counter" class="main__anchor">Behavior: Counter</a>

For instance, here the attribute `data-counter` adds a behavior: “increase value on click” to buttons:

<a href="event-delegation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="event-delegation.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    Counter: <input type="button" value="1" data-counter>
    One more counter: <input type="button" value="2" data-counter>

    <script>
      document.addEventListener('click', function(event) {

        if (event.target.dataset.counter != undefined) { // if the attribute exists...
          event.target.value++;
        }

      });
    </script>

If we click a button – its value is increased. Not buttons, but the general approach is important here.

There can be as many attributes with `data-counter` as we want. We can add new ones to HTML at any moment. Using the event delegation we “extended” HTML, added an attribute that describes a new behavior.

<span class="important__type">For document-level handlers – always `addEventListener`</span>

When we assign an event handler to the `document` object, we should always use `addEventListener`, not `document.on<event>`, because the latter will cause conflicts: new handlers overwrite old ones.

For real projects it’s normal that there are many handlers on `document` set by different parts of the code.

### <a href="event-delegation.html#behavior-toggler" id="behavior-toggler" class="main__anchor">Behavior: Toggler</a>

One more example of behavior. A click on an element with the attribute `data-toggle-id` will show/hide the element with the given `id`:

<a href="event-delegation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="event-delegation.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <button data-toggle-id="subscribe-mail">
      Show the subscription form
    </button>

    <form id="subscribe-mail" hidden>
      Your mail: <input type="email">
    </form>

    <script>
      document.addEventListener('click', function(event) {
        let id = event.target.dataset.toggleId;
        if (!id) return;

        let elem = document.getElementById(id);

        elem.hidden = !elem.hidden;
      });
    </script>

Let’s note once again what we did. Now, to add toggling functionality to an element – there’s no need to know JavaScript, just use the attribute `data-toggle-id`.

That may become really convenient – no need to write JavaScript for every such element. Just use the behavior. The document-level handler makes it work for any element of the page.

We can combine multiple behaviors on a single element as well.

The “behavior” pattern can be an alternative to mini-fragments of JavaScript.

## <a href="event-delegation.html#summary" id="summary" class="main__anchor">Summary</a>

Event delegation is really cool! It’s one of the most helpful patterns for DOM events.

It’s often used to add the same handling for many similar elements, but not only for that.

The algorithm:

1.  Put a single handler on the container.
2.  In the handler – check the source element `event.target`.
3.  If the event happened inside an element that interests us, then handle the event.

Benefits:

- Simplifies initialization and saves memory: no need to add many handlers.
- Less code: when adding or removing elements, no need to add/remove handlers.
- DOM modifications: we can mass add/remove elements with `innerHTML` and the like.

The delegation has its limitations of course:

- First, the event must be bubbling. Some events do not bubble. Also, low-level handlers should not use `event.stopPropagation()`.
- Second, the delegation may add CPU load, because the container-level handler reacts on events in any place of the container, no matter whether they interest us or not. But usually the load is negligible, so we don’t take it into account.

## <a href="event-delegation.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="event-delegation.html#hide-messages-with-delegation" id="hide-messages-with-delegation" class="main__anchor">Hide messages with delegation</a>

<a href="task/hide-message-delegate.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a list of messages with removal buttons `[x]`. Make the buttons work.

Like this:

P.S. Should be only one event listener on the container, use event delegation.

[Open a sandbox for the task.](https://plnkr.co/edit/yJWlA1LCUowhwVGG?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/06hFpY54nWey2nDO?p=preview)

### <a href="event-delegation.html#tree-menu" id="tree-menu" class="main__anchor">Tree menu</a>

<a href="task/sliding-tree.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a tree that shows/hides node children on click:

Requirements:

- Only one event handler (use delegation)
- A click outside the node title (on an empty space) should not do anything.

[Open a sandbox for the task.](https://plnkr.co/edit/zQFuLhTPX4lkrokp?p=preview)

solution

The solution has two parts.

1.  Wrap every tree node title into `<span>`. Then we can CSS-style them on `:hover` and handle clicks exactly on text, because `<span>` width is exactly the text width (unlike without it).
2.  Set a handler to the `tree` root node and handle clicks on that `<span>` titles.

[Open the solution in a sandbox.](https://plnkr.co/edit/efPMXY7fSzxUXW5H?p=preview)

### <a href="event-delegation.html#sortable-table" id="sortable-table" class="main__anchor">Sortable table</a>

<a href="task/sortable-table.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Make the table sortable: clicks on `<th>` elements should sort it by corresponding column.

Each `<th>` has the type in the attribute, like this:

    <table id="grid">
      <thead>
        <tr>
          <th data-type="number">Age</th>
          <th data-type="string">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>5</td>
          <td>John</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Ann</td>
        </tr>
        ...
      </tbody>
    </table>

In the example above the first column has numbers, and the second one – strings. The sorting function should handle sort according to the type.

Only `"string"` and `"number"` types should be supported.

The working example:

P.S. The table can be big, with any number of rows and columns.

[Open a sandbox for the task.](https://plnkr.co/edit/Xy6bIm1THcPADrDN?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/Rj3l3JQZitAV3wPm?p=preview)

### <a href="event-delegation.html#tooltip-behavior" id="tooltip-behavior" class="main__anchor">Tooltip behavior</a>

<a href="task/behavior-tooltip.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create JS-code for the tooltip behavior.

When a mouse comes over an element with `data-tooltip`, the tooltip should appear over it, and when it’s gone then hide.

An example of annotated HTML:

    <button data-tooltip="the tooltip is longer than the element">Short button</button>
    <button data-tooltip="HTML<br>tooltip">One more button</button>

Should work like this:

In this task we assume that all elements with `data-tooltip` have only text inside. No nested tags (yet).

Details:

- The distance between the element and the tooltip should be `5px`.
- The tooltip should be centered relative to the element, if possible.
- The tooltip should not cross window edges. Normally it should be above the element, but if the element is at the page top and there’s no space for the tooltip, then below it.
- The tooltip content is given in the `data-tooltip` attribute. It can be arbitrary HTML.

You’ll need two events here:

- `mouseover` triggers when a pointer comes over an element.
- `mouseout` triggers when a pointer leaves an element.

Please use event delegation: set up two handlers on `document` to track all “overs” and “outs” from elements with `data-tooltip` and manage tooltips from there.

After the behavior is implemented, even people unfamiliar with JavaScript can add annotated elements.

P.S. Only one tooltip may show up at a time.

[Open a sandbox for the task.](https://plnkr.co/edit/qzyeY4q7GxRXgqc2?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/YkcXZKcB8AUpLuZN?p=preview)

<a href="bubbling-and-capturing.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="default-browser-action.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fevent-delegation" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevent-delegation" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="event-delegation.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="events.html" class="sidebar__link">Introduction to Events</a>

#### Lesson navigation

- event-delegation.html\#delegation-example-actions-in-markup" &gt;Delegation example: actions in markup
- event-delegation.html\#the-behavior-pattern" &gt;The “behavior” pattern
- event-delegation.html

<!-- -->

- event-delegation.html\#tasks" &gt;Tasks (4)
- event-delegation.html\#comments" &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Fevent-delegation" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevent-delegation" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/2-events/03-event-delegation" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
