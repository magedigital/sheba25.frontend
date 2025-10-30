const regs = {
    date: {
        template: '__.__.____',
        char: '_',
        exp: /[^\d]/gi,
    },
    dateAndTime: {
        template: '__.__.____ __:__',
        char: '_',
        exp: /[^\d]/gi,
    },
    datePeriod: {
        template: '__.__.____ – __.__.____',
        char: '_',
        exp: /[^\d]/gi,
    },
    monthDate: {
        template: '__.____',
        char: '_',
        exp: /[^\d]/gi,
    },
    time: {
        template: '__:__',
        char: '_',
        exp: /[^\d]/gi,
    },
    phone: {
        template: '+7 (___) ___-__-__',
        char: '_',
        exp: /[^\d]/gi,
    },
    code: {
        template: '_ _ _ _ _',
        char: '_',
        exp: /[^\d]/gi,
    },
    pointTime: {
        template: 'Доставка в __:__',
        char: '_',
        exp: /[^\d]/gi,
    },
    passport: {
        template: '____ ______',
        char: '_',
        exp: /[^\d]/gi,
    },
} as const;

export default regs;
