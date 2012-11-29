Gleebox.require('module', function(M) {
    var module = M.extend({
        requires: ['itemBox/itemPicture'],
        template: '<div $$/>',
        item: {},
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('itemBox/itemPicture', function(Picture) {
                var picture = new Picture();
                console.log(this2.item);
                picture.setKey(this2.item['pictures'][0]);
                n.append(picture.node());
            });
        }
    });
    Gleebox.addModule('itemBox/itemBox', module);
});

