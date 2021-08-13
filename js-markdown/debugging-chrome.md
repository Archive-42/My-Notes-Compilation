EN

- <a href="https://ar.javascript.info/debugging-chrome"
- <a href="debugging-chrome.html"
- <a href="https://es.javascript.info/debugging-chrome"
- <a href="https://fr.javascript.info/debugging-chrome"
- debugging-chrome"
  debugging-chrome"

<!-- -->

- <a href="https://ko.javascript.info/debugging-chrome"
- <a href=debugging-chrome"
- <a href="https://tr.javascript.info/debugging-chrome"
- <a href="https://zh.javascript.info/debugging-chrome"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdebugging-chrome" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdebugging-chrome" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="code-quality.html" Code quality</span></a></span>

9th June 2021

# Debugging in the browser

Before writing more complex code, let’s talk about debugging.

[Debugging](https://en.wikipedia.org/wiki/Debugging) is the process of finding and fixing errors within a script. All modern browsers and most other environments support debugging tools – a special UI in developer tools that makes debugging much easier. It also allows to trace the code step by step to see what exactly is going on.

We’ll be using Chrome here, because it has enough features, most other browsers have a similar process.

## <a href="debugging-chrome.html#the-sources-panel" id="the-sources-panel" class="main__anchor">The “Sources” panel</a>

Your Chrome version may look a little bit different, but it still should be obvious what’s there.

- Open the [example page](article/debugging-chrome/debugging/index.html) in Chrome.
- Turn on developer tools with F12 (Mac: Cmd<span class="shortcut__plus">+</span>Opt<span class="shortcut__plus">+</span>I).
- Select the `Sources` panel.

Here’s what you should see if you are doing it for the first time:

<figure><img src="article/debugging-chrome/chrome-open-sources.svg" width="697" height="228" /></figure>The toggler button <span class="devtools" style="background-position: -172px -98px"></span> opens the tab with files.

Let’s click it and select `hello.js` in the tree view. Here’s what should show up:

<figure><img src="article/debugging-chrome/chrome-tabs.svg" width="694" height="225" /></figure>The Sources panel has 3 parts:

1.  The **File Navigator** pane lists HTML, JavaScript, CSS and other files, including images that are attached to the page. Chrome extensions may appear here too.
2.  The **Code Editor** pane shows the source code.
3.  The **JavaScript Debugging** pane is for debugging, we’ll explore it soon.

Now you could click the same toggler <span class="devtools" style="background-position: -172px -122px"></span> again to hide the resources list and give the code some space.

## <a href="debugging-chrome.html#console" id="console" class="main__anchor">Console</a>

If we press Esc, then a console opens below. We can type commands there and press Enter to execute.

After a statement is executed, its result is shown below.

For example, here `1+2` results in `3`, and `hello("debugger")` returns nothing, so the result is `undefined`:

## <figure><img src="article/debugging-chrome/chrome-sources-console.svg" width="693" height="156" /></figure><a href="debugging-chrome.html#breakpoints" id="breakpoints" class="main__anchor">Breakpoints</a>

Let’s examine what’s going on within the code of the [example page](article/debugging-chrome/debugging/index.html). In `hello.js`, click at line number `4`. Yes, right on the `4` digit, not on the code.

Congratulations! You’ve set a breakpoint. Please also click on the number for line `8`.

It should look like this (blue is where you should click):

<figure><img src="article/debugging-chrome/chrome-sources-breakpoint.svg" width="697" height="244" /></figure>A *breakpoint* is a point of code where the debugger will automatically pause the JavaScript execution.

While the code is paused, we can examine current variables, execute commands in the console etc. In other words, we can debug it.

We can always find a list of breakpoints in the right panel. That’s useful when we have many breakpoints in various files. It allows us to:

- Quickly jump to the breakpoint in the code (by clicking on it in the right panel).
- Temporarily disable the breakpoint by unchecking it.
- Remove the breakpoint by right-clicking and selecting Remove.
- …And so on.

<span class="important__type">Conditional breakpoints</span>

_Right click_ on the line number allows to create a _conditional_ breakpoint. It only triggers when the given expression is truthy.

That’s handy when we need to stop only for a certain variable value or for certain function parameters.

## <a href="debugging-chrome.html#debugger-command" id="debugger-command" class="main__anchor">Debugger command</a>

We can also pause the code by using the `debugger` command in it, like this:

    function hello(name) {
      let phrase = `Hello, ${name}!`;

      debugger;  // <-- the debugger stops here

      say(phrase);
    }

That’s very convenient when we are in a code editor and don’t want to switch to the browser and look up the script in developer tools to set the breakpoint.

## <a href="debugging-chrome.html#pause-and-look-around" id="pause-and-look-around" class="main__anchor">Pause and look around</a>

In our example, `hello()` is called during the page load, so the easiest way to activate the debugger (after we’ve set the breakpoints) is to reload the page. So let’s press F5 (Windows, Linux) or Cmd<span class="shortcut__plus">+</span>R (Mac).

As the breakpoint is set, the execution pauses at the 4th line:

<figure><img src="article/debugging-chrome/chrome-sources-debugger-pause.svg" width="700" height="304" /></figure>Please open the informational dropdowns to the right (labeled with arrows). They allow you to examine the current code state:

1.  **`Watch` – shows current values for any expressions.**

    You can click the plus `+` and input an expression. The debugger will show its value at any moment, automatically recalculating it in the process of execution.

2.  **`Call Stack` – shows the nested calls chain.**

    At the current moment the debugger is inside `hello()` call, called by a script in `index.html` (no function there, so it’s called “anonymous”).

    If you click on a stack item (e.g. “anonymous”), the debugger jumps to the corresponding code, and all its variables can be examined as well.

3.  **`Scope` – current variables.**

    `Local` shows local function variables. You can also see their values highlighted right over the source.

    `Global` has global variables (out of any functions).

    There’s also `this` keyword there that we didn’t study yet, but we’ll do that soon.

## <a href="debugging-chrome.html#tracing-the-execution" id="tracing-the-execution" class="main__anchor">Tracing the execution</a>

Now it’s time to _trace_ the script.

There are buttons for it at the top of the right panel. Let’s engage them.

<span class="devtools" style="background-position: -146px -168px"></span> – “Resume”: continue the execution, hotkey F8.  
Resumes the execution. If there are no additional breakpoints, then the execution just continues and the debugger loses control.

Here’s what we can see after a click on it:

<figure><img src="article/debugging-chrome/chrome-sources-debugger-trace-1.svg" width="698" height="310" /></figure>

The execution has resumed, reached another breakpoint inside `say()` and paused there. Take a look at the “Call Stack” at the right. It has increased by one more call. We’re inside `say()` now.

<span class="devtools" style="background-position: -200px -190px"></span> – “Step”: run the next command, hotkey F9.  
Run the next statement. If we click it now, `alert` will be shown.

Clicking this again and again will step through all script statements one by one.

<span class="devtools" style="background-position: -62px -192px"></span> – “Step over”: run the next command, but _don’t go into a function_, hotkey F10.  
Similar to the previous “Step” command, but behaves differently if the next statement is a function call. That is: not a built-in, like `alert`, but a function of our own.

The “Step” command goes into it and pauses the execution at its first line, while “Step over” executes the nested function call invisibly, skipping the function internals.

The execution is then paused immediately after that function.

That’s good if we’re not interested to see what happens inside the function call.

<span class="devtools" style="background-position: -4px -194px"></span> – “Step into”, hotkey F11.  
That’s similar to “Step”, but behaves differently in case of asynchronous function calls. If you’re only starting to learn JavaScript, then you can ignore the difference, as we don’t have asynchronous calls yet.

For the future, just note that “Step” command ignores async actions, such as `setTimeout` (scheduled function call), that execute later. The “Step into” goes into their code, waiting for them if necessary. See [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async) for more details.

<span class="devtools" style="background-position: -32px -194px"></span> – “Step out”: continue the execution till the end of the current function, hotkey Shift<span class="shortcut__plus">+</span>F11.  
Continue the execution and stop it at the very last line of the current function. That’s handy when we accidentally entered a nested call using <span class="devtools" style="background-position: -200px -190px"></span>, but it does not interest us, and we want to continue to its end as soon as possible.

<span class="devtools" style="background-position: -61px -74px"></span> – enable/disable all breakpoints.  
That button does not move the execution. Just a mass on/off for breakpoints.

<span class="devtools" style="background-position: -90px -146px"></span> – enable/disable automatic pause in case of an error.  
When enabled, and the developer tools is open, a script error automatically pauses the execution. Then we can analyze variables to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what’s the context at that moment.

<span class="important__type">Continue to here</span>

Right click on a line of code opens the context menu with a great option called “Continue to here”.

That’s handy when we want to move multiple steps forward to the line, but we’re too lazy to set a breakpoint.

## <a href="debugging-chrome.html#logging" id="logging" class="main__anchor">Logging</a>

To output something to console from our code, there’s `console.log` function.

For instance, this outputs values from `0` to `4` to console:

<a href="debugging-chrome.html#"
<a href="debugging-chrome.html#"

    // open console to see
    for (let i = 0; i < 5; i++) {
      console.log("value,", i);
    }

Regular users don’t see that output, it is in the console. To see it, either open the Console panel of developer tools or press Esc while in another panel: that opens the console at the bottom.

If we have enough logging in our code, then we can see what’s going on from the records, without the debugger.

## <a href="debugging-chrome.html#summary" id="summary" class="main__anchor">Summary</a>

As we can see, there are three main ways to pause a script:

1.  A breakpoint.
2.  The `debugger` statements.
3.  An error (if dev tools are open and the button <span class="devtools" style="background-position: -90px -146px"></span> is “on”).

When paused, we can debug – examine variables and trace the code to see where the execution goes wrong.

There are many more options in developer tools than covered here. The full manual is at <https://developers.google.com/web/tools/chrome-devtools>.

The information from this chapter is enough to begin debugging, but later, especially if you do a lot of browser stuff, please go there and look through more advanced capabilities of developer tools.

Oh, and also you can click at various places of dev tools and just see what’s showing up. That’s probably the fastest route to learn dev tools. Don’t forget about the right click and context menus!

<a href="code-quality.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="coding-style.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdebugging-chrome" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdebugging-chrome" </a>

<a href="tutorial/map.html" class="map">

## <a href="debugging-chrome.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="code-quality.html" class="sidebar__link">Code quality</a>

#### Lesson navigation

- <a href="debugging-chrome.html#the-sources-panel" class="sidebar__link">The “Sources” panel</a>
- <a href="debugging-chrome.html#console" class="sidebar__link">Console</a>
- <a href="debugging-chrome.html#breakpoints" class="sidebar__link">Breakpoints</a>
- <a href="debugging-chrome.html#debugger-command" class="sidebar__link">Debugger command</a>
- <a href="debugging-chrome.html#pause-and-look-around" class="sidebar__link">Pause and look around</a>
- <a href="debugging-chrome.html#tracing-the-execution" class="sidebar__link">Tracing the execution</a>
- <a href="debugging-chrome.html#logging" class="sidebar__link">Logging</a>
- <a href="debugging-chrome.html#summary" class="sidebar__link">Summary</a>

- <a href="debugging-chrome.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fdebugging-chrome" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdebugging-chrome" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/03-code-quality/01-debugging-chrome" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
