EN

- <a href="https://ar.javascript.info/regexp-alternation"
- <a href="regexp-alternation.html"
- <a href="https://es.javascript.info/regexp-alternation"
- <a href="https://fr.javascript.info/regexp-alternation"
- regexp-alternation"
  regexp-alternation"

<!-- -->

- /"
- <a href=regexp-alternation"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-alternation"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-alternation" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-alternation" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

17th January 2021

# Alternation (OR) |

Alternation is the term in regular expression that is actually a simple “OR”.

In a regular expression it is denoted with a vertical line character `|`.

For instance, we need to find programming languages: HTML, PHP, Java or JavaScript.

The corresponding regexp: `html|php|java(script)?`.

A usage example:

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

    let regexp = /html|php|css|java(script)?/gi;

    let str = "First HTML appeared, then CSS, then JavaScript";

    alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'

We already saw a similar thing – square brackets. They allow to choose between multiple characters, for instance `gr[ae]y` matches `gray` or `grey`.

Square brackets allow only characters or character classes. Alternation allows any expressions. A regexp `A|B|C` means one of expressions `A`, `B` or `C`.

For instance:

- `gr(a|e)y` means exactly the same as `gr[ae]y`.
- `gra|ey` means `gra` or `ey`.

To apply alternation to a chosen part of the pattern, we can enclose it in parentheses:

- `I love HTML|CSS` matches `I love HTML` or `CSS`.
- `I love (HTML|CSS)` matches `I love HTML` or `I love CSS`.

## <a href="regexp-alternation.html#example-regexp-for-time" id="example-regexp-for-time" class="main__anchor">Example: regexp for time</a>

In previous articles there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `\d\d:\d\d` is too vague. It accepts `25:99` as the time (as 99 minutes match the pattern, but that time is invalid).

How can we make a better pattern?

We can use more careful matching. First, the hours:

- If the first digit is `0` or `1`, then the next digit can be any: `[01]\d`.
- Otherwise, if the first digit is `2`, then the next must be `[0-3]`.
- (no other first digit is allowed)

We can write both variants in a regexp using alternation: `[01]\d|2[0-3]`.

Next, minutes must be from `00` to `59`. In the regular expression language that can be written as `[0-5]\d`: the first digit `0-5`, and then any digit.

If we glue hours and minutes together, we get the pattern: `[01]\d|2[0-3]:[0-5]\d`.

We’re almost done, but there’s a problem. The alternation `|` now happens to be between `[01]\d` and `2[0-3]:[0-5]\d`.

That is: minutes are added to the second alternation variant, here’s a clear picture:

    [01]\d  |  2[0-3]:[0-5]\d

That pattern looks for `[01]\d` or `2[0-3]:[0-5]\d`.

But that’s wrong, the alternation should only be used in the “hours” part of the regular expression, to allow `[01]\d` OR `2[0-3]`. Let’s correct that by enclosing “hours” into parentheses: `([01]\d|2[0-3]):[0-5]\d`.

The final solution:

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

    let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

    alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59

## <a href="regexp-alternation.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="regexp-alternation.html#find-programming-languages" id="find-programming-languages" class="main__anchor">Find programming languages</a>

<a href="task/find-programming-language.html" class="task__open-link"></a>

There are many programming languages, for instance Java, JavaScript, PHP, C, C++.

Create a regexp that finds them in the string `Java JavaScript PHP C++ C`:

    let regexp = /your regexp/g;

    alert("Java JavaScript PHP C++ C".match(regexp)); // Java JavaScript PHP C++ C

solution

The first idea can be to list the languages with `|` in-between.

But that doesn’t work right:

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

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

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

    let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

    let str = "Java, JavaScript, PHP, C, C++";

    alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++

### <a href="regexp-alternation.html#find-bbtag-pairs" id="find-bbtag-pairs" class="main__anchor">Find bbtag pairs</a>

<a href="task/find-matching-bbtags.html" class="task__open-link"></a>

A “bb-tag” looks like `[tag]...[/tag]`, where `tag` is one of: `b`, `url` or `quote`.

For instance:

    [b]text[/b]
    [url]http://google.com[/url]

BB-tags can be nested. But a tag can’t be nested into itself, for instance:

    Normal:
    [url] [b]http://google.com[/b] [/url]
    [quote] [b]text[/b] [/quote]

    Can't happen:
    [b][b]text[/b][/b]

Tags can contain line breaks, that’s normal:

    [quote]
      [b]text[/b]
    [/quote]

Create a regexp to find all BB-tags with their contents.

For instance:

    let regexp = /your regexp/flags;

    let str = "..[url]http://google.com[/url]..";
    alert( str.match(regexp) ); // [url]http://google.com[/url]

If tags are nested, then we need the outer tag (if we want we can continue the search in its content):

    let regexp = /your regexp/flags;

    let str = "..[url][b]http://google.com[/b][/url]..";
    alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]

solution

Opening tag is `\[(b|url|quote)\]`.

Then to find everything till the closing tag – let’s use the pattern `.*?` with flag `s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `\[(b|url|quote)\].*?\[/\1\]`.

In action:

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

    let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;

    let str = `
      [b]hello![/b]
      [quote]
        [url]http://google.com[/url]
      [/quote]
    `;

    alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]

Please note that besides escaping `[` and `]`, we had to escape a slash for the closing tag `[\/\1]`, because normally the slash closes the pattern.

### <a href="regexp-alternation.html#find-quoted-strings" id="find-quoted-strings" class="main__anchor">Find quoted strings</a>

<a href="task/match-quoted-string.html" class="task__open-link"></a>

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

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

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

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

    let regexp = /"(\\.|[^"\\])*"/g;
    let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

    alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""

### <a href="regexp-alternation.html#find-the-full-tag" id="find-the-full-tag" class="main__anchor">Find the full tag</a>

<a href="task/match-exact-tag.html" class="task__open-link"></a>

Write a regexp to find the tag `<style...>`. It should match the full tag: it may have no attributes `<style>` or have several of them `<style type="..." id="...">`.

…But the regexp should not match `<styler>`!

For instance:

    let regexp = /your regexp/g;

    alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">

solution

The pattern start is obvious: `<style`.

…But then we can’t simply write `<style.*?>`, because `<styler>` would match it.

We need either a space after `<style` and then optionally something else or the ending `>`.

In the regexp language: `<style(>|\s.*?>)`.

In action:

<a href="regexp-alternation.html#"
<a href="regexp-alternation.html#"

    let regexp = /<style(>|\s.*?>)/g;

    alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">

<a href="regexp-backreferences.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-lookahead-lookbehind.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-alternation" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-alternation" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-alternation.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-alternation.html#example-regexp-for-time" class="sidebar__link">Example: regexp for time</a>

- <a href="regexp-alternation.html#tasks" class="sidebar__link">Tasks (4)</a>
- <a href="regexp-alternation.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-alternation" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-alternation" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/13-regexp-alternation" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
