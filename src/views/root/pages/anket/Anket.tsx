import React from 'react';
import { connect } from 'react-redux';

import Footer from '@components/footer/Footer.tsx';
import InnerPage from '@components/innerPage/InnerPage.tsx';
import { getLocalContent } from '@functions/localContent.ts';
import { StoreT } from '@global/types.ts';

import getScrollPage from './methods/getScrollPage.ts';

import AnketI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderForm from './renders/renderForm.tsx';
import renderHead from './renders/renderHead.tsx';
import getContent from './requests/getContent.ts';
import sendForm from './requests/sendForm.ts';
import fields from './static/fields.ts';

class Anket extends InnerPage<AnketI['props'], AnketI['state']> implements AnketI {
    parent: AnketI['parent'];

    constructor(props: AnketI['props']) {
        super(props);
        this.state = {
            content: getLocalContent('indexContent'),
        };

        this.parent = React.createRef();
    }

    fields = fields;
    innerClassName = 'page__innerBox';

    sendForm = sendForm;
    getContent = getContent;

    getScrollPage = getScrollPage;

    renderContent = renderContent;
    renderHead = renderHead;
    renderForm = renderForm;

    componentDidMount(): void {
        this.getContent();
    }

    render() {
        const { content } = this.state;

        return (
            <div className="page _SECTION _START_SECTION">
                <div className="page__inner _INNER">{this.renderContent()}</div>
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

export default connect(mapStateToProps)(Anket);
