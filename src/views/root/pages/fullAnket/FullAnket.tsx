import React from 'react';
import { connect } from 'react-redux';

import Footer from '@components/footer/Footer.tsx';
import InnerPage from '@components/innerPage/InnerPage.tsx';
import { StoreT } from '@global/types.ts';

import getScrollPage from './methods/getScrollPage.ts';

import FullAnketI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderForm from './renders/renderForm.tsx';
import renderHead from './renders/renderHead.tsx';
import getContent from './requests/getContent.ts';
import sendForm from './requests/sendForm.ts';
import uploadHandler from './requests/uploadHandler.ts';

class FullAnket extends InnerPage<FullAnketI['props'], FullAnketI['state']> implements FullAnketI {
    parent: FullAnketI['parent'];

    constructor(props: FullAnketI['props']) {
        super(props);
        const { storePages } = this.props;

        this.state = {
            anket: storePages['full-anket'].data?.anket as any,
        };

        this.parent = React.createRef();
    }

    innerClassName = 'page__innerBox';

    sendForm = sendForm;
    uploadHandler = uploadHandler;

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
                <div className="page__inner _INNER">
                    <div className="page__content">{this.renderContent()}</div>
                </div>
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
        storePages: state.pages,
    };
}

export default connect(mapStateToProps)(FullAnket);
