import { PageNamesT, StoreT } from '@global/types';

type PropsT = {
    storePages: StoreT['pages'];
    device: StoreT['device'];
};

type StateT = {
    isShowMenu?: boolean;
    isFix?: boolean;
};

type NavItemT = {
    name: string;
    pageName?: PageNamesT;
    ancor?: string;
    text: string;
};

interface TopBarI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    menuHandler(this: TopBarI, isShowMenu?: boolean): Promise<void>;
    scrollHandler(this: TopBarI, e: Event): Promise<void>;

    getNav(this: TopBarI): NavItemT[];

    renderHead(this: TopBarI): React.ReactNode;
    renderMenu(this: TopBarI): React.ReactNode;
}

export default TopBarI;
export type { NavItemT };
