import React from 'react';

import CustomHead from '@components/customHead/CustomHead.tsx';
import Footer from '@components/footer/Footer.tsx';
import { getLocalContent } from '@functions/localContent.ts';
import { scrollPage } from '@functions/savePageScroll.ts';

import FaqI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderFaq from './renders/renderFaq.tsx';
import renderForm from './renders/renderForm.tsx';
import renderHead from './renders/renderHead.tsx';
import renderQuestions from './renders/renderQuestions.tsx';
import getContent from './requests/getContent.ts';
import sendForm from './requests/sendForm.ts';
import fields from './static/fields.ts';

class Faq extends React.Component<FaqI['props'], FaqI['state']> implements FaqI {
    parent: FaqI['parent'];

    constructor(props: FaqI['props']) {
        super(props);
        this.state = {
            content: getLocalContent('faqContent'),
            // isSuccess: true,
        };
        this.parent = React.createRef();
    }

    fields = fields;

    sendForm = sendForm;
    getContent = getContent;

    renderContent = renderContent;
    renderHead = renderHead;
    renderFaq = renderFaq;
    renderQuestions = renderQuestions;
    renderForm = renderForm;

    componentDidMount(): void {
        const page = this.parent.current!.closest('.body__page') as HTMLElement;

        scrollPage(page, 'faq');

        this.getContent();
    }

    render() {
        const { content } = this.state;

        return (
            <div ref={this.parent} className="page _faq _SECTION _START_SECTION">
                <CustomHead title="Вопрос-ответ" />
                <div className="page__inner _INNER">{this.renderContent()}</div>
                <div className="page__footer">
                    <Footer content={content?.components.footer} />
                </div>
            </div>
        );
    }
}

export default Faq;
