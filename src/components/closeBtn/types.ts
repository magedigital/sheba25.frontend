type PropsT = {};

type StateT = {};

interface CloseBtnI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    closeHandler(this: CloseBtnI): void;
}

export default CloseBtnI;
