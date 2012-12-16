Gleebox.require('favButton', function(B) {
    var module = B.extend({
        template: '<button $btn btn-info$>Fav</button>',
        icon: 'http://i.imgur.com/sFh40.png'
    });
    Gleebox.addModule('item/favButton', module);
});

