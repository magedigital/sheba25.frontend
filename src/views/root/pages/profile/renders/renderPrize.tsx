import React from 'react';

import I from '../types.ts';

const renderPrize: I['renderPrize'] = function () {
    return (
        <div className="profile__prize _FULL_W _COL _COL_H_CENTER">
            <div className="profile__prizeStatus _send">Отправлен</div>
            {/* <img src={require('@media/prize.png')} alt="" className="profile__prizeImage _FULL" /> */}
            <p className="profile__prizeName">Фотоаппарат моментальной печати</p>
        </div>
    );
};

export default renderPrize;
