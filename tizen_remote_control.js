(function () {
    'use strict';

    function startPlugin() {
        if (window.tizen_remote_control_plugin) return;
        window.tizen_remote_control_plugin = true;

        // Анонимная аналитика без куков и без передачи личных данных (goatcounter.com)
        new Image().src = 'https://amiv1.goatcounter.com/count?p=/tizen-remote-control';

        if (typeof tizen === 'undefined') {
            // Not a Tizen device
            return;
        }

        // https://developer.samsung.com/smarttv/develop/guides/user-interaction/remote-control.html
        tizen.tvinputdevice.registerKey('MediaPlayPause');
        tizen.tvinputdevice.registerKey('ChannelUp');
        tizen.tvinputdevice.registerKey('ChannelDown');
        tizen.tvinputdevice.registerKey('ChannelList');
        tizen.tvinputdevice.registerKey('MediaTrackNext');
        tizen.tvinputdevice.registerKey('MediaTrackPrevious');

        document.addEventListener("keydown", (event) => {
            if (!Lampa.Player.opened()) {
                return;
            }
            switch (event.keyCode) {
                case tizen.tvinputdevice.getKey('MediaPlayPause').code:
                    event.preventDefault();
                    Lampa.PlayerVideo.playpause();
                    break;
                case tizen.tvinputdevice.getKey('ChannelUp').code:
                case tizen.tvinputdevice.getKey('MediaTrackNext').code:
                    event.preventDefault();
                    if (Lampa.PlayerIPTV.playning()) {
                        Lampa.PlayerIPTV.nextChannel();
                    } else {
                        Lampa.PlayerPlaylist.next();
                    }
                    break;
                case tizen.tvinputdevice.getKey('ChannelDown').code:
                case tizen.tvinputdevice.getKey('MediaTrackPrevious').code:
                    event.preventDefault();
                    if (Lampa.PlayerIPTV.playning()) {
                        Lampa.PlayerIPTV.prevChannel();
                    } else {
                        Lampa.PlayerPlaylist.prev();
                    }
                    break;
                case tizen.tvinputdevice.getKey('ChannelList').code:
                    event.preventDefault();
                    Lampa.PlayerPlaylist.show();
                    break;
            }
        });
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                startPlugin();
            }
        });
    }

})();
