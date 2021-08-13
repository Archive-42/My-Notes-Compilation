EN

- <a href="https://ar.javascript.info/"
- <a href="destruct-user.html"
- <a href="https://es.javascript.info/"
  /destruct-user"
  destruct-userdestruct-user"

<!-- -->

destruct-user"
destruct-user"
/destruct-user"
destruct-user"

k%2Fdestruct-user"%2Fdestruct-user" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../destructuring-assignment.html" Destructuring assignment</span></a>

<a href="../destructuring-assignment.html"

## Destructuring assignment

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have an object:

    let user = {
      name: "John",
      years: 30
    };

Write the destructuring assignment that reads:

- `name` property into the variable `name`.
- `years` property into the variable `age`.
- `isAdmin` property into the variable `isAdmin` (false, if no such property)

Here’s an example of the values after your assignment:

    let user = { name: "John", years: 30 };

    // your code to the left side:
    // ... = user

    alert( name ); // John
    alert( age ); // 30
    alert( isAdmin ); // false

solution

<a href="destruct-user.html#"
<a href="destruct-user.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      name: "John",
      years: 30
    };

    let {name, years: age, isAdmin = false} = user;

    alert( name ); // John
    alert( age ); // 30
    alert( isAdmin ); // false
