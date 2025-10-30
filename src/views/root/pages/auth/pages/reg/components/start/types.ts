import EditBlockI from '@components/editBlock/types';
import { StoreT } from '@global/types';

import RegI from '../../types';

type PropsT = {
    setStep: RegI['setStep'];
    device: StoreT['device'];
    setRenderKey: () => void;
    isConfirm?: boolean;
    mode?: string;
};

type StateT = {
    loadingKey?: string;
    error?: string;
};

interface StartI extends EditBlockI<StateT> {
    props: PropsT;

    parent: React.RefObject<HTMLDivElement | null>;

    sendForm(this: StartI): Promise<void>;

    renderForm(this: StartI): React.ReactNode;
    renderFoot(this: StartI): React.ReactNode;
}

export default StartI;
