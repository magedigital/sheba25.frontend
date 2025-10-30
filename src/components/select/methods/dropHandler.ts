import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const dropHandler: I['dropHandler'] = async function (this: I, isShow = !this.state.isShow) {
    await setAsyncState.call(this, { isShow });
};

export default dropHandler;
