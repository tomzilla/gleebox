Gleebox.require('module', function(M) {
    var FbLoginButton = M.extend({
        template: '<div $$></div>',
        onRender: function(node) {
            console.log('fb');
            node.click(function(evt) {
                console.log('click');
                FB.login(function(response) {
                    if (response.authResponse) {
                        Gleebox.api('account.fb_login', {
                            'fb_token': response.authResponse.accessToken
                        }, function(data) {
                            Gleebox.eventCenter.barrier('userservice_init', function callback() {
                                if (!data.error) {
                                    Gleebox.userService.setUser(data.response.user);
                                }
                            })
                        });
                    } 
                }, {'scope': 'email'});
            });
        }
    });
    Gleebox.addModule('fbLoginButton', FbLoginButton);
});
