type PropsT = {
    isShow: boolean;
    className?: string;
    children: React.ReactNode;
    initCb?: () => void;
};

type StateT = {
    isShow: boolean;
};

interface FadeI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    timerId?: ReturnType<typeof setTimeout>;

    isShow?: boolean;
    inited?: boolean;

    checkChange(this: FadeI, start?: boolean): Promise<void>;
}

export default FadeI;
