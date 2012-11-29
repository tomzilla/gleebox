Gleebox.require('module', function(M) {
    var module = M.extend({
        template: '<div $$>' +
            '<img $picture$ />' +
            '</div>',
        _key: '',
        setKey: function(k) {
            this._key = k;
            this.node().find('img').attr('src', k ? '//s3.amazonaws.com/gleebox_items/' + k : 'http://i.imgur.com/Ikgoj.jpg');
        }

    });
    Gleebox.addModule('itemBox/itemPicture', module);
});


