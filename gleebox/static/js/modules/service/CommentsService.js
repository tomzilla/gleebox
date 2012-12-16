Gleebox.require("service/Service", function(S) {
    var CommentsService = S.extend({
        addComment: function(id, comment) {
            var instance = this;
            Gleebox.api('comment.create', {item_id:id, comment:comment}, function(obj) {
                obj.response.comment.user = {
                    id: Gleebox.userService.currentUser.id,
                    fbid: Gleebox.userService.currentUser.fbid,
                    display_name: Gleebox.userService.currentUser.first_name + ' ' + Gleebox.userService.currentUser.last_name
                };
                instance.fire('comment_added_' + id, obj.response.comment);
            });
        }
    });
    Gleebox.addModule('service/CommentsService', CommentsService);
});

