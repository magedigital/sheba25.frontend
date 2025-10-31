import React from 'react';

import AnketForm from '@components/anketForm/AnketForm.tsx';
import { FieldT } from '@components/anketForm/types.ts';

import I from '../types.ts';

const renderForm: I['renderForm'] = function () {
    const { error } = this.state;
    const { user } = this.props;
    const fields = (Object.keys(this.fields) as (keyof typeof this.fields)[]).map((name) => ({
        name,
        ...this.fields[name],
    })) as FieldT[];

    return (
        <div className="page__form _FULL_W">
            <AnketForm
                defaultData={
                    user
                        ? {
                              firstName: user.personal.firstName,
                              secondName: user.personal.lastName,
                              phone: user.personal.phone,
                              mailing: user.mailing === '1',
                              lentaCard: user.lentaCard,
                          }
                        : {}
                }
                fields={fields}
                send={this.sendForm.bind(this)}
                buttonText="Завершить регистрацию"
                requireSupport={true}
                error={error}
            />
        </div>
    );
};

export default renderForm;
