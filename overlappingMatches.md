# Overlapping Matches

Using a matching group in a lookahead, and then consume one character to move forward, e.g.

```
(?=(CCC)).
```

**CCC**C, C**CCC**

However, the consumed does have to be a dot, e.g.

```
(?=(nn))n
```

**nn**nn, n**nn**n, nn**nn**

The innner pattern also can be as complex as the regex engine supports it:

```
(?=(\d+\D+\d+)).
```

However, using a lookahead with a capturing group works, at the expense of making your regex slower and more complicated. An alternative solution is to tell the `Regex.Match()` method where the next match attempt should begin. In Java/.NET, it would look like this:

```
Regex regexObj = new Regex("nn");
Match matchObj = regexObj.Match(subjectString);
while (matchObj.Success) {
    matchObj = regexObj.Match(subjectString, matchObj.Index + 1);
}
```
