closure-latest-changes"

- <a href="closure-latest-changes.html"
  closure-latest-changes"
  /closure-latest-changes"
- <a href="https://it.javascript.info/closure-latest-changes"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href="
- <a href="https://tr.javascript.info/"
  closure-latest-changes"

k%2Fclosure-latest-changes"%2Fclosure-latest-changes" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Does a function pickup latest changes?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The function sayHi uses an external variable name. When the function runs, which value is it going to use?

    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    sayHi(); // what will it show: "John" or "Pete"?

Such situations are common both in browser and server-side development. A function may be scheduled to execute later than it is created, for instance after a user action or a network request.

So, the question is: does it pick up the latest changes?

solution

The answer is: **Pete**.

A function gets outer variables as they are now, it uses the most recent values.

Old variable values are not saved anywhere. When a function wants a variable, it takes the current value from its own Lexical Environment or the outer one.
