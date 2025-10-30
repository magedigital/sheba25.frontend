import { StoreT } from '../global/types.ts';

import createStore from './createStore.ts';

type SettingsT = {
    type: keyof StoreT | '';
    data?: unknown;
    resolve?: () => void;
} & { [s: string]: any };

const store = createStore();

function dispatcher(settings: SettingsT): Promise<void> {
    return new Promise((resolve) => {
        store.dispatch({ ...settings, ...{ resolve } });
    });
}

export { store, dispatcher };
