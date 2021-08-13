EN

- <a href="https://ar.javascript.info/"
- <a href="create-notification.html"
  /create-notification"

create-notificationcreate-notification"

<!-- -->

create-notification"
create-notification"

- <a href="https://tr.javascript.info/"
  create-notification"

k%2Fcreate-notification"%2Fcreate-notification" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../styles-and-classes.html" Styles and classes</span></a>

<a href="../styles-and-classes.html"

## Create a notification

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `showNotification(options)` that creates a notification: `<div class="notification">` with the given content. The notification should automatically disappear after 1.5 seconds.

The options are:

    // shows an element with the text "Hello" near the right-top of the window
    showNotification({
      top: 10, // 10px from the top of the window (by default 0px)
      right: 10, // 10px from the right edge of the window (by default 0px)
      html: "Hello!", // the HTML of notification
      className: "welcome" // an additional class for the div (optional)
    });

[Demo in new window](https://en.js.cx/task/create-notification/solution/)

Use CSS positioning to show the element at given top/right coordinates. The source document has the necessary styles.

[Open a sandbox for the task.](https://plnkr.co/edit/EiI2BEo4NfYjBbnb?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/iSJDfGZFJcTpZ4vq?p=preview)
