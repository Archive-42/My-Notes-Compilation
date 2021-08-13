counter-object-independent"

- <a href="counter-object-independent.html"
  /counter-object-independent"
  /counter-object-independent"
  counter-object-independentcounter-object-independent"

<!-- -->

counter-object-independent"
counter-object-independent"
/counter-object-independent"
counter-object-independent"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fcounter-object-independent"%2Fcounter-object-independent" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Counter object

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here a counter object is made with the help of the constructor function.

Will it work? What will it show?

    function Counter() {
      let count = 0;

      this.up = function() {
        return ++count;
      };
      this.down = function() {
        return --count;
      };
    }

    let counter = new Counter();

    alert( counter.up() ); // ?
    alert( counter.up() ); // ?
    alert( counter.down() ); // ?

solution

Surely it will work just fine.

Both nested functions are created within the same outer Lexical Environment, so they share access to the same `count` variable:

<a href="counter-object-independent.html#"
<a href="counter-object-independent.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function Counter() {
      let count = 0;

      this.up = function() {
        return ++count;
      };

      this.down = function() {
        return --count;
      };
    }

    let counter = new Counter();

    alert( counter.up() ); // 1
    alert( counter.up() ); // 2
    alert( counter.down() ); // 1
