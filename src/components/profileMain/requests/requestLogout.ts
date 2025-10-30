import setAsyncState from '@functions/setAsyncState.ts';
import logout from '@requests/logout.ts';

import I from '../types.ts';

const requestLogout: I['requestLogout'] = async function () {
    await setAsyncState.call(this, { loadingKey: 'logout' });

    try {
        await logout();
    } catch (error) {}

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default requestLogout;
