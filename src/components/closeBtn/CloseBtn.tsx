import React from 'react';

import Icon from '@components/icon/Icon.tsx';

import closeHandler from './methods/closeHandler.ts';

import CloseBtnI from './types.ts';

class CloseBtn
    extends React.Component<CloseBtnI['props'], CloseBtnI['state']>
    implements CloseBtnI
{
    parent: CloseBtnI['parent'];

    constructor(props: CloseBtnI['props']) {
        super(props);
        this.state = {};
        this.parent = React.createRef();
    }

    closeHandler = closeHandler;

    render() {
        return (
            <div
                ref={this.parent}
                className="closeBtn _CLICK _COL _COL_CENTER"
                onClick={this.closeHandler.bind(this)}
            >
                <i className="closeBtn__icon">
                    <Icon name="close" />
                </i>
            </div>
        );
    }
}

export default CloseBtn;
