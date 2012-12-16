Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<button $btn btn-small btn-info$>Fav</button>',
        icon: 'http://i.imgur.com/qGFOp.png',
        itemId: '',
        faved:false,
        setFaved: function(isFaved) {
            this.faved = isFaved;
            if (isFaved) {
                this.node().html('<img src="' + this.icon + '" />');
            } else {
                this.node().html('Fav This');
            }
        },
        onRender: function(n) {
            var this2 = this;
            Gleebox.itemsService.bind(this.itemId + '_fav_changed', function(faved) {
                this2.setFaved(faved);
            });
            n.click(function(evt) {
                Gleebox.eventCenter.barrier('userservice_init', function() {
                    if (Gleebox.userService.currentUser.id) {
                        Gleebox.itemsService.setFav(this2.itemId, !this2.faved);
                    }
                });
            });
        }
    });
    Gleebox.addModule('favButton', module);
});

