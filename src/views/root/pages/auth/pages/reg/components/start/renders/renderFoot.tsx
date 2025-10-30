import React from 'react';

import Button from '@components/button/Button.tsx';
import Error from '@components/error/Error.tsx';
import changePage from '@functions/changePage.ts';

import I from '../types.ts';

const renderFoot: I['renderFoot'] = function () {
    const { error, loadingKey } = this.state;
    const { setRenderKey, isConfirm } = this.props;

    return (
        <div className="popup__foot _FULL_W _COL _COL_H_CENTER">
            <Error className="popup__error" error={error} callback={setRenderKey} />
            <div className="popup__buttons _FULL_W _ROW _ROW_H_CENTER">
                {!isConfirm && (
                    <div className="popup__button">
                        <Button
                            className="_mainEmpty"
                            onClick={() => {
                                changePage({ pageName: 'auth-login' });
                            }}
                        >
                            личный кабинет
                        </Button>
                    </div>
                )}

                <div className="popup__button">
                    <Button
                        className="_main"
                        onClick={this.sendForm.bind(this)}
                        loading={loadingKey === 'send'}
                    >
                        {isConfirm ? 'Получить код' : 'Получить пароль'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default renderFoot;
