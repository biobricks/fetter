
var $ = require('jquery');
var doT = require('dot');
$.extend(doT.templateSettings, { varname: "o" });

var fetter = require('../index.js')(doT.template);

$(document).ready(function() {

    var o = {
        foo: 'bar'
    };

    // Initialize binding for existing DOM
    fetter(document, o);

    // Compile template for future re-use
    var myTemplate = fetter('<h3>This is a {{= o.foo }}</h3><p>Follow: <input type="text" data-follow="foo"><br/>Follow (innerHTML): <span data-follow="foo"></span><br/>Lead: <input type="text" data-lead="foo" /><br/>Bind: <input type="text" data-bind="foo" /></p>');

    // Compile template
    // Insert it into DOM as child of #foo
    // and initialize binding
    myTemplate('#container', o);

    $('#button').click(function() {
        o.foo = Math.random();
    });

});


