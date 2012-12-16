Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(itemId) {
            this.itemId = itemId;
            var instance = this;
            Gleebox.eventCenter.barrier('commentsservice_init', function() {
                Gleebox.commentsService.bind('comment_added_' + itemId, function(data) {
                    instance.addItem(data);
                });
            });
        },
        addItem: function(obj) {
            var instance = this;
            Gleebox.require('item/comment', function(Comment) {
                var comment = new Comment(obj);
                instance.node().append(comment.node());
            });
        },
        requires: ['item/comment'],
        template: '<div/>',
        onRender: function(n) {
            var instance = this;
            Gleebox.api('item.get_comments', {item_id: instance.itemId},  function(data) {
                if (data.response) {
                    var i;
                    for (i = 0; i < data.response.length; i++) {
                        instance.addItem(data.response[i]);
                    }
                }
            });
        }
    });
    Gleebox.addModule('item/comments', module);
});
