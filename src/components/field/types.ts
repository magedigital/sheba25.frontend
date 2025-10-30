import { FieldRegsT } from '@components/input/types';

type PropsT = {
    name: string;
    support?: string;
    inputSupport?: string;
    value: string;
    type?: string;
    reg?: FieldRegsT;
    regExp?: RegExp;
    onChange: (data: { value: string }) => Promise<void>;
    className?: string;
    dateWithPast?: boolean;
    isAmount?: boolean;
    returnTemplate?: boolean;
    textarea?: boolean;
};

type StateT = {};

interface FieldI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default FieldI;
