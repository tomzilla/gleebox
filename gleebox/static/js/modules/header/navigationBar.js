Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<ul $$></ul>',
        onRender: function(n) {
            var this2 = this;
            Gleebox.require('header/navigationItem', function(NavItem) {
                var homeItem = new NavItem();
                homeItem.title = 'Home';
                homeItem.node().click(function() {
                    $.address.value('');
                });
                this2.addChild('home', homeItem);
                n.append(homeItem.node());

                var favItem = new NavItem();
                favItem.title = 'Favs';
                favItem.node().click(function() {
                    $.address.value('/fav');
                });
                this2.addChild('fav', favItem);
                n.append(favItem.node());

                var notifItem = new NavItem();
                notifItem.title = 'Notif';
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

