Gleebox = Gleebox || {};
var EventDispatcher = Class.extend({
    events: {},
    barriers: {},
    bind: function(event, callback) {
        this.events[event] = this.events[event] || [];
        if (this.events[event]) {
            this.events[event].push(callback);
        }
    },
    unbind: function(event, callback) {
        if (this.events[event]) {
            var listeners = this.events[event];
            for (var i = listeners.length-1; i>=0; --i){
                if (listeners[i] === callback) {
                    listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    },
    barrier: function(event, callback) {
        if (this.barriers[event] === true) {
            callback(this);
        } else {
            this.barriers[event] = this.barriers[event] || [];
            if (this.barriers[event]) {
                this.barriers[event].push(callback);
            }
        }
    },
    fire: function(event) {
        if (this.events[event]) {
            var listeners = this.events[event], len = listeners.length;
            while (len--) {
                listeners[len](this);   //callback with self
            }       
        }
        if (this.barriers[event] && this.barriers[event] !== true) {
            listeners = this.barriers[event], len = listeners.length;
            while (len--) {
                listeners[len](this);   //callback with self
            }       
            this.barriers[event] = true;
        }
    }
});
Gleebox.eventCenter = new EventDispatcher();
