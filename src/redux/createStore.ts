import { Store, legacy_createStore as reduxCreateStore } from 'redux';

import { d, s, w } from '@functions/seo';
import { enums } from '@global/enums.ts';
import { StoreT } from '@global/types';

import pages from './pages.ts';

const updateData = (settings: SettingsT, state: StoreT) => {
    let newData;

    if (settings.data === null || settings.data === undefined) {
        newData = null;
    } else if (
        typeof settings.data === 'number' ||
        typeof settings.data === 'string' ||
        typeof settings.data === 'boolean'
    ) {
        newData = settings.data;
    } else if (Array.isArray(settings.data)) {
        newData = settings.data;
    } else {
        newData = {
            ...(settings.type ? { ...(state[settings.type] as { [s: string]: any }) } : {}),
            ...settings.data,
        };
    }

    return newData;
};

type SettingsT = {
    type: keyof StoreT | '';
    data?: unknown;
    resolve?: () => void;
} & { [s: string]: any };

export default function createStore(
    props: {
        currentPages?: readonly string[];
    } & Record<any, unknown> = {},
): Store<StoreT> {
    const resultPages = {} as StoreT['pages'];

    if (props.currentPages) {
        pages.forEach((page) => {
            resultPages[page.name] = {
                isShow: props.currentPages!.includes(page.name),
            };
        });
    }

    const reducer = (
        state: StoreT = {
            seoMode: s(),
            rootInit: s(),
            pagesIds: {},
            levels: [],
            device: 'desktop',
            pages: resultPages,
            windowWidth: d.documentElement.clientWidth,
            windowHeight: w.innerHeight,
            user: localStorage.getItem(enums.USER)
                ? JSON.parse(localStorage.getItem(enums.USER)!)
                : undefined,
            callFormSuccess: { isShow: false },
            acceptCookies: !!localStorage.getItem('acceptCookies'),
            canLoadImages: {},
            ...props,
        },
        settings: any,
    ) => {
        switch (settings.type) {
            case 'socket':
                return {
                    ...state,
                    ...{
                        socket: settings.data,
                    },
                };
            default: {
                if (settings.type) {
                    const newData = updateData(settings, state);

                    if (settings.resolve && typeof settings.resolve === 'function') {
                        settings.resolve();
                    }

                    return {
                        ...state,
                        ...{
                            [settings.type]: newData,
                        },
                    };
                }

                const data: { [s: string]: any } = {};

                Object.keys(settings).forEach((key) => {
                    if (key !== 'type') {
                        data[key] = (settings as { [s: string]: any })[key];
                    }
                });

                const newData = updateData({ type: settings.type, data }, state);

                if (settings.resolve && typeof settings.resolve === 'function') {
                    settings.resolve();
                }

                return {
                    ...state,
                    ...newData,
                };
            }
        }
    };

    const store = reduxCreateStore(reducer);

    return store;
}
