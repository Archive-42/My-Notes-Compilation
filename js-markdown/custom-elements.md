EN

langs\_\_title">عربي</span></a>

- <a href="custom-elements.html"
- <a href="https://es.javascript.info/"
- <a href="https://fr.javascript.info/custom-elements"
- custom-elements"
  custom-elements"

<!-- -->

- /"
- <a href=custom-elements"
- <a href="https://tr.javascript.info/custom-elements"
- <a href="https://zh.javascript.info/custom-elements"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcustom-elements" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcustom-elements" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="web-components.html" Web components</span></a></span>

26th March 2021

# Custom elements

We can create custom HTML elements, described by our class, with its own methods and properties, events and so on.

Once a custom element is defined, we can use it on par with built-in HTML elements.

That’s great, as HTML dictionary is rich, but not infinite. There are no `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`… Just think of any other tag we might need.

We can define them with a special class, and then use as if they were always a part of HTML.

There are two kinds of custom elements:

1.  **Autonomous custom elements** – “all-new” elements, extending the abstract `HTMLElement` class.
2.  **Customized built-in elements** – extending built-in elements, like a customized button, based on `HTMLButtonElement` etc.

First we’ll cover autonomous elements, and then move to customized built-in ones.

To create a custom element, we need to tell the browser several details about it: how to show it, what to do when the element is added or removed to page, etc.

That’s done by making a class with special methods. That’s easy, as there are only few methods, and all of them are optional.

Here’s a sketch with the full list:

    class MyElement extends HTMLElement {
      constructor() {
        super();
        // element created
      }

      connectedCallback() {
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
      }

      disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
      }

      static get observedAttributes() {
        return [/* array of attribute names to monitor for changes */];
      }

      attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
      }

      adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
      }

      // there can be other element methods and properties
    }

After that, we need to register the element:

    // let the browser know that <my-element> is served by our new class
    customElements.define("my-element", MyElement);

Now for any HTML elements with tag `<my-element>`, an instance of `MyElement` is created, and the aforementioned methods are called. We also can `document.createElement('my-element')` in JavaScript.

<span class="important__type">Custom element name must contain a hyphen `-`</span>

Custom element name must have a hyphen `-`, e.g. `my-element` and `super-button` are valid names, but `myelement` is not.

That’s to ensure that there are no name conflicts between built-in and custom HTML elements.

## <a href="custom-elements.html#example-time-formatted" id="example-time-formatted" class="main__anchor">Example: “time-formatted”</a>

For example, there already exists `<time>` element in HTML, for date/time. But it doesn’t do any formatting by itself.

Let’s create `<time-formatted>` element that displays the time in a nice, language-aware format:

<a href="custom-elements.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="custom-elements.html#"

    <script>
    class TimeFormatted extends HTMLElement { // (1)

      connectedCallback() {
        let date = new Date(this.getAttribute('datetime') || Date.now());

        this.innerHTML = new Intl.DateTimeFormat("default", {
          year: this.getAttribute('year') || undefined,
          month: this.getAttribute('month') || undefined,
          day: this.getAttribute('day') || undefined,
          hour: this.getAttribute('hour') || undefined,
          minute: this.getAttribute('minute') || undefined,
          second: this.getAttribute('second') || undefined,
          timeZoneName: this.getAttribute('time-zone-name') || undefined,
        }).format(date);
      }

    }

    customElements.define("time-formatted", TimeFormatted); // (2)
    </script>

    <!-- (3) -->
    <time-formatted datetime="2019-12-01"
      year="numeric" month="long" day="numeric"
      hour="numeric" minute="numeric" second="numeric"
      time-zone-name="short"
    ></time-formatted>

1.  The class has only one method `connectedCallback()` – the browser calls it when `<time-formatted>` element is added to page (or when HTML parser detects it), and it uses the built-in [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) data formatter, well-supported across the browsers, to show a nicely formatted time.
2.  We need to register our new element by `customElements.define(tag, class)`.
3.  And then we can use it everywhere.

<span class="important__type">Custom elements upgrade</span>

If the browser encounters any `<time-formatted>` elements before `customElements.define`, that’s not an error. But the element is yet unknown, just like any non-standard tag.

Such “undefined” elements can be styled with CSS selector `:not(:defined)`.

When `customElement.define` is called, they are “upgraded”: a new instance of `TimeFormatted` is created for each, and `connectedCallback` is called. They become `:defined`.

To get the information about custom elements, there are methods:

- `customElements.get(name)` – returns the class for a custom element with the given `name`,
- `customElements.whenDefined(name)` – returns a promise that resolves (without value) when a custom element with the given `name` becomes defined.

<span class="important__type">Rendering in `connectedCallback`, not in `constructor`</span>

In the example above, element content is rendered (created) in `connectedCallback`.

Why not in the `constructor`?

The reason is simple: when `constructor` is called, it’s yet too early. The element is created, but the browser did not yet process/assign attributes at this stage: calls to `getAttribute` would return `null`. So we can’t really render there.

Besides, if you think about it, that’s better performance-wise – to delay the work until it’s really needed.

The `connectedCallback` triggers when the element is added to the document. Not just appended to another element as a child, but actually becomes a part of the page. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.

## <a href="custom-elements.html#observing-attributes" id="observing-attributes" class="main__anchor">Observing attributes</a>

In the current implementation of `<time-formatted>`, after the element is rendered, further attribute changes don’t have any effect. That’s strange for an HTML element. Usually, when we change an attribute, like `a.href`, we expect the change to be immediately visible. So let’s fix this.

We can observe attributes by providing their list in `observedAttributes()` static getter. For such attributes, `attributeChangedCallback` is called when they are modified. It doesn’t trigger for other, unlisted attributes (that’s for performance reasons).

Here’s a new `<time-formatted>`, that auto-updates when attributes change:

<a href="custom-elements.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="custom-elements.html#"

    <script>
    class TimeFormatted extends HTMLElement {

      render() { // (1)
        let date = new Date(this.getAttribute('datetime') || Date.now());

        this.innerHTML = new Intl.DateTimeFormat("default", {
          year: this.getAttribute('year') || undefined,
          month: this.getAttribute('month') || undefined,
          day: this.getAttribute('day') || undefined,
          hour: this.getAttribute('hour') || undefined,
          minute: this.getAttribute('minute') || undefined,
          second: this.getAttribute('second') || undefined,
          timeZoneName: this.getAttribute('time-zone-name') || undefined,
        }).format(date);
      }

      connectedCallback() { // (2)
        if (!this.rendered) {
          this.render();
          this.rendered = true;
        }
      }

      static get observedAttributes() { // (3)
        return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
      }

      attributeChangedCallback(name, oldValue, newValue) { // (4)
        this.render();
      }

    }

    customElements.define("time-formatted", TimeFormatted);
    </script>

    <time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

    <script>
    setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
    </script>

1.  The rendering logic is moved to `render()` helper method.
2.  We call it once when the element is inserted into page.
3.  For a change of an attribute, listed in `observedAttributes()`, `attributeChangedCallback` triggers.
4.  …and re-renders the element.
5.  At the end, we can easily make a live timer.

## <a href="custom-elements.html#rendering-order" id="rendering-order" class="main__anchor">Rendering order</a>

When HTML parser builds the DOM, elements are processed one after another, parents before children. E.g. if we have `<outer><inner></inner></outer>`, then `<outer>` element is created and connected to DOM first, and then `<inner>`.

That leads to important consequences for custom elements.

For example, if a custom element tries to access `innerHTML` in `connectedCallback`, it gets nothing:

<a href="custom-elements.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="custom-elements.html#"

    <script>
    customElements.define('user-info', class extends HTMLElement {

      connectedCallback() {
        alert(this.innerHTML); // empty (*)
      }

    });
    </script>

    <user-info>John</user-info>

If you run it, the `alert` is empty.

That’s exactly because there are no children on that stage, the DOM is unfinished. HTML parser connected the custom element `<user-info>`, and is going to proceed to its children, but just didn’t yet.

If we’d like to pass information to custom element, we can use attributes. They are available immediately.

Or, if we really need the children, we can defer access to them with zero-delay `setTimeout`.

This works:

<a href="custom-elements.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="custom-elements.html#"

    <script>
    customElements.define('user-info', class extends HTMLElement {

      connectedCallback() {
        setTimeout(() => alert(this.innerHTML)); // John (*)
      }

    });
    </script>

    <user-info>John</user-info>

Now the `alert` in line `(*)` shows “John”, as we run it asynchronously, after the HTML parsing is complete. We can process children if needed and finish the initialization.

On the other hand, this solution is also not perfect. If nested custom elements also use `setTimeout` to initialize themselves, then they queue up: the outer `setTimeout` triggers first, and then the inner one.

So the outer element finishes the initialization before the inner one.

Let’s demonstrate that on example:

<a href="custom-elements.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="custom-elements.html#"

    <script>
    customElements.define('user-info', class extends HTMLElement {
      connectedCallback() {
        alert(`${this.id} connected.`);
        setTimeout(() => alert(`${this.id} initialized.`));
      }
    });
    </script>

    <user-info id="outer">
      <user-info id="inner"></user-info>
    </user-info>

Output order:

1.  outer connected.
2.  inner connected.
3.  outer initialized.
4.  inner initialized.

We can clearly see that the outer element finishes initialization `(3)` before the inner one `(4)`.

There’s no built-in callback that triggers after nested elements are ready. If needed, we can implement such thing on our own. For instance, inner elements can dispatch events like `initialized`, and outer ones can listen and react on them.

## <a href="custom-elements.html#customized-built-in-elements" id="customized-built-in-elements" class="main__anchor">Customized built-in elements</a>

New elements that we create, such as `<time-formatted>`, don’t have any associated semantics. They are unknown to search engines, and accessibility devices can’t handle them.

But such things can be important. E.g, a search engine would be interested to know that we actually show a time. And if we’re making a special kind of button, why not reuse the existing `<button>` functionality?

We can extend and customize built-in HTML elements by inheriting from their classes.

For example, buttons are instances of `HTMLButtonElement`, let’s build upon it.

1.  Extend `HTMLButtonElement` with our class:

        class HelloButton extends HTMLButtonElement { /* custom element methods */ }

2.  Provide the third argument to `customElements.define`, that specifies the tag:

        customElements.define('hello-button', HelloButton, {extends: 'button'});

    There may be different tags that share the same DOM-class, that’s why specifying `extends` is needed.

3.  At the end, to use our custom element, insert a regular `<button>` tag, but add `is="hello-button"` to it:

        <button is="hello-button">...</button>

Here’s a full example:

<a href="custom-elements.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="custom-elements.html#"

    <script>
    // The button that says "hello" on click
    class HelloButton extends HTMLButtonElement {
      constructor() {
        super();
        this.addEventListener('click', () => alert("Hello!"));
      }
    }

    customElements.define('hello-button', HelloButton, {extends: 'button'});
    </script>

    <button is="hello-button">Click me</button>

    <button is="hello-button" disabled>Disabled</button>

Our new button extends the built-in one. So it keeps the same styles and standard features like `disabled` attribute.

## <a href="custom-elements.html#references" id="references" class="main__anchor">References</a>

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Compatiblity: <https://caniuse.com/#feat=custom-elementsv1>.

## <a href="custom-elements.html#summary" id="summary" class="main__anchor">Summary</a>

Custom elements can be of two types:

1.  “Autonomous” – new tags, extending `HTMLElement`.

    Definition scheme:

        class MyElement extends HTMLElement {
          constructor() { super(); /* ... */ }
          connectedCallback() { /* ... */ }
          disconnectedCallback() { /* ... */  }
          static get observedAttributes() { return [/* ... */]; }
          attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
          adoptedCallback() { /* ... */ }
         }
        customElements.define('my-element', MyElement);
        /* <my-element> */

2.  “Customized built-in elements” – extensions of existing elements.

    Requires one more `.define` argument, and `is="..."` in HTML:

        class MyButton extends HTMLButtonElement { /*...*/ }
        customElements.define('my-button', MyElement, {extends: 'button'});
        /* <button is="my-button"> */

Custom elements are well-supported among browsers. There’s a polyfill <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.

## <a href="custom-elements.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="custom-elements.html#live-timer-element" id="live-timer-element" class="main__anchor">Live timer element</a>

<a href="task/live-timer.html" class="task__open-link"></a>

We already have `<time-formatted>` element to show a nicely formatted time.

Create `<live-timer>` element to show the current time:

1.  It should use `<time-formatted>` internally, not duplicate its functionality.
2.  Ticks (updates) every second.
3.  For every tick, a custom event named `tick` should be generated, with the current date in `event.detail` (see chapter [Dispatching custom events](dispatch-events.html)).

Usage:

    <live-timer id="elem"></live-timer>

    <script>
      elem.addEventListener('tick', event => console.log(event.detail));
    </script>

Demo:

[Open a sandbox for the task.](https://plnkr.co/edit/XOf4WbLRLApuuYmr?p=preview)

solution

Please note:

1.  We clear `setInterval` timer when the element is removed from the document. That’s important, otherwise it continues ticking even if not needed any more. And the browser can’t clear the memory from this element and referenced by it.
2.  We can access current date as `elem.date` property. All class methods and properties are naturally element methods and properties.

[Open the solution in a sandbox.](https://plnkr.co/edit/5A1yvhPjyH9RbdoX?p=preview)

<a href="webcomponents-intro.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="shadow-dom.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fcustom-elements" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcustom-elements" </a>

<a href="tutorial/map.html" class="map">

## <a href="custom-elements.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="web-components.html" class="sidebar__link">Web components</a>

#### Lesson navigation

- <a href="custom-elements.html#example-time-formatted" class="sidebar__link">Example: “time-formatted”</a>
- <a href="custom-elements.html#observing-attributes" class="sidebar__link">Observing attributes</a>
- <a href="custom-elements.html#rendering-order" class="sidebar__link">Rendering order</a>
- <a href="custom-elements.html#customized-built-in-elements" class="sidebar__link">Customized built-in elements</a>
- <a href="custom-elements.html#references" class="sidebar__link">References</a>
- <a href="custom-elements.html#summary" class="sidebar__link">Summary</a>

- <a href="custom-elements.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="custom-elements.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fcustom-elements" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcustom-elements" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/8-web-components/2-custom-elements" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
