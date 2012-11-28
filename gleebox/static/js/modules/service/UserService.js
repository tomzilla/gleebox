Gleebox.require("service/Service", function(S) {
    var UserService = S.extend({
        currentUser: {},
        setUser: function(data) {
            this.currentUser = data;
            console.log('user: ', data);
            this.fire('user_changed');
        },
        logout: function() {
            Gleebox.setCookie('token', '');
            this.setUser({});;
        }
    });
    Gleebox.addModule('service/UserService', UserService);
});
