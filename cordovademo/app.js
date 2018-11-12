var exec = cordova.require('cordova/exec');
var plugins = {
    showToast: function (msg) {
        exec(null, null, 'WebPlugin', 'showToast', [{
            msg: msg
        }]);
    },

    setTitleBar: function (config) {
        exec(null, null, "WebPlugin", "setTitleBar", [config]);
    },

    open: function (arg) {
        exec(null, function (result) {
            alert("错误:" + result);
        }, "WebPlugin", "open", [arg]);
    },

    close: function () {
        exec(null, null, "WebPlugin", "close", []);
    },

    pickContact: function (success, failed) {
        navigator.contacts.pickContact(success, failed);
    },

    takePicture: function (type) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: type,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
        };
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
            $('.img').attr('src', imageUri);
        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    }
};

var funcId = 0;

function addWindowFunc(func) {
    var name = 'func_' + funcId++;
    window[name] = func;
    return 'window.' + name + '()';
}

var app = {

    init: function () {
        var hideTitleBar = $('.hide_title_bar');

        $('.set_right_text').click(function () {
            plugins.setTitleBar({
                rightButton: {
                    visible: true,
                    text: $('.input_right_text').val()
                }
            })
        });
        $('.set_right_icon').click(function () {
            plugins.setTitleBar({
                rightButton: {
                    visible: true,
                    icon: $('.input_right_icon').val()
                }
            })
        });

        $('.set_right_text_color').click(function () {
            plugins.setTitleBar({
                rightButton: {
                    textColor: parseInt($('.input_right_text_color').val(), 16)
                }
            })
        });

        $('.set_right_back').click(function () {
            plugins.setTitleBar({
                rightButton: {
                    visible: true,
                    action: addWindowFunc(function () {
                        plugins.close();
                    })
                }
            })
        });
        $('.set_right_alert').click(function () {
            plugins.setTitleBar({
                rightButton: {
                    action: addWindowFunc(function () {
                        alert("hello,world")
                    })
                }
            })
        });
        hideTitleBar.click(function () {
            if (typeof(hideTitleBar.flag) === 'undefined' || hideTitleBar.flag === true) {
                plugins.setTitleBar({
                    visible: false
                });
                hideTitleBar.flag = false;
                hideTitleBar.textContent = "显示标题";
            } else {
                plugins.setTitleBar({
                    visible: true
                });
                hideTitleBar.flag = true;
                hideTitleBar.textContent = "隐藏标题";
            }
        });
        $('.set_title').click(function () {
            var title = $('.title_text').val();
            plugins.setTitleBar({
                titleText: title
            })
        });
        $('.set_title_color').click(function () {
            plugins.setTitleBar({
                titleColor: parseInt($('.title_text_color').val(), 16)
            })
        });

        $('.open_new_web').click(function () {
            plugins.open({
                type: 'h5',
                toPage: $('.input_url').val()
            })
        });
        $('.open_native').click(function () {
            plugins.open({
                type: 'native',
                toPage: $('.input_url').val()
            })
        });
        $('.set_bg_color').click(function () {
            plugins.setTitleBar({
                bgColor: parseInt($('.bg_color').val(), 16)
            })
        });
        $('.select_contact').click(function () {
            plugins.pickContact(function (contact) {
                $('.contact_info').text(JSON.stringify(contact));
            }, function (err) {
                alert(err);
            })
        });

        $('.take_picture_camera').click(function () {
            plugins.takePicture(Camera.PictureSourceType.CAMERA);
        });
        $('.take_picture_lib').click(function () {
            plugins.takePicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
        })

    }
};
app.init();