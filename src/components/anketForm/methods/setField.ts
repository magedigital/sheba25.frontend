import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const setField: I['setField'] = async function ({ detail: { name, value } }) {
    const model = { ...this.state.model };
    const savedModel = { ...this.state.savedModel };

    model[name] = value;
    savedModel[name] = value;

    await setAsyncState.call(this, { model, savedModel });
};

export default setField;
