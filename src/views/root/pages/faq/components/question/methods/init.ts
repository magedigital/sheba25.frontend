import removeTransition from '@functions/removeTransition.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const init: I['init'] = async function () {
    const { question } = this.props;
    const contentNode = this.parent.current!.querySelector(
        '.faqQuestion__contentInner',
    ) as HTMLElement;

    if (!contentNode) {
        return;
    }

    if (!this.state.contentHeight) {
        removeTransition({ item: '.faqQuestion' });
    }

    await setAsyncState.call(this, {
        contentHeight: contentNode.offsetHeight,
        isShow: question.key === 1,
    });
};

export default init;
