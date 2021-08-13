serialize-event-circular"

- <a href="serialize-event-circular.html"
  /serialize-event-circular"
  /serialize-event-circular"
  serialize-event-circularserialize-event-circular"

<!-- -->

serialize-event-circular"
serialize-event-circular"
/serialize-event-circular"
serialize-event-circular"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fserialize-event-circular"%2Fserialize-event-circular" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../json.html" JSON methods, toJSON</span></a>

<a href="../json.html"

## Exclude backreferences

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In simple cases of circular references, we can exclude an offending property from serialization by its name.

But sometimes we can’t just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.

Write `replacer` function to stringify everything, but remove properties that reference `meetup`:

<a href="serialize-event-circular.html#"
<a href="serialize-event-circular.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let room = {
      number: 23
    };

    let meetup = {
      title: "Conference",
      occupiedBy: [{name: "John"}, {name: "Alice"}],
      place: room
    };

    // circular references
    room.occupiedBy = meetup;
    meetup.self = meetup;

    alert( JSON.stringify(meetup, function replacer(key, value) {
      /* your code */
    }));

    /* result should be:
    {
      "title":"Conference",
      "occupiedBy":[{"name":"John"},{"name":"Alice"}],
      "place":{"number":23}
    }
    */

solution

<a href="serialize-event-circular.html#"
<a href="serialize-event-circular.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let room = {
      number: 23
    };

    let meetup = {
      title: "Conference",
      occupiedBy: [{name: "John"}, {name: "Alice"}],
      place: room
    };

    room.occupiedBy = meetup;
    meetup.self = meetup;

    alert( JSON.stringify(meetup, function replacer(key, value) {
      return (key != "" && value == meetup) ? undefined : value;
    }));

    /*
    {
      "title":"Conference",
      "occupiedBy":[{"name":"John"},{"name":"Alice"}],
      "place":{"number":23}
    }
    */

Here we also need to test `key==""` to exclude the first call where it is normal that `value` is `meetup`.
