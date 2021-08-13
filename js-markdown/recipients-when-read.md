EN

langs\_\_title">عربي</span></a>

- <a href="recipients-when-read.html"
  /recipients-when-read"
  /recipients-when-read"
  recipients-when-readrecipients-when-read"

<!-- -->

recipients-when-read"
recipients-when-read"

- <a href="https://tr.javascript.info/"
  recipients-when-read"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frecipients-when-read"%2Frecipients-when-read" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../weakmap-weakset.html" WeakMap and WeakSet</span></a>

<a href="../weakmap-weakset.html"

## Store read dates

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s an array of messages as in the [previous task](recipients-read.html). The situation is similar.

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

The question now is: which data structure you’d suggest to store the information: “when the message was read?”.

In the previous task we only needed to store the “yes/no” fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we’ll cover later.

solution

To store a date, we can use `WeakMap`:

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

    let readMap = new WeakMap();

    readMap.set(messages[0], new Date(2017, 1, 1));
    // Date object we'll study later
