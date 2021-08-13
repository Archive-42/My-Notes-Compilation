output-single-linked-list-reverse"

- <a href="output-single-linked-list-reverse.html"
  /output-single-linked-list-reverse"
  /output-single-linked-list-reverse"
  output-single-linked-list-reverseoutput-single-linked-list-reverse"

<!-- -->

output-single-linked-list-reverse"
output-single-linked-list-reverse"
/output-single-linked-list-reverse"
output-single-linked-list-reverse"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Foutput-single-linked-list-reverse"%2Foutput-single-linked-list-reverse" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../recursion.html" Recursion and stack</span></a>

<a href="../recursion.html"

## Output a single-linked list in the reverse order

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Output a single-linked list from the previous task [Output a single-linked list](output-single-linked-list.html) in the reverse order.

Make two solutions: using a loop and using a recursion.

solution

Using a recursion

#### Using a recursion

The recursive logic is a little bit tricky here.

We need to first output the rest of the list and _then_ output the current one:

<a href="output-single-linked-list-reverse.html#"
<a href="output-single-linked-list-reverse.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

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

<a href="output-single-linked-list-reverse.html#"
<a href="output-single-linked-list-reverse.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

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
