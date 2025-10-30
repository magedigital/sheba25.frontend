import React from 'react';

import AnketForm from '@components/anketForm/AnketForm.tsx';
import { FieldT } from '@components/anketForm/types.ts';
import Fade from '@components/fade/Fade.tsx';

import I from '../types.ts';

const renderForm: I['renderForm'] = function () {
    const { isSuccess, userName, error } = this.state;
    const fields = (Object.keys(this.fields) as (keyof typeof this.fields)[]).map((name) => ({
        name,
        ...this.fields[name],
    })) as FieldT[];

    return (
        <div
            className={`faq__form _FULL_W _COL _COL_H_CENTER _BACK ${isSuccess ? '_success' : ''}`}
        >
            <Fade className="faq__formSuccess" isShow={!!isSuccess}>
                <h3 className="faq__formSuccessTitle">Спасибо, {userName}!</h3>
                <p className="faq__formSuccessText">
                    {`Сообщение отправлено, мы\xa0свяжемся с\xa0тобой в\xa0ближайшее время`}
                </p>
            </Fade>
            <div className="faq__formInner">
                <h4 className="faq__formTitle _FULL_W">
                    Если вы не нашли ответа на&nbsp;свой <br className="_DESKTOP" />
                    вопрос, свяжитесь с&nbsp;нами
                </h4>
                <AnketForm
                    fields={fields}
                    send={this.sendForm.bind(this)}
                    error={error}
                    buttonText="Отправить"
                />
            </div>
        </div>
    );
};

export default renderForm;
