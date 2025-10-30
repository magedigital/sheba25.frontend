import React from 'react';

import CodeI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderFoot from './renders/renderFoot.tsx';
import sendForm from './requests/sendForm.ts';

class Code extends React.Component<CodeI['props'], CodeI['state']> implements CodeI {
    parent: CodeI['parent'];

    constructor(props: CodeI['props']) {
        super(props);
        this.state = {};
        this.parent = React.createRef();
    }

    sendForm = sendForm;

    renderContent = renderContent;
    renderFoot = renderFoot;

    render() {
        return (
            <div className="popup__content">
                {this.renderContent()}
                {this.renderFoot()}
            </div>
        );
    }
}

export default Code;
