random-int-min-max"

- <a href="random-int-min-max.html"
  /random-int-min-max"
  /random-int-min-max"
  random-int-min-maxrandom-int-min-max"

<!-- -->

- /"
  random-int-min-max"
  /random-int-min-max"
  random-int-min-max"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frandom-int-min-max"%2Frandom-int-min-max" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../number.html" Numbers</span></a>

<a href="../number.html"

## A random integer from min to max

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Create a function `randomInteger(min, max)` that generates a random _integer_ number from `min` to `max` including both `min` and `max` as possible values.

Any number from the interval `min..max` must appear with the same probability.

Examples of its work:

    alert( randomInteger(1, 5) ); // 1
    alert( randomInteger(1, 5) ); // 3
    alert( randomInteger(1, 5) ); // 5

You can use the solution of the [previous task](random-min-max.html) as the base.

solution

The simple but wrong solution

#### The simple but wrong solution

The simplest, but wrong solution would be to generate a value from `min` to `max` and round it:

<a href="random-int-min-max.html#"
<a href="random-int-min-max.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function randomInteger(min, max) {
      let rand = min + Math.random() * (max - min);
      return Math.round(rand);
    }

    alert( randomInteger(1, 3) );

The function works, but it is incorrect. The probability to get edge values `min` and `max` is two times less than any other.

If you run the example above many times, you would easily see that `2` appears the most often.

That happens because `Math.round()` gets random numbers from the interval `1..3` and rounds them as follows:

    values from 1    ... to 1.4999999999  become 1
    values from 1.5  ... to 2.4999999999  become 2
    values from 2.5  ... to 2.9999999999  become 3

Now we can clearly see that `1` gets twice less values than `2`. And the same with `3`.

The correct solution

#### The correct solution

There are many correct solutions to the task. One of them is to adjust interval borders. To ensure the same intervals, we can generate values from `0.5 to 3.5`, thus adding the required probabilities to the edges:

<a href="random-int-min-max.html#"
<a href="random-int-min-max.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function randomInteger(min, max) {
      // now rand is from  (min-0.5) to (max+0.5)
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }

    alert( randomInteger(1, 3) );

An alternative way could be to use `Math.floor` for a random number from `min` to `max+1`:

<a href="random-int-min-max.html#"
<a href="random-int-min-max.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function randomInteger(min, max) {
      // here rand is from min to (max+1)
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    alert( randomInteger(1, 3) );

Now all intervals are mapped this way:

    values from 1  ... to 1.9999999999  become 1
    values from 2  ... to 2.9999999999  become 2
    values from 3  ... to 3.9999999999  become 3

All intervals have the same length, making the final distribution uniform.
