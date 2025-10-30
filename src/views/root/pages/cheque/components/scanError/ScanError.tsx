import React from 'react';
import { connect } from 'react-redux';

import Button from '@components/button/Button.tsx';
import Error from '@components/error/Error.tsx';

import ScanErrorI from './types.ts';

class ScanError
    extends React.Component<ScanErrorI['props'], ScanErrorI['state']>
    implements ScanErrorI
{
    parent: ScanErrorI['parent'];

    constructor(props: ScanErrorI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { setStep, uploadQr, setRenderKey } = this.props;

        return (
            <div ref={this.parent} className="popup__block _COL _COL_H_CENTER">
                <div className="popup__scanError _FULL_W _COL _COL_H_CENTER">
                    <p className="popup__scanErrorText">Ошибка</p>
                    <Error
                        className="popup__scanErrorValue"
                        error="Неверный QR-код"
                        callback={setRenderKey}
                    />
                    <div className="popup__scanErrorButton">
                        <Button label={true} onClick={() => undefined} className="_green">
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={uploadQr}
                                style={{ display: 'none' }}
                            />
                            Попробовать другой чек
                        </Button>
                    </div>
                </div>
                <div className="popup__buttons _ROW">
                    <div className="popup__button _big">
                        <Button
                            onClick={() => {
                                setStep('form', 'typing');
                            }}
                            className="_mainEmpty"
                        >
                            Ввести данные <br className="_DESKTOP" />
                            вручную
                        </Button>
                    </div>
                    <div className="popup__button _big">
                        <Button label={true} onClick={() => undefined} className="_main">
                            <input
                                type="file"
                                accept="jpg,jpeg,png"
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

export default connect(mapStateToProps)(ScanError);
