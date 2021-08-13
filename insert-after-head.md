insert-after-head"

- <a href="insert-after-head.html"
  /insert-after-head"

insert-after-head"
"

<!-- -->

insert-after-head"
insert-after-head"
/insert-after-head"
insert-after-head"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Finsert-after-head"%2Finsert-after-head" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-lookahead-lookbehind.html" Lookahead and lookbehind</span></a>

<a href="../regexp-lookahead-lookbehind.html"

## Insert After Head

We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.

For instance:

    let regexp = /your regular expression/;

    let str = `
    <html>
      <body style="height: 200px">
      ...
      </body>
    </html>
    `;

    str = str.replace(regexp, `<h1>Hello</h1>`);

After that the value of `str` should be:

    <html>
      <body style="height: 200px"><h1>Hello</h1>
      ...
      </body>
    </html>

solution

In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `<body.*?>` for that.

In this task we don’t need to modify the `<body>` tag. We only need to add the text after it.

Here’s how we can do it:

<a href="insert-after-head.html#"
<a href="insert-after-head.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<body style="...">...';
    str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

    alert(str); // ...<body style="..."><h1>Hello</h1>...

In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.

An alternative is to use lookbehind:

<a href="insert-after-head.html#"
<a href="insert-after-head.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<body style="...">...';
    str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

    alert(str); // ...<body style="..."><h1>Hello</h1>...

As you can see, there’s only lookbehind part in this regexp.

It works like this:

- At every position in the text.
- Check if it’s preceeded by `<body.*?>`.
- If it’s so then we have the match.

The tag `<body.*?>` won’t be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `<body.*?>`.

So it replaces the “empty line”, preceeded by `<body.*?>`, with `<h1>Hello</h1>`. That’s the insertion after `<body>`.

P.S. Regexp flags, such as `s` and `i` can also be useful: `/<body.*?>/si`. The `s` flag makes the dot `.` match a newline character, and `i` flag makes `<body>` also match `<BODY>` case-insensitively.
