Check list component
====================

[![build status](https://img.shields.io/travis/magsdk/component-check-list.svg?style=flat-square)](https://travis-ci.org/magsdk/component-check-list)
[![npm version](https://img.shields.io/npm/v/mag-component-check-list.svg?style=flat-square)](https://www.npmjs.com/package/mag-component-check-list)
[![dependencies status](https://img.shields.io/david/spasdk/component-check-list.svg?style=flat-square)](https://david-dm.org/spasdk/component-check-list)
[![devDependencies status](https://img.shields.io/david/dev/spasdk/component-check-list.svg?style=flat-square)](https://david-dm.org/spasdk/component-check-list?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


Check list is a component to build user interface, an instance of [Component](https://github.com/spasdk/component) module.


## Installation ##

```bash
npm install mag-component-check-list
```


## Usage ##

Add the constructor to the scope:

```js
var CheckList = require('mag-component-check-list');
```

Create check list instance:

```js
var checkList = new CheckList({
    focusIndex: 0,
    data: [
        {state: false, title: 'Some title 1', value: 'value 1'},
        {state: true, title: 'Some title 2', value: 'value 2'},
        {state: false, title: 'Some title 3', value: 'value 3'}
    ]
});
```


## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/spasdk/component-check-list/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`mag-component-check-list` is released under the [MIT License](license.md).
