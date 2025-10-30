import React from 'react';

import dropHandler from './methods/dropHandler.ts';
import getValue from './methods/getValue.ts';
import itemHandler from './methods/itemHandler.ts';

import SelectI from './types.ts';

import renderList from './renders/renderList.tsx';
import renderView from './renders/renderView.tsx';

class Select extends React.Component<SelectI['props'], SelectI['state']> implements SelectI {
    parent: SelectI['parent'];

    constructor(props: SelectI['props']) {
        super(props);
        this.state = {};
        this.parent = React.createRef();
    }

    getValue = getValue;
    dropHandler = dropHandler;
    itemHandler = itemHandler;

    renderView = renderView;
    renderList = renderList;

    render() {
        const { isShow } = this.state;
        const { value } = this.props;

        return (
            <div
                ref={this.parent}
                className={`select _FULL ${isShow ? '_show' : ''} ${!value ? '_emptyValue' : ''}`}
            >
                {this.renderView()}
                {this.renderList()}
            </div>
        );
    }
}

export default Select;
