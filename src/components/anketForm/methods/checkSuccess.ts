import setAsyncState from '@functions/setAsyncState.ts';
import setAsyncTimer from '@functions/setAsyncTimer.ts';

import I from '../types.ts';

const checkSuccess: I['checkSuccess'] = async function () {
    const { isSuccess } = this.props;

    if (isSuccess && this.isSuccess !== isSuccess) {
        this.isSuccess = isSuccess;

        const formNode = this.parent.current!;

        formNode.style.height = `${formNode.offsetHeight}px`;

        await setAsyncTimer(10);

        await setAsyncState.call(this, { isSuccess: true });
    }
};

export default checkSuccess;
