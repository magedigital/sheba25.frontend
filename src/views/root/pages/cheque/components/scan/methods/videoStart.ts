import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const videoStart: I['videoStart'] = async function () {
    this.video = document.createElement('video');
    this.flagTick = true;

    const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
    });

    this.video.srcObject = stream;
    this.video.setAttribute('playsinline', 'true');
    this.video.play();

    await setAsyncState.call(this, { videoReady: true });

    requestAnimationFrame(this.setFrame.bind(this));
};

export default videoStart;
