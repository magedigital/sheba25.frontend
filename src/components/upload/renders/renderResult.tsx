import React from 'react';

import Fade from '@components/fade/Fade.tsx';
import Icon from '@components/icon/Icon.tsx';

import I from '../types.ts';

const renderResult: I['renderResult'] = function () {
    const { fileName, onChange } = this.props;

    return (
        <Fade className="upload__result _FULL _COL _COL_CENTER" isShow={!!fileName}>
            <p className="upload__resultName">{fileName}</p>
            <label className="upload__resultButton _CLICK">
                <input type="file" onChange={onChange} accept=".jpg,.jpeg,.png" />
                <i className="upload__resultButtonIcon">
                    <Icon name="upload" />
                </i>
                Загрузить другое фото
            </label>
        </Fade>
    );
};

export default renderResult;
