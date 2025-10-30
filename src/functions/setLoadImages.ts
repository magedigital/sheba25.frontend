import { StoreT } from '@global/types';
import { dispatcher, store } from '@redux/redux';

export default async function setLoadImages(name: keyof StoreT['canLoadImages']): Promise<void> {
    const canLoadImages = { ...store.getState().canLoadImages };

    if (!canLoadImages[name]) {
        canLoadImages[name] = name;
    }

    await dispatcher({ type: 'canLoadImages', data: canLoadImages });
}
