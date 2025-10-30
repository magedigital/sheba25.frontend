import React from 'react';
import { connect } from 'react-redux';

import Media from '@components/media/Media.tsx';
import { StoreT } from '@global/types.ts';

import getNav from './methods/getNav.ts';
import menuHandler from './methods/menuHandler.ts';
import scrollHandler from './methods/scrollHandler.ts';

import TopBarI from './types.ts';

import renderHead from './renders/renderHead.tsx';
import renderMenu from './renders/renderMenu.tsx';

class TopBar extends React.Component<TopBarI['props'], TopBarI['state']> implements TopBarI {
    parent: TopBarI['parent'];

    constructor(props: TopBarI['props']) {
        super(props);
        this.state = {
            isShowMenu: false,
        };

        this.scrollHandler = this.scrollHandler.bind(this);

        this.parent = React.createRef();
    }

    menuHandler = menuHandler;
    scrollHandler = scrollHandler;

    getNav = getNav;

    renderHead = renderHead;
    renderMenu = renderMenu;

    componentDidMount(): void {
        window.addEventListener('scroll', this.scrollHandler, true);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.scrollHandler, true);
    }

    render() {
        const { isShowMenu, isFix } = this.state;

        return (
            <div
                ref={this.parent}
                className={`topBar _FULL ${isShowMenu ? '_showMenu' : ''} ${isFix ? '_fix' : ''}`}
            >
                {this.renderHead()}
                <Media current="mobile">{this.renderMenu()}</Media>
            </div>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        storePages: state.pages,
        device: state.device,
    };
}

export default connect(mapStateToProps)(TopBar);
