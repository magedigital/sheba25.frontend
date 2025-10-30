import React from 'react';
import { connect } from 'react-redux';

import PrizesI from './types.ts';

class Prizes extends React.Component<PrizesI['props'], PrizesI['state']> implements PrizesI {
    parent: PrizesI['parent'];

    constructor(props: PrizesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        return (
            <div ref={this.parent} className="indexPrizes _SECTION">
                <div className="indexPrizes__inner _INNER_2">
                    <div className="indexPrizes__main _COL" data-ancor="prizes">
                        <h3 className="indexPrizes__mainTitle _TITLE">главный приз</h3>
                        <div className="indexPrizes__mainPrize _COL">
                            <div className="indexPrizes__mainPrizeInner _COL">
                                <div className="indexPrizes__mainPrizeContent">
                                    <p className="indexPrizes__mainPrizeSupport">ВЫИГРАЙ</p>
                                    <div className="indexPrizes__mainPrizeTitle"></div>
                                    <p className="indexPrizes__mainPrizeText">НА КРУИЗ МЕЧТЫ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="indexPrizes__sub _COL">
                        <h3 className="indexPrizes__subTitle _TITLE">гарантированный приз</h3>
                        <div className="indexPrizes__subPrize">
                            <p className="indexPrizes__subPrizeText">
                                Каждый участник гарантированно получит <b>60 баллов</b> на карту
                                «Лента»
                            </p>
                            <img
                                src={require('@media/prize-big-1.png')}
                                alt=""
                                className="indexPrizes__subPrizeImage"
                            />
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

export default connect(mapStateToProps)(Prizes);
