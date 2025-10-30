import React from 'react';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    return (
        <div className="profile _SECTION">
            <div className="profile__inner _INNER">
                {this.renderMain()}
                {this.renderCheques()}
                {this.renderPrizes()}
            </div>
        </div>
    );
};

export default renderContent;
