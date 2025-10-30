import { MainContentT } from '../../types';

type PropsT = {
    content: MainContentT | undefined;
};

type StateT = {};

interface HeaderI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default HeaderI;
