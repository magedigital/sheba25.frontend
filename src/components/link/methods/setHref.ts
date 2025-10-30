import getPageLink from '@functions/getPageLink.ts';

import LinkI from '../types.ts';

const setHref: LinkI['setHref'] = function () {
    const { pageName, storePages, ids } = this.props;
    const href = getPageLink({ name: pageName as string, storePages, ids });

    this.setState({ href });
};

export default setHref;
