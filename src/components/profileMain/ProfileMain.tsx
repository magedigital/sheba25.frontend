import React from 'react';
import { connect } from 'react-redux';

import changePage from '@functions/changePage.ts';
import { StoreT } from '@global/types.ts';

import ProfileMainI from './types.ts';

import requestLogout from './requests/requestLogout.ts';

class ProfileMain
    extends React.Component<ProfileMainI['props'], ProfileMainI['state']>
    implements ProfileMainI
{
    parent: ProfileMainI['parent'];

    constructor(props: ProfileMainI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    requestLogout = requestLogout;

    render() {
        const { user } = this.props;

        return (
            <div ref={this.parent} className="profileMain _FULL _BACK">
                <div className="profileMain__top">
                    <p className="profileMain__name">
                        {user?.personal.firstName} {user?.personal.lastName}
                    </p>
                    <div className="profileMain__id">ID 4362</div>
                </div>
                <div className="profileMain__actions">
                    <div className="profileMain__action">
                        <div
                            className="profileMain__actionInner _CLICK"
                            onClick={() => {
                                changePage({ pageName: 'anket' });
                            }}
                        >
                            Изменить данные
                        </div>
                    </div>
                    <div className="profileMain__action _exit">
                        <div
                            className="profileMain__actionInner _CLICK"
                            onClick={this.requestLogout.bind(this)}
                        >
                            Выход
                        </div>
                    </div>

                    <div className="profileMain__action _history">
                        <div className="profileMain__actionInner _CLICK">История</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(ProfileMain);
