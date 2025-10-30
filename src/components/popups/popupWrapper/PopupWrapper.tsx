import React from 'react';

import Fade from '@components/fade/Fade.tsx';
import LoaderBlock from '@components/loaderBlock/LoaderBlock.tsx';

import loadPopup from './methods/loadPopup.ts';

import PopupWrapperI from './types.ts';

import popups from './static/popups.ts';

class PopupWrapper
    extends React.Component<PopupWrapperI['props'], PopupWrapperI['state']>
    implements PopupWrapperI
{
    parent: PopupWrapperI['parent'];

    constructor(props: PopupWrapperI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    popups = popups;

    loadPopup = loadPopup;

    render() {
        const { PopupComponent } = this.state;
        const { className = '', isShow, props = {} } = this.props;

        return (
            <Fade
                className={`body__popup _FULL _POPUPWRAPPER _POPUPBACK ${className}`}
                isShow={isShow}
                initCb={this.loadPopup.bind(this)}
            >
                <LoaderBlock className="body__popupLoader" isShow={!PopupComponent} />
                <div className={`body__popupInner _FULL ${PopupComponent ? '_show' : ''}`}>
                    <>{PopupComponent ? <PopupComponent {...props} /> : null}</>
                </div>
            </Fade>
        );
    }
}

export default PopupWrapper;
