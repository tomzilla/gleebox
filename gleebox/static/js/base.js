//provides base functionality for all pages
//
Gleebox = {};

window.console = window.console || {};
Gleebox = {
    staticUrl: '/static/js/modules/',
    resourcesLoaded: {},
    modules: {},
    moduleCallbacks: {},
    addModule: function(name, moduleClass) {
        Gleebox.modules[name] = moduleClass;
        if (Gleebox.moduleCallbacks[name]) {
            for (var i = 0; i < Gleebox.moduleCallbacks[name].length; i++ ) {
                var cb = Gleebox.moduleCallbacks[name].pop();
                cb(moduleClass);
            }
        } else {
            console.log('adding module with no callbacks: ' + name);
        }
    },
    require: function(module, callback) {
        console.log('require: '+ module);
        Gleebox.moduleCallbacks[module] = Gleebox.moduleCallbacks[module] || [];
        if (Gleebox.modules[module]) {
            callback(Gleebox.modules[module]);   
        } else {
            Gleebox.moduleCallbacks[module].push(callback);
            $.ajax({
                url: Gleebox.staticUrl + module +'.js',
                type: 'GET',
                dataType: 'script'
            }).fail(function(jqxhr, settings, exception) {
                throw(exception);
            });
        }
    },
    api: function(controller, action, params, callback) {
        console.log("Calling Gleebox API: " + controller + ":" + action + " With params:" + params);
        $.post('/' + controller + '/' + action, params, callback, 'json');
    },
    login: function() {
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                //show page or something
            } else {
                //show login button
                Gleebox.require('fbLoginButton', function(Button) {
                    var button = new Button();
                    console.log('asds');
                    $('body').append(button.node());
                });
            }
        });
    }
};

$(function() {

});
