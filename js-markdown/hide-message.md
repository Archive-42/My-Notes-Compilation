EN

langs\_\_title">عربي</span></a>

- <a href="hide-message.html"
  /hide-message"

hide-messagehide-message"

<!-- -->

- /"
  hide-message"
- <a href="https://tr.javascript.info/"
  hide-message"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fhide-message"%2Fhide-message" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../introduction-browser-events.html" Introduction to browser events</span></a>

<a href="../introduction-browser-events.html"

## Add a closing button

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
