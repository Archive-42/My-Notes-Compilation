EN

- <a href="https://ar.javascript.info/object"
- <a href="object.html"
- <a href="https://es.javascript.info/object"
- <a href="https://fr.javascript.info/object"
- object"
  object"

<!-- -->

- /object"
- <a href=object"
- <a href="https://tr.javascript.info/object"
- <a href="https://zh.javascript.info/object"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fobject" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-basics.html" Objects: the basics</span></a></span>

22nd November 2020

# Objects

As we know from the chapter [Data types](types.html), there are eight data types in JavaScript. Seven of them are called “primitive”, because their values contain only a single thing (be it a string or a number or whatever).

In contrast, objects are used to store keyed collections of various data and more complex entities. In JavaScript, objects penetrate almost every aspect of the language. So we must understand them first before going in-depth anywhere else.

An object can be created with figure brackets `{…}` with an optional list of _properties_. A property is a “key: value” pair, where `key` is a string (also called a “property name”), and `value` can be anything.

We can imagine an object as a cabinet with signed files. Every piece of data is stored in its file by the key. It’s easy to find a file by its name or add/remove a file.

<figure><img src="article/object/object.svg" width="176" height="183" /></figure>An empty object (“empty cabinet”) can be created using one of two syntaxes:

    let user = new Object(); // "object constructor" syntax
    let user = {};  // "object literal" syntax

<figure><img src="article/object/object-user-empty.svg" width="248" height="92" /></figure>Usually, the figure brackets `{...}` are used. That declaration is called an *object literal*.

## <a href="object.html#literals-and-properties" id="literals-and-properties" class="main__anchor">Literals and properties</a>

We can immediately put some properties into `{...}` as “key: value” pairs:

    let user = {     // an object
      name: "John",  // by key "name" store value "John"
      age: 30        // by key "age" store value 30
    };

A property has a key (also known as “name” or “identifier”) before the colon `":"` and a value to the right of it.

In the `user` object, there are two properties:

1.  The first property has the name `"name"` and the value `"John"`.
2.  The second one has the name `"age"` and the value `30`.

The resulting `user` object can be imagined as a cabinet with two signed files labeled “name” and “age”.

<figure><img src="article/object/object-user.svg" width="248" height="173" /></figure>We can add, remove and read files from it any time.

Property values are accessible using the dot notation:

    // get property values of the object:
    alert( user.name ); // John
    alert( user.age ); // 30

The value can be of any type. Let’s add a boolean one:

    user.isAdmin = true;

<figure><img src="article/object/object-user-isadmin.svg" width="248" height="173" /></figure>To remove a property, we can use `delete` operator:

    delete user.age;

<figure><img src="article/object/object-user-delete.svg" width="248" height="173" /></figure>We can also use multiword property names, but then they must be quoted:

    let user = {
      name: "John",
      age: 30,
      "likes birds": true  // multiword property name must be quoted
    };

<figure><img src="article/object/object-user-props.svg" width="248" height="215" /></figure>The last property in the list may end with a comma:

    let user = {
      name: "John",
      age: 30,
    }

That is called a “trailing” or “hanging” comma. Makes it easier to add/remove/move around properties, because all lines become alike.

## <a href="object.html#square-brackets" id="square-brackets" class="main__anchor">Square brackets</a>

For multiword properties, the dot access doesn’t work:

<a href="object.html#"
<a href="object.html#"

    // this would give a syntax error
    user.likes birds = true

JavaScript doesn’t understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn’t start with a digit and doesn’t include special characters (`$` and `_` are allowed).

There’s an alternative “square bracket notation” that works with any string:

<a href="object.html#"
<a href="object.html#"

    let user = {};

    // set
    user["likes birds"] = true;

    // get
    alert(user["likes birds"]); // true

    // delete
    delete user["likes birds"];

Now everything is fine. Please note that the string inside the brackets is properly quoted (any type of quotes will do).

Square brackets also provide a way to obtain the property name as the result of any expression – as opposed to a literal string – like from a variable as follows:

    let key = "likes birds";

    // same as user["likes birds"] = true;
    user[key] = true;

Here, the variable `key` may be calculated at run-time or depend on the user input. And then we use it to access the property. That gives us a great deal of flexibility.

For instance:

<a href="object.html#"
<a href="object.html#"

    let user = {
      name: "John",
      age: 30
    };

    let key = prompt("What do you want to know about the user?", "name");

    // access by variable
    alert( user[key] ); // John (if enter "name")

The dot notation cannot be used in a similar way:

<a href="object.html#"
<a href="object.html#"

    let user = {
      name: "John",
      age: 30
    };

    let key = "name";
    alert( user.key ) // undefined

### <a href="object.html#computed-properties" id="computed-properties" class="main__anchor">Computed properties</a>

We can use square brackets in an object literal, when creating an object. That’s called _computed properties_.

For instance:

<a href="object.html#"
<a href="object.html#"

    let fruit = prompt("Which fruit to buy?", "apple");

    let bag = {
      [fruit]: 5, // the name of the property is taken from the variable fruit
    };

    alert( bag.apple ); // 5 if fruit="apple"

The meaning of a computed property is simple: `[fruit]` means that the property name should be taken from `fruit`.

So, if a visitor enters `"apple"`, `bag` will become `{apple: 5}`.

Essentially, that works the same as:

<a href="object.html#"
<a href="object.html#"

    let fruit = prompt("Which fruit to buy?", "apple");
    let bag = {};

    // take property name from the fruit variable
    bag[fruit] = 5;

…But looks nicer.

We can use more complex expressions inside square brackets:

    let fruit = 'apple';
    let bag = {
      [fruit + 'Computers']: 5 // bag.appleComputers = 5
    };

Square brackets are much more powerful than the dot notation. They allow any property names and variables. But they are also more cumbersome to write.

So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

## <a href="object.html#property-value-shorthand" id="property-value-shorthand" class="main__anchor">Property value shorthand</a>

In real code we often use existing variables as values for property names.

For instance:

<a href="object.html#"
<a href="object.html#"

    function makeUser(name, age) {
      return {
        name: name,
        age: age,
        // ...other properties
      };
    }

    let user = makeUser("John", 30);
    alert(user.name); // John

In the example above, properties have the same names as variables. The use-case of making a property from a variable is so common, that there’s a special _property value shorthand_ to make it shorter.

Instead of `name:name` we can just write `name`, like this:

    function makeUser(name, age) {
      return {
        name, // same as name: name
        age,  // same as age: age
        // ...
      };
    }

We can use both normal properties and shorthands in the same object:

    let user = {
      name,  // same as name:name
      age: 30
    };

## <a href="object.html#property-names-limitations" id="property-names-limitations" class="main__anchor">Property names limitations</a>

As we already know, a variable cannot have a name equal to one of language-reserved words like “for”, “let”, “return” etc.

But for an object property, there’s no such restriction:

<a href="object.html#"
<a href="object.html#"

    // these properties are all right
    let obj = {
      for: 1,
      let: 2,
      return: 3
    };

    alert( obj.for + obj.let + obj.return );  // 6

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

<a href="object.html#"
<a href="object.html#"

    let obj = {
      0: "test" // same as "0": "test"
    };

    // both alerts access the same property (the number 0 is converted to string "0")
    alert( obj["0"] ); // test
    alert( obj[0] ); // test (same property)

There’s a minor gotcha with a special property named `__proto__`. We can’t set it to a non-object value:

<a href="object.html#"
<a href="object.html#"

    let obj = {};
    obj.__proto__ = 5; // assign a number
    alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended

As we see from the code, the assignment to a primitive `5` is ignored.

We’ll cover the special nature of `__proto__` in [subsequent chapters](prototype-inheritance.html), and suggest the [ways to fix](prototype-methods.html) such behavior.

## <a href="object.html#property-existence-test-in-operator" id="property-existence-test-in-operator" class="main__anchor">Property existence test, “in” operator</a>

A notable feature of objects in JavaScript, compared to many other languages, is that it’s possible to access any property. There will be no error if the property doesn’t exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:

<a href="object.html#"
<a href="object.html#"

    let user = {};

    alert( user.noSuchProperty === undefined ); // true means "no such property"

There’s also a special operator `"in"` for that.

The syntax is:

    "key" in object

For instance:

<a href="object.html#"
<a href="object.html#"

    let user = { name: "John", age: 30 };

    alert( "age" in user ); // true, user.age exists
    alert( "blabla" in user ); // false, user.blabla doesn't exist

Please note that on the left side of `in` there must be a _property name_. That’s usually a quoted string.

If we omit quotes, that means a variable, it should contain the actual name to be tested. For instance:

<a href="object.html#"
<a href="object.html#"

    let user = { age: 30 };

    let key = "age";
    alert( key in user ); // true, property "age" exists

Why does the `in` operator exist? Isn’t it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there’s a special case when it fails, but `"in"` works correctly.

It’s when an object property exists, but stores `undefined`:

<a href="object.html#"
<a href="object.html#"

    let obj = {
      test: undefined
    };

    alert( obj.test ); // it's undefined, so - no such property?

    alert( "test" in obj ); // true, the property does exist!

In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for “unknown” or “empty” values. So the `in` operator is an exotic guest in the code.

## <a href="object.html#the-for-in-loop" id="the-for-in-loop" class="main__anchor">The “for…in” loop</a>

To walk over all keys of an object, there exists a special form of the loop: `for..in`. This is a completely different thing from the `for(;;)` construct that we studied before.

The syntax:

    for (key in object) {
      // executes the body for each key among object properties
    }

For instance, let’s output all properties of `user`:

<a href="object.html#"
<a href="object.html#"

    let user = {
      name: "John",
      age: 30,
      isAdmin: true
    };

    for (let key in user) {
      // keys
      alert( key );  // name, age, isAdmin
      // values for the keys
      alert( user[key] ); // John, 30, true
    }

Note that all “for” constructs allow us to declare the looping variable inside the loop, like `let key` here.

Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.

### <a href="object.html#ordered-like-an-object" id="ordered-like-an-object" class="main__anchor">Ordered like an object</a>

Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?

The short answer is: “ordered in a special fashion”: integer properties are sorted, others appear in creation order. The details follow.

As an example, let’s consider an object with the phone codes:

<a href="object.html#"
<a href="object.html#"

    let codes = {
      "49": "Germany",
      "41": "Switzerland",
      "44": "Great Britain",
      // ..,
      "1": "USA"
    };

    for (let code in codes) {
      alert(code); // 1, 41, 44, 49
    }

The object may be used to suggest a list of options to the user. If we’re making a site mainly for German audience then we probably want `49` to be the first.

But if we run the code, we see a totally different picture:

- USA (1) goes first
- then Switzerland (41) and so on.

The phone codes go in the ascending sorted order, because they are integers. So we see `1, 41, 44, 49`.

<span class="important__type">Integer properties? What’s that?</span>

The “integer property” term here means a string that can be converted to-and-from an integer without a change.

So, “49” is an integer property name, because when it’s transformed to an integer number and back, it’s still the same. But “+49” and “1.2” are not:

<a href="object.html#"
<a href="object.html#"

    // Math.trunc is a built-in function that removes the decimal part
    alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
    alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
    alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property

…On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:

<a href="object.html#"
<a href="object.html#"

    let user = {
      name: "John",
      surname: "Smith"
    };
    user.age = 25; // add one more

    // non-integer properties are listed in the creation order
    for (let prop in user) {
      alert( prop ); // name, surname, age
    }

So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer. Adding a plus `"+"` sign before each code is enough.

Like this:

<a href="object.html#"
<a href="object.html#"

    let codes = {
      "+49": "Germany",
      "+41": "Switzerland",
      "+44": "Great Britain",
      // ..,
      "+1": "USA"
    };

    for (let code in codes) {
      alert( +code ); // 49, 41, 44, 1
    }

Now it works as intended.

## <a href="object.html#summary" id="summary" class="main__anchor">Summary</a>

Objects are associative arrays with several special features.

They store properties (key-value pairs), where:

- Property keys must be strings or symbols (usually strings).
- Values can be of any type.

To access a property, we can use:

- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow to take the key from a variable, like `obj[varWithKey]`.

Additional operators:

- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

What we’ve studied in this chapter is called a “plain object”, or just `Object`.

There are many other kinds of objects in JavaScript:

- `Array` to store ordered data collections,
- `Date` to store the information about the date and time,
- `Error` to store the information about an error.
- …And so on.

They have their special features that we’ll study later. Sometimes people say something like “Array type” or “Date type”, but formally they are not types of their own, but belong to a single “object” data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we’ve just scratched the surface of a topic that is really huge. We’ll be closely working with objects and learning more about them in further parts of the tutorial.

## <a href="object.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="object.html#hello-object" id="hello-object" class="main__anchor">Hello, object</a>

<a href="task/hello-object.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code, one line for each action:

1.  Create an empty object `user`.
2.  Add the property `name` with the value `John`.
3.  Add the property `surname` with the value `Smith`.
4.  Change the value of the `name` to `Pete`.
5.  Remove the property `name` from the object.

solution

    let user = {};
    user.name = "John";
    user.surname = "Smith";
    user.name = "Pete";
    delete user.name;

### <a href="object.html#check-for-emptiness" id="check-for-emptiness" class="main__anchor">Check for emptiness</a>

<a href="task/is-empty.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the function `isEmpty(obj)` which returns `true` if the object has no properties, `false` otherwise.

Should work like that:

    let schedule = {};

    alert( isEmpty(schedule) ); // true

    schedule["8:30"] = "get up";

    alert( isEmpty(schedule) ); // false

[Open a sandbox with tests.](https://plnkr.co/edit/OABZFsveJ4UTBLtz?p=preview)

solution

Just loop over the object and `return false` immediately if there’s at least one property.

    function isEmpty(obj) {
      for (let key in obj) {
        // if the loop has started, there is a property
        return false;
      }
      return true;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/zHDueHHp9F5yT8ry?p=preview)

### <a href="object.html#sum-object-properties" id="sum-object-properties" class="main__anchor">Sum object properties</a>

<a href="task/sum-object.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have an object storing salaries of our team:

    let salaries = {
      John: 100,
      Ann: 160,
      Pete: 130
    }

Write the code to sum all salaries and store in the variable `sum`. Should be `390` in the example above.

If `salaries` is empty, then the result must be `0`.

solution

<a href="object.html#"
<a href="object.html#"

    let salaries = {
      John: 100,
      Ann: 160,
      Pete: 130
    };

    let sum = 0;
    for (let key in salaries) {
      sum += salaries[key];
    }

    alert(sum); // 390

### <a href="object.html#multiply-numeric-property-values-by-2" id="multiply-numeric-property-values-by-2" class="main__anchor">Multiply numeric property values by 2</a>

<a href="task/multiply-numeric.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.

For instance:

    // before the call
    let menu = {
      width: 200,
      height: 300,
      title: "My menu"
    };

    multiplyNumeric(menu);

    // after the call
    menu = {
      width: 400,
      height: 600,
      title: "My menu"
    };

Please note that `multiplyNumeric` does not need to return anything. It should modify the object in-place.

P.S. Use `typeof` to check for a number here.

[Open a sandbox with tests.](https://plnkr.co/edit/xQj2B2R6LQJPhUrs?p=preview)

solution

    function multiplyNumeric(obj) {
      for (let key in obj) {
        if (typeof obj[key] == 'number') {
          obj[key] *= 2;
        }
      }
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/fuUFVu56QjLsjky0?p=preview)

<a href="object-basics.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="object-copy.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fobject" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject" </a>

<a href="tutorial/map.html" class="map">

## <a href="object.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="object-basics.html" class="sidebar__link">Objects: the basics</a>

#### Lesson navigation

- <a href="object.html#literals-and-properties" class="sidebar__link">Literals and properties</a>
- <a href="object.html#square-brackets" class="sidebar__link">Square brackets</a>
- <a href="object.html#property-value-shorthand" class="sidebar__link">Property value shorthand</a>
- <a href="object.html#property-names-limitations" class="sidebar__link">Property names limitations</a>
- <a href="object.html#property-existence-test-in-operator" class="sidebar__link">Property existence test, “in” operator</a>
- <a href="object.html#the-for-in-loop" class="sidebar__link">The “for…in” loop</a>
- <a href="object.html#summary" class="sidebar__link">Summary</a>

- <a href="object.html#tasks" class="sidebar__link">Tasks (4)</a>
- <a href="object.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fobject" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/04-object-basics/01-object" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
