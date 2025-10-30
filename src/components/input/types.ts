import React, { ChangeEvent, MouseEvent } from 'react';

import regs from './static/reg.ts';

type ConcatT = {
    text: string | [string, string, string];
    position: 'end' | 'start';
    exp?: RegExp;
};

type PropsT = {
    value: string | undefined;
    name: string;
    support?: string;
    type?: string;
    onChange: (
        data: { name: string; value: string },
        e?: React.ChangeEvent<Element>,
    ) => Promise<void>;
    textarea?: boolean;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
    reg?: FieldRegsT;
    returnTemplate?: boolean;
    className?: string;
    error?: boolean;
    setFocus?: (data: boolean) => void;
    calcHeight?: boolean;
    calcHeightCb?: () => void;
    minHeight?: () => number;
    maxHeight?: () => number;
    updatedKey?: any;
    concat?: ConcatT;
    dateWithPast?: boolean;
    max?: number;
    typeValue?: string;
    withoutLabel?: boolean;
    regExp?: RegExp;
    maxLen?: number;
    isShowSupportInFocus?: boolean;
    isStatic?: boolean;
    id?: string;
    isAmount?: boolean;
    readOnly?: boolean;
};

type StateT = {
    value?: string;
    startPos?: number | null;
    endPos?: number | null;
    isFocus?: boolean;
    id?: string;
};

type FieldT = {
    template: string;
    char: string;
    exp: RegExp;
};

type FieldRegsT = keyof typeof regs;

interface InputI extends React.Component {
    props: PropsT;
    state: StateT;

    input: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
    parent: React.RefObject<HTMLDivElement | null>;
    isInit?: boolean;
    updatedKey?: any;
    pressShift?: boolean;

    regs: Record<FieldRegsT, FieldT>;

    savePos(this: InputI): void;
    checkSpecChar(this: InputI, data: { char: string; index: number }): boolean;
    validateReg(this: InputI, value: string): string;
    changeReg(this: InputI, data: { value: string }): { value: string; position?: number };
    setAreaHeight(this: InputI): void;
    changeRegExp(this: InputI, value: string): string;
    change(this: InputI, e: ChangeEvent): Promise<void>;
    focus(this: InputI, isFocus: boolean): void;
    clearValue(this: InputI, value: string, start?: boolean): string;
    setValue(this: InputI, value: string, start?: boolean): string;
    resize(this: InputI): void;
    getConcat(this: InputI, value: string): string;

    init(this: InputI, force?: boolean): void;
}

export default InputI;

export type { ConcatT as InputConcatT, FieldRegsT };
