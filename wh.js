(function () {
    'use strict';

    Lampa.Lang.add({
        lampa_webhook: {
            ru: 'Вебхуки',
            en: 'Webhooks',
            be: 'Вебхукі'
        }
    });

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/i;

    // inner = HTML5 / tizen / любой встроенный
    // external = только когда реально внешнее приложение
    const WebhookConfigs = {
        types_player: {
            inner: { start: 'start', close: 'destroy' },
            external: { start: 'external', close: 'visibilitychange' }
        }
    };

    let isExternalPlayer = false;

    function getCurrentPlayerEvents() {
        var usersPlayer = Lampa.Storage.field('player');
        // На Tizen-виджете player = 'tizen' / 'tizen_avs' и т.п. — это встроенный плеер
        if (usersPlayer === 'external') {
            return WebhookConfigs.types_player.external;
        }
        return WebhookConfigs.types_player.inner;
    }

    function addSettingsItem() {
        Lampa.SettingsApi.addComponent({
            component: 'webhooks',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4.876 13.61a4 4 0 1 0 6.124 3.39h6" /><path d="M15.066 20.502a4 4 0 1 0 1.934 -7.502c-.706 0 -1.424 .179 -2 .5l-3 -5.5" /><path d="M16 8a4 4 0 1 0 -8 0c0 1.506 .77 2.818 2 3.5l-3 5.5" /></svg>',
            name: Lampa.Lang.translate('lampa_webhook'),
            after: 'player'
        });
    }

    function initParamsComponent() {
        Lampa.SettingsApi.addParam({
            component: 'webhooks',
            param: { name: 'webhooks_enable', type: 'trigger', value: false, default: false },
            field: { name: 'Включить вебхуки' },
            onChange: function (value) {
                if (value === 'true') {
                    setupPlayerListeners(Lampa.Storage.field('webhooks_events'));
                    Lampa.Noty.show('Включено');
                } else {
                    clearPlayerListener();
                    Lampa.Noty.show('Выключено');
                }
                Lampa.Settings.update();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'webhooks',
            param: { name: 'webhooks_url', type: 'input', placeholder: 'http://...', values: '', default: '' },
            field: { name: 'URL адрес' },
            onChange: function (value) {
                if (value.length > 0 && !expression.test(value) && value.indexOf('http') !== 0) {
                    Lampa.Noty.show('Указанное значение не является url адресом');
                }
            },
            onRender: function (element) {
                var isEnable = Lampa.Storage.field('webhooks_enable');
                element.toggleClass('hide', !isEnable);
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'webhooks',
            param: {
                name: 'webhooks_method',
                type: 'select',
                values: { GET: 'GET', POST: 'POST' },
                default: 'GET'
            },
            field: { name: 'Метод' },
            onChange: function () {
                Lampa.Settings.update();
            },
            onRender: function (element) {
                element.toggleClass('hide', !Lampa.Storage.field('webhooks_enable'));
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'webhooks',
            param: { name: 'webhooks_post_param_key_1', type: 'input', placeholder: 'Значение не задано', values: '', default: '' },
            field: { name: 'Ключ' },
            onRender: function (element) {
                var isEnable = Lampa.Storage.field('webhooks_enable');
                var currentMethod = Lampa.Storage.field('webhooks_method');
                element.toggleClass('hide', currentMethod !== 'POST' || !isEnable);
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'webhooks',
            param: { name: 'webhooks_post_param_value_1', type: 'input', placeholder: 'Значение не задано', values: '', default: '' },
            field: { name: 'Значение' },
            onRender: function (element) {
                var isEnable = Lampa.Storage.field('webhooks_enable');
                var currentMethod = Lampa.Storage.field('webhooks_method');
                element.toggleClass('hide', currentMethod !== 'POST' || !isEnable);
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'webhooks',
            param: {
                name: 'webhooks_events',
                type: 'select',
                values: {
                    '1': 'Только вначале',
                    '2': 'Только в конце',
                    '3': 'Вначале и в конце'
                },
                default: '1'
            },
            field: { name: 'Когда отправлять?' },
            onChange: function (value) {
                if (Lampa.Storage.field('webhooks_enable')) {
                    setupPlayerListeners(value);
                }
            },
            onRender: function (element) {
                element.toggleClass('hide', !Lampa.Storage.field('webhooks_enable'));
            }
        });
    }

    function sendRequest() {
        var url = Lampa.Storage.field('webhooks_url');
        var method = Lampa.Storage.field('webhooks_method');
        var body = false;

        if (!url) return;

        var net = new Lampa.Reguest();

        if (method === 'POST') {
            var k = Lampa.Storage.field('webhooks_post_param_key_1');
            var v = Lampa.Storage.field('webhooks_post_param_value_1');
            body = k ? (function () {
                var o = {};
                o[k] = v;
                return o;
            })() : {};
        }

        console.log('[Webhook] Sending:', method, url, body);

        // native: false — лучше для локального HA на Tizen-виджете
        net.silent(
            url,
            function (data) {
                console.log('[Webhook] Success:', data);
            },
            function (error) {
                console.log('[Webhook] Error:', error);
            },
            body,
            {
                native: false,
                dataType: 'text',
                timeout: 10000
            }
        );
    }

    function externalListener() {
        if (document.visibilityState === 'visible' && isExternalPlayer) {
            isExternalPlayer = false;
            sendRequest();
        }
    }

    function handleExternalStartOnly() {
        isExternalPlayer = true;
    }

    function handleExternalStartAndSend() {
        isExternalPlayer = true;
        sendRequest();
    }

    function setupPlayerListeners(value) {
        clearPlayerListener();

        if (!Lampa.Player || !Lampa.Player.listener) {
            console.log('[Webhook] Player listener not ready yet');
            return;
        }

        var events = getCurrentPlayerEvents();
        var val = parseInt(value, 10);

        try {
            switch (val) {
                case 1:
                    Lampa.Player.listener.follow(events.start, sendRequest);
                    break;
                case 2:
                    if (events.start === 'external') {
                        Lampa.Player.listener.follow(events.start, handleExternalStartOnly);
                        document.addEventListener('visibilitychange', externalListener);
                    } else {
                        Lampa.Player.listener.follow(events.close, sendRequest);
                    }
                    break;
                case 3:
                    if (events.start === 'external') {
                        Lampa.Player.listener.follow(events.start, handleExternalStartAndSend);
                        document.addEventListener('visibilitychange', externalListener);
                    } else {
                        Lampa.Player.listener.follow(events.start, sendRequest);
                        Lampa.Player.listener.follow(events.close, sendRequest);
                    }
                    break;
            }
            console.log('[Webhook] Listeners set for', events, 'mode', val);
        } catch (e) {
            console.error('[Webhook] Error setting listener:', e);
        }
    }

    function clearPlayerListener() {
        if (!Lampa.Player || !Lampa.Player.listener) return;

        var events = getCurrentPlayerEvents();

        try {
            Lampa.Player.listener.remove(events.start, sendRequest);
            Lampa.Player.listener.remove(events.close, sendRequest);
            Lampa.Player.listener.remove(events.start, handleExternalStartOnly);
            Lampa.Player.listener.remove(events.start, handleExternalStartAndSend);
            document.removeEventListener('visibilitychange', externalListener);
            isExternalPlayer = false;
        } catch (e) {
            console.warn('[Webhook] Warning clearing listener:', e);
        }
    }

    function startPlugin() {
        addSettingsItem();
        initParamsComponent();

        if (Lampa.Storage.field('webhooks_enable')) {
            // Небольшая задержка — на Tizen Player может инициализироваться позже
            setTimeout(function () {
                setupPlayerListeners(Lampa.Storage.field('webhooks_events'));
            }, 1500);
        }
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin();
        });
    }
})();
