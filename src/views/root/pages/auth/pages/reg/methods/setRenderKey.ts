import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const setRenderKey: I['setRenderKey'] = async function () {
    await setAsyncState.call(this, { renderKey: new Date().getTime().toString() });
};

export default setRenderKey;
