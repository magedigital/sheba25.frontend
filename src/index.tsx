import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { getCookie, setCookie } from '@functions/cookies.ts';
import { enums } from '@global/enums.ts';

import changePage from './functions/changePage.ts';
import getStartUrl from './functions/getStartUrl.ts';
import resize from './functions/handlerSize.ts';

import { StoreT } from './global/types.ts';

import pages from './redux/pages.ts';
import { dispatcher, store } from './redux/redux.ts';
import Root from './views/root/Root.tsx';

const resultPages: StoreT['pages'] = {} as StoreT['pages'];

const path = getStartUrl(window.location.pathname.slice(1));

pages.forEach((page) => {
    resultPages[page.name] = {
        isShow: false,
    };
});

(async () => {
    const { storePages, levels, pagesIds } = await changePage({
        href: path,
        storePages: resultPages,
        start: true,
    });

    if (levels?.[0]) {
        (document.querySelector('body') as HTMLElement).classList.add(`_${levels[0]}`);
    }

    await dispatcher({ type: 'pages', data: storePages });
    await dispatcher({ type: 'levels', data: levels });
    await dispatcher({ type: 'pagesIds', data: pagesIds });
    await dispatcher({ type: 'rootInit', data: true });

    const utmItem = window.location.search
        .slice(1)
        .split('&')
        .find((item) => item.split('=')[0] === 'utm_source');
    const utmSource = utmItem ? utmItem.split('=')[1] : undefined;

    if (utmSource) {
        localStorage.setItem('utmSource', utmSource);
    }

    const invItem = window.location.search
        .slice(1)
        .split('&')
        .find((item) => item.split('=')[0] === 'inv');
    const inv = invItem ? invItem.split('=')[1] : undefined;

    if (inv) {
        localStorage.setItem('inv', inv);
    }
})();

document.addEventListener('scroll', () => {
    resize();
});

window.addEventListener('resize', () => {
    resize();
});

document.oncontextmenu = (e) => {
    e.preventDefault();
};

window.saveJWT = (JWT) => setCookie(enums.ACCESS_TOKEN, JWT);
window.getJWT = () => getCookie(enums.ACCESS_TOKEN);

resize(true);

const loads: {
    event?: boolean;
    fonts?: boolean;
} = {};

const checkLoad = () => {
    if (loads.event && loads.fonts) {
        setTimeout(() => {
            dispatcher({ type: 'windowIsLoad', data: true });
            dispatcher({ type: 'windowIsReady', data: true });

            resize(true);

            document.dispatchEvent(new CustomEvent('windowReady'));
        }, 10);
    }
};

document.fonts.ready.then(() => {
    setTimeout(() => {
        loads.fonts = true;

        dispatcher({ type: 'isLoadFonts', data: true });

        checkLoad();
    }, 10);
});

window.onload = () => {
    setTimeout(() => {
        dispatcher({ type: 'windowIsLoad', data: true });

        const style = document.querySelector('.initStyle');

        if (style) {
            style.remove();
        }

        loads.event = true;

        checkLoad();
    }, 10);
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <Root />
    </Provider>,
);
