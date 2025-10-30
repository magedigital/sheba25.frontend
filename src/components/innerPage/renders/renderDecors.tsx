import React from 'react';

import I from '../types.ts';

const renderDecors: I['renderDecors'] = function (isInner) {
    return (
        <div className="innerPage__decors">
            {isInner ? (
                <>
                    <div className="innerPage__line _2 _inner _ROW _ROW_V_CENTER"></div>
                </>
            ) : (
                <>
                    <div className="innerPage__line _1 _ROW _ROW_V_CENTER"></div>
                    <div className="innerPage__line _2 _ROW _ROW_V_CENTER"></div>
                </>
            )}
        </div>
    );
};

export default renderDecors;
