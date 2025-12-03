import React from 'react';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    return (
        <div className="page__head _COL _COL_H_CENTER">
            <h3 className="page__title _TITLE">Анкета</h3>
            <p className="page__description">
                Для получения приза, пожалуйста, заполните все поля и&nbsp;приложите необходимые
                документы:
            </p>
        </div>
    );
};

export default renderHead;
