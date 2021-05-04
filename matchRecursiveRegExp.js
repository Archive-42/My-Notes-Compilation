When I posted my matchRecursive function the other day (which allows easily matching nested constructs), I noted that it could easily be modified to work with a regex pattern rather than a string as the format argument. After looking at it again, I realized the conversion wouldn't be entirely straightforward, so I've gone ahead and reimplemented it as matchRecursiveRegExp to work with regex format delimiters. You can now use it to like e.g. matchRecursiveRegExp(str, "<div\\b[^>]*>", "</div>", "gi") to match the entire contents of all outermost <div> tags.
As before, read the code comments for further details. Note that in this version I've made the variable names more or less indecipherable in order to keep code size down, so see the earlier function for a similar but more readable implementation.
// (c) 2007 Steven Levithan <stevenlevithan.com>
// MIT License

/*** matchRecursiveRegExp
	Accepts a string to search, a left and right format delimiter
	as regex patterns, and optional regex flags. Returns an array
	of matches, allowing nested instances of left/right delimiters.
	Use the "g" flag to return all matches, otherwise only the
	first is returned. Be careful to ensure that the left and
	right format delimiters produce mutually exclusive matches.
	Backreferences are not supported within the right delimiter
	due to how it is internally combined with the left delimiter.
	When matching strings whose format delimiters are unbalanced
	to the left or right, the output is intentionally as a
	conventional regex library with recursion support would
	produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
	"<" and ">" as the delimiters (both strings contain a single,
	balanced instance of "<x>").

	examples:
		matchRecursiveRegExp("test", "\\(", "\\)")
			returns: []
		matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
			returns: ["t<<e>><s>", ""]
		matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
			returns: ["test"]

*/
function matchRecursiveRegExp (str, left, right, flags) {
	var	f = flags || "",
		g = f.indexOf("g") > -1,
		x = new RegExp(left + "|" + right, "g" + f),
		l = new RegExp(left, f.replace(/g/g, "")),
		a = [],
		t, s, m;

	do {
		t = 0;
		while (m = x.exec(str)) {
			if (l.test(m[0])) {
				if (!t++) s = x.lastIndex;
			} else if (t) {
				if (!--t) {
					a.push(str.slice(s, m.index));
					if (!g) return a;
				}
			}
		}
	} while (t && (x.lastIndex = s));

	return a;
}
