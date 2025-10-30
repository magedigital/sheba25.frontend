import React from 'react';

import CloseBtn from '@components/closeBtn/CloseBtn.tsx';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    return (
        <div className="popup__head _COL _COL_H_CENTER">
            <div className="popup__title">Регистрация чека</div>
            <div className="popup__close">
                <CloseBtn />
            </div>
        </div>
    );
};

export default renderHead;
