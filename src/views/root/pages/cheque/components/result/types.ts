import ChequeI from '../../types';

type PropsT = {
    setStep: ChequeI['setStep'];
};

type StateT = {};

interface ChequeResultI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default ChequeResultI;
