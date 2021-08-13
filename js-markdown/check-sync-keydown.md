EN

- <a href="https://ar.javascript.info/"
- <a href="check-sync-keydown.html"
- <a href="https://es.javascript.info/"
  /check-sync-keydown"
  check-sync-keydowncheck-sync-keydown"

<!-- -->

- <a href="https://ko.javascript.info/"
  /check-sync-keydown"
  /check-sync-keydown"
  ask/check-sync-keydown"

k%2Fcheck-sync-keydown"%2Fcheck-sync-keydown" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../event-details.html" UI Events</span></a>

<a href="../keyboard-events.html" Keyboard: keydown and keyup</span></a>

<a href="../keyboard-events.html"

## Extended hotkeys

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `runOnKeys(func, code1, code2, ... code_n)` that runs `func` on simultaneous pressing of keys with codes `code1`, `code2`, …, `code_n`.

For instance, the code below shows `alert` when `"Q"` and `"W"` are pressed together (in any language, with or without CapsLock)

    runOnKeys(
      () => alert("Hello!"),
      "KeyQ",
      "KeyW"
    );

[Demo in new window](https://en.js.cx/task/check-sync-keydown/solution/)

solution

We should use two handlers: `document.onkeydown` and `document.onkeyup`.

Let’s create a set `pressed = new Set()` to keep currently pressed keys.

The first handler adds to it, while the second one removes from it. Every time on `keydown` we check if we have enough keys pressed, and run the function if it is so.

[Open the solution in a sandbox.](https://plnkr.co/edit/W0sa74x8GS59kXwb?p=preview)
