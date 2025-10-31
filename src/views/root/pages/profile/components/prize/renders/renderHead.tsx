import React from 'react';

import changePage from '@functions/changePage.ts';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    const { prize } = this.props;

    return (
        <div className="prize__head _COL _FULL_W">
            {prize.status === 'DOWNLOAD' ? (
                <div className="prize__status">Получить</div>
            ) : prize.code === 'DOBRO' ? (
                <div className="prize__status _dobro">Спасибо</div>
            ) : prize.status === 'DATA_NEEDED' ? (
                <div
                    className="prize__status _CLICK"
                    onClick={() => {
                        changePage({
                            pageName: 'anket',
                            ids: { 1: prize.id },
                        });
                    }}
                >
                    {prize.statusTitle}
                </div>
            ) : (
                <div className="prize__status">{prize.statusTitle}</div>
            )}

            {prize.count && prize.code !== 'DOBRO' && (
                <div className="prize__count _COL _COL_H_CENTER">
                    <div className="prize__countInner _COL _COL_CENTER">{prize.count}</div>
                    <div className="prize__countSupport">шт</div>
                </div>
            )}
        </div>
    );
};

export default renderHead;
