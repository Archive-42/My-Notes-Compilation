EN

- <a href="https://ar.javascript.info/"
- <a href="regexp-greedy-and-lazy.html"
- <a href="https://es.javascript.info/regexp-greedy-and-lazy"
- <a href="https://fr.javascript.info/regexp-greedy-and-lazy"
- regexp-greedy-and-lazy"
  regexp-greedy-and-lazy"

<!-- -->

- /"
- <a href=regexp-greedy-and-lazy"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/regexp-greedy-and-lazy"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-greedy-and-lazy" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-greedy-and-lazy" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="regular-expressions.html" Regular expressions</span></a></span>

8th December 2020

# Greedy and lazy quantifiers

Quantifiers are very simple from the first sight, but in fact they can be tricky.

We should understand how the search works very well if we plan to look for something more complex than `/\d+/`.

Let’s take the following task as an example.

We have a text and need to replace all quotes `"..."` with guillemet marks: `«...»`. They are preferred for typography in many countries.

For instance: `"Hello, world"` should become `«Hello, world»`. There exist other quotes, such as `„Witam, świat!”` (Polish) or `「你好，世界」` (Chinese), but for our task let’s choose `«...»`.

The first thing to do is to locate quoted strings, and then we can replace them.

A regular expression like `/".+"/g` (a quote, then something, then the other quote) may seem like a good fit, but it isn’t!

Let’s try it:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /".+"/g;

    let str = 'a "witch" and her "broom" is one';

    alert( str.match(regexp) ); // "witch" and her "broom"

…We can see that it works not as intended!

Instead of finding two matches `"witch"` and `"broom"`, it finds one: `"witch" and her "broom"`.

That can be described as “greediness is the cause of all evil”.

## <a href="regexp-greedy-and-lazy.html#greedy-search" id="greedy-search" class="main__anchor">Greedy search</a>

To find a match, the regular expression engine uses the following algorithm:

- For every position in the string
  - Try to match the pattern at that position.
  - If there’s no match, go to the next position.

These common words do not make it obvious why the regexp fails, so let’s elaborate how the search works for the pattern `".+"`.

1.  The first pattern character is a quote `"`.

    The regular expression engine tries to find it at the zero position of the source string `a "witch" and her "broom" is one`, but there’s `a` there, so there’s immediately no match.

    Then it advances: goes to the next positions in the source string and tries to find the first character of the pattern there, fails again, and finally finds the quote at the 3rd position:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy1.svg" width="463" height="130" /></figure>2.  The quote is detected, and then the engine tries to find a match for the rest of the pattern. It tries to see if the rest of the subject string conforms to `.+"`.

    In our case the next pattern character is `.` (a dot). It denotes “any character except a newline”, so the next string letter `'w'` fits:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy2.svg" width="463" height="130" /></figure>3.  Then the dot repeats because of the quantifier `.+`. The regular expression engine adds to the match one character after another.

    …Until when? All characters match the dot, so it only stops when it reaches the end of the string:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy3.svg" width="463" height="130" /></figure>4.  Now the engine finished repeating `.+` and tries to find the next character of the pattern. It’s the quote `"`. But there’s a problem: the string has finished, there are no more characters!

    The regular expression engine understands that it took too many `.+` and starts to _backtrack_.

    In other words, it shortens the match for the quantifier by one character:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy4.svg" width="463" height="130" /></figure>Now it assumes that `.+` ends one character before the string end and tries to match the rest of the pattern from that position.

    If there were a quote there, then the search would end, but the last character is `'e'`, so there’s no match.

2.  …So the engine decreases the number of repetitions of `.+` by one more character:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy5.svg" width="463" height="130" /></figure>The quote `'"'` does not match `'n'`.

3.  The engine keep backtracking: it decreases the count of repetition for `'.'` until the rest of the pattern (in our case `'"'`) matches:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy6.svg" width="463" height="130" /></figure>7.  The match is complete.

4.  So the first match is `"witch" and her "broom"`. If the regular expression has flag `g`, then the search will continue from where the first match ends. There are no more quotes in the rest of the string `is one`, so no more results.

That’s probably not what we expected, but that’s how it works.

**In the greedy mode (by default) a quantified character is repeated as many times as possible.**

The regexp engine adds to the match as many characters as it can for `.+`, and then shortens that one by one, if the rest of the pattern doesn’t match.

For our task we want another thing. That’s where a lazy mode can help.

## <a href="regexp-greedy-and-lazy.html#lazy-mode" id="lazy-mode" class="main__anchor">Lazy mode</a>

The lazy mode of quantifiers is an opposite to the greedy mode. It means: “repeat minimal number of times”.

We can enable it by putting a question mark `'?'` after the quantifier, so that it becomes `*?` or `+?` or even `??` for `'?'`.

To make things clear: usually a question mark `?` is a quantifier by itself (zero or one), but if added _after another quantifier (or even itself)_ it gets another meaning – it switches the matching mode from greedy to lazy.

The regexp `/".+?"/g` works as intended: it finds `"witch"` and `"broom"`:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /".+?"/g;

    let str = 'a "witch" and her "broom" is one';

    alert( str.match(regexp) ); // "witch", "broom"

To clearly understand the change, let’s trace the search step by step.

1.  The first step is the same: it finds the pattern start `'"'` at the 3rd position:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy1.svg" width="463" height="130" /></figure>2.  The next step is also similar: the engine finds a match for the dot `'.'`:

    <figure><img src="article/regexp-greedy-and-lazy/witch_greedy2.svg" width="463" height="130" /></figure>3.  And now the search goes differently. Because we have a lazy mode for `+?`, the engine doesn’t try to match a dot one more time, but stops and tries to match the rest of the pattern `'"'` right now:

    <figure><img src="article/regexp-greedy-and-lazy/witch_lazy3.svg" width="463" height="130" /></figure>If there were a quote there, then the search would end, but there’s `'i'`, so there’s no match.

2.  Then the regular expression engine increases the number of repetitions for the dot and tries one more time:

    <figure><img src="article/regexp-greedy-and-lazy/witch_lazy4.svg" width="463" height="130" /></figure>Failure again. Then the number of repetitions is increased again and again…

3.  …Till the match for the rest of the pattern is found:

    <figure><img src="article/regexp-greedy-and-lazy/witch_lazy5.svg" width="463" height="130" /></figure>6.  The next search starts from the end of the current match and yield one more result:

    <figure><img src="article/regexp-greedy-and-lazy/witch_lazy6.svg" width="463" height="130" /></figure>

In this example we saw how the lazy mode works for `+?`. Quantifiers `*?` and `??` work the similar way – the regexp engine increases the number of repetitions only if the rest of the pattern can’t match on the given position.

**Laziness is only enabled for the quantifier with `?`.**

Other quantifiers remain greedy.

For instance:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "123 456".match(/\d+ \d+?/) ); // 123 4

1.  The pattern `\d+` tries to match as many digits as it can (greedy mode), so it finds `123` and stops, because the next character is a space `' '`.

2.  Then there’s a space in the pattern, it matches.

3.  Then there’s `\d+?`. The quantifier is in lazy mode, so it finds one digit `4` and tries to check if the rest of the pattern matches from there.

    …But there’s nothing in the pattern after `\d+?`.

    The lazy mode doesn’t repeat anything without a need. The pattern finished, so we’re done. We have a match `123 4`.

<span class="important__type">Optimizations</span>

Modern regular expression engines can optimize internal algorithms to work faster. So they may work a bit differently from the described algorithm.

But to understand how regular expressions work and to build regular expressions, we don’t need to know about that. They are only used internally to optimize things.

Complex regular expressions are hard to optimize, so the search may work exactly as described as well.

## <a href="regexp-greedy-and-lazy.html#alternative-approach" id="alternative-approach" class="main__anchor">Alternative approach</a>

With regexps, there’s often more than one way to do the same thing.

In our case we can find quoted strings without lazy mode using the regexp `"[^"]+"`:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /"[^"]+"/g;

    let str = 'a "witch" and her "broom" is one';

    alert( str.match(regexp) ); // "witch", "broom"

The regexp `"[^"]+"` gives correct results, because it looks for a quote `'"'` followed by one or more non-quotes `[^"]`, and then the closing quote.

When the regexp engine looks for `[^"]+` it stops the repetitions when it meets the closing quote, and we’re done.

Please note, that this logic does not replace lazy quantifiers!

It is just different. There are times when we need one or another.

**Let’s see an example where lazy quantifiers fail and this variant works right.**

For instance, we want to find links of the form `<a href="..." class="doc">`, with any `href`.

Which regular expression to use?

The first idea might be: `/<a href=".*" class="doc">/g`.

Let’s check it:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<a href="link" class="doc">...';
    let regexp = /<a href=".*" class="doc">/g;

    // Works!
    alert( str.match(regexp) ); // <a href="link" class="doc">

It worked. But let’s see what happens if there are many links in the text?

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
    let regexp = /<a href=".*" class="doc">/g;

    // Whoops! Two links in one match!
    alert( str.match(regexp) ); // <a href="link1" class="doc">... <a href="link2" class="doc">

Now the result is wrong for the same reason as our “witches” example. The quantifier `.*` took too many characters.

The match looks like this:

    <a href="....................................." class="doc">
    <a href="link1" class="doc">... <a href="link2" class="doc">

Let’s modify the pattern by making the quantifier `.*?` lazy:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
    let regexp = /<a href=".*?" class="doc">/g;

    // Works!
    alert( str.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">

Now it seems to work, there are two matches:

    <a href="....." class="doc">    <a href="....." class="doc">
    <a href="link1" class="doc">... <a href="link2" class="doc">

…But let’s test it on one more text input:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
    let regexp = /<a href=".*?" class="doc">/g;

    // Wrong match!
    alert( str.match(regexp) ); // <a href="link1" class="wrong">... <p style="" class="doc">

Now it fails. The match includes not just a link, but also a lot of text after it, including `<p...>`.

Why?

That’s what’s going on:

1.  First the regexp finds a link start `<a href="`.
2.  Then it looks for `.*?`: takes one character (lazily!), check if there’s a match for `" class="doc">` (none).
3.  Then takes another character into `.*?`, and so on… until it finally reaches `" class="doc">`.

But the problem is: that’s already beyond the link `<a...>`, in another tag `<p>`. Not what we want.

Here’s the picture of the match aligned with the text:

    <a href="..................................." class="doc">
    <a href="link1" class="wrong">... <p style="" class="doc">

So, we need the pattern to look for `<a href="...something..." class="doc">`, but both greedy and lazy variants have problems.

The correct variant can be: `href="[^"]*"`. It will take all characters inside the `href` attribute till the nearest quote, just what we need.

A working example:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
    let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
    let regexp = /<a href="[^"]*" class="doc">/g;

    // Works!
    alert( str1.match(regexp) ); // null, no matches, that's correct
    alert( str2.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">

## <a href="regexp-greedy-and-lazy.html#summary" id="summary" class="main__anchor">Summary</a>

Quantifiers have two modes of work:

Greedy  
By default the regular expression engine tries to repeat the quantified character as many times as possible. For instance, `\d+` consumes all possible digits. When it becomes impossible to consume more (no more digits or string end), then it continues to match the rest of the pattern. If there’s no match then it decreases the number of repetitions (backtracks) and tries again.

Lazy  
Enabled by the question mark `?` after the quantifier. The regexp engine tries to match the rest of the pattern before each repetition of the quantified character.

As we’ve seen, the lazy mode is not a “panacea” from the greedy search. An alternative is a “fine-tuned” greedy search, with exclusions, as in the pattern `"[^"]+"`.

## <a href="regexp-greedy-and-lazy.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="regexp-greedy-and-lazy.html#a-match-for-d-d" id="a-match-for-d-d" class="main__anchor">A match for /d+? d+?/</a>

<a href="task/lazy-greedy.html" class="task__open-link"></a>

What’s the match here?

    alert( "123 456".match(/\d+? \d+?/g) ); // ?

solution

The result is: `123 4`.

First the lazy `\d+?` tries to take as little digits as it can, but it has to reach the space, so it takes `123`.

Then the second `\d+?` takes only one digit, because that’s enough.

### <a href="regexp-greedy-and-lazy.html#find-html-comments" id="find-html-comments" class="main__anchor">Find HTML comments</a>

<a href="task/find-html-comments.html" class="task__open-link"></a>

Find all HTML comments in the text:

    let regexp = /your regexp/g;

    let str = `... <!-- My -- comment
     test --> ..  <!----> ..
    `;

    alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'

solution

We need to find the beginning of the comment `<!--`, then everything till the end of `-->`.

An acceptable variant is `<!--.*?-->` – the lazy quantifier makes the dot stop right before `-->`. We also need to add flag `s` for the dot to include newlines.

Otherwise multiline comments won’t be found:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /<!--.*?-->/gs;

    let str = `... <!-- My -- comment
     test --> ..  <!----> ..
    `;

    alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'

### <a href="regexp-greedy-and-lazy.html#find-html-tags" id="find-html-tags" class="main__anchor">Find HTML tags</a>

<a href="task/find-html-tags-greedy-lazy.html" class="task__open-link"></a>

Create a regular expression to find all (opening and closing) HTML tags with their attributes.

An example of use:

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /your regexp/g;

    let str = '<> <a href="/"> <input type="radio" checked> <b>';

    alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'

Here we assume that tag attributes may not contain `<` and `>` (inside quotes too), that simplifies things a bit.

solution

The solution is `<[^<>]+>`.

<a href="regexp-greedy-and-lazy.html#"
<a href="regexp-greedy-and-lazy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /<[^<>]+>/g;

    let str = '<> <a href="/"> <input type="radio" checked> <b>';

    alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'

<a href="regexp-quantifiers.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="regexp-groups.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fregexp-greedy-and-lazy" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-greedy-and-lazy" </a>

<a href="tutorial/map.html" class="map">

## <a href="regexp-greedy-and-lazy.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="regular-expressions.html" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

- <a href="regexp-greedy-and-lazy.html#greedy-search" class="sidebar__link">Greedy search</a>
- <a href="regexp-greedy-and-lazy.html#lazy-mode" class="sidebar__link">Lazy mode</a>
- <a href="regexp-greedy-and-lazy.html#alternative-approach" class="sidebar__link">Alternative approach</a>
- <a href="regexp-greedy-and-lazy.html#summary" class="sidebar__link">Summary</a>

- <a href="regexp-greedy-and-lazy.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="regexp-greedy-and-lazy.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fregexp-greedy-and-lazy" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-greedy-and-lazy" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/10-regexp-greedy-and-lazy" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
