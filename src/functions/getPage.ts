import { PagesT } from '../global/types.ts';

import pages from '../redux/pages.ts';

const pagesIndexes: {
    [s: string]: PagesT;
} = {};

pages.forEach((page) => {
    pagesIndexes[page.name] = page;
});

export default function getPage({ name }: { name: string }): PagesT {
    return pagesIndexes[name];
}
