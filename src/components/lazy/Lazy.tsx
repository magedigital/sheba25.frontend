import React from 'react';
import { connect } from 'react-redux';

import { StoreT } from '@global/types.ts';

import LazyI from './types.ts';

class Lazy extends React.Component<LazyI['props'], LazyI['state']> implements LazyI {
    parent: LazyI['parent'];

    constructor(props: LazyI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { children, name, canLoadImages } = this.props;

        if (!canLoadImages[name]) {
            return;
        }

        return <>{children}</>;
    }
}

function mapStateToProps(state: StoreT) {
    return {
        canLoadImages: state.canLoadImages,
    };
}

export default connect(mapStateToProps)(Lazy);
