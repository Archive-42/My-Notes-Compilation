observable"

- <a href="observable.html"
  /observable"
  /observable"
  observableobservable"

<!-- -->

observable"
observable"
/observable"
observable"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fobservable"%2Fobservable" </a>

<a href="../js-misc.html" Miscellaneous</span></a>

<a href="../proxy.html" Proxy and Reflect</span></a>

<a href="../proxy.html"

## Observable

Create a function `makeObservable(target)` that “makes the object observable” by returning a proxy.

Here’s how it should work:

<a href="observable.html#"
<a href="observable.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeObservable(target) {
      /* your code */
    }

    let user = {};
    user = makeObservable(user);

    user.observe((key, value) => {
      alert(`SET ${key}=${value}`);
    });

    user.name = "John"; // alerts: SET name=John

In other words, an object returned by `makeObservable` is just like the original one, but also has the method `observe(handler)` that sets `handler` function to be called on any property change.

Whenever a property changes, `handler(key, value)` is called with the name and value of the property.

P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way.

solution

The solution consists of two parts:

1.  Whenever `.observe(handler)` is called, we need to remember the handler somewhere, to be able to call it later. We can store handlers right in the object, using our symbol as the property key.
2.  We need a proxy with `set` trap to call handlers in case of any change.

<a href="observable.html#"
<a href="observable.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let handlers = Symbol('handlers');

    function makeObservable(target) {
      // 1. Initialize handlers store
      target[handlers] = [];

      // Store the handler function in array for future calls
      target.observe = function(handler) {
        this[handlers].push(handler);
      };

      // 2. Create a proxy to handle changes
      return new Proxy(target, {
        set(target, property, value, receiver) {
          let success = Reflect.set(...arguments); // forward the operation to object
          if (success) { // if there were no error while setting the property
            // call all handlers
            target[handlers].forEach(handler => handler(property, value));
          }
          return success;
        }
      });
    }

    let user = {};

    user = makeObservable(user);

    user.observe((key, value) => {
      alert(`SET ${key}=${value}`);
    });

    user.name = "John";
