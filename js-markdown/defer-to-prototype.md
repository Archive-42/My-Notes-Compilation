defer-to-prototype"

- <a href="defer-to-prototype.html"
  /defer-to-prototype"
  /defer-to-prototype"
  defer-to-prototypedefer-to-prototype"

<!-- -->

defer-to-prototype"
defer-to-prototype"
/defer-to-prototype"
defer-to-prototype"

k%2Fdefer-to-prototype"%2Fdefer-to-prototype" </a>

<a href="../prototypes.html" Prototypes, inheritance</span></a>

<a href="../native-prototypes.html" Native prototypes</span></a>

<a href="../native-prototypes.html"

## Add method "f.defer(ms)" to functions

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Add to the prototype of all functions the method `defer(ms)`, that runs the function after `ms` milliseconds.

After you do it, such code should work:

    function f() {
      alert("Hello!");
    }

    f.defer(1000); // shows "Hello!" after 1 second

solution

<a href="defer-to-prototype.html#"
<a href="defer-to-prototype.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    Function.prototype.defer = function(ms) {
      setTimeout(this, ms);
    };

    function f() {
      alert("Hello!");
    }

    f.defer(1000); // shows "Hello!" after 1 sec
