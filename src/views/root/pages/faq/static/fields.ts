const fields = {
    question: {
        support: 'Ваш вопрос',
        textarea: true,
    },
    email: {
        support: 'E-mail для получения ответа',
    },
    name: {
        support: 'Как к Вам обращаться',
    },
    policy: {
        support: () =>
            'Я соглашаюсь с <a href="/upload/docs/politics-feedback.pdf" target="_blank">политикой конфиденциальности</a> и\xa0<a href="/upload/docs/feedback-conditions.pdf" target="_blank">условиями обработки персональных данных</a>',
        fieldType: 'checkbox',
    },
} as const;

export default fields;
