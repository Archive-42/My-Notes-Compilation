average-age"

- <a href="average-age.html"
  average-age"
  /average-age"
  average-ageaverage-age"

<!-- -->

average-age"
/average-age"
/average-age"
ask/average-age"k%2Faverage-age"%2Faverage-age" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Get average age

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write the function `getAverageAge(users)` that gets an array of objects with property `age` and returns the average age.

The formula for the average is `(age1 + age2 + ... + ageN) / N`.

For instance:

    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 29 };

    let arr = [ john, pete, mary ];

    alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28

solution

<a href="average-age.html#"
<a href="average-age.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getAverageAge(users) {
      return users.reduce((prev, user) => prev + user.age, 0) / users.length;
    }

    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 29 };

    let arr = [ john, pete, mary ];

    alert( getAverageAge(arr) ); // 28
