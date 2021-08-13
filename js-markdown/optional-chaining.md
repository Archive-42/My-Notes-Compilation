EN

- <a href="https://ar.javascript.info/optional-chaining"
- <a href="optional-chaining.html"
- <a href="https://es.javascript.info/optional-chaining"
- <a href="https://fr.javascript.info/optional-chaining"
- optional-chaining"
  optional-chaining"

<!-- -->

- /optional-chaining"
- <a href=optional-chaining"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/optional-chaining"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Foptional-chaining" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Foptional-chaining" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-basics.html" Objects: the basics</span></a></span>

2nd February 2021

# Optional chaining '?.'

<span class="important__type">A recent addition</span>

This is a recent addition to the language. Old browsers may need polyfills.

The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn’t exist.

## <a href="optional-chaining.html#the-non-existing-property-problem" id="the-non-existing-property-problem" class="main__anchor">The “non-existing property” problem</a>

If you’ve just started to read the tutorial and learn JavaScript, maybe the problem hasn’t touched you yet, but it’s quite common.

As an example, let’s say we have `user` objects that hold the information about our users.

Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them.

In such case, when we attempt to get `user.address.street`, and the user happens to be without an address, we get an error:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let user = {}; // a user without "address" property

    alert(user.address.street); // Error!

That’s the expected result. JavaScript works like this. As `user.address` is `undefined`, an attempt to get `user.address.street` fails with an error.

In many practical cases we’d prefer to get `undefined` instead of an error here (meaning “no street”).

…And another example. In the web development, we can get an object that corresponds to a web page element using a special method call, such as `document.querySelector('.elem')`, and it returns `null` when there’s no such element.

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    // document.querySelector('.elem') is null if there's no element
    let html = document.querySelector('.elem').innerHTML; // error if it's null

Once again, if the element doesn’t exist, we’ll get an error accessing `.innerHTML` of `null`. And in some cases, when the absence of the element is normal, we’d like to avoid the error and just accept `html = null` as the result.

How can we do this?

The obvious solution would be to check the value using `if` or the conditional operator `?`, before accessing its property, like this:

    let user = {};

    alert(user.address ? user.address.street : undefined);

It works, there’s no error… But it’s quite inelegant. As you can see, the `"user.address"` appears twice in the code. For more deeply nested properties, that becomes a problem as more repetitions are required.

E.g. let’s try getting `user.address.street.name`.

We need to check both `user.address` and `user.address.street`:

    let user = {}; // user has no address

    alert(user.address ? user.address.street ? user.address.street.name : null : null);

That’s just awful, one may even have problems understanding such code.

Don’t even care to, as there’s a better way to write it, using the `&&` operator:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let user = {}; // user has no address

    alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)

AND’ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn’t ideal.

As you can see, property names are still duplicated in the code. E.g. in the code above, `user.address` appears three times.

That’s why the optional chaining `?.` was added to the language. To solve this problem once and for all!

## <a href="optional-chaining.html#optional-chaining" id="optional-chaining" class="main__anchor">Optional chaining</a>

The optional chaining `?.` stops the evaluation if the value before `?.` is `undefined` or `null` and returns `undefined`.

**Further in this article, for brevity, we’ll be saying that something “exists” if it’s not `null` and not `undefined`.**

In other words, `value?.prop`:

- works as `value.prop`, if `value` exists,
- otherwise (when `value` is `undefined/null`) it returns `undefined`.

Here’s the safe way to access `user.address.street` using `?.`:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let user = {}; // user has no address

    alert( user?.address?.street ); // undefined (no error)

The code is short and clean, there’s no duplication at all.

Reading the address with `user?.address` works even if `user` object doesn’t exist:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let user = null;

    alert( user?.address ); // undefined
    alert( user?.address.street ); // undefined

Please note: the `?.` syntax makes optional the value before it, but not any further.

E.g. in `user?.address.street.name` the `?.` allows `user` to safely be `null/undefined` (and returns `undefined` in that case), but that’s only for `user`. Further properties are accessed in a regular way. If we want some of them to be optional, then we’ll need to replace more `.` with `?.`.

<span class="important__type">Don’t overuse the optional chaining</span>

We should use `?.` only where it’s ok that something doesn’t exist.

For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

So, if `user` happens to be undefined due to a mistake, we’ll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.

<span class="important__type">The variable before `?.` must be declared</span>

If there’s no variable `user` at all, then `user?.anything` triggers an error:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    // ReferenceError: user is not defined
    user?.address;

The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.

## <a href="optional-chaining.html#short-circuiting" id="short-circuiting" class="main__anchor">Short-circuiting</a>

As it was said before, the `?.` immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.

So, if there are any further function calls or side effects, they don’t occur.

For instance:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let user = null;
    let x = 0;

    user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

    alert(x); // 0, value not incremented

## <a href="optional-chaining.html#other-variants" id="other-variants" class="main__anchor">Other variants: ?.(), ?.[]</a>

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don’t:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let userAdmin = {
      admin() {
        alert("I am admin");
      }
    };

    let userGuest = {};

    userAdmin.admin?.(); // I am admin

    userGuest.admin?.(); // nothing (no such method)

Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the user object exists, so it’s safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that’s so for `userAdmin`). Otherwise (for `userGuest`) the evaluation stops without errors.

The `?.[]` syntax also works, if we’d like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let key = "firstName";

    let user1 = {
      firstName: "John"
    };

    let user2 = null;

    alert( user1?.[key] ); // John
    alert( user2?.[key] ); // undefined

Also we can use `?.` with `delete`:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    delete user?.name; // delete user.name if user exists

<span class="important__type">We can use `?.` for safe reading and deleting, but not writing</span>

The optional chaining `?.` has no use at the left side of an assignment.

For example:

<a href="optional-chaining.html#"
<a href="optional-chaining.html#"

    let user = null;

    user?.name = "John"; // Error, doesn't work
    // because it evaluates to undefined = "John"

It’s just not that smart.

## <a href="optional-chaining.html#summary" id="summary" class="main__anchor">Summary</a>

The optional chaining `?.` syntax has three forms:

1.  `obj?.prop` – returns `obj.prop` if `obj` exists, otherwise `undefined`.
2.  `obj?.[prop]` – returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3.  `obj.method?.()` – calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.

As we can see, all of them are straightforward and simple to use. The `?.` checks the left part for `null/undefined` and allows the evaluation to proceed if it’s not so.

A chain of `?.` allows to safely access nested properties.

Still, we should apply `?.` carefully, only where it’s acceptable that the left part doesn’t exist. So that it won’t hide programming errors from us, if they occur.

<a href="constructor-new.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="symbol.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Foptional-chaining" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Foptional-chaining" </a>

<a href="tutorial/map.html" class="map">

## <a href="optional-chaining.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="object-basics.html" class="sidebar__link">Objects: the basics</a>

#### Lesson navigation

- <a href="optional-chaining.html#the-non-existing-property-problem" class="sidebar__link">The “non-existing property” problem</a>
- <a href="optional-chaining.html#optional-chaining" class="sidebar__link">Optional chaining</a>
- <a href="optional-chaining.html#short-circuiting" class="sidebar__link">Short-circuiting</a>
- <a href="optional-chaining.html#other-variants" class="sidebar__link">Other variants: ?.(), ?.[]</a>
- <a href="optional-chaining.html#summary" class="sidebar__link">Summary</a>

- <a href="optional-chaining.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Foptional-chaining" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Foptional-chaining" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/04-object-basics/07-optional-chaining" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
