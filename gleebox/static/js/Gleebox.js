Gleebox = Gleebox || {};

Gleebox = $.extend(Gleebox, {
    staticUrl: '/static/js/modules/',
    resourcesLoaded: {},
    modules: {},
    moduleCallbacks: {},
    addModule: function(name, moduleClass) {
        moduleClass.prototype.name = name.replace('/', '_');
        Gleebox.modules[name] = moduleClass;
        var i;
        for (i = 0; moduleClass.prototype.requires && i < moduleClass.prototype.requires.length; i ++) {
            Gleebox.require(moduleClass.prototype.requires[i]);
        }
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
        var loading = Boolean(Gleebox.moduleCallbacks[module]);
        Gleebox.moduleCallbacks[module] = Gleebox.moduleCallbacks[module] || [];
        if (Gleebox.modules[module]) {
            if (callback) {
                callback(Gleebox.modules[module]);   
            }
        } else {
            if (callback) {
                Gleebox.moduleCallbacks[module].push(callback);
            }
            if (!loading) {
                console.log('require: '+ module);
                if (module.indexOf('service') == -1) {
                    $("<link/>", {
                        rel: "stylesheet",
                        type: "text/css",
                        href: "/static/css/modules/" + module + ".css?" + (new Date().getTime()) 
                    }).appendTo("head");
                }
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = Gleebox.staticUrl + module + '.js';
                $('head').append(script);
            }
        }
    },
    api: function(call, params, callback) {
        console.log("Calling Gleebox API: " + call + " With params:");
        console.log(params);
        var c = call.split('.');
        $.get('/' + c[0] + '/' + c[1], params, function(data) {
            console.log('result for api:', data);
            callback(data);
        }, 'json');
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


