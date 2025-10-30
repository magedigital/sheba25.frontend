import AxiosInst from '@functions/initAxios.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const sendForm: I['sendForm'] = async function () {
    const { model } = this.state;
    const { setStep, mode } = this.props;
    await setAsyncState.call(this, { loadingKey: 'send' });

    try {
        const response = await AxiosInst.post<{}, ResponseT<{ mailService?: string }>>(
            '/Registration',
            {
                login: model!.login,
                mode,
            },
        );

        if (response.result === 'OK') {
            await setStep('code', model!.login, response.data?.mailService);
        }
    } catch (e) {
        const error = e as ResponseErrorT;

        await setAsyncState.call(this, { error: error?.errorText });
    }

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default sendForm;
