(function () {
    'use strict';

    Lampa.Platform.tv();

    function start() {
        // Чтобы плагин не запускался дважды
        if (window.await_time2end) return;
        window.await_time2end = true;

        // Стиль для уведомлений
        var bellStyle = '<div id="bellStyle"><style>.bell__item--info {box-shadow: 0 0 0 0.2em #ffe216!important;}</style></div>';
        $('body').append(bellStyle);

        // Режим отображения (0, 1, 2)
        var mode = Lampa.Storage.get('time2endMode') || 0;

        // Показать уведомление о режиме
        function showModeName(m) {
            var text = '';
            if (m === 0) text = 'оригинальный вид';
            else if (m === 1) text = 'полное время / время окончания';
            else if (m === 2) text = 'оставшееся время';

            if (text) {
                Lampa.Bell.push({ text: text });
            }
        }

        // Перевод строки времени "HH:MM:SS" в секунды
        function timeToSeconds(str) {
            if (!str || str.indexOf(':') === -1) return 0;
            var parts = str.split(':');
            return (+parts[0] || 0) * 3600 + (+parts[1] || 0) * 60 + (+parts[2] || 0);
        }

        // Добавление ведущего нуля
        function pad(num) {
            return ((num < 10 ? '0' : '') + num).replace('NaN', '00');
        }

        // Форматирование Date в HH:MM:SS
        function formatTime(date) {
            return pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
        }

        // Форматирование секунд в HH:MM:SS
        function secondsToTime(sec) {
            if (sec < 0) sec = 0;
            var h = Math.floor(sec / 3600);
            var m = Math.floor(sec % 3600 / 60);
            var s = sec % 60;
            return pad(h) + ':' + pad(m) + ':' + pad(s);
        }

        // Добавление кнопки переключения режима
        function addButton() {
            $('.time2end').remove();

            var svg = `<svg viewBox="-0.64 -0.64 17.28 17.28" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-clock-history" stroke="currentColor" stroke-width="0.8">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"></path>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"></path>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"></path>
                </g>
            </svg>`;

            var btn = $('.player-panel__playlist').clone();
            btn.addClass('time2end');
            btn.find('svg').replaceWith(svg);
            btn.insertBefore($('.player-panel__quality'));

            btn.on('hover:enter', function () {
                mode++;
                if (mode > 2) mode = 0;
                showModeName(mode);
                Lampa.Storage.set('time2endMode', mode);
            });
        }

        // При старте плеера — очищаем старый элемент
        Lampa.Player.listener.follow('start', function () {
            $('.player-panel__timeend--finish').remove();
        });

        // При начале воспроизведения
        Lampa.PlayerVideo.listener.follow('play', function () {
            addButton();

            var timeNow = document.querySelector('.player-panel__timenow');
            var timeEnd = document.querySelector('.player-panel__timeend');

            if (!timeNow || !timeEnd) return;

            // Клонируем элемент окончания
            var finishEl = timeEnd.cloneNode(true);
            finishEl.className += ' player-panel__timeend--finish';
            timeEnd.style.display = 'none';
            timeEnd.parentNode.insertBefore(finishEl, timeEnd.nextSibling);

            // Обновление каждую секунду
            function update() {
                var nowStr = timeNow.textContent || timeNow.innerText;
                var endStr = timeEnd.textContent || timeEnd.innerText;

                var nowSec = timeToSeconds(nowStr);
                var endSec = timeToSeconds(endStr);
                var leftSec = endSec - nowSec;
                if (leftSec < 0) leftSec = 0;

                var endDate = new Date(Date.now() + leftSec * 1000);
                var result;

                if (endStr === '00:00:00') {
                    result = 'Ожидаем загрузки...';
                } else if (mode === 0) {
                    result = endStr;                           // оригинальный вид
                } else if (mode === 1) {
                    result = endStr + ' / ' + formatTime(endDate); // полное / время окончания
                } else if (mode === 2) {
                    result = 'до завершения ' + secondsToTime(leftSec); // оставшееся время
                }

                finishEl.textContent = result;
            }

            update();
            setInterval(update, 1000);
        });
    }

    // Запуск
    if (window.appready) {
        start();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }
})();