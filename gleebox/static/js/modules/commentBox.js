Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(itemId) {
            this.itemId = itemId;
        },
        itemId: '',
        template: '<div>' +
            '<div $picture$/>' +
            '<textarea rows="3"></textarea>' +
            '<div $button$><button type="submit" class="btn">Submit</button></div>'+
            '</div>',
        onRender: function(n) {
            var instance = this;
            Gleebox.require('userPicture', function(Picture) {
                var pic = new Picture(Gleebox.userService.currentUser.fbid);
                n.find('.picture').append(pic.node());
            });
            n.find('button').click(function() {
                Gleebox.commentsService.addComment(instance.itemId, n.find('textarea').val());
                n.find('textarea').val("");
            });
        }
    });
    Gleebox.addModule('commentBox', module);
});
