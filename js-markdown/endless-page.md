EN

- <a href="https://ar.javascript.info/"
- <a href="endless-page.html"
  /endless-page"
  /endless-page"
  endless-pageendless-page"

<!-- -->

- <a href="https://ko.javascript.info/"
  endless-page"
  /endless-page"
  endless-page"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fendless-page"%2Fendless-page" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../event-details.html" UI Events</span></a>

<a href="../onscroll.html" Scrolling</span></a>

<a href="../onscroll.html"

## Endless page

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an endless page. When a visitor scrolls it to the end, it auto-appends current date-time to the text (so that a visitor can scroll more).

Like this:

Please note two important features of the scroll:

1.  **The scroll is “elastic”.** We can scroll a little beyond the document start or end in some browsers/devices (empty space below is shown, and then the document will automatically “bounces back” to normal).
2.  **The scroll is imprecise.** When we scroll to page end, then we may be in fact like 0-50px away from the real document bottom.

So, “scrolling to the end” should mean that the visitor is no more than 100px away from the document end.

P.S. In real life we may want to show “more messages” or “more goods”.

[Open a sandbox for the task.](https://plnkr.co/edit/9og7bth6RKWq4fnw?p=preview)

solution

The core of the solution is a function that adds more dates to the page (or loads more stuff in real-life) while we’re at the page end.

We can call it immediately and add as a `window.onscroll` handler.

The most important question is: “How do we detect that the page is scrolled to bottom?”

Let’s use window-relative coordinates.

The document is represented (and contained) within `<html>` tag, that is `document.documentElement`.

We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

    // when we're on the top of the page
    // window-relative top = 0
    document.documentElement.getBoundingClientRect().top = 0

    // window-relative bottom = 2000
    // the document is long, so that is probably far beyond the window bottom
    document.documentElement.getBoundingClientRect().bottom = 2000

If we scroll `500px` below, then:

    // document top is above the window 500px
    document.documentElement.getBoundingClientRect().top = -500
    // document bottom is 500px closer
    document.documentElement.getBoundingClientRect().bottom = 1500

When we scroll till the end, assuming that the window height is `600px`:

    // document top is above the window 1400px
    document.documentElement.getBoundingClientRect().top = -1400
    // document bottom is below the window 600px
    document.documentElement.getBoundingClientRect().bottom = 600

Please note that the `bottom` can’t be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can’t scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).

So here’s the function:

    function populate() {
      while(true) {
        // document bottom
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

        // if the user hasn't scrolled far enough (>100px to the end)
        if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

        // let's add more data
        document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
      }
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/VVJZRWimYbGiMkqJ?p=preview)
