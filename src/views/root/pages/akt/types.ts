import { ChangeEvent } from 'react';

import InnerPageI from '@components/innerPage/types.ts';
import { StoreT } from '@global/types.ts';

import { MainContentT } from '../index/types.ts';

import fields from './static/fields.ts';

type PropsT = {
    user: StoreT['user'];
    levels: StoreT['levels'];
};

type StateT = {
    content?: MainContentT;
    loadingKey?: string;
    error?: string;
    refreshKey?: string;
};

interface AktI extends InnerPageI<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    formData: FormData;

    fields: typeof fields;

    sendForm(this: AktI, data: Record<string, any>): Promise<void>;
    uploadHandler(
        this: AktI,
        name: string,
        e: { target: { files: ChangeEvent<HTMLInputElement>['target']['files'] } },
    ): Promise<void>;
    downloadAct(this: AktI): Promise<void>;
    resetAct(this: AktI): Promise<void>;

    getContent(this: AktI): Promise<void>;

    getPrizeId(this: AktI): string | undefined;

    renderContent(this: AktI): React.ReactNode;
    renderHead(this: AktI): React.ReactNode;
    renderForm(this: AktI): React.ReactNode;
}

export default AktI;
