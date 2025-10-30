import React from 'react';

import I from '../types.ts';

const renderFaq: I['renderFaq'] = function () {
    return (
        <>
            <div className="faq _FULL_W _COL _COL_H_CENTER">
                {this.renderQuestions()}
                {this.renderForm()}
            </div>
        </>
    );
};

export default renderFaq;
