import React from 'react';
import { connect } from 'react-redux';

import WeekPrizesI from './types.ts';

class WeekPrizes
    extends React.Component<WeekPrizesI['props'], WeekPrizesI['state']>
    implements WeekPrizesI
{
    parent: WeekPrizesI['parent'];

    constructor(props: WeekPrizesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    prizes = [
        { thumb: 'Prize-1.png', name: 'сертификат выбирай.card' },
        { thumb: 'Prize-2.png', name: 'сертификат smeg' },
        { thumb: 'Prize-3.png', name: 'сертификат pandora' },
        { thumb: 'Prize-4.png', name: 'сертификат лента' },
    ];

    partners = [
        'logo-sheba.png',
        'logo-cesar.png',
        'logo-dreamies.png',
        'logo-perfectfit.png',
        'logo-chappi.png',
        'logo-kitekat.png',
        'logo-whiskas.png',
        'logo-naturetable.png',
        'logo-pedigree.png',
    ];

    render() {
        return (
            <div ref={this.parent} className="indexWeekPrizes _SECTION">
                <div className="indexWeekPrizes__inner _INNER">
                    <h3 className="indexWeekPrizes__title _TITLE">еженедельные призы</h3>
                    <div className="indexWeekPrizes__cards">
                        {this.prizes.map((prize, i) => (
                            <div className="indexWeekPrizes__card" key={i}>
                                <div className="indexWeekPrizes__cardHead">
                                    <img
                                        src={require(`@media/${prize.thumb}`)}
                                        alt=""
                                        className="indexWeekPrizes__cardImage"
                                    />
                                </div>
                                <p
                                    className="indexWeekPrizes__cardName"
                                    dangerouslySetInnerHTML={{ __html: prize.name }}
                                ></p>
                            </div>
                        ))}
                    </div>
                    <div className="indexWeekPrizes__partners">
                        <p className="indexWeekPrizes__partnersTitle">* в акции участвуют</p>
                        <div className="indexWeekPrizes__partnersItems">
                            {this.partners.map((partner, i) => (
                                <div className="indexWeekPrizes__partnersItem" key={i}>
                                    <img
                                        src={require(`@media/${partner}`)}
                                        alt=""
                                        className="indexWeekPrizes__partnersItemImage"
                                    />
                                </div>
                            ))}
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

export default connect(mapStateToProps)(WeekPrizes);
