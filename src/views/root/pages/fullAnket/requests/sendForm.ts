import getAuth from '@functions/getAuth.ts';
import AxiosInst from '@functions/initAxios.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const sendForm: I['sendForm'] = async function (data) {
    const { user } = this.props;
    const { extraDataRequired } = user!;
    const body: Record<string, any> = {};

    Object.keys(extraDataRequired!).forEach((key) => {
        if (extraDataRequired![key].type !== 'photo') {
            body[key] = data[key];
        }
    });

    body.agreement = !!data.policy;

    await setAsyncState.call(this, { loadingKey: 'send' });

    try {
        const response = await AxiosInst.post<{}, ResponseT<{ isFirstAnket?: boolean }>>(
            '/SendParticipantInfo',
            body,
        );

        if (response.result === 'OK') {
            await getAuth(true);

            return;
        }
    } catch (e) {
        const error = e as ResponseErrorT;

        await setAsyncState.call(this, { error: error?.errorText });
    }

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default sendForm;
