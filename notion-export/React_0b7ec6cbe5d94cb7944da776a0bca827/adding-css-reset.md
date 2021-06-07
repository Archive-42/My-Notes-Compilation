This project setup uses [PostCSS Normalize](https://github.com/csstools/postcss-normalize) for adding a [CSS Reset](https://cssreset.com/what-is-a-css-reset/).

To start using it, add `@import-normalize;` anywhere in your CSS file(s). You only need to include it once and duplicate imports are automatically removed. Since you only need to include it once, a good place to add it is `index.css` or `App.css`.

## `index.css`

    @import-normalize; /* bring in normalize.css styles */

    /* rest of app styles */

> **Tip**: If you see an “_Unknown at rule <span class="citation" data-cites="import-normalize">@import-normalize</span> css(unknownAtRules)_” warning in VSCode, change the `css.lint.unknownAtRules` setting to `ignore`.

You can control which parts of [normalize.css](https://github.com/csstools/normalize.css) to use via your project’s [browserslist](https://browserl.ist/).

Results when [browserslist](https://browserl.ist/) is `last 3 versions`:

    /**
     * Add the correct display in IE 9-.
     */

    audio,
    video {
      display: inline-block;
    }

    /**
     * Remove the border on images inside links in IE 10-.
     */

    img {
      border-style: none;
    }

Results when [browserslist](https://browserl.ist/) is `last 2 versions`:

    /**
     * Remove the border on images inside links in IE 10-.
     */

    img {
      border-style: none;
    }

## Browser support

Browser support is dictated by what normalize.css [supports](https://github.com/csstools/normalize.css#browser-support). As of this writing, it includes:

- Chrome (last 3)
- Edge (last 3)
- Firefox (last 3)
- Firefox ESR
- Opera (last 3)
- Safari (last 3)
- iOS Safari (last 2)
- Internet Explorer 9+
