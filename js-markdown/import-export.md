EN

- <a href="https://ar.javascript.info/import-export"
- <a href="import-export.html"
- <a href="https://es.javascript.info/import-export"
- <a href="https://fr.javascript.info/import-export"
- <a href="https://it.javascript.info/import-export"
  import-export"

<!-- -->

- <a href="https://ko.javascript.info/import-export"
- <a href=import-export"
- <a href="https://tr.javascript.info/import-export"
- <a href="https://zh.javascript.info/import-export"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fimport-export" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fimport-export" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="modules.html" Modules</span></a></span>

13th March 2021

# Export and Import

Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let’s explore more examples.

## <a href="import-export.html#export-before-declarations" id="export-before-declarations" class="main__anchor">Export before declarations</a>

We can label any declaration as exported by placing `export` before it, be it a variable, function or a class.

For instance, here all exports are valid:

    // export an array
    export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // export a constant
    export const MODULES_BECAME_STANDARD_YEAR = 2015;

    // export a class
    export class User {
      constructor(name) {
        this.name = name;
      }
    }

<span class="important__type">No semicolons after export class/function</span>

Please note that `export` before a class or a function does not make it a [function expression](function-expressions.html). It’s still a function declaration, albeit exported.

Most JavaScript style guides don’t recommend semicolons after function and class declarations.

That’s why there’s no need for a semicolon at the end of `export class` and `export function`:

    export function sayHi(user) {
      alert(`Hello, ${user}!`);
    }  // no ; at the end

## <a href="import-export.html#export-apart-from-declarations" id="export-apart-from-declarations" class="main__anchor">Export apart from declarations</a>

Also, we can put `export` separately.

Here we first declare, and then export:

    // 📁 say.js
    function sayHi(user) {
      alert(`Hello, ${user}!`);
    }

    function sayBye(user) {
      alert(`Bye, ${user}!`);
    }

    export {sayHi, sayBye}; // a list of exported variables

…Or, technically we could put `export` above functions as well.

## <a href="import-export.html#import" id="import" class="main__anchor">Import \*</a>

Usually, we put a list of what to import in curly braces `import {...}`, like this:

    // 📁 main.js
    import {sayHi, sayBye} from './say.js';

    sayHi('John'); // Hello, John!
    sayBye('John'); // Bye, John!

But if there’s a lot to import, we can import everything as an object using `import * as <obj>`, for instance:

    // 📁 main.js
    import * as say from './say.js';

    say.sayHi('John');
    say.sayBye('John');

At first sight, “import everything” seems such a cool thing, short to write, why should we ever explicitly list what we need to import?

Well, there are few reasons.

1.  Modern build tools ([webpack](http://webpack.github.io) and others) bundle modules together and optimize them to speedup loading and remove unused stuff.

    Let’s say, we added a 3rd-party library `say.js` to our project with many functions:

        // 📁 say.js
        export function sayHi() { ... }
        export function sayBye() { ... }
        export function becomeSilent() { ... }

    Now if we only use one of `say.js` functions in our project:

        // 📁 main.js
        import {sayHi} from './say.js';

    …Then the optimizer will see that and remove the other functions from the bundled code, thus making the build smaller. That is called “tree-shaking”.

2.  Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.

3.  Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

## <a href="import-export.html#import-as" id="import-as" class="main__anchor">Import “as”</a>

We can also use `as` to import under different names.

For instance, let’s import `sayHi` into the local variable `hi` for brevity, and import `sayBye` as `bye`:

    // 📁 main.js
    import {sayHi as hi, sayBye as bye} from './say.js';

    hi('John'); // Hello, John!
    bye('John'); // Bye, John!

## <a href="import-export.html#export-as" id="export-as" class="main__anchor">Export “as”</a>

The similar syntax exists for `export`.

Let’s export functions as `hi` and `bye`:

    // 📁 say.js
    ...
    export {sayHi as hi, sayBye as bye};

Now `hi` and `bye` are official names for outsiders, to be used in imports:

    // 📁 main.js
    import * as say from './say.js';

    say.hi('John'); // Hello, John!
    say.bye('John'); // Bye, John!

## <a href="import-export.html#export-default" id="export-default" class="main__anchor">Export default</a>

In practice, there are mainly two kinds of modules.

1.  Modules that contain a library, pack of functions, like `say.js` above.
2.  Modules that declare a single entity, e.g. a module `user.js` exports only `class User`.

Mostly, the second approach is preferred, so that every “thing” resides in its own module.

Naturally, that requires a lot of files, as everything wants its own module, but that’s not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` (“the default export”) syntax to make the “one thing per module” way look better.

Put `export default` before the entity to export:

    // 📁 user.js
    export default class User { // just add "default"
      constructor(name) {
        this.name = name;
      }
    }

There may be only one `export default` per file.

…And then import it without curly braces:

    // 📁 main.js
    import User from './user.js'; // not {User}, just User

    new User('John');

Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named exports and doesn’t need them for the default one.

<table><thead><tr class="header"><th>Named export</th><th>Default export</th></tr></thead><tbody><tr class="odd"><td><code>export class User {...}</code></td><td><code>export default class User {...}</code></td></tr><tr class="even"><td><code>import {User} from ...</code></td><td><code>import User from ...</code></td></tr></tbody></table>

Technically, we may have both default and named exports in a single module, but in practice people usually don’t mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.

For instance, these are all perfectly valid default exports:

    export default class { // no class name
      constructor() { ... }
    }

    export default function(user) { // no function name
      alert(`Hello, ${user}!`);
    }

    // export a single value, without making a variable
    export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Not giving a name is fine, because there is only one `export default` per file, so `import` without curly braces knows what to import.

Without `default`, such an export would give an error:

    export class { // Error! (non-default export needs a name)
      constructor() {}
    }

### <a href="import-export.html#the-default-name" id="the-default-name" class="main__anchor">The “default” name</a>

In some situations the `default` keyword is used to reference the default export.

For example, to export a function separately from its definition:

    function sayHi(user) {
      alert(`Hello, ${user}!`);
    }

    // same as if we added "export default" before the function
    export {sayHi as default};

Or, another situation, let’s say a module `user.js` exports one main “default” thing, and a few named ones (rarely the case, but it happens):

    // 📁 user.js
    export default class User {
      constructor(name) {
        this.name = name;
      }
    }

    export function sayHi(user) {
      alert(`Hello, ${user}!`);
    }

Here’s how to import the default export along with a named one:

    // 📁 main.js
    import {default as User, sayHi} from './user.js';

    new User('John');

And, finally, if importing everything `*` as an object, then the `default` property is exactly the default export:

    // 📁 main.js
    import * as user from './user.js';

    let User = user.default; // the default export
    new User('John');

### <a href="import-export.html#a-word-against-default-exports" id="a-word-against-default-exports" class="main__anchor">A word against default exports</a>

Named exports are explicit. They exactly name what they import, so we have that information from them; that’s a good thing.

Named exports force us to use exactly the right name to import:

    import {User} from './user.js';
    // import {MyUser} won't work, the name must be {User}

…While for a default export, we always choose the name when importing:

    import User from './user.js'; // works
    import MyUser from './user.js'; // works too
    // could be import Anything... and it'll still work

So team members may use different names to import the same thing, and that’s not good.

Usually, to avoid that and keep the code consistent, there’s a rule that imported variables should correspond to file names, e.g:

    import User from './user.js';
    import LoginForm from './loginForm.js';
    import func from '/path/to/func.js';
    ...

Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it’s still exported under a name, without `default`.

That also makes re-export (see below) a little bit easier.

## <a href="import-export.html#re-export" id="re-export" class="main__anchor">Re-export</a>

“Re-export” syntax `export ... from ...` allows to import things and immediately export them (possibly under another name), like this:

    export {sayHi} from './say.js'; // re-export sayHi

    export {default as User} from './user.js'; // re-export default

Why would that be needed? Let’s see a practical use case.

Imagine, we’re writing a “package”: a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don’t have to use them), and many modules are just “helpers”, for internal use in other package modules.

The file structure could be like this:

    auth/
        index.js
        user.js
        helpers.js
        tests/
            login.js
        providers/
            github.js
            facebook.js
            ...

We’d like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import only from the “main file” `auth/index.js`.

Like this:

    import {login, logout} from 'auth/index.js'

The “main file”, `auth/index.js` exports all the functionality that we’d like to provide in our package.

The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what’s necessary in `auth/index.js` and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into `auth/index.js` and export from it:

    // 📁 auth/index.js

    // import login/logout and immediately export them
    import {login, logout} from './helpers.js';
    export {login, logout};

    // import default as User and export it
    import User from './user.js';
    export {User};
    ...

Now users of our package can `import {login} from "auth/index.js"`.

The syntax `export ... from ...` is just a shorter notation for such import-export:

    // 📁 auth/index.js
    // re-export login/logout
    export {login, logout} from './helpers.js';

    // re-export the default export as User
    export {default as User} from './user.js';
    ...

The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren’t available in the current file. So inside the above example of `auth/index.js` we can’t use re-exported `login/logout` functions.

### <a href="import-export.html#re-exporting-the-default-export" id="re-exporting-the-default-export" class="main__anchor">Re-exporting the default export</a>

The default export needs separate handling when re-exporting.

Let’s say we have `user.js` with the `export default class User` and would like to re-export it:

    // 📁 user.js
    export default class User {
      // ...
    }

We can come across two problems with it:

1.  `export User from './user.js'` won’t work. That would lead to a syntax error.

    To re-export the default export, we have to write `export {default as User}`, as in the example above.

2.  `export * from './user.js'` re-exports only named exports, but ignores the default one.

    If we’d like to re-export both named and the default export, then two statements are needed:

        export * from './user.js'; // to re-export named exports
        export {default} from './user.js'; // to re-export the default export

Such oddities of re-exporting a default export are one of the reasons why some developers don’t like default exports and prefer named ones.

## <a href="import-export.html#summary" id="summary" class="main__anchor">Summary</a>

Here are all types of `export` that we covered in this and previous articles.

You can check yourself by reading them and recalling what they mean:

- Before declaration of a class/function/…:
  - `export [default] class/function/variable ...`
- Standalone export:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (doesn’t re-export default).
  - `export {default [as y]} from "module"` (re-export default).

Import:

- Importing named exports:
  - `import {x [as y], ...} from "module"`
- Importing the default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import all:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign any of its exports to variables:
  - `import "module"`

We can put `import/export` statements at the top or at the bottom of a script, that doesn’t matter.

So, technically this code is fine:

    sayHi();

    // ...

    import {sayHi} from './say.js'; // import at the end of the file

In practice imports are usually at the start of the file, but that’s only for more convenience.

**Please note that import/export statements don’t work if inside `{...}`.**

A conditional import, like this, won’t work:

    if (something) {
      import {sayHi} from "./say.js"; // Error: import must be at top level
    }

…But what if we really need to import something conditionally? Or at the right time? Like, load a module upon request, when it’s really needed?

We’ll see dynamic imports in the next article.

<a href="modules-intro.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="modules-dynamic-imports.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fimport-export" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fimport-export" </a>

<a href="tutorial/map.html" class="map">

## <a href="import-export.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="modules.html" class="sidebar__link">Modules</a>

#### Lesson navigation

- <a href="import-export.html#export-before-declarations" class="sidebar__link">Export before declarations</a>
- <a href="import-export.html#export-apart-from-declarations" class="sidebar__link">Export apart from declarations</a>
- <a href="import-export.html#import" class="sidebar__link">Import \*</a>
- <a href="import-export.html#import-as" class="sidebar__link">Import “as”</a>
- <a href="import-export.html#export-as" class="sidebar__link">Export “as”</a>
- <a href="import-export.html#export-default" class="sidebar__link">Export default</a>
- <a href="import-export.html#re-export" class="sidebar__link">Re-export</a>
- <a href="import-export.html#summary" class="sidebar__link">Summary</a>

- <a href="import-export.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fimport-export" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fimport-export" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/13-modules/02-import-export" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
