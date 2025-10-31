import React from 'react';
import { connect } from 'react-redux';

import Button from '@components/button/Button.tsx';
import DashedBorder from '@components/dashedBorder/DashedBorder.tsx';
import Icon from '@components/icon/Icon.tsx';

import StartI from './types.ts';

class Start extends React.Component<StartI['props'], StartI['state']> implements StartI {
    parent: StartI['parent'];

    constructor(props: StartI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { setStep, uploadQr } = this.props;

        return (
            <div ref={this.parent} className="popup__block _COL _COL_H_CENTER">
                <div className="popup__cheque _COL _COL_H_CENTER">
                    <div
                        className="popup__chequeArea _FULL_W _COL _COL_H_CENTER _CLICK"
                        onClick={() => {
                            setStep('scan');
                        }}
                    >
                        <div className="popup__chequeAreaBorder">
                            <DashedBorder />
                        </div>
                        <i className="popup__chequeAreaIcon">
                            <Icon name="scan" />
                        </i>
                        <p className="popup__chequeAreaDescription">
                            Нажми, чтобы
                            <br />
                            отсканировать QR-код с чека
                        </p>
                    </div>
                </div>
                <div className="popup__buttons _ROW">
                    <div className="popup__button _big">
                        <Button
                            onClick={() => {
                                setStep('form', 'typing');
                            }}
                            className="_main2Empty"
                        >
                            Ввести данные <br className="_DESKTOP" />
                            вручную
                        </Button>
                    </div>
                    <div className="popup__button _big">
                        <Button label={true} onClick={() => undefined} className="_main">
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={uploadQr}
                                style={{ display: 'none' }}
                            />
                            Загрузить фото
                            <br className="_DESKTOP" /> QR-кода
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Start);
