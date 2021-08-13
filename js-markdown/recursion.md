EN

- <a href="https://ar.javascript.info/recursion"
- <a href="recursion.html"
- <a href="https://es.javascript.info/recursion"
- <a href="https://fr.javascript.info/recursion"
- <a href="https://it.javascript.info/recursion"
  recursion"

<!-- -->

- <a href="https://ko.javascript.info/recursion"
- <a href=recursion"
- <a href="https://tr.javascript.info/recursion"
- <a href="https://zh.javascript.info/recursion"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Frecursion" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Frecursion" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" Advanced working with functions</span></a></span>

11th November 2020

# Recursion and stack

Let’s return to functions and study them more in-depth.

Our first topic will be _recursion_.

If you are not new to programming, then it is probably familiar and you could skip this chapter.

Recursion is a programming pattern that is useful in situations when a task can be naturally split into several tasks of the same kind, but simpler. Or when a task can be simplified into an easy action plus a simpler variant of the same task. Or, as we’ll see soon, to deal with certain data structures.

When a function solves a task, in the process it can call many other functions. A partial case of this is when a function calls _itself_. That’s called _recursion_.

## <a href="recursion.html#two-ways-of-thinking" id="two-ways-of-thinking" class="main__anchor">Two ways of thinking</a>

For something simple to start with – let’s write a function `pow(x, n)` that raises `x` to a natural power of `n`. In other words, multiplies `x` by itself `n` times.

    pow(2, 2) = 4
    pow(2, 3) = 8
    pow(2, 4) = 16

There are two ways to implement it.

1.  Iterative thinking: the `for` loop:

    <a href="recursion.html#"
    <a href="recursion.html#"

        function pow(x, n) {
          let result = 1;

          // multiply result by x n times in the loop
          for (let i = 0; i < n; i++) {
            result *= x;
          }

          return result;
        }

        alert( pow(2, 3) ); // 8

2.  Recursive thinking: simplify the task and call self:

    <a href="recursion.html#"
    <a href="recursion.html#"

        function pow(x, n) {
          if (n == 1) {
            return x;
          } else {
            return x * pow(x, n - 1);
          }
        }

        alert( pow(2, 3) ); // 8

Please note how the recursive variant is fundamentally different.

When `pow(x, n)` is called, the execution splits into two branches:

                  if n==1  = x
                 /
    pow(x, n) =
                 \
                  else     = x * pow(x, n - 1)

1.  If `n == 1`, then everything is trivial. It is called _the base_ of recursion, because it immediately produces the obvious result: `pow(x, 1)` equals `x`.
2.  Otherwise, we can represent `pow(x, n)` as `x * pow(x, n - 1)`. In maths, one would write `xn = x * xn-1`. This is called _a recursive step_: we transform the task into a simpler action (multiplication by `x`) and a simpler call of the same task (`pow` with lower `n`). Next steps simplify it further and further until `n` reaches `1`.

We can also say that `pow` _recursively calls itself_ till `n == 1`.

<figure><img src="article/recursion/recursion-pow.svg" width="502" height="225" /></figure>For example, to calculate `pow(2, 4)` the recursive variant does these steps:

1.  `pow(2, 4) = 2 * pow(2, 3)`
2.  `pow(2, 3) = 2 * pow(2, 2)`
3.  `pow(2, 2) = 2 * pow(2, 1)`
4.  `pow(2, 1) = 2`

So, the recursion reduces a function call to a simpler one, and then – to even more simpler, and so on, until the result becomes obvious.

<span class="important__type">Recursion is usually shorter</span>

A recursive solution is usually shorter than an iterative one.

Here we can rewrite the same using the conditional operator `?` instead of `if` to make `pow(x, n)` more terse and still very readable:

<a href="recursion.html#"
<a href="recursion.html#"

    function pow(x, n) {
      return (n == 1) ? x : (x * pow(x, n - 1));
    }

The maximal number of nested calls (including the first one) is called _recursion depth_. In our case, it will be exactly `n`.

The maximal recursion depth is limited by JavaScript engine. We can rely on it being 10000, some engines allow more, but 100000 is probably out of limit for the majority of them. There are automatic optimizations that help alleviate this (“tail calls optimizations”), but they are not yet supported everywhere and work only in simple cases.

That limits the application of recursion, but it still remains very wide. There are many tasks where recursive way of thinking gives simpler code, easier to maintain.

## <a href="recursion.html#the-execution-context-and-stack" id="the-execution-context-and-stack" class="main__anchor">The execution context and stack</a>

Now let’s examine how recursive calls work. For that we’ll look under the hood of functions.

The information about the process of execution of a running function is stored in its _execution context_.

The [execution context](https://tc39.github.io/ecma262/#sec-execution-contexts) is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of `this` (we don’t use it here) and few other internal details.

One function call has exactly one execution context associated with it.

When a function makes a nested call, the following happens:

- The current function is paused.
- The execution context associated with it is remembered in a special data structure called _execution context stack_.
- The nested call executes.
- After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped.

Let’s see what happens during the `pow(2, 3)` call.

### <a href="recursion.html#pow-2-3" id="pow-2-3" class="main__anchor">pow(2, 3)</a>

In the beginning of the call `pow(2, 3)` the execution context will store variables: `x = 2, n = 3`, the execution flow is at line `1` of the function.

We can sketch it as:

- <span class="function-execution-context">Context: { x: 2, n: 3, at line 1 }</span> <span class="function-execution-context-call">pow(2, 3)</span>

That’s when the function starts to execute. The condition `n == 1` is falsy, so the flow continues into the second branch of `if`:

<a href="recursion.html#"
<a href="recursion.html#"

    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

    alert( pow(2, 3) );

The variables are same, but the line changes, so the context is now:

- <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span> <span class="function-execution-context-call">pow(2, 3)</span>

To calculate `x * pow(x, n - 1)`, we need to make a subcall of `pow` with new arguments `pow(2, 2)`.

### <a href="recursion.html#pow-2-2" id="pow-2-2" class="main__anchor">pow(2, 2)</a>

To do a nested call, JavaScript remembers the current execution context in the _execution context stack_.

Here we call the same function `pow`, but it absolutely doesn’t matter. The process is the same for all functions:

1.  The current context is “remembered” on top of the stack.
2.  The new context is created for the subcall.
3.  When the subcall is finished – the previous context is popped from the stack, and its execution continues.

Here’s the context stack when we entered the subcall `pow(2, 2)`:

- <span class="function-execution-context">Context: { x: 2, n: 2, at line 1 }</span> <span class="function-execution-context-call">pow(2, 2)</span>
- <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span> <span class="function-execution-context-call">pow(2, 3)</span>

The new current execution context is on top (and bold), and previous remembered contexts are below.

When we finish the subcall – it is easy to resume the previous context, because it keeps both variables and the exact place of the code where it stopped.

<span class="important__type">Please note:</span>

Here in the picture we use the word “line”, as in our example there’s only one subcall in line, but generally a single line of code may contain multiple subcalls, like `pow(…) + pow(…) + somethingElse(…)`.

So it would be more precise to say that the execution resumes “immediately after the subcall”.

### <a href="recursion.html#pow-2-1" id="pow-2-1" class="main__anchor">pow(2, 1)</a>

The process repeats: a new subcall is made at line `5`, now with arguments `x=2`, `n=1`.

A new execution context is created, the previous one is pushed on top of the stack:

- <span class="function-execution-context">Context: { x: 2, n: 1, at line 1 }</span> <span class="function-execution-context-call">pow(2, 1)</span>
- <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span> <span class="function-execution-context-call">pow(2, 2)</span>
- <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span> <span class="function-execution-context-call">pow(2, 3)</span>

There are 2 old contexts now and 1 currently running for `pow(2, 1)`.

### <a href="recursion.html#the-exit" id="the-exit" class="main__anchor">The exit</a>

During the execution of `pow(2, 1)`, unlike before, the condition `n == 1` is truthy, so the first branch of `if` works:

    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

There are no more nested calls, so the function finishes, returning `2`.

As the function finishes, its execution context is not needed anymore, so it’s removed from the memory. The previous one is restored off the top of the stack:

- <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span> <span class="function-execution-context-call">pow(2, 2)</span>
- <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span> <span class="function-execution-context-call">pow(2, 3)</span>

The execution of `pow(2, 2)` is resumed. It has the result of the subcall `pow(2, 1)`, so it also can finish the evaluation of `x * pow(x, n - 1)`, returning `4`.

Then the previous context is restored:

- <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span> <span class="function-execution-context-call">pow(2, 3)</span>

When it finishes, we have a result of `pow(2, 3) = 8`.

The recursion depth in this case was: **3**.

As we can see from the illustrations above, recursion depth equals the maximal number of context in the stack.

Note the memory requirements. Contexts take memory. In our case, raising to the power of `n` actually requires the memory for `n` contexts, for all lower values of `n`.

A loop-based algorithm is more memory-saving:

    function pow(x, n) {
      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

The iterative `pow` uses a single context changing `i` and `result` in the process. Its memory requirements are small, fixed and do not depend on `n`.

**Any recursion can be rewritten as a loop. The loop variant usually can be made more effective.**

…But sometimes the rewrite is non-trivial, especially when function uses different recursive subcalls depending on conditions and merges their results or when the branching is more intricate. And the optimization may be unneeded and totally not worth the efforts.

Recursion can give a shorter code, easier to understand and support. Optimizations are not required in every place, mostly we need a good code, that’s why it’s used.

## <a href="recursion.html#recursive-traversals" id="recursive-traversals" class="main__anchor">Recursive traversals</a>

Another great application of the recursion is a recursive traversal.

Imagine, we have a company. The staff structure can be presented as an object:

    let company = {
      sales: [{
        name: 'John',
        salary: 1000
      }, {
        name: 'Alice',
        salary: 1600
      }],

      development: {
        sites: [{
          name: 'Peter',
          salary: 2000
        }, {
          name: 'Alex',
          salary: 1800
        }],

        internals: [{
          name: 'Jack',
          salary: 1300
        }]
      }
    };

In other words, a company has departments.

- A department may have an array of staff. For instance, `sales` department has 2 employees: John and Alice.

- Or a department may split into subdepartments, like `development` has two branches: `sites` and `internals`. Each of them has their own staff.

- It is also possible that when a subdepartment grows, it divides into subsubdepartments (or teams).

  For instance, the `sites` department in the future may be split into teams for `siteA` and `siteB`. And they, potentially, can split even more. That’s not on the picture, just something to have in mind.

Now let’s say we want a function to get the sum of all salaries. How can we do that?

An iterative approach is not easy, because the structure is not simple. The first idea may be to make a `for` loop over `company` with nested subloop over 1st level departments. But then we need more nested subloops to iterate over the staff in 2nd level departments like `sites`… And then another subloop inside those for 3rd level departments that might appear in the future? If we put 3-4 nested subloops in the code to traverse a single object, it becomes rather ugly.

Let’s try recursion.

As we can see, when our function gets a department to sum, there are two possible cases:

1.  Either it’s a “simple” department with an _array_ of people – then we can sum the salaries in a simple loop.
2.  Or it’s _an object_ with `N` subdepartments – then we can make `N` recursive calls to get the sum for each of the subdeps and combine the results.

The 1st case is the base of recursion, the trivial case, when we get an array.

The 2nd case when we get an object is the recursive step. A complex task is split into subtasks for smaller departments. They may in turn split again, but sooner or later the split will finish at (1).

The algorithm is probably even easier to read from the code:

<a href="recursion.html#"
<a href="recursion.html#"

    let company = { // the same object, compressed for brevity
      sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
      development: {
        sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
        internals: [{name: 'Jack', salary: 1300}]
      }
    };

    // The function to do the job
    function sumSalaries(department) {
      if (Array.isArray(department)) { // case (1)
        return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
      } else { // case (2)
        let sum = 0;
        for (let subdep of Object.values(department)) {
          sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
        }
        return sum;
      }
    }

    alert(sumSalaries(company)); // 7700

The code is short and easy to understand (hopefully?). That’s the power of recursion. It also works for any level of subdepartment nesting.

Here’s the diagram of calls:

<figure><img src="article/recursion/recursive-salaries.svg" width="293" height="437" /></figure>We can easily see the principle: for an object `{...}` subcalls are made, while arrays `[...]` are the “leaves” of the recursion tree, they give immediate result.

Note that the code uses smart features that we’ve covered before:

- Method `arr.reduce` explained in the chapter [Array methods](array-methods.html) to get the sum of the array.
- Loop `for(val of Object.values(obj))` to iterate over object values: `Object.values` returns an array of them.

## <a href="recursion.html#recursive-structures" id="recursive-structures" class="main__anchor">Recursive structures</a>

A recursive (recursively-defined) data structure is a structure that replicates itself in parts.

We’ve just seen it in the example of a company structure above.

A company _department_ is:

- Either an array of people.
- Or an object with _departments_.

For web-developers there are much better-known examples: HTML and XML documents.

In the HTML document, an _HTML-tag_ may contain a list of:

- Text pieces.
- HTML-comments.
- Other _HTML-tags_ (that in turn may contain text pieces/comments or other tags etc).

That’s once again a recursive definition.

For better understanding, we’ll cover one more recursive structure named “Linked list” that might be a better alternative for arrays in some cases.

### <a href="recursion.html#linked-list" id="linked-list" class="main__anchor">Linked list</a>

Imagine, we want to store an ordered list of objects.

The natural choice would be an array:

    let arr = [obj1, obj2, obj3];

…But there’s a problem with arrays. The “delete element” and “insert element” operations are expensive. For instance, `arr.unshift(obj)` operation has to renumber all elements to make room for a new `obj`, and if the array is big, it takes time. Same with `arr.shift()`.

The only structural modifications that do not require mass-renumbering are those that operate with the end of array: `arr.push/pop`. So an array can be quite slow for big queues, when we have to work with the beginning.

Alternatively, if we really need fast insertion/deletion, we can choose another data structure called a [linked list](https://en.wikipedia.org/wiki/Linked_list).

The _linked list element_ is recursively defined as an object with:

- `value`.
- `next` property referencing the next _linked list element_ or `null` if that’s the end.

For instance:

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    };

Graphical representation of the list:

<figure><img src="article/recursion/linked-list.svg" width="652" height="77" /></figure>An alternative code for creation:

    let list = { value: 1 };
    list.next = { value: 2 };
    list.next.next = { value: 3 };
    list.next.next.next = { value: 4 };
    list.next.next.next.next = null;

Here we can even more clearly see that there are multiple objects, each one has the `value` and `next` pointing to the neighbour. The `list` variable is the first object in the chain, so following `next` pointers from it we can reach any element.

The list can be easily split into multiple parts and later joined back:

    let secondList = list.next.next;
    list.next.next = null;

<figure><img src="article/recursion/linked-list-split.svg" width="410" height="150" /></figure>To join:

    list.next.next = secondList;

And surely we can insert or remove items in any place.

For instance, to prepend a new value, we need to update the head of the list:

    let list = { value: 1 };
    list.next = { value: 2 };
    list.next.next = { value: 3 };
    list.next.next.next = { value: 4 };

    // prepend the new value to the list
    list = { value: "new item", next: list };

<figure><img src="article/recursion/linked-list-0.svg" width="816" height="108" /></figure>To remove a value from the middle, change `next` of the previous one:

    list.next = list.next.next;

<figure><img src="article/recursion/linked-list-remove-1.svg" width="670" height="143" /></figure>We made `list.next` jump over `1` to value `2`. The value `1` is now excluded from the chain. If it’s not stored anywhere else, it will be automatically removed from the memory.

Unlike arrays, there’s no mass-renumbering, we can easily rearrange elements.

Naturally, lists are not always better than arrays. Otherwise everyone would use only lists.

The main drawback is that we can’t easily access an element by its number. In an array that’s easy: `arr[n]` is a direct reference. But in the list we need to start from the first item and go `next` `N` times to get the Nth element.

…But we don’t always need such operations. For instance, when we need a queue or even a [deque](https://en.wikipedia.org/wiki/Double-ended_queue) – the ordered structure that must allow very fast adding/removing elements from both ends, but access to its middle is not needed.

Lists can be enhanced:

- We can add property `prev` in addition to `next` to reference the previous element, to move back easily.
- We can also add a variable named `tail` referencing the last element of the list (and update it when adding/removing elements from the end).
- …The data structure may vary according to our needs.

## <a href="recursion.html#summary" id="summary" class="main__anchor">Summary</a>

Terms:

- _Recursion_ is a programming term that means calling a function from itself. Recursive functions can be used to solve tasks in elegant ways.

  When a function calls itself, that’s called a _recursion step_. The _basis_ of recursion is function arguments that make the task so simple that the function does not make further calls.

- A [recursively-defined](https://en.wikipedia.org/wiki/Recursive_data_type) data structure is a data structure that can be defined using itself.

  For instance, the linked list can be defined as a data structure consisting of an object referencing a list (or null).

      list = { value, next -> list }

  Trees like HTML elements tree or the department tree from this chapter are also naturally recursive: they branch and every branch can have other branches.

  Recursive functions can be used to walk them as we’ve seen in the `sumSalary` example.

Any recursive function can be rewritten into an iterative one. And that’s sometimes required to optimize stuff. But for many tasks a recursive solution is fast enough and easier to write and support.

## <a href="recursion.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="recursion.html#sum-all-numbers-till-the-given-one" id="sum-all-numbers-till-the-given-one" class="main__anchor">Sum all numbers till the given one</a>

<a href="task/sum-to.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `sumTo(n)` that calculates the sum of numbers `1 + 2 + ... + n`.

For instance:

    sumTo(1) = 1
    sumTo(2) = 2 + 1 = 3
    sumTo(3) = 3 + 2 + 1 = 6
    sumTo(4) = 4 + 3 + 2 + 1 = 10
    ...
    sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

Make 3 solution variants:

1.  Using a for loop.
2.  Using a recursion, cause `sumTo(n) = n + sumTo(n-1)` for `n > 1`.
3.  Using the [arithmetic progression](https://en.wikipedia.org/wiki/Arithmetic_progression) formula.

An example of the result:

    function sumTo(n) { /*... your code ... */ }

    alert( sumTo(100) ); // 5050

P.S. Which solution variant is the fastest? The slowest? Why?

P.P.S. Can we use recursion to count `sumTo(100000)`?

solution

The solution using a loop:

<a href="recursion.html#"
<a href="recursion.html#"

    function sumTo(n) {
      let sum = 0;
      for (let i = 1; i <= n; i++) {
        sum += i;
      }
      return sum;
    }

    alert( sumTo(100) );

The solution using recursion:

<a href="recursion.html#"
<a href="recursion.html#"

    function sumTo(n) {
      if (n == 1) return 1;
      return n + sumTo(n - 1);
    }

    alert( sumTo(100) );

The solution using the formula: `sumTo(n) = n*(n+1)/2`:

<a href="recursion.html#"
<a href="recursion.html#"

    function sumTo(n) {
      return n * (n + 1) / 2;
    }

    alert( sumTo(100) );

P.S. Naturally, the formula is the fastest solution. It uses only 3 operations for any number `n`. The math helps!

The loop variant is the second in terms of speed. In both the recursive and the loop variant we sum the same numbers. But the recursion involves nested calls and execution stack management. That also takes resources, so it’s slower.

P.P.S. Some engines support the “tail call” optimization: if a recursive call is the very last one in the function (like in `sumTo` above), then the outer function will not need to resume the execution, so the engine doesn’t need to remember its execution context. That removes the burden on memory, so counting `sumTo(100000)` becomes possible. But if the JavaScript engine does not support tail call optimization (most of them don’t), there will be an error: maximum stack size exceeded, because there’s usually a limitation on the total stack size.

### <a href="recursion.html#calculate-factorial" id="calculate-factorial" class="main__anchor">Calculate factorial</a>

<a href="task/factorial.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

The [factorial](https://en.wikipedia.org/wiki/Factorial) of a natural number is a number multiplied by `"number minus one"`, then by `"number minus two"`, and so on till `1`. The factorial of `n` is denoted as `n!`

We can write a definition of factorial like this:

    n! = n * (n - 1) * (n - 2) * ...*1

Values of factorials for different `n`:

    1! = 1
    2! = 2 * 1 = 2
    3! = 3 * 2 * 1 = 6
    4! = 4 * 3 * 2 * 1 = 24
    5! = 5 * 4 * 3 * 2 * 1 = 120

The task is to write a function `factorial(n)` that calculates `n!` using recursive calls.

    alert( factorial(5) ); // 120

P.S. Hint: `n!` can be written as `n * (n-1)!` For instance: `3! = 3*2! = 3*2*1! = 6`

solution

By definition, a factorial `n!` can be written as `n * (n-1)!`.

In other words, the result of `factorial(n)` can be calculated as `n` multiplied by the result of `factorial(n-1)`. And the call for `n-1` can recursively descend lower, and lower, till `1`.

<a href="recursion.html#"
<a href="recursion.html#"

    function factorial(n) {
      return (n != 1) ? n * factorial(n - 1) : 1;
    }

    alert( factorial(5) ); // 120

The basis of recursion is the value `1`. We can also make `0` the basis here, doesn’t matter much, but gives one more recursive step:

<a href="recursion.html#"
<a href="recursion.html#"

    function factorial(n) {
      return n ? n * factorial(n - 1) : 1;
    }

    alert( factorial(5) ); // 120

### <a href="recursion.html#fibonacci-numbers" id="fibonacci-numbers" class="main__anchor">Fibonacci numbers</a>

<a href="task/fibonacci-numbers.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The sequence of [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) has the formula `Fn = Fn-1 + Fn-2`. In other words, the next number is a sum of the two preceding ones.

First two numbers are `1`, then `2(1+1)`, then `3(1+2)`, `5(2+3)` and so on: `1, 1, 2, 3, 5, 8, 13, 21...`.

Fibonacci numbers are related to the [Golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) and many natural phenomena around us.

Write a function `fib(n)` that returns the `n-th` Fibonacci number.

An example of work:

    function fib(n) { /* your code */ }

    alert(fib(3)); // 2
    alert(fib(7)); // 13
    alert(fib(77)); // 5527939700884757

P.S. The function should be fast. The call to `fib(77)` should take no more than a fraction of a second.

solution

The first solution we could try here is the recursive one.

Fibonacci numbers are recursive by definition:

<a href="recursion.html#"
<a href="recursion.html#"

    function fib(n) {
      return n <= 1 ? n : fib(n - 1) + fib(n - 2);
    }

    alert( fib(3) ); // 2
    alert( fib(7) ); // 13
    // fib(77); // will be extremely slow!

…But for big values of `n` it’s very slow. For instance, `fib(77)` may hang up the engine for some time eating all CPU resources.

That’s because the function makes too many subcalls. The same values are re-evaluated again and again.

For instance, let’s see a piece of calculations for `fib(5)`:

    ...
    fib(5) = fib(4) + fib(3)
    fib(4) = fib(3) + fib(2)
    ...

Here we can see that the value of `fib(3)` is needed for both `fib(5)` and `fib(4)`. So `fib(3)` will be called and evaluated two times completely independently.

Here’s the full recursion tree:

<figure><img src="task/fibonacci-numbers/fibonacci-recursion-tree.svg" width="640" height="225" /></figure>We can clearly notice that `fib(3)` is evaluated two times and `fib(2)` is evaluated three times. The total amount of computations grows much faster than `n`, making it enormous even for `n=77`.

We can optimize that by remembering already-evaluated values: if a value of say `fib(3)` is calculated once, then we can just reuse it in future computations.

Another variant would be to give up recursion and use a totally different loop-based algorithm.

Instead of going from `n` down to lower values, we can make a loop that starts from `1` and `2`, then gets `fib(3)` as their sum, then `fib(4)` as the sum of two previous values, then `fib(5)` and goes up and up, till it gets to the needed value. On each step we only need to remember two previous values.

Here are the steps of the new algorithm in details.

The start:

    // a = fib(1), b = fib(2), these values are by definition 1
    let a = 1, b = 1;

    // get c = fib(3) as their sum
    let c = a + b;

    /* we now have fib(1), fib(2), fib(3)
    a  b  c
    1, 1, 2
    */

Now we want to get `fib(4) = fib(2) + fib(3)`.

Let’s shift the variables: `a,b` will get `fib(2),fib(3)`, and `c` will get their sum:

    a = b; // now a = fib(2)
    b = c; // now b = fib(3)
    c = a + b; // c = fib(4)

    /* now we have the sequence:
       a  b  c
    1, 1, 2, 3
    */

The next step gives another sequence number:

    a = b; // now a = fib(3)
    b = c; // now b = fib(4)
    c = a + b; // c = fib(5)

    /* now the sequence is (one more number):
          a  b  c
    1, 1, 2, 3, 5
    */

…And so on until we get the needed value. That’s much faster than recursion and involves no duplicate computations.

The full code:

<a href="recursion.html#"
<a href="recursion.html#"

    function fib(n) {
      let a = 1;
      let b = 1;
      for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
      }
      return b;
    }

    alert( fib(3) ); // 2
    alert( fib(7) ); // 13
    alert( fib(77) ); // 5527939700884757

The loop starts with `i=3`, because the first and the second sequence values are hard-coded into variables `a=1`, `b=1`.

The approach is called [dynamic programming bottom-up](https://en.wikipedia.org/wiki/Dynamic_programming).

### <a href="recursion.html#output-a-single-linked-list" id="output-a-single-linked-list" class="main__anchor">Output a single-linked list</a>

<a href="task/output-single-linked-list.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let’s say we have a single-linked list (as described in the chapter [Recursion and stack](recursion.html)):

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    };

Write a function `printList(list)` that outputs list items one-by-one.

Make two variants of the solution: using a loop and using recursion.

What’s better: with recursion or without it?

solution

Loop-based solution

#### Loop-based solution

The loop-based variant of the solution:

<a href="recursion.html#"
<a href="recursion.html#"

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    };

    function printList(list) {
      let tmp = list;

      while (tmp) {
        alert(tmp.value);
        tmp = tmp.next;
      }

    }

    printList(list);

Please note that we use a temporary variable `tmp` to walk over the list. Technically, we could use a function parameter `list` instead:

    function printList(list) {

      while(list) {
        alert(list.value);
        list = list.next;
      }

    }

…But that would be unwise. In the future we may need to extend a function, do something else with the list. If we change `list`, then we lose such ability.

Talking about good variable names, `list` here is the list itself. The first element of it. And it should remain like that. That’s clear and reliable.

From the other side, the role of `tmp` is exclusively a list traversal, like `i` in the `for` loop.

Recursive solution

#### Recursive solution

The recursive variant of `printList(list)` follows a simple logic: to output a list we should output the current element `list`, then do the same for `list.next`:

<a href="recursion.html#"
<a href="recursion.html#"

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    };

    function printList(list) {

      alert(list.value); // output the current item

      if (list.next) {
        printList(list.next); // do the same for the rest of the list
      }

    }

    printList(list);

Now what’s better?

Technically, the loop is more effective. These two variants do the same, but the loop does not spend resources for nested function calls.

From the other side, the recursive variant is shorter and sometimes easier to understand.

### <a href="recursion.html#output-a-single-linked-list-in-the-reverse-order" id="output-a-single-linked-list-in-the-reverse-order" class="main__anchor">Output a single-linked list in the reverse order</a>

<a href="task/output-single-linked-list-reverse.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Output a single-linked list from the previous task [Output a single-linked list](task/output-single-linked-list.html) in the reverse order.

Make two solutions: using a loop and using a recursion.

solution

Using a recursion

#### Using a recursion

The recursive logic is a little bit tricky here.

We need to first output the rest of the list and _then_ output the current one:

<a href="recursion.html#"
<a href="recursion.html#"

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    };

    function printReverseList(list) {

      if (list.next) {
        printReverseList(list.next);
      }

      alert(list.value);
    }

    printReverseList(list);

Using a loop

#### Using a loop

The loop variant is also a little bit more complicated then the direct output.

There is no way to get the last value in our `list`. We also can’t “go back”.

So what we can do is to first go through the items in the direct order and remember them in an array, and then output what we remembered in the reverse order:

<a href="recursion.html#"
<a href="recursion.html#"

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    };

    function printReverseList(list) {
      let arr = [];
      let tmp = list;

      while (tmp) {
        arr.push(tmp.value);
        tmp = tmp.next;
      }

      for (let i = arr.length - 1; i >= 0; i--) {
        alert( arr[i] );
      }
    }

    printReverseList(list);

Please note that the recursive solution actually does exactly the same: it follows the list, remembers the items in the chain of nested calls (in the execution context stack), and then outputs them.

<a href="advanced-functions.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="rest-parameters-spread.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Frecursion" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Frecursion" </a>

<a href="tutorial/map.html" class="map">

## <a href="recursion.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- <a href="recursion.html#two-ways-of-thinking" class="sidebar__link">Two ways of thinking</a>
- <a href="recursion.html#the-execution-context-and-stack" class="sidebar__link">The execution context and stack</a>
- <a href="recursion.html#recursive-traversals" class="sidebar__link">Recursive traversals</a>
- <a href="recursion.html#recursive-structures" class="sidebar__link">Recursive structures</a>
- <a href="recursion.html#summary" class="sidebar__link">Summary</a>

- <a href="recursion.html#tasks" class="sidebar__link">Tasks (5)</a>
- <a href="recursion.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Frecursion" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Frecursion" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/01-recursion" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
