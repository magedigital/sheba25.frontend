import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const promoHandler: I['promoHandler'] = async function (
    this: I,
    isPromoShow = !this.state.isPromoShow,
) {
    if (this.promoTimerId) {
        clearTimeout(this.promoTimerId);
    }

    await setAsyncState.call(this, { isPromoShow });

    this.promoTimerId = setTimeout(async () => {
        await setAsyncState.call(this, { isPromoForceShow: isPromoShow });
    }, 150);
};

export default promoHandler;
