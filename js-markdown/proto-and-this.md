proto-and-this"

- <a href="proto-and-this.html"
  /proto-and-this"
  /proto-and-this"
  proto-and-thisproto-and-this"

<!-- -->

proto-and-this"
proto-and-this"
/proto-and-this"
proto-and-this"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fproto-and-this"%2Fproto-and-this" </a>

## Where does it write?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have `rabbit` inheriting from `animal`.

If we call `rabbit.eat()`, which object receives the `full` property: `animal` or `rabbit`?

    let animal = {
      eat() {
        this.full = true;
      }
    };

    let rabbit = {
      __proto__: animal
    };

    rabbit.eat();

solution

**The answer: `rabbit`.**

That’s because `this` is an object before the dot, so `rabbit.eat()` modifies `rabbit`.

Property lookup and execution are two different things.

The method `rabbit.eat` is first found in the prototype, then executed with `this=rabbit`.
