import React from 'react';
import { connect } from 'react-redux';

import setSpacesInText from '@functions/setSpacesInText.ts';

import RulesI from './types.ts';

class Rules extends React.Component<RulesI['props'], RulesI['state']> implements RulesI {
    parent: RulesI['parent'];

    constructor(props: RulesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        return (
            <div ref={this.parent} className="indexRules _SECTION">
                <div className="indexRules__inner _INNER_2">
                    <div className="indexRules__offer">
                        <p
                            className="indexRules__offerText"
                            dangerouslySetInnerHTML={{
                                __html: setSpacesInText(
                                    '<b>Новый год</b> — это особенный повод, когда хочется выразить свою любовь и доставить удовольствие близким. <b>SHEBA®</b> знает,&nbsp;как доставить удовольствие Вашей кошке — предложить ей разнообразие изысканных блюд.',
                                ),
                            }}
                        ></p>
                        <p
                            className="indexRules__offerText"
                            dangerouslySetInnerHTML={{
                                __html: setSpacesInText(
                                    'В ноябре у вас есть возможность не только порадовать, но и получить подарки за покупки.',
                                ),
                            }}
                        ></p>
                    </div>
                    <div className="indexRules__content" data-ancor="rules">
                        <h2 className="indexRules__title _TITLE">как участвовать?</h2>
                        <div className="indexRules__steps">
                            <div className="indexRules__step">
                                <div className="indexRules__stepHead">
                                    <img
                                        src={require('@media/step-01.png')}
                                        alt=""
                                        className="indexRules__stepImage"
                                    />
                                </div>
                                <div className="indexRules__stepContent">
                                    <h4 className="indexRules__stepTitle">покупайте</h4>
                                    <p
                                        className="indexRules__stepText"
                                        dangerouslySetInnerHTML={{
                                            __html: setSpacesInText(
                                                'товары-участники* <br class="_MOBILE" />с картой Лента <br class="_DESKTOP" />на сумму от 300 руб.',
                                            ),
                                        }}
                                    ></p>
                                </div>
                            </div>
                            <div className="indexRules__step">
                                <div className="indexRules__stepHead">
                                    <img
                                        src={require('@media/step-02.png')}
                                        alt=""
                                        className="indexRules__stepImage"
                                    />
                                </div>
                                <div className="indexRules__stepContent">
                                    <h4 className="indexRules__stepTitle">регистрируйте чеки</h4>
                                    <p
                                        className="indexRules__stepText"
                                        dangerouslySetInnerHTML={{
                                            __html: setSpacesInText(
                                                'и получайте гарантированно <b>60&nbsp;баллов</b> на карту «Лента»',
                                            ),
                                        }}
                                    ></p>
                                </div>
                            </div>
                            <div className="indexRules__step">
                                <div className="indexRules__stepHead">
                                    <img
                                        src={require('@media/step-03.png')}
                                        alt=""
                                        className="indexRules__stepImage"
                                    />
                                </div>
                                <div className="indexRules__stepContent">
                                    <h4 className="indexRules__stepTitle">выигрывайте</h4>
                                    <p
                                        className="indexRules__stepText"
                                        dangerouslySetInnerHTML={{
                                            __html: setSpacesInText(
                                                'еженедельные <br />призы — <br class="_DESKTOP" />подарочные сертификаты',
                                            ),
                                        }}
                                    ></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Rules);
