EN

-   <a href="https://ar.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
-   <a href="hello-world.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
-   <a href="https://es.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
-   <a href="https://fr.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span>Français</span></a>
-   <a href="https://it.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
-   <a href="https://ja.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

-   <a href="https://ko.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
-   <a href="hello-world%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
-   <a href="https://tr.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
-   <a href="https://zh.javascript.info/hello-world" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

Search

<span class="share-icons__title">Share</span>2Fhello-world" rel="nofollow" &gt;2Fhello-world عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" class="breadcrumbs__link"><span>JavaScript Fundamentals</span></a></span>

22nd November 2020

Hello, world!
=============

This part of the tutorial is about core JavaScript, the language itself.

But we need a working environment to run our scripts and, since this book is online, the browser is a good choice. We’ll keep the amount of browser-specific commands (like `alert`) to a minimum so that you don’t spend time on them if you plan to concentrate on another environment (like Node.js). We’ll focus on JavaScript in the browser in the [next part](ui.html) of the tutorial.

So first, let’s see how we attach a script to a webpage. For server-side environments (like Node.js), you can execute the script with a command like `"node my.js"`.

<a href="hello-world.html#the-script-tag" id="the-script-tag" class="main__anchor">The “script” tag</a>
-------------------------------------------------------------------------------------------------------

JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag.

For instance:

<a href="hello-world.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="hello-world.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!DOCTYPE HTML>
    <html>

    <body>

      <p>Before the script...</p>

      <script>
        alert( 'Hello, world!' );
      </script>

      <p>...After the script.</p>

    </body>

    </html>

You can run the example by clicking the “Play” button in the right-top corner of the box above.

The `<script>` tag contains JavaScript code which is automatically executed when the browser processes the tag.

<a href="hello-world.html#modern-markup" id="modern-markup" class="main__anchor">Modern markup</a>
--------------------------------------------------------------------------------------------------

The `<script>` tag has a few attributes that are rarely used nowadays but can still be found in old code:

 The `type` attribute: `<script type=…>`   
The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It’s not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that’s an advanced topic, we’ll talk about modules in another part of the tutorial.

 The `language` attribute: `<script language=…>`   
This attribute was meant to show the language of the script. This attribute no longer makes sense because JavaScript is the default language. There is no need to use it.

Comments before and after scripts.  
In really ancient books and guides, you may find comments inside `<script>` tags, like this:

    <script type="text/javascript"><!--
        ...
    //--></script>

This trick isn’t used in modern JavaScript. These comments hide JavaScript code from old browsers that didn’t know how to process the `<script>` tag. Since browsers released in the last 15 years don’t have this issue, this kind of comment can help you identify really old code.

<a href="hello-world.html#external-scripts" id="external-scripts" class="main__anchor">External scripts</a>
-----------------------------------------------------------------------------------------------------------

If we have a lot of JavaScript code, we can put it into a separate file.

Script files are attached to HTML with the `src` attribute:

    <script src="/path/to/script.js"></script>

Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.

We can give a full URL as well. For instance:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>

To attach several scripts, use multiple tags:

    <script src="/js/script1.js"></script>
    <script src="/js/script2.js"></script>
    …

<span class="important__type">Please note:</span>

As a rule, only the simplest scripts are put into HTML. More complex ones reside in separate files.

The benefit of a separate file is that the browser will download it and store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once.

That reduces traffic and makes pages faster.

<span class="important__type">If `src` is set, the script content is ignored.</span>

A single `<script>` tag can’t have both the `src` attribute and code inside.

This won’t work:

    <script src="file.js">
      alert(1); // the content is ignored, because src is set
    </script>

We must choose either an external `<script src="…">` or a regular `<script>` with code.

The example above can be split into two scripts to work:

    <script src="file.js"></script>
    <script>
      alert(1);
    </script>

<a href="hello-world.html#summary" id="summary" class="main__anchor">Summary</a>
--------------------------------------------------------------------------------

-   We can use a `<script>` tag to add JavaScript code to a page.
-   The `type` and `language` attributes are not required.
-   A script in an external file can be inserted with `<script                         src="path/to/script.js"></script>`.

There is much more to learn about browser scripts and their interaction with the webpage. But let’s keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn’t distract ourselves with browser-specific implementations of it. We’ll be using the browser as a way to run JavaScript, which is very convenient for online reading, but only one of many.

<a href="hello-world.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>
--------------------------------------------------------------------------------------------------------------------

### <a href="hello-world.html#show-an-alert" id="show-an-alert" class="main__anchor">Show an alert</a>

<a href="task/hello-alert.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a page that shows a message “I’m JavaScript!”.

Do it in a sandbox, or on your hard drive, doesn’t matter, just ensure that it works.

[Demo in new window](https://en.js.cx/task/hello-alert/solution/)

solution

    <!DOCTYPE html>
    <html>

    <body>

      <script>
        alert( "I'm JavaScript!" );
      </script>

    </body>

    </html>

[Open the solution in a sandbox.](https://plnkr.co/edit/Vl2JuntzExJ6FvtU?p=preview)

### <a href="hello-world.html#show-an-alert-with-an-external-script" id="show-an-alert-with-an-external-script" class="main__anchor">Show an alert with an external script</a>

<a href="task/hello-alert-ext.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Take the solution of the previous task [Show an alert](task/hello-alert.html). Modify it by extracting the script content into an external file `alert.js`, residing in the same folder.

Open the page, ensure that the alert works.

solution

The HTML code:

    <!DOCTYPE html>
    <html>

    <body>

      <script src="alert.js"></script>

    </body>

    </html>

For the file `alert.js` in the same folder:

    alert("I'm JavaScript!");

<a href="first-steps.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="structure.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fhello-world" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fhello-world" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="hello-world.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

-   <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

hello-world.html\#the-script-tag" &gt;The “script” tag

hello-world.html\#modern-markup" &gt;Modern markup

hello-world.html\#external-scripts" &gt;External scripts

<a href="hello-world.html%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/ul%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/nav%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cnav%20class=" class="sidebar__link"></a>

-   <a href="hello-world.html#tasks" class="sidebar__link">Tasks (2)</a>
-   <a href="hello-world.html#comments" class="sidebar__link">Comments</a>

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fhello-world" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fhello-world" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/01-hello-world" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="about.html" class="page-footer__link">about the project</a>
-   <a href="about.html#contact-us" class="page-footer__link">contact us</a>
-   <a href="terms.html" class="page-footer__link">terms of usage</a>
-   <a href="privacy.html" class="page-footer__link">privacy policy</a>
