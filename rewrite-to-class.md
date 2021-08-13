rewrite-to-class"

- <a href="rewrite-to-class.html"
  rewrite-to-class"
  /rewrite-to-class"
- <a href="https://it.javascript.info/rewrite-to-class"

<!-- -->

rewrite-to-class"
/rewrite-to-class"
rewrite-to-class"
ask/rewrite-to-class"

/

Search

Search

k%2Frewrite-to-class"%2Frewrite-to-class" </a>

<a href="../classes.html" Classes</span></a>

<a href="../class.html" Class basic syntax</span></a>

<a href="../class.html"

## Rewrite to class

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The `Clock` class (see the sandbox) is written in functional style. Rewrite it in the “class” syntax.

P.S. The clock ticks in the console, open it to see.

[Open a sandbox for the task.](https://plnkr.co/edit/MmhvN3wn0sUBqjwR?p=preview)

solution

    class Clock {
      constructor({ template }) {
        this.template = template;
      }

      render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
          .replace('h', hours)
          .replace('m', mins)
          .replace('s', secs);

        console.log(output);
      }

      stop() {
        clearInterval(this.timer);
      }

      start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
      }
    }


    let clock = new Clock({template: 'h:m:s'});
    clock.start();

[Open the solution in a sandbox.](https://plnkr.co/edit/4pMcC17UHDAvmsna?p=preview)
