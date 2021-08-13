EN

langs\_\_title">عربي</span></a>

- <a href="dom-navigation.html"
- <a href="https://es.javascript.info/dom-navigation"
- <a href="https://fr.javascript.info/dom-navigation"
- dom-navigation"
  dom-navigation"

<!-- -->

- /dom-navigation"
- <a href=dom-navigation"
- <a href="https://tr.javascript.info/dom-navigation"
- <a href="https://zh.javascript.info/dom-navigation"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdom-navigation" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-navigation" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

1st April 2021

# Walking the DOM

The DOM allows us to do anything with elements and their contents, but first we need to reach the corresponding DOM object.

All operations on the DOM start with the `document` object. That’s the main “entry point” to DOM. From it we can access any node.

Here’s a picture of links that allow for travel between DOM nodes:

<figure><img src="article/dom-navigation/dom-links.svg" width="420" height="388" /></figure>Let’s discuss them in more detail.

## <a href="dom-navigation.html#on-top-documentelement-and-body" id="on-top-documentelement-and-body" class="main__anchor">On top: documentElement and body</a>

The topmost tree nodes are available directly as `document` properties:

`<html>` = `document.documentElement`  
The topmost document node is `document.documentElement`. That’s the DOM node of the `<html>` tag.

`<body>` = `document.body`  
Another widely used DOM node is the `<body>` element – `document.body`.

`<head>` = `document.head`  
The `<head>` tag is available as `document.head`.

<span class="important__type">There’s a catch: `document.body` can be `null`</span>

A script cannot access an element that doesn’t exist at the moment of running.

In particular, if a script is inside `<head>`, then `document.body` is unavailable, because the browser did not read it yet.

So, in the example below the first `alert` shows `null`:

<a href="dom-navigation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-navigation.html#"

    <html>

    <head>
      <script>
        alert( "From HEAD: " + document.body ); // null, there's no <body> yet
      </script>
    </head>

    <body>

      <script>
        alert( "From BODY: " + document.body ); // HTMLBodyElement, now it exists
      </script>

    </body>
    </html>

<span class="important__type">In the DOM world `null` means “doesn’t exist”</span>

In the DOM, the `null` value means “doesn’t exist” or “no such node”.

## <a href="dom-navigation.html#children-childnodes-firstchild-lastchild" id="children-childnodes-firstchild-lastchild" class="main__anchor">Children: childNodes, firstChild, lastChild</a>

There are two terms that we’ll use from now on:

- **Child nodes (or children)** – elements that are direct children. In other words, they are nested exactly in the given one. For instance, `<head>` and `<body>` are children of `<html>` element.
- **Descendants** – all elements that are nested in the given one, including children, their children and so on.

For instance, here `<body>` has children `<div>` and `<ul>` (and few blank text nodes):

<a href="dom-navigation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-navigation.html#"

    <html>
    <body>
      <div>Begin</div>

      <ul>
        <li>
          <b>Information</b>
        </li>
      </ul>
    </body>
    </html>

…And descendants of `<body>` are not only direct children `<div>`, `<ul>` but also more deeply nested elements, such as `<li>` (a child of `<ul>`) and `<b>` (a child of `<li>`) – the entire subtree.

**The `childNodes` collection lists all child nodes, including text nodes.**

The example below shows children of `document.body`:

<a href="dom-navigation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-navigation.html#"

    <html>
    <body>
      <div>Begin</div>

      <ul>
        <li>Information</li>
      </ul>

      <div>End</div>

      <script>
        for (let i = 0; i < document.body.childNodes.length; i++) {
          alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
        }
      </script>
      ...more stuff...
    </body>
    </html>

Please note an interesting detail here. If we run the example above, the last element shown is `<script>`. In fact, the document has more stuff below, but at the moment of the script execution the browser did not read it yet, so the script doesn’t see it.

**Properties `firstChild` and `lastChild` give fast access to the first and last children.**

They are just shorthands. If there exist child nodes, then the following is always true:

    elem.childNodes[0] === elem.firstChild
    elem.childNodes[elem.childNodes.length - 1] === elem.lastChild

There’s also a special function `elem.hasChildNodes()` to check whether there are any child nodes.

### <a href="dom-navigation.html#dom-collections" id="dom-collections" class="main__anchor">DOM collections</a>

As we can see, `childNodes` looks like an array. But actually it’s not an array, but rather a _collection_ – a special array-like iterable object.

There are two important consequences:

1.  We can use `for..of` to iterate over it:

    for (let node of document.body.childNodes) {
    alert(node); // shows all nodes from the collection
    }

That’s because it’s iterable (provides the `Symbol.iterator` property, as required).

1.  Array methods won’t work, because it’s not an array:

<a href="dom-navigation.html#"
<a href="dom-navigation.html#"

    alert(document.body.childNodes.filter); // undefined (there's no filter method!)

The first thing is nice. The second is tolerable, because we can use `Array.from` to create a “real” array from the collection, if we want array methods:

<a href="dom-navigation.html#"
<a href="dom-navigation.html#"

    alert( Array.from(document.body.childNodes).filter ); // function

<span class="important__type">DOM collections are read-only</span>

DOM collections, and even more – _all_ navigation properties listed in this chapter are read-only.

We can’t replace a child by something else by assigning `childNodes[i] = ...`.

Changing DOM needs other methods. We will see them in the next chapter.

<span class="important__type">DOM collections are live</span>

Almost all DOM collections with minor exceptions are _live_. In other words, they reflect the current state of DOM.

If we keep a reference to `elem.childNodes`, and add/remove nodes into DOM, then they appear in the collection automatically.

<span class="important__type">Don’t use `for..in` to loop over collections</span>

Collections are iterable using `for..of`. Sometimes people try to use `for..in` for that.

Please, don’t. The `for..in` loop iterates over all enumerable properties. And collections have some “extra” rarely used properties that we usually do not want to get:

<a href="dom-navigation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-navigation.html#"

    <body>
    <script>
      // shows 0, 1, length, item, values and more.
      for (let prop in document.body.childNodes) alert(prop);
    </script>
    </body>

## <a href="dom-navigation.html#siblings-and-the-parent" id="siblings-and-the-parent" class="main__anchor">Siblings and the parent</a>

_Siblings_ are nodes that are children of the same parent.

For instance, here `<head>` and `<body>` are siblings:

    <html>
      <head>...</head><body>...</body>
    </html>

- `<body>` is said to be the “next” or “right” sibling of `<head>`,
- `<head>` is said to be the “previous” or “left” sibling of `<body>`.

The next sibling is in `nextSibling` property, and the previous one – in `previousSibling`.

The parent is available as `parentNode`.

For example:

<a href="dom-navigation.html#"
<a href="dom-navigation.html#"

    // parent of <body> is <html>
    alert( document.body.parentNode === document.documentElement ); // true

    // after <head> goes <body>
    alert( document.head.nextSibling ); // HTMLBodyElement

    // before <body> goes <head>
    alert( document.body.previousSibling ); // HTMLHeadElement

## <a href="dom-navigation.html#element-only-navigation" id="element-only-navigation" class="main__anchor">Element-only navigation</a>

Navigation properties listed above refer to _all_ nodes. For instance, in `childNodes` we can see both text nodes, element nodes, and even comment nodes if they exist.

But for many tasks we don’t want text or comment nodes. We want to manipulate element nodes that represent tags and form the structure of the page.

So let’s see more navigation links that only take _element nodes_ into account:

<figure><img src="article/dom-navigation/dom-links-elements.svg" width="440" height="316" /></figure>The links are similar to those given above, just with `Element` word inside:

- `children` – only those children that are element nodes.
- `firstElementChild`, `lastElementChild` – first and last element children.
- `previousElementSibling`, `nextElementSibling` – neighbor elements.
- `parentElement` – parent element.

<span class="important__type">Why `parentElement`? Can the parent be _not_ an element?</span>

The `parentElement` property returns the “element” parent, while `parentNode` returns “any node” parent. These properties are usually the same: they both get the parent.

With the one exception of `document.documentElement`:

<a href="dom-navigation.html#"
<a href="dom-navigation.html#"

    alert( document.documentElement.parentNode ); // document
    alert( document.documentElement.parentElement ); // null

The reason is that the root node `document.documentElement` (`<html>`) has `document` as its parent. But `document` is not an element node, so `parentNode` returns it and `parentElement` does not.

This detail may be useful when we want to travel up from an arbitrary element `elem` to `<html>`, but not to the `document`:

    while(elem = elem.parentElement) { // go up till <html>
      alert( elem );
    }

Let’s modify one of the examples above: replace `childNodes` with `children`. Now it shows only elements:

<a href="dom-navigation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-navigation.html#"

    <html>
    <body>
      <div>Begin</div>

      <ul>
        <li>Information</li>
      </ul>

      <div>End</div>

      <script>
        for (let elem of document.body.children) {
          alert(elem); // DIV, UL, DIV, SCRIPT
        }
      </script>
      ...
    </body>
    </html>

## <a href="dom-navigation.html#dom-navigation-tables" id="dom-navigation-tables" class="main__anchor">More links: tables</a>

Till now we described the basic navigation properties.

Certain types of DOM elements may provide additional properties, specific to their type, for convenience.

Tables are a great example of that, and represent a particularly important case:

**The `<table>`** element supports (in addition to the given above) these properties:

- `table.rows` – the collection of `<tr>` elements of the table.
- `table.caption/tHead/tFoot` – references to elements `<caption>`, `<thead>`, `<tfoot>`.
- `table.tBodies` – the collection of `<tbody>` elements (can be many according to the standard, but there will always be at least one – even if it is not in the source HTML, the browser will put it in the DOM).

**`<thead>`, `<tfoot>`, `<tbody>`** elements provide the `rows` property:

- `tbody.rows` – the collection of `<tr>` inside.

**`<tr>`:**

- `tr.cells` – the collection of `<td>` and `<th>` cells inside the given `<tr>`.
- `tr.sectionRowIndex` – the position (index) of the given `<tr>` inside the enclosing `<thead>/<tbody>/<tfoot>`.
- `tr.rowIndex` – the number of the `<tr>` in the table as a whole (including all table rows).

**`<td>` and `<th>`:**

- `td.cellIndex` – the number of the cell inside the enclosing `<tr>`.

An example of usage:

<a href="dom-navigation.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-navigation.html#"

    <table id="table">
      <tr>
        <td>one</td><td>two</td>
      </tr>
      <tr>
        <td>three</td><td>four</td>
      </tr>
    </table>

    <script>
      // get td with "two" (first row, second column)
      let td = table.rows[0].cells[1];
      td.style.backgroundColor = "red"; // highlight it
    </script>

The specification: [tabular data](https://html.spec.whatwg.org/multipage/tables.html).

There are also additional navigation properties for HTML forms. We’ll look at them later when we start working with forms.

## <a href="dom-navigation.html#summary" id="summary" class="main__anchor">Summary</a>

Given a DOM node, we can go to its immediate neighbors using navigation properties.

There are two main sets of them:

- For all nodes: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- For element nodes only: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

Some types of DOM elements, e.g. tables, provide additional properties and collections to access their content.

## <a href="dom-navigation.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="dom-navigation.html#dom-children" id="dom-children" class="main__anchor">DOM children</a>

<a href="task/dom-children.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Look at this page:

    <html>
    <body>
      <div>Users:</div>
      <ul>
        <li>John</li>
        <li>Pete</li>
      </ul>
    </body>
    </html>

For each of the following, give at least one way of how to access them:

- The `<div>` DOM node?
- The `<ul>` DOM node?
- The second `<li>` (with Pete)?

solution

There are many ways, for instance:

The `<div>` DOM node:

    document.body.firstElementChild
    // or
    document.body.children[0]
    // or (the first node is space, so we take 2nd)
    document.body.childNodes[1]

The `<ul>` DOM node:

    document.body.lastElementChild
    // or
    document.body.children[1]

The second `<li>` (with Pete):

    // get <ul>, and then get its last element child
    document.body.lastElementChild.lastElementChild

### <a href="dom-navigation.html#the-sibling-question" id="the-sibling-question" class="main__anchor">The sibling question</a>

<a href="task/navigation-links-which-null.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

If `elem` – is an arbitrary DOM element node…

- Is it true that `elem.lastChild.nextSibling` is always `null`?
- Is it true that `elem.children[0].previousSibling` is always `null` ?

solution

1.  Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`.
2.  No, wrong, because `elem.children[0]` is the first child _among elements_. But there may exist non-element nodes before it. So `previousSibling` may be a text node.

Please note: for both cases if there are no children, then there will be an error.

If there are no children, `elem.lastChild` is `null`, so we can’t access `elem.lastChild.nextSibling`. And the collection `elem.children` is empty (like an empty array `[]`).

### <a href="dom-navigation.html#select-all-diagonal-cells" id="select-all-diagonal-cells" class="main__anchor">Select all diagonal cells</a>

<a href="task/select-diagonal-cells.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code to paint all diagonal table cells in red.

You’ll need to get all diagonal `<td>` from the `<table>` and paint them using the code:

    // td should be the reference to the table cell
    td.style.backgroundColor = 'red';

The result should be:

[Open a sandbox for the task.](https://plnkr.co/edit/nuNlB97squ4Hgwrg?p=preview)

solution

We’ll be using `rows` and `cells` properties to access diagonal table cells.

[Open the solution in a sandbox.](https://plnkr.co/edit/mT7Hlxa5XBhtHzLt?p=preview)

<a href="dom-nodes.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="searching-elements-dom.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdom-navigation" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-navigation" </a>

<a href="tutorial/map.html" class="map">

## <a href="dom-navigation.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="dom-navigation.html#on-top-documentelement-and-body" class="sidebar__link">On top: documentElement and body</a>
- <a href="dom-navigation.html#children-childnodes-firstchild-lastchild" class="sidebar__link">Children: childNodes, firstChild, lastChild</a>
- <a href="dom-navigation.html#siblings-and-the-parent" class="sidebar__link">Siblings and the parent</a>
- <a href="dom-navigation.html#element-only-navigation" class="sidebar__link">Element-only navigation</a>
- <a href="dom-navigation.html#dom-navigation-tables" class="sidebar__link">More links: tables</a>
- <a href="dom-navigation.html#summary" class="sidebar__link">Summary</a>

- <a href="dom-navigation.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="dom-navigation.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fdom-navigation" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-navigation" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/03-dom-navigation" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
