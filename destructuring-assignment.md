EN

langs\_\_title">عربي</span></a>

- <a href="destructuring-assignment.html"
- <a href="https://es.javascript.info/destructuring-assignment"
- <a href="https://fr.javascript.info/destructuring-assignment"
- <a href="https://it.javascript.info/destructuring-assignment"
  destructuring-assignment"

<!-- -->

- <a href="https://ko.javascript.info/destructuring-assignment"
- <a href=destructuring-assignment"
- <a href="https://tr.javascript.info/destructuring-assignment"
- <a href="https://zh.javascript.info/destructuring-assignment"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fdestructuring-assignment" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdestructuring-assignment" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

2nd February 2021

# Destructuring assignment

The two most used data structures in JavaScript are `Object` and `Array`.

- Objects allow us to create a single entity that stores data items by key.
- Arrays allow us to gather data items into an ordered list.

Although, when we pass those to a function, it may need not an object/array as a whole. It may need individual pieces.

_Destructuring assignment_ is a special syntax that allows us to “unpack” arrays or objects into a bunch of variables, as sometimes that’s more convenient.

Destructuring also works great with complex functions that have a lot of parameters, default values, and so on. Soon we’ll see that.

## <a href="destructuring-assignment.html#array-destructuring" id="array-destructuring" class="main__anchor">Array destructuring</a>

Here’s an example of how an array is destructured into variables:

    // we have an array with the name and surname
    let arr = ["John", "Smith"]

    // destructuring assignment
    // sets firstName = arr[0]
    // and surname = arr[1]
    let [firstName, surname] = arr;

    alert(firstName); // John
    alert(surname);  // Smith

Now we can work with variables instead of array members.

It looks great when combined with `split` or other array-returning methods:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let [firstName, surname] = "John Smith".split(' ');
    alert(firstName); // John
    alert(surname);  // Smith

As you can see, the syntax is simple. There are several peculiar details though. Let’s see more examples, to better understand it.

<span class="important__type">“Destructuring” does not mean “destructive”.</span>

It’s called “destructuring assignment,” because it “destructurizes” by copying items into variables. But the array itself is not modified.

It’s just a shorter way to write:

    // let [firstName, surname] = arr;
    let firstName = arr[0];
    let surname = arr[1];

<span class="important__type">Ignore elements using commas</span>

Unwanted elements of the array can also be thrown away via an extra comma:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    // second element is not needed
    let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    alert( title ); // Consul

In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items is also skipped (as there are no variables for them).

<span class="important__type">Works with any iterable on the right-side</span>

…Actually, we can use it with any iterable, not only arrays:

    let [a, b, c] = "abc"; // ["a", "b", "c"]
    let [one, two, three] = new Set([1, 2, 3]);

That works, because internally a destructuring assignment works by iterating over the right value. It’s kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.

<span class="important__type">Assign to anything at the left-side</span>

We can use any “assignables” at the left side.

For instance, an object property:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let user = {};
    [user.name, user.surname] = "John Smith".split(' ');

    alert(user.name); // John
    alert(user.surname); // Smith

<span class="important__type">Looping with .entries()</span>

In the previous chapter we saw the [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) method.

We can use it with destructuring to loop over keys-and-values of an object:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let user = {
      name: "John",
      age: 30
    };

    // loop over keys-and-values
    for (let [key, value] of Object.entries(user)) {
      alert(`${key}:${value}`); // name:John, then age:30
    }

The similar code for a `Map` is simpler, as it’s iterable:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let user = new Map();
    user.set("name", "John");
    user.set("age", "30");

    // Map iterates as [key, value] pairs, very convenient for destructuring
    for (let [key, value] of user) {
      alert(`${key}:${value}`); // name:John, then age:30
    }

<span class="important__type">Swap variables trick</span>

There’s a well-known trick for swapping values of two variables using a destructuring assignment:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let guest = "Jane";
    let admin = "Pete";

    // Let's swap the values: make guest=Pete, admin=Jane
    [guest, admin] = [admin, guest];

    alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)

Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.

### <a href="destructuring-assignment.html#the-rest" id="the-rest" class="main__anchor">The rest ‘…’</a>

Usually, if the array is longer than the list at the left, the “extra” items are omitted.

For example, here only two items are taken, and the rest is just ignored:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    alert(name1); // Julius
    alert(name2); // Caesar
    // Further items aren't assigned anywhere

If we’d like also to gather all that follows – we can add one more parameter that gets “the rest” using three dots `"..."`:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    // rest is array of items, starting from the 3rd one
    alert(rest[0]); // Consul
    alert(rest[1]); // of the Roman Republic
    alert(rest.length); // 2

The value of `rest` is the array of the remaining array elements.

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    // now titles = ["Consul", "of the Roman Republic"]

### <a href="destructuring-assignment.html#default-values" id="default-values" class="main__anchor">Default values</a>

If the array is shorter than the list of variables at the left, there’ll be no errors. Absent values are considered undefined:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let [firstName, surname] = [];

    alert(firstName); // undefined
    alert(surname); // undefined

If we want a “default” value to replace the missing one, we can provide it using `=`:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    // default values
    let [name = "Guest", surname = "Anonymous"] = ["Julius"];

    alert(name);    // Julius (from array)
    alert(surname); // Anonymous (default used)

Default values can be more complex expressions or even function calls. They are evaluated only if the value is not provided.

For instance, here we use the `prompt` function for two defaults:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    // runs only prompt for surname
    let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

    alert(name);    // Julius (from array)
    alert(surname); // whatever prompt gets

Please note: the `prompt` will run only for the missing value (`surname`).

## <a href="destructuring-assignment.html#object-destructuring" id="object-destructuring" class="main__anchor">Object destructuring</a>

The destructuring assignment also works with objects.

The basic syntax is:

    let {var1, var2} = {var1:…, var2:…}

We should have an existing object at the right side, that we want to split into variables. The left side contains an object-like “pattern” for corresponding properties. In the simplest case, that’s a list of variable names in `{...}`.

For instance:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "Menu",
      width: 100,
      height: 200
    };

    let {title, width, height} = options;

    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200

Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables.

The order does not matter. This works too:

    // changed the order in let {...}
    let {height, width, title} = { title: "Menu", height: 200, width: 100 }

The pattern on the left side may be more complex and specify the mapping between properties and variables.

If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "Menu",
      width: 100,
      height: 200
    };

    // { sourceProperty: targetVariable }
    let {width: w, height: h, title} = options;

    // width -> w
    // height -> h
    // title -> title

    alert(title);  // Menu
    alert(w);      // 100
    alert(h);      // 200

The colon shows “what : goes where”. In the example above the property `width` goes to `w`, property `height` goes to `h`, and `title` is assigned to the same name.

For potentially missing properties we can set default values using `"="`, like this:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "Menu"
    };

    let {width = 100, height = 200, title} = options;

    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200

Just like with arrays or function parameters, default values can be any expressions or even function calls. They will be evaluated if the value is not provided.

In the code below `prompt` asks for `width`, but not for `title`:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "Menu"
    };

    let {width = prompt("width?"), title = prompt("title?")} = options;

    alert(title);  // Menu
    alert(width);  // (whatever the result of prompt is)

We also can combine both the colon and equality:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "Menu"
    };

    let {width: w = 100, height: h = 200, title} = options;

    alert(title);  // Menu
    alert(w);      // 100
    alert(h);      // 200

If we have a complex object with many properties, we can extract only what we need:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "Menu",
      width: 100,
      height: 200
    };

    // only extract title as a variable
    let { title } = options;

    alert(title); // Menu

### <a href="destructuring-assignment.html#the-rest-pattern" id="the-rest-pattern" class="main__anchor">The rest pattern “…”</a>

What if the object has more properties than we have variables? Can we take some and then assign the “rest” somewhere?

We can use the rest pattern, just like we did with arrays. It’s not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.

It looks like this:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "Menu",
      height: 200,
      width: 100
    };

    // title = property named title
    // rest = object with the rest of properties
    let {title, ...rest} = options;

    // now title="Menu", rest={height: 200, width: 100}
    alert(rest.height);  // 200
    alert(rest.width);   // 100

<span class="important__type">Gotcha if there’s no `let`</span>

In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there’s a catch.

This won’t work:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let title, width, height;

    // error in this line
    {title, width, height} = {title: "Menu", width: 200, height: 100};

The problem is that JavaScript treats `{...}` in the main code flow (not inside another expression) as a code block. Such code blocks can be used to group statements, like this:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    {
      // a code block
      let message = "Hello";
      // ...
      alert( message );
    }

So here JavaScript assumes that we have a code block, that’s why there’s an error. We want destructuring instead.

To show JavaScript that it’s not a code block, we can wrap the expression in parentheses `(...)`:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let title, width, height;

    // okay now
    ({title, width, height} = {title: "Menu", width: 200, height: 100});

    alert( title ); // Menu

## <a href="destructuring-assignment.html#nested-destructuring" id="nested-destructuring" class="main__anchor">Nested destructuring</a>

If an object or an array contain other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern at the left side of the assignment has the same structure to extract values from them:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      size: {
        width: 100,
        height: 200
      },
      items: ["Cake", "Donut"],
      extra: true
    };

    // destructuring assignment split in multiple lines for clarity
    let {
      size: { // put size here
        width,
        height
      },
      items: [item1, item2], // assign items here
      title = "Menu" // not present in the object (default value is used)
    } = options;

    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200
    alert(item1);  // Cake
    alert(item2);  // Donut

All properties of `options` object except `extra` that is absent in the left part, are assigned to corresponding variables:

<figure><img src="article/destructuring-assignment/destructuring-complex.svg" width="488" height="150" /></figure>Finally, we have `width`, `height`, `item1`, `item2` and `title` from the default value.

Note that there are no variables for `size` and `items`, as we take their content instead.

## <a href="destructuring-assignment.html#smart-function-parameters" id="smart-function-parameters" class="main__anchor">Smart function parameters</a>

There are times when a function has many parameters, most of which are optional. That’s especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.

Here’s a bad way to write such function:

    function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
      // ...
    }

In real-life, the problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still… Another problem is how to call a function when most parameters are ok by default.

Like this?

    // undefined where default values are fine
    showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])

That’s ugly. And becomes unreadable when we deal with more parameters.

Destructuring comes to the rescue!

We can pass parameters as an object, and the function immediately destructurizes them into variables:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    // we pass object to function
    let options = {
      title: "My menu",
      items: ["Item1", "Item2"]
    };

    // ...and it immediately expands it to variables
    function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
      // title, items – taken from options,
      // width, height – defaults used
      alert( `${title} ${width} ${height}` ); // My Menu 200 100
      alert( items ); // Item1, Item2
    }

    showMenu(options);

We can also use more complex destructuring with nested objects and colon mappings:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let options = {
      title: "My menu",
      items: ["Item1", "Item2"]
    };

    function showMenu({
      title = "Untitled",
      width: w = 100,  // width goes to w
      height: h = 200, // height goes to h
      items: [item1, item2] // items first element goes to item1, second to item2
    }) {
      alert( `${title} ${w} ${h}` ); // My Menu 100 200
      alert( item1 ); // Item1
      alert( item2 ); // Item2
    }

    showMenu(options);

The full syntax is the same as for a destructuring assignment:

    function({
      incomingProperty: varName = defaultValue
      ...
    })

Then, for an object of parameters, there will be a variable `varName` for property `incomingProperty`, with `defaultValue` by default.

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:

    showMenu({}); // ok, all values are default

    showMenu(); // this would give an error

We can fix this by making `{}` the default value for the whole object of parameters:

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
      alert( `${title} ${width} ${height}` );
    }

    showMenu(); // Menu 100 200

In the code above, the whole arguments object is `{}` by default, so there’s always something to destructurize.

## <a href="destructuring-assignment.html#summary" id="summary" class="main__anchor">Summary</a>

- Destructuring assignment allows for instantly mapping an object or array onto many variables.

- The full object syntax:

      let {prop : varName = default, ...rest} = object

  This means that property `prop` should go into the variable `varName` and, if no such property exists, then the `default` value should be used.

  Object properties that have no mapping are copied to the `rest` object.

- The full array syntax:

      let [item1 = default, item2, ...rest] = array

  The first item goes to `item1`; the second goes into `item2`, all the rest makes the array `rest`.

- It’s possible to extract data from nested arrays/objects, for that the left side must have the same structure as the right one.

## <a href="destructuring-assignment.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="destructuring-assignment.html#destructuring-assignment" id="destructuring-assignment" class="main__anchor">Destructuring assignment</a>

<a href="task/destruct-user.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have an object:

    let user = {
      name: "John",
      years: 30
    };

Write the destructuring assignment that reads:

- `name` property into the variable `name`.
- `years` property into the variable `age`.
- `isAdmin` property into the variable `isAdmin` (false, if no such property)

Here’s an example of the values after your assignment:

    let user = { name: "John", years: 30 };

    // your code to the left side:
    // ... = user

    alert( name ); // John
    alert( age ); // 30
    alert( isAdmin ); // false

solution

<a href="destructuring-assignment.html#"
<a href="destructuring-assignment.html#"

    let user = {
      name: "John",
      years: 30
    };

    let {name, years: age, isAdmin = false} = user;

    alert( name ); // John
    alert( age ); // 30
    alert( isAdmin ); // false

### <a href="destructuring-assignment.html#the-maximal-salary" id="the-maximal-salary" class="main__anchor">The maximal salary</a>

<a href="task/max-salary.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There is a `salaries` object:

    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

Create the function `topSalary(salaries)` that returns the name of the top-paid person.

- If `salaries` is empty, it should return `null`.
- If there are multiple top-paid persons, return any of them.

P.S. Use `Object.entries` and destructuring to iterate over key/value pairs.

[Open a sandbox with tests.](https://plnkr.co/edit/E2ihC75K0EGKA6sR?p=preview)

solution

    function topSalary(salaries) {

      let maxSalary = 0;
      let maxName = null;

      for(const [name, salary] of Object.entries(salaries)) {
        if (maxSalary < salary) {
          maxSalary = salary;
          maxName = name;
        }
      }

      return maxName;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/zsLbuDmTWUKt5is0?p=preview)

<a href="keys-values-entries.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="date.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fdestructuring-assignment" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdestructuring-assignment" </a>

<a href="tutorial/map.html" class="map">

## <a href="destructuring-assignment.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="destructuring-assignment.html#array-destructuring" class="sidebar__link">Array destructuring</a>
- <a href="destructuring-assignment.html#object-destructuring" class="sidebar__link">Object destructuring</a>
- <a href="destructuring-assignment.html#nested-destructuring" class="sidebar__link">Nested destructuring</a>
- <a href="destructuring-assignment.html#smart-function-parameters" class="sidebar__link">Smart function parameters</a>
- <a href="destructuring-assignment.html#summary" class="sidebar__link">Summary</a>

- <a href="destructuring-assignment.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="destructuring-assignment.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fdestructuring-assignment" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdestructuring-assignment" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/10-destructuring-assignment" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
