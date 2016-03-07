# meta-viewport-shim
A viewport fix for devices (including Firefox OS TVs) that don't support meta viewport.

## Usage
Add `meta-viewport-shim.js`to your page via a script tag:

```
<script src="meta-viewport-shim.js"></script>
```

Call the global `metaViewportShim` function, providing it the DOM node that contains the app:

```
metaViewportShim(document.querySelector('#app-wrapper'));
```

To see a report of dimensions and applied scale, send `true` as a second argument:

```
metaViewportShim(document.querySelector('#app-wrapper'), true);
```

## How does it work?

This utility gathers screen dimensions, analyzes the node's dimensions, and uses [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms) to scale the app to full screen size.

## What's in this repo?

Along with this repo is a test page and app manifest for testing on various screens and devices.
