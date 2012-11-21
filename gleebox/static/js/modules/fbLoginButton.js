Gleebox.require('module', function(M) {
    var FbLoginButton = M.extend({
        template: '<a href="#">Login Using Facebook</a>',
        onRender: function(node) {
            node.click(function(evt) {
                FB.login(function(response) {
                    if (response.authResponse) {
                        Gleebox.api('account.fb_login', {
                            'fb_token': response.authResponse.accessToken
                        }, function(data) {
                            Gleebox.eventCenter.barrier('userservice_init', function callback() {
                                Gleebox.userService.setUser(data);
                            })
                        });
                    } 
                }, {'scope': 'email'});
            });
        }
    });
    Gleebox.addModule('fbLoginButton', FbLoginButton);
});
