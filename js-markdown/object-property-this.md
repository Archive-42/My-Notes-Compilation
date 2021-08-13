object-property-this"

- <a href="object-property-this.html"
  /object-property-this"
  /object-property-this"
  object-property-thisobject-property-this"

<!-- -->

object-property-this"
object-property-this"
/object-property-this"
object-property-this"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fobject-property-this"%2Fobject-property-this" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../object-methods.html" Object methods, "this"</span></a>

<a href="../object-methods.html"

## Using "this" in object literal

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here the function `makeUser` returns an object.

What is the result of accessing its `ref`? Why?

    function makeUser() {
      return {
        name: "John",
        ref: this
      };
    }

    let user = makeUser();

    alert( user.ref.name ); // What's the result?

solution

**Answer: an error.**

Try it:

<a href="object-property-this.html#"
<a href="object-property-this.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeUser() {
      return {
        name: "John",
        ref: this
      };
    }

    let user = makeUser();

    alert( user.ref.name ); // Error: Cannot read property 'name' of undefined

That’s because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with “dot” syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.

So `ref: this` actually takes current `this` of the function.

We can rewrite the function and return the same `this` with `undefined` value:

<a href="object-property-this.html#"
<a href="object-property-this.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeUser(){
      return this; // this time there's no object literal
    }

    alert( makeUser().name ); // Error: Cannot read property 'name' of undefined

As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here’s the opposite case:

<a href="object-property-this.html#"
<a href="object-property-this.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeUser() {
      return {
        name: "John",
        ref() {
          return this;
        }
      };
    }

    let user = makeUser();

    alert( user.ref().name ); // John

Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
