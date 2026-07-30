(function () {
    'use strict';

    Lampa.Platform.tv();

    var SWITCH_BTN_ID = '#SWITCH_SERVER';
    var RANDOM_URL = 'http://185.87.48.42:8090/random_torr';
    var ICON_SVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1.3em" height="1.3em"><g><rect x="232.254" y="69.157" style="fill:#718176;" width="42.982" height="377.465"/><polygon style="fill:#718176;" points="56.146,446.588 76.861,489.564 232.234,489.564 232.234,446.588"/><polygon style="fill:#718176;" points="275.21,446.588 275.21,489.564 435.111,489.564 455.826,446.588"/><rect x="232.234" y="446.588" style="fill:#979696;" width="42.977" height="42.977"/><path style="fill:#718176;" d="M511.972,7.837v105.05c0,4.315-3.485,7.8-7.8,7.8H7.8c-4.315,0-7.8-3.485-7.8-7.8V7.837c0-4.315,3.485-7.799,7.8-7.799h496.372C508.487,0.037,511.972,3.522,511.972,7.837z"/><path style="fill:#718176;" d="M511.972,148.318v105.05c0,4.315-3.485,7.883-7.8,7.883H7.8c-4.315,0-7.8-3.568-7.8-7.883v-105.05c0-4.315,3.485-7.8,7.8-7.8h496.372C508.487,140.518,511.972,144.003,511.972,148.318z"/><path style="fill:#718176;" d="M511.972,288.882v105.05c0,4.315-3.485,7.799-7.8,7.799H7.8c-4.315,0-7.8-3.484-7.8-7.799v-105.05c0-4.314,3.485-7.799,7.8-7.799h496.372C508.487,281.082,511.972,284.568,511.972,288.882z"/><circle style="fill:#43B471;" cx="369.338" cy="61.198" r="19.487"/><circle style="fill:#D3D340;" cx="416.663" cy="61.198" r="19.487"/><circle style="fill:#D15075;" cx="463.989" cy="61.198" r="19.487"/></g></svg>';

    // ---------- Получение случайного Free TorrServer ----------
    function fetchRandomServer() {
        if (Lampa.Manifest.origin !== 'bylampa') {
            Lampa.Noty.show('Ошибка доступа');
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', RANDOM_URL, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                var ip = xhr.responseText.trim();
                Lampa.Storage.set('torrserver_url_two', 'http://' + ip + ':8090');
                Lampa.Noty.show('TorrServer изменён');
            } else {
                console.error('Ошибка при получении IP-адреса:', xhr.status);
                Lampa.Noty.show('Ошибка запроса');
            }
        };

        xhr.onerror = function () {
            console.error('Ошибка при получении IP-адреса:', xhr.status);
            Lampa.Noty.show('Ошибка запроса');
        };

        xhr.send();
    }

    // ---------- Кнопка смены сервера в шапке ----------
    function addSwitchButton() {
        var html = '<div id="SWITCH_SERVER" class="head__action selector switch-screen">' + ICON_SVG + '</div>';

        $('#app > div.head > div > div.head__actions').append(html);
        $(SWITCH_BTN_ID).insertAfter('div[class="head__action selector open--settings"]');

        var btnMode = Lampa.Storage.get('switch_server_button');
        var torrserv = Lampa.Storage.get('torrserv');

        if (btnMode == 1 || torrserv == 0) {
            setTimeout(function () { $(SWITCH_BTN_ID).hide(); }, 500);
        }

        if (btnMode == 2 && torrserv !== 0) {
            showOnlyInTorrents();
        }

        if (btnMode == 3 && torrserv !== 0) {
            $(SWITCH_BTN_ID).show();
        }

        if (torrserv == 0) {
            hideAlways();
        }

        $(SWITCH_BTN_ID).on('hover:enter hover:click hover:touch', function () {
            Lampa.Noty.show('TorrServer изменён');
            fetchRandomServer();
        });
    }

    // ---------- Режимы отображения кнопки ----------
    function updateButtonVisibility() {
        var mode = Lampa.Storage.get('switch_server_button');
        if (mode == 1) hideAlways();
        if (mode == 2) showOnlyInTorrents();
        if (mode == 3) showAlways();
    }

    function hideAlways() {
        setTimeout(function () { $(SWITCH_BTN_ID).hide(); }, 50);

        Lampa.Storage.listener.follow('change', function (e) {
            if (e.name == 'activity') {
                setTimeout(function () { $(SWITCH_BTN_ID).hide(); }, 50);
            }
        });
    }

    function showOnlyInTorrents() {
        setTimeout(function () { $(SWITCH_BTN_ID).hide(); }, 50);

        Lampa.Storage.listener.follow('change', function (e) {
            if (e.name == 'activity') {
                var component = Lampa.Activity.active().component;
                if (component !== 'torrents') {
                    setTimeout(function () { $(SWITCH_BTN_ID).hide(); }, 50);
                } else {
                    setTimeout(function () { $(SWITCH_BTN_ID).show(); }, 100);
                }
            }
        });
    }

    function showAlways() {
        setTimeout(function () { $(SWITCH_BTN_ID).show(); }, 50);

        Lampa.Storage.listener.follow('change', function (e) {
            if (e.name == 'activity') {
                setTimeout(function () { $(SWITCH_BTN_ID).show(); }, 50);
            }
        });
    }

    // ---------- Обработка ошибки подключения TorrServer ----------
    function setupErrorObserver() {
        if (localStorage.getItem('torrserv') === null || localStorage.getItem('torrserv') == 1) {
            var observer = null;

            Lampa.Storage.listener.follow('change', function (e) {
                if (e.name !== 'activity') return;

                var component = Lampa.Activity.active().component;

                if (component === 'torrents') {
                    if (observer) return;

                    observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            if (!$(mutation.target).is('.modal__title')) return;

                            var title = $('.modal__title').text().trim();

                            if (title === Lampa.Lang.translate('torrent_error_connect')) {
                                $('.torrent-checklist__list > li').remove();
                                $('.torrent-checklist__progress-bar > div').remove();
                                $('.torrent-checklist__progress-steps').remove();

                                var descr = $('.torrent-checklist__descr');
                                if (descr.length) {
                                    descr.html('Сервер не ответил, нажмите кнопку снизу для его замены на другой !');
                                }

                                var btn = $('.modal .simple-button');
                                if (btn.length) {
                                    btn.html('Сменить сервер');
                                    btn.on('hover:enter hover:click hover:touch', function () {
                                        $('.modal').remove();
                                        Lampa.Noty.show('TorrServer изменён');
                                        fetchRandomServer();
                                        Lampa.Controller.toggle('content');
                                    });
                                }
                            }
                        });
                    });

                    observer.observe(document.body, { childList: true, subtree: true });
                } else if (observer) {
                    observer.disconnect();
                    observer = null;
                }
            });
        }
    }

    // ---------- Инициализация ----------
    function init() {
        if (localStorage.getItem('torrserv') === null || localStorage.getItem('torrserv') == 1) {
            Lampa.Storage.set('torrserv', '1');
            Lampa.Storage.set('torrserver_url_two', '');

            setTimeout(function () {
                fetchRandomServer();
                Lampa.Storage.set('torrserver_use_link', 'two');
            }, 3000);
        }

        if (localStorage.getItem('switch_server_button') === null) {
            Lampa.Storage.set('switch_server_button', '2');
            showOnlyInTorrents();
        }

        if (Lampa.Platform.is('android')) {
            Lampa.Storage.set('internal_torrclient', true);
        }
    }

    // ---------- Настройки: Free TorrServer ----------
    Lampa.SettingsApi.addParam({
        component: 'server',
        param: {
            name: 'torrserv',
            type: 'select',
            values: {
                0: 'Свой вариант',
                1: 'Автовыбор'
            },
            default: 1
        },
        field: {
            name: 'Free TorrServer',
            description: 'Нажмите для смены сервера'
        },
        onChange: function (value) {
            if (value == '0') {
                Lampa.Storage.set('torrserver_use_link', 'one');
                Lampa.Storage.set('torrserver_url_two', '');
                if (Lampa.Storage.get('switch_server_button') !== 1) {
                    hideAlways();
                }
                Lampa.Settings.update();
                return;
            }

            if (value == '1') {
                Lampa.Noty.show('TorrServer изменён');
                Lampa.Storage.set('torrserver_use_link', 'two');
                fetchRandomServer();
                updateButtonVisibility();
                Lampa.Settings.update();
                return;
            }
        },
        onRender: function (item) {
            setTimeout(function () {
                if ($('div[data-name="torrserv"]').length > 1) {
                    item.hide();
                }

                $('.settings-param__name', item).css('color', '#ffffff');
                $('div[data-name="torrserv"]').insertAfter('div[data-name="torrserver_use_link"]');

                if (Lampa.Storage.getItem('torrserv') == '1') {
                    var el = document.querySelector('div[data-name="torrserv"]');
                    if (el) {
                        Lampa.Controller.focus(el);
                        Lampa.Controller.toggle('settings_component');
                    }
                    $('div[data-name="torrserver_url_two"]').hide();
                    $('div[data-name="switch_server_button"]').hide();
                    $('div > span:contains("Ссылки")').hide();
                    $('div[data-name="torrserver_url"]').remove();
                }

                if (Lampa.Storage.getItem('torrserv') == '0') {
                    var el = document.querySelector('div[data-name="torrserv"]');
                    if (el) {
                        Lampa.Controller.focus(el);
                        Lampa.Controller.toggle('settings_component');
                    }
                    $('div[data-name="torrserver_url_two"]').hide();
                    $('div[data-name="switch_server_button"]').hide();
                    $('div[data-name="torrserver_use_link"]').hide();
                }
            }, 0);
        }
    });

    // ---------- Настройки: кнопка смены сервера ----------
    Lampa.SettingsApi.addParam({
        component: 'server',
        param: {
            name: 'switch_server_button',
            type: 'select',
            values: {
                1: 'Не показывать',
                2: 'Показывать только в торрентах',
                3: 'Показывать всегда'
            },
            default: '2'
        },
        field: {
            name: 'Кнопка для смены сервера',
            description: 'Параметр включает отображение кнопки в верхнем баре для быстрой смены сервера'
        },
        onChange: function () {
            updateButtonVisibility();
        },
        onRender: function () {
            setTimeout(function () {
                $('div[data-name="switch_server_button"]').insertAfter('div[data-name="torrserv"]');
            }, 0);
        }
    });

    // ---------- Запуск ----------
    var waitLampa = setInterval(function () {
        if (typeof Lampa !== 'undefined') {
            clearInterval(waitLampa);
            init();
        }
    }, 200);

    if (window.appready) {
        addSwitchButton();
        setupErrorObserver();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                addSwitchButton();
                setupErrorObserver();
            }
        });
    }
})();
