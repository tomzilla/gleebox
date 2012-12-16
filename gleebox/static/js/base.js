//provides base functionality for all pages
//
window.console = window.console || {};
$(function() {
$.address.change(function(event) {
    if (event.path == '/item') {
        Gleebox.eventCenter.barrier('itemsservice_init', function() {
            Gleebox.itemsService.get(event.parameters.id, function(itemObj) {
                Gleebox.require('item', function(Item) {
                    var item = new Item(itemObj);
                    $('#content').html(item.node());
                });
            });
        });
    } else if (event.path == '/') {
        Gleebox.require('home', function(Home) {
            var home = new Home();
            $('#content').html(home.node());
        });
    }

});
Gleebox.require('header/navigationBar', function(NavBar) {
    var navBar = new NavBar();
    $('#header').append(navBar.node());
    Gleebox.require('userInfo', function(M) {
        var userinfo = new M();
        $('#header').append(userinfo.node());
    });
});
});
