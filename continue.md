# `\G`

E.G: [line_start 1 abc 2 def 4](https://stackoverflow.com/questions/51127479/regex-match-all-possibilities)
```
(?:\G(?!^)|^line_start)\D*\K\d+
```
Yields 3 matches: 1, 2, 4

Another example of the same type: https://stackoverflow.com/questions/4572697/continuing-at-the-end-of-the-previous-match-in-regex-pcre
```
Pig, Cow, Goat
fruit: apple, orange, peach, pear
vegetable: Carrot, Lettuce, Cellery
```

```
(?:fruit:\s*|(?<!^)\G,\s*)(\w+)
```

Yields all fruits after the preamble `fruit:` as individual match.

Smart use of `\K` can help to preserve some format, e.g.: https://regex101.com/r/ZQpgGa/1
```
(?:\[#\d+\K,|(?<!^)\G,)(#\d+)
```
substituting `_$1` in `#2335, IFCRELASSOCIATESMATERIAL, '2ON6$yXXD1GAAH8whbdZmc', #5,$,$, [#40,#221,#268,#281],#2334`

Yields: `#2335, IFCRELASSOCIATESMATERIAL, '2ON6$yXXD1GAAH8whbdZmc', #5,$,$, [#40_#221_#268_#281],#2334`  


See also: [Contiguous Matches: `\G` in .NET](https://docs.microsoft.com/en-us/dotnet/standard/base-types/anchors-in-regular-expressions#Contiguous)
which shows a kind of useless example since the .NET Regex engine is able to match repeated capture groups also without `\G`.  

https://stackoverflow.com/questions/14365969/how-the-anchor-z-and-g-works-in-ruby  
Say you have a list of words that are separated by arbitrary characters that cannot be well predicted (or there's too many possibilities to list). You'd like to match these words where each word is its own match up until a particular word, after which you don't want to match any more words. For example:

> foo,bar.baz:buz'fuzz*hoo-har/haz|fil^bil!bak

You want to match each word until 'har'. You don't want to match 'har' or any of the words that follow. You can do this relatively easily using the following pattern:

    /(?<=^|\G\W)\w+\b(?<!har)/

[rubular](http://rubular.com/r/txPGpr8tOn)

The first attempt will match the beginning of the input followed by zero non-word character followed by 3 word characters ('foo') followed by a word boundary. Finally, a negative lookbehind assures that the word which has just been matched is not 'har'.

On the second attempt, matching picks back up at the end of the last match. 1 non-word character is matched (',' - though it is not captured due to the lookbehind, which is a zero-width assertion), followed by 3 characters ('bar').

This continues until 'har' is matched, at which point the negative lookbehind is triggered and the match fails. Because all matches are supposed to be "attached" to the last successful match, no additional words will be matched.

The result is:

    foo
    bar
    baz
    buz
    fuzz
    hoo

If you want to reverse it and have all words after 'har' (but, again, not including 'har'), you can use an expression like this:

    /(?!^)(?<=har\W|\G\W)\w+\b/

[rubular](http://rubular.com/r/khxeACl9EH)

This will match either a word which is immediately preceeded by 'har' or the end of the last match (except we have to make sure not to match the beginning of the input). The list of matches is:

    haz
    fil
    bil
    bak

If you do want to match 'har' and all following words, you could use this:

    /\bhar\b|(?!^)(?<=\G\W)\w+\b/

[rubular](http://rubular.com/r/0sEmSvkXLA)

This produces the following matches:

    har
    haz
    fil
    bil
    bak
