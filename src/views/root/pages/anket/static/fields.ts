const fields = {
    firstName: {
        support: 'Имя*',
    },
    secondName: {
        support: 'Фамилия*',
    },
    phone: {
        support: 'Номер мобильного телефона*',
        reg: 'phone',
    },
    lentaCard: {
        support: 'Номер карты Лента*',
        regExp: /\D/gi,
        maxLen: 12,
    },
    password: {
        support: 'Пароль*',
        type: 'password',
    },
    password2: {
        support: 'Повтор пароля*',
        type: 'password',
    },
    policy: {
        support: () =>
            'Я соглашаюсь с <a href="/upload/docs/politics-anket.pdf" target="_blank">политикой конфиденциальности</a> и\xa0условиями обработки персональных данных*',
        fieldType: 'checkbox',
    },
    mailing: {
        support: 'Я соглашаюсь получать рассылку с\xa0новостями акции*',
        fieldType: 'checkbox',
    },
} as const;

export default fields;
