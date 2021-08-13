dictionary-tostring"

- <a href="dictionary-tostring.html"
  /dictionary-tostring"
  /dictionary-tostring"
  dictionary-tostringdictionary-tostring"

<!-- -->

dictionary-tostring"
dictionary-tostring"
/dictionary-tostring"
dictionary-tostring"

k%2Fdictionary-tostring"%2Fdictionary-tostring" </a>

<a href="../prototypes.html" Prototypes, inheritance</span></a>

<a href="../prototype-methods.html" Prototype methods, objects without **proto**</span></a>

<a href="../prototype-methods.html"

## Add toString to the dictionary

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s an object `dictionary`, created as `Object.create(null)`, to store any `key/value` pairs.

Add method `dictionary.toString()` into it, that should return a comma-delimited list of keys. Your `toString` should not show up in `for..in` over the object.

Here’s how it should work:

    let dictionary = Object.create(null);

    // your code to add dictionary.toString method

    // add some data
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test"; // __proto__ is a regular property key here

    // only apple and __proto__ are in the loop
    for(let key in dictionary) {
      alert(key); // "apple", then "__proto__"
    }

    // your toString in action
    alert(dictionary); // "apple,__proto__"

solution

The method can take all enumerable keys using `Object.keys` and output their list.

To make `toString` non-enumerable, let’s define it using a property descriptor. The syntax of `Object.create` allows us to provide an object with property descriptors as the second argument.

<a href="dictionary-tostring.html#"
<a href="dictionary-tostring.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let dictionary = Object.create(null, {
      toString: { // define toString property
        value() { // the value is a function
          return Object.keys(this).join();
        }
      }
    });

    dictionary.apple = "Apple";
    dictionary.__proto__ = "test";

    // apple and __proto__ is in the loop
    for(let key in dictionary) {
      alert(key); // "apple", then "__proto__"
    }

    // comma-separated list of properties by toString
    alert(dictionary); // "apple,__proto__"

When we create a property using a descriptor, its flags are `false` by default. So in the code above, `dictionary.toString` is non-enumerable.

See the the chapter [Property flags and descriptors](../property-descriptors.html) for review.
