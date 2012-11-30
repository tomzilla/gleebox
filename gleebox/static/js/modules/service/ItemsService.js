Gleebox.require('service/Service', function(S) {
    var service = S.extend({
        init: function() {
            var instance = this;
            instance.bind('items_loaded', function(items) {
                var i;
                for (i = 0; i < items.length; i ++) {
                    instance.itemsCache[items[i].id] = items[i];
                    (function (id) {
                        Gleebox.eventCenter.barrier('userservice_init', function(data) {
                            Gleebox.userService.barrier('got_favs', function() {
                                var favs = Gleebox.userService.favs;
                                if (favs.indexOf(String(id)) != -1) {
                                    instance.itemsCache[id]['fav'] = true;
                                    instance.fire(id + '_fav_changed', true);
                                }
                            });
                        });
                    })(items[i].id);
                }
                
            });
        },
        getHomeItems: function() {
            var this2 = this;
            Gleebox.api('item.get_home_items', {offset: this2.fetchedCount}, function(data) {
                if (!data.error) {
                    var items = data.response.items;
                    this2.homeItems = this2.homeItems.concat(items);
                    this2.fire('homeItems_added', items);
                    this2.fire('items_loaded', items);
                    this2.fetchedCount = this2.homeItems.length;
                }
            });
        },
        setFav: function(itemId, fav) {
            var instance = this;
            Gleebox.api('item.fav', {item_id: itemId, fav: fav}, function(data) {});
            console.log(instance.itemsCache);
            if (instance.itemsCache[itemId]) {
                instance.itemsCache[itemId]['fav'] = fav;
                instance.fire(itemId + '_fav_changed', fav);
            }
        },
        itemsCache: {},
        fetchedCount: 0, 
        homeItems: []
    });
    Gleebox.addModule('service/ItemsService', service);
});
