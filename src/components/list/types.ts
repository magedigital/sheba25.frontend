import { StoreT } from '@global/types';

type PropsT = {
    renderKey: string | undefined;
    forceRenderKey?: string;
    updateKey?: string;
    items: ItemT[];
    parentClass: string;
    itemClass?: string;
    itemStyleProps: ('left' | 'right' | 'top' | 'bottom' | 'width' | 'height')[];
    parentStyleProps: ('width' | 'height')[];
    parentRealStyleProps: ('width' | 'height')[];
    withItemWrapper?: boolean;
    renderItem: (data: {
        item: any;
        index: number;
        prevItem?: any;
        nextItem?: any;
        isHide?: boolean;
        isShow?: boolean;
        isLast?: boolean;
        isFirst?: boolean;
    }) => React.ReactNode;
    renderWrapper?: (node: React.ReactNode) => React.ReactNode;
    itemOnScroll?: (data: { e: Pick<Event, 'target'>; id: string }) => void;
    callback?: (data: { parentWidth?: number; parentHeight?: number; isInit?: boolean }) => void;
    testMode?: boolean;
    relative?: boolean;
    reverse?: boolean;
    startShowSmooth?: boolean;
    changeAnimate?: boolean;
    disabled?: boolean;
    windowIsLoad: StoreT['windowIsLoad'];
    getItemClass?: (data: { item: any }) => string | undefined;
    getItemStyle?: (data: { item: any }) => ObjT | undefined;
    resizeWidth?: boolean;
    resizeHeight?: boolean;
    allItems?: readonly string[];
    currentItem?: string;
    clearStyleElems?: string[];
    minHeight?: number;
    drawClassNames?: string[];
};

type StateT = {
    items: ItemT[];
    isEmpty?: boolean;
};

type ItemT = { _id: string } & ObjT;

interface ListI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    resizeThrottle?: () => void;
    isInit?: boolean;
    isCbInit?: boolean;
    windowIsLoad?: boolean;
    states: Record<string, 0 | 1>;
    indexes: Record<string, number>;
    heights: Record<string, number>;
    renderKey?: PropsT['renderKey'];
    updateKey?: PropsT['updateKey'];
    forceRenderKey?: PropsT['forceRenderKey'];
    initEmptySize?: boolean;
    currentIndex?: number;
    id: string;

    timers: Record<string, ReturnType<typeof setTimeout>>;

    checkChange(this: ListI, force?: boolean): void;
    checkSizes(this: ListI): Promise<void>;
    updateItems(this: ListI, data: { isRender: boolean; isUpdate: boolean }): Promise<void>;
    drawItems(
        this: ListI,
        data: { deletesIds: string[]; addesIds: string[]; wasEmpty: boolean },
    ): Promise<void>;

    renderItem(this: ListI, data: { item: ItemT }): React.ReactElement;
}

export default ListI;

export type { ItemT };
