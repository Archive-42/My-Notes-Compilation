error-nonexisting"

- <a href="error-nonexisting.html"
  /error-nonexisting"
  /error-nonexisting"
  error-nonexistingerror-nonexisting"

<!-- -->

error-nonexisting"
error-nonexisting"
/error-nonexisting"
error-nonexisting"

k%2Ferror-nonexisting"%2Ferror-nonexisting" </a>

<a href="../js-misc.html" Miscellaneous</span></a>

<a href="../proxy.html" Proxy and Reflect</span></a>

<a href="../proxy.html"

## Error on reading non-existent property

Usually, an attempt to read a non-existent property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.

That can help to detect programming mistakes early.

Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That’s how it should work:

    let user = {
      name: "John"
    };

    function wrap(target) {
      return new Proxy(target, {
          /* your code */
      });
    }

    user = wrap(user);

    alert(user.name); // John
    alert(user.age); // ReferenceError: Property doesn't exist: "age"

solution

<a href="error-nonexisting.html#"
<a href="error-nonexisting.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      name: "John"
    };

    function wrap(target) {
      return new Proxy(target, {
        get(target, prop, receiver) {
          if (prop in target) {
            return Reflect.get(target, prop, receiver);
          } else {
            throw new ReferenceError(`Property doesn't exist: "${prop}"`)
          }
        }
      });
    }

    user = wrap(user);

    alert(user.name); // John
    alert(user.age); // ReferenceError: Property doesn't exist: "age"
