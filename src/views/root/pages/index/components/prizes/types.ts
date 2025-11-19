type PropsT = {};

type StateT = {};

interface PrizesI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    ship: React.RefObject<HTMLDivElement | null>;
}

export default PrizesI;
