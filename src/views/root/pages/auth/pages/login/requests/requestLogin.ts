import setAsyncState from '@functions/setAsyncState.ts';
import login from '@requests/login.ts';

import I from '../types.ts';

const requestLogin: I['requestLogin'] = async function () {
    const { model } = this.state;

    await setAsyncState.call(this, { loadingKey: 'send' });

    try {
        await login({
            login: model?.login,
            password: model?.password,
        });
    } catch (e) {
        const error = e as ResponseErrorT;

        await setAsyncState.call(this, { error: error?.errorText });
    }

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default requestLogin;
