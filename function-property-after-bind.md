EN

langs\_\_title">عربي</span></a>

- <a href="function-property-after-bind.html"
  /function-property-after-bind"

function-property-after-bindfunction-property-after-bind"

<!-- -->

function-property-after-bind"
function-property-after-bind"
/function-property-after-bind"
function-property-after-bind"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffunction-property-after-bind"%2Ffunction-property-after-bind" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../bind.html" Function binding</span></a>

<a href="../bind.html"

## Function property after bind

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a value in the property of a function. Will it change after `bind`? Why, or why not?

<a href="function-property-after-bind.html#"
<a href="function-property-after-bind.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      alert( this.name );
    }
    sayHi.test = 5;

    let bound = sayHi.bind({
      name: "John"
    });

    alert( bound.test ); // what will be the output? why?

solution

The answer: `undefined`.

The result of `bind` is another object. It does not have the `test` property.
