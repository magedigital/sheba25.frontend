import { StoreT } from '@global/types';

type PropsT = {
    canLoadImages: StoreT['canLoadImages'];
    children?: React.ReactNode;
    name: keyof StoreT['canLoadImages'];
};

type StateT = {};

interface LazyI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default LazyI;
