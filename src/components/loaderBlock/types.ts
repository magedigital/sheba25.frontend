type PropsT = {
    className: string;
    itemClassName?: string;
    loaderClassName?: string;
    isShow: boolean;
    isScroll?: boolean;
    isReverse?: boolean;
};

type StateT = {};

interface LoaderBlockI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;
}

export default LoaderBlockI;
