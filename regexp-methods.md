EN

- <a href="https://ar.javascript.info/regexp-methods"
- <a href="regexp-methods.html"
- <a href="https://es.javascript.info/regexp-methods"
- <a href="https://fr.javascript.info/regexp-methods"
- "
  regexp-methods"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=regexp-methods"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-methods"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-methods" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

13th June 2021

# Methods of RegExp and String

In this article we’ll cover various methods that work with regexps in-depth.

## <a href="regexp-methods.html#str-match-regexp" id="str-match-regexp" class="main__anchor">str.match(regexp)</a>

The method `str.match(regexp)` finds matches for `regexp` in the string `str`.

It has 3 modes:

1.  If the `regexp` doesn’t have flag `g`, then it returns the first match as an array with capturing groups and properties `index` (position of the match), `input` (input string, equals `str`):

    <a href="regexp-methods.html#"
    <a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let str = "I love JavaScript";

        let result = str.match(/Java(Script)/);

        alert( result[0] );     // JavaScript (full match)
        alert( result[1] );     // Script (first capturing group)
        alert( result.length ); // 2

        // Additional information:
        alert( result.index );  // 7 (match position)
        alert( result.input );  // I love JavaScript (source string)

2.  If the `regexp` has flag `g`, then it returns an array of all matches as strings, without capturing groups and other details.

    <a href="regexp-methods.html#"
    <a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let str = "I love JavaScript";

        let result = str.match(/Java(Script)/g);

        alert( result[0] ); // JavaScript
        alert( result.length ); // 1

3.  If there are no matches, no matter if there’s flag `g` or not, `null` is returned.

    That’s an important nuance. If there are no matches, we don’t get an empty array, but `null`. It’s easy to make a mistake forgetting about it, e.g.:

    <a href="regexp-methods.html#"
    <a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let str = "I love JavaScript";

        let result = str.match(/HTML/);

        alert(result); // null
        alert(result.length); // Error: Cannot read property 'length' of null

    If we want the result to be an array, we can write like this:

        let result = str.match(regexp) || [];

## <a href="regexp-methods.html#str-matchall-regexp" id="str-matchall-regexp" class="main__anchor">str.matchAll(regexp)</a>

<span class="important__type">A recent addition</span>

This is a recent addition to the language. Old browsers may need polyfills.

The method `str.matchAll(regexp)` is a “newer, improved” variant of `str.match`.

It’s used mainly to search for all matches with all groups.

There are 3 differences from `match`:

1.  It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
2.  Every match is returned as an array with capturing groups (the same format as `str.match` without flag `g`).
3.  If there are no results, it returns an empty iterable object instead of `null`.

Usage example:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '<h1>Hello, world!</h1>';
    let regexp = /<(.*?)>/g;

    let matchAll = str.matchAll(regexp);

    alert(matchAll); // [object RegExp String Iterator], not array, but an iterable

    matchAll = Array.from(matchAll); // array now

    let firstMatch = matchAll[0];
    alert( firstMatch[0] );  // <h1>
    alert( firstMatch[1] );  // h1
    alert( firstMatch.index );  // 0
    alert( firstMatch.input );  // <h1>Hello, world!</h1>

If we use `for..of` to loop over `matchAll` matches, then we don’t need `Array.from` any more.

## <a href="regexp-methods.html#str-split-regexp-substr-limit" id="str-split-regexp-substr-limit" class="main__anchor">str.split(regexp|substr, limit)</a>

Splits the string using the regexp (or a substring) as a delimiter.

We can use `split` with strings, like this:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert('12-34-56'.split('-')) // array of ['12', '34', '56']

But we can split by a regular expression, the same way:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert('12, 34, 56'.split(/,\s*/)) // array of ['12', '34', '56']

## <a href="regexp-methods.html#str-search-regexp" id="str-search-regexp" class="main__anchor">str.search(regexp)</a>

The method `str.search(regexp)` returns the position of the first match or `-1` if none found:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "A drop of ink may make a million think";

    alert( str.search( /ink/i ) ); // 10 (first match position)

**The important limitation: `search` only finds the first match.**

If we need positions of further matches, we should use other means, such as finding them all with `str.matchAll(regexp)`.

## <a href="regexp-methods.html#str-replace-str-regexp-str-func" id="str-replace-str-regexp-str-func" class="main__anchor">str.replace(str|regexp, str|func)</a>

This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.

We can use it without regexps, to search and replace a substring:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // replace a dash by a colon
    alert('12-34-56'.replace("-", ":")) // 12:34-56

There’s a pitfall though.

**When the first argument of `replace` is a string, it only replaces the first match.**

You can see that in the example above: only the first `"-"` is replaced by `":"`.

To find all hyphens, we need to use not the string `"-"`, but a regexp `/-/g`, with the obligatory `g` flag:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // replace all dashes by a colon
    alert( '12-34-56'.replace( /-/g, ":" ) )  // 12:34:56

The second argument is a replacement string. We can use special characters in it:

<table><thead><tr class="header"><th>Symbols</th><th>Action in the replacement string</th></tr></thead><tbody><tr class="odd"><td><code>$&amp;</code></td><td>inserts the whole match</td></tr><tr class="even"><td><code>$`</code></td><td>inserts a part of the string before the match</td></tr><tr class="odd"><td><code>$'</code></td><td>inserts a part of the string after the match</td></tr><tr class="even"><td><code>$n</code></td><td>if <code>n</code> is a 1-2 digit number, inserts the contents of n-th capturing group, for details see <a href="regexp-groups.html">Capturing groups</a></td></tr><tr class="odd"><td><code>$&lt;name&gt;</code></td><td>inserts the contents of the parentheses with the given <code>name</code>, for details see <a href="regexp-groups.html">Capturing groups</a></td></tr><tr class="even"><td><code>$$</code></td><td>inserts character <code>$</code></td></tr></tbody></table>

For instance:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "John Smith";

    // swap first and last name
    alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John

**For situations that require “smart” replacements, the second argument can be a function.**

It will be called for each match, and the returned value will be inserted as a replacement.

The function is called with arguments `func(match, p1, p2, ..., pn, offset, input, groups)`:

1.  `match` – the match,
2.  `p1, p2, ..., pn` – contents of capturing groups (if there are any),
3.  `offset` – position of the match,
4.  `input` – the source string,
5.  `groups` – an object with named groups.

If there are no parentheses in the regexp, then there are only 3 arguments: `func(str, offset, input)`.

For example, let’s uppercase all matches:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "html and css";

    let result = str.replace(/html|css/gi, str => str.toUpperCase());

    alert(result); // HTML and CSS

Replace each match by its position in the string:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6

In the example below there are two parentheses, so the replacement function is called with 5 arguments: the first is the full match, then 2 parentheses, and after it (not used in the example) the match position and the source string:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "John Smith";

    let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

    alert(result); // Smith, John

If there are many groups, it’s convenient to use rest parameters to access them:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "John Smith";

    let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

    alert(result); // Smith, John

Or, if we’re using named groups, then `groups` object with them is always the last, so we can obtain it like this:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "John Smith";

    let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
      let groups = match.pop();

      return `${groups.surname}, ${groups.name}`;
    });

    alert(result); // Smith, John

Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## <a href="regexp-methods.html#str-replaceall-str-regexp-str-func" id="str-replaceall-str-regexp-str-func" class="main__anchor">str.replaceAll(str|regexp, str|func)</a>

This method is essentially the same as `str.replace`, with two major differences:

1.  If the first argument is a string, it replaces _all occurences_ of the string, while `replace` replaces only the _first occurence_.
2.  If the first argument is a regular expression without the `g` flag, there’ll be an error. With `g` flag, it works the same as `replace`.

The main use case for `replaceAll` is replacing all occurences of a string.

Like this:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // replace all dashes by a colon
    alert('12-34-56'.replaceAll("-", ":")) // 12:34:56

## <a href="regexp-methods.html#regexp-exec-str" id="regexp-exec-str" class="main__anchor">regexp.exec(str)</a>

The `regexp.exec(str)` method returns a match for `regexp` in the string `str`. Unlike previous methods, it’s called on a regexp, not on a string.

It behaves differently depending on whether the regexp has flag `g`.

If there’s no `g`, then `regexp.exec(str)` returns the first match exactly as `str.match(regexp)`. This behavior doesn’t bring anything new.

But if there’s flag `g`, then:

- A call to `regexp.exec(str)` returns the first match and saves the position immediately after it in the property `regexp.lastIndex`.
- The next such call starts the search from position `regexp.lastIndex`, returns the next match and saves the position after it in `regexp.lastIndex`.
- …And so on.
- If there are no matches, `regexp.exec` returns `null` and resets `regexp.lastIndex` to `0`.

So, repeated calls return all matches one after another, using property `regexp.lastIndex` to keep track of the current search position.

In the past, before the method `str.matchAll` was added to JavaScript, calls of `regexp.exec` were used in the loop to get all matches with groups:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'More about JavaScript at https://javascript.info';
    let regexp = /javascript/ig;

    let result;

    while (result = regexp.exec(str)) {
      alert( `Found ${result[0]} at position ${result.index}` );
      // Found JavaScript at position 11, then
      // Found javascript at position 33
    }

This works now as well, although for newer browsers `str.matchAll` is usually more convenient.

**We can use `regexp.exec` to search from a given position by manually setting `lastIndex`.**

For instance:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'Hello, world!';

    let regexp = /\w+/g; // without flag "g", lastIndex property is ignored
    regexp.lastIndex = 5; // search from 5th position (from the comma)

    alert( regexp.exec(str) ); // world

If the regexp has flag `y`, then the search will be performed exactly at the position `regexp.lastIndex`, not any further.

Let’s replace flag `g` with `y` in the example above. There will be no matches, as there’s no word at position `5`:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = 'Hello, world!';

    let regexp = /\w+/y;
    regexp.lastIndex = 5; // search exactly at position 5

    alert( regexp.exec(str) ); // null

That’s convenient for situations when we need to “read” something from the string by a regexp at the exact position, not somewhere further.

## <a href="regexp-methods.html#regexp-test-str" id="regexp-test-str" class="main__anchor">regexp.test(str)</a>

The method `regexp.test(str)` looks for a match and returns `true/false` whether it exists.

For instance:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "I love JavaScript";

    // these two tests do the same
    alert( /love/i.test(str) ); // true
    alert( str.search(/love/i) != -1 ); // true

An example with the negative answer:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "Bla-bla-bla";

    alert( /love/i.test(str) ); // false
    alert( str.search(/love/i) != -1 ); // false

If the regexp has flag `g`, then `regexp.test` looks from `regexp.lastIndex` property and updates this property, just like `regexp.exec`.

So we can use it to search from a given position:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /love/gi;

    let str = "I love JavaScript";

    // start the search from position 10:
    regexp.lastIndex = 10;
    alert( regexp.test(str) ); // false (no match)

<span class="important__type">Same global regexp tested repeatedly on different sources may fail</span>

If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

<a href="regexp-methods.html#"
<a href="regexp-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

    alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
    alert( regexp.test("javascript") ); // false

That’s exactly because `regexp.lastIndex` is non-zero in the second test.

To work around that, we can set `regexp.lastIndex = 0` before each search. Or instead of calling methods on regexp, use string methods `str.match/search/...`, they don’t use `lastIndex`.

<a href="regexp-sticky.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-methods" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-methods.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-methods.html#str-match-regexp" class="sidebar__link">str.match(regexp)</a>
- <a href="regexp-methods.html#str-matchall-regexp" class="sidebar__link">str.matchAll(regexp)</a>
- <a href="regexp-methods.html#str-split-regexp-substr-limit" class="sidebar__link">str.split(regexp|substr, limit)</a>
- <a href="regexp-methods.html#str-search-regexp" class="sidebar__link">str.search(regexp)</a>
- <a href="regexp-methods.html#str-replace-str-regexp-str-func" class="sidebar__link">str.replace(str|regexp, str|func)</a>
- <a href="regexp-methods.html#str-replaceall-str-regexp-str-func" class="sidebar__link">str.replaceAll(str|regexp, str|func)</a>
- <a href="regexp-methods.html#regexp-exec-str" class="sidebar__link">regexp.exec(str)</a>
- <a href="regexp-methods.html#regexp-test-str" class="sidebar__link">regexp.test(str)</a>

- <a href="regexp-methods.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-methods" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-methods" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/17-regexp-methods" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
