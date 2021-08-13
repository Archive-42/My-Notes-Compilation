sort-by-field"

- <a href="sort-by-field.html"
  /sort-by-field"
  /sort-by-field"
  sort-by-fieldsort-by-field"

<!-- -->

sort-by-field"
sort-by-field"
/sort-by-field"
sort-by-field"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsort-by-field"%2Fsort-by-field" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Sort by field

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We’ve got an array of objects to sort:

    let users = [
      { name: "John", age: 20, surname: "Johnson" },
      { name: "Pete", age: 18, surname: "Peterson" },
      { name: "Ann", age: 19, surname: "Hathaway" }
    ];

The usual way to do that would be:

    // by name (Ann, John, Pete)
    users.sort((a, b) => a.name > b.name ? 1 : -1);

    // by age (Pete, Ann, John)
    users.sort((a, b) => a.age > b.age ? 1 : -1);

Can we make it even less verbose, like this?

    users.sort(byField('name'));
    users.sort(byField('age'));

So, instead of writing a function, just put `byField(fieldName)`.

Write the function `byField` that can be used for that.

[Open a sandbox with tests.](https://plnkr.co/edit/0P3dSp25O5mu9Sq7?p=preview)

solution

    function byField(fieldName){
      return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/ivWUfk2TtcWhkXHY?p=preview)
