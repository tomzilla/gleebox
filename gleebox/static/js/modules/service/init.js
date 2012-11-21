Gleebox.require("service/UserService", function(US) {
    Gleebox.userService = new US();
    console.log('yay');
    Gleebox.eventCenter.fire('userservice_init');
    console.log('yay');
});
