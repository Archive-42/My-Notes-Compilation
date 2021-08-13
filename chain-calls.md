chain-calls"

- <a href="chain-calls.html"
  chain-calls"
  /chain-calls"
  chain-callschain-calls"

<!-- -->

chain-calls"
/chain-calls"
/chain-calls"
ask/chain-calls"k%2Fchain-calls"%2Fchain-calls" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../object-methods.html" Object methods, "this"</span></a>

<a href="../object-methods.html"

## Chaining

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

There’s a `ladder` object that allows to go up and down:

    let ladder = {
      step: 0,
      up() {
        this.step++;
      },
      down() {
        this.step--;
      },
      showStep: function() { // shows the current step
        alert( this.step );
      }
    };

Now, if we need to make several calls in sequence, can do it like this:

    ladder.up();
    ladder.up();
    ladder.down();
    ladder.showStep(); // 1

Modify the code of `up`, `down` and `showStep` to make the calls chainable, like this:

    ladder.up().up().down().showStep(); // 1

Such approach is widely used across JavaScript libraries.

[Open a sandbox with tests.](https://plnkr.co/edit/0xLdTTzOOYbWQtqN?p=preview)

solution

The solution is to return the object itself from every call.

<a href="chain-calls.html#"
<a href="chain-calls.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let ladder = {
      step: 0,
      up() {
        this.step++;
        return this;
      },
      down() {
        this.step--;
        return this;
      },
      showStep() {
        alert( this.step );
        return this;
      }
    };

    ladder.up().up().down().up().down().showStep(); // 1

We also can write a single call per line. For long chains it’s more readable:

    ladder
      .up()
      .up()
      .down()
      .up()
      .down()
      .showStep(); // 1

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/ZHJkcGTien66f0ix?p=preview)
