import { StoreT } from '../global/types.ts';

import { store } from '../redux/redux.ts';

export default function checkCurrentPage({
    name,
    pages = store.getState().pages,
}: {
    name: keyof StoreT['pages'];
    pages: StoreT['pages'];
}): boolean {
    return !!pages[name]?.isShow;
}
