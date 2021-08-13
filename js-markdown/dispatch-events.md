EN

langs\_\_title">عربي</span></a>

- <a href="dispatch-events.html"
- <a href="https://es.javascript.info/dispatch-events"
- <a href="https://fr.javascript.info/dispatch-events"
- dispatch-events"
  dispatch-events"

<!-- -->

- /dispatch-events"
- <a href=dispatch-events"
- <a href="https://tr.javascript.info/dispatch-events"
- <a href="https://zh.javascript.info/dispatch-events"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdispatch-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdispatch-events" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="events.html" Introduction to Events</span></a></span>

7th December 2020

# Dispatching custom events

We can not only assign handlers, but also generate events from JavaScript.

Custom events can be used to create “graphical components”. For instance, a root element of our own JS-based menu may trigger events telling what happens with the menu: `open` (menu open), `select` (an item is selected) and so on. Another code may listen for the events and observe what’s happening with the menu.

We can generate not only completely new events, that we invent for our own purposes, but also built-in ones, such as `click`, `mousedown` etc. That may be helpful for automated testing.

## <a href="dispatch-events.html#event-constructor" id="event-constructor" class="main__anchor">Event constructor</a>

Built-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.

We can create `Event` objects like this:

    let event = new Event(type[, options]);

Arguments:

- _type_ – event type, a string like `"click"` or our own like `"my-event"`.

- _options_ – the object with two optional properties:

  - `bubbles: true/false` – if `true`, then the event bubbles.
  - `cancelable: true/false` – if `true`, then the “default action” may be prevented. Later we’ll see what it means for custom events.

  By default both are false: `{bubbles: false, cancelable: false}`.

## <a href="dispatch-events.html#dispatchevent" id="dispatchevent" class="main__anchor">dispatchEvent</a>

After an event object is created, we should “run” it on an element using the call `elem.dispatchEvent(event)`.

Then handlers react on it as if it were a regular browser event. If the event was created with the `bubbles` flag, then it bubbles.

In the example below the `click` event is initiated in JavaScript. The handler works same way as if the button was clicked:

<a href="dispatch-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dispatch-events.html#"

    <button id="elem" onclick="alert('Click!');">Autoclick</button>

    <script>
      let event = new Event("click");
      elem.dispatchEvent(event);
    </script>

<span class="important__type">event.isTrusted</span>

There is a way to tell a “real” user event from a script-generated one.

The property `event.isTrusted` is `true` for events that come from real user actions and `false` for script-generated events.

## <a href="dispatch-events.html#bubbling-example" id="bubbling-example" class="main__anchor">Bubbling example</a>

We can create a bubbling event with the name `"hello"` and catch it on `document`.

All we need is to set `bubbles` to `true`:

<a href="dispatch-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dispatch-events.html#"

    <h1 id="elem">Hello from the script!</h1>

    <script>
      // catch on document...
      document.addEventListener("hello", function(event) { // (1)
        alert("Hello from " + event.target.tagName); // Hello from H1
      });

      // ...dispatch on elem!
      let event = new Event("hello", {bubbles: true}); // (2)
      elem.dispatchEvent(event);

      // the handler on document will activate and display the message.

    </script>

Notes:

1.  We should use `addEventListener` for our custom events, because `on<event>` only exists for built-in events, `document.onhello` doesn’t work.
2.  Must set `bubbles:true`, otherwise the event won’t bubble up.

The bubbling mechanics is the same for built-in (`click`) and custom (`hello`) events. There are also capturing and bubbling stages.

## <a href="dispatch-events.html#mouseevent-keyboardevent-and-others" id="mouseevent-keyboardevent-and-others" class="main__anchor">MouseEvent, KeyboardEvent and others</a>

Here’s a short list of classes for UI Events from the [UI Event specification](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- …

We should use them instead of `new Event` if we want to create such events. For instance, `new MouseEvent("click")`.

The right constructor allows to specify standard properties for that type of event.

Like `clientX/clientY` for a mouse event:

<a href="dispatch-events.html#"
<a href="dispatch-events.html#"

    let event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 100
    });

    alert(event.clientX); // 100

Please note: the generic `Event` constructor does not allow that.

Let’s try:

<a href="dispatch-events.html#"
<a href="dispatch-events.html#"

    let event = new Event("click", {
      bubbles: true, // only bubbles and cancelable
      cancelable: true, // work in the Event constructor
      clientX: 100,
      clientY: 100
    });

    alert(event.clientX); // undefined, the unknown property is ignored!

Technically, we can work around that by assigning directly `event.clientX=100` after creation. So that’s a matter of convenience and following the rules. Browser-generated events always have the right type.

The full list of properties for different UI events is in the specification, for instance, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## <a href="dispatch-events.html#custom-events" id="custom-events" class="main__anchor">Custom events</a>

For our own, completely new events types like `"hello"` we should use `new CustomEvent`. Technically [CustomEvent](https://dom.spec.whatwg.org/#customevent) is the same as `Event`, with one exception.

In the second argument (object) we can add an additional property `detail` for any custom information that we want to pass with the event.

For instance:

<a href="dispatch-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dispatch-events.html#"

    <h1 id="elem">Hello for John!</h1>

    <script>
      // additional details come with the event to the handler
      elem.addEventListener("hello", function(event) {
        alert(event.detail.name);
      });

      elem.dispatchEvent(new CustomEvent("hello", {
        detail: { name: "John" }
      }));
    </script>

The `detail` property can have any data. Technically we could live without, because we can assign any properties into a regular `new Event` object after its creation. But `CustomEvent` provides the special `detail` field for it to evade conflicts with other event properties.

Besides, the event class describes “what kind of event” it is, and if the event is custom, then we should use `CustomEvent` just to be clear about what it is.

## <a href="dispatch-events.html#event-preventdefault" id="event-preventdefault" class="main__anchor">event.preventDefault()</a>

Many browser events have a “default action”, such as navigating to a link, starting a selection, and so on.

For new, custom events, there are definitely no default browser actions, but a code that dispatches such event may have its own plans what to do after triggering the event.

By calling `event.preventDefault()`, an event handler may send a signal that those actions should be canceled.

In that case the call to `elem.dispatchEvent(event)` returns `false`. And the code that dispatched it knows that it shouldn’t continue.

Let’s see a practical example – a hiding rabbit (could be a closing menu or something else).

Below you can see a `#rabbit` and `hide()` function that dispatches `"hide"` event on it, to let all interested parties know that the rabbit is going to hide.

Any handler can listen for that event with `rabbit.addEventListener('hide',...)` and, if needed, cancel the action using `event.preventDefault()`. Then the rabbit won’t disappear:

<a href="dispatch-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dispatch-events.html#"

    <pre id="rabbit">
      |\   /|
       \|_|/
       /. .\
      =\_Y_/=
       {>o<}
    </pre>
    <button onclick="hide()">Hide()</button>

    <script>
      function hide() {
        let event = new CustomEvent("hide", {
          cancelable: true // without that flag preventDefault doesn't work
        });
        if (!rabbit.dispatchEvent(event)) {
          alert('The action was prevented by a handler');
        } else {
          rabbit.hidden = true;
        }
      }

      rabbit.addEventListener('hide', function(event) {
        if (confirm("Call preventDefault?")) {
          event.preventDefault();
        }
      });
    </script>

Please note: the event must have the flag `cancelable: true`, otherwise the call `event.preventDefault()` is ignored.

## <a href="dispatch-events.html#events-in-events-are-synchronous" id="events-in-events-are-synchronous" class="main__anchor">Events-in-events are synchronous</a>

Usually events are processed in a queue. That is: if the browser is processing `onclick` and a new event occurs, e.g. mouse moved, then it’s handling is queued up, corresponding `mousemove` handlers will be called after `onclick` processing is finished.

The notable exception is when one event is initiated from within another one, e.g. using `dispatchEvent`. Such events are processed immediately: the new event handlers are called, and then the current event handling is resumed.

For instance, in the code below the `menu-open` event is triggered during the `onclick`.

It’s processed immediately, without waiting for `onclick` handler to end:

<a href="dispatch-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dispatch-events.html#"

    <button id="menu">Menu (click me)</button>

    <script>
      menu.onclick = function() {
        alert(1);

        menu.dispatchEvent(new CustomEvent("menu-open", {
          bubbles: true
        }));

        alert(2);
      };

      // triggers between 1 and 2
      document.addEventListener('menu-open', () => alert('nested'));
    </script>

The output order is: 1 → nested → 2.

Please note that the nested event `menu-open` is caught on the `document`. The propagation and handling of the nested event is finished before the processing gets back to the outer code (`onclick`).

That’s not only about `dispatchEvent`, there are other cases. If an event handler calls methods that trigger other events – they are processed synchronously too, in a nested fashion.

Let’s say we don’t like it. We’d want `onclick` to be fully processed first, independently from `menu-open` or any other nested events.

Then we can either put the `dispatchEvent` (or another event-triggering call) at the end of `onclick` or, maybe better, wrap it in the zero-delay `setTimeout`:

<a href="dispatch-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dispatch-events.html#"

    <button id="menu">Menu (click me)</button>

    <script>
      menu.onclick = function() {
        alert(1);

        setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
          bubbles: true
        })));

        alert(2);
      };

      document.addEventListener('menu-open', () => alert('nested'));
    </script>

Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `menu.onclick`, so event handlers are totally separate.

The output order becomes: 1 → 2 → nested.

## <a href="dispatch-events.html#summary" id="summary" class="main__anchor">Summary</a>

To generate an event from code, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:

- `bubbles: true` if the event should bubble.
- `cancelable: true` if the `event.preventDefault()` should work.

Other constructors of native events like `MouseEvent`, `KeyboardEvent` and so on accept properties specific to that event type. For instance, `clientX` for mouse events.

For custom events we should use `CustomEvent` constructor. It has an additional option named `detail`, we should assign the event-specific data to it. Then all handlers can access it as `event.detail`.

Despite the technical possibility of generating browser events like `click` or `keydown`, we should use them with great care.

We shouldn’t generate browser events as it’s a hacky way to run handlers. That’s bad architecture most of the time.

Native events might be generated:

- As a dirty hack to make 3rd-party libraries work the needed way, if they don’t provide other means of interaction.
- For automated testing, to “click the button” in the script and see if the interface reacts correctly.

Custom events with our own names are often generated for architectural purposes, to signal what happens inside our menus, sliders, carousels etc.

<a href="default-browser-action.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="event-details.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdispatch-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdispatch-events" </a>

<a href="tutorial/map.html" class="map">

## <a href="dispatch-events.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="events.html" class="sidebar__link">Introduction to Events</a>

#### Lesson navigation

- <a href="dispatch-events.html#event-constructor" class="sidebar__link">Event constructor</a>
- <a href="dispatch-events.html#dispatchevent" class="sidebar__link">dispatchEvent</a>
- <a href="dispatch-events.html#bubbling-example" class="sidebar__link">Bubbling example</a>
- <a href="dispatch-events.html#mouseevent-keyboardevent-and-others" class="sidebar__link">MouseEvent, KeyboardEvent and others</a>
- <a href="dispatch-events.html#custom-events" class="sidebar__link">Custom events</a>
- <a href="dispatch-events.html#event-preventdefault" class="sidebar__link">event.preventDefault()</a>
- <a href="dispatch-events.html#events-in-events-are-synchronous" class="sidebar__link">Events-in-events are synchronous</a>
- <a href="dispatch-events.html#summary" class="sidebar__link">Summary</a>

- <a href="dispatch-events.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fdispatch-events" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdispatch-events" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/2-events/05-dispatch-events" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
