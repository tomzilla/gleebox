Gleebox = Gleebox || {};
var EventDispatcher = Class.extend({
    _events: {},
    _barriers: {},
    bind: function(event, callback) {
        this._events[event] = this._events[event] || [];
        if (this._events[event]) {
            this._events[event].push(callback);
        }
    },
    unbind: function(event, callback) {
        if (this._events[event]) {
            var listeners = this._events[event];
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
        if (this._barriers[event] === true) {
            callback(this);
        } else {
            this._barriers[event] = this._barriers[event] || [];
            if (this._barriers[event]) {
                this._barriers[event].push(callback);
            }
        }
    },
    fire: function(event) {
        if (this._events[event]) {
            var listeners = this._events[event], len = listeners.length;
            while (len--) {
                listeners[len](this);   //callback with self
            }       
        }
        if (this._barriers[event] && this._barriers[event] !== true) {
            listeners = this._barriers[event], len = listeners.length;
            while (len--) {
                listeners[len](this);   //callback with self
            }       
        }
        this._barriers[event] = true;
    }
});
Gleebox.eventCenter = new EventDispatcher();
