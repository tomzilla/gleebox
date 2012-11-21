Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<li $$>' +
            '%title%' +
            '</li>',
        title: ''
    });
    Gleebox.addModule('header/navigationItem', module);
});
