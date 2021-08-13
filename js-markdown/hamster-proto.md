hamster-proto"

- <a href="hamster-proto.html"
  /hamster-proto"
  /hamster-proto"
  hamster-protohamster-proto"

<!-- -->

hamster-proto"
hamster-proto"
/hamster-proto"
hamster-proto"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fhamster-proto"%2Fhamster-proto" </a>

## Why are both hamsters full?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have two hamsters: `speedy` and `lazy` inheriting from the general `hamster` object.

When we feed one of them, the other one is also full. Why? How can we fix it?

<a href="hamster-proto.html#"
<a href="hamster-proto.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      __proto__: hamster
    };

    let lazy = {
      __proto__: hamster
    };

    // This one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // This one also has it, why? fix please.
    alert( lazy.stomach ); // apple

solution

Let’s look carefully at what’s going on in the call `speedy.eat("apple")`.

1.  The method `speedy.eat` is found in the prototype (`=hamster`), then executed with `this=speedy` (the object before the dot).

2.  Then `this.stomach.push()` needs to find `stomach` property and call `push` on it. It looks for `stomach` in `this` (`=speedy`), but nothing found.

3.  Then it follows the prototype chain and finds `stomach` in `hamster`.

4.  Then it calls `push` on it, adding the food into _the stomach of the prototype_.

So all hamsters share a single stomach!

Both for `lazy.stomach.push(...)` and `speedy.stomach.push()`, the property `stomach` is found in the prototype (as it’s not in the object itself), then the new data is pushed into it.

Please note that such thing doesn’t happen in case of a simple assignment `this.stomach=`:

<a href="hamster-proto.html#"
<a href="hamster-proto.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let hamster = {
      stomach: [],

      eat(food) {
        // assign to this.stomach instead of this.stomach.push
        this.stomach = [food];
      }
    };

    let speedy = {
       __proto__: hamster
    };

    let lazy = {
      __proto__: hamster
    };

    // Speedy one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Lazy one's stomach is empty
    alert( lazy.stomach ); // <nothing>

Now all works fine, because `this.stomach=` does not perform a lookup of `stomach`. The value is written directly into `this` object.

Also we can totally avoid the problem by making sure that each hamster has their own stomach:

<a href="hamster-proto.html#"
<a href="hamster-proto.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      __proto__: hamster,
      stomach: []
    };

    let lazy = {
      __proto__: hamster,
      stomach: []
    };

    // Speedy one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Lazy one's stomach is empty
    alert( lazy.stomach ); // <nothing>

As a common solution, all properties that describe the state of a particular object, like `stomach` above, should be written into that object. That prevents such problems.
