import { PagesT, StoreT } from '../global/types.ts';

import pages from '../redux/pages.ts';
import { dispatcher, store } from '../redux/redux.ts';
import getPage from './getPage.ts';
import getPageInfo from './getPageInfo.ts';
import getPageLevel from './getPageLevel.ts';
import getPageLink from './getPageLink.ts';
import getStartUrl from './getStartUrl.ts';
import removeTransition from './removeTransition.ts';

const getShowPages = ({
    page,
    pagesIds,
    levels,
}: {
    page: PagesT | null;
    pagesIds: Record<string, string | number>;
    levels: string[];
}) => {
    const showPages: { name: string; id?: string }[] = [];

    let checkEmptyNextPage = false;
    let popup: string | null = null;

    while (page) {
        const pageInfo = getPageInfo({ name: page.name });
        const level = getPageLevel(page);
        const { nearChilds } = pageInfo;
        let findPage = false;

        const newPage: { name: string; id?: string } = { name: page.name };

        if (page.links.length === 0) {
            pagesIds[page.name] = levels[level];

            newPage.id = levels[level];
        }

        if (popup === null && page.isPopup) {
            popup = page.name;
        }

        showPages.push(newPage);

        if (!findPage) {
            nearChilds.forEach((nearChild) => {
                const childLevel = getPageLevel(nearChild);
                const currentLevel = levels[childLevel];

                if (nearChild.links.includes(currentLevel)) {
                    page = nearChild;
                    findPage = true;
                }
            });
        }

        if (!findPage) {
            nearChilds.forEach((nearChild) => {
                if (nearChild.links.length === 0 && levels[nearChild.level as number]) {
                    page = nearChild;
                    findPage = true;
                }
            });
        }

        if (!findPage) {
            page = null;
        }

        if (!page && !checkEmptyNextPage) {
            const lastPageName = showPages[showPages.length - 1];
            const { nearChilds: nextPageNearChilds } = getPageInfo({ name: lastPageName.name });

            nextPageNearChilds.forEach((nextPage) => {
                if (nextPage.links.find((link) => ['', undefined].includes(link))) {
                    showPages.push({ name: nextPage.name });
                }
            });

            checkEmptyNextPage = true;
        }
    }

    return { showPages, popup };
};

type PropsT = {
    href?: string;
    pageName?: keyof StoreT['pages'];
    isPopstate?: boolean;
    storePages?: StoreT['pages'];
    changeIsHard?: boolean;
    start?: boolean;
    pageData?: {
        [s: string]: any;
    };
    forceChangePage?: string;
    ids?: Record<string, string>;
    query?: Record<string, string>;
};

type ReturnT = {
    storePages?: StoreT['pages'];
    levels?: string[];
    pagesIds?: {
        [s: string]: string;
    };
};

export default async function changePage({
    href,
    pageName,
    isPopstate = false,
    storePages,
    changeIsHard,
    start,
    pageData,
    forceChangePage,
    ids,
    query,
}: PropsT): Promise<ReturnT> {
    if (pageName) {
        href = getPageLink({ name: pageName, storePages, ids });
    }

    if (href === '/') {
        href = '';
    }

    let levels = (href as string).split('/');
    const [firstLevel] = levels;

    let page: PagesT = (pages.find(
        (loopPage: PagesT) => !loopPage.level && loopPage.links.includes(firstLevel),
    ) ||
        pages.find((loopPage: PagesT) => !loopPage.level && loopPage.links.length === 0)) as PagesT;

    if (!page && firstLevel === '') {
        // page = pages.find((innerPage) => innerPage.name === 'login') as PagesT;
    }

    if (!page) {
        page = pages.find((innerPage) => innerPage.name === 'index') as PagesT;
    }

    const resultStorePages = storePages || JSON.parse(JSON.stringify(store.getState().pages));
    const pagesIds = storePages ? {} : JSON.parse(JSON.stringify(store.getState().pagesIds));

    let findNotPopupPage;
    let replaceUrl;

    if (page && typeof page.getCond === 'function') {
        const { condition } = page.getCond(store.getState());

        if (!condition) {
            const redirectName = page.getRedirect?.(store.getState()).name || 'public';

            href = getPageLink({ name: redirectName });

            page = getPage({ name: redirectName });

            levels = href.split('/');

            replaceUrl = href;
        }
    }

    if (page?.isPopup) {
        findNotPopupPage = Object.keys(resultStorePages).find(
            (pageKey) =>
                !getPage({ name: pageKey }).level &&
                !getPage({ name: pageKey }).isPopup &&
                resultStorePages[pageKey].isShow,
        );

        if (!findNotPopupPage) {
            findNotPopupPage =
                (typeof page.mainPage === 'function'
                    ? page.mainPage(store.getState())
                    : page.mainPage) || 'public';

            getPageInfo({ name: findNotPopupPage }).parents.forEach((parent) => {
                resultStorePages[parent].isShow = true;
            });

            resultStorePages[findNotPopupPage].isShow = true;

            const { nearChilds } = getPageInfo({ name: findNotPopupPage });

            const withIndexPageChild = nearChilds.find((child) => child.links.includes(undefined));

            if (withIndexPageChild) {
                resultStorePages[withIndexPageChild.name].isShow = true;
            }
        }
    }

    const infoShowPages = getShowPages({ page, pagesIds, levels });
    let { showPages } = infoShowPages;
    const { popup } = infoShowPages;

    // console.log(infoShowPages);

    // console.log(popup);

    const hidePagesNames = Object.keys(resultStorePages).filter(
        (pageKey) =>
            resultStorePages[pageKey].isShow &&
            (!popup ||
                getPageInfo({ name: pageKey }).parents.includes(popup) ||
                getPageLevel(pageKey) < getPageLevel(popup)),
    );

    hidePagesNames.forEach((nameHidePage) => {
        resultStorePages[nameHidePage].isShow = false;
    });

    let findInnerRedirect: string | undefined;

    showPages.forEach(({ name: nameShowPage }) => {
        if (!findInnerRedirect) {
            const showPage = getPage({ name: nameShowPage });

            if (typeof showPage.getCond === 'function') {
                const { condition } = showPage.getCond(store.getState());

                if (!condition) {
                    const redirectName = showPage.getRedirect?.(store.getState()).name || 'public';

                    findInnerRedirect = redirectName;

                    href = getPageLink({ name: redirectName });

                    levels = href.split('/');

                    replaceUrl = href;
                }
            }
        }
    });

    if (findInnerRedirect) {
        const { showPages: innerShowPages } = getShowPages({
            page: getPage({ name: findInnerRedirect }),
            pagesIds,
            levels,
        });

        showPages = innerShowPages;
    }

    let findPopupPage: string | undefined;

    if (start) {
        showPages.forEach(({ name }) => {
            const innerPage = getPage({ name });

            if (innerPage.isPopup && !findPopupPage) {
                findPopupPage = name;

                const mainPage =
                    typeof innerPage.mainPage === 'function'
                        ? innerPage.mainPage(store.getState())
                        : innerPage.mainPage;
                const mainLevels = getPageLink({ name: mainPage as string }).split('/');
                const { showPages: innerShowPages } = getShowPages({
                    page: getPage({ name: mainPage as string }),
                    pagesIds,
                    levels: mainLevels,
                });

                showPages.push(...innerShowPages);
            }
        });
    }

    showPages.forEach(({ name, id }) => {
        resultStorePages[name].isShow = true;

        if (id) {
            resultStorePages[name].id = id;
        }

        if (name === pageName) {
            resultStorePages[name].data = pageData || {};
        }
    });

    const resultHidePagesNames = hidePagesNames.filter(
        (hidePageName) => !showPages.find((showPage) => showPage.name === hidePageName),
    );

    if (storePages) {
        if (replaceUrl !== undefined) {
            window.history.pushState(null, '', `/${replaceUrl}`);
        }

        return { storePages: resultStorePages, levels, pagesIds };
    }

    document.dispatchEvent(
        new CustomEvent('changePage', {
            detail: {
                showPages: showPages.map(({ name: showPageName }) =>
                    getPage({ name: showPageName }),
                ),
                hidePages: resultHidePagesNames.map((hidePageName) =>
                    getPage({ name: hidePageName }),
                ),
                changeIsHard,
            },
        }),
    );

    if (forceChangePage) {
        removeTransition({ item: forceChangePage });
    }

    if (!isPopstate) {
        let historyHref = `/${
            href === '' || (href as string)[(href as string).length - 1] === '/' ? href : `${href}/`
        }`;

        if (historyHref[0] === '/' && historyHref[1] === '/') {
            historyHref = historyHref.slice(1);
        }

        if (window.location.search && 0) {
            historyHref += window.location.search;
        }

        if (query) {
            historyHref +=
                '?' +
                Object.keys(query)
                    .map((k) => [k, query[k]].join('='))
                    .join('&');
        }

        window.history.pushState(null, '', historyHref);
    }

    await dispatcher({
        type: '',
        levels,
        pagesIds,
        pages: resultStorePages,
    });

    // setTimeout(() => {
    //     if (window.ym) {
    //         window.ym(window.ymId, 'hit');
    //     }
    // }, 10);

    return {};
}

if (typeof window !== 'undefined') {
    window.onpopstate = async (e) => {
        e.preventDefault();

        const href = getStartUrl(window.location.pathname.slice(1));

        changePage({
            href,
            isPopstate: true,
        });
    };
}
