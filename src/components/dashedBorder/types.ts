type PropsT = {
    className?: string;
    rx?: number;
    ry?: number;
    isFull?: boolean;
};

type StateT = {
    width?: number;
    height?: number;
};

interface DashedBorderI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    throttleHandler?: () => void;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default DashedBorderI;
