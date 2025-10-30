import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const dropHandler: I['dropHandler'] = async function (this: I, isShow = !this.state.isShow) {
    const contentNode = this.parent.current!.querySelector(
        '.faqQuestion__contentInner',
    ) as HTMLElement;

    if (!contentNode) {
        return;
    }

    await setAsyncState.call(this, { isShow, contentHeight: contentNode.offsetHeight });
};

export default dropHandler;
