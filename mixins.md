EN

- <a href="https://ar.javascript.info/mixins"
- <a href="mixins.html"
- <a href="https://es.javascript.info/mixins"
- <a href="https://fr.javascript.info/mixins"
- <a href="https://it.javascript.info/mixins"
  mixins"

<!-- -->

- <a href="https://ko.javascript.info/mixins"
- <a href=mixins"
- <a href="https://tr.javascript.info/mixins"
- <a href="https://zh.javascript.info/mixins"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmixins" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmixins" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="classes.html" Classes</span></a></span>

23rd January 2021

# Mixins

In JavaScript we can only inherit from a single object. There can be only one `[[Prototype]]` for an object. And a class may extend only one other class.

But sometimes that feels limiting. For instance, we have a class `StreetSweeper` and a class `Bicycle`, and want to make their mix: a `StreetSweepingBicycle`.

Or we have a class `User` and a class `EventEmitter` that implements event generation, and we’d like to add the functionality of `EventEmitter` to `User`, so that our users can emit events.

There’s a concept that can help here, called “mixins”.

As defined in Wikipedia, a [mixin](https://en.wikipedia.org/wiki/Mixin) is a class containing methods that can be used by other classes without a need to inherit from it.

In other words, a _mixin_ provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes.

## <a href="mixins.html#a-mixin-example" id="a-mixin-example" class="main__anchor">A mixin example</a>

The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.

For instance here the mixin `sayHiMixin` is used to add some “speech” for `User`:

<a href="mixins.html#"
<a href="mixins.html#"

    // mixin
    let sayHiMixin = {
      sayHi() {
        alert(`Hello ${this.name}`);
      },
      sayBye() {
        alert(`Bye ${this.name}`);
      }
    };

    // usage:
    class User {
      constructor(name) {
        this.name = name;
      }
    }

    // copy the methods
    Object.assign(User.prototype, sayHiMixin);

    // now User can say hi
    new User("Dude").sayHi(); // Hello Dude!

There’s no inheritance, but a simple method copying. So `User` may inherit from another class and also include the mixin to “mix-in” the additional methods, like this:

    class User extends Person {
      // ...
    }

    Object.assign(User.prototype, sayHiMixin);

Mixins can make use of inheritance inside themselves.

For instance, here `sayHiMixin` inherits from `sayMixin`:

<a href="mixins.html#"
<a href="mixins.html#"

    let sayMixin = {
      say(phrase) {
        alert(phrase);
      }
    };

    let sayHiMixin = {
      __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

      sayHi() {
        // call parent method
        super.say(`Hello ${this.name}`); // (*)
      },
      sayBye() {
        super.say(`Bye ${this.name}`); // (*)
      }
    };

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    // copy the methods
    Object.assign(User.prototype, sayHiMixin);

    // now User can say hi
    new User("Dude").sayHi(); // Hello Dude!

Please note that the call to the parent method `super.say()` from `sayHiMixin` (at lines labelled with `(*)`) looks for the method in the prototype of that mixin, not the class.

Here’s the diagram (see the right part):

<figure><img src="article/mixins/mixin-inheritance.svg" width="486" height="295" /></figure>That’s because methods `sayHi` and `sayBye` were initially created in `sayHiMixin`. So even though they got copied, their `[[HomeObject]]` internal property references `sayHiMixin`, as shown in the picture above.

As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`, not `User.[[Prototype]]`.

## <a href="mixins.html#eventmixin" id="eventmixin" class="main__anchor">EventMixin</a>

Now let’s make a mixin for real life.

An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to “broadcast information” to anyone who wants it. So let’s make a mixin that allows us to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to “generate an event” when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call.
- …And the method `.off(name, handler)` that removes the `handler` listener.

After adding the mixin, an object `user` will be able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen for such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here’s the code:

<a href="mixins.html#"
<a href="mixins.html#"

    let eventMixin = {
      /**
       * Subscribe to event, usage:
       *  menu.on('select', function(item) { ... }
      */
      on(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
          this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
      },

      /**
       * Cancel the subscription, usage:
       *  menu.off('select', handler)
       */
      off(eventName, handler) {
        let handlers = this._eventHandlers?.[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
          if (handlers[i] === handler) {
            handlers.splice(i--, 1);
          }
        }
      },

      /**
       * Generate an event with the given name and data
       *  this.trigger('select', data1, data2);
       */
      trigger(eventName, ...args) {
        if (!this._eventHandlers?.[eventName]) {
          return; // no handlers for that event name
        }

        // call the handlers
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
      }
    };

- `.on(eventName, handler)` – assigns function `handler` to run when the event with that name occurs. Technically, there’s an `_eventHandlers` property that stores an array of handlers for each event name, and it just adds it to the list.
- `.off(eventName, handler)` – removes the function from the handlers list.
- `.trigger(eventName, ...args)` – generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.

Usage:

<a href="mixins.html#"
<a href="mixins.html#"

    // Make a class
    class Menu {
      choose(value) {
        this.trigger("select", value);
      }
    }
    // Add the mixin with event-related methods
    Object.assign(Menu.prototype, eventMixin);

    let menu = new Menu();

    // add a handler, to be called on selection:
    menu.on("select", value => alert(`Value selected: ${value}`));

    // triggers the event => the handler above runs and shows:
    // Value selected: 123
    menu.choose("123");

Now, if we’d like any code to react to a menu selection, we can listen for it with `menu.on(...)`.

And `eventMixin` mixin makes it easy to add such behavior to as many classes as we’d like, without interfering with the inheritance chain.

## <a href="mixins.html#summary" id="summary" class="main__anchor">Summary</a>

_Mixin_ – is a generic object-oriented programming term: a class that contains methods for other classes.

Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.

<a href="instanceof.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="error-handling.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmixins" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmixins" </a>

<a href="tutorial/map.html" class="map">

## <a href="mixins.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="classes.html" class="sidebar__link">Classes</a>

#### Lesson navigation

- <a href="mixins.html#a-mixin-example" class="sidebar__link">A mixin example</a>
- <a href="mixins.html#eventmixin" class="sidebar__link">EventMixin</a>
- <a href="mixins.html#summary" class="sidebar__link">Summary</a>

- <a href="mixins.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmixins" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmixins" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/09-classes/07-mixins" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
