EN

- <a href="https://ar.javascript.info/"
- <a href="test-mac.html"
  /test-mac"

test-mac"
task/test-mac"

<!-- -->

- /"
  test-mac"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ftest-mac"%2Ftest-mac" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-groups.html" Capturing groups</span></a>

<a href="../regexp-groups.html"

## Check MAC-address

[MAC-address](https://en.wikipedia.org/wiki/MAC_address) of a network interface consists of 6 two-digit hex numbers separated by a colon.

For instance: `'01:32:54:67:89:AB'`.

Write a regexp that checks whether a string is MAC-address.

Usage:

    let regexp = /your regexp/;

    alert( regexp.test('01:32:54:67:89:AB') ); // true

    alert( regexp.test('0132546789AB') ); // false (no colons)

    alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, must be 6)

    alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ at the end)

solution

A two-digit hex number is `[0-9a-f]{2}` (assuming the flag `i` is set).

We need that number `NN`, and then `:NN` repeated 5 times (more numbers);

The regexp is: `[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Now let’s show that the match should capture all the text: start at the beginning and end at the end. That’s done by wrapping the pattern in `^...$`.

Finally:

<a href="test-mac.html#"
<a href="test-mac.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

    alert( regexp.test('01:32:54:67:89:AB') ); // true

    alert( regexp.test('0132546789AB') ); // false (no colons)

    alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, need 6)

    alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ in the end)
