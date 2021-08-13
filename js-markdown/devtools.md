EN

- <a href="https://ar.javascript.info/devtools"
- <a href="devtools.html"
- <a href="https://es.javascript.info/devtools"
- <a href="https://fr.javascript.info/devtools"
- devtools"
  devtools"

<!-- -->

- /devtools"
- <a href=devtools"
- <a href="https://tr.javascript.info/devtools"
- <a href="https://zh.javascript.info/devtools"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdevtools" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdevtools" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="getting-started.html" An introduction</span></a></span>

5th April 2021

# Developer console

Code is prone to errors. You will quite likely make errors… Oh, what am I talking about? You are _absolutely_ going to make errors, at least if you’re a human, not a [robot](<https://en.wikipedia.org/wiki/Bender_(Futurama)>).

But in the browser, users don’t see errors by default. So, if something goes wrong in the script, we won’t see what’s broken and can’t fix it.

To see errors and get a lot of other useful information about scripts, “developer tools” have been embedded in browsers.

Most developers lean towards Chrome or Firefox for development because those browsers have the best developer tools. Other browsers also provide developer tools, sometimes with special features, but are usually playing “catch-up” to Chrome or Firefox. So most developers have a “favorite” browser and switch to others if a problem is browser-specific.

Developer tools are potent; they have many features. To start, we’ll learn how to open them, look at errors, and run JavaScript commands.

## <a href="devtools.html#google-chrome" id="google-chrome" class="main__anchor">Google Chrome</a>

Open the page [bug.html](article/devtools/bug.html).

There’s an error in the JavaScript code on it. It’s hidden from a regular visitor’s eyes, so let’s open developer tools to see it.

Press F12 or, if you’re on Mac, then Cmd<span class="shortcut__plus">+</span>Opt<span class="shortcut__plus">+</span>J.

The developer tools will open on the Console tab by default.

It looks somewhat like this:

<figure><img src="article/devtools/chrome.png" class="image__image" width="707" height="240" /></figure>The exact look of developer tools depends on your version of Chrome. It changes from time to time but should be similar.

- Here we can see the red-colored error message. In this case, the script contains an unknown “lalala” command.
- On the right, there is a clickable link to the source `bug.html:12` with the line number where the error has occurred.

Below the error message, there is a blue `>` symbol. It marks a “command line” where we can type JavaScript commands. Press Enter to run them.

Now we can see errors, and that’s enough for a start. We’ll come back to developer tools later and cover debugging more in-depth in the chapter [Debugging in the browser](debugging-chrome.html).

<span class="important__type">Multi-line input</span>

Usually, when we put a line of code into the console, and then press Enter, it executes.

To insert multiple lines, press Shift<span class="shortcut__plus">+</span>Enter. This way one can enter long fragments of JavaScript code.

## <a href="devtools.html#firefox-edge-and-others" id="firefox-edge-and-others" class="main__anchor">Firefox, Edge, and others</a>

Most other browsers use F12 to open developer tools.

The look & feel of them is quite similar. Once you know how to use one of these tools (you can start with Chrome), you can easily switch to another.

## <a href="devtools.html#safari" id="safari" class="main__anchor">Safari</a>

Safari (Mac browser, not supported by Windows/Linux) is a little bit special here. We need to enable the “Develop menu” first.

Open Preferences and go to the “Advanced” pane. There’s a checkbox at the bottom:

<figure><img src="article/devtools/safari.png" class="image__image" width="774" height="456" /></figure>Now Cmd<span class="shortcut__plus">+</span>Opt<span class="shortcut__plus">+</span>C can toggle the console. Also, note that the new top menu item named “Develop” has appeared. It has many commands and options.

## <a href="devtools.html#summary" id="summary" class="main__anchor">Summary</a>

- Developer tools allow us to see errors, run commands, examine variables, and much more.
- They can be opened with F12 for most browsers on Windows. Chrome for Mac needs Cmd<span class="shortcut__plus">+</span>Opt<span class="shortcut__plus">+</span>J, Safari: Cmd<span class="shortcut__plus">+</span>Opt<span class="shortcut__plus">+</span>C (need to enable first).

Now we have the environment ready. In the next section, we’ll get down to JavaScript.

<a href="code-editors.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="first-steps.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdevtools" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdevtools" </a>

<a href="tutorial/map.html" class="map">

## <a href="devtools.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="getting-started.html" class="sidebar__link">An introduction</a>

#### Lesson navigation

- <a href="devtools.html#google-chrome" class="sidebar__link">Google Chrome</a>
- <a href="devtools.html#firefox-edge-and-others" class="sidebar__link">Firefox, Edge, and others</a>
- <a href="devtools.html#safari" class="sidebar__link">Safari</a>
- <a href="devtools.html#summary" class="sidebar__link">Summary</a>

- <a href="devtools.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fdevtools" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdevtools" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/01-getting-started/4-devtools" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
