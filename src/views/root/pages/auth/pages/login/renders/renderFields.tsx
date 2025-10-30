import React from 'react';

import Field from '@components/field/Field.tsx';
import Link from '@components/link/Link.tsx';

import I from '../types.ts';

const renderFields: I['renderFields'] = function () {
    const { model } = this.state;

    if (!model) {
        return;
    }

    return (
        <div className="popup__form _FULL_W">
            <div className="popup__formField _FULL_W">
                <Field
                    support="E-mail:"
                    name="login"
                    inputSupport=""
                    value={this.getValue({ key: 'login' })?.value || ''}
                    onChange={async ({ value }) => {
                        await this.change({ login: value });
                    }}
                />
            </div>
            <div className="popup__formField _FULL_W _COL">
                <div className="popup__formFieldBox _FULL_W">
                    <Field
                        support="Пароль:"
                        name="password"
                        type="password"
                        value={this.getValue({ key: 'password' })?.value || ''}
                        onChange={async ({ value }) => {
                            await this.change({ password: value });
                        }}
                    />
                </div>
                <Link className="popup__formFieldLink _CLICK" pageName="auth-password">
                    Забыли пароль?
                </Link>
            </div>
        </div>
    );
};

export default renderFields;
