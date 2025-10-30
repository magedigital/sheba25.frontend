import React from 'react';

import Icon from '@components/icon/Icon.tsx';

import I from '../types.ts';

const renderView: I['renderView'] = function () {
    const value = this.getValue();

    return (
        <div
            className="select__view _FULL _CLICK"
            onClick={() => {
                this.dropHandler();
            }}
        >
            <div className="select__viewInner _FULL_W">{value}</div>
            <i className="select__viewIcon">
                <Icon name="faq-drop" />
            </i>
        </div>
    );
};

export default renderView;
