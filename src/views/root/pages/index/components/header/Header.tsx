import React from 'react';
import { connect } from 'react-redux';

import Button from '@components/button/Button.tsx';
import changePage from '@functions/changePage.ts';

import HeaderI from './types.ts';

class Header extends React.Component<HeaderI['props'], HeaderI['state']> implements HeaderI {
    parent: HeaderI['parent'];

    constructor(props: HeaderI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        return (
            <div ref={this.parent} className="indexHeader _SECTION _ANIM" data-delay="100">
                <div className="indexHeader__slogan _ANIM _DEFAULT" data-delay="300">
                    <div className="indexHeader__sloganLight" />
                </div>
                <div className="indexHeader__content _ANIM _DEFAULT" data-delay="400">
                    <div className="indexHeader__button">
                        <Button
                            className="_main _light"
                            onClick={() => {
                                changePage({ pageName: 'cheque' });
                            }}
                        >
                            ЗАГРУЗИТЬ ЧЕК
                        </Button>
                    </div>
                    <p className="indexHeader__text">с 01 ноября по 30 ноября 2025</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Header);
