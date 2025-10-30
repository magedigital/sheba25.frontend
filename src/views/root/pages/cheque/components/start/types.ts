import ChequeI from '../../types';

type PropsT = {
    setStep: ChequeI['setStep'];
    uploadQr: ChequeI['uploadQr'];
};

type StateT = {};

interface StartI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default StartI;
