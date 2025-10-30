import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const setStep: I['setStep'] = async function (this: I, currentStep, login, mailService) {
    await setAsyncState.call(this, { currentStep, login, mailService });
};

export default setStep;
