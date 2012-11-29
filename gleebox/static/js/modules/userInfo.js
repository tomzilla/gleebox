Gleebox.require('module', function(M) {
    var userMenu = M.extend({
        requires: ['fbLoginButton', 'userMenu'],
        template: '<div $$>' +
            '<div $loggedIn$>' +
                '<span $item first_name$ />' +
                '<span $item picture$ />' +
                '<a $item settings$ href="#"><span>Settings</span></a>' +
            '</div>' +
            '<div $loggedOut$ />' +
            '</div>',
        setUser: function (user) {
            var n = this.node();
            n.find('.loggedOut').hide();
            n.find('.loggedIn').hide();
            var this2 = this;
            if (Object.size(user)) {
                n.find('.loggedIn').show();
                this.node().find('.first_name').html('Welcome ' + user.first_name + '!');
                Gleebox.require('userPicture', function (M) {
                    var picture = new M();
                    picture.fbid = user.fbid;
                    this2.addChild('picture', picture);
                    this2.node().find('.picture').append(picture.node());
                });
            } else {
                n.find('.loggedOut').show();
                this2.removeChild('picture');
            }
        },
        onRender: function(n) {
            var this2 = this;
            Gleebox.eventCenter.barrier('userservice_init', function callback() {
                this2.setUser(Gleebox.userService.currentUser);
                Gleebox.userService.bind('user_changed', function(user) {
                    this2.setUser(user);
                });
            })
            Gleebox.require('fbLoginButton', function (M) {
                var button = new M();
                this2.addChild('loginButton', button);
                this2.node().find('.loggedOut').append(button.node());
            });
            Gleebox.require('userMenu', function(Menu) {
                var menu = new Menu();
                this2.addChild('userMenu', menu);
                this2.node().append(menu.node());
            });
            n.find('.settings').click(function(evt) {
                console.log('setting');
                evt.stopPropagation();
                this2.getChild('userMenu', function(menu) {
                    menu.node().show();
                });
            });
        }

    });
    Gleebox.addModule('userInfo', userMenu);
});

