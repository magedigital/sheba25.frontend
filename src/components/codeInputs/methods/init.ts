import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const init: I['init'] = async function () {
    const { length } = this.props;
    const inputs = new Array(length).fill('');

    await setAsyncState.call(this, { inputs });
};

export default init;
