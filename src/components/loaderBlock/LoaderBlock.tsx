import React from 'react';

import Fade from '@components/fade/Fade.tsx';
import Loader from '@components/loader/Loader.tsx';
import { s } from '@functions/seo.ts';

import LoaderBlockI from './types.ts';

class LoaderBlock extends React.Component<LoaderBlockI['props']> implements LoaderBlockI {
    constructor(props: LoaderBlockI['props']) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            className = '',
            itemClassName = '',
            loaderClassName,
            isShow,
            isScroll,
            isReverse,
        } = this.props;

        if (s()) {
            return null;
        }

        return (
            <Fade
                className={`${className} _LOADER ${isScroll ? '_SCROLL' : ''} ${isReverse ? '_reverse' : ''}`}
                isShow={isShow}
            >
                <div className={`${itemClassName} _LOADERITEM`}>
                    <Loader className={loaderClassName} />
                </div>
            </Fade>
        );
    }
}

export default LoaderBlock;
