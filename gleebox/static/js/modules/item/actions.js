Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(itemObj) {
            this.item = itemObj;
        },
        requires: ['item/favButton', 'item/shareButton'],
        template: '<div>' +
            '<div $share$/>'+
            '<div $fav$/>'+
            '</div>',
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('item/favButton', function(Fav) {
                var button = new Fav();
                button.itemId = this2.item.id;
                button.setFaved(Boolean(this2.item.fav));
                n.find('.fav').append(button.node());
            });
            Gleebox.require('item/shareButton', function(S) {
                var share = new S();
                share.itemId = this2.item.id
                n.find('.share').append(share.node());
            });
        }

    });

    Gleebox.addModule('item/actions', module);
});
