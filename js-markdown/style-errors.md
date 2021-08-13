style-errors"

- <a href="style-errors.html"
  /style-errors"
  /style-errors"
  style-errors"
  task/style-errors"

<!-- -->

style-errors"
style-errors"
/style-errors"
style-errors"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fstyle-errors"%2Fstyle-errors" </a>

<a href="../code-quality.html" Code quality</span></a>

<a href="../coding-style.html" Coding Style</span></a>

<a href="../coding-style.html"

## Bad style

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

What’s wrong with the code style below?

    function pow(x,n)
    {
      let result=1;
      for(let i=0;i<n;i++) {result*=x;}
      return result;
    }

    let x=prompt("x?",''), n=prompt("n?",'')
    if (n<=0)
    {
      alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
    }
    else
    {
      alert(pow(x,n))
    }

Fix it.

solution

You could note the following:

    function pow(x,n)  // <- no space between arguments
    {  // <- figure bracket on a separate line
      let result=1;   // <- no spaces before or after =
      for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
      // the contents of { ... } should be on a new line
      return result;
    }

    let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
    // but better make it 2 lines, also there's no spaces and missing ;
    if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
    {   // <- figure bracket on a separate line
      // below - long lines can be split into multiple lines for improved readability
      alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
    }
    else // <- could write it on a single line like "} else {"
    {
      alert(pow(x,n))  // no spaces and missing ;
    }

The fixed variant:

    function pow(x, n) {
      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    let x = prompt("x?", "");
    let n = prompt("n?", "");

    if (n <= 0) {
      alert(`Power ${n} is not supported,
        please enter an integer number greater than zero`);
    } else {
      alert( pow(x, n) );
    }
