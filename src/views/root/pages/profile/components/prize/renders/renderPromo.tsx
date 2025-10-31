import React from 'react';

import Icon from '@components/icon/Icon.tsx';
import copyInBuffer from '@functions/copyInBuffer.ts';

import I from '../types.ts';

const renderPromo: I['renderPromo'] = function () {
    const { prize } = this.props;

    return (
        <div className="prize__promo _FULL _COL _COL_H_CENTER">
            <h4 className="prize__promoTitle">{prize.title}:</h4>
            <div className="prize__promoCode">{prize.promoCode}</div>
            <div
                className="prize__promoCopy _CLICK"
                onClick={() => {
                    copyInBuffer(prize.promoCode!);
                }}
            >
                <i>
                    <Icon name="copy" />
                </i>
                скопировать
            </div>
            <a href={prize.url} className="prize__promoLink" target="_blank" rel="noreferrer">
                Как использовать?
            </a>
            <div
                className="prize__promoClose _CLICK"
                onClick={() => {
                    this.promoHandler(false);
                }}
            >
                Перевернуть
            </div>
        </div>
    );
};

export default renderPromo;
