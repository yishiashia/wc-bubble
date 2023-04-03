# wc-bubble

[![published][wc-image]][wc-url]
[![coverage][coverage-image]][coverage-url]
[![npm][npm-version-img]][npm-url]
[![npm][npm-download-img]][npm-url]
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/wc-bubble/badge)](https://data.jsdelivr.com/v1/package/npm/wc-bubble/badge)
[![GitHub issues][github-issue-img]][github-issue-url]
![license][license-img]

[![NPM](https://nodei.co/npm/wc-bubble.png?mini=true)](https://www.npmjs.com/package/wc-bubble)

A custom web component for a speech bubble.

![Demo image](https://yishiashia.github.io/img/demo/wc-bubble.png)

## Installation
You can install `wc-bubble` with npm, or just get started quickly with CDN.

### Install from npm
To install from npm, open terminal in your project folder and run:

```shell
npm install wc-bubble
```

After the package is installed, then you can import the bubble web component into you code:

```js
import 'wc-bubble';

window.onload = function() {
  let bubbleElement = document.createElement('chat-bubble');
  bubbleElement.textContent = 'Hello World';
  document.body.appendChild(bubbleElement);
}
```

### Install from CDN
There is `jsDelivr` CDN available for quickly integrated with your web page.

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/wc-bubble"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/wc-bubble@1.0.0"></script>
```

#### Basic Usages:

```html
<html>
  <head>

    <!-- Load Bubble WebComponent library -->
    <script src="https://cdn.jsdelivr.net/npm/wc-bubble"></script>
    <!-- End Load -->

  </head>

  <body>

    <!-- Using "chat-bubble" html tag to generate Bubble -->
    <chat-bubble>
      <p>Hello World</p>
    </chat-bubble>

  </body>
</html>
```

## Demo page
[Live Demo](https://yishiashia.github.io/wc-bubble)

## Attributes

### right
If this attribute is set, the chat bubble will be aligned to the right.

### avatar
String type. The URL or base64 encoded image of the user's profile picture.

### continued
If this attribute is set, the chat bubble will hide the avatar and tail, making it appear as a "continued" chat message bubble.

### loading
If this attribute is set, the chat bubble will display a CSS loading animation instead of the chat message content.

### delay
Number type. The chat bubble display animation will be delayed by the `delay` value multiplied by the CSS variable `--chat-bubble-delay` time interval.

## Element Properties

| Property  | Type    | Description |
| --------- | ------- | ----------- |
| right     | Boolean | Indicates whether the chat bubble is aligned to the right side of the chat window.. |
| continued | Boolean | Indicates whether the chat bubble is a continuation of a previous message. |
| loading   | Boolean | When this property is set to a truthy value, the component displays a loading animation in place of the bubble content. |

You can update the bubble component by setting its properties.

For example:

```javascript
const chatBubble = document.getElementsByTagName("chat-bubble")[0];

if (chatBubble !== undefined) {
  chatBubble.innerHTML = `<p>hello world</p>`
  chatBubble.right = false;
  chatBubble.continued = true;
}
```

## Event

### mounted event
When the bubble is rendered and the display animation is finished, a `mounted` event will be dispatched.

[wc-image]: https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square
[wc-url]: https://www.webcomponents.org/element/wc-bubble
[npm-version-img]: https://img.shields.io/npm/v/wc-bubble.svg?style=flat-square
[npm-download-img]: https://img.shields.io/npm/dm/wc-bubble.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/wc-bubble

[coverage-image]: https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fgist.githubusercontent.com%2Fyishiashia%2Fdee60aefdce58a7559baeb7c5deb3a8b%2Fraw%2F068f811e2f9b3fffb75ef20d5d63718154e41201%2Fwc-bubble__heads_main.json
[coverage-url]: https://gist.github.com/yishiashia/dee60aefdce58a7559baeb7c5deb3a8b#file-wc-bubble__heads_main-json

[github-issue-img]: https://img.shields.io/github/issues/yishiashia/wc-bubble.svg?style=flat-square
[github-issue-url]: https://github.com/yishiashia/wc-bubble/issues

[license-img]: https://img.shields.io/npm/l/wc-bubble.svg?style=flat-square
