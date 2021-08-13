EN

- <a href="https://ar.javascript.info/"
- <a href="webcomponents-intro.html"
- <a href="https://es.javascript.info/webcomponents-intro"
- <a href="https://fr.javascript.info/webcomponents-intro"
- webcomponents-intro"
  webcomponents-intro"

<!-- -->

- /webcomponents-intro"
- <a href=webcomponents-intro"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/webcomponents-intro"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fwebcomponents-intro" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fwebcomponents-intro" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="web-components.html" Web components</span></a></span>

23rd June 2021

# From the orbital height

This section describes a set of modern standards for “web components”.

As of now, these standards are under development. Some features are well-supported and integrated into the modern HTML/DOM standard, while others are yet in draft stage. You can try examples in any browser, Google Chrome is probably the most up to date with these features. Guess, that’s because Google fellows are behind many of the related specifications.

## <a href="webcomponents-intro.html#what-s-common-between" id="what-s-common-between" class="main__anchor">What’s common between…</a>

The whole component idea is nothing new. It’s used in many frameworks and elsewhere.

Before we move to implementation details, take a look at this great achievement of humanity:

<figure><img src="article/webcomponents-intro/satellite.jpg" class="image__image" width="680" height="544" /></figure>That’s the International Space Station (ISS).

And this is how it’s made inside (approximately):

<figure><img src="article/webcomponents-intro/satellite-expanded.jpg" class="image__image" width="680" height="469" /></figure>The International Space Station:

- Consists of many components.
- Each component, in its turn, has many smaller details inside.
- The components are very complex, much more complicated than most websites.
- Components are developed internationally, by teams from different countries, speaking different languages.

…And this thing flies, keeps humans alive in space!

How are such complex devices created?

Which principles could we borrow to make our development same-level reliable and scalable? Or, at least, close to it?

## <a href="webcomponents-intro.html#component-architecture" id="component-architecture" class="main__anchor">Component architecture</a>

The well known rule for developing complex software is: don’t make complex software.

If something becomes complex – split it into simpler parts and connect in the most obvious way.

**A good architect is the one who can make the complex simple.**

We can split user interface into visual components: each of them has own place on the page, can “do” a well-described task, and is separate from the others.

Let’s take a look at a website, for example Twitter.

It naturally splits into components:

<figure><img src="article/webcomponents-intro/web-components-twitter.svg" width="716" height="399" /></figure>1.  Top navigation.
2.  User info.
3.  Follow suggestions.
4.  Submit form.
5.  (and also 6, 7) – messages.

Components may have subcomponents, e.g. messages may be parts of a higher-level “message list” component. A clickable user picture itself may be a component, and so on.

How do we decide, what is a component? That comes from intuition, experience and common sense. Usually it’s a separate visual entity that we can describe in terms of what it does and how it interacts with the page. In the case above, the page has blocks, each of them plays its own role, it’s logical to make these components.

A component has:

- Its own JavaScript class.
- DOM structure, managed solely by its class, outside code doesn’t access it (“encapsulation” principle).
- CSS styles, applied to the component.
- API: events, class methods etc, to interact with other components.

Once again, the whole “component” thing is nothing special.

There exist many frameworks and development methodologies to build them, each with its own bells and whistles. Usually, special CSS classes and conventions are used to provide “component feel” – CSS scoping and DOM encapsulation.

“Web components” provide built-in browser capabilities for that, so we don’t have to emulate them any more.

- [Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) – to define custom HTML elements.
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees) – to create an internal DOM for the component, hidden from the others.
- [CSS Scoping](https://drafts.csswg.org/css-scoping/) – to declare styles that only apply inside the Shadow DOM of the component.
- [Event retargeting](https://dom.spec.whatwg.org/#retarget) and other minor stuff to make custom components better fit the development.

In the next chapter we’ll go into details of “Custom Elements” – the fundamental and well-supported feature of web components, good on its own.

<a href="web-components.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="custom-elements.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fwebcomponents-intro" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fwebcomponents-intro" </a>

<a href="tutorial/map.html" class="map">

## <a href="webcomponents-intro.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="web-components.html" class="sidebar__link">Web components</a>

#### Lesson navigation

- <a href="webcomponents-intro.html#what-s-common-between" class="sidebar__link">What’s common between…</a>
- <a href="webcomponents-intro.html#component-architecture" class="sidebar__link">Component architecture</a>

- <a href="webcomponents-intro.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fwebcomponents-intro" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fwebcomponents-intro" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/8-web-components/1-webcomponents-intro" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
