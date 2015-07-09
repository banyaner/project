
(function($, name) {
    var api = window[name] = {};
    var get_method = 'null user/logout user/status strategy/list strategy/my strategy/detail strategy/netvalue strategy/position strategy/trace strategy/params strategy/progress strategy/purchase strategy/purchased strategy/collect strategy/delete/collection strategy/collection strategy/backtest strategy/delete strategy/task/detail strategy/set/offline strategy/online strategy/publish strategy/withdraw user/check/repeat'.split(' ');
    var post_method = 'user/login user/reg user/reset/password strategy/new strategy/check/params strategy/backtest strategy/set/online user/modify/password'.split(' ');

    $(get_method).each(function(i, e) {
        api[e.replace(new RegExp("/","gm"),"_")] = function(param) {
            return $.getJSON('/api/' + e, param);
        }
    });

    $(post_method).each(function (i, e) {
        api[e.replace(new RegExp("/","gm"),"_")] = function (param) {
            return $.post('/api/' + e, param, null, 'json');
        }
    });

    var wrap = function(name, success, fail) {
        var orig_fn = api[name];
        api[name] = function(param) {
            return orig_fn(param).then(success, fail);
        };
    };

    $('user_login user_reg user_modify_password'.split(' ')).each(function (i, e) {
        var orig_fn = api[e];
        api[e] = function (param) {
            var uid = param['username'];
            if (uid && ('password' in param)) {
                param['password'] = md5(md5(uid.toLowerCase()) + "gpxniubility" + param['password']);
            }
            if (uid && ('newpass' in param)) {
                param['newpass'] = md5(md5(uid.toLowerCase()) + "gpxniubility" + param['newpass']);
            }
            return orig_fn(param);
        }
    });

    api['logout'] = function(d) {
        var deferred = $.Deferred();
        jQuery.cookie('gpxtoken', null);
        jQuery.cookie('username', null);

        deferred.resolve(null);

        return deferred;
    };

    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }

})(jQuery, 'API');

