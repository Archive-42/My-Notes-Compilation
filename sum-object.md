sum-object"

- <a href="sum-object.html"
  /sum-object"
  /sum-object"
  sum-object"
  task/sum-object"

<!-- -->

sum-object"
sum-object"
/sum-object"
sum-object"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsum-object"%2Fsum-object" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../object.html" Objects</span></a>

<a href="../object.html"

## Sum object properties

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have an object storing salaries of our team:

    let salaries = {
      John: 100,
      Ann: 160,
      Pete: 130
    }

Write the code to sum all salaries and store in the variable `sum`. Should be `390` in the example above.

If `salaries` is empty, then the result must be `0`.

solution

<a href="sum-object.html#"
<a href="sum-object.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let salaries = {
      John: 100,
      Ann: 160,
      Pete: 130
    };

    let sum = 0;
    for (let key in salaries) {
      sum += salaries[key];
    }

    alert(sum); // 390
