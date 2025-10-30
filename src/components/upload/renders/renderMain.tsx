import React from 'react';

import Icon from '@components/icon/Icon.tsx';

import I from '../types.ts';

const renderMain: I['renderMain'] = function () {
    const { onChange } = this.props;

    return (
        <label className="upload__main _FULL _COL _COL_CENTER _CLICK">
            <input type="file" onChange={onChange} accept=".jpg,.jpeg,.png" />
            <i className="upload__mainIcon">
                <Icon name="upload" />
            </i>
            <p className="upload__mainDescription">
                Нажмите сюда для загрузки файла <br className="_DESKTOP" />
                или перенесите его в это окно
            </p>
        </label>
    );
};

export default renderMain;
