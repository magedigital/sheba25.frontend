import { throttle } from 'throttle-debounce';

import React from 'react';

import EditBlock from '@components/editBlock/EditBlock.tsx';

import initPage from './methods/initPage.ts';
import setClosePosition from './methods/setClosePosition.ts';

import InnerPageI from './types.ts';

import renderDecors from './renders/renderDecors.tsx';
import renderPage from './renders/renderPage.tsx';

class InnerPage<P = {}, S = {}>
    extends EditBlock<InnerPageI<P, S>['props'], InnerPageI<P, S>['state']>
    implements InnerPageI<P, S>
{
    parent: InnerPageI['parent'];
    closeEventsHandler: InnerPageI['closeEventsHandler'];

    constructor(props: InnerPageI<P, S>['props']) {
        super(props);
        this.state = {} as InnerPageI<P, S>['state'];

        this.setClosePosition = this.setClosePosition.bind(this);

        this.parent = React.createRef();
    }

    setClosePosition = setClosePosition;
    initPage = initPage;

    renderPage = renderPage;
    renderDecors = renderDecors;

    componentDidMount(): void {
        this.closeEventsHandler = throttle(300, this.setClosePosition.bind(this));

        document.addEventListener('scrollInnerPage', this.closeEventsHandler);
        document.addEventListener('changeWidthWindow', this.closeEventsHandler);
        document.addEventListener('changeHeightWindow', this.closeEventsHandler);
    }

    componentWillUnmount(): void {
        if (this.closeEventsHandler) {
            document.removeEventListener('scrollInnerPage', this.closeEventsHandler);
            document.removeEventListener('changeWidthWindow', this.closeEventsHandler);
            document.removeEventListener('changeHeightWindow', this.closeEventsHandler);
        }
    }
}

export default InnerPage;
