import React from 'react';

import Button from '@components/button/Button.tsx';
import Error from '@components/error/Error.tsx';

import I from '../types.ts';

const renderFoot: I['renderFoot'] = function () {
    const { error, loadingKey } = this.state;
    const { setRenderKey } = this.props;

    return (
        <div className="popup__foot _FULL_W _COL _COL_H_CENTER">
            <Error className="popup__error" error={error} callback={setRenderKey} />
            <div className="popup__buttons _FULL_W _ROW _ROW_H_CENTER">
                <div className="popup__button _auto">
                    <Button
                        className="_main"
                        onClick={this.sendForm.bind(this, true)}
                        loading={loadingKey === 'again'}
                    >
                        Отправить код повторно
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default renderFoot;
