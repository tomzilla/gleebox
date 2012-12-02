Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(itemObj) {
            this.item = itemObj;
        },
        requires: ['favButton'],
        template: '<div>' +
            '<div $share$/>'+
            '<div $fav$/>'+
            '</div>',
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('favButton', function(Fav) {
                var button = new Fav();
                button.itemId = this2.item.id;
                button.setFaved(Boolean(this2.item.fav));
                n.find('.fav').append(button.node());
            });
        }

    });

    Gleebox.addModule('item/actions', module);
});
