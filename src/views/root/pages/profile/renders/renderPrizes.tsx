import React from 'react';

import I from '../types.ts';

const renderPrizes: I['renderPrizes'] = function () {
    const { data } = this.state;

    if (!data || data.prizes.length === 0) {
        return;
    }

    return (
        <div className="profile__prizes _FULL_W _COL _COL_H_CENTER">
            <h3 className="profile__prizesTitle _TITLE _TITLE_MEDIUM">Мой приз</h3>
            <div className="profile__prizesCards">
                <div className="profile__prizesCard">{this.renderPrize()}</div>
            </div>
        </div>
    );
};

export default renderPrizes;
