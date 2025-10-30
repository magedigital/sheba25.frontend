type PropsT = {
    question: QuestionT & { key: number };
};

type StateT = {
    contentHeight?: number;
    isShow?: boolean;
};

type QuestionT = {
    title: string;
    description: string;
};

interface QuestionI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    resizeThrottle?: () => void;

    dropHandler(this: QuestionI, isShow?: boolean): Promise<void>;
    init(this: QuestionI): Promise<void>;

    renderHead(this: QuestionI): React.ReactNode;
    renderContent(this: QuestionI): React.ReactNode;
}

export default QuestionI;
export type { QuestionT };
