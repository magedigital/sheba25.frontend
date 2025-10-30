import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const scanComplete: I['scanComplete'] = async function (data) {
    const scanResult = this.parseQr(data);

    if (scanResult) {
        await setAsyncState.call(this, {
            scanResult,
            currentStep: 'form' as const,
            qrType: 'qr-scan' as const,
        });
    }
};

export default scanComplete;
