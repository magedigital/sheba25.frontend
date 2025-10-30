import React from 'react';

import CloseBtn from '@components/closeBtn/CloseBtn.tsx';
import Media from '@components/media/Media.tsx';

import I from '../types.ts';

const renderPage: I['renderPage'] = function (children, withClose = true) {
    const { showClose } = this.state;

    return (
        <div ref={this.parent} className="innerPage _FULL">
            {withClose && (
                <Media current="desktop">
                    <div className={`innerPage__close ${showClose ? '_show' : ''}`}>
                        <CloseBtn />
                    </div>
                </Media>
            )}

            {children}
        </div>
    );
};

export default renderPage;
