import { StoreT } from '@global/types';

type PropsT = {
    content?: FooterContentT;
    storePages: StoreT['pages'];
};

type StateT = {
    is5ka?: boolean;
};

interface FooterI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default FooterI;
