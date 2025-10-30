import { PagesT, StoreT } from '../global/types.ts';

import pages from '../redux/pages.ts';
import { store } from '../redux/redux.ts';

export default function getNotPopupPage(): { href: string; name: string } {
    const { pages: storePages } = store.getState();
    let href = '';
    let pageName = '';

    let page = pages.find(
        (loopPage: PagesT) =>
            !loopPage.level &&
            !loopPage.isPopup &&
            storePages[loopPage.name as keyof StoreT['pages']]?.isShow,
    ) as PagesT;

    while (page) {
        let link: string | undefined = page.links.find((loopLink) => loopLink !== undefined);

        if (page.links.length === 0) {
            link = storePages[page.name]?.id;
        }

        href += link;
        href += '/';

        pageName = page.name;

        page = pages.find(
            (loopPage: PagesT) =>
                !loopPage.isPopup &&
                loopPage.parentName === page?.name &&
                storePages[loopPage.name as keyof StoreT['pages']]?.isShow,
        ) as PagesT;
    }

    href = href.slice(0, -1);

    return { href, name: pageName };
}
