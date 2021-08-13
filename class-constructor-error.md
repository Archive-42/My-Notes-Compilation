class-constructor-error"

- <a href="class-constructor-error.html"
  class-constructor-error"
  /class-constructor-error"
- <a href="https://it.javascript.info/class-constructor-error"

<!-- -->

class-constructor-error"
/class-constructor-error"
/class-constructor-error"
ask/class-constructor-error"

k%2Fclass-constructor-error"%2Fclass-constructor-error" </a>

<a href="../classes.html" Classes</span></a>

<a href="../class-inheritance.html" Class inheritance</span></a>

<a href="../class-inheritance.html"

## Error creating an instance

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here’s the code with `Rabbit` extending `Animal`.

Unfortunately, `Rabbit` objects can’t be created. What’s wrong? Fix it.

<a href="class-constructor-error.html#"
<a href="class-constructor-error.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Animal {

      constructor(name) {
        this.name = name;
      }

    }

    class Rabbit extends Animal {
      constructor(name) {
        this.name = name;
        this.created = Date.now();
      }
    }

    let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
    alert(rabbit.name);

solution

That’s because the child constructor must call `super()`.

Here’s the corrected code:

<a href="class-constructor-error.html#"
<a href="class-constructor-error.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Animal {

      constructor(name) {
        this.name = name;
      }

    }

    class Rabbit extends Animal {
      constructor(name) {
        super(name);
        this.created = Date.now();
      }
    }

    let rabbit = new Rabbit("White Rabbit"); // ok now
    alert(rabbit.name); // White Rabbit
