import ListI from '@components/list/types';
import { PageNamesT, PagesT, StoreT } from '@global/types';

type PropsT = {
    context: React.Component;
    pages: Record<string, { render: () => React.ReactNode }>;
    storePages: StoreT['pages'];
    filter: (page: PagesT) => boolean;
    parentClass?: string;
    itemClass?: string;
    parentName?: PageNamesT;
    parentStyleProps?: ListI['props']['parentStyleProps'];
    parentRealStyleProps?: ListI['props']['parentRealStyleProps'];
    renderKey?: string;
    render404?: () => React.ReactNode;
    callback?: ListI['props']['callback'];
    getItemClass?: ListI['props']['getItemClass'];
    testMode?: boolean;
};

type StateT = {
    pages: PageNamesT[];
};

interface PagesI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    getPages(this: PagesI, all?: boolean): { _id: string }[];
    scrollHandler(this: PagesI, data: { e: Pick<Event, 'target'>; id: string }): void;

    init(this: PagesI): Promise<void>;
}

export default PagesI;
