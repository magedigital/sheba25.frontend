import React from 'react';

import AnketForm from '@components/anketForm/AnketForm.tsx';
import { FieldT } from '@components/anketForm/types.ts';
import clearPhone from '@functions/clearPhone.ts';

import I from '../types.ts';

const renderForm: I['renderForm'] = function () {
    const { error, anket } = this.state;
    const { user } = this.props;

    const fields: FieldT[] = [];

    const defaultData: Record<string, any> = {};

    // console.log(user?.extraDataRequired);

    if (user?.extraDataRequired) {
        Object.keys(user.extraDataRequired).forEach((name) => {
            const field = user.extraDataRequired![name];
            let reg;
            let regExp;

            if (field.type === 'phone') {
                reg = 'phone' as const;
            }

            if (field.type === 'date') {
                reg = 'date' as const;
            }

            if (name === 'passportSeriesNumber') {
                reg = 'passport' as const;
            }

            if (name === 'inn') {
                regExp = /\D/gi;
            }

            fields.push({
                name,
                support: field.title,
                reg,
                regExp,
                dateWithPast: true,
                withAddress: field.type === 'address',
                fieldType:
                    field.type === 'photo'
                        ? 'upload'
                        : name === 'deliveryAddress'
                          ? 'addressPoint'
                          : undefined,
            });

            if (typeof field.value === 'string') {
                defaultData[name] = field.value;

                if (name === 'phone') {
                    defaultData[name] = clearPhone(field.value);
                }

                if (anket && anket[name] !== undefined) {
                    defaultData[name] = anket[name] as string;
                }
            }

            if (field.type === 'photo') {
                defaultData[name] = field.value;
            }
        });
    }

    fields.push({
        name: 'policy',
        support: () =>
            'Я соглашаюсь с политикой конфиденциальности и\xa0условиями обработки персональных данных*',
        fieldType: 'checkbox',
    });

    return (
        <div className="page__form _FULL_W">
            <AnketForm
                defaultData={defaultData}
                fields={fields}
                send={this.sendForm.bind(this)}
                buttonText="Сохранить данные"
                requireSupport={true}
                error={error}
                upload={this.uploadHandler.bind(this)}
            />
        </div>
    );
};

export default renderForm;
