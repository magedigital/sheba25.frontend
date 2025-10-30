import React, { MouseEvent } from 'react';

import { ListenerT } from '@global/types.ts';

import outClickHandler from './methods/outClickHandler.ts';

import PopupI from './types.ts';

class Popup extends React.Component<PopupI['props']> implements PopupI {
    parent: React.RefObject<HTMLDivElement | null>;

    constructor(props: PopupI['props']) {
        super(props);
        this.state = {};

        this.outClickHandler = this.outClickHandler.bind(this);

        this.parent = React.createRef();
    }

    outClickHandler = outClickHandler;

    componentDidMount(): void {
        const { setRef } = this.props;

        if (setRef) {
            setRef(this.parent.current as HTMLElement);
        }

        setTimeout(() => {
            (document.addEventListener as ListenerT<MouseEvent>)('click', this.outClickHandler);
        }, 10);
    }

    componentWillUnmount(): void {
        (document.removeEventListener as ListenerT<MouseEvent>)('click', this.outClickHandler);
    }

    render() {
        const { children, className = '', name, close } = this.props;

        return (
            <>
                <div
                    ref={this.parent}
                    className={`popup _FULL _NOSCROLL _COL _${name} ${className}`}
                >
                    <div className="popup__inner">
                        <div className="popup__close _COL _COL_CENTER _CLICK" onClick={close}>
                            <i className="popup__closeIcon">{/* <Icon name="close-thin" /> */}</i>
                        </div>
                        {children}
                    </div>
                </div>
            </>
        );
    }
}

export default Popup;
