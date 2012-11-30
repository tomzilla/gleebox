Gleebox.require("service/Service", function(S) {
    var UserService = S.extend({
        currentUser: {},
        setUser: function(data) {
            this.currentUser = data;
            if (Object.size(data)) {
                this.getFavs();
            }
            this.fire('user_changed', data);
        },
        logout: function() {
            Gleebox.setCookie('token', '');
            this.setUser({});;
        },
        favs: [],
        getFavs: function() {
            var instance = this;
            Gleebox.api('account.get_favs', {}, function(data) {
                if (data.response.favs) {
                    instance.favs = data.response.favs;
                    instance.fire('got_favs', instance.favs);
                }
            });
        }
    });
    Gleebox.addModule('service/UserService', UserService);
});
