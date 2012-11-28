Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<div $$>' + 
            '%title%' +
            '</div>',
        title: ''
    });
    Gleebox.addModule('userMenuItem', module);
});

