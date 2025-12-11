import React from 'react';

import AnketForm from '@components/anketForm/AnketForm.tsx';
import { FieldT } from '@components/anketForm/types.ts';

import I from '../types.ts';

const renderForm: I['renderForm'] = function () {
    const { error, refreshKey } = this.state;
    const fields = (Object.keys(this.fields) as (keyof typeof this.fields)[]).map((name) => ({
        name,
        ...this.fields[name],
    })) as FieldT[];

    return (
        <div className="page__form _FULL_W" key={refreshKey}>
            <AnketForm
                fields={fields}
                send={this.sendForm.bind(this)}
                buttonText="Отправить на проверку"
                requireSupport={true}
                error={error}
                upload={this.uploadHandler.bind(this)}
                resetAct={this.resetAct.bind(this)}
            />
        </div>
    );
};

export default renderForm;
