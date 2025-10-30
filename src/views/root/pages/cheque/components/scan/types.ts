import ChequeI from '../../types';

type PropsT = {
    setStep: ChequeI['setStep'];
    uploadQr: ChequeI['uploadQr'];
    complete: (data: string) => Promise<void>;
};

type StateT = {
    videoReady?: boolean;
    loadingKey?: string;
};

interface ChequeScanI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    video?: HTMLVideoElement;
    flagTick?: boolean;
    isComplete?: boolean;

    videoStart(this: ChequeScanI): Promise<void>;
    videoStop(this: ChequeScanI): Promise<void>;
    setFrame(this: ChequeScanI): Promise<void>;
}

export default ChequeScanI;
