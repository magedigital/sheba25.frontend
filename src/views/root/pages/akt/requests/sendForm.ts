import changePage from '@functions/changePage.ts';
import getAuth from '@functions/getAuth.ts';
import AxiosInst from '@functions/initAxios.ts';
import setAsyncState from '@functions/setAsyncState.ts';
import { store } from '@redux/redux.ts';

import I from '../types.ts';

const sendForm: I['sendForm'] = async function (data) {
    const id = this.getPrizeId();

    if (!id) {
        return;
    }

    await setAsyncState.call(this, { loadingKey: 'send' });

    this.formData.set('userPrizeId', id);

    if (data.policy) {
        this.formData.set('agreement', 'true');
    }

    try {
        const response = await AxiosInst.post<{}, ResponseT<{ isFirstAnket?: boolean }>>(
            '/SendParticipantAct',
            this.formData,
        );

        if (response.result === 'OK') {
            await getAuth();

            const resultUser = store.getState().user;

            if (resultUser?.status === 'ACT_REQUIRED') {
                await setAsyncState.call(this, { refreshKey: new Date().getTime().toString() });
            } else {
                changePage({ pageName: 'profile' });
            }

            return;
        }
    } catch (e) {
        const error = e as ResponseErrorT;

        await setAsyncState.call(this, { error: error?.errorText });
    }

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default sendForm;
