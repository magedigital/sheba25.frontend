type PropsT = {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    label?: boolean;
};

type StateT = {};

interface ButtonI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;
}

export default ButtonI;
