import { ChangeEvent } from 'react';

import EditBlockI from '@components/editBlock/types';
import InputI from '@components/input/types';

type PropsT = {
    fields: FieldT[];
    defaultData?: Record<string, any>;
    error?: string;
    send: (data: Record<string, string | boolean>) => Promise<void>;
    buttonText?: string;
    renderHead?: () => React.ReactNode;
    isSuccess?: boolean;
    successTitle?: string;
    successDescription?: string;
    requireSupport?: boolean;
    upload?: (
        name: string,
        e: { target: { files: ChangeEvent<HTMLInputElement>['target']['files'] } },
    ) => Promise<void>;
    pointId?: string;
    pointAddress?: string;
    setPoint?: (id?: string, address?: string) => void;
    resetAct?: () => void;
};

type StateT = {
    isSuccess?: boolean;
    loadingKey?: string;
    addressList: Record<string, { value: string; list: string[] }>;
};

type FieldT = {
    support: string | (() => string);
    name: string;
    type?: InputI['props']['type'];
    reg?: InputI['props']['reg'];
    regExp?: InputI['props']['regExp'];
    textarea?: InputI['props']['textarea'];
    dateWithPast?: InputI['props']['dateWithPast'];
    fieldType?: 'input' | 'checkbox' | 'upload' | 'addressPoint';
    withAddress?: boolean;
};

interface AnketFormI extends EditBlockI<StateT> {
    props: PropsT;

    parent: React.RefObject<HTMLDivElement | null>;
    isSuccess?: boolean;

    addressTimers: Record<string, ReturnType<typeof setTimeout>>;

    sendForm(this: AnketFormI): Promise<void>;
    checkSuccess(this: AnketFormI): Promise<void>;

    addressHandler(
        this: AnketFormI,
        data: { name: string; value: string; choice?: boolean },
    ): Promise<void>;
    setField(this: AnketFormI, e: CustomEvent<{ name: string; value: string }>): Promise<void>;

    renderField(this: AnketFormI, data: { field: FieldT }): React.ReactNode;
    renderSuccess(this: AnketFormI): React.ReactNode;
}

export default AnketFormI;
export type { FieldT };
