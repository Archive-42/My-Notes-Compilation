EN

- <a href="https://ar.javascript.info/"
- <a href="why-return-false-fails.html"
  /why-return-false-fails"
  /why-return-false-fails"
  why-return-false-fails"
  task/why-return-false-fails"

<!-- -->

why-return-false-fails"
why-return-false-fails"

- <a href="https://tr.javascript.info/"
  why-return-false-fails"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fwhy-return-false-fails"%2Fwhy-return-false-fails" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../default-browser-action.html" Browser default actions</span></a>

<a href="../default-browser-action.html"

## Why "return false" doesn't work?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Why in the code below `return false` doesn’t work at all?

<a href="why-return-false-fails.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="why-return-false-fails.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <script>
      function handler() {
        alert( "..." );
        return false;
      }
    </script>

    <a href="https://w3.org" onclick="handler()">the browser will go to w3.org</a>

The browser follows the URL on click, but we don’t want it.

How to fix?

solution

When the browser reads the `on*` attribute like `onclick`, it creates the handler from its content.

For `onclick="handler()"` the function will be:

    function(event) {
      handler() // the content of onclick
    }

Now we can see that the value returned by `handler()` is not used and does not affect the result.

The fix is simple:

<a href="why-return-false-fails.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="why-return-false-fails.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <script>
      function handler() {
        alert("...");
        return false;
      }
    </script>

    <a href="https://w3.org" onclick="return handler()">w3.org</a>

Also we can use `event.preventDefault()`, like this:

<a href="why-return-false-fails.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="why-return-false-fails.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <script>
      function handler(event) {
        alert("...");
        event.preventDefault();
      }
    </script>

    <a href="https://w3.org" onclick="handler(event)">w3.org</a>
