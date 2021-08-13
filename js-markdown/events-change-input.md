EN

langs\_\_title">عربي</span></a>

- <a href="events-change-input.html"
- <a href="https://es.javascript.info/events-change-input"
- <a href="https://fr.javascript.info/events-change-input"
- events-change-input"
  events-change-input"

<!-- -->

- /events-change-input"
- <a href=events-change-input"
- <a href="https://tr.javascript.info/events-change-input"
- <a href="https://zh.javascript.info/events-change-input"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fevents-change-input" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevents-change-input" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="forms-controls.html" Forms, controls</span></a></span>

22nd November 2020

# Events: change, input, cut, copy, paste

Let’s cover various events that accompany data updates.

## <a href="events-change-input.html#event-change" id="event-change" class="main__anchor">Event: change</a>

The `change` event triggers when the element has finished changing.

For text inputs that means that the event occurs when it loses focus.

For instance, while we are typing in the text field below – there’s no event. But when we move the focus somewhere else, for instance, click on a button – there will be a `change` event:

<a href="events-change-input.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="events-change-input.html#"

    <input type="text" onchange="alert(this.value)">
    <input type="button" value="Button">

For other elements: `select`, `input type=checkbox/radio` it triggers right after the selection changes:

<a href="events-change-input.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="events-change-input.html#"

    <select onchange="alert(this.value)">
      <option value="">Select something</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>

## <a href="events-change-input.html#event-input" id="event-input" class="main__anchor">Event: input</a>

The `input` event triggers every time after a value is modified by the user.

Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.

For instance:

<a href="events-change-input.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="events-change-input.html#"

    <input type="text" id="input"> oninput: <span id="result"></span>
    <script>
      input.oninput = function() {
        result.innerHTML = input.value;
      };
    </script>

If we want to handle every modification of an `<input>` then this event is the best choice.

On the other hand, `input` event doesn’t trigger on keyboard input and other actions that do not involve value change, e.g. pressing arrow keys ⇦ ⇨ while in the input.

<span class="important__type">Can’t prevent anything in `oninput`</span>

The `input` event occurs after the value is modified.

So we can’t use `event.preventDefault()` there – it’s just too late, there would be no effect.

## <a href="events-change-input.html#events-cut-copy-paste" id="events-cut-copy-paste" class="main__anchor">Events: cut, copy, paste</a>

These events occur on cutting/copying/pasting a value.

They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is copied/pasted.

We also can use `event.preventDefault()` to abort the action, then nothing gets copied/pasted.

For instance, the code below prevents all such events and shows what we are trying to cut/copy/paste:

<a href="events-change-input.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="events-change-input.html#"

    <input type="text" id="input">
    <script>
      input.oncut = input.oncopy = input.onpaste = function(event) {
        alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
        return false;
      };
    </script>

Please note, that it’s possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That’s because `clipboardData` implements `DataTransfer` interface, commonly used for drag’n’drop and copy/pasting. It’s bit beyound our scope now, but you can find its methods [in the specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

<span class="important__type">ClipboardAPI: user safety restrictions</span>

The clipboard is a “global” OS-level thing. So most browsers allow read/write access to the clipboard only in the scope of certain user actions for the safety, e.g. in `onclick` event handlers.

Also it’s forbidden to generate “custom” clipboard events with `dispatchEvent` in all browsers except Firefox.

## <a href="events-change-input.html#summary" id="summary" class="main__anchor">Summary</a>

Data change events:

<table><thead><tr class="header"><th>Event</th><th>Description</th><th>Specials</th></tr></thead><tbody><tr class="odd"><td><code>change</code></td><td>A value was changed.</td><td>For text inputs triggers on focus loss.</td></tr><tr class="even"><td><code>input</code></td><td>For text inputs on every change.</td><td>Triggers immediately unlike <code>change</code>.</td></tr><tr class="odd"><td><code>cut/copy/paste</code></td><td>Cut/copy/paste actions.</td><td>The action can be prevented. The <code>event.clipboardData</code> property gives read/write access to the clipboard.</td></tr></tbody></table>

## <a href="events-change-input.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="events-change-input.html#deposit-calculator" id="deposit-calculator" class="main__anchor">Deposit calculator</a>

<a href="task/deposit-calculator.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an interface that allows to enter a sum of bank deposit and percentage, then calculates how much it will be after given periods of time.

Here’s the demo:

Any input change should be processed immediately.

The formula is:

    // initial: the initial money sum
    // interest: e.g. 0.05 means 5% per year
    // years: how many years to wait
    let result = Math.round(initial * (1 + interest * years));

[Open a sandbox for the task.](https://plnkr.co/edit/m91aRhjRUmEfzctR?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/RDYGjvI0orX6oZfU?p=preview)

<a href="focus-blur.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="forms-submit.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fevents-change-input" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevents-change-input" </a>

<a href="tutorial/map.html" class="map">

## <a href="events-change-input.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="forms-controls.html" class="sidebar__link">Forms, controls</a>

#### Lesson navigation

- <a href="events-change-input.html#event-change" class="sidebar__link">Event: change</a>
- <a href="events-change-input.html#event-input" class="sidebar__link">Event: input</a>
- <a href="events-change-input.html#events-cut-copy-paste" class="sidebar__link">Events: cut, copy, paste</a>
- <a href="events-change-input.html#summary" class="sidebar__link">Summary</a>

- <a href="events-change-input.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="events-change-input.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fevents-change-input" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fevents-change-input" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/4-forms-controls/3-events-change-input" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
