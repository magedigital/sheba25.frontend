import React from 'react';

import EditBlock from '@components/editBlock/EditBlock.tsx';

import StartI from './types.ts';

import renderFoot from './renders/renderFoot.tsx';
import renderForm from './renders/renderForm.tsx';
import sendForm from './requests/sendForm.ts';

class Start extends EditBlock<StartI['props'], StartI['state']> implements StartI {
    parent: StartI['parent'];

    constructor(props: StartI['props']) {
        super(props);
        this.state = {};
        this.parent = React.createRef();
    }

    sendForm = sendForm;

    renderForm = renderForm;
    renderFoot = renderFoot;

    componentDidMount(): void {
        this.init({ fields: {} });
    }

    render() {
        return (
            <div className="popup__content">
                {this.renderForm()}
                {this.renderFoot()}
            </div>
        );
    }
}

export default Start;
