import React from 'react';
import { connect } from 'react-redux';

import Fade from '@components/fade/Fade.tsx';
import Pages from '@components/pages/Pages.tsx';
import checkChatbot from '@functions/checkChatbot.ts';
import { setCookie } from '@functions/cookies.ts';
import getAuth from '@functions/getAuth.ts';
import { enums } from '@global/enums.ts';
import { StoreT } from '@global/types.ts';

import Cookies from './components/cookies/Cookies.tsx';

import RootI from './types.ts';

import renderPopups from './renders/renderPopups.tsx';
import renderTopBar from './renders/renderTopBar.tsx';
import pages from './static/pages.tsx';

const Styles = typeof window !== 'undefined' && require('./components/Styles.tsx').default;

class Root extends React.Component<RootI['props'], RootI['state']> implements RootI {
    parent: RootI['parent'];

    constructor(props: RootI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    pages = pages;

    renderPopups = renderPopups;
    renderTopBar = renderTopBar;

    componentDidMount(): void {
        const rootJWT = document.querySelector('#root')!.getAttribute('data-jwt');

        if (rootJWT) {
            setCookie(enums.ACCESS_TOKEN, rootJWT);
        }

        getAuth();
    }

    render() {
        const { rootInit, acceptCookies } = this.props;

        return (
            <>
                {Styles && <Styles />}
                {this.renderTopBar()}
                <div className="body__font">
                    <span>123afs</span>
                    <p>123afs</p>
                    <b>123afs</b>
                </div>
                <Fade className="body__cookies" isShow={!acceptCookies}>
                    <Cookies />
                </Fade>
                <div className={`body__content ${checkChatbot() ? '_chatbot' : ''}`}>
                    {rootInit && (
                        <Pages
                            context={this}
                            pages={this.pages}
                            filter={(page) =>
                                !page.level || ['login', 'cheque', '404'].includes(page.name)
                            }
                        />
                    )}
                </div>
            </>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        rootInit: state.rootInit,
        callFormSuccess: state.callFormSuccess,
        acceptCookies: state.acceptCookies,
    };
}

export default connect(mapStateToProps)(Root);
