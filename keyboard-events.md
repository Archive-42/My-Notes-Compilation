EN

- <a href="https://ar.javascript.info/"
- <a href="keyboard-events.html"
- <a href="https://es.javascript.info/"
- <a href="https://fr.javascript.info/keyboard-events"
- keyboard-events"
  keyboard-events"

<!-- -->

- /"
- <a href=keyboard-events"
- <a href="https://tr.javascript.info/keyboard-events"
- <a href="https://zh.javascript.info/keyboard-events"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fkeyboard-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fkeyboard-events" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="event-details.html" UI Events</span></a></span>

19th June 2021

# Keyboard: keydown and keyup

Before we get to keyboard, please note that on modern devices there are other ways to “input something”. For instance, people use speech recognition (especially on mobile devices) or copy/paste with the mouse.

So if we want to track any input into an `<input>` field, then keyboard events are not enough. There’s another event named `input` to track changes of an `<input>` field, by any means. And it may be a better choice for such task. We’ll cover it later in the chapter [Events: change, input, cut, copy, paste](events-change-input.html).

Keyboard events should be used when we want to handle keyboard actions (virtual keyboard also counts). For instance, to react on arrow keys Up and Down or hotkeys (including combinations of keys).

## <a href="keyboard-events.html#keyboard-test-stand" id="keyboard-test-stand" class="main__anchor">Teststand</a>

To better understand keyboard events, you can use the teststand below.

Try different key combinations in the text field.

Result

script.js

style.css

index.html

<a href="article/keyboard-events/keyboard-dump/index.html" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/svNVUxadu39knD75?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

    let lastTime = Date.now();

    function handle(e) {
      if (form.elements[e.type + 'Ignore'].checked) return;

      let text = e.type +
        ' key=' + e.key +
        ' code=' + e.code +
        (e.shiftKey ? ' shiftKey' : '') +
        (e.ctrlKey ? ' ctrlKey' : '') +
        (e.altKey ? ' altKey' : '') +
        (e.metaKey ? ' metaKey' : '') +
        (e.repeat ? ' (repeat)' : '') +
        "\n";

      if (area.value && Date.now() - lastTime > 250) {
        area.value += new Array(81).join('-') + '\n';
      }
      lastTime = Date.now();

      area.value += text;

      if (form.elements[e.type + 'Stop'].checked) {
        e.preventDefault();
      }
    }

    #kinput {
      font-size: 150%;
      box-sizing: border-box;
      width: 95%;
    }

    #area {
      width: 95%;
      box-sizing: border-box;
      height: 250px;
      border: 1px solid black;
      display: block;
    }

    form label {
      display: inline;
      white-space: nowrap;
    }

    <!DOCTYPE HTML>
    <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>

      <form id="form" onsubmit="return false">

        Prevent default for:
        <label>
          <input type="checkbox" name="keydownStop" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;
        <label>
          <input type="checkbox" name="keyupStop" value="1"> keyup</label>

        <p>
          Ignore:
          <label>
            <input type="checkbox" name="keydownIgnore" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;
          <label>
            <input type="checkbox" name="keyupIgnore" value="1"> keyup</label>
        </p>

        <p>Focus on the input field and press a key.</p>

        <input type="text" placeholder="Press keys here" id="kinput">

        <textarea id="area"></textarea>
        <input type="button" value="Clear" onclick="area.value = ''" />
      </form>
      <script src="script.js"></script>


    </body>
    </html>

## <a href="keyboard-events.html#keydown-and-keyup" id="keydown-and-keyup" class="main__anchor">Keydown and keyup</a>

The `keydown` events happens when a key is pressed down, and then `keyup` – when it’s released.

### <a href="keyboard-events.html#event-code-and-event-key" id="event-code-and-event-key" class="main__anchor">event.code and event.key</a>

The `key` property of the event object allows to get the character, while the `code` property of the event object allows to get the “physical key code”.

For instance, the same key Z can be pressed with or without Shift. That gives us two different characters: lowercase `z` and uppercase `Z`.

The `event.key` is exactly the character, and it will be different. But `event.code` is the same:

<table><thead><tr class="header"><th>Key</th><th><code>event.key</code></th><th><code>event.code</code></th></tr></thead><tbody><tr class="odd"><td>Z</td><td><code>z</code> (lowercase)</td><td><code>KeyZ</code></td></tr><tr class="even"><td>Shift<span class="shortcut__plus">+</span>Z</td><td><code>Z</code> (uppercase)</td><td><code>KeyZ</code></td></tr></tbody></table>

If a user works with different languages, then switching to another language would make a totally different character instead of `"Z"`. That will become the value of `event.key`, while `event.code` is always the same: `"KeyZ"`.

<span class="important__type">“KeyZ” and other key codes</span>

Every key has the code that depends on its location on the keyboard. Key codes described in the [UI Events code specification](https://www.w3.org/TR/uievents-code/).

For instance:

- Letter keys have codes `"Key<letter>"`: `"KeyA"`, `"KeyB"` etc.
- Digit keys have codes: `"Digit<number>"`: `"Digit0"`, `"Digit1"` etc.
- Special keys are coded by their names: `"Enter"`, `"Backspace"`, `"Tab"` etc.

There are several widespread keyboard layouts, and the specification gives key codes for each of them.

Read the [alphanumeric section of the spec](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section) for more codes, or just press a key in the [teststand](keyboard-events.html#keyboard-test-stand) above.

<span class="important__type">Case matters: `"KeyZ"`, not `"keyZ"`</span>

Seems obvious, but people still make mistakes.

Please evade mistypes: it’s `KeyZ`, not `keyZ`. The check like `event.code=="keyZ"` won’t work: the first letter of `"Key"` must be uppercase.

What if a key does not give any character? For instance, Shift or F1 or others. For those keys, `event.key` is approximately the same as `event.code`:

<table><thead><tr class="header"><th>Key</th><th><code>event.key</code></th><th><code>event.code</code></th></tr></thead><tbody><tr class="odd"><td>F1</td><td><code>F1</code></td><td><code>F1</code></td></tr><tr class="even"><td>Backspace</td><td><code>Backspace</code></td><td><code>Backspace</code></td></tr><tr class="odd"><td>Shift</td><td><code>Shift</code></td><td><code>ShiftRight</code> or <code>ShiftLeft</code></td></tr></tbody></table>

Please note that `event.code` specifies exactly which key is pressed. For instance, most keyboards have two Shift keys: on the left and on the right side. The `event.code` tells us exactly which one was pressed, and `event.key` is responsible for the “meaning” of the key: what it is (a “Shift”).

Let’s say, we want to handle a hotkey: Ctrl<span class="shortcut__plus">+</span>Z (or Cmd<span class="shortcut__plus">+</span>Z for Mac). Most text editors hook the “Undo” action on it. We can set a listener on `keydown` and check which key is pressed.

There’s a dilemma here: in such a listener, should we check the value of `event.key` or `event.code`?

On one hand, the value of `event.key` is a character, it changes depending on the language. If the visitor has several languages in OS and switches between them, the same key gives different characters. So it makes sense to check `event.code`, it’s always the same.

Like this:

<a href="keyboard-events.html#"
<a href="keyboard-events.html#"

    document.addEventListener('keydown', function(event) {
      if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        alert('Undo!')
      }
    });

On the other hand, there’s a problem with `event.code`. For different keyboard layouts, the same key may have different characters.

For example, here are US layout (“QWERTY”) and German layout (“QWERTZ”) under it (from Wikipedia):

<figure><img src="article/keyboard-events/us-layout.svg" width="602" height="202" /></figure><figure><img src="article/keyboard-events/german-layout.svg" width="600" height="200" /></figure>For the same key, US layout has “Z”, while German layout has “Y” (letters are swapped).

Literally, `event.code` will equal `KeyZ` for people with German layout when they press Y.

If we check `event.code == 'KeyZ'` in our code, then for people with German layout such test will pass when they press Y.

That sounds really odd, but so it is. The [specification](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system) explicitly mentions such behavior.

So, `event.code` may match a wrong character for unexpected layout. Same letters in different layouts may map to different physical keys, leading to different codes. Luckily, that happens only with several codes, e.g. `keyA`, `keyQ`, `keyZ` (as we’ve seen), and doesn’t happen with special keys such as `Shift`. You can find the list in the [specification](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system).

To reliably track layout-dependent characters, `event.key` may be a better way.

On the other hand, `event.code` has the benefit of staying always the same, bound to the physical key location, even if the visitor changes languages. So hotkeys that rely on it work well even in case of a language switch.

Do we want to handle layout-dependant keys? Then `event.key` is the way to go.

Or we want a hotkey to work even after a language switch? Then `event.code` may be better.

## <a href="keyboard-events.html#auto-repeat" id="auto-repeat" class="main__anchor">Auto-repeat</a>

If a key is being pressed for a long enough time, it starts to “auto-repeat”: the `keydown` triggers again and again, and then when it’s released we finally get `keyup`. So it’s kind of normal to have many `keydown` and a single `keyup`.

For events triggered by auto-repeat, the event object has `event.repeat` property set to `true`.

## <a href="keyboard-events.html#default-actions" id="default-actions" class="main__anchor">Default actions</a>

Default actions vary, as there are many possible things that may be initiated by the keyboard.

For instance:

- A character appears on the screen (the most obvious outcome).
- A character is deleted (Delete key).
- The page is scrolled (PageDown key).
- The browser opens the “Save Page” dialog (Ctrl<span class="shortcut__plus">+</span>S)
- …and so on.

Preventing the default action on `keydown` can cancel most of them, with the exception of OS-based special keys. For instance, on Windows Alt<span class="shortcut__plus">+</span>F4 closes the current browser window. And there’s no way to stop it by preventing the default action in JavaScript.

For instance, the `<input>` below expects a phone number, so it does not accept keys except digits, `+`, `()` or `-`:

<a href="keyboard-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="keyboard-events.html#"

    <script>
    function checkPhoneKey(key) {
      return (key >= '0' && key <= '9') || ['+','(',')','-'].includes(key);
    }
    </script>
    <input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">

The `onkeydown` handler here uses `checkPhoneKey` to check for the key pressed. If it’s valid (from `0..9` or one of `+-()`), then it returns `true`, otherwise `false`.

As we know, the `false` value returned from the event handler, assigned using a DOM property or an attribute, such as above, prevents the default action, so nothing appears in the `<input>` for keys that don’t pass the test. (The `true` value returned doesn’t affect anything, only returning `false` matters)

Please note that special keys, such as Backspace, Left, Right, do not work in the input. That’s a side-effect of the strict filter `checkPhoneKey`. These keys make it return `false`.

Let’s relax the filter a little bit by allowing arrow keys Left, Right and Delete, Backspace:

<a href="keyboard-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="keyboard-events.html#"

    <script>
    function checkPhoneKey(key) {
      return (key >= '0' && key <= '9') ||
        ['+','(',')','-','ArrowLeft','ArrowRight','Delete','Backspace'].includes(key);
    }
    </script>
    <input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">

Now arrows and deletion works well.

Even though we have the key filter, one still can enter anything using a mouse and right-click + Paste. Mobile devices provide other means to enter values. So the filter is not 100% reliable.

The alternative approach would be to track the `oninput` event – it triggers _after_ any modification. There we can check the new `input.value` and modify it/highlight the `<input>` when it’s invalid. Or we can use both event handlers together.

## <a href="keyboard-events.html#legacy" id="legacy" class="main__anchor">Legacy</a>

In the past, there was a `keypress` event, and also `keyCode`, `charCode`, `which` properties of the event object.

There were so many browser incompatibilities while working with them, that developers of the specification had no way, other than deprecating all of them and creating new, modern events (described above in this chapter). The old code still works, as browsers keep supporting them, but there’s totally no need to use those any more.

## <a href="keyboard-events.html#mobile-keyboards" id="mobile-keyboards" class="main__anchor">Mobile Keyboards</a>

When using virtual/mobile keyboards, formally known as IME (Input-Method Editor), the W3C standard states that a KeyboardEvent’s [`e.keyCode` should be `229`](https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode) and [`e.key` should be `"Unidentified"`](https://www.w3.org/TR/uievents-key/#key-attr-values).

While some of these keyboards might still use the right values for `e.key`, `e.code`, `e.keyCode`… when pressing certain keys such as arrows or backspace, there’s no guarantee, so your keyboard logic might not always work on mobile devices.

## <a href="keyboard-events.html#summary" id="summary" class="main__anchor">Summary</a>

Pressing a key always generates a keyboard event, be it symbol keys or special keys like Shift or Ctrl and so on. The only exception is Fn key that sometimes presents on a laptop keyboard. There’s no keyboard event for it, because it’s often implemented on lower level than OS.

Keyboard events:

- `keydown` – on pressing the key (auto-repeats if the key is pressed for long),
- `keyup` – on releasing the key.

Main keyboard event properties:

- `code` – the “key code” (`"KeyA"`, `"ArrowLeft"` and so on), specific to the physical location of the key on keyboard.
- `key` – the character (`"A"`, `"a"` and so on), for non-character keys, such as Esc, usually has the same value as `code`.

In the past, keyboard events were sometimes used to track user input in form fields. That’s not reliable, because the input can come from various sources. We have `input` and `change` events to handle any input (covered later in the chapter [Events: change, input, cut, copy, paste](events-change-input.html)). They trigger after any kind of input, including copy-pasting or speech recognition.

We should use keyboard events when we really want keyboard. For example, to react on hotkeys or special keys.

## <a href="keyboard-events.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="keyboard-events.html#extended-hotkeys" id="extended-hotkeys" class="main__anchor">Extended hotkeys</a>

<a href="task/check-sync-keydown.html" class="task__open-link"></a>

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

<a href="pointer-events.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="onscroll.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fkeyboard-events" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fkeyboard-events" </a>

<a href="tutorial/map.html" class="map">

## <a href="keyboard-events.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="event-details.html" class="sidebar__link">UI Events</a>

#### Lesson navigation

- <a href="keyboard-events.html#keyboard-test-stand" class="sidebar__link">Teststand</a>
- <a href="keyboard-events.html#keydown-and-keyup" class="sidebar__link">Keydown and keyup</a>
- <a href="keyboard-events.html#auto-repeat" class="sidebar__link">Auto-repeat</a>
- <a href="keyboard-events.html#default-actions" class="sidebar__link">Default actions</a>
- <a href="keyboard-events.html#legacy" class="sidebar__link">Legacy</a>
- <a href="keyboard-events.html#mobile-keyboards" class="sidebar__link">Mobile Keyboards</a>
- <a href="keyboard-events.html#summary" class="sidebar__link">Summary</a>

- <a href="keyboard-events.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="keyboard-events.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fkeyboard-events" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fkeyboard-events" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/3-event-details/7-keyboard-events" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
