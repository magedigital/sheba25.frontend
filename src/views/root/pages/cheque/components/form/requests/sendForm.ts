import { MD5 } from 'crypto-js';

import checkChatbot from '@functions/checkChatbot.ts';
import AxiosInst from '@functions/initAxios.ts';
import sendGoal from '@functions/sendGoal.ts';
import setAsyncState from '@functions/setAsyncState.ts';
import { store } from '@redux/redux.ts';

import I from '../types.ts';

const sendCRAGoal = (type: 'old' | 'new') => {
    const user = store.getState().user;
    const utmSource = localStorage.getItem('utmSource');

    if (utmSource !== 'advcake') {
        return;
    }

    window.advcake_data = window.advcake_data || [];
    window.advcake_data.push({
        pageType: 6,
        user: {
            email: MD5(`${new Date().getTime()}${user?.userId}`),
            type,
        },
        leadInfo: {
            id: 'e9adccc96c051de0ae5997a3bd624b36',
            leadid: '1',
            name: 'Регистрация чека',
            totalPrice: 0,
            coupon: 'NO',
        },
    });
};

const sendForm: I['sendForm'] = async function () {
    const model = this.state.model!;
    const { setStep, qrType } = this.props;

    const form: Record<string, string | null> = {
        fn: model.fn || null,
        fp: model.fp || null,
        fd: model.fd || null,
        sum: model.amount || null,
        day: null,
        month: null,
        hour: null,
        min: null,
        loadType: qrType || null,
    };

    if (model.date) {
        const [day, month] = model.date.split('.');

        form.day = day;
        form.month = month;
    }

    if (model.time) {
        const [hour, min] = model.time.split(':');

        form.hour = hour;
        form.min = min;
    }

    Object.keys(form).forEach((key) => {
        if (form[key]) {
            this.formData.set(key, form[key]);
        }
    });

    if (checkChatbot()) {
        this.formData.set('interface', 'tg-bot');
    }

    await setAsyncState.call(this, { error: undefined, loadingKey: 'send' });

    try {
        const response = await AxiosInst.post<{}, ResponseT<{ isFirstCheck?: boolean }>>(
            '/CheckRegistration',
            this.formData,
        );
        const { result } = response;

        if (result === 'OK') {
            setStep('result');

            document.dispatchEvent(new CustomEvent('getProfileContent'));

            sendGoal('regCheckSuccess');

            if (response.data?.isFirstCheck) {
                sendGoal('regFirstCheck');
            }

            sendCRAGoal(response.data?.isFirstCheck ? 'new' : 'old');

            return;
        }
    } catch (e) {
        const error = e as { errorText?: string };

        await setAsyncState.call(this, { error: error.errorText });

        sendGoal('regCheckError');
    }

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default sendForm;
