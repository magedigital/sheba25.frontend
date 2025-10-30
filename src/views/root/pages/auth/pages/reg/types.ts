import EditBlockI from '@components/editBlock/types';
import { StoreT } from '@global/types';

type PropsT = {
    device: StoreT['device'];
    user: StoreT['user'];
};

type StateT = {
    currentStep: 'start' | 'code';
    renderKey?: string;
    login?: string;
    isConfirm?: boolean;
    mailService?: string;
};

interface RegI extends EditBlockI<StateT> {
    props: PropsT;

    parent: React.RefObject<HTMLDivElement | null>;

    setStep(step: StateT['currentStep'], login?: string, mailService?: string): Promise<void>;
    setRenderKey(this: RegI): Promise<void>;

    renderContent(this: RegI): React.ReactNode;
    renderHead(this: RegI): React.ReactNode;
}

export default RegI;
