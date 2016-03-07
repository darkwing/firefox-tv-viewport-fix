# meta-viewport-shim

A viewport fix for devices (including Firefox OS TVs) that don't support [meta viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag).

## The Problem

Example:  You've coded your app to standard 1280x720 resolution for an HD television but you open the app on an Ultra HD TV and the app only appears to display on half of the television -- yikes!  Ideally the following `meta` tag would direct the app to scale larger to device size:

```
<meta name="viewport" content="width=1280, initial-scale=1">
```

If the app renderer does not support meta viewport, however, your app will not scale.

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

*Some apps have found success with using the CSS `zoom` property.  The `zoom` property is not supported by Firefox or Firefox OS.*

## What's in this repo?

Along with this repo is a test page and app manifest for testing on various screens and devices.
