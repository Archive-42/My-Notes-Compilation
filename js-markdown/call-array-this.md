call-array-this"

- <a href="call-array-this.html"
  call-array-this"
  /call-array-this"
  call-array-thiscall-array-this"

<!-- -->

call-array-this"
/call-array-this"
/call-array-this"
ask/call-array-this"k%2Fcall-array-this"%2Fcall-array-this" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array.html" Arrays</span></a>

<a href="../array.html"

## Calling in an array context

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What is the result? Why?

    let arr = ["a", "b"];

    arr.push(function() {
      alert( this );
    })

    arr[2](); // ?

solution

The call `arr[2]()` is syntactically the good old `obj[method]()`, in the role of `obj` we have `arr`, and in the role of `method` we have `2`.

So we have a call of the function `arr[2]` as an object method. Naturally, it receives `this` referencing the object `arr` and outputs the array:

<a href="call-array-this.html#"
<a href="call-array-this.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arr = ["a", "b"];

    arr.push(function() {
      alert( this );
    })

    arr[2](); // a,b,function(){...}

The array has 3 values: initially it had two, plus the function.
