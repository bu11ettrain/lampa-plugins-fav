// Собрано build.py из lampa/core.js и plugins/simkl/plugin.js.
// Правки вносятся в исходники, этот файл перезаписывается.
// Общая обвязка для плагинов Lampa: запуск, манифест, стили, доступ к открытой
// карточке фильма и сеть. Файл вклеивается в начало каждого плагина сборкой
// (build.py), так что в рантайме он уже часть плагина и отдельным запросом не
// тянется.
(function () {
    'use strict';

    // Два собранных плагина несут по своей копии ядра. Первая выигрывает —
    // API у них одинаковое, а двойное определение ничего не даёт.
    if (window.LampaCore) return;

    var Core = {};

    // Lampa поднимается не мгновенно, а как расширение браузера плагин
    // выполняется вообще раньше страницы. Ждём готовности обоих.
    function waitForLampa(attempt, ready, giveup) {
        var available = typeof Lampa !== 'undefined' && Lampa.Storage && Lampa.Component &&
            Lampa.Activity && Lampa.Controller && Lampa.Listener && typeof window.$ === 'function';

        if (available) {
            if (window.appready) return ready();

            return Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') ready();
            });
        }

        if (attempt > 300) return giveup();

        setTimeout(function () { waitForLampa(attempt + 1, ready, giveup); }, 200);
    }

    // Часть плагинов кладёт в Manifest.plugins объект, часть — массив. Приводим
    // к массиву: иначе второй установленный плагин затирает запись первого, и
    // тот пропадает из списка расширений.
    function registerManifest(manifest) {
        if (!Array.isArray(Lampa.Manifest.plugins)) {
            Lampa.Manifest.plugins = Lampa.Manifest.plugins ? [Lampa.Manifest.plugins] : [];
        }

        var known = Lampa.Manifest.plugins.some(function (plugin) {
            return plugin && plugin.name === manifest.name;
        });

        if (!known) Lampa.Manifest.plugins.push(manifest);
    }

    // options: { flag, manifest, styles: { id, css }, start }
    Core.boot = function (options) {
        // Плагин может приехать дважды: и как расширение браузера, и из списка
        // плагинов Lampa. Второй раз просто выходим.
        if (window[options.flag]) return;
        window[options.flag] = true;

        waitForLampa(0, function () {
            registerManifest(options.manifest);
            if (options.styles) Core.addStyles(options.styles.id, options.styles.css);
            options.start();
        }, function () {
            console.error(options.manifest.name + ': Lampa так и не появилась, сдаёмся');
        });
    };

    Core.addStyles = function (id, css) {
        if (document.getElementById(id)) return;

        var style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
    };

    Core.stored = function (name, fallback) {
        return String(Lampa.Storage.get(name, fallback) || fallback);
    };

    // Разные источники зовут тип по-разному, а часть карточек не несёт его
    // вовсе — тогда опознаём по полям, которые есть только у сериалов.
    Core.cardMethod = function (data) {
        if (!data) return 'movie';
        if (data.method === 'movie' || data.method === 'tv') return data.method;
        if (data.media_type === 'movie' || data.media_type === 'tv') return data.media_type;
        if (data.type === 'movie' || data.type === 'tv') return data.type;
        return (data.number_of_seasons || data.first_air_date || data.name) ? 'tv' : 'movie';
    };

    Core.cardYear = function (card) {
        var year = Number(String((card && (card.release_date || card.first_air_date)) || '').slice(0, 4));
        return year || 0;
    };

    Core.cardTitle = function (card) {
        return (card && (card.title || card.name || card.original_title || card.original_name)) || '';
    };

    // Открытая карточка целиком: сама запись, её тип и корень активности.
    // Искать по документу нельзя — прошлые карточки остаются в DOM, и запрос
    // вернёт кнопки фильма, который человек уже закрыл.
    function currentCard() {
        var active = Lampa.Activity.active();
        var card = active && active.card;

        if (!card || !card.id || !active.activity) return null;

        var method = (active.method === 'movie' || active.method === 'tv')
            ? active.method
            : Core.cardMethod(card);

        return { card: card, method: method, render: active.activity.render(), activity: active.activity };
    }

    Core.currentCard = currentCard;

    // 'complite' — опечатка самой Lampa, событие приходит именно так
    Core.onFullCard = function (callback) {
        Lampa.Listener.follow('full', function (e) {
            if (e.type !== 'complite') return;

            var ctx = currentCard();
            if (ctx) callback(ctx);
        });
    };

    // Свежие сборки Lampa разметили карточку заново, старые ещё живут со
    // старыми классами — ищем по обоим.
    Core.cardButtons = function (ctx) {
        return ctx.render.find('.full-start-new__buttons, .full-start__buttons');
    };

    Core.cardLeft = function (ctx) {
        return ctx.render.find('.full-start-new__left, .full-start__left');
    };

    // Кнопка в ряду под постером. Разметку копируем у родных кнопок: Lampa сама
    // и стилизует её, и прячет подпись у второстепенных.
    // options: { className, icon, title, onEnter, after }
    Core.cardButton = function (ctx, options) {
        var container = Core.cardButtons(ctx);
        if (!container.length || container.find('.' + options.className).length) return null;

        var button = $(
            '<div class="full-start__button selector ' + options.className + '">' +
            (options.icon || '') +
            '<span>' + (options.title || '') + '</span>' +
            '</div>'
        );

        button.on('hover:enter', options.onEnter);

        var anchor = options.after ? container.find(options.after) : $();
        if (anchor.length) button.insertAfter(anchor.first());
        else container.prepend(button);

        return button;
    };

    // Строка вроде «сезон · серия» под названием. Кладём её туда же, куда
    // Lampa кладёт свои детали, чтобы она не висела отдельным блоком.
    Core.cardDetails = function (ctx, className, html) {
        var line = ctx.render.find('.' + className);

        if (!line.length) {
            line = $('<div class="full-start-new__details ' + className + '"></div>');

            var rate = ctx.render.find('.full-start-new__rate-line');
            var details = ctx.render.find('.full-start-new__details').not('.' + className);
            var left = Core.cardLeft(ctx);

            if (rate.length) line.insertAfter(rate.first());
            else if (details.length) line.insertAfter(details.first());
            else if (left.length) left.append(line);
            else return null;
        }

        line.html(html);
        return line;
    };

    function encodeBody(options) {
        if (options.form) {
            return Object.keys(options.form).map(function (name) {
                return encodeURIComponent(name) + '=' + encodeURIComponent(options.form[name]);
            }).join('&');
        }

        return options.body === undefined ? null : JSON.stringify(options.body);
    }

    // Свой XHR, а не Lampa.Reguest: тому нельзя передать заголовки, а без
    // Authorization запрос к чужому API не пройдёт. TMDB по-прежнему ходит
    // через Lampa.Reguest — там важны пользовательские настройки прокси.
    // Тело задаётся либо `body` (уедет как json), либо `form` (как
    // application/x-www-form-urlencoded, чего требуют эндпоинты OAuth).
    // options: { url, method, headers, body, form, timeout, onDone, onFail }
    Core.request = function (options) {
        var xhr = new XMLHttpRequest();
        var headers = options.headers || {};

        xhr.open(options.method || 'GET', options.url, true);
        Object.keys(headers).forEach(function (name) {
            xhr.setRequestHeader(name, headers[name]);
        });
        xhr.timeout = options.timeout || 15000;

        function fail(status, body) {
            if (options.onFail) options.onFail(status, body);
        }

        xhr.onload = function () {
            var parsed = null;

            try {
                if (xhr.responseText) parsed = JSON.parse(xhr.responseText);
            } catch (e) {
                // Тело не json — для успешного ответа это нормально (204),
                // для ошибки разбирать всё равно нечего.
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                if (options.onDone) options.onDone(parsed, xhr.status);
            } else {
                fail(xhr.status, parsed);
            }
        };

        xhr.onerror = function () { fail(0, null); };
        xhr.ontimeout = function () { fail(0, null); };

        xhr.send(encodeBody(options));

        return xhr;
    };

    window.LampaCore = Core;
})();

(function () {
    'use strict';

    var Core = window.LampaCore;

    var manifest = {
        type: 'other',
        version: '1.0.0',
        name: 'Simkl',
        description: 'Статус просмотра с simkl.com на карточке фильма и сериала'
    };

    // Своё приложение регистрируется на https://simkl.com/settings/developer/.
    // Нужен ключ приложения AUTH V2: device-флоу отвечает на ключ старого
    // приложения 401 invalid_client. Redirect URI плагин не использует вовсе —
    // у типа «TV, devices & command line» его и не спрашивают, а у «Mobile,
    // desktop & browser apps» достаточно вписать адрес своей Lampa.
    var CLIENT_ID = '1745cc52f39858acd8c80bf1e0180ed23d58eca0337803f8dd5825f085a63835';

    var API = 'https://api.simkl.com';

    // Simkl требует эту пару в каждом запросе наравне с client_id
    var APP_NAME = 'lampa-simkl';
    var APP_VERSION = '1.0.0';

    // Без media:write не получится менять статус: незнакомый скоуп Simkl молча
    // понижает до чтения, и промах вылезет только на первой записи.
    var SCOPE = 'media:read media:write';

    // CORS на api.simkl.com открыт, так что ходим напрямую — прокси, без
    // которого не живёт интеграция с Trakt, здесь не нужен.
    var LISTS = {
        watching: 'Смотрю',
        plantowatch: 'Буду смотреть',
        completed: 'Просмотрено',
        hold: 'Отложено',
        dropped: 'Брошено'
    };

    // Категории родного «Избранного» и их пара в Simkl. «Нравится»,
    // «Запланировано», «Продолжение следует» и история остаются чисто
    // локальными: у Simkl нет статуса, который значил бы то же самое.
    // Синхронизация односторонняя, Lampa → Simkl: списки Lampa плагин не
    // трогает, чтобы не переписать то, что человек собирал руками.
    var FAVORITE_MAP = {
        look: 'watching',
        viewed: 'completed',
        wath: 'plantowatch',
        book: 'plantowatch',
        thrown: 'dropped'
    };

    var MENU_ID = 'lampa-simkl-menu';

    // Имя своего источника для Lampa.Api. Грид рисует родной category_full,
    // он берёт данные через Lampa.Api.list, а тот диспатчится по source.
    var SOURCE = 'simkl';

    // Панель — экран рядов, как родное «Избранное». Сверху «Продолжить
    // просмотр», за ним то, что ещё смотрят или собираются, — каруселями,
    // отдельно по сериалам, аниме и фильмам. Дальше рекомендации, а в самом
    // низу просмотренное и брошенное — плитками в одной карусели, каждая
    // открывает свой грид. Персональных рекомендаций у Simkl в API нет, поэтому они
    // собираются из рекомендаций к каждому просмотренному сериалу — у TMDB и
    // у самого Simkl.
    // Фильмы ниже сериалов и аниме — и в рядах, и в плитках
    var LIBRARY_TYPES = [
        { type: 'shows', title: 'Сериалы' },
        { type: 'anime', title: 'Аниме' },
        { type: 'movies', title: 'Фильмы' }
    ];

    // У фильма нет «Смотрю» и «Отложено»: он смотрится целиком
    var ACTIVE_STATUSES = {
        movies: ['plantowatch'],
        shows: ['watching', 'plantowatch', 'hold'],
        anime: ['watching', 'plantowatch', 'hold']
    };

    var ARCHIVE_STATUSES = ['completed', 'dropped'];

    var PANEL_RECS = [
        { url: 'recs_tmdb', title: 'Рекомендации TMDB' },
        { url: 'recs_simkl', title: 'Рекомендации Simkl' }
    ];

    var TOKEN_KEY = 'simkl_token';
    var REFRESH_KEY = 'simkl_refresh';
    var EXPIRES_KEY = 'simkl_expires';
    var CACHE_KEY = 'simkl_status_cache';
    // Номер в ключе меняется, когда в карточке появляется новое поле: иначе
    // вечный кэш так и отдавал бы карточки без него
    var CARDS_KEY = 'simkl_cards_v2';
    var ANIME_TMDB_KEY = 'simkl_anime_tmdb';
    var PARTS_KEY = 'simkl_anime_parts';
    var RECS_KEY = 'simkl_recs';
    var LAUNCHES_KEY = 'simkl_launches';
    var AUTOMARK_KEY = 'simkl_automark';
    var EXPORT_KEY = 'simkl_export_at';
    var SEQUELS_KEY = 'simkl_sequels_planned';
    var LINE_KEY = 'simkl_card_line';
    var BUTTON_KEY = 'simkl_card_button';

    // Статус меняют и на самом simkl.com, поэтому кэш живёт недолго: он
    // спасает от повторного запроса при переходах туда-сюда по карточкам,
    // а не заменяет источник правды.
    var CACHE_TTL = 10 * 60 * 1000;

    var ICON = '<svg viewBox="0 0 24 24" fill="currentColor">' +
        '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.1 14.3-4-4 1.6-1.6 2.4 2.4 5.2-5.2 1.6 1.6-6.8 6.8z"></path>' +
        '</svg>';

    // Иконки кнопки на карточке: подпись у второстепенных кнопок Lampa
    // прячет, так что состояние видно только по ним. Просмотрено — круг с
    // галочкой, как ICON; не смотрели — пустое кольцо; сериал начат, но не
    // досмотрен — кольцо, залитое наполовину.
    var BUTTON_ICONS = {
        watched: ICON,
        none: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd">' +
            '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"></path>' +
            '</svg>',
        started: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd">' +
            '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"></path>' +
            '<path d="M12 6a6 6 0 0 0 0 12z"></path>' +
            '</svg>'
    };

    var STYLES = `
        .full-start-new__details.simkl-status-line { display: flex; align-items: center; }
        .simkl-status-line .simkl-icon { width: 1.1em; height: 1.1em; margin-right: 0.4em; flex-shrink: 0; }
        .simkl-status-line .simkl-icon svg { width: 100%; height: 100%; display: block; }
        .simkl-pin { padding: 1.4em; text-align: center; }
        .simkl-pin__code {
            font-size: 2.4em; font-weight: 700; letter-spacing: 0.15em;
            margin: 0.4em 0 0.6em; word-break: break-all;
        }
        .simkl-pin__hint { opacity: 0.75; line-height: 1.5; }
        .simkl-pin__link { margin-top: 0.8em; opacity: 0.75; word-break: break-all; }
        .simkl-pin__link a { color: inherit; }
        .simkl-pin__state { margin-top: 1em; opacity: 0.6; }
        #lampa-simkl-menu .menu__ico svg { width: 100%; height: 100%; }
        /* Вместо года в карточке стоит своя подпись. В одну строку не влезает
           «как «Мастер на все руки Сайга» +2» из рекомендаций, поэтому даём
           две, а дальше многоточие — чтобы ряд всё же не разъезжался. */
        .simkl-card .card__age {
            display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
            white-space: normal; overflow: hidden; text-overflow: ellipsis;
        }
        /* Lampa запрещает выделение на всём приложении — она про пульт. Но код
           и ссылку с мышью хочется скопировать, так что здесь возвращаем. */
        .simkl-pin__code, .simkl-pin__link {
            -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text;
            -webkit-touch-callout: default; cursor: text;
        }
    `;

    // Карточки живут в памяти и в Storage: при возврате на уже открытый фильм
    // строка статуса рисуется сразу, без мигания.
    var cache = {};
    // Одна и та же карточка может дорисоваться дважды — второй запрос ждёт
    // первого вместо того, чтобы уйти в сеть следом.
    var inflight = {};

    function token() {
        return Core.stored(TOKEN_KEY, '');
    }

    function configured() {
        return !!CLIENT_ID;
    }

    function cacheKey(method, id) {
        return method + ':' + id;
    }

    function loadCache() {
        try {
            var saved = Lampa.Storage.get(CACHE_KEY, '{}') || {};

            Object.keys(saved).forEach(function (key) {
                if (saved[key] && Date.now() - saved[key].at < CACHE_TTL) cache[key] = saved[key];
            });
        } catch (e) {
            console.error('Simkl: не удалось прочитать кэш', e);
        }
    }

    function persistCache() {
        try {
            Lampa.Storage.set(CACHE_KEY, cache);
        } catch (e) {
            console.error('Simkl: не удалось записать кэш', e);
        }
    }

    function dropCache(key) {
        delete cache[key];
        persistCache();
    }

    function clearCache() {
        cache = {};
        persistCache();
    }

    // client_id, app-name и app-version Simkl ждёт в строке запроса у каждого
    // эндпоинта, включая те, что не требуют токена.
    function withParams(path) {
        return API + path + (path.indexOf('?') === -1 ? '?' : '&') +
            'client_id=' + encodeURIComponent(CLIENT_ID) +
            '&app-name=' + encodeURIComponent(APP_NAME) +
            '&app-version=' + encodeURIComponent(APP_VERSION);
    }

    function send(options, may_retry) {
        var headers = { 'Content-Type': options.form ? 'application/x-www-form-urlencoded' : 'application/json' };
        if (options.auth) headers.Authorization = 'Bearer ' + token();

        return Core.request({
            url: withParams(options.path),
            method: options.method || 'GET',
            headers: headers,
            body: options.body,
            form: options.form,
            onDone: options.onDone,
            onFail: function (status, body) {
                // Токен живёт неделю, так что 401 — это чаще всего «протух»,
                // а не «отозвали». Обновляемся и повторяем ровно один раз.
                if (options.auth && status === 401 && may_retry) {
                    return renewToken(function (ok) {
                        if (ok) send(options, false);
                        else failed(options, status, body);
                    });
                }

                // После неудачного обновления держаться за токен бессмысленно:
                // честнее показать, что аккаунт отключён, чем сыпать ошибками
                // на каждой карточке.
                if (options.auth && (status === 401 || status === 403)) forgetToken();

                failed(options, status, body);
            }
        });
    }

    function failed(options, status, body) {
        console.error('Simkl: запрос', options.path, 'вернул', status, body);
        if (options.onFail) options.onFail(status, body);
    }

    // options: { path, method, body, form, auth, onDone, onFail }
    function api(options) {
        if (!options.auth) return send(options, false);

        if (!token()) {
            failed(options, 401, null);
            return null;
        }

        // Протухший токен видно по сохранённому сроку — меняем его заранее,
        // не тратя запрос на заведомый 401.
        if (!expired()) return send(options, true);

        renewToken(function (ok) {
            if (ok) send(options, false);
            else failed(options, 401, null);
        });

        return null;
    }

    function forgetToken() {
        Lampa.Storage.set(TOKEN_KEY, '');
        Lampa.Storage.set(REFRESH_KEY, '');
        Lampa.Storage.set(EXPIRES_KEY, 0);
        clearCache();
    }

    function saveTokens(data) {
        Lampa.Storage.set(TOKEN_KEY, data.access_token);
        // Обновление не ротирует refresh: в ответе приходит тот же самый,
        // и его собственный срок просто сдвигается вперёд.
        if (data.refresh_token) Lampa.Storage.set(REFRESH_KEY, data.refresh_token);

        // Минута запаса, чтобы не отправить запрос ровно в момент истечения
        var life = (Number(data.expires_in) || 0) * 1000;
        Lampa.Storage.set(EXPIRES_KEY, life ? Date.now() + life - 60000 : 0);
    }

    function expired() {
        var at = Number(Lampa.Storage.get(EXPIRES_KEY, 0)) || 0;
        return at > 0 && Date.now() >= at;
    }

    // Два параллельных обновления отрезали бы друг друга: каждое выдаёт новый
    // access_token и тут же хоронит предыдущий. Поэтому обновление одно, а
    // остальные ждут его результата.
    var renewing = null;

    function renewToken(callback) {
        var refresh = Core.stored(REFRESH_KEY, '');

        if (!refresh) {
            forgetToken();
            return callback(false);
        }

        if (renewing) return renewing.push(callback);
        renewing = [callback];

        function finish(ok) {
            var waiting = renewing;
            renewing = null;
            waiting.forEach(function (fn) { fn(ok); });
        }

        send({
            path: '/oauth2/token',
            method: 'POST',
            form: { grant_type: 'refresh_token', client_id: CLIENT_ID, refresh_token: refresh },
            onDone: function (data) {
                if (data && data.access_token) {
                    saveTokens(data);
                    finish(true);
                } else {
                    forgetToken();
                    finish(false);
                }
            },
            onFail: function () {
                forgetToken();
                finish(false);
            }
        }, false);
    }

    // --- Авторизация по коду (device flow) --------------------------------

    // Флоу для устройств без клавиатуры: показываем короткий код, человек
    // подтверждает его на simkl.com/pin с телефона, а мы всё это время
    // опрашиваем Simkl и получаем токен уже без участия пульта.
    function startPinAuth(onSuccess) {
        if (!configured()) return Lampa.Noty.show('Simkl: не задан client_id');

        var back = Lampa.Controller.enabled().name;
        var closed = false;

        var html = $(
            '<div class="simkl-pin">' +
            '<div class="simkl-pin__hint">Откройте <b>simkl.com/pin</b> на телефоне или компьютере и введите код</div>' +
            '<div class="simkl-pin__code">…</div>' +
            '<div class="simkl-pin__link"></div>' +
            '<div class="simkl-pin__state">Получаем код…</div>' +
            '</div>'
        );

        function state(text) {
            html.find('.simkl-pin__state').text(text);
        }

        function close() {
            closed = true;
            Lampa.Modal.close();
            Lampa.Controller.toggle(back);
        }

        Lampa.Modal.open({
            title: 'Подключение Simkl',
            html: html,
            size: 'medium',
            onBack: close
        });

        api({
            path: '/oauth2/device',
            method: 'POST',
            form: { client_id: CLIENT_ID, scope: SCOPE },
            onDone: function (data) {
                if (closed) return;

                if (!data || !data.user_code) {
                    return state('Simkl не выдал код, попробуйте ещё раз');
                }

                // Код показываем ровно как пришёл, вместе с дефисом: он часть
                // формата. Ссылку с уже подставленным кодом даём рядом — по ней
                // ничего вводить не придётся.
                html.find('.simkl-pin__code').text(data.user_code);

                if (data.verification_uri_complete) {
                    html.find('.simkl-pin__link')
                        .append($('<span>или сразу: </span>'))
                        .append($('<a target="_blank"></a>')
                            .attr('href', data.verification_uri_complete)
                            .text(data.verification_uri_complete));
                }
                state('Ждём подтверждения…');

                var deadline = Date.now() + (data.expires_in || 900) * 1000;
                var interval = Math.max(data.interval || 5, 5) * 1000;

                (function poll() {
                    if (closed) return;

                    // Отказ Simkl никак не помечает — при нажатии «нет» до
                    // самого конца приходит authorization_pending. Свой срок
                    // здесь единственное, что завершает цикл.
                    if (Date.now() > deadline) {
                        return state('Код истёк — закройте окно и начните заново');
                    }

                    api({
                        path: '/oauth2/token',
                        method: 'POST',
                        form: {
                            grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
                            client_id: CLIENT_ID,
                            device_code: data.device_code
                        },
                        onDone: function (answer) {
                            if (closed) return;

                            if (answer && answer.access_token) {
                                saveTokens(answer);
                                clearCache();
                                close();
                                Lampa.Noty.show('Simkl: аккаунт подключён');
                                if (onSuccess) onSuccess();
                                setTimeout(function () {
                                    exportFavorites(false, function () { syncSequels(false); });
                                }, 3000);
                                return;
                            }

                            setTimeout(poll, interval);
                        },
                        onFail: function (status, answer) {
                            if (closed) return;

                            var error = answer && answer.error;

                            if (error === 'expired_token') {
                                return state('Код истёк — закройте окно и начните заново');
                            }

                            // Чужой или V1-ключ: опрос этого не исправит
                            if (error === 'invalid_client') {
                                return state('client_id не подходит: нужно приложение AUTH V2');
                            }

                            // Опрос слишком частый. Ждать обязательно: неудачная
                            // попытка сама перезапускает окно, так что повтор
                            // без паузы держал бы нас в отказе до истечения кода.
                            if (error === 'slow_down') interval += 5000;

                            setTimeout(poll, interval);
                        }
                    });
                })();
            },
            onFail: function (status, answer) {
                if (closed) return;

                // Ключ старого приложения сюда не пускают, и это самая
                // вероятная причина отказа при первой настройке.
                if (answer && answer.error === 'invalid_client') {
                    return state('client_id не подходит: нужно приложение AUTH V2');
                }

                state('Не удалось получить код, проверьте client_id и сеть');
            }
        });
    }

    // --- Статус карточки -------------------------------------------------

    // Simkl отличает сериалы от фильмов на своей стороне, но tmdb-id в этих
    // двух каталогах нумеруются независимо — без type он найдёт не то кино.
    function simklType(method) {
        return method === 'tv' ? 'show' : 'movie';
    }

    function fetchStatus(method, id, callback) {
        var key = cacheKey(method, id);
        var hit = cache[key];

        if (hit && Date.now() - hit.at < CACHE_TTL) return callback(hit.status);

        if (inflight[key]) return inflight[key].push(callback);
        inflight[key] = [callback];

        function done(status) {
            cache[key] = { at: Date.now(), status: status };
            persistCache();

            var waiting = inflight[key] || [];
            delete inflight[key];
            waiting.forEach(function (fn) { fn(status); });
        }

        api({
            path: '/sync/watched?extended=counters',
            method: 'POST',
            auth: true,
            body: [{ tmdb: Number(id), type: simklType(method) }],
            onDone: function (data) {
                withParts(method, id, Array.isArray(data) ? data[0] : null, function (answer) {
                    // result бывает трёх видов: true — лежит в списке, false —
                    // Simkl знает тайтл, но у человека его нет, 'not_found' —
                    // тайтла нет и в самом Simkl. Последние два для нас одно и
                    // то же. В Storage кладём без разбивки по сериям: у
                    // собранного аниме она на сотни записей.
                    if (!answer || answer.result !== true) return done(null);

                    done({
                        result: true,
                        list: answer.list,
                        last_watched_at: answer.last_watched_at,
                        episodes_watched: answer.episodes_watched,
                        episodes_aired: answer.episodes_aired,
                        episodes_total: answer.episodes_total,
                        // Только у аниме, собранного из частей
                        merged: !!answer.merged,
                        last_code: answer.last_code
                    });
                });
            },
            onFail: function () {
                // Ошибку не кэшируем: следующая карточка попробует снова
                var waiting = inflight[key] || [];
                delete inflight[key];
                waiting.forEach(function (fn) { fn(null); });
            }
        });
    }

    // Разбивка по сериям нужна только когда открыли меню, и в Storage её не
    // кладём: у длинного сериала это сотни записей на тайтл.
    var episodes_cache = {};

    function fetchEpisodes(ctx, callback) {
        var key = cacheKey(ctx.method, ctx.card.id);

        if (episodes_cache[key]) return callback(episodes_cache[key]);

        api({
            path: '/sync/watched?extended=episodes,counters',
            method: 'POST',
            auth: true,
            body: [{ tmdb: Number(ctx.card.id), type: simklType(ctx.method) }],
            onDone: function (data) {
                withParts(ctx.method, ctx.card.id, Array.isArray(data) ? data[0] : null, function (answer) {
                    var status = answer && answer.result !== 'not_found' ? answer : null;

                    if (status) episodes_cache[key] = status;
                    callback(status);
                });
            },
            onFail: function () {
                Lampa.Noty.show('Simkl: не удалось получить список серий');
            }
        });
    }

    function invalidate(method, id) {
        var key = cacheKey(method, id);

        dropCache(key);
        delete episodes_cache[key];

        // Отметка сдвигает «Продолжить просмотр», смена статуса — «Буду смотреть»,
        // так что собранные разделы после любой записи уже неверны
        entries_cache = {};
        library_cache = null;
    }

    // «из 8 серий», но «из 21 серии» — после числительного идёт родительный,
    // и у единицы он отличается.
    function episodeWord(count) {
        return count % 10 === 1 && count % 100 !== 11 ? 'серии' : 'серий';
    }

    // toLocaleDateString на части телевизоров отдаёт американский формат
    // независимо от локали, поэтому собираем дату руками.
    function formatDate(iso) {
        // У «Буду смотреть» даты просмотра нет, и Simkl отдаёт null, а
        // new Date(null) — это не ошибка, а 01.01.1970
        if (!iso) return '';

        var date = new Date(iso);
        if (isNaN(date.getTime())) return '';

        function pad(value) { return value < 10 ? '0' + value : String(value); }

        return pad(date.getDate()) + '.' + pad(date.getMonth() + 1) + '.' + date.getFullYear();
    }

    function statusParts(status, method) {
        var parts = [LISTS[status.list] || 'В списке'];

        if (method === 'tv' && typeof status.episodes_watched === 'number') {
            var total = status.episodes_aired || status.episodes_total;

            if (total) {
                parts.push(status.episodes_watched + ' из ' + total + ' ' + episodeWord(total));
            }
        }

        var watched = formatDate(status.last_watched_at);
        if (watched) parts.push(watched);

        return parts;
    }

    function renderLine(ctx, status) {
        if (!status || !Lampa.Storage.get(LINE_KEY, true)) {
            ctx.render.find('.simkl-status-line').remove();
            return;
        }

        var parts = statusParts(status, ctx.method).map(function (part) {
            return '<span>' + part + '</span>';
        });

        Core.cardDetails(ctx, 'simkl-status-line',
            '<span class="simkl-icon">' + ICON + '</span>' +
            parts.join('<span class="full-start-new__split">●</span>'));
    }

    // Фильм — просмотрен или нет. Сериал — ещё и начат: просмотрен он, когда
    // в «Просмотрено» или отмечены все вышедшие серии, а начат — когда
    // отмечена хоть одна.
    function watchState(status, method) {
        if (!status) return 'none';
        if (method !== 'tv') return movieWatched(status) ? 'watched' : 'none';

        var watched = status.episodes_watched || 0;
        var aired = status.episodes_aired || status.episodes_total || 0;

        if (status.list === 'completed' || (aired && watched >= aired)) return 'watched';
        return watched > 0 ? 'started' : 'none';
    }

    function renderButton(ctx, status) {
        var button = ctx.render.find('.simkl-status-button');
        if (!button.length) return;

        var state = watchState(status, ctx.method);

        if (button.attr('data-state') !== state) {
            button.attr('data-state', state);
            button.find('svg').replaceWith(BUTTON_ICONS[state]);
        }

        button.find('span').text(status ? (LISTS[status.list] || 'В списке') : 'Simkl');
    }

    function refresh(ctx) {
        if (!token()) {
            renderLine(ctx, null);
            renderButton(ctx, null);
            return;
        }

        fetchStatus(ctx.method, ctx.card.id, function (status) {
            // Пока ходили в сеть, человек мог уйти на другую карточку —
            // рисовать в её разметку чужой статус нельзя. А мог и вернуться на
            // эту: тогда рисуем в открытую сейчас, а не в ту, что была при
            // запросе, — автоотметка запрашивает статус и вовсе без карточки.
            var current = Core.currentCard();
            if (!current || String(current.card.id) !== String(ctx.card.id)) return;

            renderLine(current, status);
            renderButton(current, status);
        });
    }

    // --- Аниме из нескольких частей ----------------------------------------

    // Simkl, как MyAnimeList, режет аниме на части: «Атака титанов» у него —
    // шесть отдельных тайтлов, «Slay the Gods» — два. В TMDB это один сериал с
    // сезонами, карточка в Lampa тоже одна, а /sync/watched по её tmdb-id
    // отдаёт только первую часть. Поэтому части собираются в один сериал: по
    // связям первой части находим остальные, по каталогу — их серии, по
    // /sync/watched с simkl-id — отметки.
    //
    // Отмечаем тоже по частям, их собственной нумерацией (конверт anime[]).
    // Путь через use_tvdb_anime_seasons не годится: у «Slay the Gods 2» Simkl
    // проставил сериям те же координаты S1E1…, что и у первой части, и
    // вторая часть уезжала бы в первую.

    // Состав частей меняется, только когда анонсируют продолжение, — неделя.
    // Серии части добавляются, пока она выходит, — сутки.
    var PARTS_TTL = 7 * 24 * 60 * 60 * 1000;
    var PART_EPISODES_TTL = 24 * 60 * 60 * 1000;

    // tmdb → { at, parts }: simkl-id частей по порядку или false, если это не
    // аниме или часть одна — тогда обычный путь справляется сам
    var parts_map = {};
    var part_episodes = {};

    function loadParts() {
        try {
            parts_map = Lampa.Storage.get(PARTS_KEY, '{}') || {};
        } catch (e) {
            console.error('Simkl: не удалось прочитать части аниме', e);
        }
    }

    function persistParts() {
        try {
            Lampa.Storage.set(PARTS_KEY, parts_map);
        } catch (e) {
            console.error('Simkl: не удалось записать части аниме', e);
        }
    }

    // Из связей берём только продолжение того же сериала: сиквел или приквел
    // в формате сериала. Спешлы, полнометражки, спин-оффы и «альтернативные
    // версии» — отдельные тайтлы.
    function sameShow(rel, own, tmdb) {
        var kind = String(rel.relation_type || '');
        var ids = rel.ids || {};

        if (kind !== 'sequel' && kind !== 'prequel' && kind.indexOf('season') !== 0) return false;
        if (rel.anime_type !== 'tv' && rel.anime_type !== 'ona') return false;

        // У финального сезона «Атаки титанов» tmdb-id свой, а TVDB общий с
        // остальными частями, так что общий TVDB перевешивает
        if (ids.tvdb && own.tvdb) return String(ids.tvdb) === String(own.tvdb);

        return !ids.tmdb || Number(ids.tmdb) === Number(tmdb);
    }

    // Часть аниме, чей состав уже известен, — это сериал TMDB целиком. Свой
    // tmdb-id у части бывает, но не тот: у финального сезона «Атаки титанов»
    // он 313599, и карточки по нему TMDB не отдаёт — запись в ряду считалась
    // бы, а не рисовалась.
    function partsBase(simkl) {
        var id = Number(simkl);
        var found = 0;

        Object.keys(parts_map).some(function (tmdb) {
            var parts = parts_map[tmdb] && parts_map[tmdb].parts;
            if (parts && parts.indexOf(id) !== -1) found = Number(tmdb);
            return !!found;
        });

        return found;
    }

    function animeParts(tmdb, base, done) {
        var hit = parts_map[tmdb];
        if (hit && Date.now() - hit.at < PARTS_TTL) return done(hit.parts || null);

        api({
            path: '/anime/' + encodeURIComponent(base) + '?extended=full',
            auth: true,
            onDone: function (data) {
                var parts = false;

                // На обычный сериал /anime/{id} отвечает его же карточкой без
                // anime_type — по этому их и различаем
                if (data && data.anime_type) {
                    parts = [Number(base)];

                    (data.relations || []).forEach(function (rel) {
                        var id = rel.ids && Number(rel.ids.simkl);

                        if (id && parts.indexOf(id) === -1 && sameShow(rel, data.ids || {}, tmdb)) {
                            parts.push(id);
                        }
                    });

                    if (parts.length < 2) parts = false;
                }

                parts_map[tmdb] = { at: Date.now(), parts: parts };
                persistParts();
                done(parts || null);
            },
            onFail: function () { done(null); }
        });
    }

    function fetchPartEpisodes(id, done) {
        var hit = part_episodes[id];
        if (hit && Date.now() - hit.at < PART_EPISODES_TTL) return done(hit.list);

        api({
            path: '/anime/episodes/' + encodeURIComponent(id),
            auth: true,
            onDone: function (data) {
                // Спешлы идут отдельной строкой, в нумерацию сезонов не входят
                var list = (Array.isArray(data) ? data : []).filter(function (episode) {
                    return episode && episode.type === 'episode';
                });

                part_episodes[id] = { at: Date.now(), list: list };
                done(list);
            },
            onFail: function () { done([]); }
        });
    }

    // Координаты TVDB годятся, только если они есть у каждой серии и не
    // пересекаются между частями. У «Slay the Gods» обе части размечены как
    // S1E1…S1E15 — тогда сезон считаем по порядку частей: так их нумерует и
    // TMDB.
    function tvdbUsable(ordered, catalogs) {
        var seen = {};

        return ordered.every(function (id) {
            return catalogs[id].every(function (episode) {
                if (!episode.tvdb || !episode.tvdb.season) return false;

                var key = episode.tvdb.season + ':' + episode.tvdb.episode;
                if (seen[key]) return false;

                seen[key] = true;
                return true;
            });
        });
    }

    // Статус сериала целиком. Если хоть одна часть в «Смотрю», сериал
    // смотрят, даже когда прошлые части закрыты; «Просмотрено» — только если
    // ничего другого нет.
    var PARTS_LIST_ORDER = ['watching', 'plantowatch', 'dropped', 'completed'];

    function assemble(parts, catalogs, answers) {
        var by_part = {};

        answers.forEach(function (answer) {
            if (answer && answer.simkl) by_part[answer.simkl] = answer;
        });

        var ordered = parts.filter(function (id) {
            return (catalogs[id] || []).length;
        }).sort(function (a, b) {
            return (Date.parse(catalogs[a][0].date) || 0) - (Date.parse(catalogs[b][0].date) || 0);
        });

        var use_tvdb = tvdbUsable(ordered, catalogs);
        var seasons = {};
        var present = [];
        var last_watched_at = null;

        ordered.forEach(function (id, index) {
            var answer = by_part[id];
            var watched = {};

            if (answer && answer.result === true) {
                present.push(answer.list);

                if (answer.last_watched_at && (!last_watched_at || answer.last_watched_at > last_watched_at)) {
                    last_watched_at = answer.last_watched_at;
                }
            }

            // Отметки приходят в нумерации части, там же, где и каталог
            ((answer && answer.seasons) || []).forEach(function (season) {
                (season.episodes || []).forEach(function (episode) {
                    if (episode.watched) watched[episode.number] = true;
                });
            });

            catalogs[id].forEach(function (episode) {
                var season = use_tvdb ? episode.tvdb.season : index + 1;

                (seasons[season] = seasons[season] || []).push({
                    number: use_tvdb ? episode.tvdb.episode : episode.episode,
                    aired: !!episode.aired,
                    watched: !!watched[episode.episode],
                    part: id,
                    local: episode.episode
                });
            });
        });

        var list = PARTS_LIST_ORDER.filter(function (status) {
            return present.indexOf(status) !== -1;
        })[0] || null;

        var merged = {
            result: list ? true : false,
            list: list,
            last_watched_at: last_watched_at,
            episodes_watched: 0,
            episodes_aired: 0,
            episodes_total: 0,
            seasons: [],
            merged: true,
            // Где остановился — самая дальняя отмеченная серия сериала целиком
            last_code: ''
        };

        Object.keys(seasons).map(Number).sort(function (a, b) { return a - b; }).forEach(function (number) {
            var episodes = seasons[number].sort(function (a, b) { return a.number - b.number; });

            episodes.forEach(function (episode) {
                merged.episodes_total++;
                if (episode.aired) merged.episodes_aired++;

                if (episode.watched) {
                    merged.episodes_watched++;
                    merged.last_code = episodeCode({ season: number, episode: episode.number });
                }
            });

            merged.seasons.push({ number: number, episodes: episodes });
        });

        return merged;
    }

    function mergedShow(parts, done) {
        var catalogs = {};
        var answers = null;
        var waiting = parts.length + 1;

        function step() {
            if (--waiting) return;
            done(assemble(parts, catalogs, answers));
        }

        parts.forEach(function (id) {
            fetchPartEpisodes(id, function (list) {
                catalogs[id] = list;
                step();
            });
        });

        api({
            path: '/sync/watched?extended=episodes,counters',
            method: 'POST',
            auth: true,
            body: parts.map(function (id) { return { simkl: id }; }),
            onDone: function (data) {
                answers = Array.isArray(data) ? data : [];
                step();
            },
            onFail: function () {
                answers = [];
                step();
            }
        });
    }

    // Ответ /sync/watched по tmdb-id сериала, а если это аниме из нескольких
    // частей — сериал, собранный из всех частей. Первая часть может и не быть
    // в списках, когда смотрят вторую, поэтому части ищем при любом ответе,
    // где Simkl узнал тайтл.
    function withParts(method, tmdb, answer, done) {
        if (method !== 'tv' || !answer || !answer.simkl) return done(answer);

        animeParts(tmdb, answer.simkl, function (parts) {
            if (!parts) return done(answer);
            mergedShow(parts, done);
        });
    }

    // --- Запись в Simkl ---------------------------------------------------

    // Simkl ищет тайтл по всем переданным полям сразу, поэтому отдаём и
    // название с годом, а не только tmdb-id: так меньше шансов промахнуться.
    function mediaBody(card, method, extra) {
        var item = { title: Core.cardTitle(card), ids: { tmdb: Number(card.id) } };
        var year = Core.cardYear(card);
        var body = {};

        if (year) item.year = year;
        if (extra) Object.keys(extra).forEach(function (name) { item[name] = extra[name]; });

        body[method === 'tv' ? 'shows' : 'movies'] = [item];
        return body;
    }

    function openOnSimkl(ctx) {
        // Ссылка обратно на Simkl — требование их правил использования API.
        // Simkl-id мы не знаем, но их redirect переводит tmdb-id в нужную
        // страницу сам. type обязателен: в TMDB фильмы и сериалы нумеруются
        // независимо, и без него redirect выберет не тот каталог.
        var url = withParams('/redirect?to=Simkl&tmdb=' + encodeURIComponent(ctx.card.id) +
            '&type=' + (ctx.method === 'tv' ? 'tv' : 'movie'));

        if (!window.open(url, '_blank')) Lampa.Noty.show('Не удалось открыть Simkl');
    }

    // Simkl отвечает успехом и тогда, когда не нашёл тайтл, так что ответ
    // приходится разбирать. По счётчикам added судить нельзя: они считают
    // изменения, и у повторной отметки уже отмеченного там честные нули.
    // Настоящий отказ виден только в not_found.
    function rejected(data) {
        var missing = (data && data.not_found) || {};

        return ['movies', 'shows', 'anime', 'episodes'].some(function (kind) {
            return (missing[kind] || []).length > 0;
        });
    }

    // Отметка о просмотре — это событие, а не членство в списке, поэтому идёт
    // в /sync/history. Форма тела задаёт глубину: status без seasons — весь
    // сериал, seasons с episodes — перечисленные серии.
    // body — готовое тело запроса, когда оно не про сериал по tmdb-id целиком,
    // а про отдельные части аниме.
    function sendHistory(ctx, extra, done_text, body) {
        // Поштучно шлём только непросмотренные серии, так что ноль в
        // added.episodes здесь — это отказ, а не «уже было отмечено»
        var expects_episodes = !!(extra && extra.seasons) || !!(body && body.anime);

        api({
            path: '/sync/history',
            method: 'POST',
            auth: true,
            body: body || mediaBody(ctx.card, ctx.method, extra),
            onDone: function (data) {
                if (rejected(data)) return Lampa.Noty.show('Simkl: тайтл не найден');

                if (expects_episodes && !(data && data.added && data.added.episodes)) {
                    return Lampa.Noty.show('Simkl: ничего не отмечено');
                }

                invalidate(ctx.method, ctx.card.id);
                Lampa.Noty.show('Simkl: ' + done_text);
                refresh(ctx);
            },
            onFail: function () {
                Lampa.Noty.show('Simkl: не удалось отметить');
            }
        });
    }

    function episodeCode(place) {
        function pad(value) { return value < 10 ? '0' + value : String(value); }

        // У аниме серии часто идут сквозной нумерацией, без сезонов
        if (place.season === undefined || place.season === null) return 'E' + pad(place.episode);

        return 'S' + pad(place.season) + 'E' + pad(place.episode);
    }

    // Вышедшие, но не отмеченные серии по порядку. Невышедшие в список не
    // попадают — посмотреть их нельзя, — просмотренные тоже: их и так видно.
    function unwatchedEpisodes(status) {
        var list = [];

        ((status && status.seasons) || []).forEach(function (season) {
            (season.episodes || []).forEach(function (episode) {
                if (episode.aired && !episode.watched) {
                    // part и local есть только у аниме, собранного из частей
                    list.push({
                        season: season.number,
                        episode: episode.number,
                        part: episode.part,
                        local: episode.local
                    });
                }
            });
        });

        return list;
    }

    function episodesNominative(count) {
        var n = count % 100;
        var n1 = n % 10;

        if (n > 10 && n < 20) return 'серий';
        if (n1 === 1) return 'серия';
        if (n1 > 1 && n1 < 5) return 'серии';
        return 'серий';
    }

    // Выбранная серия отмечается вместе со всеми непросмотренными до неё:
    // досмотрел до S02E05 — значит, и всё раньше тоже. Уже отмеченные повторно
    // не шлём, иначе Simkl засчитал бы их пересмотром.
    //
    // У аниме из нескольких частей отмечаем каждую часть отдельно, её
    // собственной нумерацией: так серия попадает ровно туда, откуда её взяли,
    // и не зависит от того, как Simkl разметил части по сезонам TVDB.
    function markUpTo(ctx, unwatched, index) {
        var chosen = unwatched.slice(0, index + 1);
        var count = index + 1;
        var text = 'отмечено до ' + episodeCode(unwatched[index]) +
            (count > 1 ? ' (' + count + ' ' + episodesNominative(count) + ')' : '');

        var groups = {};
        var order = [];
        var by_parts = !!chosen[0].part;

        chosen.forEach(function (place) {
            var key = by_parts ? place.part : place.season;

            if (!groups[key]) {
                groups[key] = [];
                order.push(key);
            }
            groups[key].push({ number: by_parts ? place.local : place.episode });
        });

        if (by_parts) {
            return sendHistory(ctx, null, text, {
                anime: order.map(function (part) {
                    return { ids: { simkl: part }, episodes: groups[part] };
                })
            });
        }

        sendHistory(ctx, {
            seasons: order.map(function (number) {
                return { number: number, episodes: groups[number] };
            })
        }, text);
    }

    function openUnwatchedMenu(ctx, unwatched, back) {
        Lampa.Select.show({
            title: 'Просмотрено по серию',
            items: unwatched.map(function (place, index) {
                var count = index + 1;

                return {
                    title: episodeCode(place),
                    // Сразу видно, сколько уйдёт одним нажатием: промах на
                    // пульте иначе незаметно отметил бы полсезона
                    subtitle: count === 1
                        ? 'только эта серия'
                        : 'отметится ' + count + ' ' + episodesNominative(count),
                    index: index
                };
            }),
            onSelect: function (chosen) {
                Lampa.Controller.toggle(back);
                markUpTo(ctx, unwatched, chosen.index);
            },
            onBack: function () { Lampa.Controller.toggle(back); }
        });
    }

    // Сезон отмечается вместе со всеми предыдущими: досмотрел третий — значит,
    // и первые два тоже. В списке только сезоны, где есть вышедшие, но не
    // просмотренные серии. Анонсированный сезон без вышедших серий сюда не
    // попадает: Simkl на него отвечает успехом и молча ничего не отмечает.
    function openSeasonMenu(ctx, unwatched, back) {
        var last_index = {};

        unwatched.forEach(function (place, index) {
            last_index[place.season] = index;
        });

        var seasons = Object.keys(last_index).map(Number).sort(function (a, b) { return a - b; });

        Lampa.Select.show({
            title: 'Просмотрено по сезон',
            items: seasons.map(function (number) {
                var count = last_index[number] + 1;

                return {
                    title: 'Сезон ' + number,
                    subtitle: 'отметится ' + count + ' ' + episodesNominative(count),
                    index: last_index[number]
                };
            }),
            onSelect: function (chosen) {
                Lampa.Controller.toggle(back);
                markUpTo(ctx, unwatched, chosen.index);
            },
            onBack: function () { Lampa.Controller.toggle(back); }
        });
    }

    function openEpisodeMenu(ctx) {
        if (!configured()) return Lampa.Noty.show('Simkl: не задан client_id');
        // После подключения только обновляем карточку. Открывать меню сразу
        // нельзя: оно перехватывает фокус в момент, когда человек ещё дожимает
        // подтверждение на телефоне, и случайный Enter молча отправляет в
        // Simkl первый пункт.
        if (!token()) return startPinAuth(function () { refresh(ctx); });

        // Куда вернуть фокус, когда список закроется. Имя контроллера карточки
        // от сборки к сборке менялось, поэтому спрашиваем текущий, а не зашиваем.
        var back = Lampa.Controller.enabled().name;

        fetchEpisodes(ctx, function (status) {
            var unwatched = unwatchedEpisodes(status);
            var items = [];

            // Отмечать поштучно или сезонами есть смысл, только пока есть что:
            // вышедшие и ещё не просмотренные серии
            if (unwatched.length) {
                items.push({
                    title: 'Отметить серию…',
                    subtitle: 'следующая — ' + episodeCode(unwatched[0]),
                    episodes: true
                });
                items.push({ title: 'Отметить сезон…', seasons: true });
            }

            // Весь сериал — это все вышедшие непросмотренные серии поштучно.
            // status: completed отметил бы заново и уже просмотренные, а
            // повторный просмотр засчитывать нельзя. Нечего отмечать — нет и
            // пункта.
            if (unwatched.length) items.push({ title: 'Весь сериал просмотрен', whole: true });
            items.push({ title: 'Похожее', subtitle: 'рекомендации TMDB и Simkl', similar: true });
            items.push({ title: 'Открыть на Simkl', open: true });

            Lampa.Select.show({
                title: 'Simkl',
                items: items,
                onSelect: function (chosen) {
                    if (chosen.episodes) return openUnwatchedMenu(ctx, unwatched, back);
                    if (chosen.seasons) return openSeasonMenu(ctx, unwatched, back);

                    Lampa.Controller.toggle(back);

                    if (chosen.open) return openOnSimkl(ctx);
                    if (chosen.similar) return openSimilar(ctx);

                    if (chosen.whole) markUpTo(ctx, unwatched, unwatched.length - 1);
                },
                onBack: function () { Lampa.Controller.toggle(back); }
            });
        });
    }

    // --- Кнопка на фильме ----------------------------------------------------

    // У фильма выбирать нечего, кроме «посмотрел или нет», но делать это через
    // «Избранное» неочевидно — поэтому кнопка та же, что у сериала.
    function openMovieMenu(ctx) {
        if (!configured()) return Lampa.Noty.show('Simkl: не задан client_id');
        if (!token()) return startPinAuth(function () { refresh(ctx); });

        var back = Lampa.Controller.enabled().name;

        fetchStatus(ctx.method, ctx.card.id, function (status) {
            var watched = movieWatched(status);
            var items = [];

            if (watched) items.push({ title: 'Убрать отметку о просмотре', unmark: true });
            else items.push({ title: 'Фильм просмотрен', mark: true });

            items.push({ title: 'Похожее', subtitle: 'рекомендации TMDB и Simkl', similar: true });
            items.push({ title: 'Открыть на Simkl', open: true });

            Lampa.Select.show({
                title: 'Simkl',
                items: items,
                onSelect: function (chosen) {
                    Lampa.Controller.toggle(back);

                    if (chosen.open) return openOnSimkl(ctx);
                    if (chosen.similar) return openSimilar(ctx);
                    if (chosen.mark) return sendHistory(ctx, null, 'фильм отмечен просмотренным');
                    if (chosen.unmark) unmarkMovie(ctx);
                },
                onBack: function () { Lampa.Controller.toggle(back); }
            });
        });
    }

    // Фильм смотрели, если он в «Просмотрено» или у него есть дата просмотра:
    // его могли досмотреть и перенести в другой список. Повторная отметка
    // такого — пересмотр, а его не засчитываем нигде.
    function movieWatched(status) {
        return !!status && (status.list === 'completed' || !!status.last_watched_at);
    }

    function unmarkMovie(ctx) {
        api({
            path: '/sync/history/remove',
            method: 'POST',
            auth: true,
            body: mediaBody(ctx.card, ctx.method, null),
            onDone: function () {
                invalidate(ctx.method, ctx.card.id);
                Lampa.Noty.show('Simkl: отметка о просмотре снята');
                refresh(ctx);
            },
            onFail: function () {
                Lampa.Noty.show('Simkl: не удалось снять отметку');
            }
        });
    }

    // --- Автоотметка ---------------------------------------------------------

    // Во встроенном плеере просмотрено — это больше 90% длительности: на
    // титрах человек обычно закрывает плеер, и 100% не бывает почти никогда.
    var WATCHED_PERCENT = 90;

    // Запуски встроенного плеера помним полдня: серию на паузе досматривают
    // вечером, а Lampa за это время могла и перезагрузиться
    var LAUNCH_TTL = 12 * 60 * 60 * 1000;

    var launches = {};
    var by_hash = {};

    function automark() {
        return Lampa.Storage.get(AUTOMARK_KEY, true) && ready();
    }

    function loadLaunches() {
        try {
            var saved = Lampa.Storage.get(LAUNCHES_KEY, '{}') || {};

            Object.keys(saved).forEach(function (id) {
                if (saved[id] && Date.now() - saved[id].at < LAUNCH_TTL) indexLaunch(saved[id]);
            });
        } catch (e) {
            console.error('Simkl: не удалось прочитать запуски', e);
        }
    }

    function persistLaunches() {
        var keep = {};

        Object.keys(launches).forEach(function (id) {
            if (Date.now() - launches[id].at < LAUNCH_TTL) keep[id] = launches[id];
        });

        launches = keep;

        try {
            Lampa.Storage.set(LAUNCHES_KEY, launches);
        } catch (e) {
            console.error('Simkl: не удалось записать запуски', e);
        }
    }

    function indexLaunch(entry) {
        launches[entry.id] = entry;
        if (entry.hash) by_hash[entry.hash] = entry;
    }

    // Lampa хранит прогресс под хэшем от сезона, серии и оригинального
    // названия — так его считают и балансеры, и торренты. Обратного хода нет,
    // поэтому перебираем серии сериала и смотрим, чей хэш совпал.
    var hash_places = {};

    function episodeHash(card, season, episode) {
        return Lampa.Utils.hash([season, season > 10 ? ':' : '', episode, card.original_name || card.original_title].join(''));
    }

    function placeByHash(card, hash) {
        var key = card.id;

        if (!hash_places[key]) {
            var map = {};
            var seasons = (card.seasons || []).filter(function (season) {
                return season.season_number > 0 && season.episode_count > 0;
            });

            // Без разбивки по сезонам — с запасом: хэш дешёвый
            if (!seasons.length) {
                for (var n = 1; n <= 30; n++) seasons.push({ season_number: n, episode_count: 120 });
            }

            seasons.forEach(function (season) {
                for (var e = 1; e <= season.episode_count; e++) {
                    map[episodeHash(card, season.season_number, e)] = { season: season.season_number, episode: e };
                }
            });

            hash_places[key] = map;
        }

        return hash_places[key][hash] || null;
    }

    function itemPlace(card, method, item) {
        if (method !== 'tv') return {};

        var season = Number(item.season);
        var episode = Number(item.episode);
        if (season && episode) return { season: season, episode: episode };

        var hash = item.timeline && item.timeline.hash;
        return hash ? placeByHash(card, hash) : null;
    }

    // Карточку плеер получает не всегда: тогда берём ту, с которой его открыли
    function playCard(data) {
        if (data.card && data.card.id) return data.card;
        if (data.movie && data.movie.id) return data.movie;

        var active = Lampa.Activity.active();
        if (!active) return null;

        return (active.card && active.card.id && active.card) ||
            (active.movie && active.movie.id && active.movie) || null;
    }

    // В Storage кладём только то, что нужно для отметки
    function launchCard(card) {
        return {
            id: card.id,
            title: card.title,
            name: card.name,
            original_title: card.original_title,
            original_name: card.original_name,
            release_date: card.release_date,
            first_air_date: card.first_air_date
        };
    }

    function launchEntry(card, method, place) {
        return {
            id: method + ':' + card.id + ':' + (method === 'tv' ? place.season + ':' + place.episode : 'movie'),
            at: Date.now(),
            card: launchCard(card),
            method: method,
            season: place.season,
            episode: place.episode,
            done: false
        };
    }

    // Встроенный плеер открыли — запоминаем каждую серию плейлиста под её
    // хэшем прогресса: досмотреть могут и не ту, с которой начали
    function registerPlay(data) {
        if (!automark() || !data) return;

        var card = playCard(data);
        if (!card || !Number(card.id)) return;

        var method = Core.cardMethod(card);
        var items = [data].concat(Array.isArray(data.playlist) ? data.playlist : []);

        items.forEach(function (item) {
            var hash = item && item.timeline && item.timeline.hash;
            if (!hash) return;

            var place = itemPlace(card, method, item);
            if (!place) return;

            var entry = launchEntry(card, method, place);
            var known = launches[entry.id];

            // Повторный запуск недосмотренной серии продолжает прежний
            if (known && !known.done) entry = known;

            entry.at = Date.now();
            entry.hash = hash;
            indexLaunch(entry);
        });

        persistLaunches();
    }

    // Внешний плеер о прогрессе ничего не сообщает — на macOS и iOS Lampa
    // открывает его ссылкой и больше ничего о нём не знает. Поэтому серия или
    // фильм отмечаются сразу при открытии. Только запущенная серия: что из
    // плейлиста досмотрят дальше, неизвестно.
    //
    // На Android так не делаем: там внешний плеер возвращает позицию в
    // Timeline, и работает то же правило 90%, что и во встроенном.
    function externalPlay(data) {
        if (!automark() || !data) return;
        if (isAndroid()) return registerPlay(data);

        var card = playCard(data);
        if (!card || !Number(card.id)) return;

        var method = Core.cardMethod(card);
        var place = itemPlace(card, method, data);

        if (!place) return console.warn('Simkl: не удалось понять, какая серия запущена');

        markWatched(launchEntry(card, method, place));
    }

    function isAndroid() {
        try {
            return Lampa.Platform.is('android');
        } catch (e) {
            return false;
        }
    }

    function progress(entry, percent) {
        if (!entry || entry.done || !(percent > WATCHED_PERCENT)) return;

        entry.done = true;
        persistLaunches();
        markWatched(entry);
    }

    function entryCtx(entry) {
        var current = Core.currentCard();

        if (current && String(current.card.id) === String(entry.card.id)) return current;

        return { card: entry.card, method: entry.method, render: $() };
    }

    // Отмечаем только эту серию: в отличие от меню, где выбранная серия тянет
    // за собой все предыдущие, здесь известно ровно одно — её смотрели.
    // Уже отмеченное повторно не шлём, иначе Simkl посчитал бы пересмотр.
    // Смотрели ли уже — решает только Simkl: перед отметкой статус берётся
    // свежим, мимо кэша
    function markWatched(entry) {
        var ctx = entryCtx(entry);

        if (entry.method !== 'tv') {
            dropCache(cacheKey('movie', entry.card.id));

            return fetchStatus('movie', entry.card.id, function (status) {
                if (movieWatched(status)) return;
                sendHistory(ctx, null, 'фильм отмечен просмотренным');
            });
        }

        var code = episodeCode({ season: entry.season, episode: entry.episode });

        delete episodes_cache[cacheKey('tv', entry.card.id)];

        fetchEpisodes(ctx, function (status) {
            var place = null;

            ((status && status.seasons) || []).forEach(function (season) {
                if (season.number !== entry.season) return;

                (season.episodes || []).forEach(function (episode) {
                    if (episode.number === entry.episode) place = episode;
                });
            });

            if (place && place.watched) return;

            if (place && place.part) {
                return sendHistory(ctx, null, 'отмечено ' + code, {
                    anime: [{ ids: { simkl: place.part }, episodes: [{ number: place.local }] }]
                });
            }

            sendHistory(ctx, {
                seasons: [{ number: entry.season, episodes: [{ number: entry.episode }] }]
            }, 'отмечено ' + code);
        });
    }

    // Прогресс встроенного плеера, а на Android — и внешнего: Lampa пишет его
    // в Timeline под хэшем серии
    function followTimeline() {
        if (!Lampa.Timeline || !Lampa.Timeline.listener) return;

        Lampa.Timeline.listener.follow('update', function (e) {
            var data = e && e.data;
            if (!data || !data.road || !automark()) return;

            progress(by_hash[data.hash], Number(data.road.percent) || 0);
        });
    }

    function startAutomark() {
        loadLaunches();
        followTimeline();

        if (!Lampa.Player || !Lampa.Player.listener) return;

        Lampa.Player.listener.follow('start', registerPlay);
        Lampa.Player.listener.follow('external', externalPlay);
    }

    // --- Категории «Избранного» -------------------------------------------

    function ready() {
        return configured() && !!token();
    }

    function pushFavorite(card, list) {
        if (!ready()) return;

        var method = Core.cardMethod(card);

        // Просмотренный фильм «на потом» в Simkl не переносим: продолжения у
        // него не будет, а Simkl при переносе в «Буду смотреть» стирает у
        // фильма сам просмотр — last_watched_at становится null, и вернуть его
        // уже не по чему. Так «Закладки» и «Позже» и портили просмотренное.
        if (method === 'movie' && list === 'plantowatch') {
            dropCache(cacheKey(method, card.id));

            return fetchStatus(method, card.id, function (status) {
                if (movieWatched(status)) return;
                addToList(card, method, list);
            });
        }

        addToList(card, method, list);
    }

    function addToList(card, method, list) {
        api({
            path: '/sync/add-to-list',
            method: 'POST',
            auth: true,
            body: mediaBody(card, method, { to: list }),
            onDone: function (data) {
                if (rejected(data)) return Lampa.Noty.show('Simkl: тайтл не найден');

                invalidate(method, card.id);
                Lampa.Noty.show('Simkl: ' + LISTS[list]);
            },
            onFail: function () {
                Lampa.Noty.show('Simkl: не удалось изменить статус');
            }
        });
    }

    function dropFavorite(card, list) {
        if (!ready()) return;

        var method = Core.cardMethod(card);

        fetchStatus(method, card.id, function (status) {
            // Снимаем только то, что сами же и поставили. Если в Simkl лежит
            // другой статус, человек менял его там — затирать это нельзя.
            if (!status || status.list !== list) return;

            api({
                path: '/sync/history/remove',
                method: 'POST',
                auth: true,
                body: mediaBody(card, method, null),
                onDone: function () {
                    invalidate(method, card.id);
                    Lampa.Noty.show('Simkl: убрано из списков');
                }
            });
        });
    }

    // --- Выгрузка «Избранного» -----------------------------------------------

    // Категории «Избранного» уходят в Simkl по мере того, как их ставят, но
    // то, что лежало там до подключения аккаунта или ставилось на другом
    // устройстве, так и оставалось бы в Lampa. Поэтому раз в сутки и по
    // кнопке в настройках выгружаем всё, чего в Simkl ещё нет ни в одном
    // списке. Что уже есть — не трогаем: статус могли поменять на simkl.com.
    var EXPORT_EVERY = 24 * 60 * 60 * 1000;
    var EXPORT_BATCH = 100;

    // Карточка бывает в нескольких категориях сразу — берём самую сильную:
    // «Просмотрено» важнее «Брошено», то важнее «Смотрю», а «Позже» и
    // «Закладки» — самое слабое
    var EXPORT_ORDER = ['viewed', 'thrown', 'look', 'wath', 'book'];

    function favoriteCards() {
        var all = {};
        var wanted = {};
        var order = [];

        try {
            all = Lampa.Favorite.all() || {};
        } catch (e) {
            console.error('Simkl: не удалось прочитать «Избранное»', e);
        }

        EXPORT_ORDER.forEach(function (category) {
            (all[category] || []).forEach(function (card) {
                if (!card || !Number(card.id)) return;
                // Карточки других каталогов tmdb-id не несут
                if (card.source && card.source !== 'tmdb' && card.source !== 'cub') return;

                var method = Core.cardMethod(card);
                var key = method + ':' + Number(card.id);
                if (wanted[key]) return;

                wanted[key] = { card: card, method: method, to: FAVORITE_MAP[category] };
                order.push(key);
            });
        });

        return order.map(function (key) { return { key: key, item: wanted[key] }; });
    }

    function exportFavorites(manual, after) {
        var finish = after || function () {};

        if (!ready()) {
            if (manual) Lampa.Noty.show('Simkl: аккаунт не подключён');
            return finish();
        }

        var cards = favoriteCards();

        if (!cards.length) {
            if (manual) Lampa.Noty.show('Simkl: в «Избранном» нечего выгружать');
            return finish();
        }

        // Свежая библиотека: выгрузка решает, чего в Simkl нет
        library_cache = null;

        loadLibrary(function (rows) {
            var have = libraryKeys(rows);
            var planned = libraryKeys(rows, ['plantowatch']);

            var missing = cards.filter(function (entry) { return !have[entry.key]; }).map(function (entry) {
                return entry.item;
            });

            // Фильм в «Просмотрено» у Lampa, а в Simkl — в «Буду смотреть»:
            // это прежние «Закладки» и «Позже» стёрли у него просмотр. Отмечаем
            // просмотренным заново — в Simkl он сейчас не просмотрен, так что
            // пересмотром это не станет.
            var repair = cards.filter(function (entry) {
                return entry.item.method === 'movie' && entry.item.to === 'completed' && planned[entry.key];
            }).map(function (entry) {
                return entry.item;
            });

            Lampa.Storage.set(EXPORT_KEY, Date.now());

            if (!missing.length && !repair.length) {
                if (manual) Lampa.Noty.show('Simkl: всё из «Избранного» уже там');
                return finish();
            }

            sendExport(missing, function (added, lost) {
                repairWatched(repair, function (repaired) {
                    entries_cache = {};
                    library_cache = null;
                    clearCache();

                    var text = [];
                    if (added || manual) text.push('из «Избранного» выгружено ' + added);
                    if (lost) text.push('не найдено в Simkl ' + lost);
                    if (repaired) text.push('снова отмечено просмотренными ' + repaired);

                    if (text.length) Lampa.Noty.show('Simkl: ' + text.join(', '));
                    finish();
                });
            });
        }, function () {
            if (manual) Lampa.Noty.show('Simkl: не удалось получить списки Simkl');
            finish();
        });
    }

    // add-to-list — только статус, события просмотра он не пишет, так что
    // пересмотров выгрузка не создаёт. Пачками по сотне, одна за другой.
    function sendExport(items, done) {
        var added = 0;
        var lost = 0;

        function next(index) {
            var batch = items.slice(index, index + EXPORT_BATCH);
            if (!batch.length) return done(added, lost);

            var body = {};

            batch.forEach(function (item) {
                var media = mediaBody(item.card, item.method, { to: item.to });
                var kind = item.method === 'tv' ? 'shows' : 'movies';

                (body[kind] = body[kind] || []).push(media[kind][0]);
            });

            api({
                path: '/sync/add-to-list',
                method: 'POST',
                auth: true,
                body: body,
                onDone: function (data) {
                    var ok = (data && data.added) || {};
                    var missing = (data && data.not_found) || {};

                    added += (ok.movies || []).length + (ok.shows || []).length;
                    lost += (missing.movies || []).length + (missing.shows || []).length;
                    next(index + EXPORT_BATCH);
                },
                onFail: function () {
                    done(added, lost + items.length - index);
                }
            });
        }

        next(0);
    }

    function repairWatched(items, done) {
        if (!items.length) return done(0);

        var repaired = 0;

        function next(index) {
            var batch = items.slice(index, index + EXPORT_BATCH);
            if (!batch.length) return done(repaired);

            api({
                path: '/sync/history',
                method: 'POST',
                auth: true,
                body: {
                    movies: batch.map(function (item) { return mediaBody(item.card, 'movie', null).movies[0]; })
                },
                onDone: function (data) {
                    // added.movies тут ноль: Simkl не считает это новым
                    // просмотром. Итог виден в statuses — какой статус стал.
                    ((data && data.added && data.added.statuses) || []).forEach(function (entry) {
                        if (entry.response && entry.response.status === 'completed') repaired++;
                    });
                    next(index + EXPORT_BATCH);
                },
                onFail: function () { done(repaired); }
            });
        }

        next(0);
    }

    // --- Продолжения аниме ----------------------------------------------------

    // У обычного сериала новый сезон — часть того же тайтла, и Simkl сам
    // возвращает его в «Смотрю». У аниме продолжение — отдельный тайтл
    // («Dorohedoro Season 2», «Ninja Kamui: Red Vendetta»), и в списки оно
    // само не попадает: досмотрел первую часть — а второй нигде нет. Поэтому
    // для каждого аниме из «Просмотрено» и «Смотрю» ищем продолжения тем же
    // animeParts, что собирает части на карточке, и те, которых нет ни в
    // одном списке, кладём в «Смотрю» — и вышедшие, и ещё не вышедшие:
    // «Буду смотреть» — это то, что ещё не начинали, а сериал начат. Что
    // лежит в любом списке, включая брошенное, не трогаем — значит, решали
    // руками.
    //
    // Прежняя версия клала не вышедшие продолжения в «Буду смотреть» и
    // запоминала их в SEQUELS_KEY. Те из них, что там и лежат, переносим в
    // «Смотрю».
    var SEQUEL_WORKERS = 3;

    function syncSequels(manual, done) {
        var finish = done || function () {};
        if (!ready()) return finish(0);

        loadLibrary(function (rows) {
            var have = libraryKeys(rows);
            var planned_now = libraryKeys(rows, ['plantowatch']);
            var send = [];

            try {
                (Lampa.Storage.get(SEQUELS_KEY, '[]') || []).forEach(function (id) {
                    if (planned_now['simkl:' + id]) send.push(Number(id));
                });
            } catch (e) {}

            var bases = rows.filter(function (row) {
                var ids = rowMedia(row).ids || {};

                return row.type === 'anime' && rowMethod(row) === 'tv' && Number(ids.tmdb) && ids.simkl &&
                    (row.item.status === 'completed' || row.item.status === 'watching');
            });

            pool(bases, SEQUEL_WORKERS, function (row, next) {
                var ids = rowMedia(row).ids;

                animeParts(Number(ids.tmdb), ids.simkl, function (parts) {
                    (parts || []).forEach(function (id) {
                        if (!have['simkl:' + id] && send.indexOf(id) === -1) send.push(id);
                    });
                    next();
                });
            }, function () {
                if (!send.length) {
                    Lampa.Storage.set(SEQUELS_KEY, []);
                    if (manual) Lampa.Noty.show('Simkl: новых продолжений аниме нет');
                    return finish(0);
                }

                api({
                    path: '/sync/add-to-list',
                    method: 'POST',
                    auth: true,
                    body: {
                        shows: send.map(function (id) { return { ids: { simkl: id }, to: 'watching' }; })
                    },
                    onDone: function () {
                        Lampa.Storage.set(SEQUELS_KEY, []);

                        entries_cache = {};
                        library_cache = null;
                        clearCache();

                        Lampa.Noty.show('Simkl: продолжения аниме добавлены в «Смотрю» — ' + send.length);
                        finish(send.length);
                    },
                    onFail: function () {
                        if (manual) Lampa.Noty.show('Simkl: не удалось добавить продолжения аниме');
                        finish(0);
                    }
                });
            });
        }, function () {
            if (manual) Lampa.Noty.show('Simkl: не удалось получить списки Simkl');
            finish(0);
        });
    }

    function scheduleExport() {
        var last = Number(Lampa.Storage.get(EXPORT_KEY, 0)) || 0;

        if (ready() && Date.now() - last > EXPORT_EVERY) {
            // Не в момент старта: Lampa в это время и так грузит главную
            setTimeout(function () { exportFavorites(false); }, 15000);
        }

        // Продолжения — при каждом старте: состав частей каждого аниме лежит
        // в кэше неделю, так что обычно это три запроса за библиотекой
        if (ready()) setTimeout(function () { syncSequels(false); }, 20000);
    }

    function followFavorite() {
        Lampa.Favorite.listener.follow('add', function (e) {
            var list = e.card && FAVORITE_MAP[e.where];
            if (list) pushFavorite(e.card, list);
        });

        Lampa.Favorite.listener.follow('remove', function (e) {
            var list = e.card && FAVORITE_MAP[e.where];
            if (list) dropFavorite(e.card, list);
        });
    }

    function onCard(ctx) {
        if (!configured()) return;

        // У сериала в меню выбирают, что отмечено — серия, сезон или всё
        // целиком, у фильма — просмотрен он или нет
        if (Lampa.Storage.get(BUTTON_KEY, true)) {
            Core.cardButton(ctx, {
                className: 'simkl-status-button',
                // Пока статус не пришёл — как у непросмотренного
                icon: BUTTON_ICONS.none,
                title: 'Simkl',
                after: '.button--play',
                onEnter: function () {
                    if (ctx.method === 'tv') openEpisodeMenu(ctx);
                    else openMovieMenu(ctx);
                }
            });
        }

        refresh(ctx);
    }

    // --- Карточки TMDB -----------------------------------------------------

    // Грид рисует сама Lampa, и ей нужны карточки TMDB — с ними бесплатно
    // приезжают постер, оценка, бейдж типа и русское название.
    //
    // Русское название, кстати, из Simkl не достать: в поиске оно у него есть
    // («Игра престолов» находится), но наружу отдаются только английские —
    // language принимает единственное значение en, а language, locale и
    // title_language на детальных эндпоинтах молча игнорируются.
    //
    // Данные карточки не меняются, так что кэш вечный: платим запросами один
    // раз, при следующем открытии экрана он уже собран.
    var cards = {};
    var card_queue = [];
    var card_active = 0;

    // Три запроса разом: сорок параллельных телевизор не обрадуют, а по одному
    // экран собирался бы заметно долго.
    var CARD_WORKERS = 3;

    function loadCards() {
        try {
            cards = Lampa.Storage.get(CARDS_KEY, '{}') || {};
        } catch (e) {
            console.error('Simkl: не удалось прочитать кэш карточек', e);
        }
    }

    // Язык входит в ключ: после смены языка Lampa кэш не должен отдавать
    // карточку, набранную для прошлого.
    function cardKey(method, id) {
        return Lampa.Storage.get('language', 'ru') + ':' + method + ':' + id;
    }

    // В Storage кладём только то, из чего Lampa собирает карточку: полный
    // ответ TMDB с описанием и сезонами раздул бы хранилище на ровном месте.
    function trim(data, method) {
        return {
            id: data.id,
            name: data.name,
            title: data.title,
            original_name: data.original_name,
            original_title: data.original_title,
            poster_path: data.poster_path,
            backdrop_path: data.backdrop_path,
            first_air_date: data.first_air_date,
            release_date: data.release_date,
            vote_average: data.vote_average,
            // Дата выхода последней вышедшей серии — для подписи в «Продолжить просмотр»
            last_air_date: data.last_air_date,
            source: 'tmdb',
            media_type: method
        };
    }

    // Одну и ту же карточку могут попросить разом — подписи рекомендаций
    // ссылаются на один источник по двадцать раз. В сеть уходит один запрос.
    var card_waiting = {};

    function tmdbCard(method, id, callback) {
        var key = cardKey(method, id);

        if (cards[key]) return callback(cards[key]);
        if (card_waiting[key]) return card_waiting[key].push(callback);

        card_waiting[key] = [callback];

        tmdbGet(method + '/' + id, function (data) {
            if (data && data.id) cards[key] = trim(data, method);

            var waiting = card_waiting[key];
            delete card_waiting[key];

            waiting.forEach(function (fn) { fn(cards[key] || null); });
        });
    }

    // Любой запрос к TMDB идёт через одну очередь: и карточки, и рекомендации
    function tmdbGet(path, done) {
        card_queue.push({ path: path, done: done });
        pumpCards();
    }

    function pumpCards() {
        if (!card_active && !card_queue.length) {
            try {
                Lampa.Storage.set(CARDS_KEY, cards);
            } catch (e) {
                console.error('Simkl: не удалось записать кэш карточек', e);
            }
            return;
        }

        while (card_active < CARD_WORKERS && card_queue.length) {
            run(card_queue.shift());
        }

        function run(task) {
            card_active++;

            // Через Lampa.Reguest и Lampa.TMDB, а не своим запросом: только так
            // работают пользовательские настройки ключа и прокси к TMDB.
            var url = Lampa.TMDB.api(task.path +
                (task.path.indexOf('?') === -1 ? '?' : '&') +
                'api_key=' + Lampa.TMDB.key() +
                '&language=' + Lampa.Storage.get('language', 'ru'));

            function next() {
                card_active--;
                pumpCards();
            }

            new Lampa.Reguest().silent(url, function (data) {
                task.done(data);
                next();
            }, function () {
                task.done(null);
                next();
            });
        }
    }

    // --- Панель Simkl: разделы ------------------------------------------------

    // Одна страница грида. Карточки TMDB берутся только для неё, так что список
    // на пятьсот тайтлов стоит двадцати запросов, а не пятисот.
    var PAGE_SIZE = 20;

    // Список раздела собирается целиком и держится в памяти: листание страниц
    // не должно каждый раз заново ходить в Simkl.
    var ENTRIES_TTL = 5 * 60 * 1000;
    var entries_cache = {};

    // TMDB отдаёт дату выхода без времени, «2026-07-26». Через new Date её не
    // пропускаем: полночь по UTC западнее Гринвича превращается в предыдущий день.
    function airDate(value) {
        var parts = String(value || '').split('-');
        if (parts.length !== 3) return '';

        return parts[2] + '.' + parts[1] + '.' + parts[0].slice(2);
    }

    // Запись раздела: что открыть и что подписать под постером. Без tmdb-id
    // карточку не собрать. Аниме без него ещё можно найти по simkl-id (см.
    // resolveAnime), остальное просто выпадает.
    function entry(method, ids, label, anime) {
        var tmdb = simklTmdb(ids, method);
        var simkl = ids && (ids.simkl || ids.simkl_id);

        // У аниме simkl-id нужен и при tmdb-id — по нему часть сводится к
        // сериалу целиком (см. partsBase)
        if (tmdb) return { method: method, tmdb: tmdb, simkl: anime ? simkl : undefined, label: label };
        if (anime && simkl) return { method: method, tmdb: 0, simkl: simkl, label: label };

        return null;
    }

    // Продолжения аниме Simkl, как MyAnimeList, заводит отдельными тайтлами:
    // «Slay The Gods 2», «Dorohedoro Season 2». В TMDB это сезоны одного
    // сериала, и в списке у такой записи tmdb-id нет. В деталях он бывает
    // прямо в ids, а если нет — есть у предыдущей части в relations. Карточку
    // в любом случае открываем у сериала целиком.
    var anime_tmdb = {};

    function loadAnimeTmdb() {
        try {
            anime_tmdb = Lampa.Storage.get(ANIME_TMDB_KEY, '{}') || {};
        } catch (e) {
            console.error('Simkl: не удалось прочитать сопоставления аниме', e);
        }
    }

    function parentTmdb(data) {
        var own = Number(data && data.ids && data.ids.tmdb);
        if (own) return own;

        var related = (data && data.relations) || [];

        for (var i = 0; i < related.length; i++) {
            var kind = String(related[i].relation_type || '');
            var tmdb = Number(related[i].ids && related[i].ids.tmdb);

            // Только предыдущие части того же сериала: сиквел, спин-офф или
            // полнометражка — это уже другой тайтл в TMDB
            var same_show = kind === 'prequel' || kind.indexOf('season') === 0;

            if (tmdb && same_show && related[i].anime_type !== 'movie') return tmdb;
        }

        return 0;
    }

    function resolveAnime(list, done) {
        var missing = list.filter(function (item) { return !item.tmdb && item.simkl; });
        var waiting = missing.length;

        if (!waiting) return done(list);

        // Сопоставление не меняется, поэтому помним его навсегда. Ненайденное
        // не запоминаем: Simkl может проставить связь позже.
        function finish() {
            if (--waiting) return;

            try {
                Lampa.Storage.set(ANIME_TMDB_KEY, anime_tmdb);
            } catch (e) {
                console.error('Simkl: не удалось записать сопоставления аниме', e);
            }

            done(list);
        }

        missing.forEach(function (item) {
            if (anime_tmdb[item.simkl]) {
                item.tmdb = anime_tmdb[item.simkl];
                return finish();
            }

            api({
                path: '/anime/' + encodeURIComponent(item.simkl) + '?extended=full',
                auth: true,
                onDone: function (data) {
                    var tmdb = parentTmdb(data);

                    if (tmdb) {
                        anime_tmdb[item.simkl] = tmdb;
                        item.tmdb = tmdb;
                    }

                    finish();
                },
                onFail: finish
            });
        });
    }

    // Аниме у Simkl — отдельная корзина, не часть сериалов: /sync/all-items/shows
    // его не отдаёт вовсе. Поэтому любой раздел про сериалы собирает обе.
    // Корзины приходят каждая под своим ключом — shows, movies или anime, —
    // и тип записи берётся из пути, по которому её забрали.
    function fetchBuckets(paths, done, fail) {
        var rows = [];
        var waiting = paths.length;
        var failed_once = false;

        paths.forEach(function (path, index) {
            var type = path.split(/[/?]/)[0];

            api({
                path: '/sync/all-items/' + path,
                auth: true,
                onDone: function (data) {
                    rows[index] = ((data && data[type]) || []).filter(function (item) {
                        return item && (item.show || item.movie);
                    }).map(function (item) {
                        return { type: type, item: item };
                    });

                    if (--waiting === 0 && !failed_once) done([].concat.apply([], rows));
                },
                onFail: function () {
                    if (failed_once) return;
                    failed_once = true;
                    fail();
                }
            });
        });
    }

    function rowMedia(row) {
        return row.item.show || row.item.movie;
    }

    // Аниме-фильм в TMDB — фильм, всё остальное аниме — сериал
    function rowMethod(row) {
        if (row.type === 'movies') return 'movie';
        if (row.type === 'anime' && animeMovie(row.item.anime_type, rowMedia(row).ids)) return 'movie';
        return 'tv';
    }

    // Аниме, которое в TMDB — фильм. У аниме-фильмов и OVA Simkl кладёт
    // tmdb-id не в tmdb, а в tmdbm — id фильма TMDB. У «Final Fantasy VII:
    // Advent Children» тип ova, tmdb нет, а tmdbm — 647, и без этого поля
    // плагин считал его сериалом без tmdb-id и не находил в списках.
    function animeMovie(type, ids) {
        return type === 'movie' || !!(ids && ids.tmdbm && !ids.tmdb);
    }

    // tmdb-id записи Simkl: у сериала — tmdb, у фильма — tmdb или tmdbm
    function simklTmdb(ids, method) {
        if (!ids) return 0;
        return Number(ids.tmdb) || (method === 'movie' ? Number(ids.tmdbm) || 0 : 0);
    }

    function rowEntry(row, label) {
        return entry(rowMethod(row), rowMedia(row).ids, label, row.type === 'anime');
    }

    function byDateDesc(field) {
        return function (a, b) {
            return (Date.parse(b.item[field]) || 0) - (Date.parse(a.item[field]) || 0);
        };
    }

    // Где остановился — самая дальняя отмеченная серия. Готовое поле
    // last_watched для этого не годится: это серия, отмеченная последней по
    // времени, и после отметки задним числом оно показывает не туда —
    // «Вальхалла» с двумя досмотренными сезонами числилась на S01E08. С
    // extended=full в seasons приходят именно отмеченные серии.
    //
    // У аниме сезон не пишем: каждое продолжение у Simkl — отдельная запись со
    // своей нумерацией с первого сезона, и «S01E05» у второй части вводило бы
    // в заблуждение. Остаётся номер серии внутри части.
    function furthestWatched(item, anime) {
        var best = null;

        (item.seasons || []).forEach(function (season) {
            // Сезон 0 — спецвыпуски, по ним «где остановился» не считают
            if (!season.number) return;

            (season.episodes || []).forEach(function (episode) {
                var further = !best || season.number > best.season ||
                    (season.number === best.season && episode.number > best.episode);

                if (further) best = { season: season.number, episode: episode.number };
            });
        });

        if (!best) return anime ? '' : item.last_watched;

        return episodeCode(anime ? { episode: best.episode } : best);
    }

    // Всё, что в «Смотрю» и где остались вышедшие непросмотренные серии — в том
    // числе ещё не начатое: в «Смотрю» оно стоит не просто так.
    function loadUnfinished(done, fail) {
        var paths = [
            'shows/watching?extended=full',
            'anime/watching?extended=full'
        ];

        fetchBuckets(paths, function (rows) {
            rows = rows.filter(function (row) {
                var item = row.item;

                row.watched = item.watched_episodes_count || 0;
                row.aired = (item.total_episodes_count || 0) - (item.not_aired_episodes_count || 0);

                return row.watched < row.aired;
            });

            // Не начатое без даты просмотра уходит в конец само
            rows.sort(byDateDesc('last_watched_at'));

            // «S02E08 · 10 из 16 · 26.07.26»: где остановился, сколько из
            // вышедшего посмотрено и когда вышла последняя серия. Дата есть
            // только в карточке TMDB, поэтому подпись собирается, когда та приехала.
            done(rows.map(function (row) {
                var last = furthestWatched(row.item, row.type === 'anime');
                var progress = row.watched + ' из ' + row.aired;

                if (row.type !== 'anime') {
                    return rowEntry(row, function (card) {
                        return [last, progress, airDate(card.last_air_date)].filter(Boolean).join(' · ');
                    });
                }

                // Запись аниме в корзине — это одна часть, а карточка TMDB —
                // сериал целиком. Если он собран из нескольких частей, подпись
                // берём у всего сериала, как на карточке: иначе у «Slay the
                // Gods» здесь стояло бы «0 из 15» второй части, а там «15 из 30».
                return rowEntry(row, function (card, done) {
                    var date = airDate(card.last_air_date);

                    fetchStatus('tv', card.id, function (status) {
                        if (status && status.merged) {
                            var whole = status.episodes_watched + ' из ' + status.episodes_aired;
                            return done([status.last_code, whole, date].filter(Boolean).join(' · '));
                        }

                        done([last, progress, date].filter(Boolean).join(' · '));
                    });
                });
            }));
        }, fail);
    }

    // Вся библиотека — три запроса, по одному на фильмы, сериалы и аниме, со
    // всеми статусами сразу. Из неё собираются ряды панели, исключения в
    // рекомендациях и выгрузка «Избранного». Держим столько же, сколько
    // собранные разделы, и сбрасываем вместе с ними.
    var library_cache = null;

    function loadLibrary(done, fail) {
        if (library_cache && Date.now() - library_cache.at < ENTRIES_TTL) return done(library_cache.rows);

        fetchBuckets(['movies', 'shows', 'anime'], function (rows) {
            library_cache = { at: Date.now(), rows: rows };
            done(rows);
        }, fail);
    }

    // Что уже есть в любом списке, по tmdb-id и simkl-id
    function libraryKeys(rows, statuses) {
        var keys = {};

        rows.forEach(function (row) {
            if (statuses && statuses.indexOf(row.item.status) === -1) return;

            var ids = rowMedia(row).ids || {};

            if (ids.simkl) keys['simkl:' + ids.simkl] = true;
            var tmdb = simklTmdb(ids, rowMethod(row));
            if (tmdb) keys[rowMethod(row) + ':' + tmdb] = true;
        });

        return keys;
    }

    // Один список Simkl одного типа: «Сериалы · Смотрю», «Фильмы · Брошено».
    // Отложенное и брошенное — по последнему просмотру, «Буду смотреть» — по
    // дате добавления, свежее сверху.
    function loadLibraryRow(type, status, done, fail) {
        loadLibrary(function (rows) {
            var list = rows.filter(function (row) {
                return row.type === type && row.item.status === status;
            });

            list.sort(byDateDesc(status === 'plantowatch' ? 'added_to_watchlist_at' : 'last_watched_at'));

            var entries = list.map(function (row) { return rowEntry(row); });
            withoutHigher(type, status, entries, done, fail);
        }, fail);
    }

    // Расхождения «Избранного» с Simkl: карточка в категории, которая уходит
    // в Simkl, а там лежит в другом списке или её нет вовсе. Подпись — откуда
    // и куда: «Позже → в Simkl: Просмотрено». Причины бывают такие: статус
    // поменяли на simkl.com, а выгрузка «Избранного» уже лежащее не трогает;
    // просмотренный фильм «Позже» и «Закладки» в «Буду смотреть» не переносят;
    // тайтла нет в Simkl (уйдёт со следующей выгрузкой) или карточка не из
    // TMDB. Сверка односторонняя: что есть в Simkl, но нет в «Избранном», —
    // не расхождение, синхронизация идёт из Lampa.
    var LIST_RANK = { watching: 0, hold: 1, plantowatch: 2, completed: 3, dropped: 4 };

    var FAVORITE_TITLES = {
        viewed: 'Просмотрено',
        thrown: 'Брошено',
        look: 'Смотрю',
        wath: 'Позже',
        book: 'Закладки'
    };

    function loadMismatches(done, fail) {
        var all = {};

        try {
            all = Lampa.Favorite.all() || {};
        } catch (e) {
            console.error('Simkl: не удалось прочитать «Избранное»', e);
        }

        // Карточка бывает в нескольких категориях — сверяем самую сильную,
        // как и выгрузка
        var seen = {};
        var cards = [];

        EXPORT_ORDER.forEach(function (category) {
            (all[category] || []).forEach(function (card) {
                if (!card || !Number(card.id)) return;

                var key = Core.cardMethod(card) + ':' + Number(card.id);
                if (seen[key]) return;

                seen[key] = true;
                cards.push({ card: card, category: category });
            });
        });

        if (!cards.length) return done([]);

        loadLibrary(function (rows) {
            var entries = rows.map(function (row) {
                var item = rowEntry(row);
                if (item) item.status = row.item.status;
                return item;
            }).filter(Boolean);

            normalize(entries, function (resolved) {
                // У аниме из частей статус сериала — самый «живой» из частей
                var status = {};

                resolved.forEach(function (item) {
                    if (!item.tmdb) return;

                    var key = item.method + ':' + item.tmdb;
                    if (!(key in status) || LIST_RANK[item.status] < LIST_RANK[status[key]]) status[key] = item.status;
                });

                done(cards.map(function (entry) {
                    var card = entry.card;
                    var method = Core.cardMethod(card);
                    var want = FAVORITE_MAP[entry.category];
                    var found = status[method + ':' + Number(card.id)];
                    var foreign = card.source && card.source !== 'tmdb' && card.source !== 'cub';

                    if (found === want) return null;
                    // Фильм в «Смотрю» Simkl сам переводит в «Просмотрено»
                    if (method === 'movie' && want === 'watching' && found === 'completed') return null;

                    var where = foreign ? 'не из TMDB' : (found ? 'в Simkl: ' + LISTS[found] : 'нет в Simkl');

                    return {
                        method: method,
                        tmdb: Number(card.id),
                        card: card,
                        label: FAVORITE_TITLES[entry.category] + ' → ' + where
                    };
                }).filter(Boolean));
            });
        }, fail);
    }

    // Аниме у Simkl — несколько тайтлов, а карточка TMDB одна, и части бывают в
    // разных списках: продолжение «Человека-бензопилы» в «Смотрю», а другая
    // часть — в «Буду смотреть». Карточка показывается в одном ряду — самом
    // «живом» из тех, где лежат её части (LIST_RANK). Отсюда же: досмотренный
    // первый сезон «Дорохедоро» при втором в «Смотрю» — не в «Просмотрено»,
    // это сериал, который смотрят. Сравниваем по карточке TMDB, когда части
    // уже сведены к сериалу целиком (normalize).
    function withoutHigher(type, status, entries, done, fail) {
        var higher = Object.keys(LIST_RANK).filter(function (other) {
            return LIST_RANK[other] < LIST_RANK[status];
        });

        if (!higher.length) return done(entries);

        var busy = {};
        var waiting = higher.length;

        higher.forEach(function (other) {
            loadEntries('library:' + type + ':' + other, function (list) {
                list.forEach(function (item) { busy[item.method + ':' + item.tmdb] = true; });
                next();
            }, next);
        });

        function next() {
            if (--waiting) return;

            normalize(entries.filter(Boolean), function (resolved) {
                done(resolved.filter(function (item) {
                    return !busy[item.method + ':' + item.tmdb];
                }));
            });
        }
    }

    // --- Рекомендации --------------------------------------------------------

    // Рекомендации к тайтлу меняются медленно, а сериалов в истории бывают
    // сотни — поэтому ответ на каждый хранится неделю.
    var RECS_TTL = 7 * 24 * 60 * 60 * 1000;

    // Сколько просмотренных сериалов берём в расчёт — каждый источник это
    // запрос. Берём случайные, а не последние: иначе рекомендации всегда
    // крутились бы вокруг одних и тех же свежих сериалов.
    var RECS_SOURCES = 40;

    // Simkl разрешает параллельные запросы к деталям, но сорок разом ни к
    // чему — хватит четырёх.
    var SIMKL_WORKERS = 4;

    var recs = {};

    function loadRecs() {
        try {
            var saved = Lampa.Storage.get(RECS_KEY, '{}') || {};

            Object.keys(saved).forEach(function (key) {
                if (saved[key] && Date.now() - saved[key].at < RECS_TTL) recs[key] = saved[key];
            });
        } catch (e) {
            console.error('Simkl: не удалось прочитать кэш рекомендаций', e);
        }
    }

    function persistRecs() {
        try {
            Lampa.Storage.set(RECS_KEY, recs);
        } catch (e) {
            console.error('Simkl: не удалось записать кэш рекомендаций', e);
        }
    }

    // Оценка человека делает источник весомее или легче: то, что он оценил
    // на 9, говорит о вкусе больше, чем проходное на 5. Оценённое ниже 5 в
    // источники не попадает вовсе (см. recSources) — советовать похожее на
    // то, что не понравилось, незачем.
    function ratingWeight(rating) {
        if (!rating) return 1;
        if (rating >= 8) return 1.3;
        if (rating <= 5) return 0.6;
        return 1;
    }

    // Источники — сериалы и аниме, которые реально смотрели: досмотренные и
    // начатые в «Смотрю». Брошенное и «Буду смотреть» о вкусе
    // не говорят. Вся библиотека при этом нужна целиком — рекомендовать то,
    // что уже в любом списке, включая брошенное, незачем.
    // Тасовка Фишера — Йетса: каждый порядок равновероятен, в отличие от
    // sort со случайным компаратором
    function shuffled(items) {
        var copy = items.slice();

        for (var i = copy.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var swap = copy[i];

            copy[i] = copy[j];
            copy[j] = swap;
        }

        return copy;
    }

    function recSources(done, fail) {
        loadLibrary(function (rows) {
            var library = libraryKeys(rows);
            var sources = [];

            rows.forEach(function (row) {
                if (row.type === 'movies') return;

                var ids = rowMedia(row).ids || {};
                var method = rowMethod(row);
                var status = row.item.status;

                var started = status === 'watching' && row.item.last_watched_at;
                if (method !== 'tv' || !(status === 'completed' || started)) return;
                if (row.item.user_rating && row.item.user_rating < 5) return;

                sources.push({
                    method: 'tv',
                    tmdb: Number(ids.tmdb) || 0,
                    simkl: ids.simkl,
                    anime: row.type === 'anime',
                    weight: ratingWeight(row.item.user_rating),
                    at: Date.parse(row.item.last_watched_at) || 0
                });
            });

            // Продолжения аниме без своего tmdb-id сводятся к сериалу целиком
            resolveAnime(sources, function (resolved) {
                var seen = {};

                sources = shuffled(resolved.filter(function (source) {
                    if (!source.tmdb || seen[source.tmdb]) return false;

                    seen[source.tmdb] = true;
                    library['tv:' + source.tmdb] = true;
                    return true;
                })).slice(0, RECS_SOURCES);

                done(sources, library);
            });
        }, fail);
    }

    // Рекомендации TMDB к сериалу сразу приходят готовыми карточками — с
    // русским названием и постером, так что отдельный запрос за карточкой
    // не нужен.
    function tmdbRecs(source, done) {
        var key = 'tmdb:' + Lampa.Storage.get('language', 'ru') + ':' + source.tmdb;
        if (recs[key]) return done(recs[key].list);

        tmdbGet('tv/' + source.tmdb + '/recommendations', function (data) {
            if (!data || !Array.isArray(data.results)) return done([]);

            var list = data.results.filter(function (item) {
                return item && item.id;
            }).map(function (item) {
                return { method: 'tv', tmdb: item.id, card: trim(item, 'tv') };
            });

            recs[key] = { at: Date.now(), list: list };
            done(list);
        });
    }

    // У Simkl рекомендации лежат прямо в деталях тайтла, users_recommendations.
    // Это публичный эндпоинт, токен не нужен — и так ответ берётся из кэша
    // Cloudflare. tmdb-id в рекомендациях обычно есть, у продолжений аниме —
    // нет, их потом сводит resolveAnime.
    function simklRecs(source, done) {
        var key = 'simkl:' + source.simkl;
        if (recs[key]) return done(recs[key].list);

        api({
            path: '/' + (source.anime ? 'anime' : 'tv') + '/' + encodeURIComponent(source.simkl),
            onDone: function (data) {
                var list = simklRecItems(data);

                recs[key] = { at: Date.now(), list: list };
                done(list);
            },
            onFail: function () { done([]); }
        });
    }

    function simklRecItems(data) {
        return ((data && data.users_recommendations) || []).map(function (item) {
            var movie = item.type === 'movie' || animeMovie(item.anime_type, item.ids);

            return {
                method: movie ? 'movie' : 'tv',
                tmdb: simklTmdb(item.ids, movie ? 'movie' : 'tv'),
                simkl: item.ids && item.ids.simkl
            };
        }).filter(function (item) {
            return item.tmdb || item.simkl;
        });
    }

    // --- Похожее на один тайтл ----------------------------------------------

    // Пункт «Похожее» в меню кнопки: рекомендации TMDB и Simkl к этому
    // фильму или сериалу вперемешку, через одну. Под постером — откуда
    // совет. Просмотренное и брошенное не предлагаем, «Смотрю» и «Буду
    // смотреть» оставляем: это как раз то, что человек и сам собирался.
    function loadSimilar(method, tmdb, done, fail) {
        var from_tmdb = null;
        var from_simkl = null;

        function finish() {
            if (!from_tmdb || !from_simkl) return;

            resolveAnime(from_simkl, function () {
                loadLibrary(function (rows) {
                    var seen_before = libraryKeys(rows, ['completed', 'dropped']);
                    var merged = {};
                    var list = [];

                    function add(item, source) {
                        if (!item.tmdb) return;

                        var key = item.method + ':' + item.tmdb;
                        if (key === method + ':' + tmdb || seen_before[key]) return;
                        if (item.simkl && seen_before['simkl:' + item.simkl]) return;

                        if (merged[key]) {
                            if (merged[key].from.indexOf(source) === -1) merged[key].from.push(source);
                            if (!merged[key].card && item.card) merged[key].card = item.card;
                            return;
                        }

                        merged[key] = { method: item.method, tmdb: item.tmdb, card: item.card, from: [source] };
                        list.push(merged[key]);
                    }

                    for (var i = 0; i < Math.max(from_tmdb.length, from_simkl.length); i++) {
                        if (from_tmdb[i]) add(from_tmdb[i], 'TMDB');
                        if (from_simkl[i]) add(from_simkl[i], 'Simkl');
                    }

                    done(list.map(function (item) {
                        return { method: item.method, tmdb: item.tmdb, card: item.card, label: item.from.join(' · ') };
                    }));
                }, fail);
            });
        }

        tmdbGet(method + '/' + tmdb + '/recommendations', function (data) {
            from_tmdb = ((data && data.results) || []).filter(function (item) {
                return item && item.id;
            }).map(function (item) {
                return { method: method, tmdb: item.id, card: trim(item, method) };
            });

            finish();
        });

        // Simkl-id по tmdb-id: у сериала он бывает и аниме — тогда детали в
        // /anime, а не в /tv
        api({
            path: '/search/id?tmdb=' + encodeURIComponent(tmdb) + '&type=' + (method === 'tv' ? 'show' : 'movie'),
            auth: true,
            onDone: function (data) {
                var hit = Array.isArray(data) ? data[0] : null;
                var simkl = hit && hit.ids && hit.ids.simkl;

                if (!simkl) {
                    from_simkl = [];
                    return finish();
                }

                var kind = hit.type === 'anime' ? 'anime' : (hit.type === 'movie' ? 'movies' : 'tv');

                api({
                    path: '/' + kind + '/' + encodeURIComponent(simkl),
                    onDone: function (details) {
                        from_simkl = simklRecItems(details);
                        finish();
                    },
                    onFail: function () {
                        from_simkl = [];
                        finish();
                    }
                });
            },
            onFail: function () {
                from_simkl = [];
                finish();
            }
        });
    }

    function openSimilar(ctx) {
        openSection('similar:' + ctx.method + ':' + ctx.card.id, 'Похожее на «' + Core.cardTitle(ctx.card) + '»');
    }

    // Не больше workers заданий разом, done — когда отработали все
    function pool(items, workers, task, done) {
        var index = 0;
        var active = 0;

        function next() {
            if (index >= items.length && !active) return done();

            while (active < workers && index < items.length) {
                active++;

                task(items[index++], function () {
                    active--;
                    next();
                });
            }
        }

        next();
    }

    // Подпись: на какой из просмотренных сериалов больше всего похоже —
    // «как «Во все тяжкие» +2». Название источника берём из TMDB, у
    // Simkl оно только английское.
    function recLabel(from) {
        return function (card, done) {
            tmdbCard('tv', from[0], function (source) {
                if (!source) return done('');

                var name = '«' + (source.name || source.title || source.original_name) + '»';
                var more = from.length - 1;

                done('как ' + name + (more ? ' +' + more : ''));
            });
        };
    }

    // Сводный рейтинг: каждая рекомендация добавляет баллы, тем больше, чем
    // выше она в списке у источника и чем выше человек оценил сам источник.
    // Сериал, который советуют к нескольким просмотренным, поднимается наверх.
    function loadRecommended(provider, done, fail) {
        recSources(function (sources, library) {
            if (!sources.length) return done([]);

            var fetch = provider === 'simkl' ? simklRecs : tmdbRecs;
            var scores = {};
            var order = [];

            function add(item, source, points) {
                var key = item.tmdb ? item.method + ':' + item.tmdb : 'simkl:' + item.simkl;
                var entry_score = scores[key];

                if (!entry_score) {
                    entry_score = scores[key] = { item: item, score: 0, from: [] };
                    order.push(key);
                }

                entry_score.score += points;
                entry_score.from.push({ tmdb: source.tmdb, points: points });
            }

            var workers = provider === 'simkl' ? SIMKL_WORKERS : sources.length;

            pool(sources, workers, function (source, next) {
                fetch(source, function (list) {
                    // Баллы быстро падают с местом в списке: иначе первый
                    // десяток занимал бы один любимый сериал, а не лучшее
                    // от каждого по очереди
                    list.forEach(function (item, index) {
                        add(item, source, source.weight / (1 + index * 0.3));
                    });
                    next();
                });
            }, function () {
                persistRecs();

                var items = order.map(function (key) { return scores[key]; });

                resolveAnime(items.map(function (row) { return row.item; }), function () {
                    // После сведения аниме к сериалу одна карточка может
                    // прийти под двумя ключами — баллы складываем
                    var merged = {};
                    var list = [];

                    items.forEach(function (row) {
                        var item = row.item;
                        if (!item.tmdb) return;
                        if (library[item.method + ':' + item.tmdb]) return;
                        if (item.simkl && library['simkl:' + item.simkl]) return;

                        var key = item.method + ':' + item.tmdb;

                        if (merged[key]) {
                            merged[key].score += row.score;
                            merged[key].from = merged[key].from.concat(row.from);
                            return;
                        }

                        merged[key] = row;
                        list.push(row);
                    });

                    list.sort(function (a, b) { return b.score - a.score; });

                    done(list.map(function (row) {
                        // Источники по вкладу, каждый один раз
                        var from = [];

                        row.from.sort(function (a, b) { return b.points - a.points; }).forEach(function (part) {
                            if (from.indexOf(part.tmdb) === -1) from.push(part.tmdb);
                        });

                        return {
                            method: row.item.method,
                            tmdb: row.item.tmdb,
                            card: row.item.card,
                            label: recLabel(from)
                        };
                    }));
                });
            });
        }, fail);
    }

    // Часть аниме — к сериалу целиком: по известному составу частей, а
    // продолжение без tmdb-id — через resolveAnime
    function normalize(list, done) {
        list.forEach(function (item) {
            var base = item.method === 'tv' && item.simkl && partsBase(item.simkl);
            if (base) item.tmdb = base;
        });

        resolveAnime(list, done);
    }

    function loadEntries(url, done, fail) {
        var hit = entries_cache[url];
        if (hit && Date.now() - hit.at < ENTRIES_TTL) return done(hit.entries);

        function store(list) {
            normalize(list.filter(Boolean), function (resolved) {
                // Два сезона одного аниме сводятся к одной карточке TMDB —
                // показываем её один раз, по первой, то есть свежей, записи
                var seen = {};
                var clean = resolved.filter(function (item) {
                    var key = item.method + ':' + item.tmdb;
                    if (!item.tmdb || seen[key]) return false;

                    seen[key] = true;
                    return true;
                });

                entries_cache[url] = { at: Date.now(), entries: clean };
                done(clean);
            });
        }

        var parts = String(url).split(':');

        if (url === 'unfinished') return loadUnfinished(store, fail);
        if (url === 'mismatch') return loadMismatches(store, fail);
        if (parts[0] === 'library') return loadLibraryRow(parts[1], parts[2], store, fail);
        if (parts[0] === 'similar') return loadSimilar(parts[1], Number(parts[2]), store, fail);
        if (url === 'recs_tmdb') return loadRecommended('tmdb', store, fail);
        if (url === 'recs_simkl') return loadRecommended('simkl', store, fail);

        fail();
    }

    // Подпись под постером — единственное, чего нет у родной карточки: там
    // стоит год, и пересчитывает его она сама, так что подсунуть текст через
    // данные нельзя. Держим подписи отдельно, по разделам, и проставляем после
    // отрисовки, находя карточку по её же card_data.
    var labels = {};

    // Данные приезжают уже после того, как активность отрисовалась, поэтому
    // одного события мало: проставляем и по нему, и сразу после отдачи
    // результатов, дав Lampa тик на отрисовку карточек.
    function scheduleLabels() {
        setTimeout(applyLabels, 0);
        setTimeout(applyLabels, 500);
    }

    function applyLabels() {
        var active = Lampa.Activity.active();
        if (!active || active.source !== SOURCE || !active.activity) return;

        var root = active.activity.render();
        watchCards(root);

        if (active.component !== 'main') return labelCards(root, labels[active.url]);

        // На панели подписи у каждого ряда свои: карточка бывает в двух рядах
        // сразу, и у «Ирмы Веп» в «Не совпадает с Simkl» должно стоять, что
        // не совпало, а не «где остановился» из «Продолжить просмотр». Ряд
        // узнаём по заголовку — Lampa рисует его из title, который мы отдали.
        root.find('.items-line').each(function () {
            var url = panel_titles[$(this).find('.items-line__title').text()];
            if (url) labelCards($(this), rowLabels(url));
        });
    }

    // У рядов списков Simkl своих подписей нет — у начатого берём «где
    // остановился» из «Продолжить просмотр»
    function rowLabels(url) {
        var own = labels[url];
        if (String(url).indexOf('library:') !== 0) return own;

        return Object.assign({}, labels.unfinished || {}, own || {});
    }

    function labelCards(root, section) {
        if (!section) return;

        root.find('.card').each(function () {
            var data = this.card_data;
            var label = data && section[data.id];
            var age = $(this).find('.card__age');

            if (label && age.text() !== label) {
                $(this).addClass('simkl-card');
                age.text(label);
            }
        });
    }

    // Ряды панели дорисовывают карточки, когда до них докручивают, и
    // подгружают новые ряды снизу — следим за разметкой, а не ловим события
    function watchCards(root) {
        var node = root && root[0];
        if (!node || node.simkl_watched || typeof MutationObserver === 'undefined') return;

        var timer = null;

        node.simkl_watched = true;
        new MutationObserver(function () {
            if (timer) return;

            timer = setTimeout(function () {
                timer = null;
                applyLabels();
            }, 100);
        }).observe(node, { childList: true, subtree: true });
    }

    // Источник для родного category_full. Всё, что ему нужно, — метод list;
    // остальное наследуем от tmdb, чтобы карточка, открытая из грида, ходила
    // за деталями и сезонами ровно туда же, куда и всегда. Раздел приходит в
    // url активности, страница — в page: следующие страницы грид запрашивает
    // сам, когда до них докручивают.
    function buildSource() {
        return Object.assign({}, Lampa.Api.sources.tmdb, {
            // Панель — родной экран main: ряды он берёт отсюда частями, по
            // мере прокрутки, а «Ещё» у ряда открывает category_full с его url
            main: function (params, oncomplite, onerror) {
                if (!configured() || !token()) {
                    onerror();
                    return null;
                }

                var parts = panelParts();

                function load(loaded, empty) {
                    Lampa.Api.partNext(parts, 4, loaded, empty);
                }

                load(oncomplite, onerror);
                return load;
            },

            list: function (params, oncomplite, onerror) {
                if (!configured() || !token()) return onerror();

                var url = params.url;
                var page = Number(params.page) || 1;

                loadEntries(url, function (entries) {
                    var slice = entries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
                    if (!slice.length) return onerror();

                    collect(url, slice, function (results) {
                        oncomplite({
                            results: results,
                            page: page,
                            total_pages: Math.ceil(entries.length / PAGE_SIZE)
                        });
                        scheduleLabels();
                    }, onerror);
                }, onerror);
            }
        });
    }

    // Родному гриду нужны карточки TMDB, а Simkl отдаёт только свои id и
    // английские названия. Собираем карточки по id — очередью, чтобы не
    // выстрелить двадцатью запросами разом.
    function collect(url, slice, done, fail) {
        var results = [];
        var waiting = slice.length;
        var section = labels[url] || (labels[url] = {});

        function next() {
            if (--waiting) return;

            var ready_list = results.filter(Boolean);
            if (ready_list.length) done(ready_list);
            else fail();
        }

        slice.forEach(function (item, index) {
            // Рекомендации TMDB приходят уже с карточкой
            var get = item.card
                ? function (method, id, callback) { callback(item.card); }
                : tmdbCard;

            get(item.method, item.tmdb, function (card) {
                if (!card) return next();

                // Порядок важен — он и есть сортировка, — поэтому кладём по
                // индексу, а не по мере возвращения ответов.
                results[index] = card;

                resolveLabel(item, card, function (label) {
                    if (label) section[card.id] = label;
                    next();
                });
            });
        });
    }

    // Подпись бывает готовой строкой, функцией от карточки или функцией,
    // которой нужен ещё запрос, — тогда она отвечает через callback
    function resolveLabel(item, card, done) {
        if (typeof item.label !== 'function') return done(item.label);
        if (item.label.length > 1) return item.label(card, done);

        done(item.label(card));
    }

    function openSection(url, title) {
        Lampa.Activity.push({ component: 'category_full', source: SOURCE, url: url, title: title, page: 1 });
    }

    // Ряд панели: первые двадцать карточек раздела. Пустой ряд Lampa не
    // рисует сама — достаточно ответить ничем.
    // Ряд панели: первые двадцать карточек раздела, в заголовке — сколько
    // в нём всего. «Ещё» Lampa рисует только при total_pages > 1, а он нужен
    // у каждого ряда — открыть раздел гридом, — поэтому страниц у ряда не
    // меньше двух. Грид считает страницы сам, по настоящему числу записей.
    // Пустой ряд Lampa не рисует — достаточно ответить ничем.
    // Заголовок ряда → его раздел: по нему applyLabels узнаёт ряд
    var panel_titles = {};

    function panelRow(url, title) {
        return function (call) {
            loadEntries(url, function (entries) {
                var slice = entries.slice(0, PAGE_SIZE);
                if (!slice.length) return call();

                collect(url, slice, function (results) {
                    var full = title + ' (' + entries.length + ')';
                    panel_titles[full] = url;

                    call({
                        title: full,
                        results: results,
                        url: url,
                        source: SOURCE,
                        page: 1,
                        total_pages: Math.max(2, Math.ceil(entries.length / PAGE_SIZE))
                    });
                    scheduleLabels();
                }, function () { call(); });
            }, function () { call(); });
        };
    }

    // Просмотренное и брошенное — плитками-папками, как категории в родном
    // «Избранном»: три постера и число. Это родной модуль карточки Folder,
    // маску ему даёт Lampa.Maker. Подпись папка берёт из перевода
    // menu_<media>, поэтому media у плитки своё, и перевод регистрируем сами.
    function panelFolders(call) {
        var folders = [];

        LIBRARY_TYPES.forEach(function (group) {
            ARCHIVE_STATUSES.forEach(function (status) {
                folders.push({
                    url: 'library:' + group.type + ':' + status,
                    media: 'simkl_' + group.type + '_' + status,
                    title: group.title + ' · ' + LISTS[status]
                });
            });
        });

        var translations = {};
        folders.forEach(function (folder) {
            translations['menu_' + folder.media] = { ru: folder.title, en: folder.title, uk: folder.title, be: folder.title };
        });
        Lampa.Lang.add(translations);

        var module = Lampa.Maker.module('Card').only('Folder', 'Callback');
        var tiles = [];
        var waiting = folders.length;

        function finish() {
            if (--waiting) return;

            tiles = tiles.filter(Boolean);
            if (!tiles.length) return call();

            call({ title: 'Просмотрено и брошено', results: tiles, total_pages: 1 });
        }

        folders.forEach(function (folder, index) {
            loadEntries(folder.url, function (entries) {
                if (!entries.length) return finish();

                // Постеры для плитки — первые три карточки, дальше пустышки:
                // число на папке — это длина results
                collect(folder.url, entries.slice(0, 3), function (cards) {
                    var results = cards.slice();
                    while (results.length < entries.length) results.push({});

                    tiles[index] = {
                        results: results,
                        media: folder.media,
                        simkl_folder: { url: folder.url, title: folder.title },
                        params: { module: module }
                    };
                    finish();
                }, finish);
            }, finish);
        });
    }

    // Клик по любой карточке на экране main открывает full — плитке
    // папки его не переопределить. Поэтому такой переход подменяем на грид
    // её раздела.
    function followFolders() {
        var push = Lampa.Activity.push;

        Lampa.Activity.push = function (params) {
            var folder = params && params.component === 'full' && params.card && params.card.simkl_folder;
            if (folder) return openSection(folder.url, folder.title);

            return push.apply(this, arguments);
        };
    }

    function panelParts() {
        var parts = [panelRow('unfinished', 'Продолжить просмотр')];

        LIBRARY_TYPES.forEach(function (group) {
            ACTIVE_STATUSES[group.type].forEach(function (status) {
                parts.push(panelRow('library:' + group.type + ':' + status, group.title + ' · ' + LISTS[status]));
            });
        });

        parts.push(panelRow('mismatch', 'Не совпадает с Simkl'));

        PANEL_RECS.forEach(function (row) { parts.push(panelRow(row.url, row.title)); });

        // Просмотренное и брошенное — в самом низу, под рекомендациями
        parts.push(panelFolders);

        return parts;
    }

    function openPanel() {
        if (!configured()) return Lampa.Noty.show('Simkl: не задан client_id');

        // После подключения панель сама не открывается: она перехватила бы
        // фокус, пока человек ещё дожимает подтверждение на телефоне.
        if (!token()) return startPinAuth();

        Lampa.Activity.push({ component: 'main', source: SOURCE, url: '', title: 'Simkl', page: 1 });
    }

    function addMenuItem() {
        var list = document.querySelector('.menu .menu__list');
        if (!list || document.getElementById(MENU_ID)) return;

        var item = $(
            '<li class="menu__item selector" id="' + MENU_ID + '">' +
            '<div class="menu__ico">' + ICON + '</div>' +
            '<div class="menu__text">Simkl</div>' +
            '</li>'
        );

        // hover:enter покрывает и пульт, и мышь: вешать сюда ещё и click —
        // значит открыть экран дважды
        item.on('hover:enter', openPanel);

        $(list).append(item);
    }

    // --- Настройки -------------------------------------------------------

    // Строку состояния у кнопки приходится держать самим: Lampa рисует
    // значение только для параметров, которые сама же и хранит.
    var auth_field = null;

    function authLabel() {
        if (!configured()) return 'Не задан client_id';
        return token() ? 'Подключён' : 'Не подключён';
    }

    function updateAuthLabel() {
        if (auth_field) auth_field.find('.settings-param__value').text(authLabel());
    }

    function addSettings() {
        Lampa.SettingsApi.addComponent({ component: 'simkl', name: 'Simkl', icon: ICON });

        Lampa.SettingsApi.addParam({
            component: 'simkl',
            param: { name: 'simkl_auth', type: 'button' },
            field: {
                name: 'Аккаунт Simkl',
                description: 'Подключение по коду на simkl.com/pin'
            },
            onRender: function (item) {
                auth_field = item;
                setTimeout(updateAuthLabel, 0);
            },
            onChange: function () {
                if (!configured()) return Lampa.Noty.show('Simkl: не задан client_id');

                if (token()) {
                    forgetToken();
                    Lampa.Noty.show('Simkl: аккаунт отключён');
                    updateAuthLabel();
                } else {
                    startPinAuth(updateAuthLabel);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'simkl',
            param: { name: LINE_KEY, type: 'trigger', default: true },
            field: {
                name: 'Статус под постером',
                description: 'Строка со списком, прогрессом по сериям и датой'
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'simkl',
            param: { name: BUTTON_KEY, type: 'trigger', default: true },
            field: {
                name: 'Кнопка Simkl',
                description: 'Кнопка в ряду под постером: отметки о просмотре'
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'simkl',
            param: { name: 'simkl_export', type: 'button' },
            field: {
                name: 'Синхронизировать с Simkl',
                description: 'Выгрузить «Избранное», чего в Simkl ещё нет, и добавить в «Смотрю» ' +
                    'продолжения досмотренных аниме. Само — раз в сутки'
            },
            onChange: function () {
                exportFavorites(true, function () { syncSequels(true); });
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'simkl',
            param: { name: AUTOMARK_KEY, type: 'trigger', default: true },
            field: {
                name: 'Отмечать просмотренное',
                description: 'Во встроенном плеере — когда просмотрено больше 90%, ' +
                    'во внешнем — сразу при открытии'
            }
        });
    }

    function startPlugin() {
        loadCache();
        loadCards();
        loadAnimeTmdb();
        loadParts();
        loadRecs();
        addSettings();
        startAutomark();
        scheduleExport();
        followFolders();

        if (!configured()) {
            console.warn('Simkl: не задан CLIENT_ID, плагин ничего не покажет');
        }

        Lampa.Api.sources[SOURCE] = buildSource();

        // Подписи со следующей серией проставляем, когда грид уже отрисован.
        // А при возврате на уже открытую карточку перечитываем статус: full
        // при этом повторно не приходит, а статус мог измениться, пока были
        // на другом экране, — например, фильм отметился в конце просмотра,
        // запущенного из «Онлайн».
        Lampa.Listener.follow('activity', function (e) {
            if (e.type === 'complite') applyLabels();

            if (e.type === 'start' && e.component === 'full') {
                var ctx = Core.currentCard();
                if (ctx) refresh(ctx);
            }
        });

        // Lampa перерисовывает меню на старте и при смене профиля
        addMenuItem();
        setInterval(addMenuItem, 1000);

        Core.onFullCard(onCard);
        followFavorite();

        console.log('Simkl: plugin v' + manifest.version + ' ready');
    }

    Core.boot({
        flag: 'lampa_simkl_plugin',
        manifest: manifest,
        styles: { id: 'lampa-simkl-styles', css: STYLES },
        start: startPlugin
    });
})();
