import { PagesT } from '../global/types.ts';

import getPage from './getPage.ts';

export default function getPageLevel(page: string | PagesT): number {
    if (typeof page === 'string') {
        page = getPage({ name: page });
    }

    return page ? page.level || 0 : 0;
}
