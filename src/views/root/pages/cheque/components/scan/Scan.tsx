import React from 'react';

import LoaderBlock from '@components/loaderBlock/LoaderBlock.tsx';

import setFrame from './methods/setFrame.ts';
import videoStart from './methods/videoStart.ts';
import videoStop from './methods/videoStop.ts';

import ChequeScanI from './types.ts';

class ChequeScan
    extends React.Component<ChequeScanI['props'], ChequeScanI['state']>
    implements ChequeScanI
{
    parent: ChequeScanI['parent'];

    constructor(props: ChequeScanI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    videoStop = videoStop;
    videoStart = videoStart;
    setFrame = setFrame;

    componentDidMount() {
        this.videoStart();
    }

    componentWillUnmount() {
        this.videoStop();
    }

    render() {
        return (
            <div ref={this.parent} className="popup__block _COL _COL_H_CENTER">
                <div className="popup__scan">
                    <LoaderBlock className="popup__scanLoader" isShow={true} />
                    <canvas hidden />
                </div>
            </div>
        );
    }
}

export default ChequeScan;
