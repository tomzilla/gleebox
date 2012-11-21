Gleebox = Gleebox || {};

Gleebox = $.extend(Gleebox, {
    staticUrl: '/static/js/modules/',
    resourcesLoaded: {},
    modules: {},
    moduleCallbacks: {},
    addModule: function(name, moduleClass) {
        moduleClass.prototype.name = name.replace('/', '_');
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
            if (module.indexOf('service') == -1) {
                $("<link/>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/static/css/" + module + ".css"
                }).appendTo("head");
            }
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = Gleebox.staticUrl + module + '.js';
            $('head').append(script);
        }
    },
    api: function(call, params, callback) {
        console.log("Calling Gleebox API: " + call + " With params:");
        console.log(params);
        var c = call.split('.');
        $.get('/' + c[0] + '/' + c[1], params, callback, 'json');
    },
    login: function() {
        console.log('asds');
        Gleebox.eventCenter.barrier('userservice_init', function callback() {
            console.log('asdfa');
            if (!Object.size(Gleebox.userService.currentUser)) {
                //check cookie
                var token = Gleebox.getCookie('token');
                if (token) {
                    Gleebox.api('account.get', {token: token}, function(data) {
                        console.log(data);
                        if (!data.error) {
                            Gleebox.userService.setUser(data);
                        } else {
                            Gleebox.fbLogin();
                        }
                    });
                } else {
                    Gleebox.fbLogin();
                }
            }
        });
    },
    fbLogin: function() {
        FB.getLoginStatus(function(response) {
            //show login button
            Gleebox.require('fbLoginButton', function(Button) {
                var button = new Button();
                $('body').append(button.node());
            });
        });
    },
    getCookie: function(c_name)
    {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
                {
                    return unescape(y);
                }
        }
    },

    setCookie: function(c_name,value,exdays)
    {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }

});


