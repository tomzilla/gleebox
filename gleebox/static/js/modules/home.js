Gleebox.require('module', function(M) {
    var module = M.extend({
        requires: ['itemBox/itemBox'],
        template: '<div $$/>',
        onRender: function(n) {
            var this2 = this;
            Gleebox.eventCenter.barrier('itemsservice_init', function() {
                var items = Gleebox.itemsService.homeItems;
                if (Object.size(items)) {
                    this2.addItems(items);
                }
                Gleebox.itemsService.bind('homeItems_added', function(data) {
                    this2.addItems(data)
                });
            });
        },
        addItems: function(items) {
            var this2 = this;
            var i, itemBox;
            Gleebox.require('itemBox/itemBox', function(Box) {
                for (i = 0; i < items.length; i++) {
                    itemBox = new Box();
                    itemBox.item = items[i];
                    this2.node().append(itemBox.node());
                }
            });

        }
    });
    Gleebox.addModule('home', module);
});


