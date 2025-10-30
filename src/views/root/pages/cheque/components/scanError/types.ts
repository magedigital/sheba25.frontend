import ChequeI from '../../types';

type PropsT = {
    setStep: ChequeI['setStep'];
    uploadQr: ChequeI['uploadQr'];
    setRenderKey: ChequeI['setRenderKey'];
};

type StateT = {};

interface ScanErrorI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default ScanErrorI;
