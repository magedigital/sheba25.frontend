import { ChangeEvent } from 'react';

import InnerPageI from '@components/innerPage/types';
import { StoreT } from '@global/types';

type PropsT = {
    storePages: StoreT['pages'];
};

type StateT = {
    currentStep?: 'start' | 'scan' | 'error' | 'form' | 'result';
    renderKey?: string;
    scanResult?: ScanDataT;
    qrType?: 'typing' | 'qr-photo' | 'qr-scan';
};

type ScanDataT = { date: string; amount: string; fn: string; fd: string; fp: string };

interface ChequeI extends InnerPageI<PropsT, StateT> {
    props: PropsT;

    parent: React.RefObject<HTMLDivElement | null>;

    close(this: ChequeI): void;
    setStep(
        step: NonNullable<StateT['currentStep']>,
        qrType?: NonNullable<StateT['qrType']>,
    ): Promise<void>;

    setRenderKey(this: ChequeI): Promise<void>;
    scanComplete(this: ChequeI, data: string): Promise<void>;
    parseQr(this: ChequeI, data?: string): ScanDataT | undefined;
    uploadQr(data: { target: ChangeEvent<HTMLInputElement>['target'] }): Promise<void>;

    renderHead(this: ChequeI): React.ReactNode;
    renderContent(this: ChequeI): React.ReactNode;
}

export default ChequeI;
export type { ScanDataT };
