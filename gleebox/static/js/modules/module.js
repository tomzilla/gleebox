console.log(Class);
var module = Class.extend({
    init: function() {
    },
    template: '',
    html: function() {
        return this.template;
    },
    node: function() {
        var n = $(this.html());
        for (var evt in this.events) {
            n.bind(evt, this.events[evt]);
        }
        console.log(n);
        return n;
    },
    events: {}
});
Gleebox.addModule('module', module);
