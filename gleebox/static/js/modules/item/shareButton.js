Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<button $btn btn-info$>Share</button>',
        itemId: '',
        onRender: function(n) {
            n.click(function(evt) {
            });
        }
    });
    Gleebox.addModule('item/shareButton', module);
});

