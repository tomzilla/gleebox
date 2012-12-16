Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(comment) {
            this.comment = comment;
        },
        comment: {},
        template: '<div $clearfix$>' +
           '<div $picture$/>' +
           '<div $comment$/>' +
           '</div>',
        onRender: function(n) {
            var instance = this;
            Gleebox.require('userPicture', function(Picture) {
                var pic = new Picture(instance.comment.user.fbid);
                n.find('.picture').append(pic.node());
            });
            n.find('.comment').html(this.comment.comment);
            
        }
    });
    Gleebox.addModule('item/comment', module);
});

