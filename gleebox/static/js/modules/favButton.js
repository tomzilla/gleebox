Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<button $btn btn-small$>Fav</button>',
        itemId: '',
        faved:false,
        setFaved: function(isFaved) {
            this.faved = isFaved;
            console.log('set fav', isFaved);
            if (isFaved) {
                this.node().html('<img src="http://i.imgur.com/xrj0X.png" />');
            } else {
                this.node().html('Fav');
            }
        },
        onRender: function(n) {
            var this2 = this;
            Gleebox.itemsService.bind(this.itemId + '_fav_changed', function(faved) {
                this2.setFaved(faved);
            });
            n.click(function(evt) {
                Gleebox.itemsService.setFav(this2.itemId, !this2.faved);
            });
        }
    });
    Gleebox.addModule('favButton', module);
});
