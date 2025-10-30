import React from 'react';

import CloseBtn from '@components/closeBtn/CloseBtn.tsx';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    return (
        <div className="popup__head _COL _COL_H_CENTER">
            <div className="popup__title">Вход в личный кабинет</div>
            <p className="popup__description">Необходима авторизация</p>
            <div className="popup__close">
                <CloseBtn />
            </div>
        </div>
    );
};

export default renderHead;
