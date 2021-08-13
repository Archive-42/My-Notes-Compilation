EN

- <a href="https://ar.javascript.info/"
- <a href="calculator-constructor.html"
  calculator-constructor"
  /calculator-constructor"
  calculator-constructorcalculator-constructor"

<!-- -->

calculator-constructor"
/calculator-constructor"
/calculator-constructor"
ask/calculator-constructor"k%2Fcalculator-constructor"%2Fcalculator-constructor" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../constructor-new.html" Constructor, operator "new"</span></a>

<a href="../constructor-new.html"

## Create new Calculator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a constructor function `Calculator` that creates objects with 3 methods:

- `read()` asks for two values using `prompt` and remembers them in object properties.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.

For instance:

    let calculator = new Calculator();
    calculator.read();

    alert( "Sum=" + calculator.sum() );
    alert( "Mul=" + calculator.mul() );

[Run the demo](calculator-constructor.html#)

[Open a sandbox with tests.](https://plnkr.co/edit/Fno25vMDXjQGEJuY?p=preview)

solution

<a href="calculator-constructor.html#"
<a href="calculator-constructor.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function Calculator() {

      this.read = function() {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
      };

      this.sum = function() {
        return this.a + this.b;
      };

      this.mul = function() {
        return this.a * this.b;
      };
    }

    let calculator = new Calculator();
    calculator.read();

    alert( "Sum=" + calculator.sum() );
    alert( "Mul=" + calculator.mul() );

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/EMihuTt1LLUEh60f?p=preview)
