import React from 'react';

import LoaderBlock from '@components/loaderBlock/LoaderBlock.tsx';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    const { content } = this.state;

    return (
        <div className="page__content _FULL_W _COL _COL_H_CENTER _minH">
            {this.renderHead()}
            <LoaderBlock
                className="page__contentLoader"
                isShow={!content}
                loaderClassName="_main"
            />
            <div className={`page__contentInner _FULL_W ${!content ? '_hide' : ''}`}>
                {content && <>{this.renderFaq()}</>}
            </div>
        </div>
    );
};

export default renderContent;
