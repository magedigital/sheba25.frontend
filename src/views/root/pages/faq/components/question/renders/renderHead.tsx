import React from 'react';

import Icon from '@components/icon/Icon.tsx';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    const { question } = this.props;

    return (
        <div
            className="faqQuestion__head _FULL_W _CLICK"
            onClick={() => {
                this.dropHandler();
            }}
        >
            <div className="faqQuestion__headInner _FULL_W">
                <div className="faqQuestion__headNumber _COL _COL_CENTER">{question.key}</div>
                <div className="faqQuestion__headTitle">{question.title}</div>
                <i className="faqQuestion__headIcon">
                    <Icon name="faq-drop" />
                </i>
            </div>
        </div>
    );
};

export default renderHead;
