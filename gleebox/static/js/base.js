//provides base functionality for all pages
//
var globalinfo, globallogout;
window.console = window.console || {};
$(function() {
$.address.change(function(event) {
    console.log(event);
});
Gleebox.require('header/navigationBar', function(NavBar) {
    var navBar = new NavBar();
    $('#header').append(navBar.node());
    Gleebox.require('userInfo', function(M) {
        var userinfo = new M();
        $('#header').append(userinfo.node());
        globalinfo = userinfo;
    });
});
});
