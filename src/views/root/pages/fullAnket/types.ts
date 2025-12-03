import { ChangeEvent } from 'react';

import InnerPageI from '@components/innerPage/types.ts';
import { StoreT } from '@global/types.ts';

import { MainContentT } from '../index/types';

type PropsT = {
    user: StoreT['user'];
    storePages: StoreT['pages'];
};

type StateT = {
    loadingKey?: string;
    error?: string;
    anket?: ObjT;
    content?: MainContentT;
};

interface FullAnketI extends InnerPageI<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    sendForm(this: FullAnketI, data: Record<string, any>): Promise<void>;
    getContent(this: FullAnketI): Promise<void>;
    uploadHandler(
        this: FullAnketI,
        name: string,
        e: { target: { files: ChangeEvent<HTMLInputElement>['target']['files'] } },
    ): Promise<void>;

    renderContent(this: FullAnketI): React.ReactNode;
    renderHead(this: FullAnketI): React.ReactNode;
    renderForm(this: FullAnketI): React.ReactNode;
}

export default FullAnketI;
