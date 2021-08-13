make-army"

- <a href="make-army.html"
  /make-army"
  /make-army"
  make-armymake-army"

<!-- -->

make-army"

- <a href="
- <a href="https://tr.javascript.info/"
  make-army"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmake-army"%2Fmake-army" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Army of functions

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The following code creates an array of `shooters`.

Every function is meant to output its number. But something is wrong…

<a href="make-army.html#"
<a href="make-army.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeArmy() {
      let shooters = [];

      let i = 0;
      while (i < 10) {
        let shooter = function() { // create a shooter function,
          alert( i ); // that should show its number
        };
        shooters.push(shooter); // and add it to the array
        i++;
      }

      // ...and return the array of shooters
      return shooters;
    }

    let army = makeArmy();

    // all shooters show 10 instead of their numbers 0, 1, 2, 3...
    army[0](); // 10 from the shooter number 0
    army[1](); // 10 from the shooter number 1
    army[2](); // 10 ...and so on.

Why do all of the shooters show the same value?

Fix the code so that they work as intended.

[Open a sandbox with tests.](https://plnkr.co/edit/8w4yuF196lp6VlqZ?p=preview)

solution

Let’s examine what exactly happens inside `makeArmy`, and the solution will become obvious.

1.  It creates an empty array `shooters`:

        let shooters = [];

2.  Fills it with functions via `shooters.push(function)` in the loop.

    Every element is a function, so the resulting array looks like this:

        shooters = [
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); }
        ];

3.  The array is returned from the function.

    Then, later, the call to any member, e.g. `army[5]()` will get the element `army[5]` from the array (which is a function) and calls it.

    Now why do all such functions show the same value, `10`?

    That’s because there’s no local variable `i` inside `shooter` functions. When such a function is called, it takes `i` from its outer lexical environment.

    Then, what will be the value of `i`?

    If we look at the source:

        function makeArmy() {
          ...
          let i = 0;
          while (i < 10) {
            let shooter = function() { // shooter function
              alert( i ); // should show its number
            };
            shooters.push(shooter); // add function to the array
            i++;
          }
          ...
        }

    We can see that all `shooter` functions are created in the lexical environment of `makeArmy()` function. But when `army[5]()` is called, `makeArmy` has already finished its job, and the final value of `i` is `10` (`while` stops at `i=10`).

    As the result, all `shooter` functions get the same value from the outer lexical environment and that is, the last value, `i=10`.

    <figure><img src="make-army/lexenv-makearmy-empty.svg" width="566" height="183" /></figure>As you can see above, on each iteration of a `while {...}` block, a new lexical environment is created. So, to fix this, we can copy the value of `i` into a variable within the `while {...}` block, like this:

    <a href="make-army.html#"
    <a href="make-army.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        function makeArmy() {
          let shooters = [];

          let i = 0;
          while (i < 10) {
              let j = i;
              let shooter = function() { // shooter function
                alert( j ); // should show its number
              };
            shooters.push(shooter);
            i++;
          }

          return shooters;
        }

        let army = makeArmy();

        // Now the code works correctly
        army[0](); // 0
        army[5](); // 5

    Here `let j = i` declares an “iteration-local” variable `j` and copies `i` into it. Primitives are copied “by value”, so we actually get an independent copy of `i`, belonging to the current loop iteration.

    The shooters work correctly, because the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds to the current loop iteration:

    <figure><img src="make-army/lexenv-makearmy-while-fixed.svg" width="566" height="183" /></figure>Such a problem could also be avoided if we used `for` in the beginning, like this:

    <a href="make-army.html#"
    <a href="make-army.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        function makeArmy() {

          let shooters = [];

          for(let i = 0; i < 10; i++) {
            let shooter = function() { // shooter function
              alert( i ); // should show its number
            };
            shooters.push(shooter);
          }

          return shooters;
        }

        let army = makeArmy();

        army[0](); // 0
        army[5](); // 5

    That’s essentially the same, because `for` on each iteration generates a new lexical environment, with its own variable `i`. So `shooter` generated in every iteration references its own `i`, from that very iteration.

    <figure><img src="make-army/lexenv-makearmy-for-fixed.svg" width="566" height="183" /></figure>

Now, as you’ve put so much effort into reading this, and the final recipe is so simple – just use `for`, you may wonder – was it worth that?

Well, if you could easily answer the question, you wouldn’t read the solution. So, hopefully this task must have helped you to understand things a bit better.

Besides, there are indeed cases when one prefers `while` to `for`, and other scenarios, where such problems are real.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/moTUxIo7637GFYmE?p=preview)
