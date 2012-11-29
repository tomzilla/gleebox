Gleebox.require('module', function(M) {
    var module = M.extend({
        requires: ['itemBox/itemPicture'],
        template: '<div $$/>',
        item: {},
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('itemBox/itemPicture', function(Picture) {
                var picture = new Picture();
                var pictureKey = (this2.item['pictures'] && this2.item['pictures'].length > 0) ? this2.item['pictures'][0] : null;
                picture.setKey(pictureKey);
                n.append(picture.node());
            });
        }
    });
    Gleebox.addModule('itemBox/itemBox', module);
});

