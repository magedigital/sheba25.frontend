import { PagesT } from '../global/types.ts';

import pages from '../redux/pages.ts';
import getPage from './getPage.ts';
import getPageLevel from './getPageLevel.ts';

const pagesIndexes: {
    levels: {
        [s: number]: PagesT[];
    };
    parents: {
        [s: string]: {
            [s: number]: PagesT[];
        };
    };
} = {
    levels: {},
    parents: {},
};

pages.forEach((page: PagesT) => {
    const level = getPageLevel(page);

    if (!pagesIndexes.levels[level]) {
        pagesIndexes.levels[level] = [];
    }

    pagesIndexes.levels[level].push(page);

    if (page.parentName) {
        if (!pagesIndexes.parents[page.parentName]) {
            pagesIndexes.parents[page.parentName] = {};
        }

        if (!pagesIndexes.parents[page.parentName][level]) {
            pagesIndexes.parents[page.parentName][level] = [];
        }

        pagesIndexes.parents[page.parentName][level].push(page);
    }
});

type PropsT = {
    name: string;
};

type PageInfoT = {
    nearChilds: PagesT[];
    childs: PagesT[];
    nearParent: PagesT | undefined;
    parent: PagesT | undefined;
    parents: string[];
};

export default function getPageInfo({ name }: PropsT): PageInfoT {
    const page = getPage({ name });

    let nearChilds: PagesT[] = [];
    let childs: PagesT[] = [];
    let nearParent;
    const parents = [];
    let parent;

    if (page) {
        const level = getPageLevel(page);

        nearChilds = pagesIndexes.parents[page.name]?.[level + 1] || [];

        if (level) {
            nearParent = getPage({ name: page.parentName as string });
        }

        let currentChilds = [...nearChilds];
        childs = [...nearChilds];

        while (currentChilds.length !== 0) {
            const thisChilds: PagesT[] = [];

            currentChilds.forEach((child) => {
                const { childs: nextChilds } = getPageInfo({
                    name: child.name,
                });

                thisChilds.push(...nextChilds);
            });

            childs.push(...thisChilds);

            currentChilds = thisChilds;
        }

        if (level) {
            const { parentName } = page;
            let parentPage = getPage({ name: parentName as string });

            parents.push(parentPage.name);

            while (parentPage.parentName) {
                parentPage = getPage({ name: parentPage.parentName });

                parents.push(parentPage.name);
            }

            parent = parentPage;
        }
    }

    return {
        nearChilds,
        childs,
        nearParent,
        parent,
        parents,
    };
}
