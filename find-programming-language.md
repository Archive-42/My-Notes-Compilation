find-programming-language"

- <a href="find-programming-language.html"
  /find-programming-language"
  /find-programming-language"
  find-programming-languagefind-programming-language"

<!-- -->

- /"
  find-programming-language"
- <a href="https://tr.javascript.info/"
  find-programming-language"

k%2Ffind-programming-language"%2Ffind-programming-language" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-alternation.html" Alternation (OR) |</span></a>

<a href="../regexp-alternation.html"

## Find programming languages

There are many programming languages, for instance Java, JavaScript, PHP, C, C++.

Create a regexp that finds them in the string `Java JavaScript PHP C++ C`:

    let regexp = /your regexp/g;

    alert("Java JavaScript PHP C++ C".match(regexp)); // Java JavaScript PHP C++ C

solution

The first idea can be to list the languages with `|` in-between.

But that doesn’t work right:

<a href="find-programming-language.html#"
<a href="find-programming-language.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

    let str = "Java, JavaScript, PHP, C, C++";

    alert( str.match(regexp) ); // Java,Java,PHP,C,C

The regular expression engine looks for alternations one-by-one. That is: first it checks if we have `Java`, otherwise – looks for `JavaScript` and so on.

As a result, `JavaScript` can never be found, just because `Java` is checked first.

The same with `C` and `C++`.

There are two solutions for that problem:

1.  Change the order to check the longer match first: `JavaScript|Java|C\+\+|C|PHP`.
2.  Merge variants with the same start: `Java(Script)?|C(\+\+)?|PHP`.

In action:

<a href="find-programming-language.html#"
<a href="find-programming-language.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

    let str = "Java, JavaScript, PHP, C, C++";

    alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
