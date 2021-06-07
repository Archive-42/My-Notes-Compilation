Transform every second line

using awk

```
awk 'ORS=NR%2?" ":"\n"'
```

And the same in `sed`

```
sed ':a;N;$!ba;s/\nGroup/ Group/g'
```

If the line number is evenly divisible by 2, end with a new line, otherwise, end with a space.

    grep -oP "<asp:TextBox[^>]*ID=\"\K(\w+)|(?<=\G)[^>]*MaxLength=\"\K(\d+)" new.txt
             | awk 'ORS=NR%2?" ":"\n"'

Output:

    txtComments 1000
    txtDescription 240
