type PropsT = {
    children: string;
    value: boolean;
    onChange: (data: { value: boolean }) => Promise<void>;
    className?: string;
};

type StateT = {};

interface CheckboxI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default CheckboxI;
