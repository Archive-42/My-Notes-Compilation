EN

- <a href="https://ar.javascript.info/"
- <a href="template-element.html"
- <a href="https://es.javascript.info/template-element"

- <a href="https://it.javascript.info/template-element"
  template-element"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=template-element"
- <a href="https://tr.javascript.info/"
  emplate-element"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftemplate-element" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftemplate-element" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="web-components.html" Web components</span></a></span>

2nd August 2019

# Template element

A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores it contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.

In theory, we could create any invisible element somewhere in HTML for HTML markup storage purposes. What’s special about `<template>`?

First, its content can be any valid HTML, even if it normally requires a proper enclosing tag.

For example, we can put there a table row `<tr>`:

    <template>
      <tr>
        <td>Contents</td>
      </tr>
    </template>

Usually, if we try to put `<tr>` inside, say, a `<div>`, the browser detects the invalid DOM structure and “fixes” it, adds `<table>` around. That’s not what we want. On the other hand, `<template>` keeps exactly what we place there.

We can put styles and scripts into `<template>` as well:

    <template>
      <style>
        p { font-weight: bold; }
      </style>
      <script>
        alert("Hello");
      </script>
    </template>

The browser considers `<template>` content “out of the document”: styles are not applied, scripts are not executed, `<video autoplay>` is not run, etc.

The content becomes live (styles apply, scripts run etc) when we insert it into the document.

## <a href="template-element.html#inserting-template" id="inserting-template" class="main__anchor">Inserting template</a>

The template content is available in its `content` property as a [DocumentFragment](modifying-document.html#document-fragment) – a special type of DOM node.

We can treat it as any other DOM node, except one special property: when we insert it somewhere, its children are inserted instead.

For example:

<a href="template-element.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="template-element.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <template id="tmpl">
      <script>
        alert("Hello");
      </script>
      <div class="message">Hello, world!</div>
    </template>

    <script>
      let elem = document.createElement('div');

      // Clone the template content to reuse it multiple times
      elem.append(tmpl.content.cloneNode(true));

      document.body.append(elem);
      // Now the script from <template> runs
    </script>

Let’s rewrite a Shadow DOM example from the previous chapter using `<template>`:

<a href="template-element.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="template-element.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <template id="tmpl">
      <style> p { font-weight: bold; } </style>
      <p id="message"></p>
    </template>

    <div id="elem">Click me</div>

    <script>
      elem.onclick = function() {
        elem.attachShadow({mode: 'open'});

        elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)

        elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
      };
    </script>

In the line `(*)` when we clone and insert `tmpl.content`, as its `DocumentFragment`, its children (`<style>`, `<p>`) are inserted instead.

They form the shadow DOM:

    <div id="elem">
      #shadow-root
        <style> p { font-weight: bold; } </style>
        <p id="message"></p>
    </div>

## <a href="template-element.html#summary" id="summary" class="main__anchor">Summary</a>

To summarize:

- `<template>` content can be any syntactically correct HTML.
- `<template>` content is considered “out of the document”, so it doesn’t affect anything.
- We can access `template.content` from JavaScript, clone it to reuse in a new component.

The `<template>` tag is quite unique, because:

- The browser checks HTML syntax inside it (as opposed to using a template string inside a script).
- …But still allows use of any top-level HTML tags, even those that don’t make sense without proper wrappers (e.g. `<tr>`).
- The content becomes interactive: scripts run, `<video autoplay>` plays etc, when inserted into the document.

The `<template>` element does not feature any iteration mechanisms, data binding or variable substitutions, but we can implement those on top of it.

<a href="shadow-dom.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="slots-composition.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftemplate-element" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftemplate-element" </a>

<a href="tutorial/map.html" class="map">

## <a href="template-element.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="web-components.html" class="sidebar__link">Web components</a>

#### Lesson navigation

- <a href="template-element.html#inserting-template" class="sidebar__link">Inserting template</a>
- <a href="template-element.html#summary" class="sidebar__link">Summary</a>

- <a href="template-element.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftemplate-element" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftemplate-element" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/8-web-components/4-template-element" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
