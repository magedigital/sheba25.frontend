import { ChangeEvent } from 'react';

import jsQR from '@plugins/QR';

type ParamsT = {
    target: ChangeEvent<HTMLInputElement>['target'];
};

export default async function uploadQr({ target }: ParamsT): Promise<string> {
    const file = target.files![0];
    const fr = new FileReader();

    target.value = '';

    return new Promise((resolve, reject) => {
        fr.addEventListener(
            'load',
            () => {
                const img = new Image();

                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    const canvasContext = canvas.getContext('2d')!;
                    const width = img.width;
                    const height = img.height;

                    canvas.width = width;
                    canvas.height = height;
                    canvasContext.drawImage(img, 0, 0);

                    const qrCodeImageFormat = canvasContext.getImageData(0, 0, width, height);

                    const qrDecoded = jsQR(
                        qrCodeImageFormat.data,
                        qrCodeImageFormat.width,
                        qrCodeImageFormat.height,
                    );

                    canvas.remove();

                    if (qrDecoded) {
                        resolve(qrDecoded.data);
                    } else {
                        reject();
                    }
                };

                img.onerror = () => {
                    reject();
                };

                img.src = fr.result as string;
            },
            false,
        );

        fr.readAsDataURL(file);
    });
}
