clock-class-extended"

- <a href="clock-class-extended.html"
  clock-class-extended"
  /clock-class-extended"
- clock-class-extended"

<!-- -->

clock-class-extended"
/clock-class-extended"
/clock-class-extended"
clock-class-extended"

k%2Fclock-class-extended"%2Fclock-class-extended" </a>

<a href="../classes.html" Classes</span></a>

<a href="../class-inheritance.html" Class inheritance</span></a>

<a href="../class-inheritance.html"

## Extended clock

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We’ve got a `Clock` class. As of now, it prints the time every second.

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

Create a new class `ExtendedClock` that inherits from `Clock` and adds the parameter `precision` – the number of `ms` between “ticks”. Should be `1000` (1 second) by default.

- Your code should be in the file `extended-clock.js`
- Don’t modify the original `clock.js`. Extend it.

[Open a sandbox for the task.](https://plnkr.co/edit/3Ha7yGE4lnnhrgOq?p=preview)

solution

    class ExtendedClock extends Clock {
      constructor(options) {
        super(options);
        let { precision = 1000 } = options;
        this.precision = precision;
      }

      start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
      }
    };

[Open the solution in a sandbox.](https://plnkr.co/edit/CcPhRHTE11UljJq8?p=preview)
