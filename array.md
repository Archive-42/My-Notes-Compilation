EN

- <a href="https://ar.javascript.info/array"
- <a href="array.html"
- <a href="https://es.javascript.info/array"
- <a href="https://fr.javascript.info/array"
- array"
  array"

<!-- -->

- <a href="https://ko.javascript.info/array"
- <a href=array"
- <a href="https://tr.javascript.info/array"
- <a href="https://zh.javascript.info/array"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Farray" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farray" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

13th May 2021

# Arrays

Objects allow you to store keyed collections of values. That’s fine.

But quite often we find that we need an _ordered collection_, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.

It is not convenient to use an object here, because it provides no methods to manage the order of elements. We can’t insert a new property “between” the existing ones. Objects are just not meant for such use.

There exists a special data structure named `Array`, to store ordered collections.

## <a href="array.html#declaration" id="declaration" class="main__anchor">Declaration</a>

There are two syntaxes for creating an empty array:

    let arr = new Array();
    let arr = [];

Almost all the time, the second syntax is used. We can supply initial elements in the brackets:

    let fruits = ["Apple", "Orange", "Plum"];

Array elements are numbered, starting with zero.

We can get an element by its number in square brackets:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple", "Orange", "Plum"];

    alert( fruits[0] ); // Apple
    alert( fruits[1] ); // Orange
    alert( fruits[2] ); // Plum

We can replace an element:

    fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]

…Or add a new one to the array:

    fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]

The total count of the elements in the array is its `length`:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple", "Orange", "Plum"];

    alert( fruits.length ); // 3

We can also use `alert` to show the whole array.

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple", "Orange", "Plum"];

    alert( fruits ); // Apple,Orange,Plum

An array can store elements of any type.

For instance:

<a href="array.html#"
<a href="array.html#"

    // mix of values
    let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

    // get the object at index 1 and then show its name
    alert( arr[1].name ); // John

    // get the function at index 3 and run it
    arr[3](); // hello

<span class="important__type">Trailing comma</span>

An array, just like an object, may end with a comma:

    let fruits = [
      "Apple",
      "Orange",
      "Plum",
    ];

The “trailing comma” style makes it easier to insert/remove items, because all lines become alike.

## <a href="array.html#methods-pop-push-shift-unshift" id="methods-pop-push-shift-unshift" class="main__anchor">Methods pop/push, shift/unshift</a>

A [queue](<https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>) is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:

- `push` appends an element to the end.
- `shift` get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st.

<figure><img src="article/array/queue.svg" width="187" height="108" /></figure>Arrays support both operations.

In practice we need it very often. For example, a queue of messages that need to be shown on-screen.

There’s another use case for arrays – the data structure named [stack](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>).

It supports two operations:

- `push` adds an element to the end.
- `pop` takes an element from the end.

So new elements are added or taken always from the “end”.

A stack is usually illustrated as a pack of cards: new cards are added to the top or taken from the top:

<figure><img src="article/array/stack.svg" width="145" height="149" /></figure>For stacks, the latest pushed item is received first, that’s also called LIFO (Last-In-First-Out) principle. For queues, we have FIFO (First-In-First-Out).

Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements both to/from the beginning or the end.

In computer science the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).

**Methods that work with the end of the array:**

`pop`  
Extracts the last element of the array and returns it:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // remove "Pear" and alert it

    alert( fruits ); // Apple, Orange

`push`  
Append the element to the end of the array:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear

The call `fruits.push(...)` is equal to `fruits[fruits.length] = ...`.

**Methods that work with the beginning of the array:**

`shift`  
Extracts the first element of the array and returns it:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // remove Apple and alert it

    alert( fruits ); // Orange, Pear

`unshift`  
Add the element to the beginning of the array:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear

Methods `push` and `unshift` can add multiple elements at once:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple"];

    fruits.push("Orange", "Peach");
    fruits.unshift("Pineapple", "Lemon");

    // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
    alert( fruits );

## <a href="array.html#internals" id="internals" class="main__anchor">Internals</a>

An array is a special kind of object. The square brackets used to access a property `arr[0]` actually come from the object syntax. That’s essentially the same as `obj[key]`, where `arr` is the object, while numbers are used as keys.

They extend objects providing special methods to work with ordered collections of data and also the `length` property. But at the core it’s still an object.

Remember, there are only eight basic data types in JavaScript (see the [Data types](types.html) chapter for more info). Array is an object and thus behaves like an object.

For instance, it is copied by reference:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Banana"]

    let arr = fruits; // copy by reference (two variables reference the same array)

    alert( arr === fruits ); // true

    arr.push("Pear"); // modify the array by reference

    alert( fruits ); // Banana, Pear - 2 items now

…But what makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another, just as depicted on the illustrations in this chapter, and there are other optimizations as well, to make arrays work really fast.

But they all break if we quit working with an array as with an “ordered collection” and start working with it as if it were a regular object.

For instance, technically we can do this:

    let fruits = []; // make an array

    fruits[99999] = 5; // assign a property with the index far greater than its length

    fruits.age = 25; // create a property with an arbitrary name

That’s possible, because arrays are objects at their base. We can add any properties to them.

But the engine will see that we’re working with the array as with a regular object. Array-specific optimizations are not suited for such cases and will be turned off, their benefits disappear.

The ways to misuse an array:

- Add a non-numeric property like `arr.test = 5`.
- Make holes, like: add `arr[0]` and then `arr[1000]` (and nothing between them).
- Fill the array in the reverse order, like `arr[1000]`, `arr[999]` and so on.

Please think of arrays as special structures to work with the _ordered data_. They provide special methods for that. Arrays are carefully tuned inside JavaScript engines to work with contiguous ordered data, please use them this way. And if you need arbitrary keys, chances are high that you actually require a regular object `{}`.

## <a href="array.html#performance" id="performance" class="main__anchor">Performance</a>

Methods `push/pop` run fast, while `shift/unshift` are slow.

<figure><img src="article/array/array-speed.svg" width="354" height="173" /></figure>Why is it faster to work with the end of an array than with its beginning? Let’s see what happens during the execution:

    fruits.shift(); // take 1 element from the start

It’s not enough to take and remove the element with the number `0`. Other elements need to be renumbered as well.

The `shift` operation must do 3 things:

1.  Remove the element with the index `0`.
2.  Move all elements to the left, renumber them from the index `1` to `0`, from `2` to `1` and so on.
3.  Update the `length` property.

<figure><img src="article/array/array-shift.svg" width="610" height="175" /></figure>**The more elements in the array, the more time to move them, more in-memory operations.**

The similar thing happens with `unshift`: to add an element to the beginning of the array, we need first to move existing elements to the right, increasing their indexes.

And what’s with `push/pop`? They do not need to move anything. To extract an element from the end, the `pop` method cleans the index and shortens `length`.

The actions for the `pop` operation:

    fruits.pop(); // take 1 element from the end

<figure><img src="article/array/array-pop.svg" width="479" height="148" /></figure>**The `pop` method does not need to move anything, because other elements keep their indexes. That’s why it’s blazingly fast.**

The similar thing with the `push` method.

## <a href="array.html#loops" id="loops" class="main__anchor">Loops</a>

One of the oldest ways to cycle array items is the `for` loop over indexes:

<a href="array.html#"
<a href="array.html#"

    let arr = ["Apple", "Orange", "Pear"];

    for (let i = 0; i < arr.length; i++) {
      alert( arr[i] );
    }

But for arrays there is another form of loop, `for..of`:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apple", "Orange", "Plum"];

    // iterates over array elements
    for (let fruit of fruits) {
      alert( fruit );
    }

The `for..of` doesn’t give access to the number of the current element, just its value, but in most cases that’s enough. And it’s shorter.

Technically, because arrays are objects, it is also possible to use `for..in`:

<a href="array.html#"
<a href="array.html#"

    let arr = ["Apple", "Orange", "Pear"];

    for (let key in arr) {
      alert( arr[key] ); // Apple, Orange, Pear
    }

But that’s actually a bad idea. There are potential problems with it:

1.  The loop `for..in` iterates over _all properties_, not only the numeric ones.

    There are so-called “array-like” objects in the browser and in other environments, that _look like arrays_. That is, they have `length` and indexes properties, but they may also have other non-numeric properties and methods, which we usually don’t need. The `for..in` loop will list them though. So if we need to work with array-like objects, then these “extra” properties can become a problem.

2.  The `for..in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it’s still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.

Generally, we shouldn’t use `for..in` for arrays.

## <a href="array.html#a-word-about-length" id="a-word-about-length" class="main__anchor">A word about “length”</a>

The `length` property automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the greatest numeric index plus one.

For instance, a single element with a large index gives a big length:

<a href="array.html#"
<a href="array.html#"

    let fruits = [];
    fruits[123] = "Apple";

    alert( fruits.length ); // 124

Note that we usually don’t use arrays like that.

Another interesting thing about the `length` property is that it’s writable.

If we increase it manually, nothing interesting happens. But if we decrease it, the array is truncated. The process is irreversible, here’s the example:

<a href="array.html#"
<a href="array.html#"

    let arr = [1, 2, 3, 4, 5];

    arr.length = 2; // truncate to 2 elements
    alert( arr ); // [1, 2]

    arr.length = 5; // return length back
    alert( arr[3] ); // undefined: the values do not return

So, the simplest way to clear the array is: `arr.length = 0;`.

## <a href="array.html#new-array" id="new-array" class="main__anchor">new Array()</a>

There is one more syntax to create an array:

    let arr = new Array("Apple", "Pear", "etc");

It’s rarely used, because square brackets `[]` are shorter. Also there’s a tricky feature with it.

If `new Array` is called with a single argument which is a number, then it creates an array _without items, but with the given length_.

Let’s see how one can shoot themself in the foot:

<a href="array.html#"
<a href="array.html#"

    let arr = new Array(2); // will it create an array of [2] ?

    alert( arr[0] ); // undefined! no elements.

    alert( arr.length ); // length 2

To avoid such surprises, we usually use square brackets, unless we really know what we’re doing.

## <a href="array.html#multidimensional-arrays" id="multidimensional-arrays" class="main__anchor">Multidimensional arrays</a>

Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:

<a href="array.html#"
<a href="array.html#"

    let matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    alert( matrix[1][1] ); // 5, the central element

## <a href="array.html#tostring" id="tostring" class="main__anchor">toString</a>

Arrays have their own implementation of `toString` method that returns a comma-separated list of elements.

For instance:

<a href="array.html#"
<a href="array.html#"

    let arr = [1, 2, 3];

    alert( arr ); // 1,2,3
    alert( String(arr) === '1,2,3' ); // true

Also, let’s try this:

<a href="array.html#"
<a href="array.html#"

    alert( [] + 1 ); // "1"
    alert( [1] + 1 ); // "11"
    alert( [1,2] + 1 ); // "1,21"

Arrays do not have `Symbol.toPrimitive`, neither a viable `valueOf`, they implement only `toString` conversion, so here `[]` becomes an empty string, `[1]` becomes `"1"` and `[1,2]` becomes `"1,2"`.

When the binary plus `"+"` operator adds something to a string, it converts it to a string as well, so the next step looks like this:

<a href="array.html#"
<a href="array.html#"

    alert( "" + 1 ); // "1"
    alert( "1" + 1 ); // "11"
    alert( "1,2" + 1 ); // "1,21"

## <a href="array.html#don-t-compare-arrays-with" id="don-t-compare-arrays-with" class="main__anchor">Don’t compare arrays with ==</a>

Arrays in JavaScript, unlike some other programming languages, shouldn’t be compared with operator `==`.

This operator has no special treatment for arrays, it works with them as with any objects.

Let’s recall the rules:

- Two objects are equal `==` only if they’re references to the same object.
- If one of the arguments of `==` is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter [Object to primitive conversion](object-toprimitive.html).
- …With an exception of `null` and `undefined` that equal `==` each other and nothing else.

The strict comparison `===` is even simpler, as it doesn’t convert types.

So, if we compare arrays with `==`, they are never the same, unless we compare two variables that reference exactly the same array.

For example:

<a href="array.html#"
<a href="array.html#"

    alert( [] == [] ); // false
    alert( [0] == [0] ); // false

These arrays are technically different objects. So they aren’t equal. The `==` operator doesn’t do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well:

<a href="array.html#"
<a href="array.html#"

    alert( 0 == [] ); // true

    alert('0' == [] ); // false

Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`.

Then the comparison process goes on with the primitives, as described in the chapter [Type Conversions](type-conversions.html):

<a href="array.html#"
<a href="array.html#"

    // after [] was converted to ''
    alert( 0 == '' ); // true, as '' becomes converted to number 0

    alert('0' == '' ); // false, no type conversion, different strings

So, how to compare arrays?

That’s simple: don’t use the `==` operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.

## <a href="array.html#summary" id="summary" class="main__anchor">Summary</a>

Array is a special kind of object, suited to storing and managing ordered data items.

- The declaration:

      // square brackets (usual)
      let arr = [item1, item2...];

      // new Array (exceptionally rare)
      let arr = new Array(item1, item2...);

  The call to `new Array(number)` creates an array with the given length, but without elements.

- The `length` property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.

- If we shorten `length` manually, the array is truncated.

We can use an array as a deque with the following operations:

- `push(...items)` adds `items` to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds `items` to the beginning.

To loop over the elements of the array:

- `for (let i=0; i<arr.length; i++)` – works fastest, old-browser-compatible.
- `for (let item of arr)` – the modern syntax for items only,
- `for (let i in arr)` – never use.

To compare arrays, don’t use the `==` operator (as well as `>`, `<` and others), as they have no special treatment for arrays. They handle them as any objects, and it’s not what we usually want.

Instead you can use `for..of` loop to compare arrays item-by-item.

We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter [Array methods](array-methods.html).

## <a href="array.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="array.html#is-array-copied" id="is-array-copied" class="main__anchor">Is array copied?</a>

<a href="task/item-value.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

What is this code going to show?

    let fruits = ["Apples", "Pear", "Orange"];

    // push a new value into the "copy"
    let shoppingCart = fruits;
    shoppingCart.push("Banana");

    // what's in fruits?
    alert( fruits.length ); // ?

solution

The result is `4`:

<a href="array.html#"
<a href="array.html#"

    let fruits = ["Apples", "Pear", "Orange"];

    let shoppingCart = fruits;

    shoppingCart.push("Banana");

    alert( fruits.length ); // 4

That’s because arrays are objects. So both `shoppingCart` and `fruits` are the references to the same array.

### <a href="array.html#array-operations" id="array-operations" class="main__anchor">Array operations.</a>

<a href="task/create-array.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let’s try 5 array operations.

1.  Create an array `styles` with items “Jazz” and “Blues”.
2.  Append “Rock-n-Roll” to the end.
3.  Replace the value in the middle by “Classics”. Your code for finding the middle value should work for any arrays with odd length.
4.  Strip off the first value of the array and show it.
5.  Prepend `Rap` and `Reggae` to the array.

The array in the process:

    Jazz, Blues
    Jazz, Blues, Rock-n-Roll
    Jazz, Classics, Rock-n-Roll
    Classics, Rock-n-Roll
    Rap, Reggae, Classics, Rock-n-Roll

solution

<a href="array.html#"
<a href="array.html#"

    let styles = ["Jazz", "Blues"];
    styles.push("Rock-n-Roll");
    styles[Math.floor((styles.length - 1) / 2)] = "Classics";
    alert( styles.shift() );
    styles.unshift("Rap", "Reggae");

### <a href="array.html#calling-in-an-array-context" id="calling-in-an-array-context" class="main__anchor">Calling in an array context</a>

<a href="task/call-array-this.html" class="task__open-link"></a>

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

<a href="array.html#"
<a href="array.html#"

    let arr = ["a", "b"];

    arr.push(function() {
      alert( this );
    })

    arr[2](); // a,b,function(){...}

The array has 3 values: initially it had two, plus the function.

### <a href="array.html#sum-input-numbers" id="sum-input-numbers" class="main__anchor">Sum input numbers</a>

<a href="task/array-input-sum.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write the function `sumInput()` that:

- Asks the user for values using `prompt` and stores the values in the array.
- Finishes asking when the user enters a non-numeric value, an empty string, or presses “Cancel”.
- Calculates and returns the sum of array items.

P.S. A zero `0` is a valid number, please don’t stop the input on zero.

[Run the demo](array.html#)

solution

Please note the subtle, but important detail of the solution. We don’t convert `value` to number instantly after `prompt`, because after `value = +value` we would not be able to tell an empty string (stop sign) from the zero (valid number). We do it later instead.

<a href="array.html#"
<a href="array.html#"

    function sumInput() {

      let numbers = [];

      while (true) {

        let value = prompt("A number please?", 0);

        // should we cancel?
        if (value === "" || value === null || !isFinite(value)) break;

        numbers.push(+value);
      }

      let sum = 0;
      for (let number of numbers) {
        sum += number;
      }
      return sum;
    }

    alert( sumInput() );

### <a href="array.html#a-maximal-subarray" id="a-maximal-subarray" class="main__anchor">A maximal subarray</a>

<a href="task/maximal-subarray.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

The input is an array of numbers, e.g. `arr = [1, -2, 3, 4, -9, 6]`.

The task is: find the contiguous subarray of `arr` with the maximal sum of items.

Write the function `getMaxSubSum(arr)` that will return that sum.

For instance:

    getMaxSubSum([-1, 2, 3, -9]) == 5 (the sum of highlighted items)
    getMaxSubSum([2, -1, 2, 3, -9]) == 6
    getMaxSubSum([-1, 2, 3, -9, 11]) == 11
    getMaxSubSum([-2, -1, 1, 2]) == 3
    getMaxSubSum([100, -9, 2, -3, 5]) == 100
    getMaxSubSum([1, 2, 3]) == 6 (take all)

If all items are negative, it means that we take none (the subarray is empty), so the sum is zero:

    getMaxSubSum([-1, -2, -3]) = 0

Please try to think of a fast solution: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) or even O(n) if you can.

[Open a sandbox with tests.](https://plnkr.co/edit/9NtFhk2wzQA1K6JA?p=preview)

solution

Slow solution

#### Slow solution

We can calculate all possible subsums.

The simplest way is to take every element and calculate sums of all subarrays starting from it.

For instance, for `[-1, 2, 3, -9, 11]`:

    // Starting from -1:
    -1
    -1 + 2
    -1 + 2 + 3
    -1 + 2 + 3 + (-9)
    -1 + 2 + 3 + (-9) + 11

    // Starting from 2:
    2
    2 + 3
    2 + 3 + (-9)
    2 + 3 + (-9) + 11

    // Starting from 3:
    3
    3 + (-9)
    3 + (-9) + 11

    // Starting from -9
    -9
    -9 + 11

    // Starting from 11
    11

The code is actually a nested loop: the external loop over array elements, and the internal counts subsums starting with the current element.

<a href="array.html#"
<a href="array.html#"

    function getMaxSubSum(arr) {
      let maxSum = 0; // if we take no elements, zero will be returned

      for (let i = 0; i < arr.length; i++) {
        let sumFixedStart = 0;
        for (let j = i; j < arr.length; j++) {
          sumFixedStart += arr[j];
          maxSum = Math.max(maxSum, sumFixedStart);
        }
      }

      return maxSum;
    }

    alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
    alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
    alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
    alert( getMaxSubSum([1, 2, 3]) ); // 6
    alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100

The solution has a time complexity of [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). In other words, if we increase the array size 2 times, the algorithm will work 4 times longer.

For big arrays (1000, 10000 or more items) such algorithms can lead to a serious sluggishness.

Fast solution

#### Fast solution

Let’s walk the array and keep the current partial sum of elements in the variable `s`. If `s` becomes negative at some point, then assign `s=0`. The maximum of all such `s` will be the answer.

If the description is too vague, please see the code, it’s short enough:

<a href="array.html#"
<a href="array.html#"

    function getMaxSubSum(arr) {
      let maxSum = 0;
      let partialSum = 0;

      for (let item of arr) { // for each item of arr
        partialSum += item; // add it to partialSum
        maxSum = Math.max(maxSum, partialSum); // remember the maximum
        if (partialSum < 0) partialSum = 0; // zero if negative
      }

      return maxSum;
    }

    alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
    alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
    alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
    alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
    alert( getMaxSubSum([1, 2, 3]) ); // 6
    alert( getMaxSubSum([-1, -2, -3]) ); // 0

The algorithm requires exactly 1 array pass, so the time complexity is O(n).

You can find more detail information about the algorithm here: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). If it’s still not obvious why that works, then please trace the algorithm on the examples above, see how it works, that’s better than any words.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/qpfzkoPs87WfkOJ6?p=preview)

<a href="string.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="array-methods.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Farray" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farray" </a>

<a href="tutorial/map.html" class="map">

## <a href="array.html id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="array.html#declaration" class="sidebar__link">Declaration</a>
- <a href="array.html#methods-pop-push-shift-unshift" class="sidebar__link">Methods pop/push, shift/unshift</a>
- <a href="array.html#internals" class="sidebar__link">Internals</a>
- <a href="array.html#performance" class="sidebar__link">Performance</a>
- <a href="array.html#loops" class="sidebar__link">Loops</a>
- <a href="array.html#a-word-about-length" class="sidebar__link">A word about “length”</a>
- <a href="array.html#new-array" class="sidebar__link">new Array()</a>
- <a href="array.html#multidimensional-arrays" class="sidebar__link">Multidimensional arrays</a>
- <a href="array.html#tostring" class="sidebar__link">toString</a>
- <a href="array.html#don-t-compare-arrays-with" class="sidebar__link">Don’t compare arrays with ==</a>
- <a href="array.html#summary" class="sidebar__link">Summary</a>

- <a href="array.html#tasks" class="sidebar__link">Tasks (5)</a>
- <a href="array.html class="sidebar\_\_link">Comments</a><a s%3A%2F%2Fjavascript.info%2Farray" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farray" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/04-array" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
