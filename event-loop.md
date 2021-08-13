EN

langs\_\_title">عربي</span></a>

- <a href="event-loop.html"
- <a href="https://es.javascript.info/event-loop"

- <a href="https://it.javascript.info/event-loop"
  event-loop"

<!-- -->

- <a href="https://ko.javascript.info/event-loop"
- <a href=event-loop"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/event-loop"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fevent-loop" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevent-loop" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="ui-misc.html" Miscellaneous</span></a></span>

1st September 2020

# Event loop: microtasks and macrotasks

Browser JavaScript execution flow, as well as in Node.js, is based on an _event loop_.

Understanding how event loop works is important for optimizations, and sometimes for the right architecture.

In this chapter we first cover theoretical details about how things work, and then see practical applications of that knowledge.

## <a href="event-loop.html#event-loop" id="event-loop" class="main__anchor">Event Loop</a>

The _event loop_ concept is very simple. There’s an endless loop, where the JavaScript engine waits for tasks, executes them and then sleeps, waiting for more tasks.

The general algorithm of the engine:

1.  While there are tasks:
    - execute them, starting with the oldest task.
2.  Sleep until a task appears, then go to 1.

That’s a formalization for what we see when browsing a page. The JavaScript engine does nothing most of the time, it only runs if a script/handler/event activates.

Examples of tasks:

- When an external script `<script src="...">` loads, the task is to execute it.
- When a user moves their mouse, the task is to dispatch `mousemove` event and execute handlers.
- When the time is due for a scheduled `setTimeout`, the task is to run its callback.
- …and so on.

Tasks are set – the engine handles them – then waits for more tasks (while sleeping and consuming close to zero CPU).

It may happen that a task comes while the engine is busy, then it’s enqueued.

The tasks form a queue, so-called “macrotask queue” (v8 term):

<figure><img src="article/event-loop/eventLoop.svg" width="479" height="279" /></figure>For instance, while the engine is busy executing a `script`, a user may move their mouse causing `mousemove`, and `setTimeout` may be due and so on, these tasks form a queue, as illustrated on the picture above.

Tasks from the queue are processed on “first come – first served” basis. When the engine browser is done with the `script`, it handles `mousemove` event, then `setTimeout` handler, and so on.

So far, quite simple, right?

Two more details:

1.  Rendering never happens while the engine executes a task. It doesn’t matter if the task takes a long time. Changes to the DOM are painted only after the task is complete.
2.  If a task takes too long, the browser can’t do other tasks, such as processing user events. So after a time, it raises an alert like “Page Unresponsive”, suggesting killing the task with the whole page. That happens when there are a lot of complex calculations or a programming error leading to an infinite loop.

That was the theory. Now let’s see how we can apply that knowledge.

## <a href="event-loop.html#use-case-1-splitting-cpu-hungry-tasks" id="use-case-1-splitting-cpu-hungry-tasks" class="main__anchor">Use-case 1: splitting CPU-hungry tasks</a>

Let’s say we have a CPU-hungry task.

For example, syntax-highlighting (used to colorize code examples on this page) is quite CPU-heavy. To highlight the code, it performs the analysis, creates many colored elements, adds them to the document – for a large amount of text that takes a lot of time.

While the engine is busy with syntax highlighting, it can’t do other DOM-related stuff, process user events, etc. It may even cause the browser to “hiccup” or even “hang” for a bit, which is unacceptable.

We can avoid problems by splitting the big task into pieces. Highlight first 100 lines, then schedule `setTimeout` (with zero-delay) for the next 100 lines, and so on.

To demonstrate this approach, for the sake of simplicity, instead of text-highlighting, let’s take a function that counts from `1` to `1000000000`.

If you run the code below, the engine will “hang” for some time. For server-side JS that’s clearly noticeable, and if you are running it in-browser, then try to click other buttons on the page – you’ll see that no other events get handled until the counting finishes.

<a href="event-loop.html#"
<a href="event-loop.html#"

    let i = 0;

    let start = Date.now();

    function count() {

      // do a heavy job
      for (let j = 0; j < 1e9; j++) {
        i++;
      }

      alert("Done in " + (Date.now() - start) + 'ms');
    }

    count();

The browser may even show a “the script takes too long” warning.

Let’s split the job using nested `setTimeout` calls:

<a href="event-loop.html#"
<a href="event-loop.html#"

    let i = 0;

    let start = Date.now();

    function count() {

      // do a piece of the heavy job (*)
      do {
        i++;
      } while (i % 1e6 != 0);

      if (i == 1e9) {
        alert("Done in " + (Date.now() - start) + 'ms');
      } else {
        setTimeout(count); // schedule the new call (**)
      }

    }

    count();

Now the browser interface is fully functional during the “counting” process.

A single run of `count` does a part of the job `(*)`, and then re-schedules itself `(**)` if needed:

1.  First run counts: `i=1...1000000`.
2.  Second run counts: `i=1000001..2000000`.
3.  …and so on.

Now, if a new side task (e.g. `onclick` event) appears while the engine is busy executing part 1, it gets queued and then executes when part 1 finished, before the next part. Periodic returns to the event loop between `count` executions provide just enough “air” for the JavaScript engine to do something else, to react to other user actions.

The notable thing is that both variants – with and without splitting the job by `setTimeout` – are comparable in speed. There’s not much difference in the overall counting time.

To make them closer, let’s make an improvement.

We’ll move the scheduling to the beginning of the `count()`:

<a href="event-loop.html#"
<a href="event-loop.html#"

    let i = 0;

    let start = Date.now();

    function count() {

      // move the scheduling to the beginning
      if (i < 1e9 - 1e6) {
        setTimeout(count); // schedule the new call
      }

      do {
        i++;
      } while (i % 1e6 != 0);

      if (i == 1e9) {
        alert("Done in " + (Date.now() - start) + 'ms');
      }

    }

    count();

Now when we start to `count()` and see that we’ll need to `count()` more, we schedule that immediately, before doing the job.

If you run it, it’s easy to notice that it takes significantly less time.

Why?

That’s simple: as you remember, there’s the in-browser minimal delay of 4ms for many nested `setTimeout` calls. Even if we set `0`, it’s `4ms` (or a bit more). So the earlier we schedule it – the faster it runs.

Finally, we’ve split a CPU-hungry task into parts – now it doesn’t block the user interface. And its overall execution time isn’t much longer.

## <a href="event-loop.html#use-case-2-progress-indication" id="use-case-2-progress-indication" class="main__anchor">Use case 2: progress indication</a>

Another benefit of splitting heavy tasks for browser scripts is that we can show progress indication.

As mentioned earlier, changes to DOM are painted only after the currently running task is completed, irrespective of how long it takes.

On one hand, that’s great, because our function may create many elements, add them one-by-one to the document and change their styles – the visitor won’t see any “intermediate”, unfinished state. An important thing, right?

Here’s the demo, the changes to `i` won’t show up until the function finishes, so we’ll see only the last value:

<a href="event-loop.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="event-loop.html#"

    <div id="progress"></div>

    <script>

      function count() {
        for (let i = 0; i < 1e6; i++) {
          i++;
          progress.innerHTML = i;
        }
      }

      count();
    </script>

…But we also may want to show something during the task, e.g. a progress bar.

If we split the heavy task into pieces using `setTimeout`, then changes are painted out in-between them.

This looks prettier:

<a href="event-loop.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="event-loop.html#"

    <div id="progress"></div>

    <script>
      let i = 0;

      function count() {

        // do a piece of the heavy job (*)
        do {
          i++;
          progress.innerHTML = i;
        } while (i % 1e3 != 0);

        if (i < 1e7) {
          setTimeout(count);
        }

      }

      count();
    </script>

Now the `<div>` shows increasing values of `i`, a kind of a progress bar.

## <a href="event-loop.html#use-case-3-doing-something-after-the-event" id="use-case-3-doing-something-after-the-event" class="main__anchor">Use case 3: doing something after the event</a>

In an event handler we may decide to postpone some actions until the event bubbled up and was handled on all levels. We can do that by wrapping the code in zero delay `setTimeout`.

In the chapter [Dispatching custom events](dispatch-events.html) we saw an example: custom event `menu-open` is dispatched in `setTimeout`, so that it happens after the “click” event is fully handled.

    menu.onclick = function() {
      // ...

      // create a custom event with the clicked menu item data
      let customEvent = new CustomEvent("menu-open", {
        bubbles: true
      });

      // dispatch the custom event asynchronously
      setTimeout(() => menu.dispatchEvent(customEvent));
    };

## <a href="event-loop.html#macrotasks-and-microtasks" id="macrotasks-and-microtasks" class="main__anchor">Macrotasks and Microtasks</a>

Along with _macrotasks_, described in this chapter, there are _microtasks_, mentioned in the chapter [Microtasks](microtask-queue.html).

Microtasks come solely from our code. They are usually created by promises: an execution of `.then/catch/finally` handler becomes a microtask. Microtasks are used “under the cover” of `await` as well, as it’s another form of promise handling.

There’s also a special function `queueMicrotask(func)` that queues `func` for execution in the microtask queue.

**Immediately after every _macrotask_, the engine executes all tasks from _microtask_ queue, prior to running any other macrotasks or rendering or anything else.**

For instance, take a look:

<a href="event-loop.html#"
<a href="event-loop.html#"

    setTimeout(() => alert("timeout"));

    Promise.resolve()
      .then(() => alert("promise"));

    alert("code");

What’s going to be the order here?

1.  `code` shows first, because it’s a regular synchronous call.
2.  `promise` shows second, because `.then` passes through the microtask queue, and runs after the current code.
3.  `timeout` shows last, because it’s a macrotask.

The richer event loop picture looks like this (order is from top to bottom, that is: the script first, then microtasks, rendering and so on):

<figure><img src="article/event-loop/eventLoop-full.svg" width="407" height="391" /></figure>All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

That’s important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we’d like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask`.

Here’s an example with “counting progress bar”, similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:

<a href="event-loop.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="event-loop.html#"

    <div id="progress"></div>

    <script>
      let i = 0;

      function count() {

        // do a piece of the heavy job (*)
        do {
          i++;
          progress.innerHTML = i;
        } while (i % 1e3 != 0);

        if (i < 1e6) {
          queueMicrotask(count);
        }

      }

      count();
    </script>

## <a href="event-loop.html#summary" id="summary" class="main__anchor">Summary</a>

A more detailed event loop algorithm (though still simplified compared to the [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1.  Dequeue and run the oldest task from the _macrotask_ queue (e.g. “script”).
2.  Execute all _microtasks_:
    - While the microtask queue is not empty:
      - Dequeue and run the oldest microtask.
3.  Render changes if any.
4.  If the macrotask queue is empty, wait till a macrotask appears.
5.  Go to step 1.

To schedule a new _macrotask_:

- Use zero delayed `setTimeout(f)`.

That may be used to split a big calculation-heavy task into pieces, for the browser to be able to react to user events and show progress between them.

Also, used in event handlers to schedule an action after the event is fully handled (bubbling done).

To schedule a new _microtask_

- Use `queueMicrotask(f)`.
- Also promise handlers go through the microtask queue.

There’s no UI or network event handling between microtasks: they run immediately one after another.

So one may want to `queueMicrotask` to execute a function asynchronously, but within the environment state.

<span class="important__type">Web Workers</span>

For long heavy calculations that shouldn’t block the event loop, we can use [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

That’s a way to run code in another, parallel thread.

Web Workers can exchange messages with the main process, but they have their own variables, and their own event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiple CPU cores simultaneously.

<a href="selection-range.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="frames-and-windows.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fevent-loop" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevent-loop" </a>

<a href="tutorial/map.html" class="map">

## <a href="event-loop.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="ui-misc.html" class="sidebar__link">Miscellaneous</a>

#### Lesson navigation

- <a href="event-loop.html#event-loop" class="sidebar__link">Event Loop</a>
- <a href="event-loop.html#use-case-1-splitting-cpu-hungry-tasks" class="sidebar__link">Use-case 1: splitting CPU-hungry tasks</a>
- <a href="event-loop.html#use-case-2-progress-indication" class="sidebar__link">Use case 2: progress indication</a>
- <a href="event-loop.html#use-case-3-doing-something-after-the-event" class="sidebar__link">Use case 3: doing something after the event</a>
- <a href="event-loop.html#macrotasks-and-microtasks" class="sidebar__link">Macrotasks and Microtasks</a>
- <a href="event-loop.html#summary" class="sidebar__link">Summary</a>

- <a href="event-loop.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fevent-loop" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevent-loop" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/99-ui-misc/03-event-loop" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
