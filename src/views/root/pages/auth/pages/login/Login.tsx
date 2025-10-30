import React from 'react';
import { connect } from 'react-redux';

import CustomHead from '@components/customHead/CustomHead.tsx';
import EditBlock from '@components/editBlock/EditBlock.tsx';
import { StoreT } from '@global/types.ts';

import LoginI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderFields from './renders/renderFields.tsx';
import renderFoot from './renders/renderFoot.tsx';
import renderHead from './renders/renderHead.tsx';
import renderSocials from './renders/renderSocials.tsx';
import requestLogin from './requests/requestLogin.ts';
import socials from './static/socials.ts';

class Login extends EditBlock<LoginI['props'], LoginI['state']> implements LoginI {
    parent: LoginI['parent'];

    constructor(props: LoginI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    socials = socials;
    timers: LoginI['timers'] = {};

    requestLogin = requestLogin;

    renderHead = renderHead;
    renderContent = renderContent;
    renderFields = renderFields;
    renderSocials = renderSocials;
    renderFoot = renderFoot;

    componentDidMount(): void {
        const { storePages } = this.props;
        const loginData = storePages['auth-login'].data;

        this.setState({ passwordMessage: loginData?.message as string });

        this.init({ fields: { login: loginData?.phone } });
    }

    componentWillUnmount(): void {
        Object.keys(this.timers).forEach((key) => {
            clearInterval(this.timers[key]);
        });
    }

    render() {
        return (
            <div
                ref={this.parent}
                className="popup _FULL _COL _NOSCROLL"
                onScroll={() => {
                    document.dispatchEvent(new CustomEvent('scrollInnerPage'));
                }}
            >
                <CustomHead title="Авторизация" />

                <div className="popup__inner">
                    {this.renderHead()}
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        device: state.device,
        storePages: state.pages,
    };
}

export default connect(mapStateToProps)(Login);
