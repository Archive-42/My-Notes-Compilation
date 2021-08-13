EN

- <a href="https://ar.javascript.info/"
- <a href="changing-prototype.html"
  changing-prototype"
  /changing-prototype"
  changing-prototypechanging-prototype"

<!-- -->

changing-prototype"
/changing-prototype"
/changing-prototype"
ask/changing-prototype"k%2Fchanging-prototype"%2Fchanging-prototype" </a>

<a href="../prototypes.html" Prototypes, inheritance</span></a>

<a href="../function-prototype.html" F.prototype</span></a>

<a href="../function-prototype.html"

## Changing "prototype"

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the code below we create `new Rabbit`, and then try to modify its prototype.

In the start, we have this code:

<a href="changing-prototype.html#"
<a href="changing-prototype.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    alert( rabbit.eats ); // true

1.  We added one more string (emphasized). What will `alert` show now?

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        Rabbit.prototype = {};

        alert( rabbit.eats ); // ?

2.  …And if the code is like this (replaced one line)?

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        Rabbit.prototype.eats = false;

        alert( rabbit.eats ); // ?

3.  And like this (replaced one line)?

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        delete rabbit.eats;

        alert( rabbit.eats ); // ?

4.  The last variant:

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        delete Rabbit.prototype.eats;

        alert( rabbit.eats ); // ?

solution

Answers:

1.  `true`.

    The assignment to `Rabbit.prototype` sets up `[[Prototype]]` for new objects, but it does not affect the existing ones.

2.  `false`.

    Objects are assigned by reference. The object from `Rabbit.prototype` is not duplicated, it’s still a single object referenced both by `Rabbit.prototype` and by the `[[Prototype]]` of `rabbit`.

    So when we change its content through one reference, it is visible through the other one.

3.  `true`.

    All `delete` operations are applied directly to the object. Here `delete rabbit.eats` tries to remove `eats` property from `rabbit`, but it doesn’t have it. So the operation won’t have any effect.

4.  `undefined`.

    The property `eats` is deleted from the prototype, it doesn’t exist any more.
