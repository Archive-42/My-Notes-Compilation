EN

langs\_\_title">عربي</span></a>

- <a href="find-range-1.html"
  /find-range-1"
  /find-range-1"
  find-range-1find-range-1"

<!-- -->

- /"
  find-range-1"
- <a href="https://tr.javascript.info/"
  find-range-1"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffind-range-1"%2Ffind-range-1" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-character-sets-and-ranges.html" Sets and ranges [...]</span></a>

<a href="../regexp-character-sets-and-ranges.html"

## Java\[^script\]

We have a regexp `/Java[^script]/`.

Does it match anything in the string `Java`? In the string `JavaScript`?

solution

Answers: **no, yes**.

- In the script `Java` it doesn’t match anything, because `[^script]` means “any character except given ones”. So the regexp looks for `"Java"` followed by one such symbol, but there’s a string end, no symbols after it.

  <a href="find-range-1.html#"
  <a href="find-range-1.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      alert( "Java".match(/Java[^script]/) ); // null

- Yes, because the `[^script]` part matches the character `"S"`. It’s not one of `script`. As the regexp is case-sensitive (no `i` flag), it treats `"S"` as a different character from `"s"`.

  <a href="find-range-1.html#"
  <a href="find-range-1.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
