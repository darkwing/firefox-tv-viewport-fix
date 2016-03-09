# meta-viewport-shim

A viewport fix for devices (including Firefox OS TVs) that don't support [meta viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag).

## The Problem

Example:  You've coded your app to standard 1280x720 resolution for an HD television but you open the app on an Ultra HD TV and the app only appears to display on half of the television -- yikes!  Ideally the following `meta` tag would direct the app to scale larger to device size:

```html
<meta name="viewport" content="width=1280, initial-scale=1">
```

If the app renderer does not support meta viewport, however, your app will not scale.

## The Optimal Solution

The optimal solution to this problem is to not use this shim but instead use [@media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) to detect a given screen size and make adjustments to it.  For example, the following CSS media query could target Firefox OS Ultra HD TVs:

```css
@media (max-width:1920px) and (max-height:1080px) {
  #app-wrapper {
    width: 1920px;
    height: 1080px;
  }

  /*
    Adjust any other important dimensions for other elements here
  */
}
```

This solution will require more work but a more reliable, visually appealing display.

## The Shim

`meta-viewport-shim` aims to simulate meta viewport support by gathering screen dimensions, analyzing the app's wrapping node dimensions, and using [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms) to scale the app to full screen dimensions.

### Implementing the Shim
Add `meta-viewport-shim.js` to your page via a `script` tag:

```html
<script src="meta-viewport-shim.js"></script>
```

Call the global `metaViewportShim` function, providing it the DOM node that "wraps" the app:

```js
metaViewportShim.shim(document.querySelector('#app-wrapper'));
```

To see a report of dimensions and applied scale (for use in debugging only), send `true` as a second argument:

```js
metaViewportShim.shim(document.querySelector('#app-wrapper'), true);
```

This utility uses a whitelist of known user agents that don't support meta viewport so as not to disturb an app when it shouldn't:

```js
userAgents: [
  'Mozilla/5.0 (FreeBSD; Viera; rv:34.0) Gecko/20100101 Firefox/34.0',
  'Mozilla/5.0 (FreeBSD; Viera; rv:44.0) Gecko/20100101 Firefox/44.0'
],
```

If you'd like to apply meta viewport in *all* cases, simply do the following before calling `shim()`:

```js
metaViewportShim.push(navigator.userAgent);
metaViewportShim.shim(document.querySelector('#app-wrapper'));
```

## Notes

* Some apps have found success with using the CSS `zoom` property.  The `zoom` property is not supported by Firefox or Firefox OS.

* CSS transforms may slightly impact performance of app or game

## What's in this repo?

Inside this repo is the `meta-viewport-shim.js` file you'll need to make this work, a test page, and an app manifest for testing on various screens and devices.
