import { ChangeEvent } from 'react';

import EditBlockI from '@components/editBlock/types';

import ChequeI, { ScanDataT } from '../../types';
import fields from './static/fields';

type PropsT = {
    setStep: ChequeI['setStep'];
    setRenderKey: () => Promise<void>;
    scanResult?: ScanDataT;
    qrType: ChequeI['state']['qrType'];
};

type StateT = {
    files: { src: string; id: string }[];
    loadingKey?: string;
    error?: string;
};

interface ChequeFormI extends EditBlockI<StateT> {
    props: PropsT;

    parent: React.RefObject<HTMLDivElement | null>;

    formData: FormData;
    fields: typeof fields;

    uploadHandler(this: ChequeFormI, e: ChangeEvent<HTMLInputElement>): Promise<void>;
    deleteFile(this: ChequeFormI, id: string): Promise<void>;

    sendForm(this: ChequeFormI): Promise<void>;
}

export default ChequeFormI;
