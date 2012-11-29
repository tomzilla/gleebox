//provides base functionality for all pages
//
window.console = window.console || {};
$(function() {
$.address.change(function(event) {
    console.log(event);
});
Gleebox.require('header/navigationBar', function(NavBar) {
    var navBar = new NavBar();
    $('#header').append(navBar.node());
    Gleebox.require('home', function(Home) {
        var home = new Home();
        $('#content').append(home.node());
    });
    Gleebox.require('userInfo', function(M) {
        var userinfo = new M();
        $('#header').append(userinfo.node());
    });
});
});
