EN

- <a href="https://ar.javascript.info/"
- <a href="catch-link-navigation.html"
  catch-link-navigation"
  /catch-link-navigation"
  catch-link-navigationcatch-link-navigation"

<!-- -->

catch-link-navigation"
/catch-link-navigation"

- <a href="https://tr.javascript.info/"
  ask/catch-link-navigation"k%2Fcatch-link-navigation"%2Fcatch-link-navigation" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../default-browser-action.html" Browser default actions</span></a>

<a href="../default-browser-action.html"

## Catch links in the element

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make all links inside the element with `id="contents"` ask the user if they really want to leave. And if they don’t then don’t follow.

Like this:

Details:

- HTML inside the element may be loaded or regenerated dynamically at any time, so we can’t find all links and put handlers on them. Use event delegation.
- The content may have nested tags. Inside links too, like `<a href=".."><i>...</i></a>`.

[Open a sandbox for the task.](https://plnkr.co/edit/2q3DhC51iVEYU3Ht?p=preview)

solution

That’s a great use of the event delegation pattern.

In real life instead of asking we can send a “logging” request to the server that saves the information about where the visitor left. Or we can load the content and show it right in the page (if allowable).

All we need is to catch the `contents.onclick` and use `confirm` to ask the user. A good idea would be to use `link.getAttribute('href')` instead of `link.href` for the URL. See the solution for details.

[Open the solution in a sandbox.](https://plnkr.co/edit/dFmfWhLtL4Gd4ryk?p=preview)
