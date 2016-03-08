# meta-viewport-shim

A viewport fix for devices (including Firefox OS TVs) that don't support [meta viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag).

## The Problem

Example:  You've coded your app to standard 1280x720 resolution for an HD television but you open the app on an Ultra HD TV and the app only appears to display on half of the television -- yikes!  Ideally the following `meta` tag would direct the app to scale larger to device size:

```html
<meta name="viewport" content="width=1280, initial-scale=1">
```

If the app renderer does not support meta viewport, however, your app will not scale.

## Usage

Add `meta-viewport-shim.js`to your page via a `script` tag:

```html
<script src="meta-viewport-shim.js"></script>
```

Call the global `metaViewportShim` function, providing it the DOM node that contains the app:

```js
metaViewportShim.shim(document.querySelector('#app-wrapper'));
```

To see a report of dimensions and applied scale, send `true` as a second argument:

```js
metaViewportShim.shim(document.querySelector('#app-wrapper'), true);
```

This utility uses a whitelist of known user agents that don't support meta viewport:

```js
userAgents: [
  'Mozilla/5.0 (FreeBSD; Viera; rv:34.0) Gecko/20100101 Firefox/34.0',
  'Mozilla/5.0 (FreeBSD; Viera; rv:44.0) Gecko/20100101 Firefox/44.0'
],
```

If you'd like to apply meta viewport in *all* cases, simply do the following before calling `shim()`:

```js
metaViewportShim.push(navigator.userAgent);
```

## How does it work?

This utility gathers screen dimensions, analyzes the node's dimensions, and uses [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms) to scale the app to full screen size.

*Some apps have found success with using the CSS `zoom` property.  The `zoom` property is not supported by Firefox or Firefox OS.*

## What's in this repo?

Along with this repo is a test page and app manifest for testing on various screens and devices.
