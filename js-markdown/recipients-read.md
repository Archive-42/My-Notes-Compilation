EN

langs\_\_title">عربي</span></a>

- <a href="recipients-read.html"
  /recipients-read"
  /recipients-read"
  recipients-readrecipients-read"

<!-- -->

recipients-read"
recipients-read"

- <a href="https://tr.javascript.info/"
  recipients-read"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frecipients-read"%2Frecipients-read" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../weakmap-weakset.html" WeakMap and WeakSet</span></a>

<a href="../weakmap-weakset.html"

## Store "unread" flags

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s an array of messages:

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

Your code can access it, but the messages are managed by someone else’s code. New messages are added, old ones are removed regularly by that code, and you don’t know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message “has been read”? The structure must be well-suited to give the answer “was it read?” for the given message object.

P.S. When a message is removed from `messages`, it should disappear from your structure as well.

P.P.S. We shouldn’t modify message objects, add our properties to them. As they are managed by someone else’s code, that may lead to bad consequences.

solution

Let’s store read messages in `WeakSet`:

<a href="recipients-read.html#"
<a href="recipients-read.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

    let readMessages = new WeakSet();

    // two messages have been read
    readMessages.add(messages[0]);
    readMessages.add(messages[1]);
    // readMessages has 2 elements

    // ...let's read the first message again!
    readMessages.add(messages[0]);
    // readMessages still has 2 unique elements

    // answer: was the message[0] read?
    alert("Read message 0: " + readMessages.has(messages[0])); // true

    messages.shift();
    // now readMessages has 1 element (technically memory may be cleaned later)

The `WeakSet` allows to store a set of messages and easily check for the existence of a message in it.

It cleans up itself automatically. The tradeoff is that we can’t iterate over it, can’t get “all read messages” from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it’s read. As messages objects are managed by another code, that’s generally discouraged, but we can use a symbolic property to avoid conflicts.

Like this:

    // the symbolic property is only known to our code
    let isRead = Symbol("isRead");
    messages[0][isRead] = true;

Now third-party code probably won’t see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
