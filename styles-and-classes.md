EN

- <a href="https://ar.javascript.info/styles-and-classes"
- <a href="styles-and-classes.html"
- <a href="https://es.javascript.info/styles-and-classes"
- <a href="https://fr.javascript.info/styles-and-classes"
- styles-and-classes"
  styles-and-classes"

<!-- -->

- <a href="https://ko.javascript.info/styles-and-classes"
- <a href=styles-and-classes"
- <a href="https://tr.javascript.info/styles-and-classes"
- <a href="https://zh.javascript.info/styles-and-classes"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fstyles-and-classes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstyles-and-classes" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" Document</span></a></span>

13th March 2020

# Styles and classes

Before we get into JavaScript’s ways of dealing with styles and classes – here’s an important rule. Hopefully it’s obvious enough, but we still have to mention it.

There are generally two ways to style an element:

1.  Create a class in CSS and add it: `<div class="...">`
2.  Write properties directly into `style`: `<div style="...">`.

JavaScript can modify both classes and `style` properties.

We should always prefer CSS classes to `style`. The latter should only be used if classes “can’t handle it”.

For example, `style` is acceptable if we calculate coordinates of an element dynamically and want to set them from JavaScript, like this:

    let top = /* complex calculations */;
    let left = /* complex calculations */;

    elem.style.left = left; // e.g '123px', calculated at run-time
    elem.style.top = top; // e.g '456px'

For other cases, like making the text red, adding a background icon – describe that in CSS and then add the class (JavaScript can do that). That’s more flexible and easier to support.

## <a href="styles-and-classes.html#classname-and-classlist" id="classname-and-classlist" class="main__anchor">className and classList</a>

Changing a class is one of the most often used actions in scripts.

In the ancient time, there was a limitation in JavaScript: a reserved word like `"class"` could not be an object property. That limitation does not exist now, but at that time it was impossible to have a `"class"` property, like `elem.class`.

So for classes the similar-looking property `"className"` was introduced: the `elem.className` corresponds to the `"class"` attribute.

For instance:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body class="main page">
      <script>
        alert(document.body.className); // main page
      </script>
    </body>

If we assign something to `elem.className`, it replaces the whole string of classes. Sometimes that’s what we need, but often we want to add/remove a single class.

There’s another property for that: `elem.classList`.

The `elem.classList` is a special object with methods to `add/remove/toggle` a single class.

For instance:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body class="main page">
      <script>
        // add a class
        document.body.classList.add('article');

        alert(document.body.className); // main page article
      </script>
    </body>

So we can operate both on the full class string using `className` or on individual classes using `classList`. What we choose depends on our needs.

Methods of `classList`:

- `elem.classList.add/remove("class")` – adds/removes the class.
- `elem.classList.toggle("class")` – adds the class if it doesn’t exist, otherwise removes it.
- `elem.classList.contains("class")` – checks for the given class, returns `true/false`.

Besides, `classList` is iterable, so we can list all classes with `for..of`, like this:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body class="main page">
      <script>
        for (let name of document.body.classList) {
          alert(name); // main, and then page
        }
      </script>
    </body>

## <a href="styles-and-classes.html#element-style" id="element-style" class="main__anchor">Element style</a>

The property `elem.style` is an object that corresponds to what’s written in the `"style"` attribute. Setting `elem.style.width="100px"` works the same as if we had in the attribute `style` a string `width:100px`.

For multi-word property the camelCase is used:

    background-color  => elem.style.backgroundColor
    z-index           => elem.style.zIndex
    border-left-width => elem.style.borderLeftWidth

For instance:

<a href="styles-and-classes.html#"
<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    document.body.style.backgroundColor = prompt('background color?', 'green');

<span class="important__type">Prefixed properties</span>

Browser-prefixed properties like `-moz-border-radius`, `-webkit-border-radius` also follow the same rule: a dash means upper case.

For instance:

    button.style.MozBorderRadius = '5px';
    button.style.WebkitBorderRadius = '5px';

## <a href="styles-and-classes.html#resetting-the-style-property" id="resetting-the-style-property" class="main__anchor">Resetting the style property</a>

Sometimes we want to assign a style property, and later remove it.

For instance, to hide an element, we can set `elem.style.display = "none"`.

Then later we may want to remove the `style.display` as if it were not set. Instead of `delete elem.style.display` we should assign an empty string to it: `elem.style.display = ""`.

<a href="styles-and-classes.html#"
<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // if we run this code, the <body> will blink
    document.body.style.display = "none"; // hide

    setTimeout(() => document.body.style.display = "", 1000); // back to normal

If we set `style.display` to an empty string, then the browser applies CSS classes and its built-in styles normally, as if there were no such `style.display` property at all.

<span class="important__type">Full rewrite with `style.cssText`</span>

Normally, we use `style.*` to assign individual style properties. We can’t set the full style like `div.style="color: red; width: 100px"`, because `div.style` is an object, and it’s read-only.

To set the full style as a string, there’s a special property `style.cssText`:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="div">Button</div>

    <script>
      // we can set special style flags like "important" here
      div.style.cssText=`color: red !important;
        background-color: yellow;
        width: 100px;
        text-align: center;
      `;

      alert(div.style.cssText);
    </script>

This property is rarely used, because such assignment removes all existing styles: it does not add, but replaces them. May occasionally delete something needed. But we can safely use it for new elements, when we know we won’t delete an existing style.

The same can be accomplished by setting an attribute: `div.setAttribute('style', 'color: red...')`.

## <a href="styles-and-classes.html#mind-the-units" id="mind-the-units" class="main__anchor">Mind the units</a>

Don’t forget to add CSS units to values.

For instance, we should not set `elem.style.top` to `10`, but rather to `10px`. Otherwise it wouldn’t work:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body>
      <script>
        // doesn't work!
        document.body.style.margin = 20;
        alert(document.body.style.margin); // '' (empty string, the assignment is ignored)

        // now add the CSS unit (px) - and it works
        document.body.style.margin = '20px';
        alert(document.body.style.margin); // 20px

        alert(document.body.style.marginTop); // 20px
        alert(document.body.style.marginLeft); // 20px
      </script>
    </body>

Please note: the browser “unpacks” the property `style.margin` in the last lines and infers `style.marginLeft` and `style.marginTop` from it.

## <a href="styles-and-classes.html#computed-styles-getcomputedstyle" id="computed-styles-getcomputedstyle" class="main__anchor">Computed styles: getComputedStyle</a>

So, modifying a style is easy. But how to _read_ it?

For instance, we want to know the size, margins, the color of an element. How to do it?

**The `style` property operates only on the value of the `"style"` attribute, without any CSS cascade.**

So we can’t read anything that comes from CSS classes using `elem.style`.

For instance, here `style` doesn’t see the margin:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <head>
      <style> body { color: red; margin: 5px } </style>
    </head>
    <body>

      The red text
      <script>
        alert(document.body.style.color); // empty
        alert(document.body.style.marginTop); // empty
      </script>
    </body>

…But what if we need, say, to increase the margin by `20px`? We would want the current value of it.

There’s another method for that: `getComputedStyle`.

The syntax is:

    getComputedStyle(element, [pseudo])

element  
Element to read the value for.

pseudo  
A pseudo-element if required, for instance `::before`. An empty string or no argument means the element itself.

The result is an object with styles, like `elem.style`, but now with respect to all CSS classes.

For instance:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <head>
      <style> body { color: red; margin: 5px } </style>
    </head>
    <body>

      <script>
        let computedStyle = getComputedStyle(document.body);

        // now we can read the margin and the color from it

        alert( computedStyle.marginTop ); // 5px
        alert( computedStyle.color ); // rgb(255, 0, 0)
      </script>

    </body>

<span class="important__type">Computed and resolved values</span>

There are two concepts in [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1.  A _computed_ style value is the value after all CSS rules and CSS inheritance is applied, as the result of the CSS cascade. It can look like `height:1em` or `font-size:125%`.
2.  A _resolved_ style value is the one finally applied to the element. Values like `1em` or `125%` are relative. The browser takes the computed value and makes all units fixed and absolute, for instance: `height:20px` or `font-size:16px`. For geometry properties resolved values may have a floating point, like `width:50.5px`.

A long time ago `getComputedStyle` was created to get computed values, but it turned out that resolved values are much more convenient, and the standard changed.

So nowadays `getComputedStyle` actually returns the resolved value of the property, usually in `px` for geometry.

<span class="important__type">`getComputedStyle` requires the full property name</span>

We should always ask for the exact property that we want, like `paddingLeft` or `marginTop` or `borderTopWidth`. Otherwise the correct result is not guaranteed.

For instance, if there are properties `paddingLeft/paddingTop`, then what should we get for `getComputedStyle(elem).padding`? Nothing, or maybe a “generated” value from known paddings? There’s no standard rule here.

There are other inconsistencies. As an example, some browsers (Chrome) show `10px` in the document below, and some of them (Firefox) – do not:

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="styles-and-classes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      body {
        margin: 10px;
      }
    </style>
    <script>
      let style = getComputedStyle(document.body);
      alert(style.margin); // empty string in Firefox
    </script>

<span class="important__type">Styles applied to `:visited` links are hidden!</span>

Visited links may be colored using `:visited` CSS pseudoclass.

But `getComputedStyle` does not give access to that color, because otherwise an arbitrary page could find out whether the user visited a link by creating it on the page and checking the styles.

JavaScript may not see the styles applied by `:visited`. And also, there’s a limitation in CSS that forbids applying geometry-changing styles in `:visited`. That’s to guarantee that there’s no side way for an evil page to test if a link was visited and hence to break the privacy.

## <a href="styles-and-classes.html#summary" id="summary" class="main__anchor">Summary</a>

To manage classes, there are two DOM properties:

- `className` – the string value, good to manage the whole set of classes.
- `classList` – the object with methods `add/remove/toggle/contains`, good for individual classes.

To change the styles:

- The `style` property is an object with camelCased styles. Reading and writing to it has the same meaning as modifying individual properties in the `"style"` attribute. To see how to apply `important` and other rare stuff – there’s a list of methods at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration).

- The `style.cssText` property corresponds to the whole `"style"` attribute, the full string of styles.

To read the resolved styles (with respect to all classes, after all CSS is applied and final values are calculated):

- The `getComputedStyle(elem, [pseudo])` returns the style-like object with them. Read-only.

## <a href="styles-and-classes.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="styles-and-classes.html#create-a-notification" id="create-a-notification" class="main__anchor">Create a notification</a>

<a href="task/create-notification.html" class="task__open-link"></a>

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

<a href="modifying-document.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="size-and-scroll.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fstyles-and-classes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstyles-and-classes" </a>

<a href="tutorial/map.html" class="map">

## <a href="styles-and-classes.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="styles-and-classes.html#classname-and-classlist" class="sidebar__link">className and classList</a>
- <a href="styles-and-classes.html#element-style" class="sidebar__link">Element style</a>
- <a href="styles-and-classes.html#resetting-the-style-property" class="sidebar__link">Resetting the style property</a>
- <a href="styles-and-classes.html#mind-the-units" class="sidebar__link">Mind the units</a>
- <a href="styles-and-classes.html#computed-styles-getcomputedstyle" class="sidebar__link">Computed styles: getComputedStyle</a>
- <a href="styles-and-classes.html#summary" class="sidebar__link">Summary</a>

- <a href="styles-and-classes.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="styles-and-classes.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fstyles-and-classes" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstyles-and-classes" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/08-styles-and-classes" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
