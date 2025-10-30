type PropsT = {
    className: string;
    error?: string;
    callback?: () => void;
};

type StateT = {};

interface ErrorI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default ErrorI;
