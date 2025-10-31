import React from 'react';

import Prize from '../components/prize/Prize.tsx';

import I from '../types.ts';

const renderPrizes: I['renderPrizes'] = function () {
    const { data } = this.state;
    const { user } = this.props;

    if (!data || data.prizes.length === 0) {
        return;
    }

    return (
        <div className="profile__prizes _FULL_W _COL _COL_H_CENTER">
            <h3 className="profile__prizesTitle _TITLE _TITLE_MED">мои призы</h3>
            <div className="profile__prizesCards">
                {data.prizes.map((prize, key) => (
                    <div className="profile__prizesCard" key={key}>
                        <Prize user={user!} prize={prize} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default renderPrizes;
