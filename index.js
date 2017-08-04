var $ = require('jquery');
if (!Object.observe) require("object.observe");

module.exports = function(templater) {

    return function(strOrElem, obj) {
        
        if((typeof strOrElem) != 'string') {
            obj = obj || {};
            return makeBinding(strOrElem, obj);
        }

        var t = templater(strOrElem);
        
        function onChange(elem, callback) {
            elem.addEventListener('change', callback);
            elem.addEventListener('keydown', callback);
            elem.addEventListener('keyup', callback);
        }
        
        function observe(obj, key, callback) {
            Object.observe(obj, function(changes) {
                var i, change;
                for(i=0; i < changes.length; i++) {
                    change = changes[i];
                    if(!key || (change.name == key)) {
                        callback(change.object, key, change.type, change.oldValue);
                    }
                }
            });
        }
        
        function getContent(elem) {
            if(elem.tagName == 'INPUT') {
                return elem.value;
            } else {
                return elem.innerHTML;
            }
        }
        
        function setContent(elem, content) {
            if(elem.tagName == 'INPUT') {
                elem.value = content;
        } else {
            elem.innerHTML = content;
        }
        }
        
        function follow(obj, key, elem) {
            observe(obj, key, function(obj, key, type, oldValue) {
                setContent(elem, obj[key]);
            });
            setContent(elem, obj[key]);
        }
        
        function lead(obj, key, elem) {
            onChange(elem, function(e) {
                obj[key] = getContent(elem);
            });
        }
        
        function makeBinding(parent, o) {
            $(parent).find('[data-follow]').each(function(i, elem) {
                var key = elem.getAttribute('data-follow');
                follow(o, key, elem);
            });
            
            $(parent).find('[data-lead]').each(function(i, elem) {
                var key = elem.getAttribute('data-lead');
                lead(o, key, elem);
            });
            
            $(parent).find('[data-bind]').each(function(i, elem) {
                var key = elem.getAttribute('data-bind');
                follow(o, key, elem);
                lead(o, key, elem);
            });
            
            return parent;
        }

        function compileAndBind(parent, o) {
            parent = $(parent);
            var htmlstr = t(o);
            parent.html(htmlstr);
            makeBinding(parent, o);

            return parent;
        }

        return compileAndBind;
    }

};
