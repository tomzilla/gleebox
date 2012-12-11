Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<li $$>' +
            '<img src="http://i.imgur.com/90i4k.png" />' +
            '</li>',
        title: ''
    });
    Gleebox.addModule('header/logo', module);
});

