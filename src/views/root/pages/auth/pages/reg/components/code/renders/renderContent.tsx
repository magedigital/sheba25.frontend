import React from 'react';

import CodeInputs from '@components/codeInputs/CodeInputs.tsx';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    const { loadingKey } = this.state;
    const { login, isConfirm, mailService } = this.props;
    const LinkTag = mailService ? 'a' : 'div';
    const linkProps = mailService ? { href: mailService, target: '_blank' } : {};

    return (
        <div className="popup__code _COL _COL_H_CENTER">
            <div className="popup__codeText _COL _COL_H_CENTER">
                Мы отправили сообщение на&nbsp;твой адрес:
                <div className="popup__codeEmail">{login}</div>
                <span>
                    Пожалуйста, <LinkTag {...linkProps}>проверь почтовый ящик</LinkTag>
                    <br />и введи код {isConfirm ? ':' : 'для сброса пароля ниже:'}
                </span>
            </div>
            <div className="popup__codeInputs">
                <CodeInputs
                    length={6}
                    loading={loadingKey === 'send'}
                    callback={async (code) => {
                        await setAsyncState.call(this, { code });
                        await this.sendForm();
                    }}
                />
            </div>
        </div>
    );
};

export default renderContent;
