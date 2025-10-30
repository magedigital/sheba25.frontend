import { StoreT } from '@global/types';

type PropsT = {
    length: number;
    callback: (code: string) => void;
    clearKey?: string;
    loading?: boolean;
    device: StoreT['device'];
};

type StateT = {
    inputs: string[];
};

interface CodeInputsI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    clearKey?: string;

    init(this: CodeInputsI): Promise<void>;

    inputHandler(this: CodeInputsI, key: number, data: { value: string }): Promise<void>;

    checkClear(this: CodeInputsI): Promise<void>;
}

export default CodeInputsI;
