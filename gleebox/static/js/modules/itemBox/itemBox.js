Gleebox.require('module', function(M) {
    var module = M.extend({
        requires: ['itemBox/itemPicture', 'favButton'],
        template: '<div>' +
            '<div $left$/>' +
            '<div $right$/>'+
            '</div>',
        item: {},
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('itemBox/itemPicture', function(Picture) {
                var picture = new Picture();
                var pictureKey = (this2.item['pictures'] && this2.item['pictures'].length > 0) ? this2.item['pictures'][0] : null;
                picture.setKey(pictureKey);
                n.find('.left').append(picture.node());
            });
            Gleebox.require('favButton', function(Fav) {
                var button = new Fav();
                button.itemId = this2.item.id;
                button.setFaved(Boolean(this2.item.fav));
                n.find('.left').append(button.node());
            });
        }
    });
    Gleebox.addModule('itemBox/itemBox', module);
});

