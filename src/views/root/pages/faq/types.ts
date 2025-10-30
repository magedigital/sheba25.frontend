import { QuestionT } from './components/question/types';

import fields from './static/fields';

type PropsT = {
    is5ka?: boolean;
};

type StateT = {
    loadingKey?: string;
    isSuccess?: boolean;
    content?: FaqContentT;
    userName?: string;
    error?: string;
};

type FaqContentT = {
    components: {
        header: HeaderContentT;
        footer: FooterContentT;
        faq: QuestionT[];
        '5ka': QuestionT[];
    };
};

interface FaqI extends React.Component<PropsT, StateT> {
    parent: React.RefObject<HTMLDivElement | null>;
    fields: typeof fields;

    sendForm(this: FaqI, data: Record<string, any>): Promise<void>;
    getContent(this: FaqI): Promise<void>;

    renderContent(this: FaqI): React.ReactNode;
    renderHead(this: FaqI): React.ReactNode;
    renderFaq(this: FaqI): React.ReactNode;
    renderQuestions(this: FaqI): React.ReactNode;
    renderForm(this: FaqI): React.ReactNode;
}

export default FaqI;
export type { FaqContentT };
