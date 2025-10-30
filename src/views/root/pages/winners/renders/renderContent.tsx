import React from 'react';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    return (
        <div className="page__content _FULL_W _COL _COL_H_CENTER">
            {this.renderHead()}
            {this.renderWinners()}
        </div>
    );
};

export default renderContent;
