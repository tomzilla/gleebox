Gleebox.require("service/UserService", function(US) {
    Gleebox.userService = new US();
    Gleebox.eventCenter.fire('userservice_init');
});
Gleebox.require('service/ItemsService', function(IS) {
    Gleebox.itemsService = new IS();
    Gleebox.eventCenter.fire('itemsservice_init');
});
