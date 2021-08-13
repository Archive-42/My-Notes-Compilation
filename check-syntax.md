check-syntax"

- <a href="check-syntax.html"
  check-syntax"
  /check-syntax"
  check-syntaxcheck-syntax"

<!-- -->

check-syntax"

- <a href="
- <a href="https://tr.javascript.info/"
  ask/check-syntax"

k%2Fcheck-syntax"%2Fcheck-syntax" </a>

<a href="../js-misc.html" Miscellaneous</span></a>

<a href="../reference-type.html" Reference Type</span></a>

<a href="../reference-type.html"

## Syntax check

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

What is the result of this code?

    let user = {
      name: "John",
      go: function() { alert(this.name) }
    }

    (user.go)()

P.S. There’s a pitfall :)

solution

**Error**!

Try it:

<a href="check-syntax.html#"
<a href="check-syntax.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      name: "John",
      go: function() { alert(this.name) }
    }

    (user.go)() // error!

The error message in most browsers does not give us much of a clue about what went wrong.

**The error appears because a semicolon is missing after `user = {...}`.**

JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:

    let user = { go:... }(user.go)()

Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.

If we insert the semicolon, all is fine:

<a href="check-syntax.html#"
<a href="check-syntax.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      name: "John",
      go: function() { alert(this.name) }
    };

    (user.go)() // John

Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there’s no effect. Only the semicolon thing matters.
