import React from 'react';
import { connect } from 'react-redux';

import Pages from '@components/pages/Pages.tsx';

import AuthI from './types.ts';

import pages from './static/pages.tsx';

class Auth extends React.Component<AuthI['props'], AuthI['state']> implements AuthI {
    parent: AuthI['parent'];

    constructor(props: AuthI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    innerClassName = 'popup__inner';

    pages = pages;

    render() {
        return (
            <Pages
                context={this}
                pages={this.pages}
                filter={(page) => page.parentName === 'auth'}
                itemClass="body__page _auth _NOSCROLL"
                parentName="auth"
            />
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Auth);
