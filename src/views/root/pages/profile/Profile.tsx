import React from 'react';
import { connect } from 'react-redux';

import CustomHead from '@components/customHead/CustomHead.tsx';
import Footer from '@components/footer/Footer.tsx';
import { getLocalContent } from '@functions/localContent.ts';
import { scrollPage } from '@functions/savePageScroll.ts';
import { StoreT } from '@global/types.ts';

import ProfileI from './types.ts';

import renderCheques from './renders/renderCheques.tsx';
import renderContent from './renders/renderContent.tsx';
import renderHead from './renders/renderHead.tsx';
import renderMain from './renders/renderMain.tsx';
import renderPrize from './renders/renderPrize.tsx';
import renderPrizes from './renders/renderPrizes.tsx';
import getContent from './requests/getContent.ts';

class Profile extends React.Component<ProfileI['props'], ProfileI['state']> implements ProfileI {
    parent: ProfileI['parent'];
    checkPrizesTimerId: ProfileI['checkPrizesTimerId'];

    constructor(props: ProfileI['props']) {
        super(props);

        this.state = {
            data: getLocalContent('profileData'),
            content: getLocalContent('profileContent'),
        };

        this.getContent = this.getContent.bind(this);

        this.parent = React.createRef();
    }

    getContent = getContent;

    renderContent = renderContent;
    renderHead = renderHead;
    renderMain = renderMain;
    renderCheques = renderCheques;
    renderPrizes = renderPrizes;
    renderPrize = renderPrize;

    componentDidMount(): void {
        const page = this.parent.current!.closest('.body__page') as HTMLElement;

        scrollPage(page, 'profile');

        this.getContent();
    }

    render() {
        const { content } = this.state;

        return (
            <div ref={this.parent} className={`page _profile _SECTION _START_SECTION`}>
                <CustomHead title="Личный кабинет" />
                {this.renderHead()}
                {this.renderContent()}
                <div className="page__footer">
                    <Footer content={content?.components.footer} />
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

export default connect(mapStateToProps)(Profile);
