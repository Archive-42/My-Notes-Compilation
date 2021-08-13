map-objects"

- <a href="map-objects.html"
  /map-objects"
  /map-objects"
  map-objectsmap-objects"

<!-- -->

map-objects"
map-objects"
/map-objects"
map-objects"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmap-objects"%2Fmap-objects" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Map to objects

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

You have an array of `user` objects, each one has `name`, `surname` and `id`.

Write the code to create another array from it, of objects with `id` and `fullName`, where `fullName` is generated from `name` and `surname`.

For instance:

    let john = { name: "John", surname: "Smith", id: 1 };
    let pete = { name: "Pete", surname: "Hunt", id: 2 };
    let mary = { name: "Mary", surname: "Key", id: 3 };

    let users = [ john, pete, mary ];

    let usersMapped = /* ... your code ... */

    /*
    usersMapped = [
      { fullName: "John Smith", id: 1 },
      { fullName: "Pete Hunt", id: 2 },
      { fullName: "Mary Key", id: 3 }
    ]
    */

    alert( usersMapped[0].id ) // 1
    alert( usersMapped[0].fullName ) // John Smith

So, actually you need to map one array of objects to another. Try using `=>` here. There’s a small catch.

solution

<a href="map-objects.html#"
<a href="map-objects.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let john = { name: "John", surname: "Smith", id: 1 };
    let pete = { name: "Pete", surname: "Hunt", id: 2 };
    let mary = { name: "Mary", surname: "Key", id: 3 };

    let users = [ john, pete, mary ];

    let usersMapped = users.map(user => ({
      fullName: `${user.name} ${user.surname}`,
      id: user.id
    }));

    /*
    usersMapped = [
      { fullName: "John Smith", id: 1 },
      { fullName: "Pete Hunt", id: 2 },
      { fullName: "Mary Key", id: 3 }
    ]
    */

    alert( usersMapped[0].id ); // 1
    alert( usersMapped[0].fullName ); // John Smith

Please note that in the arrow functions we need to use additional brackets.

We can’t write like this:

    let usersMapped = users.map(user => {
      fullName: `${user.name} ${user.surname}`,
      id: user.id
    });

As we remember, there are two arrow functions: without body `value => expr` and with body `value => {...}`.

Here JavaScript would treat `{` as the start of function body, not the start of the object. The workaround is to wrap them in the “normal” brackets:

    let usersMapped = users.map(user => ({
      fullName: `${user.name} ${user.surname}`,
      id: user.id
    }));

Now fine.
