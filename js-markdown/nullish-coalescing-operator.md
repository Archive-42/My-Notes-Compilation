EN

- <a href="https://ar.javascript.info/"
- <a href="nullish-coalescing-operator.html"
- <a href="https://es.javascript.info/nullish-coalescing-operator"
- <a href="https://fr.javascript.info/nullish-coalescing-operator"
- nullish-coalescing-operator"
  nullish-coalescing-operator"

<!-- -->

- <a href="https://ko.javascript.info/nullish-coalescing-operator"
- <a href=nullish-coalescing-operator"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/nullish-coalescing-operator"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fnullish-coalescing-operator" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnullish-coalescing-operator" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

2nd February 2021

# Nullish coalescing operator '??'

<span class="important__type">A recent addition</span>

This is a recent addition to the language. Old browsers may need polyfills.

The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we’ll use a special term here, in this article. We’ll say that an expression is “defined” when it’s neither `null` nor `undefined`.

The result of `a ?? b` is:

- if `a` is defined, then `a`,
- if `a` isn’t defined, then `b`.

In other words, `??` returns the first argument if it’s not `null/undefined`. Otherwise, the second one.

The nullish coalescing operator isn’t anything completely new. It’s just a nice syntax to get the first “defined” value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:

    result = (a !== null && a !== undefined) ? a : b;

Now it should be absolutely clear what `??` does. Let’s see where it helps.

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `user` if defined, otherwise `Anonymous`:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let user;

    alert(user ?? "Anonymous"); // Anonymous (user not defined)

Here’s the example with `user` assigned to a name:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let user = "John";

    alert(user ?? "Anonymous"); // John (user defined)

We can also use a sequence of `??` to select the first value from a list that isn’t `null/undefined`.

Let’s say we have a user’s data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We’d like to display the user name using one of these variables, or show “Anonymous” if all of them aren’t defined.

Let’s use the `??` operator for that:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let firstName = null;
    let lastName = null;
    let nickName = "Supercoder";

    // shows the first defined value:
    alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder

## <a href="nullish-coalescing-operator.html#comparison-with" id="comparison-with" class="main__anchor">Comparison with ||</a>

The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](logical-operators.html#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let firstName = null;
    let lastName = null;
    let nickName = "Supercoder";

    // shows the first truthy value:
    alert(firstName || lastName || nickName || "Anonymous"); // Supercoder

Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren’t quite happy with `||`.

The important difference between them is that:

- `||` returns the first _truthy_ value.
- `??` returns the first _defined_ value.

In other words, `||` doesn’t distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same – falsy values. If any of these is the first argument of `||`, then we’ll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let height = 0;

    alert(height || 100); // 100
    alert(height ?? 100); // 0

- The `height || 100` checks `height` for being a falsy value, and it’s `0`, falsy indeed.
  - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it’s not,
  - so the result is `height` “as is”, that is `0`.

In practice, the zero height is often a valid value, that shouldn’t be replaced with the default. So `??` does just the right thing.

## <a href="nullish-coalescing-operator.html#precedence" id="precedence" class="main__anchor">Precedence</a>

The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we’d like to choose a value with `??` in an expression with other operators, consider adding parentheses:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let height = null;
    let width = null;

    // important: use parentheses
    let area = (height ?? 100) * (width ?? 50);

    alert(area); // 5000

Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

    // without parentheses
    let area = height ?? 100 * width ?? 50;

    // ...works the same as this (probably not what we want):
    let area = height ?? (100 * width) ?? 50;

### <a href="nullish-coalescing-operator.html#using-with-or" id="using-with-or" class="main__anchor">Using ?? with &amp;&amp; or ||</a>

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.

The code below triggers a syntax error:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let x = 1 && 2 ?? 3; // Syntax error

The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.

Use explicit parentheses to work around it:

<a href="nullish-coalescing-operator.html#"
<a href="nullish-coalescing-operator.html#"

    let x = (1 && 2) ?? 3; // Works

    alert(x); // 2

## <a href="nullish-coalescing-operator.html#summary" id="summary" class="main__anchor">Summary</a>

- The nullish coalescing operator `??` provides a short way to choose the first “defined” value from a list.

  It’s used to assign default values to variables:

      // set height=100, if height is null or undefined
      height = height ?? 100;

- The operator `??` has a very low precedence, only a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.

- It’s forbidden to use it with `||` or `&&` without explicit parentheses.

<a href="logical-operators.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="while-for.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fnullish-coalescing-operator" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnullish-coalescing-operator" </a>

<a href="tutorial/map.html" class="map">

## <a href="nullish-coalescing-operator.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="nullish-coalescing-operator.html#comparison-with" class="sidebar__link">Comparison with ||</a>
- <a href="nullish-coalescing-operator.html#precedence" class="sidebar__link">Precedence</a>
- <a href="nullish-coalescing-operator.html#summary" class="sidebar__link">Summary</a>

- <a href="nullish-coalescing-operator.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fnullish-coalescing-operator" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnullish-coalescing-operator" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/12-nullish-coalescing-operator" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
