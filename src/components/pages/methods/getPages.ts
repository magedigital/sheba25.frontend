import getPage from '@functions/getPage.ts';

import I from '../types.ts';

const getPages: I['getPages'] = function (all) {
    const { pages } = this.state;
    const { storePages } = this.props;

    return pages
        .filter((pageName) => all || storePages[pageName].isShow)
        .map((pageName) => ({ _id: pageName, ...getPage({ name: pageName }) }));
};

export default getPages;
