define(function(require, exports, module) {
    var $ = require('$');
    var cssFolder = '/mobi/public/themes/';
    var page = {
        home: {
            url: 'dist/app/version/home/index',
            version: '0.0.2'
        },
        user: {
            url: 'dist/app/version/user/index',
            version: '0.0.2'
        },
        about: {
            url: 'dist/app/version/about/index',
            version: '0.0.1'
        }
    };

    var fn = function(name, args) {
        var p = page[name];
        if(p) {
            seajs.vuse({
                url: p.url,
                version: p.version,
                callback: function(mod) {
                    mod($.extend({
                        r: {
                            $: $
                        }
                    }, args));
                }
            });
        } else {

        }
    };

    $(function() {
        var box = $('#box');
        seajs.vuse({
            url: cssFolder + 'default/css/scroll/scroll_1.css',
            version: '0.0.1'
        });

        // 路由
        $.history.listen({
            home: function() {
                fn('home');
            },
            'user/:id': function(id) { // :通配符
                fn('user', {
                    p: {
                        id: id
                    }
                });
            },
            about: function() {
                fn('about');
            },
            defaultRouter: 'user/1'
        });
    });
});