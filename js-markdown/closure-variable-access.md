closure-variable-access"

- <a href="closure-variable-access.html"
  closure-variable-access"
  /closure-variable-access"
- closure-variable-access"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href="
- <a href="https://tr.javascript.info/"
  closure-variable-access"

k%2Fclosure-variable-access"%2Fclosure-variable-access" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Which variables are available?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The function `makeWorker` below makes another function and returns it. That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the invocation place, or both?

    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // create a function
    let work = makeWorker();

    // call it
    work(); // what will it show?

Which value it will show? “Pete” or “John”?

solution

The answer is: **Pete**.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

<figure><img src="closure-variable-access/lexenv-nested-work.svg" width="762" height="225" /></figure>So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case the result would be `"John"`.
