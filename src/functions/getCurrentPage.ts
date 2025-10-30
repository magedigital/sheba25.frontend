import { PagesT, StoreT } from '@global/types';
import pages from '@redux/pages';
import { store } from '@redux/redux';

export default function getCurrentPage({
    storePages = store.getState().pages,
    filter,
}: {
    storePages?: StoreT['pages'];
    filter: (page: PagesT) => boolean;
}): string | undefined {
    return pages.filter((page) => filter(page)).find((page) => storePages[page.name].isShow)?.name;
}
