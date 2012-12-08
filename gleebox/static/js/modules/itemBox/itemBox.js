Gleebox.require('module', function(M) {
    var module = M.extend({
        requires: ['itemBox/itemPicture', 'favButton'],
        template: '<div>' +
            '<div $inner$>' +
            '<div $picture$ />' +
            '<div $submitter$ />' +
            '<div $comment$ />' +
            '<div $details$ />' +
            '</div>' +
            '<div $fav$ />' +
            '</div>',
        item: {},
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('itemBox/itemPicture', function(Picture) {
                var picture = new Picture();
                var pictureKey = (this2.item['pictures'] && this2.item['pictures'].length > 0) ? this2.item['pictures'][0] : null;
                picture.setKey(pictureKey);
                n.find('.picture').append(picture.node());
            });
            Gleebox.require('favButton', function(Fav) {
                var button = new Fav();
                button.itemId = this2.item.id;
                button.setFaved(Boolean(this2.item.fav));
                n.find('.fav').append(button.node());
            });
            Gleebox.require('itemBox/itemSummary', function(Summary) {
                var summary = new Summary();
                summary.setFavs(this2.item.fav_count);
                summary.setComments(this2.item.comment_count);
                n.find('.details').append(summary.node());
            });
            n.click(function() {
                $.address.value('item?id=' + this2.item.id);
            });
        }
    });
    Gleebox.addModule('itemBox/itemBox', module);
});

