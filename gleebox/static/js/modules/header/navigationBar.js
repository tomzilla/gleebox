Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<ul $$></ul>',
        requires: ['header/logo', 'header/navigationItem'],
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('header/logo', function(Logo) {
                var logoItem = new Logo();
                logoItem.node().click(function() {
                    $.address.value('/');
                });
                this2.addChild('logo', logoItem);
                n.append(logoItem.node());

            });
            Gleebox.require('header/navigationItem', function(NavItem) {

                var favItem = new NavItem();
                favItem.imageSrc = 'http://i.imgur.com/xTxM9.png';
                favItem.node().click(function() {
                    $.address.value('/fav');
                });
                this2.addChild('fav', favItem);
                n.append(favItem.node());

                var notifItem = new NavItem();
                notifItem.imageSrc = 'http://i.imgur.com/Cmgvg.png';
                notifItem.node().click(function() {
                    $.address.value('/notif');
                });
                this2.addChild('fav', notifItem);
                n.append(notifItem.node());
            });
        }
    });
    Gleebox.addModule('header/navigationBar', module);
});

