import React from 'react';

import I from '../types.ts';

const renderWinners: I['renderWinners'] = function () {
    return (
        <div className="winners _FULL_W _COL _COL_H_CENTER">
            {this.renderFilter()}
            {this.renderTable()}
        </div>
    );
};

export default renderWinners;
