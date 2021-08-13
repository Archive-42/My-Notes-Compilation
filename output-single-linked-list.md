output-single-linked-list"

- <a href="output-single-linked-list.html"
  /output-single-linked-list"
  /output-single-linked-list"
  output-single-linked-listoutput-single-linked-list"

<!-- -->

output-single-linked-list"
output-single-linked-list"
/output-single-linked-list"
output-single-linked-list"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Foutput-single-linked-list"%2Foutput-single-linked-list" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../recursion.html" Recursion and stack</span></a>

<a href="../recursion.html"

## Output a single-linked list

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let’s say we have a single-linked list (as described in the chapter [Recursion and stack](../recursion.html)):

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

<a href="output-single-linked-list.html#"
<a href="output-single-linked-list.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

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

<a href="output-single-linked-list.html#"
<a href="output-single-linked-list.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

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
