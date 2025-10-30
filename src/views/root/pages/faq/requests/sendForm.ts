import AxiosInst from '@functions/initAxios.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const sendForm: I['sendForm'] = async function (data) {
    await setAsyncState.call(this, { userName: data.name, error: undefined });

    const body = {
        email: data.email,
        name: data.name,
        question: data.question,
        agreement: data.policy ? 'Y' : undefined,
        notFoundQuestion: 'Y',
    };

    try {
        const response = await AxiosInst.post<{}, ResponseT>(`/SendQuestion`, body);

        if (response.result === 'OK') {
            await setAsyncState.call(this, { isSuccess: true });
        }
    } catch (e) {
        const error = e as ResponseErrorT;

        await setAsyncState.call(this, { error: error.errorText });
    }
};

export default sendForm;
