Gleebox.require("service/UserService", function(US) {
    Gleebox.userService = new US();
    if (!Object.size(Gleebox.userService.currentUser)) {
        //check cookie
        var token = Gleebox.getCookie('token');
        if (token) {
            Gleebox.api('account.get', {token: token}, function(data) {
                Gleebox.userService.setUser(data.response.user);
            });
        }
    }
    Gleebox.eventCenter.fire('userservice_init');
});
Gleebox.require('service/ItemsService', function(IS) {
    Gleebox.itemsService = new IS();
    console.log(Gleebox.itemsService);
    Gleebox.eventCenter.fire('itemsservice_init');
    Gleebox.itemsService.getHomeItems();
});
Gleebox.require('service/CommentsService', function(CS) {
    Gleebox.commentsService = new CS();
    Gleebox.eventCenter.fire('commentsservice_init');
});
