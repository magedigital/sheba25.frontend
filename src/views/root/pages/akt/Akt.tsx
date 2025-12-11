import React from 'react';
import { connect } from 'react-redux';

import Footer from '@components/footer/Footer.tsx';
import InnerPage from '@components/innerPage/InnerPage.tsx';
import { StoreT } from '@global/types.ts';

import getPrizeId from './methods/getPrizeId.ts';
import getScrollPage from './methods/getScrollPage.ts';

import AnketI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderForm from './renders/renderForm.tsx';
import renderHead from './renders/renderHead.tsx';
import downloadAct from './requests/downloadAct.ts';
import getContent from './requests/getContent.ts';
import resetAct from './requests/resetAct.ts';
import sendForm from './requests/sendForm.ts';
import uploadHandler from './requests/uploadHandler.ts';
import fields from './static/fields.ts';

class Akt extends InnerPage<AnketI['props'], AnketI['state']> implements AnketI {
    parent: AnketI['parent'];

    constructor(props: AnketI['props']) {
        super(props);
        this.state = {};
        this.parent = React.createRef();
    }

    fields = fields;
    innerClassName = 'page__innerBox';
    formData = new FormData();

    sendForm = sendForm;
    uploadHandler = uploadHandler;
    downloadAct = downloadAct;
    resetAct = resetAct;
    getPrizeId = getPrizeId;

    getScrollPage = getScrollPage;
    getContent = getContent;

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
        levels: state.levels,
    };
}

export default connect(mapStateToProps)(Akt);
