EN

- <a href="https://ar.javascript.info/dom-attributes-and-properties" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="dom-attributes-and-properties.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/dom-attributes-and-properties" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- dom-attributes-and-properties" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/dom-attributes-and-properties" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

/dom-attributes-and-properties" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>

<a href="dom-attributes-and-properties%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>

<a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>

<a href="https://zh.javascript.info/dom-attributes-and-properties" class="supported-langs__link"></a>

Search

<span class="share-icons__title">Share</span>2Fdom-attributes-and-properties" rel="nofollow" &gt;2Fdom-attributes-and-properties عربي English Español Français Italiano 日本語 한국어 Русский Türkçe

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="ui.html" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="document.html" class="breadcrumbs__link"><span>Document</span></a></span>

10th November 2020

# Attributes and properties

When the browser loads the page, it “reads” (another word: “parses”) the HTML and generates DOM objects from it. For element nodes, most standard HTML attributes automatically become properties of DOM objects.

For instance, if the tag is `<body id="page">`, then the DOM object has `body.id="page"`.

But the attribute-property mapping is not one-to-one! In this chapter we’ll pay attention to separate these two notions, to see how to work with them, when they are the same, and when they are different.

## <a href="dom-attributes-and-properties.html#dom-properties" id="dom-properties" class="main__anchor">DOM properties</a>

We’ve already seen built-in DOM properties. There are a lot. But technically no one limits us, and if there aren’t enough, we can add our own.

DOM nodes are regular JavaScript objects. We can alter them.

For instance, let’s create a new property in `document.body`:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    document.body.myData = {
      name: 'Caesar',
      title: 'Imperator'
    };

    alert(document.body.myData.title); // Imperator

We can add a method as well:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    document.body.sayTagName = function() {
      alert(this.tagName);
    };

    document.body.sayTagName(); // BODY (the value of "this" in the method is document.body)

We can also modify built-in prototypes like `Element.prototype` and add new methods to all elements:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    Element.prototype.sayHi = function() {
      alert(`Hello, I'm ${this.tagName}`);
    };

    document.documentElement.sayHi(); // Hello, I'm HTML
    document.body.sayHi(); // Hello, I'm BODY

So, DOM properties and methods behave just like those of regular JavaScript objects:

- They can have any value.
- They are case-sensitive (write `elem.nodeType`, not `elem.NoDeTyPe`).

## <a href="dom-attributes-and-properties.html#html-attributes" id="html-attributes" class="main__anchor">HTML attributes</a>

In HTML, tags may have attributes. When the browser parses the HTML to create DOM objects for tags, it recognizes _standard_ attributes and creates DOM properties from them.

So when an element has `id` or another _standard_ attribute, the corresponding property gets created. But that doesn’t happen if the attribute is non-standard.

For instance:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body id="test" something="non-standard">
      <script>
        alert(document.body.id); // test
        // non-standard attribute does not yield a property
        alert(document.body.something); // undefined
      </script>
    </body>

Please note that a standard attribute for one element can be unknown for another one. For instance, `"type"` is standard for `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), but not for `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Standard attributes are described in the specification for the corresponding element class.

Here we can see it:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body id="body" type="...">
      <input id="input" type="text">
      <script>
        alert(input.type); // text
        alert(body.type); // undefined: DOM property not created, because it's non-standard
      </script>
    </body>

So, if an attribute is non-standard, there won’t be a DOM-property for it. Is there a way to access such attributes?

Sure. All attributes are accessible by using the following methods:

- `elem.hasAttribute(name)` – checks for existence.
- `elem.getAttribute(name)` – gets the value.
- `elem.setAttribute(name, value)` – sets the value.
- `elem.removeAttribute(name)` – removes the attribute.

These methods operate exactly with what’s written in HTML.

Also one can read all attributes using `elem.attributes`: a collection of objects that belong to a built-in [Attr](https://dom.spec.whatwg.org/#attr) class, with `name` and `value` properties.

Here’s a demo of reading a non-standard property:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body something="non-standard">
      <script>
        alert(document.body.getAttribute('something')); // non-standard
      </script>
    </body>

HTML attributes have the following features:

- Their name is case-insensitive (`id` is same as `ID`).
- Their values are always strings.

Here’s an extended demo of working with attributes:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body>
      <div id="elem" about="Elephant"></div>

      <script>
        alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

        elem.setAttribute('Test', 123); // (2), writing

        alert( elem.outerHTML ); // (3), see if the attribute is in HTML (yes)

        for (let attr of elem.attributes) { // (4) list all
          alert( `${attr.name} = ${attr.value}` );
        }
      </script>
    </body>

Please note:

1.  `getAttribute('About')` – the first letter is uppercase here, and in HTML it’s all lowercase. But that doesn’t matter: attribute names are case-insensitive.
2.  We can assign anything to an attribute, but it becomes a string. So here we have `"123"` as the value.
3.  All attributes including ones that we set are visible in `outerHTML`.
4.  The `attributes` collection is iterable and has all the attributes of the element (standard and non-standard) as objects with `name` and `value` properties.

## <a href="dom-attributes-and-properties.html#property-attribute-synchronization" id="property-attribute-synchronization" class="main__anchor">Property-attribute synchronization</a>

When a standard attribute changes, the corresponding property is auto-updated, and (with some exceptions) vice versa.

In the example below `id` is modified as an attribute, and we can see the property changed too. And then the same backwards:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input>

    <script>
      let input = document.querySelector('input');

      // attribute => property
      input.setAttribute('id', 'id');
      alert(input.id); // id (updated)

      // property => attribute
      input.id = 'newId';
      alert(input.getAttribute('id')); // newId (updated)
    </script>

But there are exclusions, for instance `input.value` synchronizes only from attribute → to property, but not back:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input>

    <script>
      let input = document.querySelector('input');

      // attribute => property
      input.setAttribute('value', 'text');
      alert(input.value); // text

      // NOT property => attribute
      input.value = 'newValue';
      alert(input.getAttribute('value')); // text (not updated!)
    </script>

In the example above:

- Changing the attribute `value` updates the property.
- But the property change does not affect the attribute.

That “feature” may actually come in handy, because the user actions may lead to `value` changes, and then after them, if we want to recover the “original” value from HTML, it’s in the attribute.

## <a href="dom-attributes-and-properties.html#dom-properties-are-typed" id="dom-properties-are-typed" class="main__anchor">DOM properties are typed</a>

DOM properties are not always strings. For instance, the `input.checked` property (for checkboxes) is a boolean:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input id="input" type="checkbox" checked> checkbox

    <script>
      alert(input.getAttribute('checked')); // the attribute value is: empty string
      alert(input.checked); // the property value is: true
    </script>

There are other examples. The `style` attribute is a string, but the `style` property is an object:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="div" style="color:red;font-size:120%">Hello</div>

    <script>
      // string
      alert(div.getAttribute('style')); // color:red;font-size:120%

      // object
      alert(div.style); // [object CSSStyleDeclaration]
      alert(div.style.color); // red
    </script>

Most properties are strings though.

Quite rarely, even if a DOM property type is a string, it may differ from the attribute. For instance, the `href` DOM property is always a _full_ URL, even if the attribute contains a relative URL or just a `#hash`.

Here’s an example:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <a id="a" href="#hello">link</a>
    <script>
      // attribute
      alert(a.getAttribute('href')); // #hello

      // property
      alert(a.href ); // full URL in the form http://site.com/page#hello
    </script>

If we need the value of `href` or any other attribute exactly as written in the HTML, we can use `getAttribute`.

## <a href="dom-attributes-and-properties.html#non-standard-attributes-dataset" id="non-standard-attributes-dataset" class="main__anchor">Non-standard attributes, dataset</a>

When writing HTML, we use a lot of standard attributes. But what about non-standard, custom ones? First, let’s see whether they are useful or not? What for?

Sometimes non-standard attributes are used to pass custom data from HTML to JavaScript, or to “mark” HTML-elements for JavaScript.

Like this:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!-- mark the div to show "name" here -->
    <div show-info="name"></div>
    <!-- and age here -->
    <div show-info="age"></div>

    <script>
      // the code finds an element with the mark and shows what's requested
      let user = {
        name: "Pete",
        age: 25
      };

      for(let div of document.querySelectorAll('[show-info]')) {
        // insert the corresponding info into the field
        let field = div.getAttribute('show-info');
        div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
      }
    </script>

Also they can be used to style an element.

For instance, here for the order state the attribute `order-state` is used:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      /* styles rely on the custom attribute "order-state" */
      .order[order-state="new"] {
        color: green;
      }

      .order[order-state="pending"] {
        color: blue;
      }

      .order[order-state="canceled"] {
        color: red;
      }
    </style>

    <div class="order" order-state="new">
      A new order.
    </div>

    <div class="order" order-state="pending">
      A pending order.
    </div>

    <div class="order" order-state="canceled">
      A canceled order.
    </div>

Why would using an attribute be preferable to having classes like `.order-state-new`, `.order-state-pending`, `.order-state-canceled`?

Because an attribute is more convenient to manage. The state can be changed as easy as:

    // a bit simpler than removing old/adding a new class
    div.setAttribute('order-state', 'canceled');

But there may be a possible problem with custom attributes. What if we use a non-standard attribute for our purposes and later the standard introduces it and makes it do something? The HTML language is alive, it grows, and more attributes appear to suit the needs of developers. There may be unexpected effects in such case.

To avoid conflicts, there exist [data-\*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) attributes.

**All attributes starting with “data-” are reserved for programmers’ use. They are available in the `dataset` property.**

For instance, if an `elem` has an attribute named `"data-about"`, it’s available as `elem.dataset.about`.

Like this:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body data-about="Elephants">
    <script>
      alert(document.body.dataset.about); // Elephants
    </script>

Multiword attributes like `data-order-state` become camel-cased: `dataset.orderState`.

Here’s a rewritten “order state” example:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      .order[data-order-state="new"] {
        color: green;
      }

      .order[data-order-state="pending"] {
        color: blue;
      }

      .order[data-order-state="canceled"] {
        color: red;
      }
    </style>

    <div id="order" class="order" data-order-state="new">
      A new order.
    </div>

    <script>
      // read
      alert(order.dataset.orderState); // new

      // modify
      order.dataset.orderState = "pending"; // (*)
    </script>

Using `data-*` attributes is a valid, safe way to pass custom data.

Please note that we can not only read, but also modify data-attributes. Then CSS updates the view accordingly: in the example above the last line `(*)` changes the color to blue.

## <a href="dom-attributes-and-properties.html#summary" id="summary" class="main__anchor">Summary</a>

- Attributes – is what’s written in HTML.
- Properties – is what’s in DOM objects.

A small comparison:

<table><thead><tr class="header"><th></th><th>Properties</th><th>Attributes</th></tr></thead><tbody><tr class="odd"><td>Type</td><td>Any value, standard properties have types described in the spec</td><td>A string</td></tr><tr class="even"><td>Name</td><td>Name is case-sensitive</td><td>Name is not case-sensitive</td></tr></tbody></table>

Methods to work with attributes are:

- `elem.hasAttribute(name)` – to check for existence.
- `elem.getAttribute(name)` – to get the value.
- `elem.setAttribute(name, value)` – to set the value.
- `elem.removeAttribute(name)` – to remove the attribute.
- `elem.attributes` is a collection of all attributes.

For most situations using DOM properties is preferable. We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:

- We need a non-standard attribute. But if it starts with `data-`, then we should use `dataset`.
- We want to read the value “as written” in HTML. The value of the DOM property may be different, for instance the `href` property is always a full URL, and we may want to get the “original” value.

## <a href="dom-attributes-and-properties.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="dom-attributes-and-properties.html#get-the-attribute" id="get-the-attribute" class="main__anchor">Get the attribute</a>

<a href="task/get-user-attribute.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code to select the element with `data-widget-name` attribute from the document and to read its value.

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!DOCTYPE html>
    <html>
    <body>

      <div data-widget-name="menu">Choose the genre</div>

      <script>
        /* your code */
      </script>
    </body>
    </html>

solution

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!DOCTYPE html>
    <html>
    <body>

      <div data-widget-name="menu">Choose the genre</div>

      <script>
        // getting it
        let elem = document.querySelector('[data-widget-name]');

        // reading the value
        alert(elem.dataset.widgetName);
        // or
        alert(elem.getAttribute('data-widget-name'));
      </script>
    </body>
    </html>

### <a href="dom-attributes-and-properties.html#make-external-links-orange" id="make-external-links-orange" class="main__anchor">Make external links orange</a>

<a href="task/yellow-links.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Make all external links orange by altering their `style` property.

A link is external if:

- Its `href` has `://` in it
- But doesn’t start with `http://internal.com`.

Example:

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="dom-attributes-and-properties.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <a name="list">the list</a>
    <ul>
      <li><a href="http://google.com">http://google.com</a></li>
      <li><a href="/tutorial">/tutorial.html</a></li>
      <li><a href="local/path">local/path</a></li>
      <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
      <li><a href="http://nodejs.org">http://nodejs.org</a></li>
      <li><a href="http://internal.com/test">http://internal.com/test</a></li>
    </ul>

    <script>
      // setting style for a single link
      let link = document.querySelector('a');
      link.style.color = 'orange';
    </script>

The result should be:

[Open a sandbox for the task.](https://plnkr.co/edit/P633iMGyfcQ6DCdF?p=preview)

solution

First, we need to find all external references.

There are two ways.

The first is to find all links using `document.querySelectorAll('a')` and then filter out what we need:

    let links = document.querySelectorAll('a');

    for (let link of links) {
      let href = link.getAttribute('href');
      if (!href) continue; // no attribute

      if (!href.includes('://')) continue; // no protocol

      if (href.startsWith('http://internal.com')) continue; // internal

      link.style.color = 'orange';
    }

Please note: we use `link.getAttribute('href')`. Not `link.href`, because we need the value from HTML.

…Another, simpler way would be to add the checks to CSS selector:

    // look for all links that have :// in href
    // but href doesn't start with http://internal.com
    let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
    let links = document.querySelectorAll(selector);

    links.forEach(link => link.style.color = 'orange');

[Open the solution in a sandbox.](https://plnkr.co/edit/zrwKuNxvROq8nxsg?p=preview)

<a href="basic-dom-node-properties.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="modifying-document.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdom-attributes-and-properties" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-attributes-and-properties" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="dom-attributes-and-properties.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="document.html" class="sidebar__link">Document</a>

#### Lesson navigation

- dom-attributes-and-properties.html\#dom-properties" &gt;DOM properties
- dom-attributes-and-properties.html\#html-attributes" &gt;HTML attributes
- dom-attributes-and-properties.html\#property-attribute-synchronization" &gt;Property-attribute synchronization
- dom-attributes-and-properties.html\#dom-properties-are-typed" &gt;DOM properties are typed
- dom-attributes-and-properties.html\#non-standard-attributes-dataset" &gt;Non-standard attributes, dataset
- dom-attributes-and-properties.html

<!-- -->

- dom-attributes-and-properties.html\#tasks" &gt;Tasks (2)
- dom-attributes-and-properties.html\#comments" &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Fdom-attributes-and-properties" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdom-attributes-and-properties" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/06-dom-attributes-and-properties" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
