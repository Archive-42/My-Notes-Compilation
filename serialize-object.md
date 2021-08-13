serialize-object"

- <a href="serialize-object.html"
  /serialize-object"
  /serialize-object"
  serialize-objectserialize-object"

<!-- -->

serialize-object"
serialize-object"
/serialize-object"
serialize-object"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fserialize-object"%2Fserialize-object" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../json.html" JSON methods, toJSON</span></a>

<a href="../json.html"

## Turn the object into JSON and back

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Turn the `user` into JSON and then read it back into another variable.

    let user = {
      name: "John Smith",
      age: 35
    };

solution

    let user = {
      name: "John Smith",
      age: 35
    };

    let user2 = JSON.parse(JSON.stringify(user));
