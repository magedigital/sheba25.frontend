import React from 'react';

import Field from '@components/field/Field.tsx';

import I from '../types.ts';

const renderForm: I['renderForm'] = function () {
    const { device } = this.props;

    return (
        <div className="popup__height _COL _COL_V_CENTER">
            <div className="popup__form _FULL_W">
                <div className="popup__formField _FULL_W">
                    <Field
                        support={
                            device === 'desktop'
                                ? 'Адрес электронной почты (Ваш логин):'
                                : 'Email (Ваш логин):'
                        }
                        name="login"
                        value={this.getValue({ key: 'login' })?.value || ''}
                        onChange={async ({ value }) => {
                            await this.change({ login: value });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default renderForm;
