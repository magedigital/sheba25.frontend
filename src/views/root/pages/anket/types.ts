import InnerPageI from '@components/innerPage/types.ts';
import { StoreT } from '@global/types.ts';

import { MainContentT } from '../index/types.ts';

import fields from './static/fields.ts';

type PropsT = {
    user: StoreT['user'];
};

type StateT = {
    loadingKey?: string;
    error?: string;
    content?: MainContentT;
};

interface AnketI extends InnerPageI<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    fields: typeof fields;

    sendForm(this: AnketI, data: Record<string, any>): Promise<void>;
    getContent(this: AnketI): Promise<void>;

    renderContent(this: AnketI): React.ReactNode;
    renderHead(this: AnketI): React.ReactNode;
    renderForm(this: AnketI): React.ReactNode;
}

export default AnketI;
