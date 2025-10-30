import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const moreTableHandler: I['moreTableHandler'] = async function () {
    const { currentTableCount } = this.state;

    await setAsyncState.call(this, { currentTableCount: currentTableCount + this.step });
};

export default moreTableHandler;
