import React from 'react';
import { connect } from 'react-redux';

import { StoreT } from '@global/types.ts';

import MediaI from './types.ts';

class Media extends React.Component<MediaI['props'], MediaI['state']> implements MediaI {
    constructor(props: MediaI['props']) {
        super(props);
        this.state = {};
    }

    render() {
        const { device, current, children } = this.props;

        if (
            (current === 'desktop' && device === 'mobile') ||
            (current === 'mobile' && device === 'desktop')
        ) {
            return <></>;
        }

        return <>{children}</>;
    }
}

function mapStateToProps(state: StoreT) {
    return {
        device: state.device,
    };
}

export default connect(mapStateToProps)(Media);
