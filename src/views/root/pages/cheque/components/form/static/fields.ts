import { FieldRegsT } from '@components/input/types';

const fields = {
    date: {
        support: 'Дата на чеке',
        inputSupport: '__.__.____',
        reg: 'date',
        dateWithPast: true,
    },
    time: {
        support: 'Время на чеке',
        inputSupport: '__:__',
        reg: 'time',
        dateWithPast: true,
    },
    amount: {
        support: 'Сумма на чеке',
        isAmount: true,
    },
    fn: {
        support: 'ФН',
        regExp: /\D/gi,
    },
    fp: {
        support: 'ФП',
        regExp: /\D/gi,
    },
    fd: {
        support: 'ФД',
        regExp: /\D/gi,
    },
} as const;

type FieldT = {
    support: string;
    inputSupport: string;
    reg?: FieldRegsT;
    regExp?: RegExp;
    dateWithPast?: boolean;
    isAmount?: boolean;
};

export default fields;
export type { FieldT };
