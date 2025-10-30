import setAsyncState from '@functions/setAsyncState.ts';
import setAsyncTimer from '@functions/setAsyncTimer.ts';

import I from '../types.ts';

const loadIcon: I['loadIcon'] = async function () {
    const { name } = this.props;

    try {
        if (0) {
            await setAsyncTimer(1000);
        }

        const Component = (await import(`../static/icons/${name}.tsx`)).default;

        await setAsyncState.call(this, { Component });
    } catch (error) {}
};

export default loadIcon;
