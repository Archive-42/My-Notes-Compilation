EN

- <a href="https://ar.javascript.info/ninja-code"
- <a href="ninja-code.html"
- <a href="https://es.javascript.info/ninja-code"
- <a href="https://fr.javascript.info/ninja-code"
- ninja-code"
  ninja-code"

<!-- -->

- /ninja-code"
- <a href=ninja-code"
- <a href="https://tr.javascript.info/ninja-code"
- <a href="https://zh.javascript.info/ninja-code"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fninja-code" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fninja-code" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="code-quality.html" Code quality</span></a></span>

5th September 2020

# Ninja code

> Learning without thought is labor lost; thought without learning is perilous.
>
> Confucius (Analects)

Programmer ninjas of the past used these tricks to sharpen the mind of code maintainers.

Code review gurus look for them in test tasks.

Novice developers sometimes use them even better than programmer ninjas.

Read them carefully and find out who you are – a ninja, a novice, or maybe a code reviewer?

<span class="important__type">Irony detected</span>

Many try to follow ninja paths. Few succeed.

## <a href="ninja-code.html#brevity-is-the-soul-of-wit" id="brevity-is-the-soul-of-wit" class="main__anchor">Brevity is the soul of wit</a>

Make the code as short as possible. Show how smart you are.

Let subtle language features guide you.

For instance, take a look at this ternary operator `'?'`:

    // taken from a well-known javascript library
    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

Cool, right? If you write like that, a developer who comes across this line and tries to understand what is the value of `i` is going to have a merry time. Then come to you, seeking for an answer.

Tell them that shorter is always better. Initiate them into the paths of ninja.

## <a href="ninja-code.html#one-letter-variables" id="one-letter-variables" class="main__anchor">One-letter variables</a>

> The Dao hides in wordlessness. Only the Dao is well begun and well completed.
>
> Laozi (Tao Te Ching)

Another way to code shorter is to use single-letter variable names everywhere. Like `a`, `b` or `c`.

A short variable disappears in the code like a real ninja in the forest. No one will be able to find it using “search” of the editor. And even if someone does, they won’t be able to “decipher” what the name `a` or `b` means.

…But there’s an exception. A real ninja will never use `i` as the counter in a `"for"` loop. Anywhere, but not here. Look around, there are many more exotic letters. For instance, `x` or `y`.

An exotic variable as a loop counter is especially cool if the loop body takes 1-2 pages (make it longer if you can). Then if someone looks deep inside the loop, they won’t be able to quickly figure out that the variable named `x` is the loop counter.

## <a href="ninja-code.html#use-abbreviations" id="use-abbreviations" class="main__anchor">Use abbreviations</a>

If the team rules forbid the use of one-letter and vague names – shorten them, make abbreviations.

Like this:

- `list` → `lst`.
- `userAgent` → `ua`.
- `browser` → `brsr`.
- …etc

Only the one with truly good intuition will be able to understand such names. Try to shorten everything. Only a worthy person should be able to uphold the development of your code.

## <a href="ninja-code.html#soar-high-be-abstract" id="soar-high-be-abstract" class="main__anchor">Soar high. Be abstract.</a>

> The great square is cornerless  
> The great vessel is last complete,  
> The great note is rarified sound,  
> The great image has no form.
>
> Laozi (Tao Te Ching)

While choosing a name try to use the most abstract word. Like `obj`, `data`, `value`, `item`, `elem` and so on.

- **The ideal name for a variable is `data`.** Use it everywhere you can. Indeed, every variable holds _data_, right?

  …But what to do if `data` is already taken? Try `value`, it’s also universal. After all, a variable eventually gets a _value_.

- **Name a variable by its type: `str`, `num`…**

  Give them a try. A young initiate may wonder – are such names really useful for a ninja? Indeed, they are!

  Sure, the variable name still means something. It says what’s inside the variable: a string, a number or something else. But when an outsider tries to understand the code, they’ll be surprised to see that there’s actually no information at all! And will ultimately fail to alter your well-thought code.

  The value type is easy to find out by debugging. But what’s the meaning of the variable? Which string/number does it store?

  There’s just no way to figure out without a good meditation!

- **…But what if there are no more such names?** Just add a number: `data1, item2, elem5`…

## <a href="ninja-code.html#attention-test" id="attention-test" class="main__anchor">Attention test</a>

Only a truly attentive programmer should be able to understand your code. But how to check that?

**One of the ways – use similar variable names, like `date` and `data`.**

Mix them where you can.

A quick read of such code becomes impossible. And when there’s a typo… Ummm… We’re stuck for long, time to drink tea.

## <a href="ninja-code.html#smart-synonyms" id="smart-synonyms" class="main__anchor">Smart synonyms</a>

> The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.
>
> Laozi (Tao Te Ching)

Using _similar_ names for _same_ things makes life more interesting and shows your creativity to the public.

For instance, consider function prefixes. If a function shows a message on the screen – start it with `display…`, like `displayMessage`. And then if another function shows on the screen something else, like a user name, start it with `show…` (like `showName`).

Insinuate that there’s a subtle difference between such functions, while there is none.

Make a pact with fellow ninjas of the team: if John starts “showing” functions with `display...` in his code, then Peter could use `render..`, and Ann – `paint...`. Note how much more interesting and diverse the code became.

…And now the hat trick!

For two functions with important differences – use the same prefix!

For instance, the function `printPage(page)` will use a printer. And the function `printText(text)` will put the text on-screen. Let an unfamiliar reader think well over similarly named function `printMessage`: “Where does it put the message? To a printer or on the screen?”. To make it really shine, `printMessage(message)` should output it in the new window!

## <a href="ninja-code.html#reuse-names" id="reuse-names" class="main__anchor">Reuse names</a>

> Once the whole is divided, the parts  
> need names.  
> There are already enough names.  
> One must know when to stop.
>
> Laozi (Tao Te Ching)

Add a new variable only when absolutely necessary.

Instead, reuse existing names. Just write new values into them.

In a function try to use only variables passed as parameters.

That would make it really hard to identify what’s exactly in the variable _now_. And also where it comes from. The purpose is to develop the intuition and memory of a person reading the code. A person with weak intuition would have to analyze the code line-by-line and track the changes through every code branch.

**An advanced variant of the approach is to covertly (!) replace the value with something alike in the middle of a loop or a function.**

For instance:

    function ninjaFunction(elem) {
      // 20 lines of code working with elem

      elem = clone(elem);

      // 20 more lines, now working with the clone of the elem!
    }

A fellow programmer who wants to work with `elem` in the second half of the function will be surprised… Only during the debugging, after examining the code they will find out that they’re working with a clone!

Seen in code regularly. Deadly effective even against an experienced ninja.

## <a href="ninja-code.html#underscores-for-fun" id="underscores-for-fun" class="main__anchor">Underscores for fun</a>

Put underscores `_` and `__` before variable names. Like `_name` or `__value`. It would be great if only you knew their meaning. Or, better, add them just for fun, without particular meaning at all. Or different meanings in different places.

You kill two rabbits with one shot. First, the code becomes longer and less readable, and the second, a fellow developer may spend a long time trying to figure out what the underscores mean.

A smart ninja puts underscores at one spot of code and evades them at other places. That makes the code even more fragile and increases the probability of future errors.

## <a href="ninja-code.html#show-your-love" id="show-your-love" class="main__anchor">Show your love</a>

Let everyone see how magnificent your entities are! Names like `superElement`, `megaFrame` and `niceItem` will definitely enlighten a reader.

Indeed, from one hand, something is written: `super..`, `mega..`, `nice..` But from the other hand – that brings no details. A reader may decide to look for a hidden meaning and meditate for an hour or two of their paid working time.

## <a href="ninja-code.html#overlap-outer-variables" id="overlap-outer-variables" class="main__anchor">Overlap outer variables</a>

> When in the light, can’t see anything in the darkness.  
> When in the darkness, can see everything in the light.
>
> Guan Yin Zi

Use same names for variables inside and outside a function. As simple. No efforts to invent new names.

    let user = authenticateUser();

    function render() {
      let user = anotherValue();
      ...
      ...many lines...
      ...
      ... // <-- a programmer wants to work with user here and...
      ...
    }

A programmer who jumps inside the `render` will probably fail to notice that there’s a local `user` shadowing the outer one.

Then they’ll try to work with `user` assuming that it’s the external variable, the result of `authenticateUser()`… The trap is sprung! Hello, debugger…

## <a href="ninja-code.html#side-effects-everywhere" id="side-effects-everywhere" class="main__anchor">Side-effects everywhere!</a>

There are functions that look like they don’t change anything. Like `isReady()`, `checkPermission()`, `findTags()`… They are assumed to carry out calculations, find and return the data, without changing anything outside of them. In other words, without “side-effects”.

**A really beautiful trick is to add a “useful” action to them, besides the main task.**

An expression of dazed surprise on the face of your colleague when they see a function named `is..`, `check..` or `find...` changing something – will definitely broaden your boundaries of reason.

**Another way to surprise is to return a non-standard result.**

Show your original thinking! Let the call of `checkPermission` return not `true/false`, but a complex object with the results of the check.

Those developers who try to write `if (checkPermission(..))`, will wonder why it doesn’t work. Tell them: “Read the docs!”. And give this article.

## <a href="ninja-code.html#powerful-functions" id="powerful-functions" class="main__anchor">Powerful functions!</a>

> The great Tao flows everywhere,  
> both to the left and to the right.
>
> Laozi (Tao Te Ching)

Don’t limit the function by what’s written in its name. Be broader.

For instance, a function `validateEmail(email)` could (besides checking the email for correctness) show an error message and ask to re-enter the email.

Additional actions should not be obvious from the function name. A true ninja coder will make them not obvious from the code as well.

**Joining several actions into one protects your code from reuse.**

Imagine, another developer wants only to check the email, and not output any message. Your function `validateEmail(email)` that does both will not suit them. So they won’t break your meditation by asking anything about it.

## <a href="ninja-code.html#summary" id="summary" class="main__anchor">Summary</a>

All “pieces of advice” above are from the real code… Sometimes, written by experienced developers. Maybe even more experienced than you are ;)

- Follow some of them, and your code will become full of surprises.
- Follow many of them, and your code will become truly yours, no one would want to change it.
- Follow all, and your code will become a valuable lesson for young developers looking for enlightenment.

<a href="comments.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="testing-mocha.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fninja-code" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fninja-code" </a>

<a href="tutorial/map.html" class="map">

## <a href="ninja-code.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="code-quality.html" class="sidebar__link">Code quality</a>

#### Lesson navigation

- <a href="ninja-code.html#brevity-is-the-soul-of-wit" class="sidebar__link">Brevity is the soul of wit</a>
- <a href="ninja-code.html#one-letter-variables" class="sidebar__link">One-letter variables</a>
- <a href="ninja-code.html#use-abbreviations" class="sidebar__link">Use abbreviations</a>
- <a href="ninja-code.html#soar-high-be-abstract" class="sidebar__link">Soar high. Be abstract.</a>
- <a href="ninja-code.html#attention-test" class="sidebar__link">Attention test</a>
- <a href="ninja-code.html#smart-synonyms" class="sidebar__link">Smart synonyms</a>
- <a href="ninja-code.html#reuse-names" class="sidebar__link">Reuse names</a>
- <a href="ninja-code.html#underscores-for-fun" class="sidebar__link">Underscores for fun</a>
- <a href="ninja-code.html#show-your-love" class="sidebar__link">Show your love</a>
- <a href="ninja-code.html#overlap-outer-variables" class="sidebar__link">Overlap outer variables</a>
- <a href="ninja-code.html#side-effects-everywhere" class="sidebar__link">Side-effects everywhere!</a>
- <a href="ninja-code.html#powerful-functions" class="sidebar__link">Powerful functions!</a>
- <a href="ninja-code.html#summary" class="sidebar__link">Summary</a>

- <a href="ninja-code.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fninja-code" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fninja-code" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/03-code-quality/04-ninja-code" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
