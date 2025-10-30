import React from 'react';

import CloseBtn from '@components/closeBtn/CloseBtn.tsx';
import Media from '@components/media/Media.tsx';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    const { isConfirm } = this.state;

    return (
        <div className="popup__head _COL _COL_H_CENTER">
            <div className="popup__title">
                {isConfirm ? 'Необходимо подтвердить Email' : 'Получение пароля'}
            </div>
            {!isConfirm && (
                <p className="popup__description">
                    Если Вы ещё не регистрировались или&nbsp;забыли пароль для&nbsp;входа в Личный
                    кабинет
                </p>
            )}

            <Media current="desktop">
                <div className="popup__close">
                    <CloseBtn />
                </div>
            </Media>
        </div>
    );
};

export default renderHead;
