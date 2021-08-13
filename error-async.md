error-async"

- <a href="error-async.html"
  /error-async"
  /error-async"
  error-asyncerror-async"

<!-- -->

error-async"
error-async"

- <a href="https://tr.javascript.info/"
  error-async"

k%2Ferror-async"%2Ferror-async" </a>

<a href="../async.html" Promises, async/await</span></a>

<a href="../promise-error-handling.html" Error handling with promises</span></a>

<a href="../promise-error-handling.html"

## Error in setTimeout

What do you think? Will the `.catch` trigger? Explain your answer.

    new Promise(function(resolve, reject) {
      setTimeout(() => {
        throw new Error("Whoops!");
      }, 1000);
    }).catch(alert);

solution

The answer is: **no, it won’t**:

<a href="error-async.html#"
<a href="error-async.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise(function(resolve, reject) {
      setTimeout(() => {
        throw new Error("Whoops!");
      }, 1000);
    }).catch(alert);

As said in the chapter, there’s an "implicit `try..catch`" around the function code. So all synchronous errors are handled.

But here the error is generated not while the executor is running, but later. So the promise can’t handle it.
