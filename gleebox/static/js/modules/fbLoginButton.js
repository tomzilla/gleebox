Gleebox.require('module', function(M) {
    var FbLoginButton = M.extend({
        template: '<a href="#">Login Using Facebook</a>',
        events: {
            'click': function(evt) {
                console.log('click');
            }
        }
    });
    console.log(FbLoginButton);
    Gleebox.addModule('fbLoginButton', FbLoginButton);
});
