EN

- <a href="https://ar.javascript.info/dom-nodes"
- <a href="dom-nodes.html"
- <a href="https://es.javascript.info/dom-nodes"
- <a href="https://fr.javascript.info/dom-nodes"
- dom-nodes"
  dom-nodes"

<!-- -->

- <a href="https://ko.javascript.info/dom-nodes"
- <a href=dom-nodes"
- <a href="https://tr.javascript.info/dom-nodes"
- <a href="https://zh.javascript.info/dom-nodes"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdom-nodes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-nodes" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

25th November 2020

# DOM tree

The backbone of an HTML document is tags.

According to the Document Object Model (DOM), every HTML tag is an object. Nested tags are “children” of the enclosing one. The text inside a tag is an object as well.

All these objects are accessible using JavaScript, and we can use them to modify the page.

For example, `document.body` is the object representing the `<body>` tag.

Running this code will make the `<body>` red for 3 seconds:

<a href="dom-nodes.html#"
<a href="dom-nodes.html#"

    document.body.style.background = 'red'; // make the background red

    setTimeout(() => document.body.style.background = '', 3000); // return back

Here we used `style.background` to change the background color of `document.body`, but there are many other properties, such as:

- `innerHTML` – HTML contents of the node.
- `offsetWidth` – the node width (in pixels)
- …and so on.

Soon we’ll learn more ways to manipulate the DOM, but first we need to know about its structure.

## <a href="dom-nodes.html#an-example-of-the-dom" id="an-example-of-the-dom" class="main__anchor">An example of the DOM</a>

Let’s start with the following simple document:

<a href="dom-nodes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-nodes.html#"

    <!DOCTYPE HTML>
    <html>
    <head>
      <title>About elk</title>
    </head>
    <body>
      The truth about elk.
    </body>
    </html>

The DOM represents HTML as a tree structure of tags. Here’s how it looks:

On the picture above, you can click on element nodes and their children will open/collapse.

Every tree node is an object.

Tags are _element nodes_ (or just elements) and form the tree structure: `<html>` is at the root, then `<head>` and `<body>` are its children, etc.

The text inside elements forms _text nodes_, labelled as `#text`. A text node contains only a string. It may not have children and is always a leaf of the tree.

For instance, the `<title>` tag has the text `"About elk"`.

Please note the special characters in text nodes:

- a newline: `↵` (in JavaScript known as `\n`)
- a space: `␣`

Spaces and newlines are totally valid characters, like letters and digits. They form text nodes and become a part of the DOM. So, for instance, in the example above the `<head>` tag contains some spaces before `<title>`, and that text becomes a `#text` node (it contains a newline and some spaces only).

There are only two top-level exclusions:

1.  Spaces and newlines before `<head>` are ignored for historical reasons.
2.  If we put something after `</body>`, then that is automatically moved inside the `body`, at the end, as the HTML spec requires that all content must be inside `<body>`. So there can’t be any spaces after `</body>`.

In other cases everything’s straightforward – if there are spaces (just like any character) in the document, then they become text nodes in the DOM, and if we remove them, then there won’t be any.

Here are no space-only text nodes:

    <!DOCTYPE HTML>
    <html><head><title>About elk</title></head><body>The truth about elk.</body></html>

<span class="important__type">Spaces at string start/end and space-only text nodes are usually hidden in tools</span>

Browser tools (to be covered soon) that work with DOM usually do not show spaces at the start/end of the text and empty text nodes (line-breaks) between tags.

Developer tools save screen space this way.

On further DOM pictures we’ll sometimes omit them when they are irrelevant. Such spaces usually do not affect how the document is displayed.

## <a href="dom-nodes.html#autocorrection" id="autocorrection" class="main__anchor">Autocorrection</a>

If the browser encounters malformed HTML, it automatically corrects it when making the DOM.

For instance, the top tag is always `<html>`. Even if it doesn’t exist in the document, it will exist in the DOM, because the browser will create it. The same goes for `<body>`.

As an example, if the HTML file is the single word `"Hello"`, the browser will wrap it into `<html>` and `<body>`, and add the required `<head>`, and the DOM will be:

While generating the DOM, browsers automatically process errors in the document, close tags and so on.

A document with unclosed tags:

    <p>Hello
    <li>Mom
    <li>and
    <li>Dad

…will become a normal DOM as the browser reads tags and restores the missing parts:

<span class="important__type">Tables always have `<tbody>`</span>

An interesting “special case” is tables. By DOM specification they must have `<tbody>` tag, but HTML text may omit it. Then the browser creates `<tbody>` in the DOM automatically.

For the HTML:

    <table id="table"><tr><td>1</td></tr></table>

DOM-structure will be:

You see? The `<tbody>` appeared out of nowhere. We should keep this in mind while working with tables to avoid surprises.

## <a href="dom-nodes.html#other-node-types" id="other-node-types" class="main__anchor">Other node types</a>

There are some other node types besides elements and text nodes.

For example, comments:

    <!DOCTYPE HTML>
    <html>
    <body>
      The truth about elk.
      <ol>
        <li>An elk is a smart</li>
        <!-- comment -->
        <li>...and cunning animal!</li>
      </ol>
    </body>
    </html>

We can see here a new tree node type – _comment node_, labeled as `#comment`, between two text nodes.

We may think – why is a comment added to the DOM? It doesn’t affect the visual representation in any way. But there’s a rule – if something’s in HTML, then it also must be in the DOM tree.

**Everything in HTML, even comments, becomes a part of the DOM.**

Even the `<!DOCTYPE...>` directive at the very beginning of HTML is also a DOM node. It’s in the DOM tree right before `<html>`. Few people know about that. We are not going to touch that node, we even don’t draw it on diagrams, but it’s there.

The `document` object that represents the whole document is, formally, a DOM node as well.

There are [12 node types](https://dom.spec.whatwg.org/#node). In practice we usually work with 4 of them:

1.  `document` – the “entry point” into DOM.
2.  element nodes – HTML-tags, the tree building blocks.
3.  text nodes – contain text.
4.  comments – sometimes we can put information there, it won’t be shown, but JS can read it from the DOM.

## <a href="dom-nodes.html#see-it-for-yourself" id="see-it-for-yourself" class="main__anchor">See it for yourself</a>

To see the DOM structure in real-time, try [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in the document, and it will show up as a DOM at an instant.

Another way to explore the DOM is to use the browser developer tools. Actually, that’s what we use when developing.

To do so, open the web page [elk.html](article/dom-nodes/elk.html), turn on the browser developer tools and switch to the Elements tab.

It should look like this:

<figure><img src="article/dom-nodes/elk.svg" width="698" height="249" /></figure>You can see the DOM, click on elements, see their details and so on.

Please note that the DOM structure in developer tools is simplified. Text nodes are shown just as text. And there are no “blank” (space only) text nodes at all. That’s fine, because most of the time we are interested in element nodes.

Clicking the <span class="devtools" style="background-position: -328px -124px"></span> button in the left-upper corner allows us to choose a node from the webpage using a mouse (or other pointer devices) and “inspect” it (scroll to it in the Elements tab). This works great when we have a huge HTML page (and corresponding huge DOM) and would like to see the place of a particular element in it.

Another way to do it would be just right-clicking on a webpage and selecting “Inspect” in the context menu.

<figure><img src="article/dom-nodes/inspect.svg" width="696" height="379" /></figure>At the right part of the tools there are the following subtabs:

- **Styles** – we can see CSS applied to the current element rule by rule, including built-in rules (gray). Almost everything can be edited in-place, including the dimensions/margins/paddings of the box below.
- **Computed** – to see CSS applied to the element by property: for each property we can see a rule that gives it (including CSS inheritance and such).
- **Event Listeners** – to see event listeners attached to DOM elements (we’ll cover them in the next part of the tutorial).
- …and so on.

The best way to study them is to click around. Most values are editable in-place.

## <a href="dom-nodes.html#interaction-with-console" id="interaction-with-console" class="main__anchor">Interaction with console</a>

As we work the DOM, we also may want to apply JavaScript to it. Like: get a node and run some code to modify it, to see the result. Here are few tips to travel between the Elements tab and the console.

For the start:

1.  Select the first `<li>` in the Elements tab.
2.  Press Esc – it will open console right below the Elements tab.

Now the last selected element is available as `$0`, the previously selected is `$1` etc.

We can run commands on them. For instance, `$0.style.background = 'red'` makes the selected list item red, like this:

<figure><img src="article/dom-nodes/domconsole0.svg" width="699" height="450" /></figure>That’s how to get a node from Elements in Console.

There’s also a road back. If there’s a variable referencing a DOM node, then we can use the command `inspect(node)` in Console to see it in the Elements pane.

Or we can just output the DOM node in the console and explore “in-place”, like `document.body` below:

<figure><img src="article/dom-nodes/domconsole1.svg" width="696" height="512" /></figure>That’s for debugging purposes of course. From the next chapter on we’ll access and modify DOM using JavaScript.

The browser developer tools are a great help in development: we can explore the DOM, try things and see what goes wrong.

## <a href="dom-nodes.html#summary" id="summary" class="main__anchor">Summary</a>

An HTML/XML document is represented inside the browser as the DOM tree.

- Tags become element nodes and form the structure.
- Text becomes text nodes.
- …etc, everything in HTML has its place in DOM, even comments.

We can use developer tools to inspect DOM and modify it manually.

Here we covered the basics, the most used and important actions to start with. There’s an extensive documentation about Chrome Developer Tools at <https://developers.google.com/web/tools/chrome-devtools>. The best way to learn the tools is to click here and there, read menus: most options are obvious. Later, when you know them in general, read the docs and pick up the rest.

DOM nodes have properties and methods that allow us to travel between them, modify them, move around the page, and more. We’ll get down to them in the next chapters.

<a href="browser-environment.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="dom-navigation.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdom-nodes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-nodes" </a>

<a href="tutorial/map.html" class="map">

## <a href="dom-nodes.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="dom-nodes.html#an-example-of-the-dom" class="sidebar__link">An example of the DOM</a>
- <a href="dom-nodes.html#autocorrection" class="sidebar__link">Autocorrection</a>
- <a href="dom-nodes.html#other-node-types" class="sidebar__link">Other node types</a>
- <a href="dom-nodes.html#see-it-for-yourself" class="sidebar__link">See it for yourself</a>
- <a href="dom-nodes.html#interaction-with-console" class="sidebar__link">Interaction with console</a>
- <a href="dom-nodes.html#summary" class="sidebar__link">Summary</a>

- <a href="dom-nodes.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fdom-nodes" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-nodes" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/02-dom-nodes" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
