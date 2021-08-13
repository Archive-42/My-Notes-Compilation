EN

langs\_\_title">عربي</span></a>

- <a href="live-timer.html"
- <a href="https://es.javascript.info/"

live-timer"
"

<!-- -->

live-timer"
live-timer"

- <a href="https://tr.javascript.info/"
  live-timer"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Flive-timer"%2Flive-timer" </a>

<a href="../web-components.html" Web components</span></a>

<a href="../custom-elements.html" Custom elements</span></a>

<a href="../custom-elements.html"

## Live timer element

We already have `<time-formatted>` element to show a nicely formatted time.

Create `<live-timer>` element to show the current time:

1.  It should use `<time-formatted>` internally, not duplicate its functionality.
2.  Ticks (updates) every second.
3.  For every tick, a custom event named `tick` should be generated, with the current date in `event.detail` (see chapter [Dispatching custom events](../dispatch-events.html)).

Usage:

    <live-timer id="elem"></live-timer>

    <script>
      elem.addEventListener('tick', event => console.log(event.detail));
    </script>

Demo:

[Open a sandbox for the task.](https://plnkr.co/edit/XOf4WbLRLApuuYmr?p=preview)

solution

Please note:

1.  We clear `setInterval` timer when the element is removed from the document. That’s important, otherwise it continues ticking even if not needed any more. And the browser can’t clear the memory from this element and referenced by it.
2.  We can access current date as `elem.date` property. All class methods and properties are naturally element methods and properties.

[Open the solution in a sandbox.](https://plnkr.co/edit/5A1yvhPjyH9RbdoX?p=preview)
