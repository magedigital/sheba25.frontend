import React from 'react';

import List from '@components/list/List.tsx';

import Form from '../components/form/Form.tsx';
import Result from '../components/result/Result.tsx';
import Scan from '../components/scan/Scan.tsx';
import ScanError from '../components/scanError/ScanError.tsx';
import Start from '../components/start/Start.tsx';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    const { currentStep, renderKey, scanResult, qrType } = this.state;

    return (
        <>
            <div
                className="popup _reg _FULL _COL _NOSCROLL"
                onScroll={() => {
                    document.dispatchEvent(new CustomEvent('scrollInnerPage'));
                }}
            >
                <div className="popup__inner">
                    {this.renderHead()}
                    <List
                        renderKey={currentStep ? `${currentStep}${renderKey}` : undefined}
                        items={currentStep ? [{ _id: currentStep }] : []}
                        parentClass="popup__blocks"
                        itemClass="popup__blocksItem"
                        itemStyleProps={[]}
                        parentStyleProps={['width']}
                        parentRealStyleProps={['width']}
                        renderItem={({ item }) => (
                            <>
                                {item._id === 'start' && (
                                    <Start
                                        setStep={this.setStep.bind(this)}
                                        uploadQr={this.uploadQr.bind(this)}
                                    />
                                )}
                                {item._id === 'error' && (
                                    <ScanError
                                        setStep={this.setStep.bind(this)}
                                        uploadQr={this.uploadQr.bind(this)}
                                        setRenderKey={this.setRenderKey.bind(this)}
                                    />
                                )}
                                {item._id === 'scan' && (
                                    <Scan
                                        setStep={this.setStep.bind(this)}
                                        complete={this.scanComplete.bind(this)}
                                        uploadQr={this.uploadQr.bind(this)}
                                    />
                                )}
                                {item._id === 'form' && (
                                    <Form
                                        setRenderKey={this.setRenderKey.bind(this)}
                                        setStep={this.setStep.bind(this)}
                                        scanResult={scanResult}
                                        qrType={qrType}
                                    />
                                )}
                                {item._id === 'result' && (
                                    <Result setStep={this.setStep.bind(this)} />
                                )}
                            </>
                        )}
                        allItems={['start', 'scan', 'error', 'form', 'result']}
                        currentItem={currentStep}
                        resizeWidth={true}
                    />
                </div>
            </div>
        </>
    );
};

export default renderContent;
