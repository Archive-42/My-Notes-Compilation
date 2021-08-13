EN

- <a href="https://ar.javascript.info/regexp-groups"
- <a href="regexp-groups.html"
- <a href="https://es.javascript.info/regexp-groups"

- regexp-groups"
  regexp-groups"

<!-- -->

- /"
- <a href=regexp-groups"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-groups"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-groups" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-groups" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

10th June 2021

# Capturing groups

A part of a pattern can be enclosed in parentheses `(...)`. This is called a “capturing group”.

That has two effects:

1.  It allows to get a part of the match as a separate item in the result array.
2.  If we put a quantifier after the parentheses, it applies to the parentheses as a whole.

## <a href="regexp-groups.html#examples" id="examples" class="main__anchor">Examples</a>

Let’s see how parentheses work in examples.

### <a href="regexp-groups.html#example-gogogo" id="example-gogogo" class="main__anchor">Example: gogogo</a>

Without parentheses, the pattern `go+` means `g` character, followed by `o` repeated one or more times. For instance, `goooo` or `gooooooooo`.

Parentheses group characters together, so `(go)+` means `go`, `gogo`, `gogogo` and so on.

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"

### <a href="regexp-groups.html#example-domain" id="example-domain" class="main__anchor">Example: domain</a>

Let’s make something more complex – a regular expression to search for a website domain.

For example:

    mail.com
    users.mail.com
    smith.users.mail.com

As we can see, a domain consists of repeated words, a dot after each one except the last one.

In regular expressions that’s `(\w+\.)+\w+`:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(\w+\.)+\w+/g;

    alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com

The search works, but the pattern can’t match a domain with a hyphen, e.g. `my-site.com`, because the hyphen does not belong to class `\w`.

We can fix it by replacing `\w` with `[\w-]` in every word except the last one: `([\w-]+\.)+\w+`.

### <a href="regexp-groups.html#example-email" id="example-email" class="main__anchor">Example: email</a>

The previous example can be extended. We can create a regular expression for emails based on it.

The email format is: `name@domain`. Any word can be the name, hyphens and dots are allowed. In regular expressions that’s `[-.\w]+`.

The pattern:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

    alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk

That regexp is not perfect, but mostly works and helps to fix accidental mistypes. The only truly reliable check for an email can only be done by sending a letter.

## <a href="regexp-groups.html#parentheses-contents-in-the-match" id="parentheses-contents-in-the-match" class="main__anchor">Parentheses contents in the match</a>

Parentheses are numbered from left to right. The search engine memorizes the content matched by each of them and allows to get it in the result.

The method `str.match(regexp)`, if `regexp` has no flag `g`, looks for the first match and returns it as an array:

1.  At index `0`: the full match.
2.  At index `1`: the contents of the first parentheses.
3.  At index `2`: the contents of the second parentheses.
4.  …and so on…

For instance, we’d like to find HTML tags `<.*?>`, and process them. It would be convenient to have tag content (what’s inside the angles), in a separate variable.

Let’s wrap the inner content into parentheses, like this: `<(.*?)>`.

Now we’ll get both the tag as a whole `<h1>` and its contents `h1` in the resulting array:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '<h1>Hello, world!</h1>';

    let tag = str.match(/<(.*?)>/);

    alert( tag[0] ); // <h1>
    alert( tag[1] ); // h1

### <a href="regexp-groups.html#nested-groups" id="nested-groups" class="main__anchor">Nested groups</a>

Parentheses can be nested. In this case the numbering also goes from left to right.

For instance, when searching a tag in `<span class="my">` we may be interested in:

1.  The tag content as a whole: `span class="my"`.
2.  The tag name: `span`.
3.  The tag attributes: `class="my"`.

Let’s add parentheses for them: `<(([a-z]+)\s*([^>]*))>`.

Here’s how they are numbered (left to right, by the opening paren):

<figure><img src="article/regexp-groups/regexp-nested-groups-pattern.svg" width="320" height="130" /></figure>In action:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '<span class="my">';

    let regexp = /<(([a-z]+)\s*([^>]*))>/;

    let result = str.match(regexp);
    alert(result[0]); // <span class="my">
    alert(result[1]); // span class="my"
    alert(result[2]); // span
    alert(result[3]); // class="my"

The zero index of `result` always holds the full match.

Then groups, numbered from left to right by an opening paren. The first group is returned as `result[1]`. Here it encloses the whole tag content.

Then in `result[2]` goes the group from the second opening paren `([a-z]+)` – tag name, then in `result[3]` the tag: `([^>]*)`.

The contents of every group in the string:

<figure><img src="article/regexp-groups/regexp-nested-groups-matches.svg" width="320" height="130" /></figure>### <a href="regexp-groups.html#optional-groups" id="optional-groups" class="main__anchor">Optional groups</a>

Even if a group is optional and doesn’t exist in the match (e.g. has the quantifier `(...)?`), the corresponding `result` array item is present and equals `undefined`.

For instance, let’s consider the regexp `a(z)?(c)?`. It looks for `"a"` optionally followed by `"z"` optionally followed by `"c"`.

If we run it on the string with a single letter `a`, then the result is:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let match = 'a'.match(/a(z)?(c)?/);

    alert( match.length ); // 3
    alert( match[0] ); // a (whole match)
    alert( match[1] ); // undefined
    alert( match[2] ); // undefined

The array has the length of `3`, but all groups are empty.

And here’s a more complex match for the string `ac`:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let match = 'ac'.match(/a(z)?(c)?/)

    alert( match.length ); // 3
    alert( match[0] ); // ac (whole match)
    alert( match[1] ); // undefined, because there's nothing for (z)?
    alert( match[2] ); // c

The array length is permanent: `3`. But there’s nothing for the group `(z)?`, so the result is `["ac", undefined, "c"]`.

## <a href="regexp-groups.html#searching-for-all-matches-with-groups-matchall" id="searching-for-all-matches-with-groups-matchall" class="main__anchor">Searching for all matches with groups: matchAll</a>

<span class="important__type">`matchAll` is a new method, polyfill may be needed</span>

The method `matchAll` is not supported in old browsers.

A polyfill may be required, such as <https://github.com/ljharb/String.prototype.matchAll>.

When we search for all matches (flag `g`), the `match` method does not return contents for groups.

For example, let’s find all tags in a string:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '<h1> <h2>';

    let tags = str.match(/<(.*?)>/g);

    alert( tags ); // <h1>,<h2>

The result is an array of matches, but without details about each of them. But in practice we usually need contents of capturing groups in the result.

To get them, we should search using the method `str.matchAll(regexp)`.

It was added to JavaScript language long after `match`, as its “new and improved version”.

Just like `match`, it looks for matches, but there are 3 differences:

1.  It returns not an array, but an iterable object.
2.  When the flag `g` is present, it returns every match as an array with groups.
3.  If there are no matches, it returns not `null`, but an empty iterable object.

For instance:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

    // results - is not an array, but an iterable object
    alert(results); // [object RegExp String Iterator]

    alert(results[0]); // undefined (*)

    results = Array.from(results); // let's turn it into array

    alert(results[0]); // <h1>,h1 (1st tag)
    alert(results[1]); // <h2>,h2 (2nd tag)

As we can see, the first difference is very important, as demonstrated in the line `(*)`. We can’t get the match as `results[0]`, because that object isn’t pseudoarray. We can turn it into a real `Array` using `Array.from`. There are more details about pseudoarrays and iterables in the article [Iterables](iterable.html).

There’s no need in `Array.from` if we’re looping over results:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

    for(let result of results) {
      alert(result);
      // first alert: <h1>,h1
      // second: <h2>,h2
    }

…Or using destructuring:

    let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

Every match, returned by `matchAll`, has the same format as returned by `match` without flag `g`: it’s an array with additional properties `index` (match index in the string) and `input` (source string):

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

    let [tag1, tag2] = results;

    alert( tag1[0] ); // <h1>
    alert( tag1[1] ); // h1
    alert( tag1.index ); // 0
    alert( tag1.input ); // <h1> <h2>

<span class="important__type">Why is a result of `matchAll` an iterable object, not an array?</span>

Why is the method designed like that? The reason is simple – for the optimization.

The call to `matchAll` does not perform the search. Instead, it returns an iterable object, without the results initially. The search is performed each time we iterate over it, e.g. in the loop.

So, there will be found as many results as needed, not more.

E.g. there are potentially 100 matches in the text, but in a `for..of` loop we found 5 of them, then decided it’s enough and made a `break`. Then the engine won’t spend time finding other 95 matches.

## <a href="regexp-groups.html#named-groups" id="named-groups" class="main__anchor">Named groups</a>

Remembering groups by their numbers is hard. For simple patterns it’s doable, but for more complex ones counting parentheses is inconvenient. We have a much better option: give names to parentheses.

That’s done by putting `?<name>` immediately after the opening paren.

For example, let’s look for a date in the format “year-month-day”:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
    let str = "2019-04-30";

    let groups = str.match(dateRegexp).groups;

    alert(groups.year); // 2019
    alert(groups.month); // 04
    alert(groups.day); // 30

As you can see, the groups reside in the `.groups` property of the match.

To look for all dates, we can add flag `g`.

We’ll also need `matchAll` to obtain full matches, together with groups:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

    let str = "2019-10-30 2020-01-01";

    let results = str.matchAll(dateRegexp);

    for(let result of results) {
      let {year, month, day} = result.groups;

      alert(`${day}.${month}.${year}`);
      // first alert: 30.10.2019
      // second: 01.01.2020
    }

## <a href="regexp-groups.html#capturing-groups-in-replacement" id="capturing-groups-in-replacement" class="main__anchor">Capturing groups in replacement</a>

Method `str.replace(regexp, replacement)` that replaces all matches with `regexp` in `str` allows to use parentheses contents in the `replacement` string. That’s done using `$n`, where `n` is the group number.

For example,

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "John Bull";
    let regexp = /(\w+) (\w+)/;

    alert( str.replace(regexp, '$2, $1') ); // Bull, John

For named parentheses the reference will be `$<name>`.

For example, let’s reformat dates from “year-month-day” to “day.month.year”:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

    let str = "2019-10-30, 2020-01-01";

    alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
    // 30.10.2019, 01.01.2020

## <a href="regexp-groups.html#non-capturing-groups-with" id="non-capturing-groups-with" class="main__anchor">Non-capturing groups with ?:</a>

Sometimes we need parentheses to correctly apply a quantifier, but we don’t want their contents in results.

A group may be excluded by adding `?:` in the beginning.

For instance, if we want to find `(go)+`, but don’t want the parentheses contents (`go`) as a separate array item, we can write: `(?:go)+`.

In the example below we only get the name `John` as a separate member of the match:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "Gogogo John!";

    // ?: excludes 'go' from capturing
    let regexp = /(?:go)+ (\w+)/i;

    let result = str.match(regexp);

    alert( result[0] ); // Gogogo John (full match)
    alert( result[1] ); // John
    alert( result.length ); // 2 (no more items in the array)

## <a href="regexp-groups.html#summary" id="summary" class="main__anchor">Summary</a>

Parentheses group together a part of the regular expression, so that the quantifier applies to it as a whole.

Parentheses groups are numbered left-to-right, and can optionally be named with `(?<name>...)`.

The content, matched by a group, can be obtained in the results:

- The method `str.match` returns capturing groups only without flag `g`.
- The method `str.matchAll` always returns capturing groups.

If the parentheses have no name, then their contents is available in the match array by its number. Named parentheses are also available in the property `groups`.

We can also use parentheses contents in the replacement string in `str.replace`: by the number `$n` or the name `$<name>`.

A group may be excluded from numbering by adding `?:` in its start. That’s used when we need to apply a quantifier to the whole group, but don’t want it as a separate item in the results array. We also can’t reference such parentheses in the replacement string.

## <a href="regexp-groups.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="regexp-groups.html#check-mac-address" id="check-mac-address" class="main__anchor">Check MAC-address</a>

<a href="task/test-mac.html" class="task__open-link"></a>

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

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

    alert( regexp.test('01:32:54:67:89:AB') ); // true

    alert( regexp.test('0132546789AB') ); // false (no colons)

    alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, need 6)

    alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ in the end)

### <a href="regexp-groups.html#find-color-in-the-format-abc-or-abcdef" id="find-color-in-the-format-abc-or-abcdef" class="main__anchor">Find color in the format #abc or #abcdef</a>

<a href="task/find-webcolor-3-or-6.html" class="task__open-link"></a>

Write a RegExp that matches colors in the format `#abc` or `#abcdef`. That is: `#` followed by 3 or 6 hexadecimal digits.

Usage example:

    let regexp = /your regexp/g;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef

P.S. This should be exactly 3 or 6 hex digits. Values with 4 digits, such as `#abcd`, should not match.

solution

A regexp to search 3-digit color `#abc`: `/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don’t need more or less. The color has either 3 or 6 digits.

Let’s use the quantifier `{1,2}` for that: we’ll have `/#([a-f0-9]{3}){1,2}/i`.

Here the pattern `[a-f0-9]{3}` is enclosed in parentheses to apply the quantifier `{1,2}`.

In action:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#([a-f0-9]{3}){1,2}/gi;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef #abc

There’s a minor problem here: the pattern found `#abc` in `#abcd`. To prevent that we can add `\b` to the end:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef

### <a href="regexp-groups.html#find-all-numbers" id="find-all-numbers" class="main__anchor">Find all numbers</a>

<a href="task/find-decimal-numbers.html" class="task__open-link"></a>

Write a regexp that looks for all decimal numbers including integer ones, with the floating point and negative ones.

An example of use:

    let regexp = /your regexp/g;

    let str = "-1.5 0 2 -123.4.";

    alert( str.match(regexp) ); // -1.5, 0, 2, -123.4

solution

A positive number with an optional decimal part is: `\d+(\.\d+)?`.

Let’s add the optional `-` in the beginning:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /-?\d+(\.\d+)?/g;

    let str = "-1.5 0 2 -123.4.";

    alert( str.match(regexp) );   // -1.5, 0, 2, -123.4

### <a href="regexp-groups.html#parse-an-expression" id="parse-an-expression" class="main__anchor">Parse an expression</a>

<a href="task/parse-expression.html" class="task__open-link"></a>

An arithmetical expression consists of 2 numbers and an operator between them, for instance:

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

The operator is one of: `"+"`, `"-"`, `"*"` or `"/"`.

There may be extra spaces at the beginning, at the end or between the parts.

Create a function `parse(expr)` that takes an expression and returns an array of 3 items:

1.  The first number.
2.  The operator.
3.  The second number.

For example:

    let [a, op, b] = parse("1.2 * 3.4");

    alert(a); // 1.2
    alert(op); // *
    alert(b); // 3.4

solution

A regexp for a number is: `-?\d+(\.\d+)?`. We created it in the previous task.

An operator is `[-+*/]`. The hyphen `-` goes first in the square brackets, because in the middle it would mean a character range, while we just want a character `-`.

The slash `/` should be escaped inside a JavaScript regexp `/.../`, we’ll do that later.

We need a number, an operator, and then another number. And optional spaces between them.

The full regular expression: `-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

It has 3 parts, with `\s*` between them:

1.  `-?\d+(\.\d+)?` – the first number,
2.  `[-+*/]` – the operator,
3.  `-?\d+(\.\d+)?` – the second number.

To make each of these parts a separate element of the result array, let’s enclose them in parentheses: `(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In action:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

    alert( "1.2 + 12".match(regexp) );

The result includes:

- `result[0] == "1.2 + 12"` (full match)
- `result[1] == "1.2"` (first group `(-?\d+(\.\d+)?)` – the first number, including the decimal part)
- `result[2] == ".2"` (second group`(\.\d+)?` – the first decimal part)
- `result[3] == "+"` (third group `([-+*\/])` – the operator)
- `result[4] == "12"` (forth group `(-?\d+(\.\d+)?)` – the second number)
- `result[5] == undefined` (fifth group `(\.\d+)?` – the last decimal part is absent, so it’s undefined)

We only want the numbers and the operator, without the full match or the decimal parts, so let’s “clean” the result a bit.

The full match (the arrays first item) can be removed by shifting the array `result.shift()`.

Groups that contain decimal parts (number 2 and 4) `(.\d+)` can be excluded by adding `?:` to the beginning: `(?:\.\d+)?`.

The final solution:

<a href="regexp-groups.html#"
<a href="regexp-groups.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function parse(expr) {
      let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

      let result = expr.match(regexp);

      if (!result) return [];
      result.shift();

      return result;
    }

    alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45

<a href="regexp-greedy-and-lazy.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-backreferences.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-groups" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-groups" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-groups.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-groups.html#examples" class="sidebar__link">Examples</a>
- <a href="regexp-groups.html#parentheses-contents-in-the-match" class="sidebar__link">Parentheses contents in the match</a>
- <a href="regexp-groups.html#searching-for-all-matches-with-groups-matchall" class="sidebar__link">Searching for all matches with groups: matchAll</a>
- <a href="regexp-groups.html#named-groups" class="sidebar__link">Named groups</a>
- <a href="regexp-groups.html#capturing-groups-in-replacement" class="sidebar__link">Capturing groups in replacement</a>
- <a href="regexp-groups.html#non-capturing-groups-with" class="sidebar__link">Non-capturing groups with ?:</a>
- <a href="regexp-groups.html#summary" class="sidebar__link">Summary</a>

- <a href="regexp-groups.html#tasks" class="sidebar__link">Tasks (4)</a>
- <a href="regexp-groups.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-groups" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-groups" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/11-regexp-groups" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
