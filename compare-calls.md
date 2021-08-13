compare-calls"

- <a href="compare-calls.html"
  /compare-calls"
  /compare-calls"
  compare-callscompare-calls"

<!-- -->

compare-calls"
/compare-calls"
/compare-calls"
compare-calls"

k%2Fcompare-calls"%2Fcompare-calls" </a>

<a href="../prototypes.html" Prototypes, inheritance</span></a>

<a href="../prototype-methods.html" Prototype methods, objects without **proto**</span></a>

<a href="../prototype-methods.html"

## The difference between calls

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let’s create a new `rabbit` object:

    function Rabbit(name) {
      this.name = name;
    }
    Rabbit.prototype.sayHi = function() {
      alert(this.name);
    };

    let rabbit = new Rabbit("Rabbit");

These calls do the same thing or not?

    rabbit.sayHi();
    Rabbit.prototype.sayHi();
    Object.getPrototypeOf(rabbit).sayHi();
    rabbit.__proto__.sayHi();

solution

The first call has `this == rabbit`, the other ones have `this` equal to `Rabbit.prototype`, because it’s actually the object before the dot.

So only the first call shows `Rabbit`, other ones show `undefined`:

<a href="compare-calls.html#"
<a href="compare-calls.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function Rabbit(name) {
      this.name = name;
    }
    Rabbit.prototype.sayHi = function() {
      alert( this.name );
    }

    let rabbit = new Rabbit("Rabbit");

    rabbit.sayHi();                        // Rabbit
    Rabbit.prototype.sayHi();              // undefined
    Object.getPrototypeOf(rabbit).sayHi(); // undefined
    rabbit.__proto__.sayHi();              // undefined
