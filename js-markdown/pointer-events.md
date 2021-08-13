EN

- <a href="https://ar.javascript.info/pointer-events"
- <a href="pointer-events.html"
- <a href="https://es.javascript.info/pointer-events"
- <a href="https://fr.javascript.info/pointer-events"
- pointer-events"
  "

<!-- -->

- /pointer-events"
- <a href=pointer-events"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/pointer-events"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fpointer-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpointer-events" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="event-details.html" UI Events</span></a></span>

8th August 2021

# Pointer events

Pointer events are a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen, and so on.

## <a href="pointer-events.html#the-brief-history" id="the-brief-history" class="main__anchor">The brief history</a>

Let’s make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

- Long ago, in the past, there were only mouse events.

  Then touch devices became widespread, phones and tablets in particular. For the existing scripts to work, they generated (and still generate) mouse events. For instance, tapping a touchscreen generates `mousedown`. So touch devices worked well with web pages.

  But touch devices have more capabilities than a mouse. For example, it’s possible to touch multiple points at once (“multi-touch”). Although, mouse events don’t have necessary properties to handle such multi-touches.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don’t cover them in detail here, because pointer events are even better).

  Still, it wasn’t enough, as there are many other devices, such as pens, that have their own features. Also, writing code that listens for both touch and mouse events was cumbersome.

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the newer [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works and is mostly compatible with Pointer Events level 2.

Unless you develop for old browsers, such as Internet Explorer 10, or for Safari 12 or below, there’s no point in using mouse or touch events any more – we can switch to pointer events.

Then your code will work well with both touch and mouse devices.

That said, there are some important peculiarities that one should know in order to use Pointer Events correctly and avoid surprises. We’ll make note of them in this article.

## <a href="pointer-events.html#pointer-event-types" id="pointer-event-types" class="main__anchor">Pointer event types</a>

Pointer events are named similarly to mouse events:

<table><thead><tr class="header"><th>Pointer event</th><th>Similar mouse event</th></tr></thead><tbody><tr class="odd"><td><code>pointerdown</code></td><td><code>mousedown</code></td></tr><tr class="even"><td><code>pointerup</code></td><td><code>mouseup</code></td></tr><tr class="odd"><td><code>pointermove</code></td><td><code>mousemove</code></td></tr><tr class="even"><td><code>pointerover</code></td><td><code>mouseover</code></td></tr><tr class="odd"><td><code>pointerout</code></td><td><code>mouseout</code></td></tr><tr class="even"><td><code>pointerenter</code></td><td><code>mouseenter</code></td></tr><tr class="odd"><td><code>pointerleave</code></td><td><code>mouseleave</code></td></tr><tr class="even"><td><code>pointercancel</code></td><td>-</td></tr><tr class="odd"><td><code>gotpointercapture</code></td><td>-</td></tr><tr class="even"><td><code>lostpointercapture</code></td><td>-</td></tr></tbody></table>

As we can see, for every `mouse<event>`, there’s a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don’t have a corresponding `mouse...` counterpart, we’ll explain them soon.

<span class="important__type">Replacing `mouse<event>` with `pointer<event>` in our code</span>

We can replace `mouse<event>` events with `pointer<event>` in our code and expect things to continue working fine with mouse.

The support for touch devices will also “magically” improve. Although, we may need to add `touch-action: none` in some places in CSS. We’ll cover it below in the section about `pointercancel`.

## <a href="pointer-events.html#pointer-event-properties" id="pointer-event-properties" class="main__anchor">Pointer event properties</a>

Pointer events have the same properties as mouse events, such as `clientX/Y`, `target`, etc., plus some others:

- `pointerId` – the unique identifier of the pointer causing the event.

  Browser-generated. Allows us to handle multiple pointers, such as a touchscreen with stylus and multi-touch (examples will follow).

- `pointerType` – the pointing device type. Must be a string, one of: “mouse”, “pen” or “touch”.

  We can use this property to react differently on various pointer types.

- `isPrimary` – is `true` for the primary pointer (the first finger in multi-touch).

Some pointer devices measure contact area and pressure, e.g. for a finger on the touchscreen, there are additional properties for that:

- `width` – the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it’s always `1`.
- `height` – the height of the area where the pointer touches the device. Where unsupported, it’s always `1`.
- `pressure` – the pressure of the pointer tip, in range from 0 to 1. For devices that don’t support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` – the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` – pen-specific properties that describe how the pen is positioned relative the surface.

These properties aren’t supported by most devices, so they are rarely used. You can find the details about them in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if needed.

## <a href="pointer-events.html#multi-touch" id="multi-touch" class="main__anchor">Multi-touch</a>

One of the things that mouse events totally don’t support is multi-touch: a user can touch in several places at once on their phone or tablet, or perform special gestures.

Pointer Events allow handling multi-touch with the help of the `pointerId` and `isPrimary` properties.

Here’s what happens when a user touches a touchscreen in one place, then puts another finger somewhere else on it:

1.  At the first finger touch:
    - `pointerdown` with `isPrimary=true` and some `pointerId`.
2.  For the second finger and more fingers (assuming the first one is still touching):
    - `pointerdown` with `isPrimary=false` and a different `pointerId` for every finger.

Please note: the `pointerId` is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events, each with their respective coordinates and a different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

We can track multiple touching fingers using their `pointerId`. When the user moves and then removes a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`.

Here’s the demo that logs `pointerdown` and `pointerup` events:

<a href="https://plnkr.co/edit/opqY3aaDV98DQq14?p=preview"

Please note: you must be using a touchscreen device, such as a phone or a tablet, to actually see the difference in `pointerId/isPrimary`. For single-touch devices, such as a mouse, there’ll be always same `pointerId` with `isPrimary=true`, for all pointer events.

## <a href="pointer-events.html#event-pointercancel" id="event-pointercancel" class="main__anchor">Event: pointercancel</a>

The `pointercancel` event fires when there’s an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated.

Such causes are:

- The pointer device hardware was physically disabled.
- The device orientation changed (tablet rotated).
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

We’ll demonstrate `pointercancel` on a practical example to see how it affects us.

Let’s say we’re impelementing drag’n’drop for a ball, just as in the beginning of the article [Drag'n'Drop with mouse events](mouse-drag-and-drop.html).

Here is the flow of user actions and the corresponding events:

1.  The user presses on an image, to start dragging
    - `pointerdown` event fires
2.  Then they start moving the pointer (thus dragging the image)
    - `pointermove` fires, maybe several times
3.  And then the surprise happens! The browser has native drag’n’drop support for images, that kicks in and takes over the drag’n’drop process, thus generating `pointercancel` event.
    - The browser now handles drag’n’drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
    - No more `pointermove` events for us.

So the issue is that the browser “hijacks” the interaction: `pointercancel` fires in the beginning of the “drag-and-drop” process, and no more `pointermove` events are generated.

Here’s the drag’n’drop demo with loggin of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`:

<a href="https://plnkr.co/edit/PfFxuvmXk9zxpi3G?p=preview"

We’d like to implement the drag’n’drop on our own, so let’s tell the browser not to take it over.

**Prevent the default browser action to avoid `pointercancel`.**

We need to do two things:

1.  Prevent native drag’n’drop from happening:
    - We can do this by setting `ball.ondragstart = () => false`, just as described in the article [Drag'n'Drop with mouse events](mouse-drag-and-drop.html).
    - That works well for mouse events.
2.  For touch devices, there are other touch-related browser actions (besides drag’n’drop). To avoid problems with them too:
    - Prevent them by setting `#ball { touch-action: none }` in CSS.
    - Then our code will start working on touch devices.

After we do that, the events will work as intended, the browser won’t hijack the process and doesn’t emit `pointercancel`.

This demo adds these lines:

<a href="https://plnkr.co/edit/irKEQzX6QCyEukDq?p=preview"

As you can see, there’s no `pointercancel` any more.

Now we can add the code to actually move the ball, and our drag’n’drop will work for mouse devices and touch devices.

## <a href="pointer-events.html#pointer-capturing" id="pointer-capturing" class="main__anchor">Pointer capturing</a>

Pointer capturing is a special feature of pointer events.

The idea is very simple, but may seem quite odd at first, as nothing like that exists for any other event type.

The main method is:

- `elem.setPointerCapture(pointerId)` – binds events with the given `pointerId` to `elem`. After the call all pointer events with the same `pointerId` will have `elem` as the target (as if happened on `elem`), no matter where in document they really happened.

In other words, `elem.setPointerCapture(pointerId)` retargets all subsequent events with the given `pointerId` to `elem`.

The binding is removed:

- automatically when `pointerup` or `pointercancel` events occur,
- automatically when `elem` is removed from the document,
- when `elem.releasePointerCapture(pointerId)` is called.

Now what is it good for? It’s time to see a real-life example.

**Pointer capturing can be used to simplify drag’n’drop kind of interactions.**

Let’s recall how one can implement a custom slider, described in the [Drag'n'Drop with mouse events](mouse-drag-and-drop.html).

We can make a `slider` element to represent the strip and the “runner” (`thumb`) inside it:

    <div class="slider">
      <div class="thumb"></div>
    </div>

With styles, it looks like this:

<a href="https://plnkr.co/edit/tCksXHR1RO8JCUMs?p=preview"

And here’s the working logic, as it was described, after replacing mouse events with similar pointer events:

1.  The user presses on the slider `thumb` – `pointerdown` triggers.
2.  Then they move the pointer – `pointermove` triggers, and our code moves the `thumb` element along.
    - …As the pointer moves, it may leave the slider `thumb` element, go above or below it. The `thumb` should move strictly horizontally, remaining aligned with the pointer.

In the mouse event based solution, to track all pointer movements, including when it goes above/below the `thumb`, we had to assign `mousemove` event handler on the whole `document`.

That’s not a cleanest solution, though. One of the problems is that when a user moves the pointer around the document, it may trigger event handlers (such as `mouseover`) on some other elements, invoke totally unrelated UI functionality, and we don’t want that.

This is the place where `setPointerCapture` comes into play.

- We can call `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler,
- Then future pointer events until `pointerup/cancel` will be retargeted to `thumb`.
- When `pointerup` happens (dragging complete), the binding is removed automatically, we don’t need to care about it.

So, even if the user moves the pointer around the whole document, events handlers will be called on `thumb`. Nevertheless, coordinate properties of the event objects, such as `clientX/clientY` will still be correct – the capturing only affects `target/currentTarget`.

Here’s the essential code:

    thumb.onpointerdown = function(event) {
      // retarget all pointer events (until pointerup) to thumb
      thumb.setPointerCapture(event.pointerId);

      // start tracking pointer moves
      thumb.onpointermove = function(event) {
        // moving the slider: listen on the thumb, as all pointer events are retargeted to it
        let newLeft = event.clientX - slider.getBoundingClientRect().left;
        thumb.style.left = newLeft + 'px';
      };

      // on pointer up finish tracking pointer moves
      thumb.onpointerup = function(event) {
        thumb.onpointermove = null;
        thumb.onpointerup = null;
        // ...also process the "drag end" if needed
      };
    };

    // note: no need to call thumb.releasePointerCapture,
    // it happens on pointerup automatically

The full demo:

<a href="https://plnkr.co/edit/zSi5dCJOiabaCHfw?p=preview"

In the demo, there’s also an additional element with `onmouseover` handler showing the current date.

Please note: while you’re dragging the thumb, you may hover over this element, and its handler _does not_ trigger.

So the dragging is now free of side effects, thanks to `setPointerCapture`.

At the end, pointer capturing gives us two benefits:

1.  The code becomes cleaner as we don’t need to add/remove handlers on the whole `document` any more. The binding is released automatically.
2.  If there are other pointer event handlers in the document, they won’t be accidentally triggered by the pointer while the user is dragging the slider.

### <a href="pointer-events.html#pointer-capturing-events" id="pointer-capturing-events" class="main__anchor">Pointer capturing events</a>

There’s one more thing to mention here, for the sake of completeness.

There are two events associated with pointer capturing:

- `gotpointercapture` fires when an element uses `setPointerCapture` to enable capturing.
- `lostpointercapture` fires when the capture is released: either explicitly with `releasePointerCapture` call, or automatically on `pointerup`/`pointercancel`.

## <a href="pointer-events.html#summary" id="summary" class="main__anchor">Summary</a>

Pointer events allow handling mouse, touch and pen events simultaneously, with a single piece of code.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

For drag’n’drops and complex touch interactions that the browser may decide to hijack and handle on its own – remember to cancel the default action on events and set `touch-events: none` in CSS for elements that we engage.

Additional abilities of pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height`, and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, especially if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.

<a href="mouse-drag-and-drop.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="keyboard-events.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fpointer-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpointer-events" </a>

<a href="tutorial/map.html" class="map">

## <a href="pointer-events.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="event-details.html" class="sidebar__link">UI Events</a>

#### Lesson navigation

- <a href="pointer-events.html#the-brief-history" class="sidebar__link">The brief history</a>
- <a href="pointer-events.html#pointer-event-types" class="sidebar__link">Pointer event types</a>
- <a href="pointer-events.html#pointer-event-properties" class="sidebar__link">Pointer event properties</a>
- <a href="pointer-events.html#multi-touch" class="sidebar__link">Multi-touch</a>
- <a href="pointer-events.html#event-pointercancel" class="sidebar__link">Event: pointercancel</a>
- <a href="pointer-events.html#pointer-capturing" class="sidebar__link">Pointer capturing</a>
- <a href="pointer-events.html#summary" class="sidebar__link">Summary</a>

- <a href="pointer-events.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fpointer-events" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpointer-events" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/3-event-details/6-pointer-events" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
