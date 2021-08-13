EN

- <a href="https://ar.javascript.info/"
- <a href="which-handlers-run.html"
  /which-handlers-run"

which-handlers-run"
task/which-handlers-run"

<!-- -->

- <a href="https://ko.javascript.info/"
  which-handlers-run"
- <a href="https://tr.javascript.info/"
  which-handlers-run"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fwhich-handlers-run"%2Fwhich-handlers-run" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../introduction-browser-events.html" Introduction to browser events</span></a>

<a href="../introduction-browser-events.html"

## Which handlers run?

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
