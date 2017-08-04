
fetter is a simple two-way binding library that can be used with your favorite template engine.

fetter uses the object.observe polyfill library for when real Object.observe is not available.

Super early stage. This is really more of an experiment in minimalist two-way binding.

# usage

Three types of bindings are supported:

```
<input type="text" data-lead="foo" />
<div data-follow="foo" />
<input type="text" data-bind="foo" />
```

* data-lead: change object property when value is changed by user
* data-follow: change DOM when object property changes
* data-bind: same as both lead and follow at the same time

# example using doT templates

There is an example in example/

To try it simply:

```
npm install
cd example/
browserify main.js > bundle.js
firefox index.html
```

# ToDo

* Add "template re-compile when data changes"-option
* Add a way to iterate a template over an array and then append when an entry is appended.
* Get rid of jquery as a dependency.


# copyright and license

Copyright 2017 BioBricks Foundation

License: AGPLv3