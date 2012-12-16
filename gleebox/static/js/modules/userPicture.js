Gleebox.require('module', function(M) {
    var module = M.extend({
        init: function(id) {
            this.fbid = id;
        },
        template: '<img $$ src="//graph.facebook.com/%fbid%/picture?type=square" />',
        fbid: '',
        setFbid: function (id) {
            this.fbid = id;
            this.node().find('.userPicture').src('//graph.facebook.com/' + id + '/picture?type=square');
        }
    });
    Gleebox.addModule('userPicture', module);
});

