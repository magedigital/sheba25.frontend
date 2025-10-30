import React from 'react';

import MobAuthI from './types.ts';

class MobAuth extends React.Component<MobAuthI['props'], MobAuthI['state']> implements MobAuthI {
    parent: MobAuthI['parent'];

    constructor(props: MobAuthI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { children } = this.props;

        return (
            <div ref={this.parent} className="mobAuth">
                <img
                    src={require('@media/mob-banner.svg').default}
                    alt=""
                    className="mobAuth__image"
                />
                <div className="mobAuth__inner">{children}</div>
            </div>
        );
    }
}

export default MobAuth;
