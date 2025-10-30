// Этот файл содержит всё для взаимодействия с окружением

// В index.html - пример размещения приложения в контейнере на странице
// Приложение загружается в тег с id="root"
// класс game нужен для изолирования базовых стилей
// <div id="container" style="position: absolute;left:100px;top:100px;right: 100px; bottom: 100px;">
//   <div id="root" class="game" oninit="onAppReadyHandler"></div>
// </div>

// Функция инициализации приложения. Вызывается из обработчика в Index.html,
// см. <div id="root" class="game" oninit="onAppReadyHandler">
function onAppReadyHandler(app) {
    function updateLayout() {
        var container = document.getElementById('container');
        app.resize(container.clientWidth, container.clientHeight);
    }
    updateLayout();

    function initHandler() {
        updateLayout();
    }

    function resizeHandler() {
        updateLayout();
    }

    window.addEventListener('load', initHandler);
    window.addEventListener('resize', resizeHandler);

    function removeGame() {
        window.removeEventListener('load', initHandler);
        window.removeEventListener('resize', resizeHandler);

        document.removeEventListener('removeGame', removeGame);
    }

    document.addEventListener('removeGame', removeGame);

    // Настройки приложения
    var data = {
        // Это список настроек для обмена данными игр
        games: {
            // id - для передачи кода игры
            // request1 - запрос до старта
            // request2 - запрос после старта
            1: {
                id: 'VIBE',
                request1: { url: '/api/TentGame', method: 'POST' },
                request2: { url: '/api/TentGame', method: 'POST' },
            },
            2: {
                id: 'SPOTLIGHTS',
                request1: { url: '/api/TentGame', method: 'POST' },
                request2: { url: '/api/TentGame', method: 'POST' },
            },
            3: {
                id: 'MATCH',
                request1: { url: '/api/TentGame', method: 'POST' },
                request2: { url: '/api/TentGame', method: 'POST' },
            },
            4: {
                id: 'STAGE',
                request1: { url: '/api/TentGame', method: 'POST' },
                request2: { url: '/api/TentGame', method: 'POST' },
            },
            5: {
                id: 'FIVE',
                request1: { url: '/api/PlayVip', method: 'POST' },
                request2: { url: '/api/PlayVip', method: 'POST' },
            },
            // Это индекс игр для быстрой идентификации внутри приложения
            index: { VIBE: 1, SPOTLIGHTS: 2, MATCH: 3, STAGE: 4, FIVE: 5 },
        },
        // Обработчик закрытия попапа
        closeHandler: window.closeGamePopup,
        // Обработчик перехода к регистрации чека
        registerHandler: window.registerBill,
        switchToMobileWidth: 480,
    };

    // Передается номер текущей игры (внутри приложения игры идентифицируются по номерам)
    data.gameIndex = data.games.index[window.gameId];
    // Передаются данные текущей игры
    data.gameData = data.games[data.gameIndex];

    app.setData(data);
}
