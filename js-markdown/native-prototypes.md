EN

- <a href="https://ar.javascript.info/native-prototypes"
- <a href="native-prototypes.html"
- <a href="https://es.javascript.info/native-prototypes"
- <a href="https://fr.javascript.info/native-prototypes"
- native-prototypes"
  native-prototypes"

<!-- -->

- /native-prototypes"
- <a href=native-prototypes"
- <a href="https://tr.javascript.info/native-prototypes"
- <a href="https://zh.javascript.info/native-prototypes"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fnative-prototypes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnative-prototypes" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="prototypes.html" Prototypes, inheritance</span></a></span>

23rd July 2020

# Native prototypes

The `"prototype"` property is widely used by the core of JavaScript itself. All built-in constructor functions use it.

First we’ll see at the details, and then how to use it for adding new capabilities to built-in objects.

## <a href="native-prototypes.html#object-prototype" id="object-prototype" class="main__anchor">Object.prototype</a>

Let’s say we output an empty object:

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    let obj = {};
    alert( obj ); // "[object Object]" ?

Where’s the code that generates the string `"[object Object]"`? That’s a built-in `toString` method, but where is it? The `obj` is empty!

…But the short notation `obj = {}` is the same as `obj = new Object()`, where `Object` is a built-in object constructor function, with its own `prototype` referencing a huge object with `toString` and other methods.

Here’s what’s going on:

<figure><img src="article/native-prototypes/object-prototype.svg" width="453" height="94" /></figure>When `new Object()` is called (or a literal object `{...}` is created), the `[[Prototype]]` of it is set to `Object.prototype` according to the rule that we discussed in the previous chapter:

<figure><img src="article/native-prototypes/object-prototype-1.svg" width="453" height="199" /></figure>So then when `obj.toString()` is called the method is taken from `Object.prototype`.

We can check it like this:

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    let obj = {};

    alert(obj.__proto__ === Object.prototype); // true

    alert(obj.toString === obj.__proto__.toString); //true
    alert(obj.toString === Object.prototype.toString); //true

Please note that there is no more `[[Prototype]]` in the chain above `Object.prototype`:

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    alert(Object.prototype.__proto__); // null

## <a href="native-prototypes.html#other-built-in-prototypes" id="other-built-in-prototypes" class="main__anchor">Other built-in prototypes</a>

Other built-in objects such as `Array`, `Date`, `Function` and others also keep methods in prototypes.

For instance, when we create an array `[1, 2, 3]`, the default `new Array()` constructor is used internally. So `Array.prototype` becomes its prototype and provides methods. That’s very memory-efficient.

By specification, all of the built-in prototypes have `Object.prototype` on the top. That’s why some people say that “everything inherits from objects”.

Here’s the overall picture (for 3 built-ins to fit):

<figure><img src="article/native-prototypes/native-prototypes-classes.svg" width="692" height="411" /></figure>Let’s check the prototypes manually:

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    let arr = [1, 2, 3];

    // it inherits from Array.prototype?
    alert( arr.__proto__ === Array.prototype ); // true

    // then from Object.prototype?
    alert( arr.__proto__.__proto__ === Object.prototype ); // true

    // and null on the top.
    alert( arr.__proto__.__proto__.__proto__ ); // null

Some methods in prototypes may overlap, for instance, `Array.prototype` has its own `toString` that lists comma-delimited elements:

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    let arr = [1, 2, 3]
    alert(arr); // 1,2,3 <-- the result of Array.prototype.toString

As we’ve seen before, `Object.prototype` has `toString` as well, but `Array.prototype` is closer in the chain, so the array variant is used.

<figure><img src="article/native-prototypes/native-prototypes-array-tostring.svg" width="209" height="316" /></figure>In-browser tools like Chrome developer console also show inheritance (`console.dir` may need to be used for built-in objects):

<figure><img src="article/native-prototypes/console_dir_array.png" class="image__image" width="567" height="292" /></figure>Other built-in objects also work the same way. Even functions – they are objects of a built-in `Function` constructor, and their methods (`call`/`apply` and others) are taken from `Function.prototype`. Functions have their own `toString` too.

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    function f() {}

    alert(f.__proto__ == Function.prototype); // true
    alert(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects

## <a href="native-prototypes.html#primitives" id="primitives" class="main__anchor">Primitives</a>

The most intricate thing happens with strings, numbers and booleans.

As we remember, they are not objects. But if we try to access their properties, temporary wrapper objects are created using built-in constructors `String`, `Number` and `Boolean`. They provide the methods and disappear.

These objects are created invisibly to us and most engines optimize them out, but the specification describes it exactly this way. Methods of these objects also reside in prototypes, available as `String.prototype`, `Number.prototype` and `Boolean.prototype`.

<span class="important__type">Values `null` and `undefined` have no object wrappers</span>

Special values `null` and `undefined` stand apart. They have no object wrappers, so methods and properties are not available for them. And there are no corresponding prototypes either.

## <a href="native-prototypes.html#native-prototype-change" id="native-prototype-change" class="main__anchor">Changing native prototypes</a>

Native prototypes can be modified. For instance, if we add a method to `String.prototype`, it becomes available to all strings:

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    String.prototype.show = function() {
      alert(this);
    };

    "BOOM!".show(); // BOOM!

During the process of development, we may have ideas for new built-in methods we’d like to have, and we may be tempted to add them to native prototypes. But that is generally a bad idea.

<span class="important__type">Important:</span>

Prototypes are global, so it’s easy to get a conflict. If two libraries add a method `String.prototype.show`, then one of them will be overwriting the method of the other.

So, generally, modifying a native prototype is considered a bad idea.

**In modern programming, there is only one case where modifying native prototypes is approved. That’s polyfilling.**

Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.

We may then implement it manually and populate the built-in prototype with it.

For instance:

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    if (!String.prototype.repeat) { // if there's no such method
      // add it to the prototype

      String.prototype.repeat = function(n) {
        // repeat the string n times

        // actually, the code should be a little bit more complex than that
        // (the full algorithm is in the specification)
        // but even an imperfect polyfill is often considered good enough
        return new Array(n + 1).join(this);
      };
    }

    alert( "La".repeat(3) ); // LaLaLa

## <a href="native-prototypes.html#borrowing-from-prototypes" id="borrowing-from-prototypes" class="main__anchor">Borrowing from prototypes</a>

In the chapter [Decorators and forwarding, call/apply](call-apply-decorators.html#method-borrowing) we talked about method borrowing.

That’s when we take a method from one object and copy it into another.

Some methods of native prototypes are often borrowed.

For instance, if we’re making an array-like object, we may want to copy some `Array` methods to it.

E.g.

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    let obj = {
      0: "Hello",
      1: "world!",
      length: 2,
    };

    obj.join = Array.prototype.join;

    alert( obj.join(',') ); // Hello,world!

It works because the internal algorithm of the built-in `join` method only cares about the correct indexes and the `length` property. It doesn’t check if the object is indeed an array. Many built-in methods are like that.

Another possibility is to inherit by setting `obj.__proto__` to `Array.prototype`, so all `Array` methods are automatically available in `obj`.

But that’s impossible if `obj` already inherits from another object. Remember, we only can inherit from one object at a time.

Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.

## <a href="native-prototypes.html#summary" id="summary" class="main__anchor">Summary</a>

- All built-in objects follow the same pattern:
  - The methods are stored in the prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
  - The object itself stores only the data (array items, object properties, the date)
- Primitives also store methods in prototypes of wrapper objects: `Number.prototype`, `String.prototype` and `Boolean.prototype`. Only `undefined` and `null` do not have wrapper objects
- Built-in prototypes can be modified or populated with new methods. But it’s not recommended to change them. The only allowable case is probably when we add-in a new standard, but it’s not yet supported by the JavaScript engine

## <a href="native-prototypes.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="native-prototypes.html#add-method-f-defer-ms-to-functions" id="add-method-f-defer-ms-to-functions" class="main__anchor">Add method "f.defer(ms)" to functions</a>

<a href="task/defer-to-prototype.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Add to the prototype of all functions the method `defer(ms)`, that runs the function after `ms` milliseconds.

After you do it, such code should work:

    function f() {
      alert("Hello!");
    }

    f.defer(1000); // shows "Hello!" after 1 second

solution

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    Function.prototype.defer = function(ms) {
      setTimeout(this, ms);
    };

    function f() {
      alert("Hello!");
    }

    f.defer(1000); // shows "Hello!" after 1 sec

### <a href="native-prototypes.html#add-the-decorating-defer-to-functions" id="add-the-decorating-defer-to-functions" class="main__anchor">Add the decorating "defer()" to functions</a>

<a href="task/defer-to-prototype-extended.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Add to the prototype of all functions the method `defer(ms)`, that returns a wrapper, delaying the call by `ms` milliseconds.

Here’s an example of how it should work:

    function f(a, b) {
      alert( a + b );
    }

    f.defer(1000)(1, 2); // shows 3 after 1 second

Please note that the arguments should be passed to the original function.

solution

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    Function.prototype.defer = function(ms) {
      let f = this;
      return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
      }
    };

    // check it
    function f(a, b) {
      alert( a + b );
    }

    f.defer(1000)(1, 2); // shows 3 after 1 sec

Please note: we use `this` in `f.apply` to make our decoration work for object methods.

So if the wrapper function is called as an object method, then `this` is passed to the original method `f`.

<a href="native-prototypes.html#"
<a href="native-prototypes.html#"

    Function.prototype.defer = function(ms) {
      let f = this;
      return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
      }
    };

    let user = {
      name: "John",
      sayHi() {
        alert(this.name);
      }
    }

    user.sayHi = user.sayHi.defer(1000);

    user.sayHi();

<a href="function-prototype.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="prototype-methods.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fnative-prototypes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnative-prototypes" </a>

<a href="tutorial/map.html" class="map">

## <a href="native-prototypes.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="prototypes.html" class="sidebar__link">Prototypes, inheritance</a>

#### Lesson navigation

- <a href="native-prototypes.html#object-prototype" class="sidebar__link">Object.prototype</a>
- <a href="native-prototypes.html#other-built-in-prototypes" class="sidebar__link">Other built-in prototypes</a>
- <a href="native-prototypes.html#primitives" class="sidebar__link">Primitives</a>
- <a href="native-prototypes.html#native-prototype-change" class="sidebar__link">Changing native prototypes</a>
- <a href="native-prototypes.html#borrowing-from-prototypes" class="sidebar__link">Borrowing from prototypes</a>
- <a href="native-prototypes.html#summary" class="sidebar__link">Summary</a>

- <a href="native-prototypes.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="native-prototypes.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fnative-prototypes" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnative-prototypes" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/08-prototypes/03-native-prototypes" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
