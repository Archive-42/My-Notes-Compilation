match-quoted-string"

- <a href="match-quoted-string.html"
  /match-quoted-string"
  /match-quoted-string"
  match-quoted-stringmatch-quoted-string"

<!-- -->

- <a href="https://ko.javascript.info/"
  match-quoted-string"
- <a href="https://tr.javascript.info/"
  match-quoted-string"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmatch-quoted-string"%2Fmatch-quoted-string" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-alternation.html" Alternation (OR) |</span></a>

<a href="../regexp-alternation.html"

## Find quoted strings

Create a regexp to find strings in double quotes `"..."`.

The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `\"` a newline as `\n`, and the slash itself as `\\`.

    let str = "Just like \"here\".";

Please note, in particular, that an escaped quote `\"` does not end a string.

So we should search from one quote to the other ignoring escaped quotes on the way.

That’s the essential part of the task, otherwise it would be trivial.

Examples of strings to match:

    .. "test me" ..
    .. "Say \"Hello\"!" ... (escaped quotes inside)
    .. "\\" ..  (double slash inside)
    .. "\\ \"" ..  (double slash and an escaped quote inside)

In JavaScript we need to double the slashes to pass them right into the string, like this:

<a href="match-quoted-string.html#"
<a href="match-quoted-string.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

    // the in-memory string
    alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..

solution

The solution: `/"(\\.|[^"\\])*"/g`.

Step by step:

- First we look for an opening quote `"`
- Then if we have a backslash `\\` (we have to double it in the pattern because it is a special character), then any character is fine after it (a dot).
- Otherwise we take any character except a quote (that would mean the end of the string) and a backslash (to prevent lonely backslashes, the backslash is only used with some other symbol after it): `[^"\\]`
- …And so on till the closing quote.

In action:

<a href="match-quoted-string.html#"
<a href="match-quoted-string.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /"(\\.|[^"\\])*"/g;
    let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

    alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
