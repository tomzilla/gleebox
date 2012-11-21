//@ sourceURL=module.js
var module = EventDispatcher.extend({
    init: function() {
    },
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
        ret = ret.replace('$$', 'class="' + this.name + '" ');
        pat = /\$.*?\$/g;
        while (token = pat.exec(ret)) {
            ret = ret.replace(token[0], 'class="' + this.name + '_' + token[0].substring(1, token[0].length - 1) + '" ');
        }
        return ret;
    },
    _node: null,
    node: function() {
        if (!this._node) {
            this._node = $(this._render(this.template));
        }
        this.onRender(this._node);
        return $(this._node);
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
        this.children[id].node.remove();
        delete this.children[id];
    }
});
Gleebox.addModule('module', module);
