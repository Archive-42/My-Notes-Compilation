property-after-delete"

- <a href="property-after-delete.html"
  property-after-delete"
  /property-after-delete"
  property-after-deleteproperty-after-delete"

<!-- -->

property-after-delete"
/property-after-delete"
/property-after-delete"
ask/property-after-delete"

k%2Fproperty-after-delete"%2Fproperty-after-delete" </a>

## Working with prototype

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here’s the code that creates a pair of objects, then modifies them.

Which values are shown in the process?

    let animal = {
      jumps: null
    };
    let rabbit = {
      __proto__: animal,
      jumps: true
    };

    alert( rabbit.jumps ); // ? (1)

    delete rabbit.jumps;

    alert( rabbit.jumps ); // ? (2)

    delete animal.jumps;

    alert( rabbit.jumps ); // ? (3)

There should be 3 answers.

solution

1.  `true`, taken from `rabbit`.
2.  `null`, taken from `animal`.
3.  `undefined`, there’s no such property any more.
