EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
-   <a href="shadow-dom-events.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
-   <a href="https://es.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
-   <a href="https://fr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span>Français</span></a>
-   <a href="https://it.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
-   <a href="https://ja.javascript.info/shadow-dom-events" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
-   <a href="shadow-dom-events%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
-   <a href="https://zh.javascript.info/shadow-dom-events" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

Search

Search

<span class="share-icons__title">Share</span>2Fshadow-dom-events" rel="nofollow" &gt;2Fshadow-dom-events" rel="nofollow" &gt;

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="web-components.html" class="breadcrumbs__link"><span>Web components</span></a></span>

15th July 2019

Shadow DOM and events
=====================

The idea behind shadow tree is to encapsulate internal implementation details of a component.

Let’s say, a click event happens inside a shadow DOM of `<user-card>` component. But scripts in the main document have no idea about the shadow DOM internals, especially if the component comes from a 3rd-party library.

So, to keep the details encapsulated, the browser *retargets* the event.

**Events that happen in shadow DOM have the host element as the target, when caught outside of the component.**

Here’s a simple example:

<a href="shadow-dom-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="shadow-dom-events.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <user-card></user-card>

    <script>
    customElements.define('user-card', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<p>
          <button>Click me</button>
        </p>`;
        this.shadowRoot.firstElementChild.onclick =
          e => alert("Inner target: " + e.target.tagName);
      }
    });

    document.onclick =
      e => alert("Outer target: " + e.target.tagName);
    </script>

If you click on the button, the messages are:

1.  Inner target: `BUTTON` – internal event handler gets the correct target, the element inside shadow DOM.
2.  Outer target: `USER-CARD` – document event handler gets shadow host as the target.

Event retargeting is a great thing to have, because the outer document doesn’t have to know about component internals. From its point of view, the event happened on `<user-card>`.

**Retargeting does not occur if the event occurs on a slotted element, that physically lives in the light DOM.**

For example, if a user clicks on `<span slot="username">` in the example below, the event target is exactly this `span` element, for both shadow and light handlers:

<a href="shadow-dom-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="shadow-dom-events.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <user-card id="userCard">
      <span slot="username">John Smith</span>
    </user-card>

    <script>
    customElements.define('user-card', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<div>
          <b>Name:</b> <slot name="username"></slot>
        </div>`;

        this.shadowRoot.firstElementChild.onclick =
          e => alert("Inner target: " + e.target.tagName);
      }
    });

    userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
    </script>

If a click happens on `"John Smith"`, for both inner and outer handlers the target is `<span slot="username">`. That’s an element from the light DOM, so no retargeting.

On the other hand, if the click occurs on an element originating from shadow DOM, e.g. on `<b>Name</b>`, then, as it bubbles out of the shadow DOM, its `event.target` is reset to `<user-card>`.

<a href="shadow-dom-events.html#bubbling-event-composedpath" id="bubbling-event-composedpath" class="main__anchor">Bubbling, event.composedPath()</a>
-----------------------------------------------------------------------------------------------------------------------------------------------------

For purposes of event bubbling, flattened DOM is used.

So, if we have a slotted element, and an event occurs somewhere inside it, then it bubbles up to the `<slot>` and upwards.

The full path to the original event target, with all the shadow elements, can be obtained using `event.composedPath()`. As we can see from the name of the method, that path is taken after the composition.

In the example above, the flattened DOM is:

    <user-card id="userCard">
      #shadow-root
        <div>
          <b>Name:</b>
          <slot name="username">
            <span slot="username">John Smith</span>
          </slot>
        </div>
    </user-card>

So, for a click on `<span slot="username">`, a call to `event.composedPath()` returns an array: \[`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`\]. That’s exactly the parent chain from the target element in the flattened DOM, after the composition.

<span class="important__type">Shadow tree details are only provided for `{mode:'open'}` trees</span>

If the shadow tree was created with `{mode: 'closed'}`, then the composed path starts from the host: `user-card` and upwards.

That’s the similar principle as for other methods that work with shadow DOM. Internals of closed trees are completely hidden.

<a href="shadow-dom-events.html#event-composed" id="event-composed" class="main__anchor">event.composed</a>
-----------------------------------------------------------------------------------------------------------

Most events successfully bubble through a shadow DOM boundary. There are few events that do not.

This is governed by the `composed` event object property. If it’s `true`, then the event does cross the boundary. Otherwise, it only can be caught from inside the shadow DOM.

If you take a look at [UI Events specification](https://www.w3.org/TR/uievents), most events have `composed: true`:

-   `blur`, `focus`, `focusin`, `focusout`,
-   `click`, `dblclick`,
-   `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
-   `wheel`,
-   `beforeinput`, `input`, `keydown`, `keyup`.

All touch events and pointer events also have `composed: true`.

There are some events that have `composed: false` though:

-   `mouseenter`, `mouseleave` (they do not bubble at all),
-   `load`, `unload`, `abort`, `error`,
-   `select`,
-   `slotchange`.

These events can be caught only on elements within the same DOM, where the event target resides.

<a href="shadow-dom-events.html#custom-events" id="custom-events" class="main__anchor">Custom events</a>
--------------------------------------------------------------------------------------------------------

When we dispatch custom events, we need to set both `bubbles` and `composed` properties to `true` for it to bubble up and out of the component.

For example, here we create `div#inner` in the shadow DOM of `div#outer` and trigger two events on it. Only the one with `composed: true` makes it outside to the document:

<a href="shadow-dom-events.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="shadow-dom-events.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="outer"></div>

    <script>
    outer.attachShadow({mode: 'open'});

    let inner = document.createElement('div');
    outer.shadowRoot.append(inner);

    /*
    div(id=outer)
      #shadow-dom
        div(id=inner)
    */

    document.addEventListener('test', event => alert(event.detail));

    inner.dispatchEvent(new CustomEvent('test', {
      bubbles: true,
      composed: true,
      detail: "composed"
    }));

    inner.dispatchEvent(new CustomEvent('test', {
      bubbles: true,
      composed: false,
      detail: "not composed"
    }));
    </script>

<a href="shadow-dom-events.html#summary" id="summary" class="main__anchor">Summary</a>
--------------------------------------------------------------------------------------

Events only cross shadow DOM boundaries if their `composed` flag is set to `true`.

Built-in events mostly have `composed: true`, as described in the relevant specifications:

-   UI Events <https://www.w3.org/TR/uievents>.
-   Touch Events <https://w3c.github.io/touch-events>.
-   Pointer Events <https://www.w3.org/TR/pointerevents>.
-   …And so on.

Some built-in events that have `composed: false`:

-   `mouseenter`, `mouseleave` (also do not bubble),
-   `load`, `unload`, `abort`, `error`,
-   `select`,
-   `slotchange`.

These events can be caught only on elements within the same DOM.

If we dispatch a `CustomEvent`, then we should explicitly set `composed: true`.

Please note that in case of nested components, one shadow DOM may be nested into another. In that case composed events bubble through all shadow DOM boundaries. So, if an event is intended only for the immediate enclosing component, we can also dispatch it on the shadow host and set `composed: false`. Then it’s out of the component shadow DOM, but won’t bubble up to higher-level DOM.

<a href="shadow-dom-style.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regular-expressions.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><span class="share share_tw"></span><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom-events" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="shadow-dom-events.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

-   <a href="web-components.html" class="sidebar__link">Web components</a>

#### Lesson navigation

-   shadow-dom-events.html\#bubbling-event-composedpath" &gt;Bubbling, event.composedPath()
-   shadow-dom-events.html\#event-composed" &gt;event.composed
-   shadow-dom-events.html\#custom-events" &gt;Custom events
-   shadow-dom-events.html

<!-- -->

-   shadow-dom-events.html\#comments" &gt;Comments

<span class="share share_tw sidebar__share"></span><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom-events" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/8-web-components/7-shadow-dom-events" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="about.html" class="page-footer__link">about the project</a>
-   <a href="about.html#contact-us" class="page-footer__link">contact us</a>
-   <a href="terms.html" class="page-footer__link">terms of usage</a>
-   <a href="privacy.html" class="page-footer__link">privacy policy</a>
