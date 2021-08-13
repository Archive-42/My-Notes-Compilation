EN

langs\_\_title">عربي</span></a>

- <a href="modal-dialog.html"
  /modal-dialog"
  /modal-dialog"
  modal-dialogmodal-dialog"

<!-- -->

- <a href="https://ko.javascript.info/"
  modal-dialog"
- <a href="https://tr.javascript.info/"
  modal-dialog"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmodal-dialog"%2Fmodal-dialog" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../forms-controls.html" Forms, controls</span></a>

<a href="../forms-submit.html" Forms: event and method submit</span></a>

<a href="../forms-submit.html"

## Modal form

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `showPrompt(html, callback)` that shows a form with the message `html`, an input field and buttons `OK/CANCEL`.

- A user should type something into a text field and press Enter or the OK button, then `callback(value)` is called with the value they entered.
- Otherwise if the user presses Esc or CANCEL, then `callback(null)` is called.

In both cases that ends the input process and removes the form.

Requirements:

- The form should be in the center of the window.
- The form is _modal_. In other words, no interaction with the rest of the page is possible until the user closes it.
- When the form is shown, the focus should be inside the `<input>` for the user.
- Keys Tab/Shift<span class="shortcut__plus">+</span>Tab should shift the focus between form fields, don’t allow it to leave for other page elements.

Usage example:

    showPrompt("Enter something<br>...smart :)", function(value) {
      alert(value);
    });

A demo in the iframe:

P.S. The source document has HTML/CSS for the form with fixed positioning, but it’s up to you to make it modal.

[Open a sandbox for the task.](https://plnkr.co/edit/uZtz29nBZSMuAixB?p=preview)

solution

A modal window can be implemented using a half-transparent `<div id="cover-div">` that covers the whole window, like this:

    #cover-div {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9000;
      width: 100%;
      height: 100%;
      background-color: gray;
      opacity: 0.3;
    }

Because the `<div>` covers everything, it gets all clicks, not the page below it.

Also we can prevent page scroll by setting `body.style.overflowY='hidden'`.

The form should be not in the `<div>`, but next to it, because we don’t want it to have `opacity`.

[Open the solution in a sandbox.](https://plnkr.co/edit/RYj0BZzi9FSEyTy0?p=preview)
