find-matching-bbtags"

- <a href="find-matching-bbtags.html"
  /find-matching-bbtags"
  /find-matching-bbtags"
  find-matching-bbtagsfind-matching-bbtags"

<!-- -->

- /"
  find-matching-bbtags"
- <a href="https://tr.javascript.info/"
  find-matching-bbtags"

k%2Ffind-matching-bbtags"%2Ffind-matching-bbtags" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-alternation.html" Alternation (OR) |</span></a>

<a href="../regexp-alternation.html"

## Find bbtag pairs

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

<a href="find-matching-bbtags.html#"
<a href="find-matching-bbtags.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;

    let str = `
      [b]hello![/b]
      [quote]
        [url]http://google.com[/url]
      [/quote]
    `;

    alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]

Please note that besides escaping `[` and `]`, we had to escape a slash for the closing tag `[\/\1]`, because normally the slash closes the pattern.
