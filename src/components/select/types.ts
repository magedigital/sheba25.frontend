type PropsT = {
    name: string;
    items: ItemT[];
    value: string | undefined;
    support?: string;
    onChange: (data: { name: string; value: string }) => Promise<void>;
};

type StateT = {
    isShow?: boolean;
};

type ItemT = {
    id: string;
    content: string;
};

interface SelectI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    getValue(this: SelectI): string | undefined;
    dropHandler(this: SelectI, isShow?: boolean): Promise<void>;
    itemHandler(this: SelectI, data: { id: string }): Promise<void>;

    renderView(this: SelectI): React.ReactNode;
    renderList(this: SelectI): React.ReactNode;
}

export default SelectI;
