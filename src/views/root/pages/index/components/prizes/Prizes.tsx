import React from 'react';
import { connect } from 'react-redux';

import { store } from '@redux/redux.ts';

import PrizesI from './types.ts';

class Prizes extends React.Component<PrizesI['props'], PrizesI['state']> implements PrizesI {
    parent: PrizesI['parent'];
    ship: PrizesI['ship'];

    constructor(props: PrizesI['props']) {
        super(props);
        this.state = {};

        this.scrollHandler = this.scrollHandler.bind(this);

        this.ship = React.createRef();
        this.parent = React.createRef();
    }

    scrollHandler() {
        const shipNode = this.ship.current;
        const device = store.getState().device;

        if (!shipNode) {
            return;
        }

        const { y, height } = shipNode.getBoundingClientRect();

        let cur = y + height;

        if (y - document.documentElement.clientHeight > 0) {
            cur = document.documentElement.clientHeight + height;
        }

        if (y + height < 0) {
            cur = 0;
        }

        const percent = +(1 - cur / (document.documentElement.clientHeight + height)).toFixed(3);

        shipNode.style.transform = `translate(${percent * (device === 'desktop' ? 150 : 100) - 100}rem,${-percent * 30 + 20}rem)`;
    }

    componentDidMount(): void {
        this.scrollHandler();

        window.addEventListener('scroll', this.scrollHandler, true);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        return (
            <div ref={this.parent} className="indexPrizes _SECTION">
                <div className="indexPrizes__inner _INNER_2">
                    <div className="indexPrizes__main _COL" data-ancor="prizes">
                        <h3
                            className="indexPrizes__mainTitle _TITLE _ANIM _DEFAULT"
                            data-delay="100"
                        >
                            главный приз
                        </h3>
                        <div className="indexPrizes__mainPrize _COL _ANIM _DEFAULT">
                            <div className="indexPrizes__mainPrizeInner _COL">
                                <div ref={this.ship} className="indexPrizes__mainPrizeShip"></div>
                                <div className="indexPrizes__mainPrizeContent">
                                    <p className="indexPrizes__mainPrizeSupport">ВЫИГРАЙ</p>
                                    <div className="indexPrizes__mainPrizeTitle">
                                        <div className="indexPrizes__mainPrizeTitleItem"></div>
                                    </div>
                                    <p className="indexPrizes__mainPrizeText">НА КРУИЗ МЕЧТЫ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="indexPrizes__sub _COL">
                        <h3
                            className="indexPrizes__subTitle _TITLE _ANIM _DEFAULT"
                            data-delay="100"
                        >
                            гарантированный приз
                        </h3>
                        <div className="indexPrizes__subPrize _ANIM _DEFAULT" data-delay="200">
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
