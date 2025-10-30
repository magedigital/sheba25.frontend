import setAsyncState from '@functions/setAsyncState.ts';
import uploadQrFn from '@functions/uploadQr.ts';

import I from '../types.ts';

const uploadQr: I['uploadQr'] = async function (this: I, { target }) {
    try {
        const data = await uploadQrFn({ target });
        const scanResult = this.parseQr(data);

        await setAsyncState.call(this, {
            scanResult,
            currentStep: 'form' as const,
            qrType: 'qr-photo' as const,
        });
    } catch (error) {
        this.setStep('error');
    }
};

export default uploadQr;
