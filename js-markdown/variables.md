EN

- <a href="https://ar.javascript.info/variables"
- <a href="variables.html"
- <a href="https://es.javascript.info/variables"
- <a href="https://fr.javascript.info/variables"
- variables"
  variables"

<!-- -->

- /variables"
- <a href=variables"
- <a href="https://tr.javascript.info/variables"
- <a href="https://zh.javascript.info/variables"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fvariables" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fvariables" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

21st July 2021

# Variables

Most of the time, a JavaScript application needs to work with information. Here are two examples:

1.  An online shop – the information might include goods being sold and a shopping cart.
2.  A chat application – the information might include users, messages, and much more.

Variables are used to store this information.

## <a href="variables.html#a-variable" id="a-variable" class="main__anchor">A variable</a>

A [variable](<https://en.wikipedia.org/wiki/Variable_(computer_science)>) is a “named storage” for data. We can use variables to store goodies, visitors, and other data.

To create a variable in JavaScript, use the `let` keyword.

The statement below creates (in other words: _declares_) a variable with the name “message”:

    let message;

Now, we can put some data into it by using the assignment operator `=`:

    let message;

    message = 'Hello'; // store the string 'Hello' in the variable named message

The string is now saved into the memory area associated with the variable. We can access it using the variable name:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let message;
    message = 'Hello!';

    alert(message); // shows the variable content

To be concise, we can combine the variable declaration and assignment into a single line:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let message = 'Hello!'; // define the variable and assign the value

    alert(message); // Hello!

We can also declare multiple variables in one line:

    let user = 'John', age = 25, message = 'Hello';

That might seem shorter, but we don’t recommend it. For the sake of better readability, please use a single line per variable.

The multiline variant is a bit longer, but easier to read:

    let user = 'John';
    let age = 25;
    let message = 'Hello';

Some people also define multiple variables in this multiline style:

    let user = 'John',
      age = 25,
      message = 'Hello';

…Or even in the “comma-first” style:

    let user = 'John'
      , age = 25
      , message = 'Hello';

Technically, all these variants do the same thing. So, it’s a matter of personal taste and aesthetics.

<span class="important__type">`var` instead of `let`</span>

In older scripts, you may also find another keyword: `var` instead of `let`:

    var message = 'Hello';

The `var` keyword is _almost_ the same as `let`. It also declares a variable, but in a slightly different, “old-school” way.

There are subtle differences between `let` and `var`, but they do not matter for us yet. We’ll cover them in detail in the chapter [The old "var"](var.html).

## <a href="variables.html#a-real-life-analogy" id="a-real-life-analogy" class="main__anchor">A real-life analogy</a>

We can easily grasp the concept of a “variable” if we imagine it as a “box” for data, with a uniquely-named sticker on it.

For instance, the variable `message` can be imagined as a box labeled `"message"` with the value `"Hello!"` in it:

<figure><img src="article/variables/variable.svg" width="166" height="145" /></figure>We can put any value in the box.

We can also change it as many times as we want:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let message;

    message = 'Hello!';

    message = 'World!'; // value changed

    alert(message);

When the value is changed, the old data is removed from the variable:

<figure><img src="article/variables/variable-change.svg" width="392" height="192" /></figure>We can also declare two variables and copy data from one into the other.

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let hello = 'Hello world!';

    let message;

    // copy 'Hello world' from hello into message
    message = hello;

    // now two variables hold the same data
    alert(hello); // Hello world!
    alert(message); // Hello world!

<span class="important__type">Declaring twice triggers an error</span>

A variable should be declared only once.

A repeated declaration of the same variable is an error:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let message = "This";

    // repeated 'let' leads to an error
    let message = "That"; // SyntaxError: 'message' has already been declared

So, we should declare a variable once and then refer to it without `let`.

<span class="important__type">Functional languages</span>

It’s interesting to note that there exist [functional](https://en.wikipedia.org/wiki/Functional_programming) programming languages, like [Scala](http://www.scala-lang.org/) or [Erlang](http://www.erlang.org/) that forbid changing variable values.

In such languages, once the value is stored “in the box”, it’s there forever. If we need to store something else, the language forces us to create a new box (declare a new variable). We can’t reuse the old one.

Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits. Studying such a language (even if you’re not planning to use it soon) is recommended to broaden the mind.

## <a href="variables.html#variable-naming" id="variable-naming" class="main__anchor">Variable naming</a>

There are two limitations on variable names in JavaScript:

1.  The name must contain only letters, digits, or the symbols `$` and `_`.
2.  The first character must not be a digit.

Examples of valid names:

    let userName;
    let test123;

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word except first starting with a capital letter: `myVeryLongName`.

What’s interesting – the dollar sign `'$'` and the underscore `'_'` can also be used in names. They are regular symbols, just like letters, without any special meaning.

These names are valid:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let $ = 1; // declared a variable with the name "$"
    let _ = 2; // and now a variable with the name "_"

    alert($ + _); // 3

Examples of incorrect variable names:

    let 1a; // cannot start with a digit

    let my-name; // hyphens '-' aren't allowed in the name

<span class="important__type">Case matters</span>

Variables named `apple` and `AppLE` are two different variables.

<span class="important__type">Non-Latin letters are allowed, but not recommended</span>

It is possible to use any language, including cyrillic letters or even hieroglyphs, like this:

    let имя = '...';
    let 我 = '...';

Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we’re writing a small script, it may have a long life ahead. People from other countries may need to read it some time.

<span class="important__type">Reserved names</span>

There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.

The code below gives a syntax error:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let let = 5; // can't name a variable "let", error!
    let return = 5; // also can't name it "return", error!

<span class="important__type">An assignment without `use strict`</span>

Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value without using `let`. This still works now if we don’t put `use strict` in our scripts to maintain compatibility with old scripts.

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // note: no "use strict" in this example

    num = 5; // the variable "num" is created if it didn't exist

    alert(num); // 5

This is a bad practice and would cause an error in strict mode:

    "use strict";

    num = 5; // error: num is not defined

## <a href="variables.html#constants" id="constants" class="main__anchor">Constants</a>

To declare a constant (unchanging) variable, use `const` instead of `let`:

    const myBirthday = '18.04.1982';

Variables declared using `const` are called “constants”. They cannot be reassigned. An attempt to do so would cause an error:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    const myBirthday = '18.04.1982';

    myBirthday = '01.01.2001'; // error, can't reassign the constant!

When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and clearly communicate that fact to everyone.

### <a href="variables.html#uppercase-constants" id="uppercase-constants" class="main__anchor">Uppercase constants</a>

There is a widespread practice to use constants as aliases for difficult-to-remember values that are known prior to execution.

Such constants are named using capital letters and underscores.

For instance, let’s make constants for colors in so-called “web” (hexadecimal) format:

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    const COLOR_RED = "#F00";
    const COLOR_GREEN = "#0F0";
    const COLOR_BLUE = "#00F";
    const COLOR_ORANGE = "#FF7F00";

    // ...when we need to pick a color
    let color = COLOR_ORANGE;
    alert(color); // #FF7F00

Benefits:

- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let’s make that clear.

Being a “constant” just means that a variable’s value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are _calculated_ in run-time, during the execution, but do not change after their initial assignment.

For instance:

    const pageLoadTime = /* time taken by a webpage to load */;

The value of `pageLoadTime` is not known prior to the page load, so it’s named normally. But it’s still a constant because it doesn’t change after assignment.

In other words, capital-named constants are only used as aliases for “hard-coded” values.

## <a href="variables.html#name-things-right" id="name-things-right" class="main__anchor">Name things right</a>

Talking about variables, there’s one more extremely important thing.

A variable name should have a clean, obvious meaning, describing the data that it stores.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it’s much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.

Some good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you’re doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It’s only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a “user” then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

<span class="important__type">Reuse or create?</span>

And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What’s inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit on variable declaration but lose ten times more on debugging.

An extra variable is good, not evil.

Modern JavaScript minifiers and browsers optimize code well enough, so it won’t create performance issues. Using different variables for different values can even help the engine optimize your code.

## <a href="variables.html#summary" id="summary" class="main__anchor">Summary</a>

We can declare variables to store data by using the `var`, `let`, or `const` keywords.

- `let` – is a modern variable declaration.
- `var` – is an old-school variable declaration. Normally we don’t use it at all, but we’ll cover subtle differences from `let` in the chapter [The old "var"](var.html), just in case you need them.
- `const` – is like `let`, but the value of the variable can’t be changed.

Variables should be named in a way that allows us to easily understand what’s inside them.

## <a href="variables.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="variables.html#working-with-variables" id="working-with-variables" class="main__anchor">Working with variables</a>

<a href="task/hello-variables.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

1.  Declare two variables: `admin` and `name`.
2.  Assign the value `"John"` to `name`.
3.  Copy the value from `name` to `admin`.
4.  Show the value of `admin` using `alert` (must output “John”).

solution

In the code below, each line corresponds to the item in the task list.

<a href="variables.html#"
<a href="variables.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let admin, name; // can declare two variables at once

    name = "John";

    admin = name;

    alert( admin ); // "John"

### <a href="variables.html#giving-the-right-name" id="giving-the-right-name" class="main__anchor">Giving the right name</a>

<a href="task/declare-variables.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

1.  Create a variable with the name of our planet. How would you name such a variable?
2.  Create a variable to store the name of a current visitor to a website. How would you name that variable?

solution

The variable for our planet

#### The variable for our planet

That’s simple:

    let ourPlanetName = "Earth";

Note, we could use a shorter name `planet`, but it might not be obvious what planet it refers to. It’s nice to be more verbose. At least until the variable isNotTooLong.

The name of the current visitor

#### The name of the current visitor

    let currentUserName = "John";

Again, we could shorten that to `userName` if we know for sure that the user is current.

Modern editors and autocomplete make long variable names easy to write. Don’t save on them. A name with 3 words in it is fine.

And if your editor does not have proper autocompletion, get [a new one](code-editors.html).

### <a href="variables.html#uppercase-const" id="uppercase-const" class="main__anchor">Uppercase const?</a>

<a href="task/uppercast-constant.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Examine the following code:

    const birthday = '18.04.1982';

    const age = someCode(birthday);

Here we have a constant `birthday` date and the `age` is calculated from `birthday` with the help of some code (it is not provided for shortness, and because details don’t matter here).

Would it be right to use upper case for `birthday`? For `age`? Or even for both?

    const BIRTHDAY = '18.04.1982'; // make uppercase?

    const AGE = someCode(BIRTHDAY); // make uppercase?

solution

We generally use upper case for constants that are “hard-coded”. Or, in other words, when the value is known prior to execution and directly written into the code.

In this code, `birthday` is exactly like that. So we could use the upper case for it.

In contrast, `age` is evaluated in run-time. Today we have one age, a year after we’ll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit “less of a constant” than `birthday`: it is calculated, so we should keep the lower case for it.

<a href="strict-mode.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="types.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fvariables" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fvariables" </a>

<a href="tutorial/map.html" class="map">

## <a href="variables.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="variables.html#a-variable" class="sidebar__link">A variable</a>
- <a href="variables.html#a-real-life-analogy" class="sidebar__link">A real-life analogy</a>
- <a href="variables.html#variable-naming" class="sidebar__link">Variable naming</a>
- <a href="variables.html#constants" class="sidebar__link">Constants</a>
- <a href="variables.html#name-things-right" class="sidebar__link">Name things right</a>
- <a href="variables.html#summary" class="sidebar__link">Summary</a>

- <a href="variables.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="variables.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fvariables" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fvariables" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/04-variables" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
