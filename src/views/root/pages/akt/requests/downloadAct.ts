import AxiosInst from '@functions/initAxios.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const downloadPDF = (pdf: string, name: string) => {
    const link = document.createElement('a');
    link.style.opacity = '0';
    link.style.position = 'fixed';
    link.style.top = '0';
    link.style.left = '0';
    document.body.appendChild(link);

    const binary = atob(pdf.replace(/\s/g, ''));
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < len; i += 1) {
        view[i] = binary.charCodeAt(i);
    }

    const type = 'application/pdf';
    const file = new Blob([view], { type });
    const url = URL.createObjectURL(file);
    const fileName = `${name}.pdf`;

    link.href = url;
    link.download = fileName;

    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    link.click();

    document.body.removeChild(link);
};

const downloadAct: I['downloadAct'] = async function () {
    const id = this.getPrizeId();

    if (!id) {
        return;
    }

    await setAsyncState.call(this, { loadingKey: 'download' });

    try {
        const response = await AxiosInst.post('/GetAct', { userPrizeId: id });

        const pdf = response.data.pdf;

        downloadPDF(pdf, id!);
    } catch (er) {
        const error = er as ResponseErrorT;

        await setAsyncState.call(this, { error: error?.errorText });
    }

    await setAsyncState.call(this, { loadingKey: undefined });
};

export default downloadAct;
