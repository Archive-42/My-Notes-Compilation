
## Comma-separated values, semi-colon when not surrounded by single or double quotes

```
[^,"']+|"([^"]*)"|'([^']*)'
[^,"']+|"([^"]*)"|'([^']*)'
```

..

## Tab-separated values when not surrounded by single or double quotes

```
[^\t"']+|"([^"]*)"|'([^']*)'

[^\s"']+|"([^"]*)"|'([^']*)'
```
## Drop-in csv/tsv pattern

```
/\t(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/gm;  
```
Just replace the first character, that acts as a separator (here, a tab).
