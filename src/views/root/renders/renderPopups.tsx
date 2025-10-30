import React from 'react';

import PopupWrapper from '@components/popups/popupWrapper/PopupWrapper.tsx';

import I from '../types.ts';

const renderPopups: I['renderPopups'] = function () {
    const { callFormSuccess } = this.props;

    return (
        <>
            <PopupWrapper name="callFormSuccess" isShow={callFormSuccess.isShow} />
        </>
    );
};

export default renderPopups;
