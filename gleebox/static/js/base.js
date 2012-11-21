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
});
});
