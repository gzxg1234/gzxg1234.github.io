cordova.define("com.cedarhd.WebPlugin.WebPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'WebPlugin', 'coolMethod', [arg0]);
};

});
