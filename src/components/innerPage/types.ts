import EditBlockI from '@components/editBlock/types';

type PropsT = {};

type StateT = {
    showClose?: boolean;
    isReady?: boolean;
};

interface InnerPageI<P = {}, S = {}> extends EditBlockI<StateT & S> {
    props: PropsT & P;

    parent: React.RefObject<HTMLDivElement | null>;
    innerClassName?: string;

    renderPage(this: InnerPageI, children: React.ReactNode, withClose?: boolean): React.ReactNode;
    renderDecors(this: InnerPageI, isInner?: boolean): React.ReactNode;

    setClosePosition(this: InnerPageI): void;
    closeEventsHandler?(this: InnerPageI): void;

    getScrollPage?(this: InnerPageI): HTMLElement | undefined;
    initPage(this: InnerPageI, name: string): Promise<void>;
}

export default InnerPageI;
