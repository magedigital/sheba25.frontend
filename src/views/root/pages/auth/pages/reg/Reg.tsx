import React from 'react';
import { connect } from 'react-redux';

import CustomHead from '@components/customHead/CustomHead.tsx';
import EditBlock from '@components/editBlock/EditBlock.tsx';
import removeTransition from '@functions/removeTransition.ts';
import { StoreT } from '@global/types.ts';

import setRenderKey from './methods/setRenderKey.ts';
import setStep from './methods/setStep.ts';

import RegI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderHead from './renders/renderHead.tsx';

class Reg extends EditBlock<RegI['props'], RegI['state']> implements RegI {
    parent: RegI['parent'];

    constructor(props: RegI['props']) {
        super(props);
        this.state = {
            // currentStep: 'code',
            currentStep: 'start',
            isConfirm: this.props.user?.status === 'EMAIL_CONFIRM_REQUIRED',
        };

        this.parent = React.createRef();
    }

    setStep = setStep;
    setRenderKey = setRenderKey;

    renderContent = renderContent;
    renderHead = renderHead;

    componentDidMount(): void {
        this.init({ fields: {} });

        removeTransition({ item: '.popup._reg' });
    }

    render() {
        return (
            <div
                ref={this.parent}
                className="popup _reg _FULL _COL _NOSCROLL"
                onScroll={() => {
                    document.dispatchEvent(new CustomEvent('scrollInnerPage'));
                }}
            >
                <CustomHead title="Получение пароля" />

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
        user: state.user,
    };
}

export default connect(mapStateToProps)(Reg);
