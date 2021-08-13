EN

- <a href="https://ar.javascript.info/"
- <a href="ask-partial.html"
  ask-partial"
  /ask-partial"
  ask-partial"
  "

<!-- -->

ask-partial"
/ask-partial"

- <a href="https://tr.javascript.info/"
  ask/ask-partial"k%2Fask-partial"%2Fask-partial" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../bind.html" Function binding</span></a>

<a href="../bind.html"

## Partial application for login

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The task is a little more complex variant of [Fix a function that loses "this"](question-use-bind.html).

The `user` object was modified. Now instead of two functions `loginOk/loginFail`, it has a single function `user.login(true/false)`.

What should we pass `askPassword` in the code below, so that it calls `user.login(true)` as `ok` and `user.login(false)` as `fail`?

    function askPassword(ok, fail) {
      let password = prompt("Password?", '');
      if (password == "rockstar") ok();
      else fail();
    }

    let user = {
      name: 'John',

      login(result) {
        alert( this.name + (result ? ' logged in' : ' failed to log in') );
      }
    };

    askPassword(?, ?); // ?

Your changes should only modify the highlighted fragment.

solution

1.  Either use a wrapper function, an arrow to be concise:

        askPassword(() => user.login(true), () => user.login(false));

    Now it gets `user` from outer variables and runs it the normal way.

2.  Or create a partial function from `user.login` that uses `user` as the context and has the correct first argument:

        askPassword(user.login.bind(user, true), user.login.bind(user, false));
