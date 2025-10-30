type PropsT = {
    text: string;
    items: { thumb: string; title: string }[];
    listCb: () => void;
};

type StateT = {};

interface BlockI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default BlockI;
