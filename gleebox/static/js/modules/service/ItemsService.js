Gleebox.require('service/Service', function(S) {
    var service = S.extend({
        getHomeItems: function() {
            var this2 = this;
            Gleebox.api('item.get_home_items', {offset: this2.fetchedCount}, function(data) {
                if (!data.error) {
                    var items = data.response.items;
                    this2.homeItems = this2.homeItems.concat(items);
                    this2.fire('homeItems_added', items);
                    this2.fetchedCount = this2.homeItems.length;
                }
            });
        },
        fetchedCount: 0, 
        homeItems: []
    });
    Gleebox.addModule('service/ItemsService', service);
});
