type PropsT = {
    setRenderKey: () => void;
    login: string;
    isConfirm?: boolean;
    mailService?: string;
    mode?: string;
};

type StateT = {
    loadingKey?: string;
    error?: string;
    code?: string;
};

interface CodeI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    sendForm(this: CodeI, again?: boolean): Promise<void>;

    renderContent(this: CodeI): React.ReactNode;
    renderFoot(this: CodeI): React.ReactNode;
}

export default CodeI;
