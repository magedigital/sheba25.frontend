import React from 'react';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    return (
        <div className="popup__content _FULL_W">
            {this.renderFields()}
            {this.renderSocials()}
            {this.renderFoot()}
        </div>
    );
};

export default renderContent;
