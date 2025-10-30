type PropsT = {
    children: React.ReactNode;
};

type StateT = {};

interface MobAuthI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default MobAuthI;
