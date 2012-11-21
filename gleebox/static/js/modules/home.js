Gleebox.require('module', function(M) {
    var home = M.extend({
        template: '<div $$>' +
            '</div>',
        onRender: function(node) {
            
        }

    });
    Gleebox.addModule('home', home);
});
