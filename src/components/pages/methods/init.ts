import setAsyncState from '@functions/setAsyncState.ts';
import { PagesT } from '@global/types.ts';
import pages from '@redux/pages.ts';

import I from '../types.ts';

const init: I['init'] = async function () {
    const { filter } = this.props;
    const resultPages = pages.filter((page) => filter(page as PagesT));

    await setAsyncState.call(this, { pages: resultPages.map((page) => page.name) });
};

export default init;
