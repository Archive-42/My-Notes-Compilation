EN

langs\_\_title">عربي</span></a>

- <a href="question-use-bind.html"
  /question-use-bind"

question-use-bindquestion-use-bind"

<!-- -->

question-use-bind"
question-use-bind"
/question-use-bind"
question-use-bind"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fquestion-use-bind"%2Fquestion-use-bind" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../bind.html" Function binding</span></a>

<a href="../bind.html"

## Fix a function that loses "this"

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The call to `askPassword()` in the code below should check the password and then call `user.loginOk/loginFail` depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right (other lines are not to be changed).

<a href="question-use-bind.html#"
<a href="question-use-bind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function askPassword(ok, fail) {
      let password = prompt("Password?", '');
      if (password == "rockstar") ok();
      else fail();
    }

    let user = {
      name: 'John',

      loginOk() {
        alert(`${this.name} logged in`);
      },

      loginFail() {
        alert(`${this.name} failed to log in`);
      },

    };

    askPassword(user.loginOk, user.loginFail);

solution

The error occurs because `ask` gets functions `loginOk/loginFail` without the object.

When it calls them, they naturally assume `this=undefined`.

Let’s `bind` the context:

<a href="question-use-bind.html#"
<a href="question-use-bind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function askPassword(ok, fail) {
      let password = prompt("Password?", '');
      if (password == "rockstar") ok();
      else fail();
    }

    let user = {
      name: 'John',

      loginOk() {
        alert(`${this.name} logged in`);
      },

      loginFail() {
        alert(`${this.name} failed to log in`);
      },

    };

    askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

Now it works.

An alternative solution could be:

    //...
    askPassword(() => user.loginOk(), () => user.loginFail());

Usually that also works and looks good.

It’s a bit less reliable though in more complex situations where `user` variable might change _after_ `askPassword` is called, but _before_ the visitor answers and calls `() => user.loginOk()`.
