import { throttle } from 'throttle-debounce';

import React from 'react';

import dropHandler from './methods/dropHandler.ts';
import init from './methods/init.ts';

import QuestionI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderHead from './renders/renderHead.tsx';

class Question
    extends React.Component<QuestionI['props'], QuestionI['state']>
    implements QuestionI
{
    parent: QuestionI['parent'];
    resizeThrottle: QuestionI['resizeThrottle'];

    constructor(props: QuestionI['props']) {
        super(props);
        this.state = {};

        this.init = this.init.bind(this);

        this.parent = React.createRef();
    }

    dropHandler = dropHandler;
    init = init;

    renderHead = renderHead;
    renderContent = renderContent;

    componentDidMount(): void {
        this.init();

        this.resizeThrottle = throttle(300, this.init);

        document.addEventListener('changeWidthWindow', this.resizeThrottle!);
        document.addEventListener('windowReady', this.init);
    }

    componentWillUnmount(): void {
        document.removeEventListener('changeWidthWindow', this.resizeThrottle!);
        document.removeEventListener('windowReady', this.init);
    }

    render() {
        const { isShow } = this.state;

        return (
            <div ref={this.parent} className={`faqQuestion _FULL_W ${isShow ? '_show' : ''}`}>
                {this.renderHead()}
                {this.renderContent()}
            </div>
        );
    }
}

export default Question;
