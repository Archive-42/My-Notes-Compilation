match-exact-tag"

- <a href="match-exact-tag.html"
  /match-exact-tag"
  /match-exact-tag"
  match-exact-tagmatch-exact-tag"

<!-- -->

- /"
  match-exact-tag"
- <a href="https://tr.javascript.info/"
  match-exact-tag"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fmatch-exact-tag"%2Fmatch-exact-tag" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-alternation.html" Alternation (OR) |</span></a>

<a href="../regexp-alternation.html"

## Find the full tag

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

<a href="match-exact-tag.html#"
<a href="match-exact-tag.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /<style(>|\s.*?>)/g;

    alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
