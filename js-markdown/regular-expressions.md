EN

- <a href="https://ar.javascript.info/"
- <a href="regular-expressions.html"
- <a href="https://es.javascript.info/regular-expressions"

- <a href="https://it.javascript.info/"
  regular-expressions"

<!-- -->

- <a href="https://ko.javascript.info/regular-expressions"
- <a href=regular-expressions"
- <a href="https://tr.javascript.info/regular-expressions"
- <a href="https://zh.javascript.info/regular-expressions"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregular-expressions" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

# Regular expressions

Regular expressions is a powerful way of doing search and replace in strings.

1.  <a href="regexp-introduction.html" class="lessons-list__link">Patterns and flags</a>
2.  <a href="regexp-character-classes.html" class="lessons-list__link">Character classes</a>
3.  <a href="regexp-unicode.html" class="lessons-list__link">Unicode: flag "u" and class \p{...}</a>
4.  <a href="regexp-anchors.html" class="lessons-list__link">Anchors: string start ^ and end $</a>
5.  <a href="regexp-multiline-mode.html" class="lessons-list__link">Multiline mode of anchors ^ $, flag "m"</a>
6.  <a href="regexp-boundary.html" class="lessons-list__link">Word boundary: \b</a>
7.  <a href="regexp-escaping.html" class="lessons-list__link">Escaping, special characters</a>
8.  <a href="regexp-character-sets-and-ranges.html" class="lessons-list__link">Sets and ranges [...]</a>
9.  <a href="regexp-quantifiers.html" class="lessons-list__link">Quantifiers +, \*, ? and {n}</a>
10. <a href="regexp-greedy-and-lazy.html" class="lessons-list__link">Greedy and lazy quantifiers</a>
11. <a href="regexp-groups.html" class="lessons-list__link">Capturing groups</a>
12. <a href="regexp-backreferences.html" class="lessons-list__link">Backreferences in pattern: \N and \k&lt;name&gt;</a>
13. <a href="regexp-alternation.html" class="lessons-list__link">Alternation (OR) |</a>
14. <a href="regexp-lookahead-lookbehind.html" class="lessons-list__link">Lookahead and lookbehind</a>
15. <a href="regexp-catastrophic-backtracking.html" class="lessons-list__link">Catastrophic backtracking</a>
16. <a href="regexp-sticky.html" class="lessons-list__link">Sticky flag "y", searching at position</a>
17. <a href="regexp-methods.html" class="lessons-list__link">Methods of RegExp and String</a>

<a href="shadow-dom-events.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-introduction.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregular-expressions" </a>

<a href="tutorial/map.html" class="map">

<a href="tutorial/map.html" class="map"></a>

#### Sibling chapters

- <a href="js.html" class="sidebar__link">The JavaScript language</a>
- <a href="ui.html" class="sidebar__link">Browser: Document, Events, Interfaces</a>
- <a href="frames-and-windows.html" class="sidebar__link">Frames and windows</a>
- <a href="binary.html" class="sidebar__link">Binary data, files</a>
- <a href="network.html" class="sidebar__link">Network requests</a>
- <a href="data-storage.html" class="sidebar__link">Storing data in the browser</a>
- <a href="animation.html" class="sidebar__link">Animation</a>
- <a href="web-components.html" class="sidebar__link">Web components</a>
- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
