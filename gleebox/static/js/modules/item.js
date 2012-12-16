Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(itemObj) {
            var instance = this;
            this.item = itemObj;
            console.log(itemObj);
            Gleebox.api('item.get', {item_id: itemObj.id}, function(data) {
                if (data.response.item) {
                    instance.item = data.response.item;
                    instance.fire('full_data_loaded', instance.item);
                }
            });

        },
        requires: ['item/actions', 'item/itemPicture'],
        template: '<div $clearfix$>' +
            '<div $left$>' +
            '<div $description$ />' +
            '<div $location$ />' +
            '<div $picture$ />' +
            '<div $clearfix commentBox$/>' +
            '<div $clearfix comments$/>' +
            '</div>' +
            '<div $right$/>'+
            '</div>',
        item: {},
        onRender: function(n) {
            var this2 = this;
            n.find('.description').html(this.item.title);
            Gleebox.require('item/itemPicture', function(Picture) {
                var picture = new Picture();
                var pictureKey = (this2.item['pictures'] && this2.item['pictures'].length > 0) ? this2.item['pictures'][0] : null;
                picture.setKey(pictureKey);
                n.find('.picture').append(picture.node());
            });
            Gleebox.require('item/actions', function(Actions) {
                var actions = new Actions(this2.item);
                n.find('.right').append(actions.node());
            });
            Gleebox.require('commentBox', function(Comment) {
                var commentBox = new Comment(this2.item.id);
                n.find('.commentBox').append(commentBox.node());
            });
            Gleebox.require('item/comments', function(Comments) {
                var comments = new Comments(this2.item.id);
                n.find('.comments').append(comments.node());
            });
        }


    });

    Gleebox.addModule('item', module);
});

