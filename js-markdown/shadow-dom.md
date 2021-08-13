EN

- <a href="https://ar.javascript.info/"
- <a href="shadow-dom.html"
- <a href="https://es.javascript.info/shadow-dom"

- shadow-dom"
  shadow-dom"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=shadow-dom"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/shadow-dom"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fshadow-dom" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="web-components.html" Web components</span></a></span>

6th December 2020

# Shadow DOM

Shadow DOM serves for encapsulation. It allows a component to have its very own “shadow” DOM tree, that can’t be accidentally accessed from the main document, may have local style rules, and more.

## <a href="shadow-dom.html#built-in-shadow-dom" id="built-in-shadow-dom" class="main__anchor">Built-in shadow DOM</a>

Did you ever think how complex browser controls are created and styled?

Such as `<input type="range">`:

The browser uses DOM/CSS internally to draw them. That DOM structure is normally hidden from us, but we can see it in developer tools. E.g. in Chrome, we need to enable in Dev Tools “Show user agent shadow DOM” option.

Then `<input type="range">` looks like this:

<figure><img src="article/shadow-dom/shadow-dom-range.png" class="image__image" width="471" height="145" /></figure>What you see under `#shadow-root` is called “shadow DOM”.

We can’t get built-in shadow DOM elements by regular JavaScript calls or selectors. These are not regular children, but a powerful encapsulation technique.

In the example above, we can see a useful attribute `pseudo`. It’s non-standard, exists for historical reasons. We can use it style subelements with CSS, like this:

<a href="shadow-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="shadow-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
    /* make the slider track red */
    input::-webkit-slider-runnable-track {
      background: red;
    }
    </style>

    <input type="range">

Once again, `pseudo` is a non-standard attribute. Chronologically, browsers first started to experiment with internal DOM structures to implement controls, and then, after time, shadow DOM was standardized to allow us, developers, to do the similar thing.

Further on, we’ll use the modern shadow DOM standard, covered by [DOM spec](https://dom.spec.whatwg.org/#shadow-trees) and other related specifications.

## <a href="shadow-dom.html#shadow-tree" id="shadow-tree" class="main__anchor">Shadow tree</a>

A DOM element can have two types of DOM subtrees:

1.  Light tree – a regular DOM subtree, made of HTML children. All subtrees that we’ve seen in previous chapters were “light”.
2.  Shadow tree – a hidden DOM subtree, not reflected in HTML, hidden from prying eyes.

If an element has both, then the browser renders only the shadow tree. But we can setup a kind of composition between shadow and light trees as well. We’ll see the details later in the chapter [Shadow DOM slots, composition](slots-composition.html).

Shadow tree can be used in Custom Elements to hide component internals and apply component-local styles.

For example, this `<show-hello>` element hides its internal DOM in shadow tree:

<a href="shadow-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="shadow-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <script>
    customElements.define('show-hello', class extends HTMLElement {
      connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `<p>
          Hello, ${this.getAttribute('name')}
        </p>`;
      }
    });
    </script>

    <show-hello name="John"></show-hello>

That’s how the resulting DOM looks in Chrome dev tools, all the content is under “\#shadow-root”:

<figure><img src="article/shadow-dom/shadow-dom-say-hello.png" class="image__image" width="255" height="71" /></figure>First, the call to `elem.attachShadow({mode: …})` creates a shadow tree.

There are two limitations:

1.  We can create only one shadow root per element.
2.  The `elem` must be either a custom element, or one of: “article”, “aside”, “blockquote”, “body”, “div”, “footer”, “h1…h6”, “header”, “main” “nav”, “p”, “section”, or “span”. Other elements, like `<img>`, can’t host shadow tree.

The `mode` option sets the encapsulation level. It must have any of two values:

- `"open"` – the shadow root is available as `elem.shadowRoot`.

  Any code is able to access the shadow tree of `elem`.

- `"closed"` – `elem.shadowRoot` is always `null`.

  We can only access the shadow DOM by the reference returned by `attachShadow` (and probably hidden inside a class). Browser-native shadow trees, such as `<input type="range">`, are closed. There’s no way to access them.

The [shadow root](https://dom.spec.whatwg.org/#shadowroot), returned by `attachShadow`, is like an element: we can use `innerHTML` or DOM methods, such as `append`, to populate it.

The element with a shadow root is called a “shadow tree host”, and is available as the shadow root `host` property:

    // assuming {mode: "open"}, otherwise elem.shadowRoot is null
    alert(elem.shadowRoot.host === elem); // true

## <a href="shadow-dom.html#encapsulation" id="encapsulation" class="main__anchor">Encapsulation</a>

Shadow DOM is strongly delimited from the main document:

1.  Shadow DOM elements are not visible to `querySelector` from the light DOM. In particular, Shadow DOM elements may have ids that conflict with those in the light DOM. They must be unique only within the shadow tree.
2.  Shadow DOM has own stylesheets. Style rules from the outer DOM don’t get applied.

For example:

<a href="shadow-dom.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="shadow-dom.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      /* document style won't apply to the shadow tree inside #elem (1) */
      p { color: red; }
    </style>

    <div id="elem"></div>

    <script>
      elem.attachShadow({mode: 'open'});
        // shadow tree has its own style (2)
      elem.shadowRoot.innerHTML = `
        <style> p { font-weight: bold; } </style>
        <p>Hello, John!</p>
      `;

      // <p> is only visible from queries inside the shadow tree (3)
      alert(document.querySelectorAll('p').length); // 0
      alert(elem.shadowRoot.querySelectorAll('p').length); // 1
    </script>

1.  The style from the document does not affect the shadow tree.
2.  …But the style from the inside works.
3.  To get elements in shadow tree, we must query from inside the tree.

## <a href="shadow-dom.html#references" id="references" class="main__anchor">References</a>

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Compatibility: <https://caniuse.com/#feat=shadowdomv1>
- Shadow DOM is mentioned in many other specifications, e.g. [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) specifies that shadow root has `innerHTML`.

## <a href="shadow-dom.html#summary" id="summary" class="main__anchor">Summary</a>

Shadow DOM is a way to create a component-local DOM.

1.  `shadowRoot = elem.attachShadow({mode: open|closed})` – creates shadow DOM for `elem`. If `mode="open"`, then it’s accessible as `elem.shadowRoot` property.
2.  We can populate `shadowRoot` using `innerHTML` or other DOM methods.

Shadow DOM elements:

- Have their own ids space,
- Invisible to JavaScript selectors from the main document, such as `querySelector`,
- Use styles only from the shadow tree, not from the main document.

Shadow DOM, if exists, is rendered by the browser instead of so-called “light DOM” (regular children). In the chapter [Shadow DOM slots, composition](slots-composition.html) we’ll see how to compose them.

<a href="custom-elements.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="template-element.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fshadow-dom" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom" </a>

<a href="tutorial/map.html" class="map">

## <a href="shadow-dom.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="web-components.html" class="sidebar__link">Web components</a>

#### Lesson navigation

- <a href="shadow-dom.html#built-in-shadow-dom" class="sidebar__link">Built-in shadow DOM</a>
- <a href="shadow-dom.html#shadow-tree" class="sidebar__link">Shadow tree</a>
- <a href="shadow-dom.html#encapsulation" class="sidebar__link">Encapsulation</a>
- <a href="shadow-dom.html#references" class="sidebar__link">References</a>
- <a href="shadow-dom.html#summary" class="sidebar__link">Summary</a>

- <a href="shadow-dom.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fshadow-dom" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/8-web-components/3-shadow-dom" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
