import { scrollPage } from '@functions/savePageScroll.ts';
import setAsyncState from '@functions/setAsyncState.ts';
import setAsyncTimer from '@functions/setAsyncTimer.ts';

import I from '../types.ts';

const initPage: I['initPage'] = async function (name) {
    await setAsyncTimer(100);

    scrollPage(this.parent.current!.querySelector('.page')!, name);
    await setAsyncState.call(this, { isReady: true });
};

export default initPage;
