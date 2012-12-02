Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<div>' +
            '<img src="http://i.imgur.com/qGFOp.png"/><span $favs summaryItem$></span>' +
            '<img src="http://i.imgur.com/4EJ46.png"/><span $comments summaryItem$></span>' +
            '</div>',
        setFavs: function(favs) {
            this.node('.favs').html(favs);
        },
        setComments: function(comments) {
            this.node('.comments').html(comments);
        }
    })

    Gleebox.addModule('itemBox/itemSummary', module);
});

