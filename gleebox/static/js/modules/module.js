var module = EventDispatcher.extend({
    init: function() {
    },
    onRender: function(node) {
    },
    template: '',
    templateTokens: {},
    _render: function(dict, tpl) {
        var ret = tpl;
        for (var k in dict) {
            ret = ret.replace('%' + k + '%', dict[k]);
        }
        return ret;
    },
    _node: null,
    node: function() {
        if (!this._node) {
            this._node = $(this._render(this.templateTokens, this.template));
        }
        this.onRender(this._node);
        console.log(this._node);
        return this._node;
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
