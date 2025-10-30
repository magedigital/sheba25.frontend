import { StoreT } from '@global/types.ts';

import pages from './static/pages.tsx';

type PropsT = {
    rootInit: StoreT['rootInit'];
    callFormSuccess: StoreT['callFormSuccess'];
    acceptCookies: StoreT['acceptCookies'];
};

type StateT = {};

interface RootI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    pages: typeof pages;

    renderPopups(this: RootI): React.ReactNode;
    renderTopBar(this: RootI): React.ReactNode;
}

export default RootI;
