Gleebox.require('module', function(M) {
    var userMenu = M.extend({
        template: '<div $$ />',
        onRender: function(n) {
            var this2 = this;
            $(document).click(function(evt) {
                this2.node().hide();
            });
            Gleebox.require('userMenuItem', function(MenuItem) {
                var logOut = new MenuItem();
                logOut.title = 'Logout';
                this2.addChild('logout', logOut);
                n.append(logOut.node());
                globallogout = logOut;
                logOut.node().bind('click', function(evt) {
                    this2.node().hide();
                    Gleebox.userService.logout();
                    $('body').unbind('click', this2.hide);
                });
            });
        },
        hide: function() {
            this.node().hide();
        }
    });
    Gleebox.addModule('userMenu', userMenu);
});
