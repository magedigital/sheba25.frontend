import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const scrollHandler: I['scrollHandler'] = async function (e) {
    const { isFix } = this.state;
    const target = e.target as HTMLElement;

    if (target.classList.contains('body__page') && target.classList.contains('_show')) {
        const { scrollTop } = target;

        if (scrollTop > 10 && !isFix) {
            await setAsyncState.call(this, { isFix: true });
        }

        if (scrollTop <= 10 && isFix) {
            await setAsyncState.call(this, { isFix: false });
        }
    }
};

export default scrollHandler;
