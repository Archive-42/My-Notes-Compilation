# Some Fun with Regex and LinQ

## Projection/Mapping

Project match result directly to formated result string
```
RegEx.Matches(myText,searchPatten).Cast<Match>().Select(x => $"{x.Groups[1].Value} {x.Groups[2].Value}").ToArray();
```

## Extend result with Select new

Here : Match a pattern and apply Replace on the resulting Match Collection, something like. `RegEx.MatchAndReplace(myText,searchPattern,replacePattern);`

This allows us to get the Index and the Length of each match along what it would be replaced with.  
<!-- We want to use LinQ since Regex.Replace internally uses the Matches but doesn't expose its content, nor Regex expose the interpreter it uses for the replacement pattern. -->

```
use Regex.Matches() and then on every Match do a Regex.Replace()
var regex = new Regex(searchPattern);

var matches = regex.Matches(myText)
    .Cast<Match>()
    .Select(x => new
    {
        Match = x,
        ReplacedWith = regex.Replace(x.Value, replacePatten)
    })
    .ToArray();
    ```
