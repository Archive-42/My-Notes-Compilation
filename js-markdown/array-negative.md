array-negative"

- <a href="array-negative.html"
  array-negative"
  /array-negative"
  array-negativearray-negative"

<!-- -->

array-negative"
/array-negative"
/array-negative"
ask/array-negative"k%2Farray-negative"%2Farray-negative" </a>

<a href="../js-misc.html" Miscellaneous</span></a>

<a href="../proxy.html" Proxy and Reflect</span></a>

<a href="../proxy.html"

## Accessing array\[-1\]

In some programming languages, we can access array elements using negative indexes, counted from the end.

Like this:

    let array = [1, 2, 3];

    array[-1]; // 3, the last element
    array[-2]; // 2, one step from the end
    array[-3]; // 1, two steps from the end

In other words, `array[-N]` is the same as `array[array.length - N]`.

Create a proxy to implement that behavior.

That’s how it should work:

    let array = [1, 2, 3];

    array = new Proxy(array, {
      /* your code */
    });

    alert( array[-1] ); // 3
    alert( array[-2] ); // 2

    // Other array functionality should be kept "as is"

solution

<a href="array-negative.html#"
<a href="array-negative.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let array = [1, 2, 3];

    array = new Proxy(array, {
      get(target, prop, receiver) {
        if (prop < 0) {
          // even if we access it like arr[1]
          // prop is a string, so need to convert it to number
          prop = +prop + target.length;
        }
        return Reflect.get(target, prop, receiver);
      }
    });


    alert(array[-1]); // 3
    alert(array[-2]); // 2
