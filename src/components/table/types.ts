import ListI from '@components/list/types';
import { StoreT } from '@global/types';

import tables from './static/tables';

type PropsT = {
    device: StoreT['device'];
    name: keyof typeof tables;
    items: ItemT[];
    emptyTitle?: string;
    emptyDescription?: string;
    callback?: ListI['props']['callback'];
};

type StateT = {};

type ItemT = {
    _id: string;
} & Record<string, any>;

interface TableI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    tables: typeof tables;

    renderRow(
        this: TableI,
        data: { item: Record<string, string>; index: number; isShow?: boolean },
    ): React.ReactNode;
}

export default TableI;
