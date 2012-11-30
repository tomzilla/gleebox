//@ sourceURL=module.js
var module = EventDispatcher.extend({
    init: function() {
    },
    requires: [],
    onRender: function(node) {
    },
    template: '',
    templateTokens: {},
    _render: function(tpl) {
        var ret = tpl,
            pat = /\%.*?\%/g,
            token,
            key;
        while (token = pat.exec(ret)) {
            token = token[0];
            key = token.substring(1, token.length-1);
            
            if (this.hasOwnProperty(key)) {
                ret = ret.replace(token, this[key]);
            }
        }
        pat = /\$.*?\$/g;
        var classes;
        var classesString;
        while (token = pat.exec(ret)) {
            classesString = token[0].substring(1, token[0].length - 1);
            classes = classesString.split('\\s+');
            var classesCount = classes.length;
            for (var i = 0; i < classesCount; i ++) {
                classes.push(this.name + '_' + classes[i]);
            }
            ret = ret.replace(token[0], 'class="' + classes.join(' ') + '"');
        }
        return ret;
    },
    _node: null,
    node: function(selector) {
        if (!this._node) {
            this._node = $(this._render(this.template)).addClass(this.name);
            var this2 = this;
            this.onRender(this._node);
        }
        return selector ? $(this._node).find(selector) : $(this._node);
    },
    events: {},
    children: {},
    addChild: function(id, obj) {
        this.children[id] = obj;
    },
    getChild: function(id, cb) {
        if (this.children[id]) {
            cb(this.children[id]);
        }
    },
    removeChild: function(id) {
        if (this.children[id]) {
            this.children[id].node().remove();
            delete this.children[id];
        }
    }
});
Gleebox.addModule('module', module);
