EN

- <a href="https://ar.javascript.info/"
- <a href="searching-elements-dom.html"
- <a href="https://es.javascript.info/searching-elements-dom"

- searching-elements-dom"
  searching-elements-dom"

<!-- -->

- <a href="https://ko.javascript.info/searching-elements-dom"
- <a href=searching-elements-dom"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/searching-elements-dom"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsearching-elements-dom" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsearching-elements-dom" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

24th December 2020

# Searching: getElement\*, querySelector\*

DOM navigation properties are great when elements are close to each other. What if they are not? How to get an arbitrary element of the page?

There are additional searching methods for that.

## <a href="searching-elements-dom.html#document-getelementbyid-or-just-id" id="document-getelementbyid-or-just-id" class="main__anchor">document.getElementById or just id</a>

If an element has the `id` attribute, we can get the element using the method `document.getElementById(id)`, no matter where it is.

For instance:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="elem">
      <div id="elem-content">Element</div>
    </div>

    <script>
      // get the element
      let elem = document.getElementById('elem');

      // make its background red
      elem.style.background = 'red';
    </script>

Also, there’s a global variable named by `id` that references the element:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="elem">
      <div id="elem-content">Element</div>
    </div>

    <script>
      // elem is a reference to DOM-element with id="elem"
      elem.style.background = 'red';

      // id="elem-content" has a hyphen inside, so it can't be a variable name
      // ...but we can access it using square brackets: window['elem-content']
    </script>

…That’s unless we declare a JavaScript variable with the same name, then it takes precedence:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="elem"></div>

    <script>
      let elem = 5; // now elem is 5, not a reference to <div id="elem">

      alert(elem); // 5
    </script>

<span class="important__type">Please don’t use id-named global variables to access elements</span>

This behavior is described [in the specification](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), so it’s kind of standard. But it is supported mainly for compatibility.

The browser tries to help us by mixing namespaces of JS and DOM. That’s fine for simple scripts, inlined into HTML, but generally isn’t a good thing. There may be naming conflicts. Also, when one reads JS code and doesn’t have HTML in view, it’s not obvious where the variable comes from.

Here in the tutorial we use `id` to directly reference an element for brevity, when it’s obvious where the element comes from.

In real life `document.getElementById` is the preferred method.

<span class="important__type">The `id` must be unique</span>

The `id` must be unique. There can be only one element in the document with the given `id`.

If there are multiple elements with the same `id`, then the behavior of methods that use it is unpredictable, e.g. `document.getElementById` may return any of such elements at random. So please stick to the rule and keep `id` unique.

<span class="important__type">Only `document.getElementById`, not `anyElem.getElementById`</span>

The method `getElementById` can be called only on `document` object. It looks for the given `id` in the whole document.

## <a href="searching-elements-dom.html#querySelectorAll" id="querySelectorAll" class="main__anchor">querySelectorAll</a>

By far, the most versatile method, `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selector.

Here we look for all `<li>` elements that are last children:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ul>
      <li>The</li>
      <li>test</li>
    </ul>
    <ul>
      <li>has</li>
      <li>passed</li>
    </ul>
    <script>
      let elements = document.querySelectorAll('ul > li:last-child');

      for (let elem of elements) {
        alert(elem.innerHTML); // "test", "passed"
      }
    </script>

This method is indeed powerful, because any CSS selector can be used.

<span class="important__type">Can use pseudo-classes as well</span>

Pseudo-classes in the CSS selector like `:hover` and `:active` are also supported. For instance, `document.querySelectorAll(':hover')` will return the collection with elements that the pointer is over now (in nesting order: from the outermost `<html>` to the most nested one).

## <a href="searching-elements-dom.html#querySelector" id="querySelector" class="main__anchor">querySelector</a>

The call to `elem.querySelector(css)` returns the first element for the given CSS selector.

In other words, the result is the same as `elem.querySelectorAll(css)[0]`, but the latter is looking for _all_ elements and picking one, while `elem.querySelector` just looks for one. So it’s faster and also shorter to write.

## <a href="searching-elements-dom.html#matches" id="matches" class="main__anchor">matches</a>

Previous methods were searching the DOM.

The [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) does not look for anything, it merely checks if `elem` matches the given CSS-selector. It returns `true` or `false`.

The method comes in handy when we are iterating over elements (like in an array or something) and trying to filter out those that interest us.

For instance:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <a href="http://example.com/file.zip">...</a>
    <a href="http://ya.ru">...</a>

    <script>
      // can be any collection instead of document.body.children
      for (let elem of document.body.children) {
        if (elem.matches('a[href$="zip"]')) {
          alert("The archive reference: " + elem.href );
        }
      }
    </script>

## <a href="searching-elements-dom.html#closest" id="closest" class="main__anchor">closest</a>

_Ancestors_ of an element are: parent, the parent of parent, its parent and so on. The ancestors together form the chain of parents from the element to the top.

The method `elem.closest(css)` looks for the nearest ancestor that matches the CSS-selector. The `elem` itself is also included in the search.

In other words, the method `closest` goes up from the element and checks each of parents. If it matches the selector, then the search stops, and the ancestor is returned.

For instance:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <h1>Contents</h1>

    <div class="contents">
      <ul class="book">
        <li class="chapter">Chapter 1</li>
        <li class="chapter">Chapter 1</li>
      </ul>
    </div>

    <script>
      let chapter = document.querySelector('.chapter'); // LI

      alert(chapter.closest('.book')); // UL
      alert(chapter.closest('.contents')); // DIV

      alert(chapter.closest('h1')); // null (because h1 is not an ancestor)
    </script>

## <a href="searching-elements-dom.html#getelementsby" id="getelementsby" class="main__anchor">getElementsBy\*</a>

There are also other methods to look for nodes by a tag, class, etc.

Today, they are mostly history, as `querySelector` is more powerful and shorter to write.

So here we cover them mainly for completeness, while you can still find them in the old scripts.

- `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for “any tags”.
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
- `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. Very rarely used.

For instance:

    // get all divs in the document
    let divs = document.getElementsByTagName('div');

Let’s find all `input` tags inside the table:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <table id="table">
      <tr>
        <td>Your age:</td>

        <td>
          <label>
            <input type="radio" name="age" value="young" checked> less than 18
          </label>
          <label>
            <input type="radio" name="age" value="mature"> from 18 to 50
          </label>
          <label>
            <input type="radio" name="age" value="senior"> more than 60
          </label>
        </td>
      </tr>
    </table>

    <script>
      let inputs = table.getElementsByTagName('input');

      for (let input of inputs) {
        alert( input.value + ': ' + input.checked );
      }
    </script>

<span class="important__type">Don’t forget the `"s"` letter!</span>

Novice developers sometimes forget the letter `"s"`. That is, they try to call `getElementByTagName` instead of `getElementsByTagName`.

The `"s"` letter is absent in `getElementById`, because it returns a single element. But `getElementsByTagName` returns a collection of elements, so there’s `"s"` inside.

<span class="important__type">It returns a collection, not an element!</span>

Another widespread novice mistake is to write:

    // doesn't work
    document.getElementsByTagName('input').value = 5;

That won’t work, because it takes a _collection_ of inputs and assigns the value to it rather than to elements inside it.

We should either iterate over the collection or get an element by its index, and then assign, like this:

    // should work (if there's an input)
    document.getElementsByTagName('input')[0].value = 5;

Looking for `.article` elements:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <form name="my-form">
      <div class="article">Article</div>
      <div class="long article">Long article</div>
    </form>

    <script>
      // find by name attribute
      let form = document.getElementsByName('my-form')[0];

      // find by class inside the form
      let articles = form.getElementsByClassName('article');
      alert(articles.length); // 2, found two elements with class "article"
    </script>

## <a href="searching-elements-dom.html#live-collections" id="live-collections" class="main__anchor">Live collections</a>

All methods `"getElementsBy*"` return a _live_ collection. Such collections always reflect the current state of the document and “auto-update” when it changes.

In the example below, there are two scripts.

1.  The first one creates a reference to the collection of `<div>`. As of now, its length is `1`.
2.  The second scripts runs after the browser meets one more `<div>`, so its length is `2`.

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div>First div</div>

    <script>
      let divs = document.getElementsByTagName('div');
      alert(divs.length); // 1
    </script>

    <div>Second div</div>

    <script>
      alert(divs.length); // 2
    </script>

In contrast, `querySelectorAll` returns a _static_ collection. It’s like a fixed array of elements.

If we use it instead, then both scripts output `1`:

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="searching-elements-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div>First div</div>

    <script>
      let divs = document.querySelectorAll('div');
      alert(divs.length); // 1
    </script>

    <div>Second div</div>

    <script>
      alert(divs.length); // 1
    </script>

Now we can easily see the difference. The static collection did not increase after the appearance of a new `div` in the document.

## <a href="searching-elements-dom.html#summary" id="summary" class="main__anchor">Summary</a>

There are 6 main methods to search for nodes in DOM:

<table><thead><tr class="header"><th>Method</th><th>Searches by...</th><th>Can call on an element?</th><th>Live?</th></tr></thead><tbody><tr class="odd"><td><code>querySelector</code></td><td>CSS-selector</td><td>✔</td><td>-</td></tr><tr class="even"><td><code>querySelectorAll</code></td><td>CSS-selector</td><td>✔</td><td>-</td></tr><tr class="odd"><td><code>getElementById</code></td><td><code>id</code></td><td>-</td><td>-</td></tr><tr class="even"><td><code>getElementsByName</code></td><td><code>name</code></td><td>-</td><td>✔</td></tr><tr class="odd"><td><code>getElementsByTagName</code></td><td>tag or <code>'*'</code></td><td>✔</td><td>✔</td></tr><tr class="even"><td><code>getElementsByClassName</code></td><td>class</td><td>✔</td><td>✔</td></tr></tbody></table>

By far the most used are `querySelector` and `querySelectorAll`, but `getElement(s)By*` can be sporadically helpful or found in the old scripts.

Besides that:

- There is `elem.matches(css)` to check if `elem` matches the given CSS selector.
- There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The `elem` itself is also checked.

And let’s mention one more method here to check for the child-parent relationship, as it’s sometimes useful:

- `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`.

## <a href="searching-elements-dom.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="searching-elements-dom.html#search-for-elements" id="search-for-elements" class="main__anchor">Search for elements</a>

<a href="task/find-elements.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Here’s the document with the table and form.

How to find?…

1.  The table with `id="age-table"`.
2.  All `label` elements inside that table (there should be 3 of them).
3.  The first `td` in that table (with the word “Age”).
4.  The `form` with `name="search"`.
5.  The first `input` in that form.
6.  The last `input` in that form.

Open the page [table.html](task/find-elements/table.html) in a separate window and make use of browser tools for that.

solution

There are many ways to do it.

Here are some of them:

    // 1. The table with `id="age-table"`.
    let table = document.getElementById('age-table')

    // 2. All label elements inside that table
    table.getElementsByTagName('label')
    // or
    document.querySelectorAll('#age-table label')

    // 3. The first td in that table (with the word "Age")
    table.rows[0].cells[0]
    // or
    table.getElementsByTagName('td')[0]
    // or
    table.querySelector('td')

    // 4. The form with the name "search"
    // assuming there's only one element with name="search" in the document
    let form = document.getElementsByName('search')[0]
    // or, form specifically
    document.querySelector('form[name="search"]')

    // 5. The first input in that form.
    form.getElementsByTagName('input')[0]
    // or
    form.querySelector('input')

    // 6. The last input in that form
    let inputs = form.querySelectorAll('input') // find all inputs
    inputs[inputs.length-1] // take the last one

<a href="dom-navigation.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="basic-dom-node-properties.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsearching-elements-dom" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsearching-elements-dom" </a>

<a href="tutorial/map.html" class="map">

## <a href="searching-elements-dom.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="searching-elements-dom.html#document-getelementbyid-or-just-id" class="sidebar__link">document.getElementById or just id</a>
- <a href="searching-elements-dom.html#querySelectorAll" class="sidebar__link">querySelectorAll</a>
- <a href="searching-elements-dom.html#querySelector" class="sidebar__link">querySelector</a>
- <a href="searching-elements-dom.html#matches" class="sidebar__link">matches</a>
- <a href="searching-elements-dom.html#closest" class="sidebar__link">closest</a>
- <a href="searching-elements-dom.html#getelementsby" class="sidebar__link">getElementsBy\*</a>
- <a href="searching-elements-dom.html#live-collections" class="sidebar__link">Live collections</a>
- <a href="searching-elements-dom.html#summary" class="sidebar__link">Summary</a>

- <a href="searching-elements-dom.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="searching-elements-dom.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fsearching-elements-dom" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsearching-elements-dom" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/04-searching-elements-dom" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
