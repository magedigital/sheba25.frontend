import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const videoStop: I['videoStop'] = async function () {
    if (this.video?.srcObject) {
        (this.video.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
        this.flagTick = false;

        this.isComplete = false;
    }

    if (this.parent.current) {
        const canvas = this.parent.current.querySelector('canvas');

        if (canvas) {
            canvas.hidden = true;
        }

        await setAsyncState.call(this, { videoReady: false });
    }
};

export default videoStop;
