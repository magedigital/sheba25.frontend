import { throttle } from 'throttle-debounce';

import React from 'react';
import { connect } from 'react-redux';

import { StoreT } from '@global/types.ts';

import checkChange from './methods/checkChange.ts';
import checkSizes from './methods/checkSizes.ts';
import drawItems from './methods/drawItems.ts';
import updateItems from './methods/updateItems.ts';

import ListI from './types.ts';

import renderItem from './renders/renderItem.tsx';

class List extends React.Component<ListI['props'], ListI['state']> implements ListI {
    parent: ListI['parent'];
    resizeThrottle: ListI['resizeThrottle'];
    id: ListI['id'];

    constructor(props: ListI['props']) {
        super(props);
        this.state = {
            items: [],
            isEmpty: true,
        };

        this.id = `${+(Math.random() * 1_000_000).toFixed(0)}-${new Date().getTime()}`;

        this.checkSizes = this.checkSizes.bind(this);

        this.parent = React.createRef();
    }

    states = {};
    indexes = {};
    timers = {};
    heights = {};

    renderItem = renderItem;

    updateItems = updateItems;
    drawItems = drawItems;
    checkSizes = checkSizes;

    checkChange = checkChange;

    componentDidMount(): void {
        this.checkChange(true);

        this.resizeThrottle = throttle(300, this.checkSizes.bind(this));

        if (this.props.resizeWidth) {
            document.addEventListener('changeWidthWindow', this.resizeThrottle!);
        }

        if (this.props.resizeHeight) {
            document.addEventListener('changeHeightWindow', this.resizeThrottle!);
        }
    }

    componentDidUpdate(): void {
        this.checkChange();
    }

    componentWillUnmount(): void {
        document.removeEventListener('changeWidthWindow', this.resizeThrottle!);
        document.removeEventListener('changeHeightWindow', this.resizeThrottle!);
    }

    render() {
        const { items, isEmpty } = this.state;
        const { parentClass, relative, changeAnimate, renderWrapper = (node) => node } = this.props;

        return (
            <div
                ref={this.parent}
                className={`list ${isEmpty ? '_empty' : ''} ${relative ? '_relative' : ''} ${parentClass} ${changeAnimate ? '_animate' : ''} ${this.id}`}
            >
                {renderWrapper(items.map((item) => this.renderItem({ item })))}
            </div>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        windowIsLoad: state.windowIsLoad,
    };
}

export default connect(mapStateToProps)(List);
