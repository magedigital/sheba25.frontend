import React from 'react';

import List from '@components/list/List.tsx';

import Code from '../components/code/Code.tsx';
import Start from '../components/start/Start.tsx';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    const { currentStep, renderKey, login, isConfirm, mailService } = this.state;
    const { device } = this.props;
    const locationSearch = window.location.search.slice(1);
    const isRaffle = locationSearch.indexOf('raffle=true') !== -1;

    return (
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
                            device={device}
                            setStep={this.setStep.bind(this)}
                            setRenderKey={this.setRenderKey.bind(this)}
                            isConfirm={isConfirm}
                            mode={isRaffle ? 'registration' : undefined}
                        />
                    )}
                    {item._id === 'code' && (
                        <Code
                            login={login!}
                            setRenderKey={this.setRenderKey.bind(this)}
                            isConfirm={isConfirm}
                            mailService={mailService}
                            mode={isRaffle ? 'registration' : undefined}
                        />
                    )}
                </>
            )}
            allItems={['start', 'code']}
            currentItem={currentStep}
        />
    );
};

export default renderContent;
