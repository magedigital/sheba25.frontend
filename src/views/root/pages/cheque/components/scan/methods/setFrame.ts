import jsQR from '@plugins/QR';

import I from '../types.ts';

const setFrame: I['setFrame'] = async function () {
    if (this.flagTick !== true || !this.video) {
        return;
    }

    if (this.video.readyState !== this.video.HAVE_ENOUGH_DATA) {
        requestAnimationFrame(this.setFrame.bind(this));

        return;
    }

    const canvas = this.parent.current!.querySelector('canvas');

    if (!canvas) {
        return;
    }

    const { complete } = this.props;

    const canvasContext = canvas.getContext('2d')!;

    canvas.hidden = false;

    canvas.height = this.video.videoHeight;
    canvas.width = this.video.videoWidth;

    canvasContext.drawImage(this.video, 0, 0, canvas.width, canvas.height);

    const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    const qrDecoded = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
    });

    if (qrDecoded) {
        if (qrDecoded.data) {
            if (!this.isComplete) {
                this.isComplete = true;

                // this.complete({ data: qrDecoded.data, type: 'qr-scan' });

                complete(qrDecoded.data);
            }
        } else {
            // this.setCurrentStep('error');
        }
    }

    requestAnimationFrame(this.setFrame.bind(this));
};

export default setFrame;
