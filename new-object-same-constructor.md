new-object-same-constructor"

- <a href="new-object-same-constructor.html"
  /new-object-same-constructor"
  /new-object-same-constructor"
  new-object-same-constructornew-object-same-constructor"

<!-- -->

new-object-same-constructor"
new-object-same-constructor"
/new-object-same-constructor"
new-object-same-constructor"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fnew-object-same-constructor"%2Fnew-object-same-constructor" </a>

<a href="../prototypes.html" Prototypes, inheritance</span></a>

<a href="../function-prototype.html" F.prototype</span></a>

<a href="../function-prototype.html"

## Create an object with the same constructor

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Imagine, we have an arbitrary object `obj`, created by a constructor function – we don’t know which one, but we’d like to create a new object using it.

Can we do it like that?

    let obj2 = new obj.constructor();

Give an example of a constructor function for `obj` which lets such code work right. And an example that makes it work wrong.

solution

We can use such approach if we are sure that `"constructor"` property has the correct value.

For instance, if we don’t touch the default `"prototype"`, then this code works for sure:

<a href="new-object-same-constructor.html#"
<a href="new-object-same-constructor.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function User(name) {
      this.name = name;
    }

    let user = new User('John');
    let user2 = new user.constructor('Pete');

    alert( user2.name ); // Pete (worked!)

It worked, because `User.prototype.constructor == User`.

…But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `constructor` to reference `User`, then it would fail.

For instance:

<a href="new-object-same-constructor.html#"
<a href="new-object-same-constructor.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function User(name) {
      this.name = name;
    }
    User.prototype = {}; // (*)

    let user = new User('John');
    let user2 = new user.constructor('Pete');

    alert( user2.name ); // undefined

Why `user2.name` is `undefined`?

Here’s how `new user.constructor('Pete')` works:

1.  First, it looks for `constructor` in `user`. Nothing.
2.  Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we “forgot” to set it right!).
3.  Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`.
4.  Finally, for the built-in `Object.prototype`, there’s a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`.

Probably, that’s not what we want. We’d like to create `new User`, not `new Object`. That’s the outcome of the missing `constructor`.

(Just in case you’re curious, the `new Object(...)` call converts its argument to an object. That’s a theoretical thing, in practice no one calls `new Object` with a value, and generally we don’t use `new Object` to make objects at all).
