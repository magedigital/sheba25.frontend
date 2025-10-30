import React from 'react';
import { connect } from 'react-redux';

import CustomHead from '@components/customHead/CustomHead.tsx';
import InnerPage from '@components/innerPage/InnerPage.tsx';
import removeTransition from '@functions/removeTransition.ts';
import setAsyncState from '@functions/setAsyncState.ts';
import { StoreT } from '@global/types.ts';

import close from './methods/close.ts';
import parseQr from './methods/parseQr.ts';
import scanComplete from './methods/scanComplete.ts';
import setRenderKey from './methods/setRenderKey.ts';
import setStep from './methods/setStep.ts';
import uploadQr from './methods/uploadQr.ts';

import ChequeI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderHead from './renders/renderHead.tsx';

class Cheque extends InnerPage<ChequeI['props'], ChequeI['state']> implements ChequeI {
    parent: ChequeI['parent'];

    constructor(props: ChequeI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    close = close;

    setStep = setStep;
    setRenderKey = setRenderKey;
    parseQr = parseQr;
    uploadQr = uploadQr;
    scanComplete = scanComplete;

    renderContent = renderContent;
    renderHead = renderHead;

    async componentDidMount() {
        const { storePages } = this.props;
        const page = storePages.cheque;
        const currentStep = (page.data?.step as ChequeI['state']['currentStep']) || 'start';
        const qrType = page.data?.scanData
            ? ('qr-photo' as const)
            : currentStep === 'form'
              ? ('typing' as const)
              : ('qr-scan' as const);

        removeTransition({ item: '.popup__blocks', isCurrent: true });

        await setAsyncState.call(this, {
            currentStep,
            qrType,
            ...(page.data?.scanData
                ? { scanResult: this.parseQr(page.data.scanData as string) }
                : {}),
        });
    }

    render() {
        return (
            <>
                <CustomHead title="Регистрация чека" />
                {this.renderContent()}
            </>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        storePages: state.pages,
    };
}

export default connect(mapStateToProps)(Cheque);
