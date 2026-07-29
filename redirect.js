(function () {
    'use strict';

    Lampa.Platform.tv();

    var server_protocol = location.protocol === 'https:' ? 'https://' : 'http://';

    var icon_server_redirect =
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M13 21.75c.414 0 .75-.336.75-.75s-.336-.75-.75-.75v1.5zM3.172 19.828l.53-.53h0l-.53.53zM20.828 4.172l-.53.53v0l.53-.53zM21.25 13c0 .414.336.75.75.75s.75-.336.75-.75h-1.5zM10 3.75h4V2.25h-4v1.5zM2.75 13v-1H1.25v1h1.5zM2.75 12v-1H1.25v1h1.5zM13 20.25h-3v1.5h3v-1.5zM21.25 11v1h1.5v-1h-1.5zM1.25 13c0 1.864-.002 3.338.153 4.489.158 1.172.49 2.121 1.238 2.87l1.061-1.061c-.423-.423-.677-1.003-.812-2.009C2.752 16.262 2.75 14.907 2.75 13h-1.5zM10 20.25c-1.907 0-3.261-.002-4.289-.14-1.006-.135-1.586-.389-2.009-.812l-1.061 1.061c.748.748 1.697 1.08 2.87 1.238C6.662 21.752 8.136 21.75 10 21.75v-1.5zM14 3.75c1.907 0 3.261.002 4.289.14 1.006.135 1.586.389 2.009.812l1.061-1.061c-.748-.748-1.697-1.08-2.87-1.238C17.338 2.248 15.864 2.25 14 2.25v1.5zM22.75 11c0-1.864.002-3.338-.153-4.489-.158-1.172-.49-2.121-1.238-2.87l-1.061 1.061c.423.423.677 1.003.812 2.009.138 1.028.14 2.382.14 4.289h1.5zM10 2.25C8.136 2.25 6.662 2.248 5.511 2.403 4.339 2.561 3.39 2.893 2.641 3.641l1.061 1.061c.423-.423 1.003-.677 2.009-.812C6.739 3.752 8.093 3.75 10 3.75V2.25zM2.75 11c0-1.907.002-3.261.14-4.289.135-1.006.389-1.586.812-2.009L2.641 3.641C1.893 4.39 1.561 5.339 1.403 6.511 1.248 7.662 1.25 9.136 1.25 11h1.5zM2 12.75h20v-1.5H2v1.5zM21.25 12v1h1.5v-1h-1.5z" fill="currentColor"/>' +
        '<path d="M13.5 7.5h4.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>' +
        '</svg>';

    var settingsAdded = false;
    var keypadBound = false;

    function updateButton() {
        $('#REDIRECT').remove();

        var server = Lampa.Storage.get('location_server', '');
        if (!server) return;

        var btn =
            '<div id="REDIRECT" class="head__action selector redirect-screen">' +
            icon_server_redirect +
            '</div>';

        $('#app > div.head > div > div.head__actions').append(btn);
        $('#REDIRECT').insertAfter('div.head__action.selector.open--settings');

        $('#REDIRECT').on('hover:enter hover:click hover:touch', function () {
            window.location.href = server_protocol + Lampa.Storage.get('location_server', '');
        });
    }

    function addSettings() {
        if (settingsAdded) return;
        settingsAdded = true;

        Lampa.SettingsApi.addComponent({
            component: 'location_redirect',
            name: 'Смена сервера',
            icon: icon_server_redirect
        });

        Lampa.SettingsApi.addParam({
            component: 'location_redirect',
            param: {
                name: 'location_server',
                type: 'input',
                values: '',
                placeholder: 'Например: bylampa.online',
                default: ''
            },
            field: {
                name: 'Адрес сервера',
                description: 'Без http:// — только домен. Кнопка появится в верхнем баре'
            },
            onChange: function (value) {
                updateButton();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'location_redirect',
            param: {
                name: 'const_redirect',
                type: 'trigger',
                default: false
            },
            field: {
                name: 'Постоянный редирект',
                description: 'Чтобы отключить — зажмите ВНИЗ при загрузке приложения'
            }
        });
    }

    function bindKeypad() {
        if (keypadBound) return;
        keypadBound = true;

        Lampa.Keypad.listener.follow('keydown', function (e) {
            // 40 = Down, 29461 = Down на некоторых пультах
            if (e.code === 40 || e.code === 29461) {
                Lampa.Storage.set('const_redirect', false);
            }
        });
    }

    function tryConstRedirect() {
        setTimeout(function () {
            if (Lampa.Storage.field('const_redirect') === true) {
                var server = Lampa.Storage.get('location_server', '');
                if (server) {
                    window.location.href = server_protocol + server;
                }
            }
        }, 300);
    }

    function startMe() {
        addSettings();
        bindKeypad();
        updateButton();
        tryConstRedirect();
    }

    if (window.appready) {
        startMe();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startMe();
        });
    }
})();
