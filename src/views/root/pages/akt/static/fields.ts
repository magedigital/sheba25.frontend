const fields = {
    act: {
        support: 'Скан подписанного акта',
        fieldType: 'upload',
    },
    policy: {
        support: () =>
            'Я соглашаюсь с <a href="/upload/docs/politics-anket.pdf" target="_blank">политикой конфиденциальности</a> и\xa0условиями обработки персональных данных*',
        fieldType: 'checkbox',
    },
} as const;

export default fields;
