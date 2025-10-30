import setAsyncState from '@functions/setAsyncState.ts';
import setAsyncTimer from '@functions/setAsyncTimer.ts';

import I from '../types.ts';

const deleteFile: I['deleteFile'] = async function (id) {
    const { setRenderKey } = this.props;
    const files = [...this.state.files];
    const index = files.findIndex((item) => item.id === id);

    if (index !== -1) {
        files.splice(index, 1);
    }

    this.formData.delete(id);

    await setAsyncTimer(10);

    await setAsyncState.call(this, { files });

    await setRenderKey();
};

export default deleteFile;
