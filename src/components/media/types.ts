import { StoreT } from '@global/types';

type PropsT = {
    device: StoreT['device'];
    current?: StoreT['device'];
    children: React.ReactNode;
};

type StateT = {};

interface MediaI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;
}

export default MediaI;
