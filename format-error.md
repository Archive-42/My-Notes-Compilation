EN

langs\_\_title">عربي</span></a>

- <a href="format-error.html"
  /format-error"
  /format-error"
  format-errorformat-error"

<!-- -->

format-error"
format-error"
/format-error"
format-error"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fformat-error"%2Fformat-error" </a>

<a href="../error-handling.html" Error handling</span></a>

<a href="../custom-errors.html" Custom errors, extending Error</span></a>

<a href="../custom-errors.html"

## Inherit from SyntaxError

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a class `FormatError` that inherits from the built-in `SyntaxError` class.

It should support `message`, `name` and `stack` properties.

Usage example:

    let err = new FormatError("formatting error");

    alert( err.message ); // formatting error
    alert( err.name ); // FormatError
    alert( err.stack ); // stack

    alert( err instanceof FormatError ); // true
    alert( err instanceof SyntaxError ); // true (because inherits from SyntaxError)

solution

<a href="format-error.html#"
<a href="format-error.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class FormatError extends SyntaxError {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
      }
    }

    let err = new FormatError("formatting error");

    alert( err.message ); // formatting error
    alert( err.name ); // FormatError
    alert( err.stack ); // stack

    alert( err instanceof SyntaxError ); // true
