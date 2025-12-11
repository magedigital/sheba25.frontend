import React from 'react';

import Fade from '@components/fade/Fade.tsx';

import I from '../types.ts';

const renderSuccess: I['renderSuccess'] = function () {
    const { isSuccess, successTitle, successDescription } = this.props;

    if (typeof isSuccess !== 'boolean') {
        return;
    }

    return (
        <Fade className="anketForm__success _FULL" isShow={!!isSuccess}>
            <div className="anketForm__successInner _FULL _COL _COL_CENTER">
                <div className="anketForm__successTitle">{successTitle}</div>
                <div className="anketForm__successDescription">{successDescription}</div>
            </div>
        </Fade>
    );
};

export default renderSuccess;
