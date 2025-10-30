import React from 'react';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    const { isShow, contentHeight } = this.state;
    const { question } = this.props;

    return (
        <div
            className="faqQuestion__content _FULL_W"
            style={{ height: isShow ? `${contentHeight}px` : '0px' }}
        >
            <div
                className="faqQuestion__contentInner _FULL_W"
                dangerouslySetInnerHTML={{ __html: question.description }}
            ></div>
        </div>
    );
};

export default renderContent;
