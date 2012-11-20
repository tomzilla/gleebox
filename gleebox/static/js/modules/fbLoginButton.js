Gleebox.require('module', function(M) {
    var FbLoginButton = M.extend({
        template: '<a href="#">Login Using Facebook</a>',
        events: {
            'click': function(evt) {
                console.log('click');
                FB.login(function(response) {
                    console.log(response);
                    if (response.authResponse) {
                        Gleebox.api('account', 'create', {
                            'fb_token': response.authResponse.accessToken
                        }, function(data) {
                            console.log(data);
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    } 
                }, {'scope': 'email'});
            }
        }
    });
    Gleebox.addModule('fbLoginButton', FbLoginButton);
});
