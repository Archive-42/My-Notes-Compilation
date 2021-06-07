# Parenthesis and other nested structures

## Get everything between parenthesis

    \[(.*?)\]

## Get everything between C/C++ multiline comments /\* \*/

    \/\*[\S\s]*?\*\/

## Get everything between single quotes allowing inline escaping using the rolling loop technique

    '((?:[^\\']|\\.)*)'

## Check that string CONTAINS a valid hierarchy of parenthesis or not

    \(((?>[^()]+)|(?R))*\)

## Get everything between braces not enclosed by quotes

    ("|').*?\1(*SKIP)(*FAIL)|\{(?:[^{}]|(?R))*\}

… allowing escaping special characters

    ("|').*?\1(*SKIP)(*FAIL)|{(?>[^{}\\]++|\\.|(?R))*+}

## Get everything between parenthesis allowing escaping special characters

    (\((?>[^()\\]++|\\.|(?1))*+\))

## Matching 3 different types of balanced parentheses with .NET balancing groups

    (
        [^(){}\[\]]+
        | \( (?=[^)]*  (?<Stack> \) ) )
        | \[ (?=[^\]]* (?<Stack> \] ) )
        | \{ (?=[^}]*  (?<Stack> \} ) )
        | \k<Stack> (?<-Stack>)
    )+?
    (?(Stack) (?!))

### Match every thinkable type of balanced parentheses and content in-between with a PCRE

https://stackoverflow.com/questions/27827819/can-conditionals-be-used-to-pair-balance-group-elements  
https://regex101.com/r/bX8yH4/6

    (?(DEFINE)
      (?<curly>  \{        \g<content>*? \}      )
      (?<square> \[        \g<content>*? \]      )
      (?<pascal> \bbegin\b \g<content>*? \bend\b )
      (?<lua>    --\[      \g<content>*? --\]    )

      (?<nested> \g<curly> | \g<square> | \g<pascal> | \g<lua> )

      (?<content>
        # Match non-recursive content (atomically)
        (?: (?! [{}\[\]] | \bbegin\b | \bend\b | --[\[\]] ) .)++
        # Or recurse
        | \g<nested>
      )
    )

    \g<nested>

https://stackoverflow.com/a/27828040/8291949

## Get everything between double quotes

    "[^"]+"

### .. quotes allowing escaped quotes

#### PCRE (quickest)

    ["'](?:(?<=")[^"\\]*(?s:\\.[^"\\]*)*"|(?<=')[^'\\]*(?s:\\.[^'\\]*)*')

`(?s:...)` is a syntactic sugar to switch on the dotall/singleline mode inside the non-capturing group. If this syntax is not supported use a flag to switch this mode on for all the pattern or replace the dot with `[\s\S])`

#### ECMA script:

    (?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')

#### POSIX extended:

    "[^"\\]*(\\(.|\n)[^"\\]*)*"|'[^'\\]*(\\(.|\n)[^'\\]*)*'

or simply:

    "([^"\\]|\\.|\\\n)*"|'([^'\\]|\\.|\\\n)*'

#### using regex recurision (slow)

    (["'])(?:(?=(\\?))\2.)*?\1

`([""'])` match a quote; `((?=(\\?))\2.)` if backslash exists, gobble it, and whether or not that happens, match a character; `*?` match many times (non-greedily, as to not eat the closing quote); `\1` match the same quote that was use for opening.

Optimized version

    (['"])(?:(?!\1|\\).|\\.)*\1

---

JavaScript/ECMAScript can’t make use of Regex Recursion to match nested constructs. Still, given that there is a known maximum amount of recursion that needs to be accounted for, it’s quite possible. The solution below works just fine with JavaScript and does not require any advanced regex features):

    @[^{]+{(?:[^{}]|{[^{}]*})*}

However, this works only if:

- braces are always balanced, and
- the level of brace nesting is no more than one.

This logic is easy to extend to support more levels of recursion, up to a **known maximum**. Here’s a simple example of matching HTML elements and their contents

No recursion: `<([a-z\d]+)>.*?</\1>` Up to one level of recursion: `<([a-z\d]+)>(?:<\1>.*?</\1>|.)*?</\1>` Up to two levels of recursion: `<([a-z\d]+)>(?:<\1>(?:<\1>.*?</\1>|.)*?</\1>|.)*?</\1>`

…And so on. Note that the above don’t support attributes or singleton (self-closed) elements, but that would make the regexes longer and this is only meant for demonstration purposes. [Source](http://blog.stevenlevithan.com/archives/regex-recursion).

### Formula structure like (a b c) d e (f g) h

    (?(DEFINE)
      (?<open>\()
      (?<close>\))
      (?<val>(?&open)|(\w\s?)+)
      (?<start>(?&open)(?&val)(?&close))
    )
    (?&start)|(?<=\s)\w
