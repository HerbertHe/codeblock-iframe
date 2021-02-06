# codeblock-iframe

[![version](https://img.shields.io/npm/v/codeblock-iframe.svg)](https://www.npmjs.com/package/codeblock-iframe)
[![download](https://img.shields.io/npm/dm/codeblock-iframe.svg)](https://www.npmjs.com/package/codeblock-iframe)
[![cnpmVersion](https://cnpmjs.org/badge/v/codeblock-iframe.svg)](https://cnpmjs.org/package/codeblock-iframe)
[![cnpmDownload](https://cnpmjs.org/badge/d/codeblock-iframe.svg)](https://cnpmjs.org/package/codeblock-iframe)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/codeblock-iframe/badge)](https://www.jsdelivr.com/package/npm/codeblock-iframe)

> A library that can let you use iframe in markdown extra syntax securely! This is the version for getting script from CDN

**If you want to use it with webpack, plz use [toml2iframe](https://github.com/HerbertHe/toml2iframe) instead!**

[简体中文](./README.CN.md) | [English](./README.md)

## Try it

In the [Demo](https://herberthe.github.io/codeblock-iframe/demo), You can experience how it works!

## Usage

Add script from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/codeblock-iframe@latest/dist/index.min.js"></script>
```

Use the functions from this library via the global variable `__codeblock_iframe`

```js
// iframe attributes
const content = `
src="www.baidu.com"
width="100%"
height="500"
`
const converter_result = window.__codeblock_iframe.converter(content)
const filter_result = window.__codeblock_iframe.filter(content, ["www.baidu.com", "www.google.com"])

console.log(converter_result)
// output: [
//  '<iframe src="www.baidu.com" width="100%" height="500"></iframe>',
//  true,
//  [ 'src', 'width', 'height' ]
//]

console.log(filter_result)
// output: [ true, 'www.baidu.com' ]
```

Following formats of `src` are supported!

```text
www.baidu.com
//www.baidu.com
http://www.baidu.com
https://www.baidu.com
```

## Functions

- iframe Attributes

| Attributes   |
| ------------ |
| src          |
| height       |
| width        |
| align        |
| frameborder  |
| longdesc     |
| marginheight |
| marginwidth  |
| name         |
| sandbox      |
| scrolling    |
| seamless     |
| srcdoc       |
| textContent  |

- Params

| Param   | Type            | Description                                                                           |
| ------- | --------------- | ------------------------------------------------------------------------------------- |
| content | `string`        | Iframe's attributes (including `textContent` for children) using standard TOML syntax |
| filters | `Array<string>` | Allowed domain list (required in `filter` function, **DO NOT WITH Protocol**)         |

- Functions

1. `converter(content: string, filters?: Array<string>)`: for convertering attributes to iframe
2. `filter(content: string, filters: Array<string>)`: for filtering domains

- Outputs

For `converter(content: string, filters?: Array<string>)`: [ result, if passed filter?, [ attributes' names for debug ] ]

For `filter(content: string, filters: Array<string>)`: [ if passed filter?, domain (if src's value is not the valid uri, return raw src's value) ]

> `/www.baidu.com` is not the valid uri, plz use `www.baidu.com` directly! **If you want to use same origin page, plz don't input the `filters` param, you will get nothing for `converter` function!!!** Or, you give the complete path for `src` and add your same origin page's domain to `filters` param, it will work!!

## Why To Do

To be honest, Markdown supports HTML tags natively! But here are some issues we have to face as followed:

1. If I didn't want my users insert ads in their posts via iframe but supported them using codepen to share their codes, how could I do?
2. Sometimes we try to insert iframe in some markdown editor. For immediately rendering, the browser will send a lot of GET requests to our target website when we inputting, how could we optimize? Even it causes our page breakdown when developing and using SSR

## How To Do

Code Block Renderer is easy for us to extend native markdown syntax, so we can limit the frequency of iframe rendering in this way.

## Thanks

- [iarna-toml](https://github.com/iarna/iarna-toml): Better TOML parsing and stringifying all in that familiar JSON interface.
