import React from 'react';

import dragInit from './methods/dragInit.ts';

import UploadI from './types.ts';

import renderMain from './renders/renderMain.tsx';
import renderOver from './renders/renderOver.tsx';
import renderResult from './renders/renderResult.tsx';

class Upload extends React.Component<UploadI['props'], UploadI['state']> implements UploadI {
    parent: UploadI['parent'];

    constructor(props: UploadI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    dragInit = dragInit;

    renderMain = renderMain;
    renderResult = renderResult;
    renderOver = renderOver;

    componentDidMount(): void {
        this.dragInit();
    }

    render() {
        const { isOver } = this.state;
        const { fileName } = this.props;

        return (
            <div
                ref={this.parent}
                className={`upload ${fileName ? '_upload' : ''} ${isOver ? '_over' : ''}`}
            >
                {this.renderMain()}
                {this.renderResult()}
                {this.renderOver()}
            </div>
        );
    }
}

export default Upload;
