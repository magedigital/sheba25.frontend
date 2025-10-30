import changePage from '@functions/changePage.ts';
import getAuth from '@functions/getAuth.ts';
import AxiosInst from '@functions/initAxios.ts';
import sendGoal from '@functions/sendGoal.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const sendForm: I['sendForm'] = async function (data) {
    await setAsyncState.call(this, { loadingKey: 'send' });

    const body = {
        firstName: data.firstName,
        lastName: data.secondName,
        phone: data.phone,
        agreement: !!data.policy,
        mailing: data.mailing ? '1' : undefined,
        password1: data.password,
        password2: data.password2,
        referral: data.inv,
        lentaCard: data.lentaCard,
    };

    try {
        const response = await AxiosInst.post<{}, ResponseT<{ isFirstAnket?: boolean }>>(
            '/SendParticipantInfo',
            body,
        );

        if (response.result === 'OK') {
            await getAuth();

            changePage({ pageName: 'profile' });

            localStorage.removeItem('inv');

            if (response.data?.isFirstAnket) {
                sendGoal('regComplete');
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
