let-scope"

- <a href="let-scope.html"
  /let-scope"
  /let-scope"
- let-scope"

<!-- -->

- /"
- <a href="
- <a href="https://tr.javascript.info/"
  let-scope"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Flet-scope"%2Flet-scope" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Is variable visible?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

What will be the result of this code?

    let x = 1;

    function func() {
      console.log(x); // ?

      let x = 2;
    }

    func();

P.S. There’s a pitfall in this task. The solution is not obvious.

solution

The result is: **error**.

Try running it:

<a href="let-scope.html#"
<a href="let-scope.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let x = 1;

    function func() {
      console.log(x); // ReferenceError: Cannot access 'x' before initialization
      let x = 2;
    }

    func();

In this example we can observe the peculiar difference between a “non-existing” and “uninitialized” variable.

As you may have read in the article [Variable scope, closure](../closure.html), a variable starts in the “uninitialized” state from the moment when the execution enters a code block (or a function). And it stays uninitalized until the corresponding `let` statement.

In other words, a variable technically exists, but can’t be used before `let`.

The code above demonstrates it.

    function func() {
      // the local variable x is known to the engine from the beginning of the function,
      // but "uninitialized" (unusable) until let ("dead zone")
      // hence the error

      console.log(x); // ReferenceError: Cannot access 'x' before initialization

      let x = 2;
    }

This zone of temporary unusability of a variable (from the beginning of the code block till `let`) is sometimes called the “dead zone”.
