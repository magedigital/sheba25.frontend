import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const sendForm: I['sendForm'] = async function () {
    const { send } = this.props;

    await setAsyncState.call(this, { loadingKey: 'send' });

    try {
        await send(this.state.model!);
    } catch (error) {}

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default sendForm;
