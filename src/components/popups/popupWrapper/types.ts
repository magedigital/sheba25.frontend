import popups from './static/popups';

type PropsT = {
    name: keyof typeof popups;
    className?: string;
    isShow: boolean;
    props?: Record<any, unknown>;
};

type StateT = {
    PopupComponent?: React.ElementType;
};

interface PopupWrapperI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    popups: typeof popups;

    loadPopup(this: PopupWrapperI): Promise<void>;
}

export default PopupWrapperI;
