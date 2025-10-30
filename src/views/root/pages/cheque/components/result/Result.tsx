import React from 'react';
import { connect } from 'react-redux';

import Button from '@components/button/Button.tsx';
import changePage from '@functions/changePage.ts';

import ChequeResultI from './types.ts';

class ChequeResult
    extends React.Component<ChequeResultI['props'], ChequeResultI['state']>
    implements ChequeResultI
{
    parent: ChequeResultI['parent'];

    constructor(props: ChequeResultI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { setStep } = this.props;

        return (
            <div ref={this.parent} className="popup__block _COL _COL_H_CENTER">
                <div className="popup__success _FULL_W _COL _COL_H_CENTER _bottom">
                    <div className="popup__successTitle">УСПЕШНО!</div>
                    <div className="popup__successText">
                        Твой чек отправлен на проверку. <br className="_DESKTOP" />
                        Ты получишь ответ на E-mail в течение <br className="_DESKTOP" />
                        3-х дней.
                    </div>
                </div>
                <div className="popup__buttons _ROW">
                    <div className="popup__button _fix">
                        <Button
                            onClick={() => {
                                setStep('start', undefined);
                            }}
                            className="_mainEmpty"
                        >
                            Ещё чек
                        </Button>
                    </div>
                    <div className="popup__button _fix">
                        <Button
                            onClick={() => {
                                changePage({ pageName: 'profile' });

                                if (window.Telegram) {
                                    window.Telegram.WebApp?.close();
                                }
                            }}
                            className="_main"
                        >
                            Закрыть окно
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

export default connect(mapStateToProps)(ChequeResult);
