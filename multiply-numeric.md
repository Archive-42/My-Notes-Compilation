multiply-numeric"

- <a href="multiply-numeric.html"
  /multiply-numeric"
  /multiply-numeric"
  multiply-numericmultiply-numeric"

<!-- -->

multiply-numeric"
multiply-numeric"
/multiply-numeric"
multiply-numeric"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmultiply-numeric"%2Fmultiply-numeric" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../object.html" Objects</span></a>

<a href="../object.html"

## Multiply numeric property values by 2

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.

For instance:

    // before the call
    let menu = {
      width: 200,
      height: 300,
      title: "My menu"
    };

    multiplyNumeric(menu);

    // after the call
    menu = {
      width: 400,
      height: 600,
      title: "My menu"
    };

Please note that `multiplyNumeric` does not need to return anything. It should modify the object in-place.

P.S. Use `typeof` to check for a number here.

[Open a sandbox with tests.](https://plnkr.co/edit/xQj2B2R6LQJPhUrs?p=preview)

solution

    function multiplyNumeric(obj) {
      for (let key in obj) {
        if (typeof obj[key] == 'number') {
          obj[key] *= 2;
        }
      }
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/fuUFVu56QjLsjky0?p=preview)
