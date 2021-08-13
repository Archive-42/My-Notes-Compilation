calculator-extendable"

- <a href="calculator-extendable.html"
  calculator-extendable"

calculator-extendablecalculator-extendable"

<!-- -->

calculator-extendable"
/calculator-extendable"
/calculator-extendable"
ask/calculator-extendable"k%2Fcalculator-extendable"%2Fcalculator-extendable" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Create an extendable calculator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a constructor function `Calculator` that creates “extendable” calculator objects.

The task consists of two parts.

1.  First, implement the method `calculate(str)` that takes a string like `"1 + 2"` in the format “NUMBER operator NUMBER” (space-delimited) and returns the result. Should understand plus `+` and minus `-`.

    Usage example:

        let calc = new Calculator;

        alert( calc.calculate("3 + 7") ); // 10

2.  Then add the method `addMethod(name, func)` that teaches the calculator a new operation. It takes the operator `name` and the two-argument function `func(a,b)` that implements it.

    For instance, let’s add the multiplication `*`, division `/` and power `**`:

        let powerCalc = new Calculator;
        powerCalc.addMethod("*", (a, b) => a * b);
        powerCalc.addMethod("/", (a, b) => a / b);
        powerCalc.addMethod("**", (a, b) => a ** b);

        let result = powerCalc.calculate("2 ** 3");
        alert( result ); // 8

- No parentheses or complex expressions in this task.
- The numbers and the operator are delimited with exactly one space.
- There may be error handling if you’d like to add it.

[Open a sandbox with tests.](https://plnkr.co/edit/BSCbgSlVjg02a3OU?p=preview)

solution

- Please note how methods are stored. They are simply added to `this.methods` property.
- All tests and numeric conversions are done in the `calculate` method. In future it may be extended to support more complex expressions.

  function Calculator() {

  this.methods = {
  "-": (a, b) => a - b,
  "+": (a, b) => a + b
  };

  this.calculate = function(str) {

      let split = str.split(' '),
        a = +split[0],
        op = split[1],
        b = +split[2];

      if (!this.methods[op] || isNaN(a) || isNaN(b)) {
        return NaN;
      }

      return this.methods[op](a, b);

  };

  this.addMethod = function(name, func) {
  this.methods[name] = func;
  };
  }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/DfKe17tsPxFwhF7z?p=preview)
