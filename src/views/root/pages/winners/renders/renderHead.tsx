import React from 'react';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    return (
        <div className="page__head _COL _COL_H_CENTER">
            <h3 className="page__title _TITLE">Победители розыгрышей</h3>
        </div>
    );
};

export default renderHead;
