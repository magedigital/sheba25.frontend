import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const setStep: I['setStep'] = async function (this: I, currentStep, qrType) {
    await setAsyncState.call(this, { currentStep, ...(qrType ? { qrType } : {}) });
};

export default setStep;
