Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(itemObj) {
            var instance = this;
            this.item = itemObj;
            Gleebox.api('item.get', {item_id: itemObj.id}, function(data) {
                if (data.response.item) {
                    instance.item = data.response.item;
                    instance.fire('full_data_loaded', instance.item);
                }
            });

        },
        requires: ['item/actions'],
        template: '<div>' +
            '<div $left$/>' +
            '<div $right$/>'+
            '<div $comments$/>' +
            '</div>',
        item: {},
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('item/itemPicture', function(Picture) {
                var picture = new Picture();
                var pictureKey = (this2.item['pictures'] && this2.item['pictures'].length > 0) ? this2.item['pictures'][0] : null;
                picture.setKey(pictureKey);
                n.find('.left').append(picture.node());
            });
            Gleebox.require('item/actions', function(Actions) {
                var actions = new Actions(this2.item);
                n.find('.right').append(actions.node());
            });
        }


    });

    Gleebox.addModule('item', module);
});

