import React from 'react';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    return (
        <div className="page__content _COL _COL_H_CENTER">
            {this.renderHead()}
            {this.renderForm()}
        </div>
    );
};

export default renderContent;
