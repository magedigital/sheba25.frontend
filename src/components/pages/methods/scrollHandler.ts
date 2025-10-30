import { setPageScroll } from '@functions/savePageScroll.ts';

import I from '../types.ts';

const scrollHandler: I['scrollHandler'] = function ({ e, id }) {
    const target = e.target as HTMLElement;

    setPageScroll(target, id);
};

export default scrollHandler;
